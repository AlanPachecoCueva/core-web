import { createTask, getTasksOfProject, getTask  } from "../models/tasksModel.js";


const createATask = async (taskData) => {
    const res = await createTask(taskData);

    if (res === null) {
        console.error("Error al crear tarea.");
        return "Error";
    }
    return res;
}

const getTasksOfAProject = async (projectId) => {
    const tasks = await getTasksOfProject(projectId);

    if (tasks === "Error fetching tasks") {
        console.error("Error al llamar función getTasksOfProject en tasksController, la respuesta dió error.");
        return "Error";
    }

    return tasks;
}

const getTaskById = async (id) => {
    const task = await getTask(id);

    if (task === "Error fetching task") {
        console.error("Error al llamar función getTaskById en taskController, la respuesta dió error.");
        return "Error";
    }

    console.log("Tarea recuperada: ", task);
    return task;
}

export { createATask, getTasksOfAProject, getTaskById };