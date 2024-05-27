<template>
  <div class="col mt-4 d-flex flex-column mx-3 w-75">
    <div class="row">
      <div class="col-md-12 col-xs-12">
        <!-- Search bar -->
        <div class="col-md-4 col-xs-8 col-xl-2">
          <div class="input-group md-form form-sm form-2 pl-0 m">
            <input
              class="form-control my-0 py-1 border-secondary"
              type="text"
              placeholder="Search"
              aria-label="Search"
              v-model="searchQuery"
            />
            <span class="input-group-text" id="basic-text1">
              <fa icon="search"></fa>
            </span>
          </div>
        </div>

        <div
          class="container border rounded mt-4 mb-4 fs-7 mw-100 overflow-auto bg-dark"
        >
          <div class="row">
            <div class="text-start col-md-6">
              <h2 class="m-2">Customers</h2>
            </div>
            <div class="text-end col-md-6 row-mobile">
              <button
                class="btn btn-warning m-3 text-end fs-8"
                @click="downloadXlsx"
              >
                View all
              </button>
            </div>
          </div>
          <ModalEditComponent :customer="selectedCustomer" />

          <div class="tableFixHead">
            <table class="table table-hover">
              <thead class="position-sticky">
                <tr>
                  <th
                    scope="col"
                    class="text-start"
                    v-on:click="sort('displayName')"
                  >
                    Full Name
                    <fa
                      v-if="
                        sortKey === 'displayName' &&
                        sortOrders['displayName'] === 1
                      "
                      icon="caret-up"
                      class="ms-2"
                    />
                    <fa
                      v-else-if="
                        sortKey === 'displayName' &&
                        sortOrders['displayName'] === -1
                      "
                      icon="caret-down"
                      class="ms-2"
                    />
                    <fa v-else icon="caret-up" class="ms-2" />
                  </th>
                  <th scope="col" v-on:click="sort('email')">
                    Email
                    <fa
                      v-if="sortKey === 'email' && sortOrders['email'] === 1"
                      icon="caret-up"
                      class="ms-2"
                    />
                    <fa
                      v-else-if="
                        sortKey === 'email' && sortOrders['email'] === -1
                      "
                      icon="caret-down"
                      class="ms-2"
                    />
                    <fa v-else icon="caret-up" class="ms-2" />
                  </th>
                  <th scope="col" v-on:click="sort('phoneNumber')">
                    Phone Number
                    <fa
                      v-if="
                        sortKey === 'phoneNumber' &&
                        sortOrders['phoneNumber'] === 1
                      "
                      icon="caret-up"
                      class="ms-2"
                    />
                    <fa
                      v-else-if="
                        sortKey === 'phoneNumber' &&
                        sortOrders['phoneNumber'] === -1
                      "
                      icon="caret-down"
                      class="ms-2"
                    />
                    <fa v-else icon="caret-up" class="ms-2" />
                  </th>
                  <th scope="col" v-on:click="sort('isAdmin')">
                    Admin<fa
                      v-if="
                        sortKey === 'isAdmin' && sortOrders['isAdmin'] === 1
                      "
                      icon="caret-up"
                      class="ms-2"
                    />
                    <fa
                      v-else-if="
                        sortKey === 'isAdmin' && sortOrders['isAdmin'] === -1
                      "
                      icon="caret-down"
                      class="ms-2"
                    />
                    <fa v-else icon="caret-up" class="ms-2" />
                  </th>
                  <th scope="col" v-on:click="sort('isVerified')">
                    Verified<fa
                      v-if="
                        sortKey === 'isVerified' &&
                        sortOrders['isVerified'] === 1
                      "
                      icon="caret-up"
                      class="ms-2"
                    />
                    <fa
                      v-else-if="
                        sortKey === 'isVerified' &&
                        sortOrders['isVerified'] === -1
                      "
                      icon="caret-down"
                      class="ms-2"
                    />
                    <fa v-else icon="caret-up" class="ms-2" />
                  </th>
                  <th scope="col" class="text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(user, index) in filteredCustomers" :key="index">
                  <td class="p-3 text-start" hidden>
                    {{ user.uid }}
                  </td>
                  <td class="p-3 text-start">
                    {{ user.displayName }}
                  </td>
                  <td class="p-3">{{ user.email }}</td>
                  <td class="p-3">{{ user.phoneNumber }}</td>
                  <td class="pt-3">
                    <fa
                      :icon="user.isAdmin ? 'check' : 'times'"
                      :class="{ 'text-danger': !user.isAdmin }"
                      class="fs-4 text-success"
                    />
                  </td>
                  <td class="pt-3">
                    <fa
                      :icon="user.isVerified ? 'check' : 'times'"
                      :class="{ 'text-danger': !user.isVerified }"
                      class="fs-4 text-success"
                    />
                  </td>
                  <td class="text-end">
                    <button
                      class="btn btn-outline-warning"
                      data-bs-target="#EditModalToggle"
                      data-bs-toggle="modal"
                      v-on:click="selectCustomer(user)"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              </tbody>
              <SpinnerComponent :isLoading="isLoading" />
            </table>
          </div>

          <div class="mt-2">
            <ul class="pagination">
              <li class="page-item">
                <a
                  class="page-link"
                  href="#"
                  aria-label="Previous"
                  v-on:click="previousPage"
                >
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li
                v-for="page in totalPages"
                :key="page"
                :class="{ 'page-item': true, active: currentPage === page }"
              >
                <a class="page-link" href="#" v-on:click="changePage(page)">{{
                  page
                }}</a>
              </li>
              <li class="page-item">
                <a
                  class="page-link"
                  href="#"
                  aria-label="Next"
                  v-on:click="nextPage"
                >
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ModalEditComponent from "./ModalEditCustomerComponent.vue";
import SpinnerComponent from "@/components/Spinner/SpinnerComponent.vue";

import { ref, onValue } from "firebase/database";
import { db } from "@/firebase/firebase";
import { showInfoToast } from "@/firebase/Toasts";

import axios from "axios";

import { saveAs } from "file-saver";

export default {
  name: "DashboardCustomers",
  components: {
    ModalEditComponent,
    SpinnerComponent,
  },
  data() {
    return {
      users: [],
      currentPage: 1,
      itemsPerPage: 10,
      sortKey: "",
      sortOrders: {
        displayName: 1,
        email: 1,
        phoneNumber: 1,
        isAdmin: 1,
        isVerified: 1,
      },
      searchQuery: "",
      selectedCustomer: null,
      isLoading: false,
      socket: null,
    };
  },
  created() {
    this.fetchData();
  },
  computed: {
    totalPages() {
      return Math.ceil(this.filteredCustomers.length / this.itemsPerPage);
    },
    filteredCustomers() {
      return this.filterUsers(this.users);
    },
    displayedCustomers() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredCustomers.slice(start, end);
    },
  },
  methods: {
    changePage(page) {
      this.currentPage = page;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    sort(key) {
      this.sortKey = key;
      this.sortOrders[key] *= -1;
    },
    sortUsers(users, key) {
      const modifier = this.sortOrders[key];
      return users.sort((a, b) => {
        if (key === "isAdmin" || key === "isVerified") {
          return modifier * (a[key] === b[key] ? 0 : a[key] ? -1 : 1);
        } else {
          return modifier * a[key].localeCompare(b[key]);
        }
      });
    },
    selectCustomer(customer) {
      this.selectedCustomer = customer;
    },
    async fetchData() {
      // Start the spinner
      this.isLoading = true;
      try {
        const dbRef = ref(db, "users");

        onValue(dbRef, (snapshot) => {
          const usersObject = snapshot.val();

          // Check if snapshot.val() is valid
          if (usersObject) {
            const usersArray = Object.keys(usersObject).map(
              (key) => usersObject[key]
            );

            usersArray.forEach((user, index) => {
              user.uid = Object.keys(usersObject)[index];
            });

            this.users = usersArray;
          } else {
            // Show info toast if there are no users
            showInfoToast("No users found");
          }
        });
      } catch (error) {
        console.error("Request failed:", error);
      } finally {
        // Stop the spinner
        this.isLoading = false;
      }
    },
    filterUsers(users) {
      let filtered = users;

      // Filter by search query
      if (this.searchQuery) {
        const escapedQuery = this.searchQuery
          .trim()
          .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const query = new RegExp(escapedQuery, "i");
        filtered = filtered.filter(
          (user) =>
            query.test(user.displayName) ||
            query.test(user.email) ||
            query.test(user.phoneNumber)
        );
      }

      // Sort filtered users
      if (this.sortKey) {
        filtered = this.sortUsers(filtered, this.sortKey);
      }

      return filtered;
    },
    async downloadXlsx() {
      try {
        const data = "users";
        const date = new Date().toISOString().slice(0, 10);
        const response = await axios.post(
          "https://us-central1-car-hub-130b6.cloudfunctions.net/api/export-xlsx",
          // "http://localhost:8000/export-xlsx",
          {
            data: data,
          },
          {
            responseType: "blob",
          }
        );

        const blob = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        saveAs(blob, `${data}_${date}.xlsx`);
      } catch (error) {
        console.error("Error downloading XLSX:", error);
      }
    },
  },
};
</script>

<style scoped>
.tableFixHead {
  overflow-y: auto;
  overflow-x: auto;
  position: relative;
  height: 460px;
}
.tableFixHead thead th {
  position: sticky;
  top: 0px;
}
table {
  border-collapse: collapse;
  width: 100%;
}

@media (max-width: 430px) {
  .row-mobile {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .fs-8 {
    font-size: 15px !important;
  }
}
</style>
