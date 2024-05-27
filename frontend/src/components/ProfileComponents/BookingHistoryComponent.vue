<template>
  <div class="border rounded bg-body-tertiary p-3 mt-4">
    <h5 class="d-flex text-start mb-3">Booking History</h5>
    <div class="tableFixHead mb-0 rounded">
      <table class="table table-hover">
        <thead class="position-sticky">
          <tr>
            <th scope="col" v-on:click="sort('carModel')">
              Car Model
              <fa
                v-if="sortKey === 'carModel' && sortOrders['carModel'] === 1"
                icon="caret-up"
                class="ms-2"
              />
              <fa
                v-else-if="
                  sortKey === 'carModel' && sortOrders['carModel'] === -1
                "
                icon="caret-down"
                class="ms-2"
              />
              <fa v-else icon="caret-up" class="ms-2" />
            </th>
            <th scope="col" v-on:click="sort('licensePlate')">
              License Plate
              <fa
                v-if="
                  sortKey === 'licensePlate' && sortOrders['licensePlate'] === 1
                "
                icon="caret-up"
                class="ms-2"
              />
              <fa
                v-else-if="
                  sortKey === 'licensePlate' &&
                  sortOrders['licensePlate'] === -1
                "
                icon="caret-down"
                class="ms-2"
              />
              <fa v-else icon="caret-up" class="ms-2" />
            </th>
            <th scope="col" v-on:click="sort('rentalDuration')">
              Rental Duration
              <fa
                v-if="
                  sortKey === 'rentalDuration' &&
                  sortOrders['rentalDuration'] === 1
                "
                icon="caret-up"
                class="ms-2"
              />
              <fa
                v-else-if="
                  sortKey === 'rentalDuration' &&
                  sortOrders['rentalDuration'] === -1
                "
                icon="caret-down"
                class="ms-2"
              />
              <fa v-else icon="caret-up" class="ms-2" />
            </th>
            <th scope="col" v-on:click="sort('totalPrice')">
              <span>Rental Cost</span>
              <fa
                v-if="
                  sortKey === 'totalPrice' && sortOrders['totalPrice'] === 1
                "
                icon="caret-up"
                class="ms-2"
              />
              <fa
                v-else-if="
                  sortKey === 'totalPrice' && sortOrders['totalPrice'] === -1
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
                v-else-if="sortKey === 'date' && sortOrders['date'] === -1"
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
                v-else-if="sortKey === 'status' && sortOrders['status'] === -1"
                icon="caret-down"
                class="ms-2"
              />
              <fa v-else icon="caret-up" class="ms-2" />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(rent, index) in displayedRents" :key="index">
            <td class="p-3 text-start">{{ rent.carModel }}</td>
            <td class="p-3">{{ rent.licensePlate }}</td>
            <td class="p-3">{{ rent.rentalDuration }}</td>
            <td class="p-3">{{ rent.totalPrice }}€</td>
            <td class="p-3">{{ rent.startTime }}</td>
            <td class="p-3">{{ rent.status }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { db } from "@/firebase/firebase";
import { ref, onValue } from "firebase/database";
import { getCurrentUser } from "@/firebase/firebase";

export default {
  data() {
    return {
      recentRents: [],
      sortKey: "",
      sortOrders: {
        fullName: 1,
        carModel: 1,
        licensePlate: 1,
        rentalDuration: 1,
        rentalCost: 1,
        date: 1,
      },
      userVerified: null,
    };
  },
  props: {
    isVerified: Function,
  },
  computed: {
    displayedRents() {
      return this.recentRents;
    },
  },
  async mounted() {
    const user = await getCurrentUser();

    // Получаем данные о бронированиях текущего пользователя
    const reservationRef = ref(db, "reservations");
    onValue(reservationRef, (reservationSnapshot) => {
      const reservationData = reservationSnapshot.val();
      const rents = [];

      for (let key in reservationData) {
        if (reservationData[key].uid === user.id) {
          rents.push(reservationData[key]);
        }
      }

      const carsRef = ref(db, "cars");
      onValue(carsRef, (carSnapshot) => {
        const carData = carSnapshot.val();

        rents.forEach((rent) => {
          if (carData[rent.carId]) {
            rent.carModel =
              carData[rent.carId].brand + " " + carData[rent.carId].model;
            rent.licensePlate = carData[rent.carId].registration;
            // Преобразовываем дату в формат YYYY/MM/DD
            const startTime = new Date(rent.startTime);
            const endTime = new Date(rent.endTime);
            rent.endTime = endTime.toLocaleString();
            rent.startTime = startTime.toLocaleString();
            // Вычисляем продолжительность аренды
            const durationMs = endTime - startTime;
            const durationHours = Math.floor(durationMs / (1000 * 60 * 60));
            const durationMinutes = Math.floor(
              (durationMs % (1000 * 60 * 60)) / (1000 * 60)
            );
            const durationSeconds = Math.floor(
              (durationMs % (1000 * 60)) / 1000
            );
            if (!isNaN(durationMs)) {
              rent.rentalDuration = `${durationHours} hours ${durationMinutes} minutes ${durationSeconds} seconds`;
            } else {
              rent.rentalDuration = "-";
              rent.totalPrice = "- ";
            }
          }
        });

        this.recentRents = rents;
      });
    });
  },
  methods: {
    sort(key) {
      if (this.sortKey === key) {
        this.sortOrders[key] = -this.sortOrders[key];
      } else {
        this.sortKey = key;
        this.sortOrders[key] = 1;
      }

      this.recentRents.sort((a, b) => {
        const modifier = this.sortOrders[key];
        if (key === "rentalCost" || key === "rentalDuration") {
          return modifier * (parseFloat(a[key]) - parseFloat(b[key]));
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
  overflow-y: auto; /* make the table scrollable if height is more than 200 px  */
  overflow-x: auto;
  height: 330px; /* gives an initial height of 200px to the table */
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

@media (min-width: 1400px) {
  .container {
    max-width: 100% !important;
  }
}
</style>
