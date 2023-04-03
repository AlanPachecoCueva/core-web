import { createRouter, createWebHistory } from 'vue-router'
import listUsers from '../views/listUsers.vue'
import editUser from '../views/editUser.vue'
import newUser from '../views/newUser.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: listUsers
    },
    {
      path: '/edit/:id',
      name: 'editUser',
      component: editUser,
      props: true
    },
    {
      path: '/new/',
      name: 'newUser',
      component: newUser,
      props: true
    }
  ]
})

export default router
//createApp(AppLayout).use(router).mount('#app')
