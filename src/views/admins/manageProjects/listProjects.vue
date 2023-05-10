<template >
    <div class="visibleArea">


        <v-card text="List of projects">
            <div v-if="loading">Loading...</div>
            <v-table v-if="!loading">
                <thead>
                    <h3>New Project</h3>
                    <i @click="goToNewProject()" class="mdi mdi-plus-box mdi-36px iconBtn"></i>


                    <tr>
                        <td>
                        <th class="text-left">Author</th>
                        </td>
                        <td>
                        <th class="text-left">Name</th>
                        </td>
                        <td>
                        <th class="text-left">Team Name</th>
                        </td>
                        <td>
                        <th class="text-left">State</th>
                        </td>
                        <td>
                        <th class="text-left">Description</th>
                        </td>
                        <td>
                        <th class="text-left">Start Date</th>
                        </td>
                        <td>
                        <th class="text-left">Estimated End Date</th>
                        </td>

                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(project, index) in projects" :key="index">
                        <td>{{ project.author }}</td>
                        <td>{{ project.name }}</td>
                        <td>{{ project.teamName }}</td>
                        <td>{{ project.estado }}</td>
                        <td>{{ project.description }}</td>
                        <td>{{ project.startDate }}</td>
                        <td>{{ project.estimatedEndDate }}</td>
                        <td><v-btn density="compact" icon="mdi-pencil" @click="goToEditProject(project.id)"
                                color="primary"></v-btn></td>
                        <td><v-btn density="compact" icon="mdi-delete-forever" @click="deteleProject(project.id)"
                                color="secondary" class="deleteButton"></v-btn></td>
                    </tr>
                </tbody>
            </v-table>
        </v-card>
    </div>
</template>
  
<style></style>

<script>
//Función que retorna los usuarios registrados
import { getProjects, deleteProject } from '../../../controllers/projectsController.js';
import { getUsers } from '../../../controllers/usersController.js';

export default {
    data() {
        return {
            users: [],
            projects: [],
            loading: true
        };
    },
    methods: {
        goToNewProject() {
            this.$router.push('/admin/project/new');
        },
        goToEditProject(id) {
            this.$router.push({ name: "editProject", params: { id } });
        },

        async deteleProject(id) {
            const result = await this.$swal({
                title: '¿Are you sure to delete this project?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: "Not",
            });
            if (result.isConfirmed) {
                const res = await deleteProject(id);

                if (res) {
                    await this.$swal({
                        title: "¡Project deleted successfully!",
                        icon: "success",
                        showCancelButton: false,
                        confirmButtonText: "OK",
                    });
                    this.$router.push('/admin/project/');
                } else {
                    await this.$swal({
                        title: "¡Project not deleted!",
                        icon: "error",
                        showCancelButton: false,
                        confirmButtonText: "OK",
                    });
                }


            }



        }
    },
    async mounted() {
        //Recuperamos los usuarios
        this.users = await getUsers();
        //Usamos el controlador para recuperar los usuarios
        this.projects = await getProjects();

        for (let i = 0; i < this.projects.length; i++) {
            this.users.filter((user) => {
                if (user.uid == this.projects[i].author){
                    this.projects[i].author =  user.name + " " + user.surname;
                }  
            });
        }

        this.loading = false;

    }
}
</script>