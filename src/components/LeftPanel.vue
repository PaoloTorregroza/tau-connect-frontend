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
      <v-list v-if="logged">
        <v-list-item>
            <img class="icon" src="../assets/tauLogo.png" alt="Logo">
        </v-list-item>
        <router-link
                v-for="item in items"
                style="text-decoration: none; color: #1a1a1a;"
                :to="item.to"
                :key="item.title"
        >
          <v-list-item
            class="list-item-container"
          >
            <v-list-item-icon style="margin-right: 13px;">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title class="list-item">
                  {{ item.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
		<v-list-item class="list-item-container" @click="Logout">
			<v-list-item-icon style="margin-right: 13px;">
				<v-icon>mdi-logout</v-icon>
			</v-list-item-icon>

			<v-list-item-content>
				<v-list-item-title class="list-item">Logout</v-list-item-title>
			</v-list-item-content>
		</v-list-item>
		</v-list>

      <v-list v-else>
        <v-list-item>
          <img class="icon" src="../assets/tauLogo.png" alt="Logo">
        </v-list-item>
        <router-link
                v-for="item in itemsNotLogged"
                style="text-decoration: none; color: #1a1a1a;"
                :to="item.to"
                :key="item.title"
        >
          <v-list-item
                  class="list-item-container"
          >
            <v-list-item-icon style="margin-right: 13px;">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title class="list-item">
                {{ item.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
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
  logged = localStorage.getItem('token')? true : false;

  items = [
    { title: 'Home', icon: 'mdi-home-variant', to: "/" },
    { title: 'User', icon: 'mdi-account-outline', to: "/" },
    { title: 'Search', icon: 'mdi-magnify', to: "/" },
  ]

  itemsNotLogged = [
    { title: 'Home', icon: 'mdi-home-variant', to: "/" },
    { title: 'Login', icon: 'mdi-account-outline', to: "/login" },
    { title: 'Register', icon: 'mdi-arrow-right', to: "/register" },
  ]

	Logout() {
		localStorage.removeItem('token');
		window.location.href = "/";
	}
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
