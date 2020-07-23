<template>
  <v-navigation-drawer 
    fixed 
    right 
    permanent 
    light 
    color="#FFFFFF" 
    class="right-panel" 
    width="30%"
  >
    <v-card color="#ffefe0" light>
      <v-card-title>Who to follow</v-card-title>
      <v-divider></v-divider>

      <FollowUser 
        v-for="user in users" 
        v-bind:key="user.id"
        :name="user.name"
        :username="user.username"
        :email="user.email"
        :userid="user.id"  
      />

    </v-card>

    <template v-slot:append>
        <div class="footer">
            <p>Made whit love by Paolinsky</p>
        </div>
    </template>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import FollowUser from "./FollowUser.vue";
import axios from 'axios';

@Component({
    components: {FollowUser}
    
})
export default class RightPanel extends Vue {
  users = [];

  // Hooks
  created() {
    this.getTopUsers();
  }

  // Methods
  async getTopUsers() {
    const results = await axios.get("http://localhost:3000/users/"); 
    this.users = results.data.data;
  }
}
</script>

<style scoped>
.right-panel {
  padding: 1%;
}

.footer {
    text-align: center;
    color: gray;
    font-weight: 300;
}
</style>
