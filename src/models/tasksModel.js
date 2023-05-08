
//Ruta para la api
const RUTA_SERVIDOR = `${import.meta.env.VITE_APP_RUTA_API}`;

async function createTask(taskData) {
    try {
      const { projectId, author, name, description, startDate, estimatedEndDate, members, objectives } = taskData;
  
      const response = await fetch(`${RUTA_SERVIDOR}/tasks/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ projectId, author, name, description, startDate, estimatedEndDate, members, objectives })
      });
      const task = await response;
      console.log('Task created successfully:', task);
      return task;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  }

  const getTasksOfProject = async (projectId) => {
    try {
      const response = await fetch(`${RUTA_SERVIDOR}/tasks/${projectId}`);
      if (!response.ok) {
        throw new Error('Error fetching tasks');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const getTask = async (id) => {
    try {
      const response = await fetch(`${RUTA_SERVIDOR}/tasks/task/${id}`);
      if (!response.ok) {
        throw new Error('No se pudo obtener la tarea');
      }
      const task = await response.json();
      return task;
    } catch (error) {
      console.error('Error al obtener la tarea:', error);
      return "Error fetching task";
    }
  };
  
  export { createTask, getTasksOfProject, getTask };