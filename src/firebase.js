import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";   // ✅ ADD THIS
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBzPr-SpMRZyk_jyzJWoMEaMxzP54DZ0kk",
  authDomain: "campus-management-system-2932f.firebaseapp.com",
  projectId: "campus-management-system-2932f",
  storageBucket: "campus-management-system-2932f.firebasestorage.app",
  messagingSenderId: "883005579981",
  appId: "1:883005579981:web:16dbd0080c11b06893ff84",
  measurementId: "G-FLH1GN47KV"
};

const app = initializeApp(firebaseConfig);

// ✅ EXPORT EVERYTHING PROPERLY
export const db = getFirestore(app);
export const auth = getAuth(app);   // ⭐ THIS FIXES YOUR ERROR
export const analytics = getAnalytics(app);

export default app;