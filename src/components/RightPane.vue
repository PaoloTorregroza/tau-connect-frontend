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
    <v-card color="#ffc284" light>
      <v-card-title>Who to follow</v-card-title>
      <v-divider></v-divider>

      <FollowUser />
      <FollowUser />
      <FollowUser />
      <FollowUser />

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

@Component({
    components: {FollowUser}
})
export default class RightPanel extends Vue {

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
