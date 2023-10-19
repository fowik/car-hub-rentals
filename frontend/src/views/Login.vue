<template>
  <section>
    <div class="container">
      <div class="login-form">
        <!-- Login Form -->
        <h2>Login</h2>
        <p ref="errorMessage" v-if="state.error" class="error-message">
          {{ state.error }}
        </p>
        <form @submit.prevent="loginUser">
          <input
            type="text"
            v-model="username"
            placeholder="Username"
            required
          />
          <input
            type="password"
            v-model="password"
            placeholder="Password"
            required
          />
          <div>
            <button type="submit">Login</button>
            <p>
              Don't have and account?
              <router-link :to="{ name: 'Register' }">Sign up now</router-link>
            </p>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      state: {
        error: "",
      },
    };
  },
  watch: {
    username() {
      this.state.error = "";
    },
    password() {
      this.state.error = "";
    },
  },
  methods: {
    async loginUser() {
      const userData = {
        username: this.username,
        email: this.username,
        password: this.password,
      };
      try {
        const response = await fetch("http://localhost:3000/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

        if (response.status === 200) {
          // Handle successful login
          localStorage.setItem("user", JSON.stringify(user));
          this.$router.push({ path: "/profile" });
        } else if (response.status === 401) {
          const errorData = await response.json();
          this.state.error = errorData; // Update the error message in the state
          this.$nextTick(() => {
            // Ensure reactivity update after setting the error message
          });
        } else {
          // Handle failed login (e.g., wrong credentials)
          console.error("Login failed");
        }
      } catch (error) {
        // Handle network errors or other issues
        console.error("Error during login:", error);
      }
    },
  },
};
</script>

<style scoped>
.login-form {
  background-color: #292929;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
}
.login-form h2 {
  margin-top: 0;
  margin-bottom: 20px;
}

.login-form input[type="text"],
.login-form input[type="password"] {
  width: 90%;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  border: none;
  border-radius: 5px;
  justify-content: center;
  outline: none;
}

.login-form button {
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

.login-form button:hover {
  background-color: #f49200;
}

.login-form a {
  text-decoration: none;
  color: #ffa31a;
}

.login-form a:hover {
  text-decoration: underline;
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
</style>
