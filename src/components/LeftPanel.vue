<template>
    <v-navigation-drawer
      class="left-panel"
      fixed
      permanent
      left
      light
      color="#FFFFFF"
      width="20%"
    >
      <v-list>
        <v-list-item>
            <img class="icon" src="../assets/tauLogo.png" alt="Logo">
        </v-list-item>
        <v-list-item
          class="list-item-container"
          v-for="item in items"
          :key="item.title"
        >
          <v-list-item-icon style="margin-right: 13px;">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="list-item">{{ item.title }}</v-list-item-title>
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

.icon {
    width: 30px;
    margin-left: -3px;
}

.list-item-container:hover {
    cursor: pointer;
    background-color: #ffc284;
    border-radius: 25px;
    color: white;
}

.list-item {
    font-size: 21px;
    font-weight: bold;
}
</style>
