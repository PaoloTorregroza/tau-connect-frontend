<template>
    <v-card class="post-container">
        <div>
        <v-avatar class="avatar">
            <img :src="gravatar" />
        </v-avatar>
        </div>
        <div class="post-content">
            <v-list>
                <v-list-item-content>
                    <v-list-item-title style="font-weight: bold;">{{name}}</v-list-item-title>
                    <v-list-item-subtitle style="margin-top: 5px; color: gray;">{{username}}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-content>
					{{ body }}
				</v-list-item-content>
            </v-list>
        </div>
        <div class="actions">
            <v-icon class="action-icon" v-if="!liked" @click="like">{{ icons.like.icon }}</v-icon>
			<v-icon class="action-icon" v-else color="#7B0001" @click="like">{{ icons.liked.icon }}</v-icon>
			<v-icon class="action-icon">{{ icons.comment.icon }}</v-icon>
		</div>
		<div class="actions-info">
			<p>{{ likes.length }}</p>
			<p>200</p>
		</div>
	</v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import md5 from 'md5';
import axios from 'axios';

@Component 
export default class Post extends Vue {
	@Prop(String) readonly body: string;
	@Prop({default: " "}) readonly email: string;
	@Prop({default: "John Doe"}) readonly name: string;
	@Prop({default: "Undefined"}) readonly username: string;
	@Prop(String) readonly userid: string;
	@Prop(String) readonly postid: string; 
	
	liked = false;
	likes: JSON[] = [];
    
	icons = {
		like: {icon: "mdi-heart-outline"},
		liked: {icon: "mdi-heart"},
		comment: {icon: "mdi-comment-outline"}
	}

	// Computed

	get gravatar() {
		return "https://www.gravatar.com/avatar/" + md5(this.email.toLowerCase().trim());
    }

	// Hooks
	created() {	
		this.getPostLikes();
		this.isLiked();
	}

	// Methods

	async getPostLikes() {
		const likesData = await axios.get(`http://localhost:3000/likes/post/${this.postid}`)
		this.likes = likesData.data.data;
	}

	async isLiked() {
		const response = await axios.get(`http://localhost:3000/likes/post/${this.postid}/${this.$store.state.userData.id}`);
		this.liked = response.data.data;
	}
	
	async like() {
		this.liked = !this.liked;
		const config = {
			headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
		}
		await axios.put(`http://localhost:3000/posts/like/${this.postid}`, {}, config);
		this.getPostLikes();
    }
}
</script>

<style scoped>
.avatar {
    flex-grow: 1;
}

.post-content {
    flex-grow: 3;
    padding-right: 10px;
    padding-left: 10px;
    margin-top: -19px;
    border-right: 1px solid gray;
}

.post-container {
    padding: 18px;
    padding-bottom: 5px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
}

.actions {
    margin-left: 10px;
    display: flex;
    flex-direction:column;
    justify-content: flex-start;
}

.action-icon {
    margin-bottom: 15px;
}

.action-icon:hover {
    cursor: pointer;
}

.actions-info {
	margin-top: 3px;
	margin-left: 5px;
	color: gray;
	font-size: small;
	font-weight: 300;
}
</style>
