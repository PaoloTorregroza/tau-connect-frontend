<template>
  <v-card class="comment-container">
        <div>
        <v-avatar class="avatar">
            <img :src="gravatar" />
        </v-avatar>
        </div>
        <div class="comment-content">
            <v-list>
                <v-list-item-content>
                    <v-list-item-title style="font-weight: bold;">{{comment.user.name}}</v-list-item-title>
                    <v-list-item-subtitle style="margin-top: 5px; color: gray;">{{comment.user.username}}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-content>
					{{ comment.body }}
				</v-list-item-content>
            </v-list>
        </div>
        <div class="actions">
            <v-icon class="action-icon" v-if="!liked" @click="like">{{ icons.like.icon }}</v-icon>
			<v-icon class="action-icon" v-else color="#7B0001" @click="like">{{ icons.liked.icon }}</v-icon>
		</div>
		<div class="actions-info">
			<p>{{ likes.length }}</p>
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
  export default class Comment extends Vue {
    @Prop() comment: TComment;

    liked = false;
    likes: JSON[] = [];

    icons = {
      like: {icon: "mdi-heart-outline"},
      liked: {icon: "mdi-heart"}
    }

    // Hooks
    created() {	
      this.getPostLikes();
      this.isLiked();
    }
    
    // Computed
    get gravatar() {
      return "https://www.gravatar.com/avatar/" + md5(this.comment.user.email.toLowerCase().trim());
    }

    // Methods
    async like() {
      this.liked = !this.liked;
      const config = {
        headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
      }
      
      await axios.put(`http://localhost:3000/comments/like/${this.comment.id}`, {}, config);
      this.getPostLikes();
    }

    async isLiked() {
      const response = await axios.get(`http://localhost:3000/likes/comment/${this.comment.id}/${this.$store.state.userData.id}`);
      this.liked = response.data.data;
    }

    async getPostLikes() {
      const likesData = await axios.get(`http://localhost:3000/likes/comment/${this.comment.id}`);
      this.likes = likesData.data.data;
    }
  }
</script>

<style scoped>
.avatar {
    flex-grow: 1;
}

.comment-content {
    flex-grow: 3;
    padding-right: 10px;
    padding-left: 10px;
    margin-top: -19px;
    border-right: 1px solid gray;
}

.comment-container {
    padding: 18px;
    padding-bottom: 5px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    margin-left: 10%;
    margin-right: 10%;
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