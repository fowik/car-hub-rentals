<template>
  <section>
    <div class="container">
      <div class="registration-form">
        <!-- Registration Form -->
        <h2>Registration</h2>
        <p ref="errorMessage" v-if="state.error" class="error-message">
          {{ state.error }}
        </p>
        <form @submit.prevent="registerUser">
          <div>
            <input
              type="text"
              v-model="state.username"
              placeholder="Enter your username"
            />
          </div>
          <span v-if="v$.username.$error">
            {{ v$.username.$errors[0].$message }}
          </span>
          <div>
            <input
              type="email"
              v-model="state.email"
              placeholder="Enter your e-mail"
            />
          </div>
          <span v-if="v$.email.$error">
            {{ v$.email.$errors[0].$message }}
          </span>
          <div>
            <input
              type="password"
              v-model="state.password.password"
              placeholder="Type a password"
            />
          </div>
          <span v-if="v$.password.password.$error">
            {{ v$.password.password.$errors[0].$message }}
          </span>
          <div>
            <input
              type="password"
              v-model="state.password.confirm"
              placeholder="Confirm a password"
            />
          </div>
          <span v-if="v$.password.confirm.$error">
            {{ v$.password.confirm.$errors[0].$message }}
          </span>
          <div>
            <button @click="validateForm">Register</button>
          </div>
          <p>
            Already have an account?
            <router-link :to="{ name: 'Login' }">Login now</router-link>
          </p>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import withVuelidate from "@vuelidate/core";
import { required, email, minLength, sameAs } from "@vuelidate/validators";
import { reactive, computed } from "vue";

export default {
  setup() {
    const state = reactive({
      username: "",
      email: "",
      password: {
        password: "",
        confirm: "",
      },
    });

    const rules = computed(() => {
      return {
        username: { required, minLength: minLength(3) },
        email: { required, email },
        password: {
          password: { required, minLength: minLength(8) },
          confirm: { required, sameAs: sameAs(state.password.password) },
        },
      };
    });

    const v$ = withVuelidate(rules, state);

    return {
      state,
      v$,
    };
  },
  watch: {
    "state.username"(newVal, oldVal) {
      this.state.error = "";
    },
    "state.email"(newVal, oldVal) {
      this.state.error = "";
    },
    "state.password.password"(newVal, oldVal) {
      this.state.error = "";
    },
    "state.password.confirm"(newVal, oldVal) {
      this.state.error = "";
    },
  },
  methods: {
    valForm() {
      // Validate all fields
      this.v$.$validate();
    },
    async registerUser() {
      this.valForm();
      if (
        this.v$.username.$error ||
        this.v$.email.$error ||
        this.v$.password.password.$error ||
        this.v$.password.confirm.$error
      ) {
        // If there are validation errors, do not proceed with registration
        // console.log("Form has validation errors");
        return;
      }

      // Send registration data to your server (make an API call here)
      const userData = {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password.password,
      };

      try {
        const res = await fetch("http://localhost:3000/api/users/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

        if (res.status === 201) {
          // Registration successful, redirect to login page
          this.$router.push({ path: "/login" });
          return res.json();
        } else if (res.status === 409) {
          // Registration failed due to existing user, show error message
          const errorData = await res.json();
          this.state.error = errorData; // Update the error message in the state
          this.$nextTick(() => {
            // Ensure reactivity update after setting the error message
          });
        } else {
          // Handle other registration errors, show a generic error message to the user
          console.error("Registration failed");
        }
      } catch (error) {
        console.error("Error during registration:", error);
      }
    },
  },
  mounted() {
    // Retrieve the user object from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    // Check if the user object is present and has a username property
    if (user) {
      this.$router.push({ path: "/profile" });
    }
  },
};
</script>

<style scoped>
.registration-form {
  background-color: #292929;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  max-width: 400px;
  text-align: center;
  margin: 0 auto;
}

.registration-form h2 {
  margin-top: 0;
  margin-bottom: 20px;
}

.registration-form input[type="text"],
.registration-form input[type="email"],
.registration-form input[type="password"] {
  width: 90%;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  border: none;
  border-radius: 5px;
  justify-content: center;
  outline: none;
  color: #292929;
}

span {
  color: red;
  font-size: 12px;
}

.error-message {
  color: #ff0000;
  font-size: 14px;
  font-weight: 600;
  background-color: #88080838;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
}

.registration-form button {
  background-color: #ffa31a;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  margin-top: 10px;
  margin-bottom: 15px;
}

.registration-form button:hover {
  background-color: #f49200;
}

.registration-form a {
  text-decoration: none;
  color: #ffa31a;
}

.registration-form a:hover {
  text-decoration: underline;
}
</style>
