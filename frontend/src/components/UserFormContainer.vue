<template>
  <div id="user-form-container">
    <div class="user-form">
      <h2>User Edit</h2>
      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
      <form @submit.prevent="editUser">
        <input v-model="id" type="hidden" />
        <input
          v-model="username"
          type="text"
          placeholder="Enter Username"
          required
        />
        <input
          v-model="email"
          type="email"
          placeholder="Enter Email"
          required
        />
        <input
          v-model="password"
          type="password"
          placeholder="Enter Password"
          required
        />
        <input v-model="full_name" type="text" placeholder="Enter Full Name" />
        <p>Is Admin?</p>
        <input v-model="isAdmin" type="checkbox" />
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      id: null,
      username: "",
      email: "",
      password: "",
      full_name: "",
      isAdmin: false,
      successMessage: "",
    };
  },
  watch: {
    successMessage() {
      setTimeout(this.clearSuccessMessage, 3000);
    },
  },
  methods: {
    handleEditUser(id) {
      this.getUser(id);
    },
    async getUser(id) {
      console.log(id);
      try {
        const response = await fetch(
          "http://localhost:3000/api/users/get/" + id + "",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          const data = await response.json();
          this.id = data.id;
          this.username = data.username;
          this.email = data.email;
          this.password = data.password;
          this.full_name = data.fullName;
          this.isAdmin = data.isAdmin;
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.log(error);
      }
    },
    async editUser() {
      try {
        const id = this.id;
        const userData = {
          username: this.username,
          email: this.email,
          password: this.password,
          full_name: this.full_name,
          isAdmin: this.isAdmin,
        };
        const response = await fetch(
          `http://localhost:3000/api/users/update/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          }
        );
        if (response.status === 200) {
          this.successMessage = "User edited successfully!";
          this.$emit("user-edited");
        } else if (response.status === 402) {
          this.successMessage = "You need to edit at least one field";
          this.$emit("car-edited");
        } else {
          this.successMessage = "Failed to edit user";
        }
      } catch (error) {
        console.log(error);
      }
    },
    clearSuccessMessage() {
      this.successMessage = "";
    },
  },
  mounted() {
    this.handleEditUser(this.userData);
  },
};
</script>

<style scoped>
/* POPUP */
#user-form-container {
  z-index: 10;
  justify-content: center;
  align-items: center;
  position: fixed;
  display: flex;
  left: 50%;
  transform: translate(-50%);
  background-color: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 101%;
}
.user-form {
  background-color: #292929;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  max-width: 400px;
  margin: 50px auto;
  text-align: center;
}
.user-form h2 {
  margin-top: 0;
  margin-bottom: 20px;
}

.user-form input[type="text"],
.user-form input[type="password"],
.user-form input[type="number"],
.user-form input[type="email"],
.user-form input[type="checkbox"],
.user-form select {
  width: 90%;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  border: none;
  border-radius: 5px;
  justify-content: center;
  outline: none;
}

.user-form button {
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

.user-form button:hover {
  background-color: #f49200;
}

.user-form a {
  text-decoration: none;
  color: #ffa31a;
}

.user-form a:hover {
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

.success-message {
  color: #fff; /* Green color */
  font-size: 14px;
  font-weight: 600;
  background-color: #28a745;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
}
</style>
