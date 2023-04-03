<template>
    <v-btn  @click="goToNewUser()">Nuevo</v-btn>
    <v-card text="List of users">
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
                <tr v-for="(user, index) in users" :key="index">
                    <td>{{ user.name }}</td>
                    <td>{{ user.surname }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.city }}</td>
                    <td>{{ user.birthdate }}</td>
                    <td><v-btn density="compact" icon="mdi-pencil" @click="goToEditUser(user.id)"></v-btn></td>
                    <td><v-btn density="compact" icon="mdi-delete-forever" @click="deteleUser(user.id)"></v-btn></td>
                </tr>
            </tbody>
        </v-table>
    </v-card>
    

</template>
  
<script>
    //Función que retorna los usuarios registrados
    import { getUsers, deleteUser } from '../controllers/usersController';

    export default {
        data() {
            return {
            users: [],
            loading: true
            };
        },
        methods: {
            goToEditUser(id) {
                console.log("enviado user: ", id);
                this.$router.push({ name: "editUser", params: { id} });
            },
            goToNewUser(){
                this.$router.push({ name: "newUser"});
            },
            async deteleUser(id){
                const res = await deleteUser(id);
                console.log("Res delete: ", res);
                location.reload();
            }
        },
        async mounted() {
            //Usamos el controlador
            this.users = await getUsers();

            this.loading = false;
            
        }
    }
</script>