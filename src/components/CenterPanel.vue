<template>
    <div class="main">
		<div>
			<PostWriter v-if="$store.state.logged" v-on:update-posts="updater"/>
			<div
				v-infinite-scroll="loadMore" 
				infinite-scroll-disabled="busy"
				infinite-scroll-distance="limit"	
			>
				<Post 
					@comment="goToSingleView"
					v-for="post in posts"
					:key="post.id"
					:post="post"
					@postDeleted="updater"
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
	posts: TPost[] = [];
	final = false;
	busy = false;
	limit = 5;
	
	created() {
		AOS.init();
		this.loadMore();
	}

	async loadMore() {
		if (!this.final) {
			this.busy = true;
			
			let append: TPost[] = [] 
			const response = await axios.get("http://localhost:3000/posts/");
			append = response.data.data;
			append = append.slice(this.posts.length, this.posts.length + this.limit);
			this.posts = this.posts.concat(append);
			this.busy = false;
			if (this.posts.length == response.data.data.length) this.final = true; 
		}

	}

	// When a new post is made we need to add it to the start of the array
	async updater() {
		const response = await axios.get("http://localhost:3000/posts/");
		let data = response.data.data;
		data = data.slice(0, this.posts.length + this.limit);
		this.posts = data;
	}

	async goToSingleView(value: string) {
		const postId = value;
		await this.$router.push("/post/"+ postId + "/true");
	}
}
</script>

<style scoped>
</style>
