<template>
  <!-- Modal content -->
  <div
    class="modal fade"
    id="EditModalToggle"
    aria-hidden="true"
    aria-labelledby="EditModalToggleLabel"
    tabindex="-1"
  >
    <!-- Modal dialog -->
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <!-- Modal header -->
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="EditModalToggleLabel">Edit car</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <!-- Modal body -->
        <div class="modal-body">
          <form>
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
                    type="text"
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
                  <option selected>
                    {{ selectedCar ? selectedCar.brand : "" }}
                  </option>
                  <option
                    :value="selectedBrand"
                    v-for="selectedBrand in brands"
                    :key="selectedBrand"
                  >
                    {{ selectedBrand }}
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
                  <option selected>
                    {{ selectedCar ? selectedCar.type : "" }}
                  </option>
                  <option
                    :value="selectedType"
                    v-for="selectedType in types"
                    :key="selectedType"
                  >
                    {{ selectedType }}
                  </option>
                </select>
                <span class="input-group-text">Capacity:</span>
                <input
                  type="number"
                  min="1.8"
                  step="0.01"
                  value="1.8"
                  id="capacityInput"
                  class="form-control"
                  placeholder="Capacity"
                  v-model="capacity"
                />
              </div>
            </div>

            <!-- Status -->
            <div class="mb-3 text-start">
              <label for="status" class="col-form-label">Status</label>

              <select class="form-select" id="statusSelect" v-model="status">
                <option selected>
                  {{ selectedCar ? selectedCar.status : "" }}
                </option>
                <option
                  :value="statusOption"
                  v-for="statusOption in statuses"
                  :key="statusOption"
                >
                  {{ statusOption }}
                </option>
              </select>
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
            <!-- Update Car location -->
            <div class="mb-3 text-start">
              <label for="" class="col-form-label text-start"
                >Upload new car location</label
              >

              <CarMapEdit
                :carLatitude="carLatitude"
                :carLongitude="carLongitude"
                @update:carLatitude="carLatitude = $event"
                @update:carLongitude="carLongitude = $event"
              />
            </div>
            <!-- Update Image -->
            <div class="mb-3 text-start">
              <label for="uploadImage" class="col-form-label text-start"
                >Upload new image</label
              >
              <div class="input-group">
                <input
                  type="file"
                  class="form-control"
                  id="uploadNewImage"
                  @change="handleFileInputChange"
                />
              </div>
              <div class="d-flex justify-content-center mt-3">
                <img
                  :src="imageUrl"
                  alt=""
                  style="max-width: 250px; max-height: 250px"
                />
              </div>
            </div>
          </form>
        </div>
        <!-- Modal footer -->
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" class="btn btn-primary" v-on:click="updateCar">
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { showSuccessToast, showErrorToast } from "@/firebase/Toasts";
import CarMapEdit from "@/components/Map/CarMapEdit.vue";

import axios from "axios";
import $ from "jquery";
import { ref, get, onValue } from "firebase/database";
import { db } from "@/firebase/firebase.js";
import {
  getStorage,
  ref as Ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

export default {
  name: "ModalEditCarComponent",
  props: {
    selectedCar: { type: [Object, null], required: true },
  },
  data() {
    return {
      registrationLetters: "",
      registrationNumbers: "",
      brand: "",
      model: "",
      year: "",
      type: "",
      capacity: "",
      status: "",
      pricePerMinute: "",
      carLatitude: "",
      carLongitude: "",
      imageUrl: "",
      types: [],
      brands: [],
      statuses: [],
      selectedImageFile: null,
    };
  },
  components: {
    CarMapEdit,
  },
  watch: {
    selectedCar: {
      handler(newVal) {
        if (newVal) {
          this.getCar(newVal.id);
          this.getOptions(newVal);
        }
      },
      deep: true,
    },
  },
  methods: {
    async updateCar() {
      try {
        const registration = `${this.registrationLetters}-${this.registrationNumbers}`;
        const data = this.getCarData(registration);

        await this.checkDuplicateRegistration(registration);

        await this.updateCarDetails(data);

        if (this.selectedImageFile) {
          await this.uploadCarImage();
        }

        this.clearFormAndCloseModal();
        showSuccessToast("Car information updated successfully!");
      } catch (error) {
        console.error(error);
        showErrorToast("Car information update failed!");
      }
    },

    getCarData(registration) {
      return {
        registration,
        brand: this.brand,
        model: this.model,
        year: this.year,
        type: this.type,
        capacity: this.capacity,
        status: this.status,
        pricePerMinute: this.pricePerMinute,
        carLatitude: this.carLatitude,
        carLongitude: this.carLongitude,
      };
    },

    async checkDuplicateRegistration(registration) {
      const carRef = ref(db, `cars`);
      const snapshot = await get(carRef);

      snapshot.forEach((childSnapshot) => {
        const key = childSnapshot.key;
        const childData = childSnapshot.val();

        if (
          childData.registration === registration &&
          key !== this.selectedCar.id
        ) {
          showErrorToast("Car with the same registration already exists!");
          throw new Error("Car with the same registration already exists!");
        }
      });
    },

    async updateCarDetails(data) {
      await axios.put(
        `https://us-central1-car-hub-130b6.cloudfunctions.net/api/cars/update/${this.selectedCar.id}`,
        data
      );
    },

    async uploadCarImage() {
      const storage = getStorage();
      const storageRef = Ref(storage, `car_images/${this.selectedCar.id}`);

      await uploadBytes(storageRef, this.selectedImageFile);

      this.imageUrl = await getDownloadURL(storageRef);

      await axios.put(
        `https://us-central1-car-hub-130b6.cloudfunctions.net/api/cars/update-image/${this.selectedCar.id}`,
        { imageUrl: this.imageUrl }
      );

      this.selectedImageFile = null;
      showSuccessToast("Car image updated successfully!");
    },

    clearFormAndCloseModal() {
      $("#EditModalToggle").hide();
      $(".modal-backdrop").remove();
    },
    async handleLocationUpdated(location) {
      this.carLatitude = location.latitude;
      this.carLongitude = location.longitude;
    },
    handleFileInputChange(event) {
      this.selectedImageFile = event.target.files[0];
    },
    async getCar(id) {
      try {
        await axios
          .get(
            `https://us-central1-car-hub-130b6.cloudfunctions.net/api/cars/${id}`
          )
          .then((response) => {
            const car = response.data;
            this.registrationLetters = car.registration.slice(
              0,
              car.registration.indexOf("-")
            );
            this.registrationNumbers = car.registration.slice(
              car.registration.indexOf("-") + 1
            );
            this.brand = car.brand;
            this.model = car.model;
            this.year = car.year;
            this.type = car.type;
            this.capacity = car.capacity;
            this.status = car.status;
            this.pricePerMinute = car.pricePerMinute;
            this.carLatitude = car.carLatitude;
            this.carLongitude = car.carLongitude;
            this.imageUrl = car.imageUrl;
          });
      } catch (error) {
        console.error(error);
      }
    },
    // get types and sort them to be displayed in the select, types that is selected by the car will be displayed first and shoud be displayed twice
    async getOptions(selectedCar) {
      this.types = [];
      this.brands = [];
      this.statuses = [];

      const typesRef = ref(db, "types");
      onValue(typesRef, (snapshot) => {
        const data = snapshot.val();
        if (selectedCar) {
          const selectedType = selectedCar.type;
          for (const key in data) {
            // Only add the type if it's not the selected type
            if (data[key].name !== selectedType) {
              this.types.push(data[key].name);
            }
          }
        }
      });

      const brandsRef = ref(db, "brands");
      onValue(brandsRef, (snapshot) => {
        const data = snapshot.val();
        if (selectedCar) {
          const selectedBrand = selectedCar.brand;
          for (const key in data) {
            // Only add the brand if it's not the selected brand
            if (data[key].name !== selectedBrand) {
              this.brands.push(data[key].name);
            }
          }
        }
      });

      const statusesRef = ref(db, "statuses");
      onValue(statusesRef, (snapshot) => {
        const data = snapshot.val();
        if (selectedCar) {
          const selectedStatus = selectedCar.status;
          for (const key in data) {
            // Only add the status if it's not the selected status
            if (data[key].name !== selectedStatus) {
              this.statuses.push(data[key].name);
            }
          }
        }
      });
    },
  },
};
</script>
