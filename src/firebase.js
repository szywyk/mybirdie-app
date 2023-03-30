import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAaPwimxwXbAL26tGGvAnGrDZYjPaPzClQ",
  authDomain: "mybirdie-app.firebaseapp.com",
  projectId: "mybirdie-app",
  storageBucket: "mybirdie-app.appspot.com",
  messagingSenderId: "740015851406",
  appId: "1:740015851406:web:6df5a72aac13bf602906df"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);
export default storage;
