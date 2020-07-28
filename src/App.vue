<template>
  <v-app>
    <router-view class="main-view"></router-view>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import infiniteScroll from 'vue-infinite-scroll';
import axios from 'axios';
Vue.use(infiniteScroll);

@Component
export default class App extends Vue {

  async created() {
    await this.checkToken();
  }

  async checkToken() {
    const config = {
      headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
    }
	try{
		if (this.$store.state.userData.id) {
			await axios.get("http://localhost:3000/users/"+this.$store.state.userData.id,
				config
			);
		}
	} catch(e) {
		localStorage.clear();	
		this.$store.commit("logout");
		await this.$router.push("/login");
	}
  }
}
</script>

<style scoped>
</style>
