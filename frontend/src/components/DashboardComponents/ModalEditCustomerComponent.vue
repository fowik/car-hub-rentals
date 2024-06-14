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
              <label for="email" class="col-form-label">Balance</label>
              <div class="input-group">
                <div class="form-floating">
                  <input
                    type="text"
                    class="form-control"
                    id="floatingBalance"
                    placeholder="Phone Number"
                    v-model="balance"
                  />
                  <label for="floatingBalance">Balance</label>
                </div>
                <span class="input-group-text">€</span>
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
        <SpinnerComponent :isLoading="isLoading" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {
  showSuccessToast,
  showErrorToast,
  showInfoToast,
} from "@/firebase/Toasts";
import $ from "jquery";

import SpinnerComponent from "../Spinner/SpinnerComponent.vue";

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
      balance: 0,
      isAdmin: false,
      isLoading: false,
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
          this.balance = newVal.balance || 0;
        }
      },
    },
  },
  components: {
    SpinnerComponent,
  },
  methods: {
    async saveChanges() {
      this.isLoading = true;
      if (
        !this.firstName ||
        !this.lastName ||
        !this.email ||
        !this.phoneNumber ||
        !this.balance
      ) {
        showErrorToast("Please fill in all required fields!");
        return;
      }

      if (!this.isValidEmail(this.email)) {
        showErrorToast("Please enter a valid email address!");
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
          balance: this.balance,
        };

        try {
          await axios.put(
            // `http://localhost:8000/users/update`,
            `https://us-central1-car-hub-130b6.cloudfunctions.net/api/users/update`,
            userData
          );

          $("#EditModalToggle").hide();
          $(".modal-backdrop").remove();
          $("body").css("padding-right", "0px");
          $("body").css("overflow", "auto");
          showSuccessToast("Customer updated successfully!");
        } catch (error) {
          console.error("Error updating customer:", error);
          showInfoToast("An error occurred while updating customer!");
        }
      } else {
        showInfoToast("No changes detected!");
      }
      this.isLoading = false;
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
        this.isAdmin !== this.customer.isAdmin ||
        this.phoneNumber !== this.customer.phoneNumber ||
        this.balance !== this.customer.balance
      );
    },
  },
};
</script>
