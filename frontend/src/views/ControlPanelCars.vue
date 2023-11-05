<template>
  <section>
    <ControlPanelNavigation />
    <CarFormContainer
      v-if="isCarFormVisible"
      :carData="selectedCar"
      @edit-car="handleEditCar"
      @click="hideCarForm"
    />
    <div class="main">
      <div class="topbar">
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

      <!-- table -->
      <div class="details">
        <div class="cars">
          <div class="cardHeader">
            <h2>Cars</h2>
            <router-link to="/control-panel/cars/add" class="btn-add"
              >Add Car</router-link
            >
            <router-link to="" class="btn"> View All</router-link>
          </div>
          <table>
            <thead>
              <tr>
                <td>Brand & Model</td>
                <td>Year & Type & Engine Capacity</td>
                <td>Status</td>
                <td>Price per Minute</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody class="table-container">
              <tr v-for="car in cars" :key="car.id">
                <td>
                  {{ car.brand }}
                  <p>{{ car.model }}</p>
                </td>

                <td>
                  {{ car.year }} | {{ car.type }} | {{ car.engineCapacity }}
                </td>
                <td class="available" v-if="car.available === true">
                  Available
                </td>
                <td class="reserved" v-else>Reserved</td>
                <td>
                  {{ car.pricePerMinute }}
                </td>
                <td>
                  <router-link
                    to=""
                    class="btn-edit"
                    @click="showCarForm(car.id)"
                    >Edit</router-link
                  >
                  <router-link
                    to=""
                    class="btn-delete"
                    v-on:click="deleteCar(car.id)"
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
import CarFormContainer from "@/components/CarFormContainer.vue";

export default {
  data() {
    return {
      username: "",
      email: "",
      cars: this.getCars(),
      isCarFormVisible: false,
      selectedCar: null,
    };
  },
  components: {
    ControlPanelNavigation,
    CarFormContainer,
  },
  methods: {
    showCarForm(carId) {
      this.$emit("edit-car", carId);
      this.selectedCar = carId;
      this.isCarFormVisible = true;
    },
    hideCarForm(event) {
      const id = document.getElementById("car-form-container");
      if (event.target === id) {
        this.selectedCar = this.isCarFormVisible = false;
      }
    },
    async getCars() {
      try {
        const response = await fetch("http://localhost:3000/api/cars/get", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          const data = await response.json();
          this.cars = data; // Assuming your response data is an array of car objects
        } else {
          console.error("Failed to fetch cars");
        }
      } catch (error) {
        console.log(error);
      }
    },
    async deleteCar(carId) {
      try {
        const id = carId;
        const response = await fetch(
          "http://localhost:3000/api/cars/delete/" + id + "",
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          const data = await response.json();
          this.cars = data; // Assuming your response data is an array of car objects
        } else {
          console.error("Failed to fetch cars");
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    document.addEventListener("DOMContentLoaded", function () {
      // MenuToggle
      let toggle = document.querySelector(".toggle");
      let navigation = document.querySelector(".navigation");
      let main = document.querySelector(".main");

      toggle.onclick = function () {
        toggle.classList.toggle("active");
        navigation.classList.toggle("active");
        main.classList.toggle("active");
      };

      // Select all list items with class "navigation"
      let list = document.querySelectorAll(".navigation li");

      function activeLink() {
        list.forEach((item) => item.classList.remove("hovered"));
        this.classList.add("hovered");
      }

      list.forEach((item) => item.addEventListener("mouseover", activeLink));
    });
  },
};
</script>

<style scoped>
.details {
  width: 100%;
  padding: 20px;
}

.details .cars {
  position: relative;
  display: grid;
  min-height: calc(100vh - 455px);
  background: var(--black-light);
  padding: 20px;
  box-shadow: 0 7px 25px rgba(0, 0, 0, 0.08);
  border-radius: 20px;
  min-height: 450px;
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
}

.table-container td.available {
  color: #2ecc71; /* Set the color to a blue shade */
  font-size: 18px; /* Set the icon size */
}

.table-container td.reserved {
  color: #e74c3c; /* Set the color to a blue shade */
  font-size: 18px; /* Set the icon size */
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

.details .cars tbody tr {
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.details .cars tbody tr:last-child {
  border-bottom: none;
}

.details .cars table tbody tr:hover {
  background: var(--orange-dark);
}

.details .cars table tr td {
  padding: 10px;
}

.details .cars table tr td:last-child {
  text-align: end;
}

.details .cars table tr td:nth-child(2) {
  text-align: end;
}

.details .cars table tr td:nth-child(3) {
  text-align: center;
}

.details .cars table tr td:nth-child(4) {
  text-align: start;
}

.details .cars table tr td:last-child {
  text-align: end;
}

.details .cars table tr .pass {
  -webkit-text-security: disc;
}

.details .cars table tr .pass:hover {
  -webkit-text-security: none;
}

.cardHeader {
  display: flex;
  justify-content: space-between;
}

.cardHeader h2 {
  flex: 1;
  font-weight: 600;
  color: var(--white);
  margin-right: 10px;
}

.cardHeader .btn {
  position: relative;
  padding: 5px 15px;
  background: var(--orange);
  color: var(--white);
  border-radius: 5px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: 0.5s;
  margin-left: 20px;
  height: fit-content;
}

.cardHeader .btn:hover {
  background: var(--orange-dark);
}

.cardHeader .btn-add {
  position: relative;
  padding: 5px 15px;
  background: #00cc00;
  color: var(--white);
  border-radius: 5px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: 0.5s;
  height: fit-content;
}

.cardHeader .btn-add:hover {
  background: #008000;
}
</style>
