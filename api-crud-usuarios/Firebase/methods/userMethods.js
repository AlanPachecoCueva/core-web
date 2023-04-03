const { auth, collection, db, getDocs, createUserWithEmailAndPassword, doc, setDoc, query, where, updateDoc, deleteDoc, getDoc, getUserByEmail, deleteUserByEmail } = require('../firebase.js');

//Create user
async function createUserAndSaveData(email, password, name, surname, birthdate, city) {
  try {
    // Crear el usuario en Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Crear una referencia al documento del usuario en Cloud Firestore
    const userRef = doc(db, "users", user.uid);

    //OJO: Verificar que el email no se repita

    // Guardar los datos adicionales en Cloud Firestore
    await setDoc(userRef, {
      email: email,
      password: password,
      name: name,
      surname: surname,
      birthdate: birthdate,
      city: city
    });

    // Retornar el usuario creado
    return user;
  } catch (error) {
    // Manejar el error
    console.error(error);
  }
}




//READ

// async function getAllUsers(){
//     const usersRef = collection(db, 'users');

//     const usersSnapshot = await getDocs(usersRef);
//     const usersList = usersSnapshot.docs.map(doc => doc.data());
//     return usersList;

// }

async function getAllUsers() {
  const usersRef = collection(db, 'users');

  const usersSnapshot = await getDocs(usersRef);
  const usersList = usersSnapshot.docs.map(doc => {
    const data = doc.data();
    data.id = doc.id;
    return data;
  });
  return usersList;
}


async function getUser(id) {
  // const querySnapshot = await getDocs(query(collection(db, "users"), where("id", "==", id)));

  // //const querySnapshot = await collection(db, "users")
  //   //.where("id", "==", id)
  //   //.get();

  // const userData = querySnapshot.docs.map((doc) => doc.data());
  // console.log("userData: ", querySnapshot);
  // return userData[0];

  const userRef = doc(db, "users", id);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    return userSnap.data();
  } else {
    throw new Error("No existe un usuario con ese ID");
  }
}

//UPDATE

//Únicamente de firestore

// async function updateUser(id, email, name, surname, birthdate, city) {

//   try {
//     const querySnapshot = await getDocs(query(collection(db, "users"), where("email", "==", emailAnterior)));

//     querySnapshot.forEach(async (doc) => {
//       try {
//         console.log("Usuario encontrado para modificar:", doc.data());
//         // Actualizar los datos del usuario con los parámetros proporcionados
//         await updateDoc(doc.ref, {
//           email: emailNuevo,
//           password: password,
//           name: name,
//           surname: surname,
//           birthdate: birthdate,
//           city: city
//         });
//         console.log("Datos del usuario actualizados con éxito");
//       } catch (error) {
//         console.error("Error al actualizar los datos del usuario:", error);
//       }
//     });
//   } catch (error) {
//     console.error("Error al buscar el usuario por correo electrónico:", error);
//   }
// }

async function updateUser(id, email, name, surname, birthdate, city) {
  try {
    const userRef = doc(db, "users", id);
    const docSnapshot = await getDoc(userRef);
    if (docSnapshot.exists()) {
      console.log("Usuario encontrado para modificar:", docSnapshot.data());
      // Actualizar los datos del usuario con los parámetros proporcionados
      await updateDoc(userRef, {
        email: email,
        name: name,
        surname: surname,
        birthdate: birthdate,
        city: city
      });
      console.log("Datos del usuario actualizados con éxito");
      return "OK";
    } else {
      console.error("No se encontró ningún usuario con el ID proporcionado");
    }
  } catch (error) {
    console.error("Error al actualizar los datos del usuario:", error);
  }
}


// updateProfile(auth.currentUser, {
//   displayName: "Jane Q. User", photoURL: "https://example.com/jane-q-user/profile.jpg"
// }).then(() => {
//   // Profile updated!
//   // ...
// }).catch((error) => {
//   // An error occurred
//   // ...
// });



//DELETE

async function deleteUser(id) {
  try {
    const user = await getUser(id);

    // await getUserByEmail(user.email);
    await deleteUserByEmail(user.email);


    const userRef = doc(db, "users", id);
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) {
      console.log("No existe el usuario a eliminar");
      return;
    }
    await deleteDoc(userRef);
    console.log("Usuario eliminado correctamente");
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
  }
}







//Sign In
async function signIn(email, password) {
  try {
    auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // El usuario ha iniciado sesión correctamente
        const user = userCredential.user;
        console.log(`El usuario ${user.email} ha iniciado sesión.`);
      })
      .catch((error) => {
        // Ocurrió un error al iniciar sesión
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`Error al iniciar sesión: ${errorMessage}`);
      });
  }
  catch (error) {
    console.error(error);
  }
}

module.exports = { createUserAndSaveData, signIn, getAllUsers, updateUser, deleteUser, getUser };





//Documentación oficial

/*Acceso a usuariosexistentes */
/*import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  }); */