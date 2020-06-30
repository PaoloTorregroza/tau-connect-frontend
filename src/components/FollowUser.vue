<template>
    <div>
    <v-list-item two-line>
        <v-list-item-avatar>
          <img src="https://randomuser.me/api/portraits/women/11.jpg" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Sam Smith</v-list-item-title>
          <v-list-item-subtitle>@Sammy</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-icon>
            <v-btn outlined color="#7B0001" class="follow-btn">Follow</v-btn>
        </v-list-item-icon>
      </v-list-item>
    <v-divider />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';

@Component
export default class FollowUser extends Vue {

}
</script>

<style scoped>
.follow-btn {
    margin-bottom: -15px;
}
</style>