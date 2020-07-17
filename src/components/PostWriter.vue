<template>
    <v-card class="post-form">
      <div class="post-form-title">
        <v-avatar>
            <img :src="gravatar">
        </v-avatar>
        <v-card-title id="writter-title">Post something</v-card-title>
      </div>
        <v-form ref="form" v-model="validPost" @submit.prevent="onSubmit">
            <v-textarea
                v-model="postBody"
                counter="310"
                :rules="rules"
                outlined
                auto-grow
                color="#DB842E"
            ></v-textarea>
            <v-btn @click="post" style="color: white" color="#7B0001" class="post-button" :disabled="!validPost">Post!</v-btn>
        </v-form>
    </v-card> 
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import {requiredRule} from '../utils/form-rules';
import axios from 'axios';
import md5 from 'md5';

@Component
export default class PostWriter extends Vue {

    postBody = "";
    validPost = false;

    rules = [(v: string) => /\w+/.test(v) || "Write something", 
        (v: string) => v?.length <= 310 || "Max 310 characters", 
        requiredRule()
    ];

    get gravatar() {
        return "https://www.gravatar.com/avatar/" + md5(this.$store.state.userData.email.toLowerCase().trim());
    }

    async post() {
        const config = {
            headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
        };
        await axios.post("http://localhost:3000/posts", {body: this.postBody}, config);
        this.postBody = "";
        this.$emit("update-posts");
    }
}
</script>

<style scoped>
#writter-title {
    margin-top: -10px;
}

.post-form {
    padding: 3%;
    font-size: 17px;
    margin-bottom: 10px;
}

.post-form-title {
    display: flex;
    justify-content: left;

}

.post-button {
    background-color: #7B0001;
}
</style>
