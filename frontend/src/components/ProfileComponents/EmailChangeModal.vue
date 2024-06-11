<template>
  <div
    class="modal fade"
    id="emailChangeModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Email change</h1>
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
              type="email"
              class="form-control"
              id="currentEmail"
              placeholder="name@example.com"
              :value="userEmail"
              disabled
            />
            <label for="currentEmail">Current Email address</label>
          </form>
          <form class="form-floating m-2">
            <input
              type="email"
              class="form-control"
              id="newEmail"
              placeholder="name@example.com"
              v-model="newEmail"
            />
            <label for="newEmail">New Email address</label>
          </form>
          <form class="form-floating m-2">
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="Password"
              v-model="password"
            />
            <label for="password">Password</label>
          </form>
        </div>

        <SpinnerComponent v-if="isLoading" />
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
            @click="handleUpdateEmail"
          >
            Save changes
          </button>
        </div>
        <SpinnerComponent :isLoading="isLoading" />
      </div>
    </div>
  </div>
</template>

<script>
import { updateUserEmail } from "@/firebase/Authentication/Profile/index.js";
import $ from "jquery";

import SpinnerComponent from "@/components/Spinner/SpinnerComponent.vue";
import { showErrorToast, showSuccessToast } from "@/firebase/Toasts";

export default {
  name: "EmailChangeModal",
  props: {
    userEmail: String,
  },
  data() {
    return {
      newEmail: "",
      password: "",
      isLoading: false,
    };
  },
  components: {
    SpinnerComponent,
  },
  methods: {
    clearInputs() {
      this.newEmail = "";
      this.password = "";
    },
    validateInputs() {
      if (this.newEmail === "" || this.password === "") {
        showErrorToast("Please fill in all fields");
        return false;
      }
      return true;
    },
    async handleUpdateEmail() {
      this.isLoading = true;

      try {
        if (!this.validateInputs()) {
          this.isLoading = true;
          return;
        }

        const error = await updateUserEmail(
          this.userEmail,
          this.newEmail,
          this.password,
          this.clearInputs
        );
        if (error) {
          // Handle the error returned by updateUserEmail
          switch (error.code) {
            case "auth/wrong-password":
              showErrorToast("Wrong password");
              break;
            case "auth/email-already-in-use":
              showErrorToast("Email already in use");
              break;
            case "auth/too-many-requests":
              showErrorToast("Too many requests. Try again later");
              break;
            case "auth/missing-password":
              showErrorToast("Please enter your password");
              break;
            default:
              showErrorToast("An unexpected error occurred");
              console.error("Unexpected error:", error);
              break;
          }
        } else {
          // No error, email updated successfully
          $("#emailChangeModal").hide();
          $(".modal-backdrop").remove();

          showSuccessToast("Email updated successfully");
        }
      } catch (error) {
        showErrorToast("An unexpected error occurred");
        console.error("Unexpected error:", error);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
