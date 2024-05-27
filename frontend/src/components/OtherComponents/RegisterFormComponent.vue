<template>
  <div class="mb-5 mt-5 border rounded bg-body-tertiary position-relative">
    <h2 class="mb-4 mt-4">Registration</h2>

    <form
      @submit.prevent="registerUser"
      class="container"
      :class="{ loading: isLoading }"
    >
      <!-- First Name -->
      <div class="input-group">
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="floatingFirstName"
            placeholder="Enter your first name"
            v-model.trim="state.firstName"
          />
          <label for="floatingFirstName">First name</label>
          <span class="text-danger" v-if="v$.firstName.$error">
            {{ v$.firstName.$errors[0].$message }}
          </span>
        </div>

        <!-- Last Name -->
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="floatingLastName"
            placeholder="Enter your last name"
            v-model.trim="state.lastName"
          />
          <label for="floatingLastName">Last name</label>
          <span class="text-danger" v-if="v$.lastName.$error">
            {{ v$.lastName.$errors[0].$message }}
          </span>
        </div>
      </div>

      <!-- Email -->
      <div class="form-floating mb-3">
        <input
          type="email"
          class="form-control"
          id="floatingEmail"
          placeholder="name@example.com"
          v-model.trim="state.email"
        />
        <label for="floatingEmail">Email address</label>
        <span class="text-danger" v-if="v$.email.$error">
          {{ v$.email.$errors[0].$message }}
        </span>
      </div>

      <!-- Phone Number -->
      <div class="form-floating mb-3">
        <input
          type="text"
          class="form-control"
          id="floatingPhoneNumber"
          placeholder="Enter your phone number"
          v-model.trim="state.phoneNumber"
        />
        <label for="floatingPhoneNumber">Phone number</label>
        <span class="text-danger" v-if="v$.phoneNumber.$error">
          {{ v$.phoneNumber.$errors[0].$message }}
        </span>
      </div>

      <!-- Password -->
      <div class="input-group">
        <div class="form-floating mb-3">
          <input
            type="password"
            class="form-control"
            id="floatingPassword"
            placeholder="Enter your password"
            v-model="state.password.password"
          />
          <label for="floatingPassword">Password</label>
          <span class="text-danger" v-if="v$.password.password.$error">
            {{ v$.password.password.$errors[0].$message }}
          </span>
        </div>

        <!-- Confirm Password -->
        <div class="form-floating mb-3">
          <input
            type="password"
            class="form-control"
            id="floatingConfirmPassword"
            placeholder="Confirm your password"
            v-model="state.password.confirmPassword"
          />
          <label for="floatingConfirmPassword">Confirm password</label>
          <span class="text-danger" v-if="v$.password.confirmPassword.$error">
            {{ v$.password.confirmPassword.$errors[0].$message }}
          </span>
        </div>
      </div>

      <p>
        Already have an account?
        <router-link to="/sign-in" class="link-opacity-100"
          >Sign in now</router-link
        >
      </p>
      <button type="submit" class="btn btn-primary mb-3">Register</button>
    </form>

    <SpinnerComponent :isLoading="isLoading" />
  </div>
</template>

<script>
import useValidate from "@vuelidate/core";
import useValidationRules from "@/firebase/Validations/RegisterValidationRules.js";
import axios from "axios";
import { auth } from "@/firebase/firebase.js";

import SpinnerComponent from "@/components/Spinner/SpinnerComponent.vue";

import { showErrorToast } from "@/firebase/Toasts";

import { ref } from "vue";
import {
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export default {
  name: "RegisterFormComponent",
  components: {
    SpinnerComponent,
  },
  setup() {
    const { state, rules } = useValidationRules();
    const v$ = useValidate(rules, state);
    const isLoading = ref(false);

    return {
      state,
      v$,
      isLoading,
    };
  },
  methods: {
    async registerUser() {
      // Check if form has validation errors
      this.v$.$validate();
      if (this.v$.$error) {
        showErrorToast("Form has validation errors!");
        return;
      }

      this.isLoading = true;

      try {
        const displayName = `${this.state.firstName} ${this.state.lastName}`;

        // Prepare user data
        const userData = {
          email: this.state.email,
          phoneNumber: this.state.phoneNumber,
          password: this.state.password.password,
          displayName: displayName,
        };

        // Register user with email and password
        await axios.post(
          "https://us-central1-car-hub-130b6.cloudfunctions.net/api/auth/register",
          // "http://localhost:8000/auth/register",
          userData
        );

        await signInWithEmailAndPassword(
          auth,
          this.state.email,
          this.state.password.password
        );

        // Send email verification
        await sendEmailVerification(auth.currentUser);

        await signOut(auth);

        this.navigateToLoginPage(true);
      } catch (error) {
        let errorMessage = error.message;

        // Check if error response from API contains specific error message
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          errorMessage = error.response.data.error;
        }

        showErrorToast(errorMessage);
      } finally {
        this.isLoading = false;
      }
    },
    navigateToLoginPage(verifyEmail) {
      //query with email
      this.$router.push({
        name: "AppLogin",
        query: { verifyEmail: verifyEmail, email: this.state.email },
      });
    },
  },
};
</script>
