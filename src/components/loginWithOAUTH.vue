<template>
  <div class="containerRegister">
    <v-card class="cardRegister" max-width="500">
      <v-card-title>Login</v-card-title>
      <v-img
        height="200"
        src="https://res.cloudinary.com/dbftfrguy/image/upload/v1680650258/Premium_Vector___Cute_offline_twitch_banner_igj12t.jpg"
        cover
      >
      </v-img>

      <div class="inputContainer">
        <v-card-subtitle>Email</v-card-subtitle>
        <el-input v-model="user.email" placeholder="Your email" required />
      </div>

      <div class="inputContainer">
        <v-card-subtitle>Password</v-card-subtitle>
        <div class="passwordField">
          <el-input
            v-model="user.password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Your password"
          ></el-input>
          <el-button @click="togglePasswordVisibility">
            <v-icon v-if="!showPassword">mdi-eye-outline </v-icon>
            <v-icon v-if="showPassword">mdi-eye-off-outline </v-icon>
          </el-button>
        </div>
      </div>

      <el-button type="primary" :icon="Delete" @click="signIn()"
        >Ingresar</el-button
      >

      <!-- Google Sign-in button -->
      <div v-show="!profile" id="g-signin2"></div>
      <div v-if="profile">
        <pre>{{ profile }}</pre>
        <button @click="signOut">Sign Out</button>
      </div>
    </v-card>
  </div>
</template>

<script>
import { logInGoogle } from "../controllers/usersController";
// Importa Axios
import axios from "axios";
import VueJwtDecode from "vue-jwt-decode";

export default {
  data() {
    return {
      user: {
        email: null,
        password: null,
      },
      showPassword: false,
      profile: null,
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    async signIn() {
      const params = new URLSearchParams();
      params.append(
        "client_id",
        "729320449938-0lpd8fran2mbogudp6sfn794snhf634u.apps.googleusercontent.com"
      );
      params.append("redirect_uri", "http://localhost:5173/auth");
      params.append("response_type", "code");
      params.append("scope", "openid email profile");
      window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
    },
    async logGoogle(authorizationCode) {
      try {
        const user = await this.exchangeAuthorizationCode(authorizationCode)

        console.log("user: ", user);
        const response = await logInGoogle({
          uid: user.kid,
          name: user.given_name,
          surname: user.family_name,
          email: user.email,
          city: user.sub,
          fullName: user.name,
          birthdate: user.name,
          isAdmin: false,
          authorizationCode
        });
        console.log("response: ", response);
        this.$router.push("/");

        //console.log("Inicio de sesión exitoso", user);
      } catch (error) {
        await this.$swal({
          title: "¡Error when trying to log in!",
          icon: "error",
          showCancelButton: false,
          confirmButtonText: "OK",
        });
        //console.error("Inicio de sesión fallido", error);
      }
    },
    async exchangeAuthorizationCode(authorizationCode) {
      // Realiza una solicitud para intercambiar el código de autorización por un token de acceso
      const data = {
        code: authorizationCode,
        client_id:
          "729320449938-0lpd8fran2mbogudp6sfn794snhf634u.apps.googleusercontent.com",
        client_secret: "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", // Asegúrate de tener tu cliente secreto configurado
        redirect_uri: "http://localhost:5173/auth",
        grant_type: "authorization_code",
      };

      const response = await axios.post(
        "https://oauth2.googleapis.com/token",
        data
      );

      // Accede al token de identificación desde la respuesta
      const idToken = response.data.id_token;

      // Decodifica el token de identificación para obtener información del usuario
      const decodedToken = VueJwtDecode.decode(idToken);
      console.log("Datos del usuario:", decodedToken);
      return decodedToken;
    },
  },
  async mounted() {
    // Accede al código de autorización desde los parámetros de la URL
    const authorizationCode = this.$route.redirectedFrom.query.code;

    if (authorizationCode) {
      // Si hay un código de autorización, realiza acciones con él
      await this.logGoogle(authorizationCode);
    }
  },
};
</script>

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
  height: 100% !important;
  display: grid !important;
}

.cardRegister {
  padding: 0px;
  margin: auto !important;
  /* width: 50% !important; */
  display: flex !important;
  flex-direction: column !important;
  justify-items: center !important;

  background-color: rgb(219, 224, 224) !important;
}
</style>
