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
            <v-btn outlined color="#7B0001" class="follow-btn">Follow</v-btn>
        </v-list-item-icon>
      </v-list-item>
    <v-divider />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import md5 from 'md5';

@Component
export default class FollowUser extends Vue {
  @Prop(String) readonly userid: string;
  @Prop(String) readonly username: string;
  @Prop(String) readonly name: string;
  @Prop(String) readonly email: string;

  get gravatar() {
    return "https://www.gravatar.com/avatar/" + md5(this.email.toLowerCase().trim());
  }
}
</script>

<style scoped>
.follow-btn {
    margin-bottom: -15px;
}
</style>
