<template>
<div>
    <router-link id="back" to="/">
        <v-icon style="color: #1a1a1a;">mdi-arrow-left</v-icon>
    </router-link>
    <v-card id="user-card">
        <div id="user-title-container">
            <v-avatar>
                <img :src="gravatar">
            </v-avatar>
            <div id="user-title">
                <v-card-title>{{$store.state.userData.name}}</v-card-title>
                <v-card-subtitle style="margin-top: -25px; color: gray;">{{$store.state.userData.username}}</v-card-subtitle>
            </div>
        </div>
            <v-form>
                <v-card-text class="error" v-if="changeDataFail">Failed to update</v-card-text>
                <v-text-field color="#DB842E" v-model="userData.name" :rules="formRules.name" placeholder="Name"></v-text-field>
                <v-text-field color="#DB842E" v-model="userData.username" :rules="formRules.username" placeholder="Username"></v-text-field>
                <v-btn @click="updateUser" class="user-form-button" color="#7B0001">
                    update
                </v-btn>
                <v-card-text class="error" v-if="changePasswordFail">Invalid data</v-card-text>
                <v-text-field color="#DB842E" type="password" v-model="userData.newPassword" :rules="formRules.password" placeholder="New password"></v-text-field>
                <v-text-field color="#DB842E" type="password" v-model="userData.oldPassword" :rules="formRules.password" placeholder="Old password"></v-text-field>
                <v-btn @click="updatePassword" class="user-form-button" color="#7B0001">
                    update
                </v-btn>
            </v-form>
    </v-card>
</div>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import md5 from 'md5';
import axios from 'axios';
import {requiredRule, usernameRule} from '../utils/form-rules';

@Component
export default class User extends Vue {

    changePasswordFail = false;
    changeDataFail = false;

    formRules = {
        name: [requiredRule()],
        username: [usernameRule(), requiredRule()],
        password: [requiredRule()]
    }

    userData = {
        name: this.$store.state.userData.name,
        username: this.$store.state.userData.username,
        newPassword: "",
        oldPassword: ""
    }

    get gravatar() {
        return "https://www.gravatar.com/avatar/" + md5(this.$store.state.userData.email.toLowerCase().trim());
    }

    async updateUser() {
        const payload = {
            name: this.userData.name,
            username: this.userData.username
        }
        const config = {
            headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
        }
        try {
            const results = await axios.put(`http://localhost:3000/users/${this.$store.state.userData.id}`, payload, config);
            this.$store.commit("updateUser", results.data.data);
        } catch (e) {
            this.changeDataFail = true;
        }
    }

    async updatePassword() {
        const payload = {
            oldPassword: this.userData.oldPassword,
            newPassword: this.userData.newPassword
        }
        const config = {
            headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
        }
        try {
            await axios.put("http://localhost:3000/auth/change-password", payload, config);
        } catch (e) {
            this.changePasswordFail = true;
        }
    }
}
</script>

<style scoped>
#user-card {
    padding: 1% 4.5% 20px;
    margin: 20px 30% 5% 30%;
}

#user-title-container {
    display: flex;
    justify-content: left;
    margin-top: 10px;
}

#user-title {
    margin-top: -15px;
}

.error {
    margin-top: 25px;
    background-color: red;
    padding: 10px;
    border-radius: 4px;
    margin-bottom: 10px;
}

.user-form-button {
    color: white;
    margin-bottom: 20px;
}

#back {
    margin: 25px 0 0 25px;
    text-decoration: none;
    position: absolute;
}
</style>