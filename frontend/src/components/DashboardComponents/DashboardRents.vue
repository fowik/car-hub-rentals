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
        <!-- Rentals table -->
        <div
          class="container border rounded mt-4 mb-4 fs-7 mw-100 overflow-auto bg-dark"
        >
          <div class="row">
            <div class="text-start col-md-6">
              <h2 class="m-2">Rentals</h2>
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
          <div class="tableFixHead">
            <table class="table table-hover">
              <thead class="position-sticky">
                <tr>
                  <th
                    scope="col"
                    class="text-start"
                    v-on:click="sort('renterName')"
                  >
                    Renter Name
                    <fa
                      v-if="
                        sortKey === 'renterName' &&
                        sortOrders['renterName'] === 1
                      "
                      icon="caret-up"
                      class="ms-2"
                    />
                    <fa
                      v-else-if="
                        sortKey === 'renterName' &&
                        sortOrders['renterName'] === -1
                      "
                      icon="caret-down"
                      class="ms-2"
                    />
                    <fa v-else icon="caret-up" class="ms-2" />
                  </th>
                  <th scope="col" v-on:click="sort('carModelBrand')">
                    Car
                    <fa
                      v-if="
                        sortKey === 'carModelBrand' &&
                        sortOrders['carModelBrand'] === 1
                      "
                      icon="caret-up"
                      class="ms-2"
                    />
                    <fa
                      v-else-if="
                        sortKey === 'carModelBrand' &&
                        sortOrders['carModelBrand'] === -1
                      "
                      icon="caret-down"
                      class="ms-2"
                    />
                    <fa v-else icon="caret-up" class="ms-2" />
                  </th>
                  <th scope="col" v-on:click="sort('rentalDetails')">
                    Rental Details
                    <fa
                      v-if="
                        sortKey === 'rentalDetails' &&
                        sortOrders['rentalDetails'] === 1
                      "
                      icon="caret-up"
                      class="ms-2"
                    />
                    <fa
                      v-else-if="
                        sortKey === 'rentalDetails' &&
                        sortOrders['rentalDetails'] === -1
                      "
                      icon="caret-down"
                      class="ms-2"
                    />
                    <fa v-else icon="caret-up" class="ms-2" />
                  </th>
                  <th scope="col" v-on:click="sort('date')">
                    Date
                    <fa
                      v-if="sortKey === 'date' && sortOrders['date'] === 1"
                      icon="caret-up"
                      class="ms-2"
                    />
                    <fa
                      v-else-if="
                        sortKey === 'date' && sortOrders['date'] === -1
                      "
                      icon="caret-down"
                      class="ms-2"
                    />
                    <fa v-else icon="caret-up" class="ms-2" />
                  </th>
                  <th scope="col" class="text-end" v-on:click="sort('status')">
                    Status
                    <fa
                      v-if="sortKey === 'status' && sortOrders['status'] === 1"
                      icon="caret-up"
                      class="ms-2"
                    />
                    <fa
                      v-else-if="
                        sortKey === 'status' && sortOrders['status'] === -1
                      "
                      icon="caret-down"
                      class="ms-2"
                    />
                    <fa v-else icon="caret-up" class="ms-2" />
                  </th>
                </tr>
              </thead>
              <!-- Table body -->
              <tbody>
                <tr v-for="(rental, index) in displayedRentals" :key="index">
                  <td class="p-3 text-start">
                    {{ rental.renterName }}
                  </td>
                  <td class="p-3">{{ rental.carModelBrand }}</td>
                  <td class="pt-3">
                    <div class="rental-details-wrapper">
                      <div
                        v-if="
                          rental.rentalDetails &&
                          rental.rentalDetails.length > 50
                        "
                      >
                        {{ rental.rentalDetails.slice(0, 50) + "..." }}
                        <button
                          class="btn btn-link p-0"
                          v-on:click="showFullRentalDetails(index)"
                        >
                          See more
                        </button>
                      </div>
                      <div v-else>
                        {{ rental.rentalDetails }}
                      </div>
                    </div>
                  </td>
                  <td class="p-3">{{ rental.date }}</td>
                  <td class="text-end p-2">
                    <div class="btn-group dropstart" style="z-index: 0">
                      <button
                        type="button"
                        class="btn btn-secondary dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {{ rental.status }}
                      </button>
                      <ul class="dropdown-menu">
                        <li>
                          <button
                            class="dropdown-item"
                            v-on:click="changeStatus(rental, 'Active')"
                          >
                            Active
                          </button>
                        </li>
                        <li>
                          <button
                            class="dropdown-item"
                            v-on:click="changeStatus(rental, 'Returned')"
                          >
                            Returned
                          </button>
                        </li>
                        <li>
                          <button
                            class="dropdown-item"
                            v-on:click="changeStatus(rental, 'Cancelled')"
                          >
                            Cancelled
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- Pagination -->
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
import { db } from "@/firebase/firebase";
import { onValue, ref } from "firebase/database";
import axios from "axios";

import { saveAs } from "file-saver";

export default {
  name: "DashboardRentals",
  data() {
    return {
      rentals: [],
      currentPage: 1,
      itemsPerPage: 10,
      sortKey: "",
      sortOrders: {
        renterName: 1,
        carModelBrand: 1,
        rentalDetails: 1,
        date: 1,
        status: 1,
      },
      searchQuery: "",
      expandedRentalIndex: null,
    };
  },
  computed: {
    displayedRentals() {
      let filteredRentals = this.rentals;
      if (this.searchQuery) {
        const regex = new RegExp(this.searchQuery, "i");
        filteredRentals = filteredRentals.filter(
          (rental) =>
            regex.test(rental.renterName) ||
            regex.test(rental.carModelBrand) ||
            regex.test(rental.rentalDetails) ||
            regex.test(rental.date) ||
            regex.test(rental.status)
        );
      }
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return filteredRentals
        .slice(startIndex, endIndex)
        .map((rental, index) => ({
          ...rental,
          expanded: this.expandedRentalIndex === startIndex + index,
        }));
    },
    totalPages() {
      return Math.ceil(this.rentals.length / this.itemsPerPage);
    },
  },
  methods: {
    sort(key) {
      this.sortKey = key;
      this.sortOrders[key] = this.sortOrders[key] * -1;
      this.rentals.sort((a, b) => {
        const modifier = this.sortOrders[key];
        if (a[key] < b[key]) return -1 * modifier;
        if (a[key] > b[key]) return 1 * modifier;
        return 0;
      });
    },
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
    showFullRentalDetails(index) {
      this.expandedRentalIndex = index;
    },
    async changeStatus(rental, newStatus) {
      rental.status = newStatus;

      await axios.put(
        `https://us-central1-car-hub-130b6.cloudfunctions.net/api/rentals/update/status`,
        // `http://localhost:8000/rentals/update/status`,
        {
          rentalId: rental.id,
          status: newStatus,
        }
      );
    },
    async fetchRentals() {
      const rentalRef = ref(db, "reservations");
      onValue(rentalRef, async (snapshot) => {
        const data = snapshot.val();
        if (data) {
          // Fetch user data and car data
          const usersRef = ref(db, "users");
          const carsRef = ref(db, "cars");

          const [userData, carData] = await Promise.all([
            new Promise((resolve) => {
              onValue(usersRef, (snapshot) => {
                const userData = snapshot.val();
                resolve(userData);
              });
            }),
            new Promise((resolve) => {
              onValue(carsRef, (snapshot) => {
                const carData = snapshot.val();
                resolve(carData);
              });
            }),
          ]);

          // Update rentals with user display names and car models+brands
          this.rentals = Object.keys(data).map((key) => {
            const rental = data[key];
            const user = userData ? userData[rental.uid] : null;
            const car = carData ? carData[rental.carId] : null;
            const startTime = new Date(rental.startTime);
            const endTime =
              rental.status === "Active"
                ? new Date()
                : new Date(rental.endTime);

            // Calculate total time in seconds
            const totalTimeSeconds =
              rental.status === "Active"
                ? 0
                : Math.round((endTime - startTime) / 1000); // Convert milliseconds to seconds and round

            // Calculate hours, minutes, and seconds
            const hours =
              rental.status === "Ongoing"
                ? "-"
                : Math.round(totalTimeSeconds / 3600);
            const minutes =
              rental.status === "Ongoing"
                ? "-"
                : Math.round((totalTimeSeconds % 3600) / 60);
            const seconds =
              rental.status === "Ongoing"
                ? "-"
                : Math.round(totalTimeSeconds % 60);

            // Format the rental details
            const rentalDetails =
              rental.status === "Ongoing"
                ? "Ongoing"
                : `Total price: ${rental.totalPrice}€ | Time: ${hours}h ${minutes}m ${seconds}s`;

            return {
              ...rental,
              id: key,
              renterName: user ? user.displayName : "",
              rentalDetails,
              carModelBrand: car
                ? `${car.brand} ${car.model} | ${car.registration}`
                : "",
              date: startTime.toLocaleString(), // Using startTime for the date
            };
          });
        }
      });
    },
    async downloadXlsx() {
      try {
        const data = "reservations";
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
  created() {
    this.fetchRentals();
  },
};
</script>

<style scoped>
.tableFixHead {
  overflow-y: auto; /* make the table scrollable if height is more than 200 px  */
  overflow-x: auto;
  height: 460px; /* gives an initial height of 200px to the table */
}
.tableFixHead thead th {
  position: sticky; /* make the table heads sticky */
  top: 0px; /* table head will be placed from the top of the table and sticks to it */
}
table {
  border-collapse: collapse; /* make the table borders collapse to each other */
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
