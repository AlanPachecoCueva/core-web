<script setup>
import { RouterLink, RouterView } from 'vue-router'
import listUsers from './views/listUsers.vue'

</script>

<!-- <template>
  <v-app>
    <listUsers></listUsers>
  </v-app>
  

  <RouterView />
</template> -->
<template>
  <v-app>
    <v-app-bar color="primary" density="compact" class="navBar">
      <v-btn icon @click="goHome()">
        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-btn icon @click="goToNewUser()">
        <v-icon>mdi-plus</v-icon>
      </v-btn>

      <!-- <template v-slot:prepend>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
      </template> -->

      <v-app-bar-title>USERS DASHBOARD</v-app-bar-title>

      <!-- <template v-slot:append>
        <v-btn icon="mdi-dots-vertical"></v-btn>
      </template> -->
    </v-app-bar>

    <div class="body">
      <RouterView />
    </div>
    
  </v-app>
</template>

<style>
  .navBar{
    position:inherit !important;
  }

  .body{
    padding: 1% 5%;
    height: 100%;
  }
</style>

<script>
export default {
  methods: {
    goToNewUser() {
      this.$router.push('/new');
    },
    goHome(){
      this.$router.push('/');
    }
  }
}

</script>
