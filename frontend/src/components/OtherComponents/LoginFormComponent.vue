<template>
  <div class="mb-5 mt-5 border rounded bg-body-tertiary position-relative">
    <h2 class="mb-4 mt-4">Login</h2>
    <form
      @submit.prevent="loginUser"
      class="container"
      :class="{ loading: isLoading }"
    >
      <div class="form-floating mb-3">
        <input
          type="text"
          class="form-control"
          id="floatingemail"
          placeholder="email"
          v-model.trim="state.email"
        />
        <label for="floatingemail">Email address</label>
        <span class="text-danger" v-if="v$.email.$error">
          {{ v$.email.$errors[0].$message }}
        </span>
      </div>
      <div class="form-floating mb-3">
        <input
          type="password"
          class="form-control"
          id="floatingPassword"
          placeholder="Password"
          v-model.trim="state.password"
        />
        <label for="floatingPassword">Password</label>
        <span class="text-danger" v-if="v$.password.$error">
          {{ v$.password.$errors[0].$message }}
        </span>
      </div>
      <p>
        Don't have an account?
        <router-link to="/sign-up" class="link-opacity-100"
          >Sign up now</router-link
        >
      </p>
      <button type="submit" class="btn btn-primary mb-3">Login</button>
    </form>

    <SpinnerComponent :isLoading="isLoading" />
  </div>
</template>

<script>
import useValidate from "@vuelidate/core";
import useValidationRules from "@/firebase/Validations/LoginValidationRules";
import { ref } from "vue";

import SpinnerComponent from "@/components/Spinner/SpinnerComponent.vue";

import { loginUserWithEmailAndPassword } from "@/firebase/Authentication/EmailAuth";
import { showErrorToast } from "@/firebase/Toasts";

export default {
  name: "LoginFormComponent",
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
  components: {
    SpinnerComponent,
  },
  methods: {
    async loginUser() {
      // Check if form has validation errors
      this.v$.$validate();
      if (this.v$.$error) {
        showErrorToast("Form has validation errors!");
        return;
      }

      this.isLoading = true;

      try {
        await loginUserWithEmailAndPassword(
          this.state.email,
          this.state.password
        );

        this.isLoading = false;
      } catch (error) {
        showErrorToast("Error occurred while logging in!");
        console.log(error);
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
.container {
  min-width: 325px !important;
}
</style>
