<template>
  <div class="container border rounded mt-4 m-0 overflow-auto bg-dark">
    <div class="text-start">
      <h2 class="m-2">Recent Rents</h2>
    </div>
    <div class="tableFixHead">
      <table class="table table-hover">
        <thead class="position-sticky">
          <tr>
            <th scope="col" class="text-start" v-on:click="sort('fullName')">
              Full Name
              <fa
                v-if="sortKey === 'fullName' && sortOrders['fullName'] === 1"
                icon="caret-up"
                class="ms-2"
              />
              <fa
                v-else-if="
                  sortKey === 'fullName' && sortOrders['fullName'] === -1
                "
                icon="caret-down"
                class="ms-2"
              />
              <fa v-else icon="caret-up" class="ms-2" />
            </th>
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
            <th scope="col" v-on:click="sort('rentalCost')">
              <span>Rental Cost</span>
              <fa
                v-if="
                  sortKey === 'rentalCost' && sortOrders['rentalCost'] === 1
                "
                icon="caret-up"
                class="ms-2"
              />
              <fa
                v-else-if="
                  sortKey === 'rentalCost' && sortOrders['rentalCost'] === -1
                "
                icon="caret-down"
                class="ms-2"
              />
              <fa v-else icon="caret-up" class="ms-2" />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(rent, index) in displayedRents" :key="index">
            <td class="p-3 text-start">{{ rent.displayName }}</td>
            <td class="p-3" v-if="!rent.isDeleted">{{ rent.carModel }}</td>
            <td class="p-3 text-danger fw-bold" v-else>
              {{ rent.carModel }} (Deleted)
            </td>
            <td class="p-3">{{ rent.registration }}</td>
            <td class="p-3">{{ rent.duration }}</td>
            <td class="p-3">{{ rent.totalPrice }} €</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { db } from "@/firebase/firebase";
import {
  query,
  ref,
  onValue,
  orderByChild,
  limitToLast,
} from "firebase/database";

export default {
  name: "RecentRentsComponent",
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
        time: 1,
      },
    };
  },
  mounted() {
    this.getRecentRents();
  },
  computed: {
    displayedRents() {
      return this.recentRents;
    },
  },
  methods: {
    async getRecentRents() {
      const rentsRef = ref(db, "reservations");
      const rentsQuery = query(
        rentsRef,
        orderByChild("startTime"),
        limitToLast(10)
      );

      onValue(rentsQuery, async (snapshot) => {
        const rents = snapshot.val();
        const rentsArray = [];
        const carPromises = [];
        const userPromises = [];

        for (const key in rents) {
          const rent = rents[key];
          rent.key = key;
          // Fetch car details from 'cars' collection using the 'carId' from the rent object
          const carPromise = new Promise((resolve, reject) => {
            const carRef = ref(db, `cars/${rent.carId}`);
            onValue(
              carRef,
              (carSnapshot) => {
                if (carSnapshot.exists()) {
                  const car = carSnapshot.val();
                  rent.carModel = car.brand + " " + car.model;
                  rent.isDeleted = car.isDeleted;
                  rent.registration = car.registration;
                  resolve(); // Разрешаем промис, если данные найдены
                } else {
                  reject(new Error("Car data not found")); // Отклоняем промис в случае отсутствия данных
                }
              },
              (error) => {
                reject(error); // Отклоняем промис в случае ошибки при получении данных
              }
            );
          });
          carPromises.push(carPromise);

          // Fetch user details from 'users' collection using the 'userId' from the rent object

          const userPromise = new Promise((resolve, reject) => {
            const userRef = ref(db, `users/${rent.uid}`);
            onValue(
              userRef,
              (userSnapshot) => {
                if (userSnapshot.exists()) {
                  const user = userSnapshot.val();
                  rent.displayName = user.displayName;
                  resolve();
                } else {
                  reject(new Error("User data not found"));
                }
              },
              (error) => {
                reject(error);
              }
            );
          });

          userPromises.push(userPromise);

          // Calculate rentalCost
          if (rent.endTime !== "") {
            const startTime = new Date(rent.startTime);

            const endTime = new Date(rent.endTime);
            const diff = endTime - startTime;

            const hours = Math.floor(diff / (1000 * 60 * 60));

            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            rent.duration = `${hours} hours, ${minutes} minutes, ${seconds} seconds`;

            // Calculate total duration in minutes
            const totalDurationInMinutes = hours * 60 + minutes + seconds / 60;

            // Update the total price
            if (rent.price) {
              rent.totalPrice = parseFloat(
                (totalDurationInMinutes * rent.price).toFixed(2)
              );
            }
          } else {
            setInterval(() => {
              this.updateDurationAndTotalPrice();
            }, 1000);
          }

          rentsArray.push(rent);
        }
        await Promise.all([...carPromises, ...userPromises]);

        this.recentRents = rentsArray;

        // Sort the rents after adding car details
        this.sort(this.sortKey);
      });

      // Update duration and total price every second
    },
    sort(key) {
      this.sortKey = key;
      this.sortOrders[key] = this.sortOrders[key] * -1;

      this.recentRents.sort((a, b) => {
        let compareA = a[key];
        let compareB = b[key];

        // Check if the properties exist before comparing
        if (compareA === undefined || compareB === undefined) {
          return 0;
        }

        // Convert to number if it's a numeric string
        if (!isNaN(compareA) && !isNaN(compareB)) {
          return (compareA - compareB) * this.sortOrders[key];
        }

        // Use localeCompare for non-numeric strings
        return compareA.localeCompare(compareB) * this.sortOrders[key];
      });
    },
    updateDurationAndTotalPrice() {
      // Обновляем продолжительность и общую стоимость для каждой аренды
      this.recentRents.forEach((rent) => {
        if (rent.endTime === "") {
          const currentDateTime = new Date();
          const startTime = new Date(rent.startTime);
          const diff = currentDateTime - startTime;
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);

          rent.duration = `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
          // calculate total price
          if (rent.price) {
            const totalDurationInMinutes = hours * 60 + minutes + seconds / 60;
            rent.totalPrice = parseFloat(
              (totalDurationInMinutes * rent.price).toFixed(2)
            );
          }
        }
      });
    },
  },
  beforeUnmount() {
    clearInterval(this.timer);
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
