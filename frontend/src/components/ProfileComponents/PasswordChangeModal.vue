<template>
  <div
    class="modal fade"
    id="passwordChangeModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">
            Change Password
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
              type="password"
              class="form-control"
              id="currentPassword"
              placeholder="name@example.com"
              v-model="currentPassword"
            />
            <label for="currentPassword">Current Password</label>
          </form>
          <form class="form-floating m-2">
            <input
              type="password"
              class="form-control"
              id="newPassword"
              placeholder="name@example.com"
              v-model="newPassword"
            />
            <label for="newPassword">New Password</label>
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
            @click="handlePasswordUpdate(currentPassword, newPassword)"
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
import { updateUserPassword } from "@/firebase/Authentication/Profile/index.js";

import SpinnerComponent from "../Spinner/SpinnerComponent.vue";

export default {
  name: "PasswordChangeModal",
  data() {
    return {
      currentPassword: "",
      newPassword: "",
      isModalOpen: true,
      isLoading: false,
    };
  },
  components: {
    SpinnerComponent,
  },
  methods: {
    clearInputs() {
      this.currentPassword = "";
      this.newPassword = "";
    },
    async handlePasswordUpdate() {
      try {
        this.isLoading = true;

        await updateUserPassword(
          this.currentPassword,
          this.newPassword,
          this.clearInputs
        );
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.error(error);
      }
    },
  },
};
</script>
