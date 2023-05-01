
<script>
import { computed  } from 'vue';

import { useUserStore } from "../stores/userStore";

import { logOut } from "../controllers/usersController";
export default {
    data() {

        return {
        }
    },
    methods: {
        goHome() {
            this.$router.push('/');
        },
        async signOut() {
            try {
                await logOut();
            }
            catch (error) {
                console.log(error);
            }
        }
    },
    setup(){
        const store = useUserStore();
        const user = computed(() => {
            return store.getUser;
        });
        console.log("User at navBar: ", user);
        return { user }; 
    },
    mounted() {
        const store = useUserStore();
        const user = computed(() => {
            return store.getUser;
        });
        // watch(() => store.user, (newValue) => {
        //     user.value = newValue;
        // });
            // const user = {
            //     name: "Hola"
            // }
            console.log("User at navBar: ", user);
         return { user };
    },
}
</script>

<template>
    <v-app-bar color="primary" density="compact" class="navBar">
        <v-btn icon @click="goHome()">
            <v-icon>mdi-home</v-icon>
        </v-btn>


        <!-- <template v-slot:prepend>
                                    <v-app-bar-nav-icon></v-app-bar-nav-icon>
                                  </template> -->

        <v-app-bar-title>Guru Project</v-app-bar-title>
        <h2>Bienvenid@ {{ user.name }} {{ user.surname }} </h2>

        <v-btn @click="signOut()"> <v-icon>mdi-logout </v-icon></v-btn>
        <!-- <template v-slot:append>
                                    <v-btn icon="mdi-dots-vertical"></v-btn>
                                  </template> -->
    </v-app-bar>
</template>

<style>
.navBar {
    position: inherit !important;
}
</style>