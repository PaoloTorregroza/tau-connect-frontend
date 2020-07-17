<template>
    <div class="main">
		<div>
			<PostWriter v-if="$store.state.logged" v-on:update-posts="getPosts"/>
			<Post 
				v-for="post in posts" 
				:key="post.id"
				:postid="post.id"
				:userid="post.user.id"
				:name="post.user.name"
				:username="post.user.username"
				:body="post.body" 
				:email="post.user.email"
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
	posts = [];
	
	created() {
		this.getPosts();
	}

	async getPosts() {
		const response = await axios.get("http://localhost:3000/posts/");
		this.posts = response.data.data;
		this.posts = this.posts.reverse();
	}
}
</script>

<style scoped>
</style>
