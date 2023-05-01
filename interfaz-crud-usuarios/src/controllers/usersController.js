import { getAllUsers, getUser, updateUser, createUser, deleteUserById, signIn, signOut } from "../models/usersModel.js";

import { useUserStore } from '../stores/userStore.js';

const create = async (userData) => {
    const res = await createUser(userData);

    if (res === null) {
        console.error("Error al crear usuario.");
        return "Error";
    }
    return res;
}


const logIn = async (userData) => {
    try {
        console.log("REEES login");
        const res = await signIn(userData);

        if (res !== null) {
            console.log("Usuario logueado correctamente: ", res);



            //Guardar el usuario en el store
            const userStore = useUserStore();

            userStore.setUser(res);
            const isLogued = userStore.setIsLogued(true);

            console.log("User guardado en store eeeeeeee: ", res);

            return res;
        }

    } catch (error) {
        console.log("Ocurrió un error al loguear al usuario");
        console.error(error);
        return null;
    }


}

const logOut = async () => {
    try {
        const res = await signOut();

        const userStore = useUserStore();

        const isLogued = userStore.setIsLogued(false);

    } catch (error) {
        console.error(error);
        return null;
    }
}

const deleteUser = async (id) => {
    const res = await deleteUserById(id);

    if (res === null) {
        console.error("Error al crear usuario.");
        return "Error";
    }
    return true;

}

const getUsers = async () => {
    const users = await getAllUsers();

    if (users === "Error fetching users") {
        console.error("Error al llamar función getAllUsers en usersController, la respuesta dió error.");
        return "Error";
    }

    return users;
}

const getUsersToCreateProject = async (id) => {
    const users = await getUsers();
    if(users != "Error")
    {
        return users.filter((user) => user.uid !== id);
    }

    return null;
}


const getUserById = async (id) => {
    const user = await getUser(id);

    if (user === "Error fetching user") {
        console.error("Error al llamar función getAllUsers en usersModel, la respuesta dió error.");
        return "Error";
    }

    console.log("Recuperado: ", user);
    return user;
}



const update = async (id, data) => {
    const res = await updateUser(id, data);

    if (!res) {

        console.error("Error al llamar función getAllUsers en usersModel, la respuesta dió error.");
        return "Error";
    }
    return true;
}


export { getUsers, getUserById, update, create, deleteUser, logIn, logOut, getUsersToCreateProject };