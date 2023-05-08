<script>
import { logIn } from "../controllers/usersController";

// import { useUserStore } from "../stores/userStore";
import { ref, watch } from 'vue';

export default {
    data() {
        return {
            user: {
                email: null,
                password: null,
            },
            showPassword: false,
        }
    },
    methods: {
        togglePasswordVisibility() {
            this.showPassword = !this.showPassword; // Invertir el valor de showPassword al hacer clic en el botón
        },
        async signIn() {
            //Iniciamos y guardamos sesión
            const response = await logIn({ email: this.user.email, password: this.user.password })
            console.log("Responde vue: ", response);
            if (response === null) {

                await this.$swal({
                    title: "¡Error al iniciar sesión!",
                    icon: "error",
                    showCancelButton: false,
                    confirmButtonText: "OK",
                });


            } else {
                console.log("response.isAdmin: ", response.isAdmin);
                //Si el responde.admin es true quiere decir que es administrador entonces se le redirecciona al dashboard
                if (response.isAdmin === true) {
                    // const idd = this.id;
                    // console.log("id login: ", idd);
                    // this.$router.push({ name: "admin", params: { id: idd } });

                    this.$router.push('/homeAdmin');
                } else {
                    // const idd = this.id;
                    // console.log("id login: ", idd);
                    // this.$router.push({ name: "home", params: { id: idd } });
                    this.$router.push('/');
                }
            }
        }
    },
}
</script>



<template>
    <div class="containerRegister">
        <v-card class="mx-auto cardRegister" max-width="500">
            <v-card-title>Login</v-card-title>
            <v-img class="align-end text-white" height="200"
                src="https://res.cloudinary.com/dbftfrguy/image/upload/v1680650258/Premium_Vector___Cute_offline_twitch_banner_igj12t.jpg"
                cover>
            </v-img>

            <div class="inputContainer">
                <v-card-subtitle>Email</v-card-subtitle>
                <el-input v-model="user.email" placeholder="Your email" required />
            </div>
            <!-- <div class="inputContainer">
                <v-card-subtitle>Password</v-card-subtitle>
                <el-input v-model="user.password" placeholder="Your password" required />
            </div> -->

            <div class="inputContainer ">
                <v-card-subtitle>Password</v-card-subtitle>
                <div class="passwordField">
                    <el-input class="passInput" v-model="user.password"
                        :type="showPassword ? 'text' : 'password'" placeholder="Your password"></el-input>
                    <el-button class="passBtn" @click="togglePasswordVisibility">
                        <v-icon v-if="!showPassword">mdi-eye-outline </v-icon>
                        <v-icon v-if="showPassword">mdi-eye-off-outline </v-icon>
                    </el-button>
                </div>
            </div>

            <el-button type="primary" :icon="Delete" @click="signIn()">Ingresar</el-button>
        </v-card>
    </div>
</template>


<style>
.passwordField {
    display: flex;
    flex-direction: row;
    width: 100%;
}


.inputContainer {
    background-color: rgb(208, 209, 209);
    margin: 2% 5%;
    height: 50px;
}


.containerRegister {
    width: 100%;
    height: 100%;
    display: grid;
}

.cardRegister {
    margin: auto;
    width: 50%;
    display: flex !important;
    flex-direction: column !important;
    justify-items: center !important;

    background-color: rgb(219, 224, 224) !important;
}
</style>


