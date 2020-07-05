<template>
    <div class="main">
		<div>
			<PostWriter v-if="logged" />
			<Post 
				v-for="post in posts" 
				:key="post.id"
				:name="post.name"
				:userName="post.username"
				:body="post.body" 
				:email="post.email"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import PostWriter from './PostWriter.vue';
import Post from './Post.vue';
import axios from 'axios';

@Component({
    components: {PostWriter, Post}
})
export default class CenterPanel extends Vue {
	logged = localStorage.getItem("token")? true : false;
	posts = [];
	

	created() {
		this.getPosts();
	}

	async getPosts() {
		const response = await axios.get("http://localhost:3000/posts/");
		this.posts = response.data
	}
}
</script>

<style scoped>
</style>
