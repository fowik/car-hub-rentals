<template>
  <div
    class="modal fade"
    id="AddModalToggle"
    aria-hidden="true"
    aria-labelledby="AddModalToggleLabel"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="AddModalToggleLabel">Add car</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="addCar">
            <!-- Registration Number -->
            <div class="mb-3 text-start">
              <label for="registrationNumber" class="col-form-label"
                >License Plate</label
              >
              <div class="input-group">
                <div class="form-floating">
                  <input
                    type="text"
                    class="form-control"
                    id="registrationLetters"
                    placeholder="registration Letters"
                    v-model="registrationLetters"
                  />
                  <label for="registrationNumber">Registration Letters</label>
                </div>
                <div class="form-floating">
                  <input
                    type="number"
                    class="form-control"
                    id="registrationNumber"
                    placeholder="Registration Number"
                    v-model="registrationNumbers"
                  />
                  <label for="registrationNumber">Registration Numbers</label>
                </div>
              </div>
            </div>
            <!-- Brand & Model -->
            <div class="mb-3 text-start">
              <label for="brandModel" class="col-form-label"
                >Brand & Model</label
              >
              <div class="input-group">
                <select class="form-select" id="brandSelect" v-model="brand">
                  <option :value="''" disabled>Brand</option>
                  <option v-for="brand in brands" :key="brand" :value="brand">
                    {{ brand.name }}
                  </option>
                </select>
                <div class="form-floating">
                  <input
                    type="text"
                    class="form-control"
                    id="modelInput"
                    placeholder="Model"
                    v-model="model"
                  />
                  <label for="modelInput">Model</label>
                </div>
              </div>
            </div>
            <!-- Year, Type, & Capacity -->
            <div class="mb-3 text-start">
              <label for="yearTypeCapacity" class="col-form-label"
                >Year & Type & Capacity</label
              >
              <div class="input-group">
                <div class="form-floating">
                  <input
                    type="text"
                    class="form-control"
                    id="yearInput"
                    placeholder="Year"
                    v-model="year"
                  />
                  <label for="yearInput">Year</label>
                </div>
                <select class="form-select" id="typeSelect" v-model="type">
                  <option :value="''" disabled>Type</option>
                  <option v-for="type in types" :key="type" :value="type">
                    {{ type.name }}
                  </option>
                </select>
                <span class="input-group-text">Capacity:</span>
                <input
                  type="number"
                  min="1.8"
                  step="0.1"
                  value="1.8"
                  id="capacityInput"
                  class="form-control"
                  placeholder="Capacity"
                  v-model="capacity"
                />
              </div>
            </div>
            <!-- Price per Minute -->
            <div class="mb-3 text-start">
              <label for="pricePerMinute" class="col-form-label"
                >Price per Minute</label
              >
              <div class="form-group input-group">
                <span class="input-group-text">EUR</span>
                <input
                  type="number"
                  min="0.00"
                  step="0.01"
                  value="1.00"
                  id="priceInput"
                  class="form-control"
                  placeholder="Price"
                  v-model="pricePerMinute"
                />
              </div>
            </div>
            <!-- Car coordinates -->

            <div class="mb-3 text-start">
              <label for="carMap" class="col-form-label">Car location</label>
              <CarMap @update:carPosition="handleCarPositionUpdate" />
            </div>

            <div class="mb-3 text-start">
              <label for="uploadImage" class="col-form-label text-start"
                >Upload image</label
              >
              <div class="input-group">
                <input
                  type="file"
                  class="form-control"
                  id="uploadImage"
                  @change="handleFileInputChange"
                />
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="submit" class="btn btn-primary" @click="addCar">
            Add car
          </button>
        </div>
        <SpinnerComponent :isLoading="isLoading" />
      </div>
    </div>
  </div>
  <button
    class="btn btn-success mt-3 mb-3"
    data-bs-target="#AddModalToggle"
    data-bs-toggle="modal"
  >
    Add car
  </button>
</template>

<script>
import axios from "axios";
import {
  showErrorToast,
  showInfoToast,
  showSuccessToast,
} from "@/firebase/Toasts";
import { db } from "@/firebase/firebase";
import { ref, onValue, get } from "firebase/database";
import CarMap from "@/components/Map/CarMap.vue";
import $ from "jquery";

import {
  getStorage,
  ref as Ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import SpinnerComponent from "../Spinner/SpinnerComponent.vue";

export default {
  name: "ModalAddCarComponent",
  data() {
    return {
      registrationLetters: "",
      registrationNumbers: "",
      brand: "",
      model: "",
      year: "",
      type: "",
      capacity: "",
      pricePerMinute: 0.1,
      carLatitude: null,
      carLongitude: null,
      image: null,
      types: [],
      brands: [],
      isLoading: false,
    };
  },
  components: {
    CarMap,
    SpinnerComponent,
  },
  created() {
    this.getTypes();
    this.getBrands();
  },
  methods: {
    async addCar() {
      this.isLoading = true;
      if (!this.checkInputs()) {
        this.isLoading = false;
        return;
      }

      const registration = `${this.registrationLetters}-${this.registrationNumbers}`;

      const carRef = ref(db, `cars`);
      const snapshot = await get(carRef);

      //foreach car check if same registration exists
      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
        if (childData.registration === registration) {
          showErrorToast("Car with this registration already exists.");
          return;
        }
      });

      const data = {
        registration: registration,
        brand: this.brand.name,
        model: this.model,
        year: this.year,
        type: this.type.name,
        capacity: this.capacity,
        pricePerMinute: this.pricePerMinute,
        carLatitude: this.carLatitude,
        carLongitude: this.carLongitude,
      };

      try {
        const response = await axios.post(
          "https://us-central1-car-hub-130b6.cloudfunctions.net/api/cars/create",
          // "http://localhost:8000/cars/create",
          data
        );

        // Extract carId from the response data
        const carId = response.data;

        console.log("Car ID:", carId);

        if (response.status !== 201) {
          showErrorToast("Error adding car.");
          throw new Error("Error adding car.");
        } else {
          // Assuming you need to do something with carId here
          const imageUrl = await this.uploadFile(carId);

          console.log("Image URL:", imageUrl);

          await axios.put(
            `https://us-central1-car-hub-130b6.cloudfunctions.net/api/cars/update-image/${carId}`,
            // `http://localhost:8000/cars/update-image/${carId}`,
            {
              imageUrl,
            }
          );

          this.clearForm();
          $("#AddModalToggle").hide();
          $(".modal-backdrop").remove();
          this.isLoading = false;
          showSuccessToast("Car added successfully.");
        }
      } catch (error) {
        console.error("Error:", error);
        showErrorToast("Error adding car.");
        this.isLoading = false;
      }
    },
    async getTypes() {
      try {
        const dbRef = ref(db, "types");

        onValue(dbRef, (snapshot) => {
          const typesObject = snapshot.val();
          if (typesObject) {
            const typesArray = Object.keys(typesObject).map(
              (key) => typesObject[key]
            );
            this.types = typesArray;
          } else {
            this.isLoading = true;
          }
        });
      } catch (error) {
        console.error("Request failed:", error);
      }
    },
    async getBrands() {
      try {
        const dbRef = ref(db, "brands");

        onValue(dbRef, (snapshot) => {
          const brandsObject = snapshot.val();
          if (brandsObject) {
            const brandsArray = Object.keys(brandsObject).map(
              (key) => brandsObject[key]
            );
            this.brands = brandsArray;
          } else {
            this.isLoading = true;
          }
        });
      } catch (error) {
        console.error("Request failed:", error);
      }
    },
    checkInputs() {
      if (
        !this.registrationLetters ||
        !this.registrationNumbers ||
        !this.brand ||
        !this.model ||
        !this.year ||
        !this.type ||
        !this.capacity ||
        !this.pricePerMinute ||
        !this.carLatitude ||
        !this.carLongitude ||
        !this.image
      ) {
        showInfoToast("Please fill in all fields.");
        return false;
      }
      return true;
    },
    handleCarPositionUpdate(newCarPosition) {
      this.carLatitude = newCarPosition[0];
      this.carLongitude = newCarPosition[1];
    },
    handleFileInputChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.image = file;
      }
    },
    async uploadFile(carId) {
      const storage = getStorage();
      const storageRef = Ref(storage, `car_images/${carId}`); // Use carId as file name

      try {
        console.log("Uploading file...");
        await uploadBytes(storageRef, this.image);

        return getDownloadURL(storageRef)
          .then((url) => {
            console.log("File available at", url);
            return url;
          })
          .catch((error) => {
            console.error("Error getting download URL:", error);
            showErrorToast("Error getting download URL");
          });
      } catch (error) {
        console.error("Upload Error:", error);
        showErrorToast("Error uploading image");
      }
    },

    clearForm() {
      this.registrationLetters = "";
      this.registrationNumbers = "";
      this.brand = "";
      this.model = "";
      this.year = "";
      this.type = "";
      this.capacity = "";
      this.pricePerMinute = 0.1;
      this.carLatitude = null;
      this.carLongitude = null;
      // clear image
      document.getElementById("uploadImage").value = "";
      this.image = null;
    },
  },
};
</script>
