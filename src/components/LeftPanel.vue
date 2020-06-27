<template>
    <v-navigation-drawer
      class="left-panel"
      fixed
      permanent
      left
      light
      color="#FFFFFF"
      width="22.5%"
    >
      <v-list dense>
        <v-list-item>
            <img class="logo" src="../assets/tauLogo.png" alt="Logo">
        </v-list-item>
        <v-list-item
          v-for="item in items"
          :key="item.title"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <v-divider></v-divider>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/women/81.jpg">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Jane Smith</v-list-item-title>
            <v-list-item-subtitle>@Jane</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>

    </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class LeftPanel extends Vue {
    items = [
          { title: 'Home', icon: 'mdi-home' },
          { title: 'My Account', icon: 'mdi-account' },
          { title: 'Users', icon: 'mdi-account-group-outline' },
        ]
}
</script>

<style scoped>
.left-panel {
    padding: 25px;
}

.logo {
    width: 24px;
}
</style>
