<template>
    <v-card text="Actual data">
        <div v-if="loading">Loading...</div>
        <v-table v-if="!loading">
            <thead>
                <tr>
                    <td>
                        <th class="text-left">Name</th>
                    </td>
                    <td>
                        <th class="text-left">Surname</th>
                    </td>
                    <td>
                        <th class="text-left">Email</th>
                    </td>
                    <td>
                        <th class="text-left">City</th>
                    </td>
                    <td>
                        <th class="text-left">Birthdate</th>
                    </td>
                    <td>

                    </td>
                    <td>
                        
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr >
                    <td>{{ user.name }}</td>
                    <td>{{ user.surname }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.city }}</td>
                    <td>{{ user.birthdate }}</td>
                </tr>
            </tbody>
        </v-table>
    </v-card>

    <h1>New data</h1>
    
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
                    <v-text-field v-model="user.city" :rules="nameRules" :counter="10" label="Your city"
                        required></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                    <v-text-field v-model="user.birthdate" :rules="nameRules" :counter="10" label="Your birthdate"
                        required></v-text-field>
                </v-col>

            </v-row>
            <v-btn  @click="editUser()">Editar</v-btn>
        </v-container>
    </v-form>

    <!-- <h1>edit: {{ user.surname }}</h1> -->
</template>


<script>

import { getUserById, update } from "../controllers/usersController";



export default {
    data() {
        return{
            user: {
                name: "",
                surname: "",
                email: '',
                city: '',
                birthdate: '',
            },
        }
        
    },
    created(){
        this.getUser();
    },
    methods:{
        async getUser(){
            try {
                const user = await getUserById(this.$route.params.id);
                this.user = user;
            } catch (error) {
                console.error('Error al obtener el usuario:', error);
                throw error;
            }
        },
        async editUser(){
            const res = await update(this.$route.params.id, this.user);
            console.log("resultado edición: ", res);
        },
    }
};
</script>