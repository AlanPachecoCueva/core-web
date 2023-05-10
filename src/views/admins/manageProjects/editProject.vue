<template>
    <v-card text="Actual data">
        <div v-if="loading">Loading...</div>
        <v-table v-if="!loading">
            <thead>
                <tr>
                    <td>
                    <th class="text-left">Author</th>
                    </td>
                    <td>
                    <th class="text-left">Name</th>
                    </td>
                    <td>
                    <th class="text-left">TeamName</th>
                    </td>
                    <td>
                    <th class="text-left">Description</th>
                    </td>
                    <td>
                    <th class="text-left">TeamMembers</th>
                    </td>
                    <td>
                    <th class="text-left">State</th>
                    </td>
                    <td>
                    <th class="text-left">EstimatedEndDate</th>
                    </td>
                    <td>
                    <th class="text-left">StartDate</th>
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{ lastProject.author }}</td>
                    <td>{{ lastProject.teamName }}</td>
                    <td>{{ lastProject.name }}</td>
                    <td>{{ lastProject.description }}</td>
                    <td>{{ getNames(lastProject.teamMembers) }}</td>
                    <td>{{ lastProject.state }}</td>
                    <td>{{ lastProject.estimatedEndDate }}</td>
                    <td>{{ lastProject.startDate }}</td>
                </tr>
            </tbody>
        </v-table>
    </v-card>

    <div class="container">
        <v-form v-model="valid" class="form">
            <h1>Edit Project</h1>
            <v-container class="formContainer">
                <div class="rowEdit">
                    <div class="colInputs">
                        <div class="inputContainer">
                            <v-card-subtitle>Project Name</v-card-subtitle>
                            <el-input v-model="project.name" @input="validate('projectName')" placeholder="Project name"
                                required />
                        </div>
                        <p v-if="!validations.name.state">{{ validations.name.error }}</p>
                    </div>

                    <div class="colInputs">
                        <div class="inputContainer">
                            <v-card-subtitle>Team Name</v-card-subtitle>
                            <el-input v-model="project.teamName" @input="validate('teamName')" placeholder="Team name"
                                required />
                        </div>
                        <p v-if="!validations.teamName.state">{{ validations.teamName.error }}</p>
                    </div>
                </div>
                <div class="rowEdit">
                    <!-- <div > -->
                    <div class="colInputs">
                        <div class="inputContainer">
                            <v-card-subtitle>Project Description</v-card-subtitle>
                            <el-input v-model="project.description" @input="validate('description')"
                                placeholder="Project description" required />
                        </div>
                        <p v-if="!validations.description.state">{{ validations.description.error }}</p>
                    </div>
                    <div class="colInputs">
                        <div class="inputContainer">
                            <v-card-subtitle>Members Of Project</v-card-subtitle>
                            <!-- <el-input v-model="project.teamMembers" placeholder="Select development members" required /> -->
                            <el-select v-model="project.teamMembers" multiple>
                                <el-option v-for="user in users" :key="user.uid" :label="`${user.name} ${user.surname}`"
                                    :value="user.uid" />
                            </el-select>
                        </div>
                    </div>
                    <!-- </div> -->

                </div>
                <div class="rowEdit">
                    <!-- <div > -->
                    <div class="colInputs">
                        <div class="inputContainer ">
                            <v-card-subtitle>Estimated End Date</v-card-subtitle>
                            <!-- <el-input v-model="user.birthdate" @input="validate('birthdate')" placeholder="Your birthdate" required /> -->
                            <el-date-picker v-model="project.estimatedEndDate" @change="validate('estimatedEndDate')"
                                format="DD/MM/YYYY" value-format="DD/MM/YYYY" type="date"
                                placeholder="Stimated conclusion date"></el-date-picker>
                        </div>
                        <p v-if="!validations.estimatedEndDate.state">{{ validations.estimatedEndDate.error }}</p>

                    </div>
                </div>
                <v-btn @click="editProject()">Editar</v-btn>
            </v-container>
        </v-form>
    </div>
</template>


<script>

import { getProjectById } from "../../../controllers/projectsController";
//Validaciones
import { validateProjectName, validateTeamName, validateDescription, validateEndDate } from "../../../validations/rules.js";

import { getUsersToCreateProject } from "../../../controllers/usersController.js";

import { getUsers } from '../../../controllers/usersController.js';
export default {
    data() {
        return {
            allUsers: [],
            users: [],
            isFormatValid: false,
            lastProject: {
                author: "",
                description: "",
                state: "",
                estimatedEndDate: "",
                name: "",
                realEndDate: "",
                startDate: "",
                teamMembers: [],
                teamName: "",
            },
            project: {
                author: "",
                description: "",
                state: "",
                estimatedEndDate: "",
                name: "",
                realEndDate: "",
                startDate: "",
                teamMembers: [],
                teamName: "",
            }, validations: {
                teamName: {
                    state: false,
                    error: "",
                },
                name: {
                    state: false,
                    error: "",
                },
                description: {
                    state: false,
                    error: "",
                },
                estimatedEndDate: {
                    state: false,
                    error: "",
                },
                teamMembers: {
                    state: false,
                    error: "",
                },
            }
        }

    },
    async created() {

        //Recuperamos los usuarios
        this.allUsers = await getUsers();

        this.getProject();

        this.users = await getUsersToCreateProject(this.lastProject.author);

        this.allUsers.filter((user) => {
            if (user.uid == this.project.author) {
                this.lastProject.author = user.name + " " + user.surname;
            }
        });
    },
    methods: {
        getNames(ids) {
            const usersNames = this.allUsers.filter((user) => ids.includes(user.uid));
            const names = usersNames.map(user => user.name + ' ' + user.surname);
            return names.join(", ");
        },
        async getProject() {
            try {
                const project = await getProjectById(this.$route.params.id);
                this.lastProject = project;
                this.project = Object.assign({}, project);
            } catch (error) {
                console.error('Error getting project:', error);
                throw error;
            }
        },
        async editProject() {
            const result = await this.$swal({
                title: '¿Do you want to edit the project?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: "Not",
            });
            if (result.isConfirmed) {
                const res = await updateProject(this.$route.params.id, this.project);

                if (res) {
                    await this.$swal({
                        title: "¡Projet edited successfully!",
                        icon: "success",
                        showCancelButton: false,
                        confirmButtonText: "OK",
                    });
                    this.$router.push('/admin/users');
                } else {
                    await this.$swal({
                        title: "¡Error updating the project!",
                        icon: "error",
                        showCancelButton: false,
                        confirmButtonText: "OK",
                    });
                }
            }
        },
        validate(type) {

            if (type == "projectName") {
                let res = validateProjectName(this.project.name);
                if (res === true) {
                    this.validations.name.state = true;
                    return;
                }
                this.validations.name.state = false;
                this.validations.name.error = res;

            }

            if (type == "teamName") {
                let res = validateTeamName(this.project.teamName);
                if (res === true) {
                    this.validations.teamName.state = true;
                    return;
                }
                this.validations.teamName.state = false;
                this.validations.teamName.error = res;

            }

            if (type == "description") {
                let res = validateDescription(this.project.description);
                if (res === true) {
                    this.validations.description.state = true;
                    return;
                }
                this.validations.description.state = false;
                this.validations.description.error = res;

            }

            if (type == "estimatedEndDate") {
                let res = validateEndDate(this.project.estimatedEndDate);
                if (res === true) {
                    this.validations.estimatedEndDate.state = true;
                    return;
                }
                this.validations.estimatedEndDate.state = false;
                this.validations.estimatedEndDate.error = res;

            }

        }
    }
};
</script>


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