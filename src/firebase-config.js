import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDTmQMgnvIaxb4AoTDTLkdMGJb_etETm0Q",
    authDomain: "practic-commerce-7edp.firebaseapp.com",
    databaseURL: "https://practic-commerce-7edp-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "practic-commerce-7edp",
    storageBucket: "practic-commerce-7edp.firebasestorage.app",
    messagingSenderId: "73081389077",
    appId: "1:73081389077:web:e0808463c34213a3f98e1c"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);