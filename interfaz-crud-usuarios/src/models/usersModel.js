async function createUser(userData) {
    try {
        const { email, name, surname, birthdate, city, password } = userData;

      const response = await fetch('http://localhost:3000/users/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, name, surname, birthdate, city, password })
      });
      const user = await response.json();
      console.log('User created successfully:', user);
      return user;
    } catch (error) {
      console.error('Error creating user:', error);
      return null;
    }
  }

  async function deleteUserById(id) {
    try {
      const response = await fetch(`http://localhost:3000/users/delete/${id}`, {
        method: 'DELETE'
      });
      const data = await response.text();
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  



const getAllUsers = async () => {
    try {
      const response = await fetch('http://localhost:3000/users/');
      if (!response.ok) {
        throw new Error('Error fetching users');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const getUser = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/users/user/${id}`);
        if (!response.ok) {
        throw new Error('No se pudo obtener el usuario');
        }
        const user = await response.json();
        return user;
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        return "Error fetching user";
    }
  };

  const updateUser = async (id, userData) => {
    try {
        const { email, name, surname, birthdate, city } = userData;
      const response = await fetch(`http://localhost:3000/users/update?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, email, name, surname, birthdate, city })
      });
  
      if (!response.ok) {
        throw new Error('Error updating user');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return 'Error updating user';
    }
  };
  
export { getAllUsers, getUser, updateUser, createUser, deleteUserById };

