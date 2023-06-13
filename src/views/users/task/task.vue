<template>
    <div class="visibleArea">
        <div class="taskHeader">
            <h1>{{ task.name }}</h1>
        </div>
        <div class="taskContent">
            <div class="taskObjective">
                <h2>Descripción</h2>
                <p>{{ task.description }}</p>
            </div>
            <h2>Objetivos</h2>
            <div class="objectiveRow" v-for="objective in task.objectives" :key="objective.description">
                <p>🔵 {{ objective.description }}</p>
                <p style="padding-left: 7%;">Aignado a: {{ getNames(objective.members) }}</p>
            </div>
        </div>
        <div class="rowsContainer">
            <h1>Cambiar avance de la tarea</h1>
            <div class="inputContainerDate">
                <div class="containerDate">
                    <el-select class="selectInput" v-model="task.state">
                        <el-option label="On hold" value="On hold" />
                        <el-option label="On process" value="On process" />
                        <el-option label="QA" value="QA" />
                        <el-option label="Done" value="Done" />
                    </el-select>
                </div>
            </div>
            <div class="buttonRow">
                <i @click="goToAddNewTask(this.$route.params.id)" class="mdi mdi-text-box-edit mdi-36px iconBtn">
                    Actualizar</i>
            </div>

        </div>

        <div class="rowsContainer">
            <h1>Agregar comentario</h1>
            <div class="inputTextArea">
                <textarea class="textArea" v-model="comment" placeholder="Agrega un comentario" rows="4"
                    cols="50"></textarea>
            </div>
            <div class="buttonRow">
                <i @click="sendComment()" class="mdi mdi-comment-plus mdi-36px iconBtn">
                    Enviar</i>
            </div>

        </div>

        <div class="rowsContainer">
            <h1>Comentarios</h1>
            <div class="commentRow" v-for="comment in comments" :key="comment.comment">
                <p class="commentSide"> {{ getNames(comment.userId) }}: {{ comment.comment }}</p>
                <div class="deleteSide" v-if="user.id == comment.userId">
                    <i @click="deleteTaskComment(comment.comment)" class="mdi mdi-comment-remove mdi-36px iconBtn"></i>
                </div>
                <!-- <p style="padding-left: 7%;">Aignado a: {{ getNames(objective.members) }}</p> -->
            </div>
        </div>
    </div>
</template>

<script>
import { getTaskById, addComment, getAllComments, deleteCommentOfTask } from '../../../controllers/tasksController.js';
import { getUsers } from '../../../controllers/usersController.js';
import { useUserStore } from "../../../stores/userStore";

export default {
    data() {
        return {
            task: {},
            allUsers: [],
            comment: "",
            comments: [],
            user: {},
        }
        //On hold, On process, QA, Done.
    },
    async mounted() {
        const store = useUserStore();
        const user = store.getUser;
        this.user = user;
        this.task = await getTaskById(this.$route.params.id);

        console.log("task: ", this.task)

        //Recuperamos los usuarios
        this.allUsers = await getUsers();

        //Recuperamos los comentarios de esta tarea
        this.comments = await getAllComments(this.$route.params.id);

    },
    methods: {
        getNames(ids) {
            const usersNames = this.allUsers.filter((user) => ids.includes(user.uid));
            const names = usersNames.map(user => user.name + ' ' + user.surname);
            return names.join(", ");
        },
        async sendComment() {


            const res = await addComment(this.$route.params.id, this.comment, this.user.id);
            this.comments.push = { comment: this.comment, userId: this.user.id };
            this.comment = "";
            console.log("sendComment: ", res);
            this.$forceUpdate();

            this.$router.go(0);
        },
        async deleteTaskComment(comment) {
            const result = await this.$swal({
                title: '¿Estás seguro de eliminar el comentario?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Sí',
                cancelButtonText: "No",
            });
            if (result.isConfirmed) {
                const res = await deleteCommentOfTask(this.$route.params.id, comment, this.user.id);
                console.log("res eliminar: ", res);

                if (res != false) {
                    await this.$swal({
                        title: "¡El comentario se eliminó correctamente!",
                        icon: "success",
                        showCancelButton: false,
                        confirmButtonText: "OK",
                    });
                    this.$router.go(0);
                } else {
                    await this.$swal({
                        title: "¡El comentario NO se eliminó correctamente!",
                        icon: "error",
                        showCancelButton: false,
                        confirmButtonText: "OK",
                    });
                }
            }
        }
    }

}
</script>

<style>
.selectInput {
    width: 100% !important;
    height: max-content !important;
}

.taskHeader {
    padding: 2.5%;
    margin: 10px 0px;
    background-color: rgb(82, 82, 81);
    color: white;

    height: fit-content;
}

.taskContent {
    text-align: left;
    padding: 2.5%;
    margin: 10px 0px;
    background-color: rgb(57, 57, 57);
}

.taskObjective {
    padding: 2.5% 0px;
}

.objectiveRow {
    padding: 2.5% 0px;
    border-bottom: 1px solid white;
}
</style>

