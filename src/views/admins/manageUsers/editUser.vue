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
                    <td>{{ lastUser.name }}</td>
                    <td>{{ lastUser.surname }}</td>
                    <td>{{ lastUser.email }}</td>
                    <td>{{ lastUser.city }}</td>
                    <td>{{ lastUser.birthdate }}</td>
                </tr>
            </tbody>
        </v-table>
    </v-card>

    <div class="container">
        <v-form v-model="valid" class="form">
            <h1>Edit User</h1>
            <v-container class="formContainer">
                <div class="rowEdit">
                    <div class="colInputs">
                        <div class="inputContainer">
                            <v-card-subtitle>Name</v-card-subtitle>
                            <el-input v-model="user.name" @input="validate('name')" placeholder="Your name" required />
                        </div>
                        <p class="errorMessage" v-if="!validations.name.state">{{ validations.name.error }}</p>
                    </div>

                    <div class="colInputs">
                        <div class="inputContainer">
                            <v-card-subtitle>Surname</v-card-subtitle>
                            <el-input v-model="user.surname" @input="validate('surname')" placeholder="Your surname"
                                required />
                        </div>
                        <p class="errorMessage" v-if="!validations.surname.state">{{ validations.surname.error }}</p>
                    </div>
                </div>
                <div class="rowEdit">
                    <!-- <div > -->
                    <div class="colInputs">
                        <div class="inputContainer">
                            <v-card-subtitle>Email</v-card-subtitle>
                            <el-input v-model="user.email" @input="validate('email')" placeholder="Your email" required />
                        </div>
                        <p class="errorMessage" v-if="!validations.email.state">{{ validations.email.error }}</p>
                    </div>
                    <div class="colInputs">
                        <div class="inputContainer">
                            <v-card-subtitle>City</v-card-subtitle>
                            <el-input v-model="user.city" @input="validate('city')" placeholder="Your city" required />
                        </div>
                        <p class="errorMessage" v-if="!validations.city.state">{{ validations.city.error }}</p>
                    </div>
                    <!-- </div> -->

                </div>
                <div class="rowEdit">
                    <!-- <div > -->
                    <div class="colInputs">
                        <div class="inputContainer ">
                            <v-card-subtitle>Password</v-card-subtitle>
                            <div class="passwordField">
                                <el-input @input="validate('password')" class="passInput" v-model="user.password"
                                    :type="showPassword ? 'text' : 'password'" placeholder="Your password"></el-input>
                                <el-button class="passBtn" @click="togglePasswordVisibility">
                                    <v-icon v-if="!showPassword">mdi-eye-outline </v-icon>
                                    <v-icon v-if="showPassword">mdi-eye-off-outline </v-icon>
                                </el-button>
                            </div>
                        </div>
                        <p class="errorMessage" v-if="!validations.password.state">{{ validations.password.error }}</p>

                    </div>
                    <div class="colInputs">
                        <div class="inputContainer ">
                            <v-card-subtitle>Confirm your password</v-card-subtitle>
                            <div class="passwordField">
                                <el-input @input="validate('confirmPassword')" class="passInput"
                                    v-model="verifyPassword.password" :type="showPassword2 ? 'text' : 'password'"
                                    placeholder="Confirm your password"></el-input>
                                <el-button class="passBtn" @click="togglePasswordVisibilityVerify">
                                    <v-icon v-if="!showPassword2">mdi-eye-outline </v-icon>
                                    <v-icon v-if="showPassword2">mdi-eye-off-outline </v-icon>
                                </el-button>
                            </div>
                        </div>
                        <p class="errorMessage" v-if="!verifyPassword.state">{{ verifyPassword.error }}</p>
                    </div>
                    <!-- </div> -->

                </div>



                <div class="rowEdit">
                    <div class="colInputs">
                        <div class="inputContainer">
                            <v-card-subtitle>Birthdate</v-card-subtitle>
                            <!-- <el-input v-model="user.birthdate" @input="validate('birthdate')" placeholder="Your birthdate" required /> -->
                            <el-date-picker v-model="user.birthdate" @input="validate('birthdate')"
                                @change="validate('birthdate')" format="DD/MM/YYYY" value-format="DD/MM/YYYY" type="date"
                                placeholder="Pick your birthdate"></el-date-picker>
                        </div>
                        <p class="errorMessage" v-if="!validations.birthdate.state">{{ validations.birthdate.error }}</p>
                    </div>

                </div>
                <v-btn @click="editUser()">Editar</v-btn>
            </v-container>
        </v-form>

    </div>


    <!-- <h1>edit: {{ user.surname }}</h1> -->
</template>

<style>
.errorMessage {
    color: #dcdfe6;
}

.formContainer {
    display: flex;
    flex-direction: column !important;
    align-items: center;
}

.rowEdit {


    width: 100%;
    height: fit-content;
    margin-bottom: 20px;

    display: flex;
    flex-direction: row;
    justify-content: center;
    /* height: fit-content; */
    /* margin-bottom: 10px; */
}

.colInputs {
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 50%;

    /* background-color: green; */
}

.input {
    margin: 0px !important;
    padding: 1px 11px !important;
    width: 75% !important;
    height: 38px;
    min-width: 150px;

    border-radius: 4px;
    box-shadow: 0 0 0 1px #dcdfe6;
    border: none;
    /* display: flex !important;
    justify-content: center;
    background-color: yellow; */
}

.container {
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
    color: black;
}

.form {
    width: 80%;
    text-align: center;
}
</style>

<script>

import { getUserById, update } from "../../../controllers/usersController";
//Validaciones
import { validateEmail, validateName, validateSurname, validateCity, validatePassword, validateBirthdate } from "../../../validations/rules.js";

export default {
    data() {
        return {
            isFormatValid: false,
            lastUser: {
                name: "",
                surname: "",
                password: "",
                email: '',
                city: '',
                birthdate: '',
                isAdmin: false,
            },
            user: {
                name: "",
                surname: "",
                password: "",
                email: '',
                city: '',
                birthdate: '',
                isAdmin: false,
            },
            verifyPassword: {
                password: "",
                error: "",
                state: false,
            },
            validations: {
                name: { state: false, error: "" },
                surname: { state: false, error: "" },
                password: { state: false, error: "" },
                email: { state: false, error: "" },
                city: { state: false, error: "" },
                birthdate: { state: false, error: "" },
            },
            showPassword: false,
            showPassword2: false,
        }

    },
    created() {
        this.getUser();
    },
    methods: {
        async getUser() {
            try {
                const user = await getUserById(this.$route.params.id);
                if (!user) {
                    throw new Error('Unable to find user');
                }
                this.lastUser = user;
                this.user = Object.assign({}, user);
            } catch (error) {
                console.error('Unable to find user:', error);
                throw error;
            }

        },
        async editUser() {
            const result = await this.$swal({
                title: '¿Do you want to edit this user?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: "Not",
            });
            if (result.isConfirmed) {
                const res = await update(this.$route.params.id, this.user);

                if (res != false) {
                    await this.$swal({
                        title: "¡User edited successfully!",
                        icon: "success",
                        showCancelButton: false,
                        confirmButtonText: "OK",
                    });
                    this.$router.push('/admin/users');
                } else {
                    await this.$swal({
                        title: "¡Unable to edit user!",
                        icon: "error",
                        showCancelButton: false,
                        confirmButtonText: "OK",
                    });
                }
            }
        },
        validate(type) {

            if (type == "name") {
                let res = validateName(this.user.name);
                if (res === true) {
                    this.validations.name.state = true;
                    return;
                }
                this.validations.name.state = false;
                this.validations.name.error = res;

            }

            if (type == "surname") {
                let res = validateSurname(this.user.surname);
                if (res === true) {
                    this.validations.surname.state = true;
                    return;
                }
                this.validations.surname.state = false;
                this.validations.surname.error = res;

            }

            if (type == "email") {
                let res = validateEmail(this.user.email);
                if (res === true) {
                    this.validations.email.state = true;
                    return;
                }
                this.validations.email.state = false;
                this.validations.email.error = res;

            }

            if (type == "password") {
                let res = validatePassword(this.user.password);
                if (res === true) {
                    this.validations.password.state = true;
                    return;
                }
                this.validations.password.state = false;
                this.validations.password.error = res;

            }

            if (type == "confirmPassword") {

                if (this.verifyPassword.password !== this.user.password) {
                    //set error
                    console.log("No iguales");
                    this.verifyPassword.error = "The password and confirm password are not equals.";
                    this.verifyPassword.state = false;
                    return;
                }

                this.verifyPassword.error = "";
                this.verifyPassword.state = true;


            }


            if (type == "city") {
                let res = validateCity(this.user.city);
                if (res === true) {
                    this.validations.city.state = true;
                    return;
                }
                this.validations.city.state = false;
                this.validations.city.error = res;

            }

            if (type == "birthdate") {
                let res = validateBirthdate(this.user.birthdate);
                if (res === true) {
                    this.validations.birthdate.state = true;
                    return;
                }
                this.validations.birthdate.state = false;
                this.validations.birthdate.error = res;

            }

        },
        togglePasswordVisibility() {
            this.showPassword = !this.showPassword; // Invertir el valor de showPassword al hacer clic en el botón
        },
        togglePasswordVisibilityVerify() {
            this.showPassword2 = !this.showPassword2;
        },
    }
};
</script>