<template>
  <div>
    <CommentWriter
      :show.sync="showComment"
      :post-id="post.id"
      @commented="getPost"
    />
    <router-link id="back" to="/">
        <v-icon style="color: #1a1a1a;">mdi-arrow-left</v-icon>
    </router-link>
    <div v-if="post.id" class="singlePostContainer">
      <Post @postDeleted="$router.push('/')" @comment="showComment = true" :clickable="false" :post="post"/>
      <Comment 
        v-for="comment in comments"
        :key="comment.id" 
        :comment="comment"
        @commentDeleted="getPost"
        data-aos="slide-up"
        data-aos-offset="100" 
        data-aos-easing="ease-out-back"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import axios from 'axios';
  import Post from '../components/Post.vue';
  import CommentWriter from '../components/CommentWriter.vue';
  import Comment from '../components/Comment.vue';
  import * as AOS from 'aos';
  import 'aos/dist/aos.css';

  @Component({
    components: { Post, Comment, CommentWriter }
  })
  export default class SinglePost extends Vue {
    user: TUser;
    comments: TComment[];
    showComment = false;
    post: TPost = {
      id: "",
      body: "",
      user: this.user,
      comments: []
    };

    async created() {
      AOS.init();
      this.showComment = this.$route.params.forComment === "true";
      await this.getPost();
    }

    async getPost() {
        const url: string = this.$apiUrl + "/posts/" + this.$route.params.id;
        try {
            const results = await axios.get(url);
            this.post = results.data.data;
            if (this.post.comments) {
                this.comments = this.post.comments.reverse();
            }
        } catch (e) {
            await this.$router.push("/404");
        }
    }
  }
</script>

<style>
#back {
    margin: 25px 0 0 25px;
    text-decoration: none;
    position: absolute;
}

.singlePostContainer {
  margin: 3% 20% 0 20%;
}
</style>
