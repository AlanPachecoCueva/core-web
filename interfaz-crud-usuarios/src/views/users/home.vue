
<template>
    <div v-if="loading">Loading...</div>
    <div v-if="!loading">
        <el-row class="row">
            <el-col :span="5" class="column">
                <el-card :body-style="{ padding: '0px' }">
                    <img src="../../assets/images/AddProject.jpg" class="imageAddNew" />
                    <div style="padding: 14px">

                        <span>Nuevo Proyecto</span>
                        <div class="bottom">
                            <el-button text class="button" @click="goToAddNewProject">Agregar</el-button>
                        </div>

                    </div>

                </el-card>
            </el-col>
        </el-row>

        <h1>Creados por mi</h1>

        <el-row :gutter="20">
            <el-col :span="4" v-for="project in ownProjects" :key="project.id">
                <div class="grid-content ep-bg-purple projectElement">
                    <el-card :body-style="{ padding: '0px' }">
                        <div class="imageProjectContainer">
                            <img src="../../assets/images/Project.jpg" class="imageProject" />
                        </div>

                        <div style="padding:10px">

                            <span>{{ project.name }}</span>
                            <div>
                                <span>{{ project.teamName }}</span>
                                <el-button text @click="goToAddNewProject">Ver</el-button>
                            </div>

                        </div>

                    </el-card>
                </div>
            </el-col>

        </el-row>

        <h1>En los que participo</h1>

        <el-row :gutter="20">
            <el-col :span="4" v-for="project in projects" :key="project.id">
                <div class="grid-content ep-bg-purple projectElement">
                    <el-card :body-style="{ padding: '0px' }">
                        <div class="imageProjectContainer">
                            <img src="../../assets/images/Project.jpg" class="imageProject" />
                        </div>

                        <div style="padding:10px">

                            <span>{{ project.name }}</span>
                            <div>
                                <span>{{ project.teamName }}</span>
                                <el-button text @click="goToAddNewProject">Ver</el-button>
                            </div>

                        </div>

                    </el-card>
                </div>
            </el-col>

        </el-row>
    </div>
</template>

<script>

import { getProjectsList } from '../../controllers/projectsController.js';

import { useUserStore } from "../../stores/userStore";

export default {
    data() {
        return {
            loading: true,
            ownProjects: [],
            projects: [],
        }
    },
    methods: {
        goToAddNewProject() {
            this.$router.push('/addNewProject');
        }
    },
    async mounted() {

        const store = useUserStore();
        const user = store.getUser;

        //Usamos el controlador
        //const allProjects = await getProjects();

        const listProjects = await getProjectsList(user.id);

        this.ownProjects = listProjects.ownProjects;
        this.projects = listProjects.projects;

        console.log("Own Projects: ", this.ownProjects);
        console.log("Projects: ", this.projects);

        this.loading = false;

    }
}
</script>

<style>
.projectElement {
    display: flex;

    width: 50%;
    min-width: 150px;
    min-height: 200px;
    max-height: 200px;
    margin-left: 20px;
}

/* Para grid */
.el-row {
    margin-bottom: 20px;
}

.el-row:last-child {
    margin-bottom: 0;
}

.el-col {
    border-radius: 4px;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}

/* ------------------- */


.imageAddNew {
    width: 100%;
}

.imageProjectContainer {
    display: flex;
    width: 100%;

    justify-content: center;
}

.imageProject {
    width: 75%;

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
