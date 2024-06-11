import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, getIdTokenResult } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DATABASE_URL,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID,
  measurementId: process.env.VUE_APP_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(
  app,
  "https://car-hub-130b6-default-rtdb.europe-west1.firebasedatabase.app"
);
const storage = getStorage(app);
const functions = getFunctions(app);
const analytics = getAnalytics(app);

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (user) => {
        if (user) {
          try {
            // Refresh the ID token to get the latest custom claims
            const idTokenResult = await getIdTokenResult(auth.currentUser);

            const userData = {
              isVerified: user.emailVerified,
              isAdmin: idTokenResult.claims.admin || false,
              email: user.email,
              displayName: user.displayName,
              phoneNumber: user.phoneNumber,
              id: user.uid,
              balance: idTokenResult.claims.balance || 0,
            };

            resolve(userData);
          } catch (error) {
            reject(error);
          }
        } else {
          resolve(null);
        }
      },
      reject
    );

    // Return unsubscribe function to stop listening when needed
    return unsubscribe;
  });
};

export { app, functions, auth, db, storage, getCurrentUser, analytics };
