
// Definir rutas para usuarios
const express = require('express');
const router = express.Router();

const app = express();


//User methods
const { createUserAndSaveData, getAllUsers, updateUser, deleteUser, getUser } = require('../Firebase/methods/userMethods');


router.post('/create', async (req, res) => {
  try {
    console.log("body: ", req.body);
    const { email, password, name, surname, birthdate, city } = req.body;
    console.log("entra");
    const user = await createUserAndSaveData(email, password, name, surname, birthdate, city);
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating user' });
  }
});


router.put('/update', async (req, res) => {
  try {
    const { id, email, name, surname, birthdate, city } = req.body;
    const result = await updateUser(id, email, name, surname, birthdate, city);
    res.status(200).send("Modify done.");
  } catch (error) {
    console.error(error);
    res.status(500).send('Error actualizando el usuario');
  }
});

router.delete("/delete/:id", async (req, res) => {
  console.log("Entra a delete");
  const { id } = req.params;
  console.log("ID: ",id );
  try {
    await deleteUser(id);
    res.status(200).send(`User with id ${id} has been deleted.`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting user.");
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await getAllUsers();
    console.log("Users: ", users);
    res.status(201).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error obteniendo usuarios');
  }
});

router.get('/user/:id', async (req, res) => {
  try {
    const user = await getUser(req.params.id);
    console.log("User: ", user);
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error obteniendo usuario');
  }
});



// router.post('/', (req, res) => {
//   // Crear un nuevo usuario
// });

// router.put('/:id', (req, res) => {
//   // Actualizar un usuario por ID
// });

// router.delete('/:id', (req, res) => {
//   // Eliminar un usuario por ID
// });

// Exportar el enrutador
module.exports = router;