<template>
  <div class="container border rounded mt-4 overflow-auto bg-dark">
    <div class="text-start">
      <h2 class="m-2">Recent Customers</h2>
    </div>

    <div class="tableFixHead">
      <table class="table table-hover">
        <thead class="position-sticky">
          <tr>
            <th scope="col" class="text-start" @click="sort('displayName')">
              Full Name
              <fa
                v-if="
                  sortKey === 'displayName' && sortOrders['displayName'] === 1
                "
                icon="caret-up"
                class="ms-2"
              />
              <fa
                v-else-if="
                  sortKey === 'displayName' && sortOrders['displayName'] === -1
                "
                icon="caret-down"
                class="ms-2"
              />
              <fa v-else icon="caret-up" class="ms-2" />
            </th>
            <th scope="col" @click="sort('email')">
              Email
              <fa
                v-if="sortKey === 'email' && sortOrders['email'] === 1"
                icon="caret-up"
                class="ms-2"
              />
              <fa
                v-else-if="sortKey === 'email' && sortOrders['email'] === -1"
                icon="caret-down"
                class="ms-2"
              />
              <fa v-else icon="caret-up" class="ms-2" />
            </th>
            <th scope="col" @click="sort('isAdmin')">
              Is Admin?
              <fa
                v-if="sortKey === 'isAdmin' && sortOrders['isAdmin'] === 1"
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
            <th scope="col" @click="sort('isVerified')">
              Is Verified?
              <fa
                v-if="
                  sortKey === 'isVerified' && sortOrders['isVerified'] === 1
                "
                icon="caret-up"
                class="ms-2"
              />
              <fa
                v-else-if="
                  sortKey === 'isVerified' && sortOrders['isVerified'] === -1
                "
                icon="caret-down"
                class="ms-2"
              />
              <fa v-else icon="caret-up" class="ms-2" />
            </th>
            <th scope="col" @click="sort('registrationDate')">
              Registration Date
              <fa
                v-if="
                  sortKey === 'registrationDate' &&
                  sortOrders['registrationDate'] === 1
                "
                icon="caret-up"
                class="ms-2"
              />
              <fa
                v-else-if="
                  sortKey === 'registrationDate' &&
                  sortOrders['registrationDate'] === -1
                "
                icon="caret-down"
                class="ms-2"
              />
              <fa v-else icon="caret-up" class="ms-2" />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(customer, index) in displayedCustomers" :key="index">
            <td class="p-3 text-start">{{ customer.displayName }}</td>
            <td class="p-3">{{ customer.email }}</td>
            <td class="pt-3">
              <fa
                :icon="customer.isAdmin ? 'check' : 'times'"
                :class="{ 'text-danger': !customer.isAdmin }"
                class="fs-4 text-success"
              />
            </td>
            <td class="pt-3">
              <fa
                :icon="customer.isVerified ? 'check' : 'times'"
                :class="{ 'text-danger': !customer.isVerified }"
                class="fs-4 text-success"
              />
            </td>
            <td class="p-3">{{ formatDate(customer.registrationDate) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { db } from "@/firebase/firebase";
import {
  ref,
  onValue,
  query,
  orderByChild,
  limitToLast,
} from "firebase/database";

export default {
  name: "RecentUsersComponent",
  data() {
    return {
      recentCustomers: [],
      sortKey: "",
      sortOrders: {
        displayName: 1,
        email: 1,
        isAdmin: 1,
        isVerified: 1,
        registrationDate: 1,
      },
    };
  },
  mounted() {
    this.getRecentUsers();
  },
  computed: {
    displayedCustomers() {
      return this.recentCustomers;
    },
  },
  methods: {
    formatDate(date) {
      const d = new Date(date);
      let month = "" + (d.getMonth() + 1);
      let day = "" + d.getDate();
      const year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    },
    async getRecentUsers() {
      const userRef = query(
        ref(db, "users"),
        orderByChild("registrationDate"),
        limitToLast(10)
      );

      onValue(userRef, (snapshot) => {
        const users = snapshot.val();
        if (!users) return;

        const usersArray = Object.keys(users).map((key) => ({
          id: key,
          displayName: users[key].displayName,
          email: users[key].email,
          isAdmin: users[key].isAdmin,
          isVerified: users[key].isVerified,
          registrationDate: users[key].registrationDate,
        }));

        this.recentCustomers = usersArray.reverse();
      });
    },
    sort(key) {
      if (this.sortKey === key) {
        this.sortOrders[key] = -this.sortOrders[key];
      } else {
        this.sortKey = key;
        this.sortOrders[key] = 1;
      }

      this.recentCustomers.sort((a, b) => {
        const modifier = this.sortOrders[key];
        if (key === "isAdmin") {
          return modifier * (a[key] === b[key] ? 0 : a[key] ? -1 : 1);
        } else {
          return modifier * a[key].localeCompare(b[key]);
        }
      });
    },
  },
};
</script>

<style scoped>
.tableFixHead {
  overflow-y: auto;
  overflow-x: auto;
  height: 330px;
}
.tableFixHead thead th {
  position: sticky;
  top: 0;
}

table {
  border-collapse: collapse;
  width: 100%;
}
</style>
