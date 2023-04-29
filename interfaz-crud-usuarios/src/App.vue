<script setup>
import { RouterLink, RouterView } from 'vue-router'

import navBar from './components/narvBar.vue';
import navBarAdmin from './components/navBarAdmin.vue';

</script>

<template>
  <v-app>

    <navBar v-if="!isAdmin && showNavBar"></navBar>
    <navBarAdmin v-else-if="isAdmin && showNavBar"></navBarAdmin>

    <div class="body">
      <RouterView />
    </div>

  </v-app>
</template>

<style>
.body {
  padding: 1% 5%;
  height: 100%;
}
</style>

<script>
import router from './router/index.js';
import { nextTick } from 'vue';
import { getUserById } from './controllers/usersController.js';

//Auth para estado del usuario
import { authFirebase } from './config/firebase/firebaseConfig.js';

export default {
  data() {
    return {
      isAdmin: false,
      showNavBar: true
    }
  },
  setup() {

  },
  async mounted() {
    router.beforeEach((to, from, next) => {
      // Ejecuta el código que deseas antes de que se redirija a cualquier ruta
      //const currentUser = authFirebase.currentUser;
      if (to.path === '/auth') {
        // Redirige a la ruta de autenticación solo si no es la misma ruta actual
        this.showNavBar = false;
        next();
      } else {

        //Verificar si está logueado, sino,  no se le deja pasar
        authFirebase.onAuthStateChanged((user) => {
          if (!user) {
            // El usuario está autenticado, puedes acceder a su información
            // Aquí puedes realizar acciones para usuarios autenticados, como redireccionar a una página de inicio de sesión exitosa, cargar datos específicos del usuario, etc.
            console.log('Acceso no autorizado, usuario no autenticado');
            this.showNavBar = false;
            next();
          }


          this.showNavBar = true;
          next();
        });

      }
    });
  }
};

</script>
