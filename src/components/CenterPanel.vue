<template>
    <div class="main">
		<div>
			<PostWriter v-if="$store.state.logged" v-on:update-posts="newPostUpdate"/>
			<div
				v-infinite-scroll="loadMore" 
				infinite-scroll-disabled="busy"
				infinite-scroll-distance="limit"	
			>
				<Post 
					v-for="post in posts" 
					:key="post.id"
					:postid="post.id"
					:userid="post.user.id"
					:name="post.user.name"
					:username="post.user.username"
					:body="post.body" 
					:email="post.user.email"

					data-aos="slide-up"
					data-aos-offset="100" 
					data-aos-easing="ease-out-back"
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import PostWriter from './PostWriter.vue';
import Post from './Post.vue';
import axios from 'axios';
import * as AOS from 'aos';
import 'aos/dist/aos.css';

@Component({
    components: {PostWriter, Post}
})
export default class CenterPanel extends Vue {
	posts: IPost[] = [];
	busy = false;
	limit = 5;
	
	created() {
		AOS.init();
		this.loadMore();
	}

	async loadMore() {
		this.busy = true;
		
		let append: IPost[] = [] 
		const response = await axios.get("http://localhost:3000/posts/");
		append = response.data.data.reverse();
		append = append.slice(this.posts.length, this.posts.length + this.limit);
		this.posts = this.posts.concat(append);
		this.busy = false;
	}

	// When a new post is made we need to add it to the start of the array
	async newPostUpdate() {
		const response = await axios.get("http://localhost:3000/posts/");
		const data = response.data.data.reverse();
		this.posts.unshift(data[0])
	}
}
</script>

<style scoped>
</style>
