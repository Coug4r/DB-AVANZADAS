//Archivo de configuracion inicial. preparar conexion
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyDQdpaH9XO0b74vtnttQhVT3fvkfq6nGog",
  authDomain: "curso-firebase-20de1.firebaseapp.com",
  projectId: "curso-firebase-20de1",
  storageBucket: "curso-firebase-20de1.firebasestorage.app",
  messagingSenderId: "315433887728",
  appId: "1:315433887728:web:08caee82d4acf64fb61f35"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)
export {db};