<template>
  <div class="card card-body" v-if="bookingActive">
    <div class="card-text overflow-auto p-2">
      <div><strong>Car Information:</strong></div>
      <div>Model: {{ car ? car.brand : "" }} {{ car ? car.model : "" }}</div>
      <div>License Plate: {{ car ? car.registration : "" }}</div>
      <div>Rental cost: {{ car ? car.pricePerMinute : "" }} $</div>
      <hr />
      <div><strong>Booking Details:</strong></div>
      <div>Start Date/Time: {{ formattedStartTime }}</div>
      <div>Duration: {{ duration }}</div>
      <hr />
      <div><strong>Payment Information:</strong></div>
      <div>
        Total Price:
        {{ totalPrice }} €
      </div>
      <div>Payment Method: Credit Card</div>
      <hr />
      <div>
        <strong>Status: {{ reservation ? reservation.status : "" }}</strong>
      </div>
    </div>

    <div class="text-end text-center mt-3">
      <button
        class="btn btn-danger"
        data-bs-toggle="modal"
        data-bs-target="#addComment"
        @click="cancelBooking"
        :disabled="totalPrice <= 0.55"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        Cancel Booking
      </button>
    </div>
  </div>
  <div class="card-text text-center" v-else>
    <div v-if="balance < 0">
      <PaymentComponent />
    </div>
    <div v-else-if="balance == 0">
      <AddFundsComponent />
    </div>
    <div v-else>
      <router-link to="/reservation" class="btn btn-primary">
        Reserve a car
      </router-link>
    </div>
  </div>
  <CommentAboutCarComponent
    v-if="reservation"
    :carId="this.reservation.carId"
    :uId="this.reservation.uid"
  />
</template>

<script>
import { db, getCurrentUser } from "@/firebase/firebase";
import { ref, onValue } from "firebase/database";

import { showErrorToast, showSuccessToast } from "@/firebase/Toasts";
import PaymentComponent from "@/components/Payments/PaymentComponent.vue";
import AddFundsComponent from "@/components/Payments/AddFundsComponent.vue";
import CommentAboutCarComponent from "../Payments/CommentAboutCarComponent.vue";

import axios from "axios";

export default {
  name: "OngoingCarBooking",
  data() {
    return {
      reservation: null,
      car: null,
      duration: "",
      timer: null,
      totalPrice: 0,
      balance: 0,
      bookingActive: false,
    };
  },
  components: {
    PaymentComponent,
    AddFundsComponent,
    CommentAboutCarComponent,
  },
  computed: {
    formattedStartTime() {
      if (this.reservation && this.reservation.startTime) {
        const startTime = new Date(this.reservation.startTime);
        const formattedDate = `${startTime.getDate()}/${
          startTime.getMonth() + 1
        }/${startTime.getFullYear()}`;
        const formattedTime = `${startTime.getHours()}:${startTime.getMinutes()}:${startTime.getSeconds()}`;
        return `${formattedDate} ${formattedTime}`;
      }
      return "";
    },
  },
  methods: {
    async cancelBooking() {
      try {
        // Update the reservation status to "cancelled" and set the end time and total price
        await axios.put(
          // `http://localhost:8000/reservations/end/${this.reservation.id}`,
          `https://us-central1-car-hub-130b6.cloudfunctions.net/api/reservations/end/${this.reservation.id}`,
          {
            id: this.reservation.id,
            carId: this.reservation.carId,
            status: "Cancelled",
            endTime: new Date().toISOString(),
            totalPrice: this.totalPrice,
          }
        );

        showSuccessToast(
          "Booking cancelled successfully! The total price will be deducted from your balance."
        );
      } catch (error) {
        if (error.response && error.response.data) {
          showErrorToast(error.response.data.error);
        } else {
          showErrorToast("An error occurred while reserving the car");
        }
      }
    },
    updateDuration() {
      if (this.reservation && this.reservation.startTime) {
        const startTime = new Date(this.reservation.startTime);
        const endTime = new Date();
        const diff = endTime - startTime;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        this.duration = `${hours} hours, ${minutes} minutes, ${seconds} seconds`;

        // Calculate total duration in minutes
        const totalDurationInMinutes = hours * 60 + minutes + seconds / 60;

        // Update the total price
        if (this.car && this.car.pricePerMinute) {
          this.totalPrice = parseFloat(
            (totalDurationInMinutes * this.car.pricePerMinute).toFixed(2)
          );
        }
      }
    },
    async getReservation() {
      const currentUser = await getCurrentUser();
      const reservationsRef = ref(db, "reservations");

      onValue(reservationsRef, (snapshot) => {
        const reservationsObject = snapshot.val();
        if (!reservationsObject) {
          return;
        }
        const reservationsArray = Object.values(reservationsObject);
        const ongoingReservation = reservationsArray.find(
          (reservation) =>
            reservation.endTime === "" && reservation.uid === currentUser.id
        );

        if (ongoingReservation) {
          this.reservation = ongoingReservation;
          this.reservation.id = Object.keys(reservationsObject).find(
            (key) => reservationsObject[key] === ongoingReservation
          );

          // Get car data
          const carRef = ref(db, "cars/" + ongoingReservation.carId);
          onValue(carRef, (carSnapshot) => {
            this.car = carSnapshot.val();
          });

          // Start the timer to update the duration every second
          this.timer = setInterval(this.updateDuration, 1000);

          this.bookingActive = true;
        } else {
          this.bookingActive = false;
        }
      });
    },
    async getUserBalance() {
      const user = await getCurrentUser();
      const userRef = ref(db, `users/${user.id}`);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        this.balance = data.balance;
      });
    },
  },
  created() {
    this.getReservation();
    this.getUserBalance();
  },
  beforeUnmount() {
    clearInterval(this.timer);
  },
};
</script>

<style scoped>
.card-text {
  max-height: 410px;
}

@media (max-width: 768px) {
  .card-text {
    max-height: 256px;
  }
}
</style>
