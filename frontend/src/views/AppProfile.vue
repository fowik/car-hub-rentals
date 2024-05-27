<template>
  <div class="d-flex justify-content-center p-4">
    <div class="container text-center mt-3" style="--bs-gap: 0.25rem 1rem">
      <div class="row" v-if="userData.isVerified">
        <div class="col-xs-4 col-md-4">
          <ProfileSideBarComponent :userData="userData" />
        </div>
        <div class="col-xs-8 col-md-8 mb-3">
          <EditProfileComponent :userData="userData" />
          <BookingHistoryComponent />
        </div>
      </div>
      <div v-else>
        <h1 class="text-center">Please verify your email address</h1>
        <p class="text-center">
          We have sent you a verification link to your email address. Please
          check your email and click on the link to verify your email address.
          Click
          <button class="btn btn-link p-0" @click="sendVerificationLink">
            here
          </button>
          to resend the link.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileSideBarComponent from "@/components/ProfileComponents/ProfileSideBarComponent.vue";
import EditProfileComponent from "@/components/ProfileComponents/EditProfileComponent.vue";
import BookingHistoryComponent from "@/components/ProfileComponents/BookingHistoryComponent";

import {
  showErrorToast,
  showSuccessToast,
  showInfoToast,
} from "@/firebase/Toasts";

import { getCurrentUser } from "@/firebase/firebase.js";
import axios from "axios";

export default {
  name: "AppProfile",
  components: {
    ProfileSideBarComponent,
    EditProfileComponent,
    BookingHistoryComponent,
  },
  data() {
    return {
      isRegistered: false,
      userData: [],
    };
  },
  async mounted() {
    const userData = await getCurrentUser();
    if (userData) {
      this.userData = userData;
    } else {
      showErrorToast("Error getting user data");
    }

    if (this.$route.query.loggedIn) {
      showSuccessToast("You're logged in!!");
      setTimeout(() => {
        this.$router.push({ path: this.$route.path, query: {} });
      }, 4000);
    }

    if (this.$route.query.registered) {
      showSuccessToast("You're registered successfully!!");
      setTimeout(() => {
        this.$router.push({ path: this.$route.path, query: {} });
      }, 4000);
    }

    if (this.$route.query.verifyEmail) {
      showInfoToast("Please verify your email address!!");
      setTimeout(() => {
        this.$router.push({ path: this.$route.path, query: {} });
      }, 5000);
    }

    if (this.$route.query.alreadyLoggedIn) {
      showInfoToast("You're already logged in!!");
      setTimeout(() => {
        this.$router.push({ path: this.$route.path, query: {} });
      }, 5000);
    }

    if (this.$route.query.isAdmin) {
      showErrorToast("You're not authorized to access this page!!");
      setTimeout(() => {
        this.$router.push({ path: this.$route.path, query: {} });
      }, 4000);
    }

    if (this.$route.query.success) {
      const amount = this.$route.query.amount;
      const moneyAdded = this.$route.query.moneyAdded;
      console.log(amount, moneyAdded);
      showSuccessToast(`Payment successful!! Amount: ${amount}$`);
      this.updateUserBalance(amount, moneyAdded);
      setTimeout(() => {
        this.$router.push({ path: this.$route.path, query: {} });
      }, 4000);
    }
    if (this.$route.query.cancelled) {
      showInfoToast("Your payment was cancelled!!");
      setTimeout(() => {
        this.$router.push({ path: this.$route.path, query: {} });
      }, 6000);
    }
  },
  methods: {
    async sendVerificationLink() {
      try {
        showSuccessToast("Verification link sent successfully!!");
      } catch (error) {
        showErrorToast("Error sending verification link!!");
      }
    },
    async updateUserBalance(amount, moneyAdded) {
      const userData = await getCurrentUser();

      if (userData) {
        const response = await axios.put(
          // `http://localhost:8000/payments/update-balance`,
          `https://us-central1-car-hub-130b6.cloudfunctions.net/api/payments/update-balance`,
          {
            uid: userData.id,
            balance: amount,
            moneyAdded: moneyAdded,
          }
        );

        if (response.status === 200) {
          showSuccessToast(
            "User balance updated successfully! Amount: " + amount + "$"
          );
        } else {
          showErrorToast("Error updating user balance");
        }
      } else {
        showErrorToast("Error getting user data");
      }
    },
  },
};
</script>

<style scoped></style>
