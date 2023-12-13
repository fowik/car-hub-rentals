<template>
  <div class="details">
    <div class="cars">
      <table>
        <thead>
          <tr>
            <th>Registration Number</th>
            <th>Brand & Model</th>
            <th>Year & Type & Engine Capacity</th>
            <th>Status</th>
            <th>Price per Minute</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="car in cars" :key="car.id">
            <td>{{ car.registration }}</td>
            <td>
              {{ car.brandName }}
              <p>{{ car.model }}</p>
            </td>
            <td>
              {{ car.year }} | {{ car.typeName }} | {{ car.engineCapacity }}
            </td>
            <td v-if="car.available" class="available">Available</td>
            <td v-else class="reserved">Reserved</td>
            <td>{{ car.pricePerMinute }}</td>
            <td>
              <button class="btn-reserve" @click="reserveCar(car.id, user.id)">
                Reserve
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      cars: [],
      user: JSON.parse(localStorage.getItem("user")),
    };
  },
  methods: {
    async getCars() {
      try {
        const response = await axios.get("http://localhost:3000/api/cars/get");

        if (response.status === 200) {
          this.cars = response.data;
        } else {
          console.error("Failed to fetch cars - Status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    },
    async reserveCar(carId, userId) {
      try {
        console.log(carId, userId);

        const response = await axios.post(
          `http://localhost:3000/api/bookings/start/${carId}/${userId}`
        );

        if (response.status === 200) {
          await this.getCars();
        } else if (response.status === 201) {
          console.error("This user already reserved car:", response.status);
        } else if (response.status === 202) {
          console.error("This car is already reserved:", response.status);
        } else {
          console.error("Failed to reserve car - Status:", response.status);
        }
      } catch (error) {
        console.error("Error reserving car:", error);
      }
    },
  },
  mounted() {
    this.getCars();
  },
};
</script>

<style scoped>
.details {
  width: 90%;
  padding: 40px;
  margin: 0 auto;
}

.details .cars {
  position: relative;
  display: grid;
  min-height: calc(100vh - 455px);
  background: var(--black-light);
  padding: 20px;
  box-shadow: 0 7px 25px rgba(0, 0, 0, 0.08);
  border-radius: 20px;
  max-height: 750px;
}

table thead,
th {
  width: 100%;
  margin-bottom: 10px;
}
table thead,
tr {
  display: table;
  width: 100%;
  table-layout: fixed;
}

table tbody {
  display: block;
  overflow-y: auto;
  width: 100%;
  height: 650px;
}

table tbody::-webkit-scrollbar {
  width: 7px;
  background: var(--black);
  border-radius: 10px;
}

table tbody::-webkit-scrollbar-thumb {
  background: var(--orange);
  border-radius: 10px;
}

.table td p {
  margin-top: 5px;
  font-size: 12px;
  font-weight: 600;
  opacity: 1;
}

table td.available {
  color: #2ecc71; /* Set the color to a blue shade */
  font-size: 18px; /* Set the icon size */
}

table td.reserved {
  color: #e74c3c; /* Set the color to a blue shade */
  font-size: 18px; /* Set the icon size */
}

table td .btn-reserve {
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

table td .btn-reserve:hover {
  background-color: #2980b9;
}
.details table::-webkit-scrollbar {
  width: 7px;
  background: var(--black);
  border-radius: 10px;
}

.details table::-webkit-scrollbar-thumb {
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

.details .cars table thead tr th:first-child {
  text-align: start;
}

.details .cars table thead tr th:nth-child(2) {
  text-align: start;
}

.details .cars table thead tr th:nth-child(3) {
  text-align: center;
}

.details .cars table thead tr th:last-child {
  text-align: center;
  margin-right: 10px;
}

.details .cars table tr td:first-child {
  text-align: start;
}

.details .cars table tr td:nth-child(2) {
  text-align: start;
}

.details .cars table tr td:nth-child(3) {
  text-align: center;
}

.details .cars table tr td:nth-child(4) {
  text-align: center;
}

.details .cars table tr td:nth-child(5) {
  text-align: center;
}

.details .cars table tr td:last-child {
  text-align: center;
}

.details .cars table tr .pass {
  -webkit-text-security: disc;
}

.details .cars table tr .pass:hover {
  -webkit-text-security: none;
}
</style>
