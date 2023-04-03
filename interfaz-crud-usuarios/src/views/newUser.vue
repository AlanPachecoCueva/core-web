<template>
    <v-form v-model="valid">
        <v-container>
            <v-row>
                <v-col cols="12" md="4">
                    <v-text-field v-model="user.name" :rules="nameRules" :counter="10" label="Your name"></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                    <v-text-field v-model="user.surname" :rules="nameRules" :counter="10" label="Last name"
                        required></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                    <v-text-field v-model="user.email" :rules="nameRules" :counter="10" label="Your email"
                        required></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                    <v-text-field v-model="user.password" :rules="nameRules" :counter="10" label="Your password"
                        required></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                    <v-text-field v-model="user.city" :rules="nameRules" :counter="10" label="Your city"
                        required></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                    <v-text-field v-model="user.birthdate" :rules="nameRules" :counter="10" label="Your birthdate"
                        required></v-text-field>
                </v-col>

            </v-row>
            <v-btn  @click="createUser()">Agregar</v-btn>
        </v-container>
    </v-form>
</template>


<script>

import { create } from "../controllers/usersController";



export default {
    data() {
        return{
            user: {
                name: "",
                surname: "",
                password: "",
                email: '',
                city: '',
                birthdate: '',
            },
        }
        
    },
    methods:{
        // async getUser(){
        //     try {
        //         const user = await getUserById(this.$route.params.id);
        //         this.user = user;
        //     } catch (error) {
        //         console.error('Error al obtener el usuario:', error);
        //         throw error;
        //     }
        // },
        async createUser(){
            const res = await create(this.user);
            this.$router.push('/');
        },
    }
};
</script>