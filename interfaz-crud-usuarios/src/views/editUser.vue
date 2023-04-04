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
                <tr>
                    <td>{{ user.name }}</td>
                    <td>{{ user.surname }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.city }}</td>
                    <td>{{ user.birthdate }}</td>
                </tr>
            </tbody>
        </v-table>
    </v-card>

    <div class="container">
        <v-form v-model="valid" class="form">
            <h1>New data</h1>
            <v-container class="formContainer">
                <v-row class="row">
                    <v-col cols="12" md="4">
                        <v-text-field v-model="user.name" :rules="nameRules" :counter="10" label="Your name"></v-text-field>
                    </v-col>

                    <v-col cols="12" md="4">
                        <v-text-field v-model="user.surname" :rules="nameRules" :counter="10" label="Last name"
                            required></v-text-field>
                    </v-col>
                </v-row>
                <v-row class="row">
                    <v-col cols="12" md="4">
                        <v-text-field v-model="user.email" :rules="nameRules" :counter="10" label="Your email"
                            required></v-text-field>
                    </v-col>

                    <v-col cols="12" md="4">
                        <v-text-field v-model="user.city" :rules="nameRules" :counter="10" label="Your city"
                            required></v-text-field>
                    </v-col>

                </v-row>
                <v-row class="row">
                    <v-col cols="12" md="4">
                        <v-text-field v-model="user.birthdate" :rules="nameRules" :counter="10" label="Your birthdate"
                            required></v-text-field>
                    </v-col>

                </v-row>
                <v-btn @click="editUser()">Editar</v-btn>
            </v-container>
        </v-form>

    </div>


    <!-- <h1>edit: {{ user.surname }}</h1> -->
</template>

<style>
.container {
    width:100%;
    height:100%;

    display:flex;
    align-items: center;
    justify-content: center;
}

.form{
    width:80%;
    text-align: center;
}

.formContainer{
    display: flex;
    flex-direction: column;
    align-items: center;
}

.row{
    width:70%;
    justify-content: center;
}
</style>

<script>

import { getUserById, update } from "../controllers/usersController";



export default {
    data() {
        return {
            user: {
                name: "",
                surname: "",
                email: '',
                city: '',
                birthdate: '',
            },
        }

    },
    created() {
        this.getUser();
    },
    methods: {
        async getUser() {
            try {
                const user = await getUserById(this.$route.params.id);
                this.user = user;
            } catch (error) {
                console.error('Error al obtener el usuario:', error);
                throw error;
            }
        },
        async editUser() {
            const result = await this.$swal({
                    title: '¿Desea editar el usuario?',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Sí',
                    cancelButtonText: "No",
                });
            if (result.isConfirmed) {
                const res = await update(this.$route.params.id, this.user);

                if(res){
                        await this.$swal({
                            title: "¡Usuario editado!",
                            icon: "success",
                            showCancelButton: false,
                            confirmButtonText: "OK",
                        });
                        console.log("Se editó con éxito");
                        this.$router.push('/');
                }else{
                    await this.$swal({
                            title: "¡No se pudo editar el usuario!",
                            icon: "error",
                            showCancelButton: false,
                            confirmButtonText: "OK",
                        });
                }
            }

            
            
        },
    }
};
</script>