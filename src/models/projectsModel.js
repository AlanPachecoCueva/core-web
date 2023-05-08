
//Ruta para la api
const RUTA_SERVIDOR = `${import.meta.env.VITE_APP_RUTA_API}`;

async function createProject(projectData) {
    try {
      const { author, teamName, name, description, teamMembers, estimatedEndDate } = projectData;
  
      const response = await fetch(`${RUTA_SERVIDOR}/projects/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ author, teamName, name, description, teamMembers, estimatedEndDate })
      });
      const project = await response;
      console.log('project created successfully:', project);
      return project;
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  }

  const getAllProjects = async () => {
    try {
      const response = await fetch(`${RUTA_SERVIDOR}/projects/`);
      if (!response.ok) {
        throw new Error('Error fetching projects');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const getProject = async (id) => {
    try {
      const response = await fetch(`${RUTA_SERVIDOR}/projects/project/${id}`);
      if (!response.ok) {
        throw new Error('No se pudo obtener el proyecto');
      }
      const user = await response.json();
      return user;
    } catch (error) {
      console.error('Error al obtener el proyecto:', error);
      return "Error fetching project";
    }
  };
  
  export { createProject, getAllProjects, getProject };