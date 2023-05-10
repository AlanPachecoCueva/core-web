
<template>
    <div v-if="loading">Loading...</div>

    <div v-if="!loading">
        <el-row class="rowTop">
            <div className="elCardGeneral">
                <!-- <div class="cardContainer"> -->
                <div class="leftCard">
                    <span>Nuevo Proyecto</span>
                    <div>
                        <el-button text @click="goToAddNewProject">Agregar</el-button>
                    </div>
                </div>
                <div class="rightCard">
                    <i class="mdi mdi-plus-box mdi-48px iconBtn" @click="goToAddNewProject"> </i>
                </div>
                <!-- </div> -->

            </div>

            <div className="elCardGeneral">
                <div class="leftCard">
                    <span>Borrar Proyecto</span>
                    <div>
                        <el-button text @click="goToAddNewProject">Eliminar</el-button>
                    </div>
                </div>
                <div class="rightCard">
                    <i class="mdi mdi-delete-forever mdi-48px iconBtn" @click="goToAddNewProject"> </i>
                </div>
            </div>
        </el-row>
        <div class="rowsContainer">
            
            <h1>Creados por mi</h1>

            <el-row class="row">
                <div v-for="project in ownProjects" :key="project.id" class="elCardGeneral">
                    <div class="leftCard">
                        <!-- <div style="padding:10px"> -->
                        <span>{{ project.name }}</span>
                        <div>
                            <span>{{ project.teamName }}</span>
                            <el-button text @click="goToViewProject(project.id)">Ver</el-button>
                        </div>
                    </div>

                    <div class="rightCard"></div>
                </div>

            </el-row>

            <h1>En los que participo</h1>

            <el-row class="row">
                <div v-for="project in projects" :key="project.id" class="elCardGeneral">
                    <div class="leftCard">

                        <div style="padding:10px">

                            <span>{{ project.name }}</span>
                            <div>
                                <span>{{ project.teamName }}</span>
                                <el-button text @click="goToViewProject(project.id)">Ver</el-button>
                            </div>

                        </div>

                    </div>
                    <div class="rightCard">

                    </div>
                </div>

            </el-row>
        </div>
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
        },
        goToViewProject(id) {
            this.$router.push({ name: "project", params: { id } });
        }
    },
    async mounted() {

        const store = useUserStore();
        const user = store.getUser;

        const listProjects = await getProjectsList(user.id);

        this.ownProjects = listProjects.ownProjects;
        this.projects = listProjects.projects;

        this.loading = false;

    }
}
</script>

<style>
#portadaContainer {
    width: 475px;
    height: 300px;

    /* border-radius: 100%; */

}


#imagenPortada {
    width: 100%;
    height: 100%;
    /* filter: blur(5px); */
}

/* Agregar nuevo proyecto */
#cardNewProject {
    width: 150px;
    height: 200px;

    margin-right: 20%;
    overflow: hidden;
}

.imageAddNew {
    width: 100% !important;
}

/* ----------- */
.imageProjectContainer {
    display: flex;
    width: 100%;

    justify-content: center;
}

/* Para grid */
/* .el-row {
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
} */

/* ------------------- */


.imageProject {
    width: 75%;
}
</style>
