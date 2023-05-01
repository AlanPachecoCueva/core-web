
async function createProject(projectData) {
    try {
      const { author, teamName, name, description, teamMembers, estimatedEndDate } = projectData;
  
      const response = await fetch('http://localhost:3000/projects/create', {
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
      const response = await fetch('http://localhost:3000/projects/');
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
  
  export { createProject, getAllProjects };