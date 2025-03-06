// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCF_PeY-bbqCXSIIz7Jz7wM1GL6FGiAVkc",
  authDomain: "servicesmithapp.firebaseapp.com",
  projectId: "servicesmithapp",
  storageBucket: "servicesmithapp.firebasestorage.app",
  messagingSenderId: "744873886464",
  appId: "1:744873886464:web:448c4a0d7285146a1129e5",
  measurementId: "G-FE7X067J9L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
