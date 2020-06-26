<template>
  <v-app>
    <LeftPanel></LeftPanel>
    <router-view class="main-view"></router-view>
    <RightPanel></RightPanel>
  </v-app>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import LeftPanel from './components/LeftPanel.vue';
  import RightPanel from './components/RightPane.vue';

  @Component({
    components: {
      LeftPanel,
      RightPanel
    }
  })
  export default class App extends Vue {

  }
</script>

<style scoped>



</style>
