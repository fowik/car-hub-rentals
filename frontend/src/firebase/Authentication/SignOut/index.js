import { signOut } from "firebase/auth";
import { showErrorToast } from "@/firebase/Toasts";

import { auth } from "@/firebase/firebase.js";
import router from "@/router/index.js";

export async function signOutUser() {
  try {
    const logout = true;
    await signOut(auth);
    router.push({ name: "Home", params: { logout } });
  } catch (error) {
    showErrorToast("An error occurred while signing out.");
    console.error("Error signing out:", error);
  }
}
