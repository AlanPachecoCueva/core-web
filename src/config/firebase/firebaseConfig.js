import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import router from "../../router/index.js";

const firebaseConfig = {
    apiKey: "AIzaSyBCSMzzP5UD-7g_Mi1FEOtfj2IUjZoQaYg",
    authDomain: "ingweb-ap.firebaseapp.com",
    projectId: "ingweb-ap",
    storageBucket: "ingweb-ap.appspot.com",
    messagingSenderId: "936544478001",
    appId: "1:936544478001:web:563092b879350a2d878610",
    measurementId: "G-WV9F4WD9QM"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
const authFirebase = getAuth(app);


onAuthStateChanged(authFirebase, async (user) => {
    if (user) {
      // El usuario está autenticado
      // Aquí puedes acceder a la información del usuario en el objeto `user`
      console.log("Usuario autenticado:", user.uid);
  
      const response = await fetch(`http://localhost:3000/users/user/${user.uid}`);
      // Verificar si la respuesta es exitosa
      if (response.ok) {
        const data = await response.json();
        
        user = {
          isAdmin: data.isAdmin
        };
      }
  
      if(user.isAdmin == true){
        router.push("/homeAdmin");
      }else{
        router.push("/");
      }
      
    } else {
      // El usuario no está autenticado
      console.log("Usuario no autenticado");
      //Si el usuario no está autenticado lo redirige automáticamente a la pestaña de inicio
      router.push("/auth");
    }
  });

export {app, authFirebase, signInWithEmailAndPassword}