<template>
  <v-app>
    <router-view class="main-view"></router-view>
  </v-app>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component
  export default class App extends Vue {
		
  }
</script>

<style>
</style>
