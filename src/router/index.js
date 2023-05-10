import { createRouter, createWebHistory } from 'vue-router'

//Views from components
import auth from '../views/auth.vue';

//Usuarios normales
import home from '../views/users/home.vue';
import addNewProject from "../views/users/project/addNewProject.vue";
import project from '../views/users/project/project.vue';
import addNewTask from '../views/users/project/addNewTask.vue';

//Admins
import homeAdmin from '../views/admins/homeAdmin.vue';
//Users
import listUsers from '../views/admins/manageUsers/listUsers.vue'
import editUser from '../views/admins/manageUsers/editUser.vue'
import newUser from '../views/admins/manageUsers/newUser.vue'
//Projects
import listProjects from '../views/admins/manageProjects/listProjects.vue'
import editProject from '../views/admins/manageProjects/editProject.vue'
import newProject from '../views/admins/manageProjects/newProject.vue'

//Auth para estado del usuario
import { authFirebase } from '../config/firebase/firebaseConfig.js';
import { useUserStore } from '../stores/userStore.js';


const router = createRouter({
  history: '',
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
      component: homeAdmin
    },
    {
      path: '/admin/users',
      name: 'listUsers',
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
    {
      path: '/admin/project/',
      name: 'listProjects',
      component: listProjects
    },
    {
      path: '/admin/project/edit/:id',
      name: 'editProject',
      component: editProject,
      props: true
    },
    {
      path: '/admin/project/new',
      name: 'newProjectAdmin',
      component: newProject,
    },

    //Para usuarios normales------------------------
    {
      path: '/addNewProject',
      name: 'newProject',
      component: addNewProject,
    },
    {
      path: '/project/:id',
      name: 'project',
      component: project,
    },
    {
      path: '/addNewTask/:id',
      name: 'newTask',
      component: addNewTask,
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
