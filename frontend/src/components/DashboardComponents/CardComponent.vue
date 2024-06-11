<template>
  <div class="d-flex justify-content-center bg-dark">
    <div
      class="container row border rounded align-items-center mw-100 overflow-y-auto"
    >
      <div class="col">
        <div
          class="card text-bg-dark m-3 mx-auto"
          style="min-width: 10rem; max-width: 16rem"
        >
          <div class="card-header text-start">New users</div>
          <div class="card-body text-start d-flex">
            <fa icon="user" class="fs-1" />
            <h2 class="ps-3">{{ dailyViews }}</h2>
          </div>
        </div>
      </div>
      <div class="col">
        <div
          class="card text-bg-dark m-3 mx-auto"
          style="min-width: 10rem; max-width: 16rem"
        >
          <div class="card-header text-start">Comments</div>
          <div class="card-body text-start d-flex">
            <fa icon="message" class="fs-1" />
            <h2 class="ps-3">{{ comments }}</h2>
          </div>
        </div>
      </div>
      <div class="col">
        <div
          class="card text-bg-dark m-3 mx-auto"
          style="min-width: 10rem; max-width: 16rem"
        >
          <div class="card-header text-start">Rents</div>
          <div class="card-body text-start d-flex">
            <fa icon="shopping-basket" class="fs-1" />
            <h2 class="ps-3">{{ rents }}</h2>
          </div>
        </div>
      </div>
      <div class="col">
        <div
          class="card text-bg-dark m-3 mx-auto"
          style="min-width: 10rem; max-width: 16rem"
        >
          <div class="card-header text-start">Earnings</div>
          <div class="card-body text-start d-flex">
            <fa icon="credit-card" class="fs-1" />
            <h2 class="ps-3">{{ earnings }} €</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "@/firebase/firebase";
import { onValue, ref } from "firebase/database";

export default {
  name: "CardComponent",
  data() {
    return {
      earnings: 0,
      rents: 0,
      comments: 0,
      dailyViews: 0,
    };
  },
  mounted() {
    this.fetchEarnings();
    this.fetchRents();
    this.fetchComments();
    this.fetchTodaysNewUsers();
  },
  methods: {
    async fetchEarnings() {
      const reservationsRef = ref(db, "reservations");
      onValue(reservationsRef, (snapshot) => {
        const data = snapshot.val();
        let total = 0;
        for (const key in data) {
          if (data[key].status === "Paid") {
            total += data[key].totalPrice;
            total = parseFloat(total.toFixed(2));
          }
        }

        this.earnings = total;
      });
    },
    async fetchRents() {
      // fetch rents for the current month
      const reservationsRef = ref(db, "reservations");
      const date = new Date();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      onValue(reservationsRef, (snapshot) => {
        const data = snapshot.val();
        let total = 0;
        for (const key in data) {
          const reservation = data[key];
          const reservationDate = new Date(reservation.startTime);
          const reservationMonth = reservationDate.getMonth() + 1;
          const reservationYear = reservationDate.getFullYear();
          if (reservationMonth === month && reservationYear === year) {
            total++;
          }
        }
        this.rents = total;
      });
    },
    async fetchComments() {
      // fetch comments that are Active
      const commentsRef = ref(db, "messages");
      onValue(commentsRef, (snapshot) => {
        const data = snapshot.val();
        let total = 0;
        for (const key in data) {
          if (data[key].status === "Active") {
            total++;
          }
        }
        this.comments = total;
      });
    },
    async fetchTodaysNewUsers() {
      // fetch todays new users
      const usersRef = ref(db, "users");
      const date = new Date();
      const today = date.toISOString().split("T")[0];

      onValue(usersRef, (snapshot) => {
        const data = snapshot.val();
        let total = 0;
        for (const key in data) {
          const user = data[key];
          if (user.registrationDate.split("T")[0] === today) {
            total++;
          }
        }
        this.todaysNewUsers = total;
      });
    },
  },
};
</script>

<style scoped>
.container {
  height: 180px;
}

::-webkit-scrollbar {
  width: 4px;
  background: #212529;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
