import axios from 'axios';
import Vue from 'vue';

export async function checkToken(instance: Vue) {
    const config = {
      headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
    }
    try{
        if (instance.$store.state.userData.id) {
            await axios.get(`${instance.$apiUrl}/users/`+instance.$store.state.userData.id,
                config
            );
        }
    } catch(e) {
        localStorage.clear();	
        instance.$store.commit("logout");
        await instance.$router.push("/login");
    }
}
