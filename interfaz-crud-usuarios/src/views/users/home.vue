
<template>
    <el-row class="row">
        <el-col :span="5" class="column">
            <el-card :body-style="{ padding: '0px' }">
                <img src="../../assets/images/AddProject.jpg" class="imageAddNew" />
                <div style="padding: 14px">

                    <span>Nuevo Proyecto</span>
                    <div class="bottom">
                        <time class="time"></time>
                        <el-button text class="button" @click="goToAddNewProject">Agregar</el-button>
                    </div>
                    
                </div>

            </el-card>
        </el-col>
    </el-row>

    <h1>Home users</h1>
</template>

<script>


    export default{
        data(){
            return{

            }
        },
        methods:{
            goToAddNewProject(){
                this.$router.push('/addNewProject');
            }
        }
    }
</script>

<style>
.imageAddNew {
    width: 100%;
}

.row {
    width: 100%;

    margin-top: 10px;
    margin-bottom: 10px;

}

.column {
    margin-left: 20px;
}

</style>
