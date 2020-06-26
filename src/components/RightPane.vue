<template>
    <v-navigation-drawer
      fixed
      permanent
      right
      width="30%"
    >
      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          @click="something"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class RightPanel extends Vue {
    items = [
          { title: 'Home', icon: 'mdi-home-city' },
          { title: 'My Account', icon: 'mdi-account' },
          { title: 'Users', icon: 'mdi-account-group-outline' },
        ]
}
</script>

<style scoped>

</style>