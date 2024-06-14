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
        <!-- Cars table -->
        <div
          class="container border rounded mt-4 mb-4 fs-7 mw-100 overflow-auto bg-dark"
        >
          <div class="row">
            <div class="text-start col-md-6">
              <h2 class="m-2">Cars</h2>
            </div>
            <div class="text-end col-md-6 row-mobile">
              <button
                class="btn btn-warning me-3 mt-3 mb-3 text-end fs-8"
                @click="downloadXlsx"
              >
                View all
              </button>
              <ModalAddCarComponent />
            </div>
          </div>
          <ModalEditCarComponent :selectedCar="selectedCarData" />
          <div class="tableFixHead">
            <table class="table table-hover">
              <thead class="position-sticky">
                <tr>
                  <th
                    scope="col"
                    class="text-start"
                    v-on:click="sort('registrationNumber')"
                  >
                    Registration Number
                    <fa
                      v-if="
                        sortKey === 'registrationNumber' &&
                        sortOrders['registrationNumber'] === 1
                      "
                      icon="caret-up"
                      class="ms-2"
                    />
                    <fa
                      v-else-if="
                        sortKey === 'registrationNumber' &&
                        sortOrders['registrationNumber'] === -1
                      "
                      icon="caret-down"
                      class="ms-2"
                    />
                    <fa v-else icon="caret-up" class="ms-2" />
                  </th>
                  <th scope="col" v-on:click="sort('brandModel')">
                    Brand & Model
                    <fa
                      v-if="
                        sortKey === 'brandModel' &&
                        sortOrders['brandModel'] === 1
                      "
                      icon="caret-up"
                      class="ms-2"
                    />
                    <fa
                      v-else-if="
                        sortKey === 'brandModel' &&
                        sortOrders['brandModel'] === -1
                      "
                      icon="caret-down"
                      class="ms-2"
                    />
                    <fa v-else icon="caret-up" class="ms-2" />
                  </th>
                  <th scope="col" v-on:click="sort('yearTypeCapacity')">
                    Year & Type & Capacity
                    <fa
                      v-if="
                        sortKey === 'yearTypeCapacity' &&
                        sortOrders['yearTypeCapacity'] === 1
                      "
                      icon="caret-up"
                      class="ms-2"
                    />
                    <fa
                      v-else-if="
                        sortKey === 'yearTypeCapacity' &&
                        sortOrders['yearTypeCapacity'] === -1
                      "
                      icon="caret-down"
                      class="ms-2"
                    />
                    <fa v-else icon="caret-up" class="ms-2" />
                  </th>
                  <th scope="col" v-on:click="sort('status')">
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
                  <th scope="col" v-on:click="sort('pricePerMinute')">
                    Price per Minute
                    <fa
                      v-if="
                        sortKey === 'pricePerMinute' &&
                        sortOrders['pricePerMinute'] === 1
                      "
                      icon="caret-up"
                      class="ms-2"
                    />
                    <fa
                      v-else-if="
                        sortKey === 'pricePerMinute' &&
                        sortOrders['pricePerMinute'] === -1
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
                <tr v-for="(car, index) in displayedCars" :key="index">
                  <td class="p-3 text-start">
                    {{ car.registration }}
                  </td>
                  <td class="p-3">{{ car.brand }} {{ car.model }}</td>
                  <td class="p-3">
                    {{ car.year }} | {{ car.type }} | {{ car.capacity }}
                  </td>
                  <td
                    :class="{
                      'p-3': true,
                      'fw-bold': true,
                      'text-danger': car.status === 'Reserved',
                      'text-success': car.status === 'Available',
                      'text-warning': car.status === 'Maintenance',
                    }"
                  >
                    {{ car.status }}
                  </td>
                  <td class="p-3">{{ car.pricePerMinute }} €</td>
                  <td class="text-end">
                    <button
                      :disabled="car.status === 'Reserved'"
                      class="btn btn-outline-warning"
                      data-bs-target="#EditModalToggle"
                      data-bs-toggle="modal"
                      v-on:click="selectedCar(car)"
                    >
                      Edit
                    </button>
                    <button
                      :disabled="car.status === 'Reserved'"
                      class="btn btn-outline-danger ms-3"
                      v-on:click="deleteCar(car)"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
              <SpinnerComponent :isLoading="isLoading" />
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
import ModalEditCarComponent from "./ModalEditCarComponent.vue";
import ModalAddCarComponent from "./ModalAddCarComponent.vue";
import SpinnerComponent from "../Spinner/SpinnerComponent.vue";

import { showInfoToast, showSuccessToast } from "@/firebase/Toasts";
import { db } from "@/firebase/firebase";
import { ref, onValue } from "firebase/database";

import axios from "axios";

import { saveAs } from "file-saver";

export default {
  name: "DashboardCars",
  components: {
    ModalEditCarComponent,
    ModalAddCarComponent,
    SpinnerComponent,
  },
  data() {
    return {
      cars: [],
      currentPage: 1,
      itemsPerPage: 10,
      sortKey: "",
      sortOrders: {
        registrationNumber: 1,
        brandModel: 1,
        yearTypeCapacity: 1,
        status: 1,
        pricePerMinute: 1,
      },
      searchQuery: "",
      isLoading: false,
      selectedCarData: null,
    };
  },
  async created() {
    await this.fetchData();
  },
  computed: {
    filteredCars() {
      if (!this.searchQuery) {
        return this.cars;
      }

      const escapedQuery = this.searchQuery
        .trim()
        .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const query = new RegExp(escapedQuery, "i");

      return this.cars.filter((car) =>
        Object.values(car).some((value) => query.test(value.toString()))
      );
    },
    displayedCars() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.filteredCars.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.filteredCars.length / this.itemsPerPage);
    },
  },
  methods: {
    async fetchData() {
      try {
        this.isLoading = true;
        const dbRef = ref(db, "cars");

        onValue(dbRef, (snapshot) => {
          const carsObject = snapshot.val();
          if (!carsObject) {
            showInfoToast("No cars found!");
            return;
          }
          const carsArray = Object.keys(carsObject).map(
            (key) => carsObject[key]
          );
          carsArray.forEach((car, index) => {
            car.id = Object.keys(carsObject)[index];
          });

          // Filter out the deleted cars
          const filteredCars = carsArray.filter((car) => !car.isDeleted);

          this.cars = filteredCars;
        });
      } catch (error) {
        console.error("Request failed:", error);
        this.Loading = true;
      } finally {
        this.isLoading = false;
      }
    },
    async deleteCar(car) {
      try {
        await axios.put(
          `https://us-central1-car-hub-130b6.cloudfunctions.net/api/cars/delete`,
          // "http://localhost:8000/cars/delete",
          {
            data: { key: car.id },
          }
        );
        showSuccessToast("Car deleted successfully!");
        // After deleting the car, you might want to refetch the data
        await this.fetchData();
      } catch (error) {
        console.error("Error deleting car:", error);
      }
    },
    selectedCar(car) {
      this.selectedCarData = car;
    },
    sort(key) {
      this.sortKey = key;
      this.sortOrders[key] = this.sortOrders[key] * -1;
      this.filteredCars.sort((a, b) => {
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
    async downloadXlsx() {
      try {
        const data = "cars";
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
  overflow-y: auto; /* make the table scrollable if height is more than 200 px  */
  overflow-x: auto;
  position: relative;
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
