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
    <header>
      <nav>
        <!-- <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink> -->
      </nav>
    </header>

    <RouterView />
  </v-app>
</template>


<style>
</style>
