<template>
  <v-app>
    <router-view class="main-view"></router-view>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import infiniteScroll from 'vue-infinite-scroll';
import { checkToken } from './utils/auth-utils';
Vue.use(infiniteScroll);

@Component
export default class App extends Vue {
    async created() {
        await checkToken(this);
    }
}
</script>

<style scoped>
</style>
