<template>
  <section>
    <ProfileSidebar />
    <div class="main-bar">
      <div class="main-bar-content">
        <div class="menu">
          <h2>History</h2>
          <p>Last updated: {{ user.updatedAt }}</p>
        </div>
        <div class="reservation-history">
          <table>
            <thead>
              <tr>
                <th>Car</th>
                <th>Start</th>
                <th>End</th>
                <th>Duration</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody class="table-container">
              <tr v-for="booking in bookings" :key="booking.id">
                <td>
                  {{ booking.cars.brand.BrandName }} {{ booking.cars.model }}
                </td>
                <td>{{ booking.startTime }}</td>
                <td v-if="booking.startTime === booking.endTime">Active!</td>
                <td v-else>{{ booking.endTime }}</td>
                <td>{{ booking.duration }}</td>
                <td>{{ booking.bookedPrice }}$</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import ProfileSidebar from "@/components/ProfileSidebar.vue";

export default {
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
      bookings: [],
    };
  },
  mounted() {
    this.getBookings();
  },
  components: { ProfileSidebar },
  methods: {
    async getBookings() {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/bookings/get/${this.user.id}`
        );

        if (response.status === 200) {
          this.bookings = response.data;
          return new Promise((resolve) =>
            setTimeout(() => this.getBookings(), 1000)
          );
        } else {
          console.error("Failed to fetch bookings - Status:", response.status);
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
.main-bar {
  display: flex;
  flex-direction: column;
  width: 40%;
  min-height: 34vh;
  background-color: #292929;
  color: #ffffff;
  border-radius: 15px;
  margin-left: 3%;
}

.main-bar-content {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-left: 45px;
  margin-right: 45px;
}

.main-bar-content .menu {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.main-bar-content .menu h2 {
  padding-left: 15px;
  border-left: 5px solid #ffa31a;
  color: #ffa31a;
}

.main-bar-content .menu p {
  right: 0px;
  margin: auto 0px auto auto;
  color: #666666;
  font-weight: 600;
  font-size: small;
}

.main-bar-content .main-content {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.reservation-history {
  width: 100%;
  max-height: 400px;
}

table thead,
tr {
  display: table;
  width: 100%;
  table-layout: fixed;
}

table tbody {
  max-height: 300px;
  overflow-y: auto;
  display: block;
}

table thead th:nth-child(1) {
  text-align: start;
}

table thead th:nth-child(2) {
  text-align: center;
}

table thead th:nth-child(3) {
  text-align: center;
}

table thead th:nth-child(4) {
  text-align: center;
}

table thead th:nth-child(5) {
  text-align: center;
}

table tbody td:nth-child(1) {
  text-align: start;
}

table tbody td:nth-child(2) {
  text-align: center;
}

table tbody td:nth-child(3) {
  text-align: center;
}

table tbody td:nth-child(4) {
  text-align: center;
}

table tbody td:nth-child(5) {
  text-align: center;
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

th,
td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #666666;
}

tbody tr:hover {
  background-color: #444444;
}

td {
  color: #ffffff;
}

@media (max-width: 768px) {
  .main-bar {
    width: 80%;
    min-height: auto;
  }
  .side-bar-left {
    width: 15%;
    min-height: auto;
    margin-bottom: 20px;
  }

  .side-bar-links p.text {
    display: none !important;
    width: 0 !important;
  }
  .side-bar-username img {
    display: none;
  }

  .side-bar-username h3 {
    margin-top: 20px;
  }
}
</style>
