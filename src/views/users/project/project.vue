<template>
    <el-row class="row rowTask">
        <div class="newTaskSection">

            <el-button @click="goToAddNewTask(this.$route.params.id)" class="btnNewTask" type="primary"> + Task</el-button>

        </div>
        <div class="statisticsLeft">
            <img src="../../../assets/images/statistics.jpg" class="imageStatistics" />
        </div>
        <div class="statisticsRight">
            <el-col :span="4">
                <el-card class="statisticCard">
                    <p>Tareas: 0</p>
                </el-card>
            </el-col>

            <el-col :span="4">
                <el-card class="statisticCard">
                    <p>Progreso: 50%</p>
                </el-card>
            </el-col>

            <el-col :span="4">
                <el-card class="statisticCard">
                    <p>Eficacia: 75%</p>
                </el-card>
            </el-col>

            <el-col :span="4">
                <el-card class="statisticCard">
                    <p>Rapidez: +20%</p>
                </el-card>
            </el-col>
        </div>

    </el-row>
    <h1>Creadas por mi</h1>

        <el-row class="row">
            <el-col :span="4" v-for="task in ownTasks" :key="task.id">
                <div class="grid-content ep-bg-purple projectElement">
                    <el-card :body-style="{ padding: '0px' }">
                        <div class="imageProjectContainer">
                            <img src="../../../assets/images/Project.jpg" class="imageProject" />
                        </div>

                        <div style="padding:10px">

                            <span>{{ task.name }}</span>
                            <div>
                                <span>{{ task.teamName }}</span>
                                <el-button text @click="goToViewProject(task.id)">Ver</el-button>
                            </div>

                        </div>

                    </el-card>
                </div>
            </el-col>

        </el-row>
</template>

<script>
import { getTasksOfAProject } from '../../../controllers/tasksController.js'; 

export default {
    data() {
        return {
            ownTasks: [],
        }
    },
    methods: {
        goToAddNewTask(id) {
            console.log("ID: ",id);
            this.$router.push({ name: "newTask", params: { id} });
        }
    },
    async mounted(){
        this.ownTasks = await getTasksOfAProject(this.$route.params.id);
        
    }
}
</script>

<style>
.btnNewTask {

    font-size: 2rem;
}

.rowTask {
    height:fit-content;
    margin: 50px 10px 50px 10px !important;
}

.statisticsLeft {
    /* background-color: green; */
    /* width: 47.5%; */

    display: flex;
    justify-content: center;
    align-items: center;
}

.statisticCard {
    padding: 0px;
    display: flex;
    height: 75px;

    text-align: center;
    align-items: center;
}

.newTaskSection {
    /* width: 10%; */

    display: flex;
    align-items: center;
    justify-content: center;
}



.statisticsRight {
    /* background-color: blue; */
    display: flex;
    justify-content: space-around;

    align-items: center;
}
</style>