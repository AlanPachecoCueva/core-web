<template>
    <div class="container">


        <v-form v-model="valid" class="form">
            <h1>NEW USER</h1>
            <v-container class="formContainer">
                <v-row class="row">
                    <v-col cols="12" md="5">
                        <v-text-field v-model="user.name" :rules="nameRules" :counter="3" label="Your name"></v-text-field>
                    </v-col>

                    <v-col cols="12" md="5">
                        <v-text-field v-model="user.surname" :rules="nameRules" :counter="3" label="Last name"
                            required></v-text-field>
                    </v-col>
                </v-row>

                <v-row class="row">
                    <v-col cols="12" md="5">
                        <v-text-field v-model="user.email" :rules="[emailRule]" :counter="15" label="Your email"
                            required></v-text-field>
                    </v-col>

                    <v-col cols="12" md="5">
                        <v-text-field v-model="user.password" :rules="nameRules" :counter="6" label="Your password"
                            required></v-text-field>
                    </v-col>
                </v-row>

                <v-row class="row">
                    <v-col cols="12" md="5">
                        <v-text-field v-model="user.city" :rules="nameRules" :counter="4" label="Your city"
                            required></v-text-field>
                    </v-col>

                    <v-col cols="12" md="5">
                        <v-text-field v-model="user.birthdate" :rules="nameRules" :counter="8" label="Your birthdate"
                            required></v-text-field>
                    </v-col>

                </v-row>

                <v-btn @click="createUser()">Agregar</v-btn>
            </v-container>
        </v-form>
    </div>

    <!-- Usuario agregado correctamente -->
    <vue-sweetalert2
        title="Agregado correctamente"
        text="El usuario se ha agregado correctamente!"
        type="success"
        confirmButtonText="OK"
        v-if="userCreated"
    ></vue-sweetalert2>
</template>


    
<script>
//Alertas
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import { create } from "../controllers/usersController";

export default {
    data() {
        return {
            user: {
                name: "",
                surname: "",
                password: "",
                email: '',
                city: '',
                birthdate: '',
            },
            emailRule: [
                v => !!v || 'El correo electrónico es requerido',
                v => /.+@.+\..+/.test(v) || 'El correo electrónico debe ser válido'
            ]
        }

    }, components: {
        VueSweetalert2,
    },
    methods: {
        async createUser() {
            const result = await this.$swal({
                title: '¿Desea guardar el usuario?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Sí',
                cancelButtonText: "No",
            });
            if (result.isConfirmed) {
                
                const res = await create(this.user);

                await this.$swal({
                    title: "¡Usuario guardado!",
                    icon: "success",
                    showCancelButton: false,
                    confirmButtonText: "OK",
                });

                this.$router.push('/');    

            }

                  
        },
    }
};
</script>

<style>
.container {
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
}

.form {
    width: 80%;
    text-align: center;
}

.formContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.row {
    width: 70%;
    justify-content: center;
}
</style>