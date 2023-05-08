
<template>
    <div class="container">
        <register v-if="!logIn"></register>
        <login v-if="logIn"></login>
        <el-button class="btn" @click="switchButton()">{{ textoBtn }}</el-button>
    </div>
</template>

<style>
.container {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
}

.btn {
    margin: 3% 0%;
}
</style>

<script>
import register from "../components/register.vue"
import login from "../components/login.vue"
export default {
    components: {
        // Registrar el componente importado
        register,
        login
    },
    data() {
        return {
            logIn: true,
            textoBtn: "Registrarse"
        }
    },
    methods: {
        switchButton() {
            this.logIn = !this.logIn;
            if (this.logIn) {
                this.textoBtn = "Registrarse";
            } else {
                this.textoBtn = "Iniciar sesión";
            }
        }
    }
}
</script>

