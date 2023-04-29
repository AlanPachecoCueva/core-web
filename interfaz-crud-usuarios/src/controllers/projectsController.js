import { createProject } from "../models/projectsModel.js";


const createAProject = async (userData) => {
    const res = await createProject(userData);

    if (res === null) {
        console.error("Error al crear proyecto.");
        return "Error";
    }
    return res;
}

export { createAProject };