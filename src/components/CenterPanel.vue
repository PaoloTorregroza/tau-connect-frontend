<template>
    <div class="main">
        <PostWriter />
        <div>Read some posts</div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import PostWriter from './PostWriter.vue';

@Component({
    components: {PostWriter}
})
export default class CenterPanel extends Vue {

}
</script>

<style scoped>
</style>
