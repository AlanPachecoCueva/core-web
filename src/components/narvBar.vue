<script>
import { computed } from "vue";

import { useUserStore } from "../stores/userStore";

import { logOutGoogle } from "../controllers/usersController";
export default {
  data() {
    return {};
  },
  methods: {
    goHome() {
      this.$router.push("/");
    },
    async signOut() {
      try {
        
        await logOutGoogle();
        console.log("AJAJA");
        window.location.reload();
        console.log("AJAJA x2");
      } catch (error) {
        console.log(error);
      }
    },
  },
  setup() {
    const store = useUserStore();
    const user = computed(() => {
      return store.getUser;
    });
    console.log("User at navBar: ", user);
    return { user };
  },
  mounted() {
    // gapi.load("auth2", function () {
    //   gapi.auth2.init({
    //     client_id: "729320449938-0lpd8fran2mbogudp6sfn794snhf634u.apps.googleusercontent.com", // Reemplaza esto con tu Client ID.
    //   });
    // });

    const store = useUserStore();
    const user = computed(() => {
      return store.getUser;
    });
    console.log("User at navBar: ", user);
    return { user };
  },
};
</script>

<template>
  <v-app-bar density="compact" class="navBar">
    <i @click="goHome()" class="mdi mdi-home mdi-36px iconBtn"></i>
    <v-app-bar-title id="barTitle">Guru Project</v-app-bar-title>
    <h2>Bienvenid@ {{ user.name }} {{ user.surname }}</h2>

    <i @click="signOut()" class="mdi mdi-logout mdi-36px iconBtn"></i>
  </v-app-bar>
</template>
