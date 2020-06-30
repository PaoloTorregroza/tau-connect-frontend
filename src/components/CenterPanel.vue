<template>
    <div class="main">
        <PostWriter />
        <Post />
        <Post />
        <Post />
        <Post />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import PostWriter from './PostWriter.vue';
import Post from './Post.vue';

@Component({
    components: {PostWriter, Post}
})
export default class CenterPanel extends Vue {

}
</script>

<style scoped>
</style>
