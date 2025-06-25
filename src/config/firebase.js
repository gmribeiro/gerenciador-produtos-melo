import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAYuLe3M5_vVrtk4pz2cduKLDS48j-ACbg",
  authDomain: "gerenciadorprodutosmelo-cc8d5.firebaseapp.com",
  projectId: "gerenciadorprodutosmelo-cc8d5",
  storageBucket: "gerenciadorprodutosmelo-cc8d5.firebasestorage.app",
  messagingSenderId: "164139519067",
  appId: "1:164139519067:web:0bd3f1379287f6870cc37e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };