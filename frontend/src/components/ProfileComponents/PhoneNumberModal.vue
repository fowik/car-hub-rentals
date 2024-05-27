<template>
  <div
    class="modal fade"
    id="numberChangeModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">
            Change phone number
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form class="form-floating m-2">
            <input
              type="tel"
              class="form-control"
              id="currentPhone"
              placeholder="+37112345678"
              disabled
              :value="phoneNumber"
            />
            <label for="currentPhone">Current Phone Number</label>
          </form>
          <form class="form-floating m-2">
            <input
              type="tel"
              class="form-control"
              id="newPhone"
              placeholder="+1234567890"
              v-model="newPhone"
            />
            <label for="newPhone">New Phone Number</label>
          </form>
          <form class="form-floating m-2">
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="Your password"
              v-model="password"
            />
            <label for="password">Password</label>
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="handleUpdatePhoneNumber"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { updateUserPhoneNumber } from "@/firebase/Authentication/Profile/index.js";
import { showErrorToast, showSuccessToast } from "@/firebase/Toasts";

import $ from "jquery";

export default {
  name: "PhoneNumberModal",
  props: {
    phoneNumber: String,
    email: String,
  },
  data() {
    return {
      newPhone: "",
      password: "",
    };
  },
  methods: {
    async handleUpdatePhoneNumber() {
      // Check if the email is available
      if (!this.email) {
        showErrorToast("User email is missing. Unable to update phone number.");
        return;
      }

      try {
        const error = await updateUserPhoneNumber(
          this.email,
          this.newPhone,
          this.password,
          this.clearInputs
        );
        if (error) {
          switch (error.code) {
            case "auth/invalid-phone-number":
              showErrorToast("Invalid phone number format.");
              break;
            case "auth/invalid-password":
              showErrorToast("Invalid password.");
              break;
            case "auth/requires-recent-login":
              showErrorToast("Please re-login to update your phone number.");
              break;
            case "auth/missing-password":
              showErrorToast(
                "Please enter your password to update your phone number."
              );
              break;
            default:
              showErrorToast("An unexpected error occurred.");
              console.error(error);
              break;
          }
        } else {
          $("#numberChangeModal").hide();
          $(".modal-backdrop").remove();

          showSuccessToast("Phone number updated successfully!");
          this.clearInputs();
        }
      } catch (error) {
        showErrorToast("An unexpected error occurred.");
        console.error(error);
      }
    },
    clearInputs() {
      this.newPhone = "";
      this.password = "";
    },
  },
};
</script>
