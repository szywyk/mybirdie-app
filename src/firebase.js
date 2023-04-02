import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAaPwimxwXbAL26tGGvAnGrDZYjPaPzClQ",
  authDomain: "mybirdie-app.firebaseapp.com",
  projectId: "mybirdie-app",
  storageBucket: "mybirdie-app.appspot.com",
  messagingSenderId: "740015851406",
  appId: "1:740015851406:web:6df5a72aac13bf602906df",
  databaseURL: "https://mybirdie-app-default-rtdb.europe-west1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const database = getDatabase(app);
