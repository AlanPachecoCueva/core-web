import { authFirebase, signInWithEmailAndPassword } from "../config/firebase/firebaseConfig";

async function createUser(userData) {
  try {
    const { email, name, surname, birthdate, city, password, isAdmin } = userData;

    const response = await fetch('http://localhost:3000/users/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, name, surname, birthdate, city, password, isAdmin })
    });
    const user = await response.json();
    console.log('User created successfully:', user);
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    return null;
  }
}

async function signIn(userData) {
  try {
    const { email, password } = userData;
    const res = await signInWithEmailAndPassword(authFirebase, email, password);

    const user = res.user;

    const uid = user.uid;

    const resApi = await fetch(`http://localhost:3000/users/user/${uid}`);

    console.log("resApi.ok: ", resApi.ok);
    // Comprueba si la respuesta de la API es exitosa
    if (resApi.ok) {
      // Parsea la respuesta a JSON
      let userData = await resApi.json();

      // Puedes acceder a las propiedades del usuario, por ejemplo, userData.id, userData.username, etc.
      console.log('Datos del usuario obtenidos de la API:', userData);

      // Retornar el usuario para que pueda ser utilizado en la lógica de la aplicación
      return userData;
    } else {
      throw error;
    }
    // else {
    //   // Manejo de errores en caso de fallo en la llamada a la API
    //   console.error('Error al obtener datos del usuario:', resApi.status);
    //   throw new Error('Error al obtener datos del usuario');
    // }

  } catch (error) {
    console.log("Error en la función signIn del userModel");
    console.error(error);
    throw error;
  }
}

async function signOut() {
  try {
    // Llamar a la función de signOut proporcionada por Firebase Authentication
    await authFirebase.signOut();
    // La sesión del usuario se ha cerrado exitosamente
    console.log('Sesión cerrada correctamente');

    

    return true;
    // Aquí puedes realizar acciones adicionales después de cerrar sesión, como redireccionar a una página de inicio de sesión, mostrar un mensaje de éxito, etc.
  } catch (error) {
    // Manejo de errores en caso de fallo al cerrar sesión
    console.error('Error al cerrar sesión:', error);
    // Aquí puedes realizar acciones adicionales en caso de error al cerrar sesión, como mostrar un mensaje de error, realizar un registro de errores, etc.
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
    const response = await fetch(`http://localhost:3000/users/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ uid: id, email, name, surname, birthdate, city })
    });
    if (!response.ok) {
      throw new Error('Error updating user');
    }

    return response.ok;
  } catch (error) {

    console.error(error);
    return 'Error updating user';
  }
};

export { getAllUsers, getUser, updateUser, createUser, deleteUserById, signIn, signOut };

