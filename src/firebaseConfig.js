import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ✅ Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDEQOwHyDhFiX-2QNZI-96mjXdNCkinYDw",
  authDomain: "dundho-apna-lawyer.firebaseapp.com",
  projectId: "dundho-apna-lawyer",
  storageBucket: "dundho-apna-lawyer.appspot.com", // 🔧 fixed typo
  messagingSenderId: "999443690901",
  appId: "1:999443690901:web:4422bc073c39bb0303f29c",
  measurementId: "G-92FQZXJ80G"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ✅ Add these two lines 👇
const auth = getAuth(app);
const db = getFirestore(app);

// ✅ Export them
export { auth, db };
