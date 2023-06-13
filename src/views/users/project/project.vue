<template>
    <div class="banner">
        <img class="bannerImage" alt="ProjectBanner" src="../../../assets/images/BannerprojectStatistics.jpg">
    </div>
    <el-row class="rowTask">
        <div class="newTaskSection">
            <i @click="goToAddNewTask(this.$route.params.id)" class="mdi mdi-text-box-plus mdi-36px iconBtn"> Task</i>
        </div>

        <div class="statisticsRight">
            <div class="statisticCard">
                <div class="statisticsCardLeft">
                    <p>Tareas:</p>
                </div>
                <div class="statisticsCardRight">
                    <p>0</p>
                </div>

            </div>

            <div class="statisticCard">
                <div class="statisticsCardLeft">
                    <p>Progreso:</p>
                </div>
                <div class="statisticsCardRight">
                    <p>50%</p>
                </div>
            </div>

            <div class="statisticCard">
                <div class="statisticsCardLeft">
                    <p>Eficacia:</p>
                </div>
                <div class="statisticsCardRight">
                    <p>75%</p>
                </div>
            </div>

            <div class="statisticCard">
                <div class="statisticsCardLeft">
                    <p>Rapidez:</p>
                </div>
                <div class="statisticsCardRight">
                    <p>+20%</p>
                </div>
            </div>
        </div>

    </el-row>

    <h1>Creadas por mi</h1>

    <div class="row">
        <article v-for="task in ownTasks" :key="task.id" class="imageCard projectCard hoverBtn"
            @click="goToViewTask(task.id)">
            <img src="../../../assets/images/Task.png" />
            <div class="galleryDivisionContainer">
                <div class="galleryDivisionLeft galleryProject">
                    <p>{{ task.name }}</p>
                    <p>{{ task.teamName }}</p>
                </div>
                <div class="galleryDivisionRight">
                    <i @click="goToViewTask(task.id)" class="mdi mdi-briefcase-eye mdi-36px iconBtn"></i>
                </div>
            </div>
        </article>
    </div>





    <h1>Tareas Creadas</h1>
    <div class="row">
        <article v-for="task in allTasks" :key="task.id" class="imageCard projectCard hoverBtn"
            @click="goToViewTask(task.id)">
            <img src="../../../assets/images/TaskAll.png" />
            <div class="galleryDivisionContainer">
                <div class="galleryDivisionLeft galleryProject">
                    <p>{{ task.name }}</p>
                    <p>{{ task.teamName }}</p>
                </div>
                <div class="galleryDivisionRight">
                    <i @click="goToViewTask(task.id)" class="mdi mdi-briefcase-eye mdi-36px iconBtn"></i>
                </div>
            </div>
        </article>
    </div>

</template>

<script>
import { getTasksOfAProject } from '../../../controllers/tasksController.js';
import { useUserStore } from "../../../stores/userStore";

export default {
    data() {
        return {
            allTasks: [],
            ownTasks: [],
        }
    },
    methods: {
        goToAddNewTask(id) {
            console.log("ID: ", id);
            this.$router.push({ name: "newTask", params: { id } });
        },
        goToViewTask(id) {
            console.log("ID: ", id);
            this.$router.push({ name: "task", params: { id } });
        }
    },
    async mounted() {

        const store = useUserStore();
        const user = store.getUser;


        this.allTasks = await getTasksOfAProject(this.$route.params.id);

        console.log("allTasks: ", this.allTasks)
        this.ownTasks = this.allTasks;
        this.ownTasks = this.allTasks.filter((task) => {
            console.log("user.id: ", user.id, "   task.author : ", task.author)
            if (task.author == user.id) {
                return task;
            }
        });

        console.log("ownTasks: ", this.ownTasks)
    }
}
</script>

<style>
.btnNewTask {
    font-size: 2rem;
}

.rowTask {
    width: 100%;
    height: 200px;
    margin-bottom: 0px;
    border-bottom: 1px solid rgb(190, 190, 190);
    margin: 0px 10px 50px 10px !important;
}

.newTaskSection {
    width: 15%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}



.statisticsRight {
    width: 85%;
    height: 100%;

    display: flex;
    justify-content: space-around;
    align-items: center;
}

.statisticCard {
    display: flex;
    flex-direction: row;
    width: 20%;
    padding: 0px;

    height: 75px;
    background-color: rgb(82, 82, 81);

    border-radius: 10px;
}

.statisticsCardLeft {
    /* display: inline-block; */
    width: 50%;
    height: 100%;
    text-align: center;

    display: flex;
    justify-content: center;
    align-items: center;
}

.statisticsCardLeft p {
    font-size: large;
    font-weight: bold;
}

.statisticsCardRight {
    /* display: inline-block; */
    width: 50%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
}

.statisticsCardRight p {
    font-size: 170%;
    font-weight: bold;
}
</style>