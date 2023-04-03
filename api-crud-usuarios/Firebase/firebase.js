const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, doc, setDoc, query, where, updateDoc, deleteDoc, getDoc } = require('firebase/firestore');
const { getAuth, createUserWithEmailAndPassword, updateProfile, getUserByEmail, deleteUserByEmail } = require("firebase/auth");

const firebaseConfig = {
  apiKey: "AIzaSyBCSMzzP5UD-7g_Mi1FEOtfj2IUjZoQaYg",
  authDomain: "ingweb-ap.firebaseapp.com",
  projectId: "ingweb-ap",
  storageBucket: "ingweb-ap.appspot.com",
  messagingSenderId: "936544478001",
  appId: "1:936544478001:web:563092b879350a2d878610",
  measurementId: "G-WV9F4WD9QM"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

module.exports = { auth, collection, db, getDocs, createUserWithEmailAndPassword, doc, setDoc, updateProfile, query, where, updateDoc, deleteDoc, getDoc, getUserByEmail, deleteUserByEmail };

