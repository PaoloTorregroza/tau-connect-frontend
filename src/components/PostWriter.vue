<template>
    <v-card class="post-form">
      <div class="post-form-title">
        <v-avatar>
            <img src="https://randomuser.me/api/portraits/women/81.jpg">
        </v-avatar>
        <v-card-title id="writter-title">Post something</v-card-title>
      </div>
        <v-textarea
            counter="310"
            :rules="rules"
            outlined
            auto-grow
            color="#DB842E"
        ></v-textarea>
      <v-btn dark color="#7B0001" class="post-button">Post!</v-btn>
    </v-card> 
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';

@Component
export default class PostWriter extends Vue {
    rules = [(v: string) => v?.length <= 310 || "Max 310 characters"];
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
