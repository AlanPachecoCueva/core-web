<template>
    <div class="visibleArea">
        <div id="pagewrap">
            <div class="gallery">
                <article class="image">
                    <img src="../../assets/images/admin/gestionarUsuarios.jpg" />
                    <div class="galleryDivisionContainer">
                        <div class="galleryDivision">
                            <p>Users</p>
                        </div>
                        <div class="galleryDivision">
                            <i @click="goManageUsers()" class="mdi mdi-account-box mdi-36px iconBtn"></i>
                        </div>
                    </div>


                </article>

                <article class="image">
                    <img src="../../assets/images/admin/gestionarProyectos.jpg" />
                    <div class="galleryDivisionContainer">
                        <div class="galleryDivision">
                            <p>Projects</p>
                        </div>
                        <div class="galleryDivision">
                            <i @click="goManageProjects()" class="mdi mdi-briefcase mdi-36px iconBtn"></i>
                        </div>
                    </div>
                </article>

                <article class="image">
                    <img src="../../assets/images/admin/gestionarTareas.jpg" />

                    <div class="galleryDivisionContainer">
                        <div class="galleryDivision">
                            <p>Tasks</p>
                        </div>
                        <div class="galleryDivision">
                            <i @click="goManageTasks()" class="mdi mdi-text-box mdi-36px iconBtn"></i>
                        </div>
                    </div>
                </article>
            </div>
        </div>

    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    methods:{
        goManageUsers(){
            this.$router.push('/admin/users');
        },
        goManageProjects(){
            this.$router.push('/admin/project/');
        },
        goManageTasks(){
            this.$router.push('/admin/task/');
        }
    }
}
</script>

<style>
.galleryDivisionContainer{
    display: flex;
    flex-direction: row;
}

.galleryDivision {
    background-color: rgba(222, 217, 217, 0.5);
    width: 50%;
    height: fit-content,
}

* {
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -ms-box-sizing: border-box;
    -o-box-sizing: border-box;
    -moz-box-sizing: border-box;
    margin: 0;
    padding: 0;

}

body {
    font-size: 16px;
    font-family: monospace, "Helvetica Neue", Helvetica, Verdana, sans-serif;
    background-color: #1abc9c;
    text-align: center;
    color: #666;
}

#pagewrap {
    max-width: 960px;
    width: 100%;
    margin: 0 auto;
}

.gallery {
    width: 100%;
    margin: 0 auto;
    padding: 10vh 5vh;
    display: flex;
    flex-wrap: wrap;
    color: black;
}

.image {
    width: 28%;
    border: 1.5px solid #ccc;
    padding: 10px;
    margin: 2% 1.5%;
    flex-grow: 1;
    background-color: #ecf0f1;
}

.image img {
    max-width: 100%;
    margin: 0 auto;
}

.image:hover {
    box-shadow: 0 1px 30px rgba(0, 0, 0, .3);
    transform: scale(1.10);
    border: none;
    transition: box-shadow 0.2s ease, transform 0.2s ease;
    z-index: 1;
}

.image p {
    padding: 10px;
}

/*@media (max-width: 900px){
 .image{
  width: 45%;
 }
  .gallery{
    padding: 10vh 1vh;
  }
}

@media (max-width: 600px){
 .image{
  width: 50%;
 }
}*/
</style>