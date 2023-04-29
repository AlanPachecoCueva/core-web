import { createRouter, createWebHistory } from 'vue-router'

//Views from components
import listUsers from '../views/admins/listUsers.vue'
import editUser from '../views/admins/editUser.vue'
import newUser from '../views/admins/newUser.vue'
import auth from '../views/auth.vue';
import home from '../views/users/home.vue';
import addNewProject from "../views/users/addNewProject.vue";

//Auth para estado del usuario
import { authFirebase } from '../config/firebase/firebaseConfig.js';
import { useUserStore } from '../stores/userStore.js';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    //Para el login/register
    {
      path: '/auth',
      name: 'auth',
      component: auth
    },
    //Home para usuarios normales
    {
      path: '/',
      name: 'home',
      component: home
    },
    //Home para admins
    {
      path: '/homeAdmin',
      name: 'homeAdmin',
      component: listUsers
    },
    {
      path: '/admin/edit/:id',
      name: 'editUser',
      component: editUser,
      props: true
    },
    {
      path: '/admin/new',
      name: 'newUser',
      component: newUser,
    },

    //Para usuarios normales------------------------
    {
      path: '/addNewProject',
      name: 'newProject',
      component: addNewProject,
    },
  ]
})


//Para validar que esté logueado
// Registra el hook beforeEach en el router
router.beforeEach((to, from, next) => {
  if (to.fullPath !== "/auth") {
    //Verificar si está logueado, sino,  no se le deja pasar

    const userStore = useUserStore();

    const isLogued = userStore.getIsLogued;

    console.log("isLogued: ", isLogued);
    if (!isLogued) {
      // El usuario está autenticado, puedes acceder a su información
      // Aquí puedes realizar acciones para usuarios autenticados, como redireccionar a una página de inicio de sesión exitosa, cargar datos específicos del usuario, etc.

      console.log('Acceso no autorizado, usuario no autenticado, redireccionando a Auth');
      next('/auth');

    }
  }
  next();
});

export default router
//createApp(AppLayout).use(router).mount('#app')
