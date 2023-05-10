<template >
    <div class="visibleArea">


        <v-card text="List of users">
            <div v-if="loading">Loading...</div>
            <v-table v-if="!loading">
                <thead>
                    <h3>New User</h3>
                    <i @click="goToNewUser()" class="mdi mdi-plus-box mdi-36px iconBtn"></i>


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
                    <tr v-for="(user, index) in users" :key="index">
                        <td>{{ user.name }}</td>
                        <td>{{ user.surname }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{ user.city }}</td>
                        <td>{{ user.birthdate }}</td>
                        <td><v-btn density="compact" icon="mdi-pencil" @click="goToEditUser(user.uid)"
                                color="primary"></v-btn></td>
                        <td><v-btn density="compact" icon="mdi-delete-forever" @click="deteleUser(user.uid)"
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
import { getUsers, deleteUser } from '../../../controllers/usersController';

export default {
    data() {
        return {
            users: [],
            loading: true
        };
    },
    methods: {
        goToNewUser() {
            this.$router.push('/admin/new');
        },
        goToEditUser(id) {
            this.$router.push({ name: "editUser", params: { id } });
        },

        async deteleUser(id) {

            const result = await this.$swal({
                title: '¿Do you want to delete this user?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: "Not",
            });
            if (result.isConfirmed) {
                const res = await deleteUser(id);

                if (res) {
                    await this.$swal({
                        title: "¡User deleted successfully!",
                        icon: "success",
                        showCancelButton: false,
                        confirmButtonText: "OK",
                    });
                    location.reload();
                } else {
                    await this.$swal({
                        title: "¡An error ocurred when deleting user!",
                        icon: "error",
                        showCancelButton: false,
                        confirmButtonText: "OK",
                    });
                }
            }
        }
    },
    async mounted() {
        //Usamos el controlador
        const us = await getUsers();

        if(us){
            this.users = us;
            this.loading = false;
        }
    }
}
</script>