<template>
  <div
    class="modal fade"
    id="ReserveModalToggle"
    aria-hidden="true"
    aria-labelledby="ReserveModalToggleLabel"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="ReserveModalToggleLabel">
            Reserve Car
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-6 text-start">
              <h3>{{ car.brand }} {{ car.model }}</h3>
              <p>Price: {{ car.pricePerMinute }} €</p>
              <p>License plate: {{ car.registration }}</p>
            </div>
            <div class="col-6 d-flex align-items-center justify-content-center">
              <img
                :src="car.imageUrl"
                alt=""
                class="img-fluid"
                style="max-height: 200px"
              />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="submit" class="btn btn-primary" @click="reserveCar">
            Reserve car for {{ car.pricePerMinute }} € per minute.
          </button>
        </div>
        <SpinnerComponent :isLoading="isLoading" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import $ from "jquery";
import router from "@/router";
import { getCurrentUser, db } from "@/firebase/firebase";
import { ref, get } from "firebase/database";
import { showErrorToast } from "@/firebase/Toasts";

import SpinnerComponent from "../Spinner/SpinnerComponent.vue";

export default {
  name: "ReservationModal",
  data() {
    return {
      car: [],
      isLoading: false,
    };
  },
  components: {
    SpinnerComponent,
  },
  props: {
    carId: String,
  },
  watch: {
    carId: {
      immediate: true,
      handler() {
        this.getCarById();
      },
    },
  },

  methods: {
    async reserveCar() {
      this.isLoading = true;
      const currentUser = await getCurrentUser();

      this.checkLicense();

      // check users balance from realtime database
      const userRef = ref(db, `users/${currentUser.id}`);
      const userSnapshot = await get(userRef);
      const userData = userSnapshot.val();

      if (userData.balance < 0.01) {
        showErrorToast("You don't have enough funds to reserve this car");
        this.isLoading = false;
        return;
      }

      try {
        await axios.post(
          // "http://localhost:8000/reservations/create",
          "https://us-central1-car-hub-130b6.cloudfunctions.net/api/reservations/create",
          {
            carId: this.car.id,
            uid: currentUser.id,
            price: this.car.pricePerMinute,
          }
        );

        $("#ReserveModalToggle").hide();
        $(".modal-backdrop").remove();
        $(".modal-open").css("padding-right", "0px");
        $("body").css("overflow", "auto");

        this.isLoading = false;

        router.push("/profile");
      } catch (error) {
        if (error.response && error.response.data) {
          // Show error message from server
          showErrorToast(error.response.data.error);
          this.isLoading = false;
        } else {
          // Show generic error message
          showErrorToast("An error occurred while reserving the car");
          this.isLoading = false;
        }
        console.error(error);
      }
    },
    async checkLicense() {
      const user = await getCurrentUser();
      const licenseRef = ref(db, "licenses");
      const licenseSnapshot = await get(licenseRef);
      const licenseData = licenseSnapshot.val();

      // Check if there is any license with the uid matching the current user's ID
      let userHasLicense = false;
      if (licenseData) {
        for (const licenseId in licenseData) {
          if (licenseData[licenseId].uid === user.uid) {
            userHasLicense = true;
            this.data = licenseData[licenseId]; // Set the data to display the license information
            break;
          }
        }
      }

      if (userHasLicense) {
        this.uploaded = true;
      } else {
        this.uploaded = false;
      }
    },
    async getCarById() {
      this.isLoading = true;
      if (!this.carId) {
        return;
      }
      try {
        const response = await axios.get(
          `https://us-central1-car-hub-130b6.cloudfunctions.net/api/cars/${this.carId}`
        );
        this.car = response.data;
        this.car.id = this.carId;
      } catch (error) {
        console.error(error);
      }
      this.isLoading = false;
    },
  },
};
</script>
