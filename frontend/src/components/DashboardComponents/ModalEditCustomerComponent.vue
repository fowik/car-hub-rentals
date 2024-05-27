<template>
  <div
    class="modal fade"
    id="EditModalToggle"
    aria-hidden="true"
    aria-labelledby="EditModalToggleLabel"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="EditModalToggleLabel">
            Edit customer
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="saveChanges">
            <div class="mb-3 text-start">
              <label for="fullName" class="col-form-label">Full Name</label>
              <div class="input-group">
                <div class="form-floating">
                  <input
                    type="text"
                    class="form-control"
                    id="floatingFirstName"
                    placeholder="First name"
                    v-model="firstName"
                  />
                  <label for="floatingFirstName">First name</label>
                </div>
                <div class="form-floating">
                  <input
                    type="text"
                    class="form-control"
                    id="floatingLastName"
                    placeholder="Last name"
                    v-model="lastName"
                  />
                  <label for="floatingLastName">Last name</label>
                </div>
              </div>
            </div>
            <div class="mb-3 text-start">
              <label for="email" class="col-form-label">Email</label>
              <div class="form-floating">
                <input
                  type="email"
                  class="form-control"
                  id="floatingEmail"
                  placeholder="Email"
                  v-model="email"
                />
                <label for="floatingEmail">Email</label>
              </div>
            </div>
            <div class="mb-3 text-start">
              <label for="email" class="col-form-label">Phone Number</label>
              <div class="form-floating">
                <input
                  type="text"
                  class="form-control"
                  id="floatingPhoneNumber"
                  placeholder="Phone Number"
                  v-model="phoneNumber"
                />
                <label for="floatingPhoneNumber">Phone Number</label>
              </div>
            </div>
            <div class="mb-3 text-start">
              <label for="password" class="col-form-label">Password</label>
              <div class="form-floating">
                <input
                  type="password"
                  class="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  autocomplete="current-password"
                  disabled
                />
                <label for="floatingPassword">Password</label>
              </div>
            </div>
            <div class="mb-3 text-center">
              <label for="isAdmin" class="col-form-label">Is Admin?</label>
              <div class="mb-3 self-align-center">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="isAdminCheckbox"
                  v-model="isAdmin"
                />
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" class="btn btn-primary">
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { showSuccessToast } from "@/firebase/Toasts";
import $ from "jquery";

export default {
  name: "ModalEditCustomerComponent",
  props: {
    customer: {
      type: [Object, null],
      required: true,
    },
  },
  data() {
    return {
      uid: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      password: "",
      isAdmin: false,
    };
  },
  watch: {
    customer: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.uid = newVal.uid || "";
          this.firstName = newVal.displayName.split(" ")[0] || "";
          this.lastName = newVal.displayName.split(" ")[1] || "";
          this.phoneNumber = newVal.phoneNumber || "";
          this.email = newVal.email || "";
          this.password = newVal.password || "";
          this.isAdmin = newVal.isAdmin || false;
        }
      },
    },
  },
  methods: {
    async saveChanges() {
      if (!this.firstName || !this.lastName || !this.email) {
        this.showToast("Please fill in all required fields!", "error");
        return;
      }

      if (!this.isValidEmail(this.email)) {
        this.showToast("Please enter a valid email address!", "error");
        return;
      }

      if (this.isFormChanged()) {
        const { uid, firstName, lastName, phoneNumber, email, isAdmin } = this;

        const userData = {
          uid,
          email,
          displayName: `${firstName} ${lastName}`,
          isAdmin: isAdmin,
          phoneNumber,
        };

        try {
          await axios.put(
            // `http://localhost:8000/users/update`,
            `https://us-central1-car-hub-130b6.cloudfunctions.net/api/users/update`,
            userData
          );

          this.clearForm();
          $("#EditModalToggle").hide();
          $(".modal-backdrop").remove();
          showSuccessToast("Customer updated successfully!");
        } catch (error) {
          console.error("Error updating customer:", error);
          this.showToast("An error occurred while updating customer!", "error");
        }
      } else {
        this.showToast("No changes detected!", "info");
      }
    },
    isValidEmail(email) {
      const re = /\S+@\S+\.\S+/;
      return re.test(email);
    },
    isFormChanged() {
      return (
        this.firstName !== this.customer.firstName ||
        this.lastName !== this.customer.lastName ||
        this.email !== this.customer.email ||
        this.isAdmin !== this.customer.isAdmin
      );
    },
  },
};
</script>
