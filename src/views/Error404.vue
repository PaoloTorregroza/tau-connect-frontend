<template>
<div>
    <router-link id="back" to="/">
        <v-icon style="color: #1a1a1a;">mdi-arrow-left</v-icon>
    </router-link>
    <div class="error-container">
        <img src="../assets/FireWarrior.jpg" alt="">
        <h1>Nothing to see here...</h1>
        <h2>404</h2>
    </div>
    <p class="footer">Made with love by Paolinsky</p>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Error404 extends Vue {

} 

</script>

<style scoped>
#back {
    margin: 25px 0 0 25px;
    text-decoration: none;
    position: absolute;
}

.error-container {
    width: 100%;
    margin-top: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #7B0001; 
}

.error-container img {
    width: 167px;
}

.footer {
    position: absolute;
    color: gray;
    bottom: 0px;
    width: 100%;
    text-align: center;
}
</style>
