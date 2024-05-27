<template>
  <button class="btn btn-success" @click="submit">
    Pay now {{ totalPrice }}$
  </button>
</template>

<script>
import axios from "axios";
import { db, getCurrentUser } from "@/firebase/firebase";
import { ref, onValue, get } from "firebase/database";

export default {
  name: "PaymentComponent",
  data() {
    return {
      reservations: [],
      totalPrice: 0,
      moneyAdded: false,
    };
  },
  mounted() {
    this.getCancelledUserReservations();
  },
  methods: {
    async getCancelledUserReservations() {
      try {
        // Get user ID
        const user = await getCurrentUser();

        const userRef = ref(db, `users/${user.id}`);
        const userSnapshot = await get(userRef);
        const userData = userSnapshot.val();

        console.log(userData.balance);

        if (userData.balance < 0) {
          this.totalPrice = Math.abs(parseFloat(userData.balance).toFixed(2));
          if (this.totalPrice < 0.5) {
            this.totalPrice += 0.5;
            this.moneyAdded = true;
          }
          return;
        } else {
          // Get all reservations that have been cancelled by this user from Realtime Database
          const reservationsRef = ref(db, "reservations");

          onValue(reservationsRef, async (snapshot) => {
            const data = snapshot.val();
            const reservations = [];

            // Fetch car information for each reservation
            for (let key in data) {
              if (data[key].uid === user.id && data[key].status === "Paid") {
                const carId = data[key].carId;
                const carRef = ref(db, `cars/${carId}`);
                const carSnapshot = await get(carRef);
                const carData = carSnapshot.val();

                // Merge reservation data with car information
                const reservationWithCar = {
                  ...data[key],
                  car: carData,
                  id: key,
                };
                reservations.push(reservationWithCar);
              }
            }

            this.reservations = reservations;
            console.log(this.reservations);
            this.calculateTotalPrice();
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
    calculateTotalPrice() {
      this.totalPrice = this.reservations.reduce(
        (total, reservation) => total + reservation.totalPrice,
        0
      );
    },
    async submit() {
      try {
        const user = await getCurrentUser();

        const response = await axios.post(
          // "http://localhost:8000/payments/create-checkout-session",
          "https://us-central1-car-hub-130b6.cloudfunctions.net/api/payments/create-checkout-session",
          {
            addFunds: {
              uid: user.id,
              amount: this.totalPrice,
              moneyAdded: this.moneyAdded,
            },
          }
        );
        console.log(response.data.url);
        window.location.href = response.data.url;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
