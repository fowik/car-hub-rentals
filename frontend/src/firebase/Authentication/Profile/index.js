import { auth, db } from "@/firebase/firebase.js";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
  updateEmail,
  sendEmailVerification,
  PhoneAuthProvider,
  signInWithPhoneNumber,
  updatePhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";
import { ref, update } from "firebase/database";
import { showErrorToast, showSuccessToast } from "@/firebase/Toasts";

export async function updateUserPassword(
  currentPassword,
  newPassword,
  clearInputs
) {
  try {
    const user = auth.currentUser;
    if (!user) return;
    // Validate the password
    if (
      !currentPassword ||
      currentPassword === "" ||
      currentPassword.length < 6
    ) {
      showErrorToast("Please enter a valid current password");
      return;
    }
    if (!newPassword || newPassword === "" || newPassword.length < 6) {
      showErrorToast("Please enter a valid new password");
      return;
    }

    if (currentPassword === newPassword) {
      showErrorToast("The new password is the same as the current password.");
      return;
    }

    // Validate old password
    const credential = EmailAuthProvider.credential(
      user.email,
      currentPassword
    );

    // Re-authenticate the user
    await reauthenticateWithCredential(user, credential);

    // Update the password
    await updatePassword(user, newPassword);

    showSuccessToast("Password updated successfully!");

    clearInputs();
  } catch (error) {
    switch (error.code) {
      case "auth/wrong-password":
        showErrorToast("The current password is incorrect.");
        break;
      case "auth/weak-password":
        showErrorToast("The new password is too weak.");
        break;
      default:
        showErrorToast("An error occurred while updating the password.");
        break;
    }
    console.error("Error updating user password:", error);
  }
}

export async function updateUserEmail(email, newEmail, password, clearInputs) {
  try {
    const user = auth.currentUser;
    if (!user) {
      showErrorToast("No user is currently signed in.");
      return;
    }

    // Create credential for reauthentication
    const credential = EmailAuthProvider.credential(email, password);

    // Reauthenticate the user
    await reauthenticateWithCredential(user, credential);

    // Update the email
    await updateEmail(user, newEmail);

    // Update the email in the database
    const userRef = ref(db, `users/${user.uid}`);
    await update(userRef, { email: newEmail });

    // Send email verification
    await sendEmailVerification(user);

    clearInputs();
  } catch (error) {
    return error;
  }
}

// Update the phone number of the user in authentication and database
export async function updateUserPhoneNumber(
  email,
  newPhone,
  password,
  clearInputs
) {
  try {
    const user = auth.currentUser;

    if (!user) {
      showErrorToast("No user is currently signed in.");
      return;
    }

    // Reauthenticate the user
    const credential = EmailAuthProvider.credential(email, password);
    await reauthenticateWithCredential(user, credential);

    // Set up reCAPTCHA
    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
      },
      auth
    );

    // Send verification code
    const confirmationResult = await signInWithPhoneNumber(
      auth,
      newPhone,
      recaptchaVerifier
    );

    // This would be part of the verification step
    const verificationCode = prompt(
      "Please enter the verification code that was sent to your phone"
    );

    if (!verificationCode) {
      showErrorToast("Verification code is required to update phone number.");
      return;
    }

    const phoneCredential = PhoneAuthProvider.credential(
      confirmationResult.verificationId,
      verificationCode
    );
    await updatePhoneNumber(user, phoneCredential);

    // Update the phone number in the database
    const userRef = ref(db, `users/${user.uid}`);
    await update(userRef, { phoneNumber: newPhone });

    clearInputs();
    showSuccessToast("Phone number updated successfully!");
  } catch (error) {
    showErrorToast("An error occurred while updating the phone number.");
    console.error(error);
  }
}
