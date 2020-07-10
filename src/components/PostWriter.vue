<template>
    <v-card class="post-form">
      <div class="post-form-title">
        <v-avatar>
            <img :src="gravatar">
        </v-avatar>
        <v-card-title id="writter-title">Post something</v-card-title>
      </div>
        <v-textarea
            v-model="postBody"
            counter="310"
            :rules="rules"
            outlined
            auto-grow
            color="#DB842E"
        ></v-textarea>
      <v-btn @click="post" dark color="#7B0001" class="post-button">Post!</v-btn>
    </v-card> 
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import axios from 'axios';
import md5 from 'md5';

@Component
export default class PostWriter extends Vue {

    postBody = "";

    rules = [(v: string) => v?.length <= 310 || "Max 310 characters"];

    get gravatar() {
        return "https://www.gravatar.com/avatar/" + md5(this.$store.state.userData.email.toLowerCase().trim());
    }

    async post() {
        const config = {
            headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
        };
        const response = await axios.post("http://localhost:3000/posts", {body: this.postBody}, config);
        console.log("Respuesta: " + response);
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
