<template>
  <div>
    <CommentWriter
      :show.sync="showComment" 
    />
    <router-link id="back" to="/">
        <v-icon style="color: #1a1a1a;">mdi-arrow-left</v-icon>
    </router-link>
    <div v-if="post.id" class="singlePostContainer">
      <Post @comment="showComment = true" :post="post"/>
      <Comment 
        v-for="comment in comments"
        :key="comment.id" 
        :comment="comment"
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
      
      this.checkIfForComment();

      const url = "http://localhost:3000/posts/" + this.$route.params.id
      const results = await axios.get(url);
      this.post = results.data.data;
      if (this.post.comments) this.comments = this.post.comments;
    }

    checkIfForComment() {
      if (this.$route.params.forComment === "true") {
        this.showComment = true;
      } else {
        this.showComment = false;
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
