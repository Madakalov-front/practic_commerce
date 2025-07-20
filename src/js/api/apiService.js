import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";

// Firebase конфиг (замени на свой)
const firebaseConfig = {
  databaseURL: "https://practic-commerce-7edp-default-rtdb.europe-west1.firebasedatabase.app/"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export const fetchProducts = async () => {
  try {
    const productsRef = ref(db, 'products'); // 'products' - название узла в БД
    const snapshot = await get(productsRef);
    
    if (snapshot.exists()) {
      return Object.values(snapshot.val()); // Преобразуем объект в массив
    } else {
      console.log("No products available");
      return [];
    }
  } catch (error) {
    console.error('Firebase error:', error);
    return [];
  }
};