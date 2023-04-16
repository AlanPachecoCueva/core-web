<template>
    
    <v-card text="List of users" cclass="red">
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
                    <td><v-btn density="compact" icon="mdi-pencil" @click="goToEditUser(user.uid)" color="primary"></v-btn></td>
                    <td><v-btn density="compact" icon="mdi-delete-forever" @click="deteleUser(user.uid)"  color="secondary" class="deleteButton"></v-btn></td>
                </tr>
            </tbody>
        </v-table>
    </v-card>
    

</template>
  
<style>
</style>

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
            
            async deteleUser(id){
                const result = await this.$swal({
                    title: '¿Desea eliminar el usuario?',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Sí',
                    cancelButtonText: "No",
                });
                if (result.isConfirmed) {
                    const res = await deleteUser(id);
                    
                    if(res){
                        await this.$swal({
                            title: "¡Usuario eliminado!",
                            icon: "success",
                            showCancelButton: false,
                            confirmButtonText: "OK",
                        });
                        location.reload();
                    }else{
                        await this.$swal({
                            title: "¡No se pudo eliminar el usuario!",
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
            this.users = await getUsers();

            this.loading = false;
            
        }
    }
</script>