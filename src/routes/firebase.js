// firebase.js

// Importeer de Firebase SDK die je nodig hebt
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 

// Configuratie object voor je Firebase webapplicatie
const firebaseConfig = {
  apiKey: "AIzaSyAhWvjMKv8mL_IkFQ4uMssRaygHBmxmxvg",
  authDomain: "hackathon-2dd4e.firebaseapp.com",
  projectId: "hackathon-2dd4e",
  storageBucket: "hackathon-2dd4e.appspot.com",
  messagingSenderId: "901121474691",
  appId: "1:901121474691:web:e28053b0fef153d13c5bb6"
};

// Initialisatie van Firebase
const app = initializeApp(firebaseConfig);

// Initialiseer Firestore
const db = getFirestore(app);

// Exporteer de 'app' en 'db' indien nodig voor andere delen van je applicatie
export { app, db };
