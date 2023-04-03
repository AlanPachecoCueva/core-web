import { getAllUsers, getUser, updateUser, createUser, deleteUserById } from "../models/usersModel.js";

const create = async (userData) => {
    const res = await createUser(userData);
    
    if(res === null){
        console.error("Error al crear usuario.");
        return "Error";
    }
    
}

const deleteUser = async (id) => {
    const res = await deleteUserById(id);
    
    if(res === null){
        console.error("Error al crear usuario.");
        return "Error";
    }
    return true;
    
}

const getUsers = async () => {
    const users = await getAllUsers();
    
    if(users === "Error fetching users"){
        console.error("Error al llamar función getAllUsers en usersModel, la respuesta dió error.");
        return "Error";
    }
    
    return users;
}

const getUserById = async (id) => {
    const user = await getUser(id);
    
    if(user === "Error fetching user"){
        console.error("Error al llamar función getAllUsers en usersModel, la respuesta dió error.");
        return "Error";
    }
    
    console.log("Recuperado: ",user);
    return user;
}

const update = async (id, data) => {
    const res = await updateUser(id, data);
    
    if(res === "Error updating user"){
        console.error("Error al llamar función getAllUsers en usersModel, la respuesta dió error.");
        return "Error";
    }
    
    return res;
}


export { getUsers, getUserById, update, create, deleteUser };