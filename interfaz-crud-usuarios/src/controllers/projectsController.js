import { createProject, getAllProjects } from "../models/projectsModel.js";


const createAProject = async (userData) => {
    const res = await createProject(userData);

    if (res === null) {
        console.error("Error al crear proyecto.");
        return "Error";
    }
    return res;
}

const getProjects = async () => {
    const projects = await getAllProjects();

    if (projects === "Error fetching projects") {
        console.error("Error al llamar función getAllProjects en usersController, la respuesta dió error.");
        return "Error";
    }

    return projects;
}

const getProjectsList = async (id) => {
    const allProjects = await getProjects();

    const ownProjects = allProjects.filter(project => project.author == id);

    const projects = allProjects.filter(project => {
        let participa = false;

        for(let i = 0; i < project.teamMembers.length; i++){
            //Si al menos un id de los participantes coincide con el id enviado
            //Entonces se agrega el proyecto
            if(project.teamMembers[i] == id){
                participa = true;
                break;
            }
        }

        if(participa){
            return project;
        }
        return;
    });


    const projectsList = {
        ownProjects,
        projects
    }
    console.log("ALL PROJECTS: ", allProjects);
    return projectsList;

}

export { createAProject, getProjects, getProjectsList };