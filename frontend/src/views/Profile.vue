<template>
  <section>
    <ProfileSidebar />
    <div class="main-bar">
      <div class="main-bar-content">
        <div class="menu">
          <h2>Profile</h2>
          <p>Last updated: {{ user.updatedAt }}</p>
        </div>
        <div class="main-content">
          <h2>Active reservation:</h2>
          <div v-if="activeReservation">
            <p>
              Car: {{ activeReservation.cars.brand.BrandName }}
              {{ activeReservation.cars.model }}
            </p>
            <p>Start: {{ activeReservation.startTime }}</p>
            <p>Time: {{ activeReservation.duration }}</p>
            <p>
              Price:
              {{ activeReservation.bookedPrice }} €
            </p>
            <button @click="endReservation()" class="btn-end">
              End Reservation
            </button>
          </div>
          <div v-else>
            <p>
              You have no active reservation! Watch your
              <router-link to="/profile/history">history</router-link>.
            </p>
            <p>
              Want to
              <router-link to="/reservation">reserve</router-link> a car?
            </p>
          </div>
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
      activeReservation: null,
    };
  },
  mounted() {
    this.getActiveReservation();
  },
  methods: {
    async getActiveReservation() {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/bookings/get/active/${this.user.id}`
        );

        if (response.status === 200) {
          this.activeReservation = response.data;
          return new Promise((resolve) =>
            setTimeout(() => this.getActiveReservation(), 1000)
          );
        } else {
          console.error(
            "Failed to fetch active reservation - Status:",
            response.status
          );
        }
      } catch (error) {
        console.error("Error fetching active reservation:", error);
      }
    },
    async endReservation() {
      try {
        const response = await axios.put(
          `http://localhost:3000/api/bookings/end/${this.activeReservation.id}`
        );

        if (response.status === 200) {
          this.activeReservation = null;
          this.getActiveReservation();
        } else {
          console.error("Failed to end reservation - Status:", response.status);
        }
      } catch (error) {
        console.error("Error ending reservation:", error);
      }
    },
  },
  components: {
    ProfileSidebar,
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
  transform: translateY(-40%);
  margin: 0 auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.main-content h2 {
  margin-bottom: 10px;
  font-weight: bolder;
  color: #ffa31a; /* Added text color for h2 */
}

.main-content p {
  margin-bottom: 10px;
}

.main-content .btn-end {
  display: flex;
  background-color: #ffa31a;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  align-self: flex-end;
}

.main-content .btn-end:hover {
  background-color: #f49200;
}

.main-content a {
  color: #ffa31a;
}

.main-content a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .main-bar {
    width: 80%;
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
