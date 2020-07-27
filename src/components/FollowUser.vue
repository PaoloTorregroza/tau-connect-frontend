<template>
    <div>
    <v-list-item two-line>
        <v-list-item-avatar>
          <img :src="gravatar" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{name}}</v-list-item-title>
          <v-list-item-subtitle>{{username}}</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-icon>
            <v-btn 
              v-if="!followed"
              outlined 
              color="#7B0001" 
              class="follow-btn" 
              @click="follow"
            >Follow</v-btn>
            <v-btn 
              v-else
              dark
              color="#7B0001" 
              class="follow-btn" 
              @click="follow"
            >{{followersData.length}}</v-btn>
        </v-list-item-icon>
      </v-list-item>
    <v-divider />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import axios from 'axios';
import md5 from 'md5';

@Component
export default class FollowUser extends Vue {
  @Prop(String) readonly userid: string;
  @Prop(String) readonly username: string;
  @Prop(String) readonly name: string;
  @Prop(String) readonly email: string;

  followed = false;
  followersData: TUser[] = [];

  created() {
    this.getFollowers();
  }

  get gravatar() {
    return "https://www.gravatar.com/avatar/" + md5(this.email.toLowerCase().trim());
  }

  async follow() {
    this.followed = !this.followed;
    const config = {
      headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
    }
    const body = {
      userId: this.userid
    }
    await axios.put("http://localhost:3000/users/follow", body, config);
    this.getFollowers();
  }

  async getFollowers() {
    const results = await axios.get(`http://localhost:3000/users/followers/${this.userid}`);
    this.followersData = results.data.data;
    this.checkIfFollowed();
  }

  checkIfFollowed() {
    for (let i = 0; i < this.followersData.length; i++){
      if (this.$store.state.userData.id == this.followersData[i].id) {
        this.followed = true;
        break;
      }
    }
  }
}
</script>

<style scoped>
.follow-btn {
    margin-bottom: -15px;
}
</style>
