<template>
  <section>
    <ControlPanelNavigation />
    <UserFormContainer
      v-if="isUserFormVisible"
      :userData="selectedUser"
      @edit-user="handleEditUser"
      @click="hideUserForm"
    />
    <div class="main transition-all duration-500 ml-80">
      <div class="topbar w-full h-16 flex justify-between items-center px-4">
        <div class="toggle">
          <ion-icon name="menu-outline"></ion-icon>
        </div>
        <!-- search -->
        <div class="search">
          <label>
            <input type="text" placeholder="Search Here" />
            <ion-icon name="search-outline"></ion-icon>
          </label>
        </div>

        <!-- user image -->
        <div class="user">
          <img src="" />
        </div>
      </div>
      <div class="details">
        <div class="recentRents">
          <div class="UserdHeader">
            <h2>Customers</h2>
            <a href="#" class="btn">View All</a>
          </div>
          <table>
            <thead>
              <tr>
                <td>Full Name & Username & Email</td>
                <td>Is Admin</td>
                <td>Password</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody class="table-container">
              <tr v-for="user in users" :key="user.id">
                <td>
                  <div v-if="user.fullName">{{ user.fullName }}</div>
                  <div v-else>NULL</div>
                  <p>{{ user.username }}</p>
                  <p>{{ user.email }}</p>
                </td>
                <td class="admin-true" v-if="user.isAdmin === true">
                  <ion-icon name="checkmark-outline"></ion-icon>
                </td>
                <td class="admin-false" v-else>
                  <ion-icon name="close-outline"></ion-icon>
                </td>
                <td>
                  <div class="pass">{{ user.password }}</div>
                </td>
                <td>
                  <router-link
                    to=""
                    class="btn-edit"
                    @click="showUserForm(user.id)"
                    >Edit</router-link
                  >
                  <router-link
                    to=""
                    class="btn-delete"
                    @click="deleteUser(user.id)"
                    >Delete</router-link
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ControlPanelNavigation from "@/components/ControlPanelNavigation.vue";
import UserFormContainer from "@/components/UserFormContainer.vue";

export default {
  data() {
    return {
      username: "",
      email: "",
      users: this.getUsers(),
      isUserFormVisible: false,
      selectedUser: null,
    };
  },
  components: {
    ControlPanelNavigation,
    UserFormContainer,
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    showUserForm(UserId) {
      this.$emit("edit-user", UserId);
      this.selectedUser = UserId;
      this.isUserFormVisible = true;
    },
    hideUserForm(event) {
      const id = document.getElementById("user-form-container");
      if (event.target === id) {
        this.selectedUser = this.isUserFormVisible = false;
      }
    },
    async getUsers() {
      try {
        const response = await fetch("http://localhost:3000/api/users/get", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          const data = await response.json();
          this.users = data; // Assuming your response data is an array of user objects
        } else {
          console.error("Failed to fetch users");
        }
      } catch (error) {
        console.log(error);
      }
    },
    async deleteUser(userId) {
      // Send a request to delete the user based on the userId
      try {
        const response = await fetch(
          `http://localhost:3000/api/users/delete/${userId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          // User successfully deleted, update the users list
          this.getUsers();
        } else {
          console.error("Failed to delete user");
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.main {
}
.details {
  width: 100%;
  padding: 20px;
}

.details .recentRents {
  position: relative;
  display: grid;
  min-height: calc(100vh - 455px);
  background: var(--black-light);
  padding: 20px;
  box-shadow: 0 7px 25px rgba(0, 0, 0, 0.08);
  border-radius: 20px;
  min-height: 480px;
}

.table-container {
  max-height: 480px; /* Set the maximum height for the tbody */
  overflow-y: auto; /* Add vertical scrollbar when content overflows */
  display: block; /* Enable block-level container behavior for tbody */
}

.table-container thead,
tr {
  display: table;
  width: 100%;
  table-layout: fixed;
}

.table-container td p {
  margin-top: 5px;
  font-size: 12px;
  font-weight: 600;
  opacity: 1;
  text-transform: lowercase;
}

.table-container td.admin-true {
  color: #2ecc71; /* Set the color to a blue shade */
  font-size: 32px; /* Set the icon size */
}

.table-container td.admin-false {
  color: #e74c3c; /* Set the color to a blue shade */
  font-size: 32px; /* Set the icon size */
}

.table-container td .btn-edit {
  margin-left: 10px;
  cursor: pointer;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
}

.table-container td .btn-edit:hover {
  background-color: #2980b9;
}

.table-container td .btn-delete {
  margin-left: 10px;
  cursor: pointer;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
}

.table-container td .btn-delete:hover {
  background-color: #c0392b;
}

.details .table-container::-webkit-scrollbar {
  width: 7px;
  background: var(--black);
  border-radius: 10px;
}

.details .table-container::-webkit-scrollbar-thumb {
  background: var(--orange);
  border-radius: 10px;
}

.details table {
  width: 100%;
  border-collapse: collapse;
}

.details table thead td {
  font-weight: 600;
}

.details .recentRents table tr {
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.details .recentRents table tr:last-child {
  border-bottom: none;
}

.details .recentRents table tbody tr:hover {
  background: var(--orange-dark);
}

.details .recentRents table tr td {
  padding: 10px;
}

.details .recentRents table tr td:last-child {
  text-align: end;
}

.details .recentRents table tr td:nth-child(2) {
  text-align: end;
}

.details .recentRents table tr td:nth-child(3) {
  text-align: center;
}

.details .recentRents table tr .pass {
  -webkit-text-security: disc;
}

.details .recentRents table tr .pass:hover {
  -webkit-text-security: none;
}

.UserdHeader {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.UserdHeader h2 {
  font-weight: 600;
  color: var(--white);
}

.UserdHeader .btn {
  position: relative;
  padding: 5px 15px;
  background: var(--orange);
  color: var(--white);
  border-radius: 5px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: 0.5s;
}

.UserdHeader .btn:hover {
  background: var(--orange-dark);
}
</style>
