<script setup>
import { RouterLink, RouterView } from 'vue-router'

import navBar from './components/narvBar.vue';
import navBarAdmin from './components/navBarAdmin.vue';

</script>

<template>
  <v-app>
    <div v-if="isLoading" className="loading">
    </div>
    <div v-else-if="!isLoading">
      <navBar v-if="!user.isAdmin && showNavBar"></navBar>
      <navBarAdmin v-else-if="user.isAdmin && showNavBar"></navBarAdmin>

      <div class="body">
        <RouterView />
      </div>
    </div>


  </v-app>
</template>

<style>
.body {
  padding: 1% 5%;
  height: 100%;

  background-color: #151b25;
  color: white;
}
body {
  margin: 0;
}
.loading {
  width: 100%;
  height: 100%;

  background-color: #e5e5f7;
  opacity: 0.8;
  background-image: radial-gradient(#444cf7 1.25px, #e5e5f7 1.25px);
  background-size: 25px 25px;


}
</style>

<script>
import router from './router/index.js';
import { useUserStore } from "./stores/userStore";
import { computed } from 'vue';
//Auth para estado del usuario
import { authFirebase } from './config/firebase/firebaseConfig.js';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      user: {

      },
      showNavBar: true,
      isLoading: true,
    }
  },
  methods: {

    async showLoading() {

      this.isLoading = true;


      await Swal.fire({
        title: 'Cargando...',
        allowOutsideClick: false,
        showConfirmButton: false,
        onBeforeOpen: () => {
          Swal.showLoading();
        },
        didOpen: () => {
          console.log("onBeforeOpen");

          // Aquí va tu código para cargar los datos
          setTimeout(() => {

            console.log("setTimeout");
            //una vez se cargaron todos los componentes se establece el isLoading en false

            Swal.close();
          }, 1500);
        }
      });
      console.log("Isloading false");
      this.isLoading = false;


    }
  },
  async mounted() {
    try {

      const store = useUserStore();
      this.user = computed(() => {
        return store.getUser;
      });
      console.log("AAAA: ", this.user);

      router.beforeEach((to, from, next) => {
        // Ejecuta el código que deseas antes de que se redirija a cualquier ruta
        //const currentUser = authFirebase.currentUser;




        if (to.path == '/auth') {
          // Redirige a la ruta de autenticación solo si no es la misma ruta actual
          this.showNavBar = false;
          this.isLoading = false;
          
        } else {
          this.showLoading();
          //Verificar si está logueado, sino,  no se le deja pasar
          authFirebase.onAuthStateChanged((user) => {
            this.isLoading = true;
            if (!user) {
              // El usuario está autenticado, puedes acceder a su información
              // Aquí puedes realizar acciones para usuarios autenticados, como redireccionar a una página de inicio de sesión exitosa, cargar datos específicos del usuario, etc.
              console.log('Acceso no autorizado, usuario no autenticado');

              this.showNavBar = false;
            }


            this.showNavBar = true;
          });

        }

        next();
        //Swal.close();
      });

      
      await router.isReady(); //esperar a que se carguen todas las rutas



      // forzar refresco de la página
      // window.location.reload(true);

    } catch (error) {
      console.log(error);
    }
  }
};

</script>
