import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const userStore = defineStore({
  id: 'user',
  state: () => ({
    id: '',
    username: '',
    surname: '',
    email: '',
    password: '',
    city: '',
    birthdate: ''
  }),
  actions: {
    setUser(user) {
      this.id = user.id
      this.name = user.username
      this.surname = user.surname
      this.email = user.email
      this.password = user.password
      this.city = user.city
      this.birthdate = user.birthdate
    }
  }
})