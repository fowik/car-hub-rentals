import { auth } from "@/firebase/firebase.js";

import {
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { showInfoToast, showErrorToast } from "@/firebase/Toasts";
import router from "@/router/index.js";
import store from "@/store/index.js";
import axios from "axios";

// Send email verification
export async function sendEmailVerify(user) {
  try {
    await sendEmailVerification(user);
  } catch (error) {
    console.error("Error sending email verification:", error);
    throw error;
  }
}

export async function loginUserWithEmailAndPassword(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    if (!user.emailVerified) {
      await sendEmailVerify(user);
      showInfoToast("Verify your email to log in. Verification email sent.");
      return;
    } else {
      // Send a POST request to your server to verify the email
      axios.post(
        "https://us-central1-car-hub-130b6.cloudfunctions.net/api/auth/verifyEmail",
        {
          uid: user.uid,
        }
      );

      // Proceed with fetching user data
      await store.dispatch("fetchUserData");
      const currentUser = store.state.userData;

      if (currentUser) {
        router.push({ name: "AppProfile", query: { loggedIn: true } });
      } else {
        showErrorToast("Failed to fetch user data. Please try again.");
      }
    }
  } catch (error) {
    // Handle login errors
    switch (error.code) {
      case "auth/user-not-found":
        showErrorToast("User not found. Please register first.");
        break;
      case "auth/wrong-password":
        showErrorToast("Incorrect password. Please try again.");
        break;
      default:
        showErrorToast("An error occurred during login. Please try again.");
        break;
    }
  }
}

// Logout
export async function logout() {
  const registered = true;
  await auth.signOut();
  router.push({ name: "AppLogin", params: { registered } });
}
