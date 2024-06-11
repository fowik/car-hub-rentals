<template>
  <ReservationModal :carId="carId" />
  <div class="container-fluid p-0">
    <div class="filters-container">
      <div class="row">
        <div class="col-md-4 mb-3">
          <select
            v-model="selectedBrand"
            @change="filterCars"
            class="form-select"
          >
            <option value="">All</option>
            <option v-for="brand in uniqueBrands" :key="brand" :value="brand">
              {{ brand }}
            </option>
          </select>
        </div>

        <div class="col-md-4 mb-3">
          <input
            type="range"
            v-model.number="selectedMaxPrice"
            @input="filterCars"
            class="form-range"
            id="priceRange"
            :min="minPrice"
            :max="maxPrice"
            step="0.01"
          />
          <b class="mt-2">Select Price: </b>
          <label for="priceRange" class="form-label">
            <div class="input-group">
              <input
                type="number"
                v-model.number="selectedMaxPrice"
                @input="filterCars"
                class="form-control"
                :placeholder="maxPrice"
                :min="minPrice"
                :max="maxPrice"
                step="0.01"
              />
              <span class="input-group-text">€</span>
            </div>
          </label>
        </div>

        <div class="col-md-4 mb-3">
          <button @click="resetFilters" class="btn btn-secondary w-100">
            Reset Filters
          </button>
        </div>
      </div>
    </div>

    <div id="map-container">
      <l-map
        id="mapid"
        :zoom="13"
        :max-zoom="18"
        :min-zoom="3"
        :max-bounds="maxBounds"
        :center="center"
        style="height: 75vh; border-radius: 0.375rem"
      >
        <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        ></l-tile-layer>
        <l-marker v-if="position" :lat-lng="position" :icon="userIcon">
          <l-popup>You are here</l-popup>
        </l-marker>
        <l-marker
          v-for="(car, index) in filteredCars"
          :key="index"
          :lat-lng="{ lat: car.carLatitude, lng: car.carLongitude }"
          :icon="icon"
        >
          <l-popup>
            <div class="popup-content">
              <img :src="car.imageUrl" alt="" class="popup-image" />
              <div class="popup-text">
                <h3>{{ car.brand }} {{ car.model }}</h3>
                <p>Price per minute: {{ car.pricePerMinute }} €</p>

                <button
                  class="btn btn-primary mt-3 mb-3"
                  data-bs-target="#ReserveModalToggle"
                  data-bs-toggle="modal"
                  v-on:click="selectedCarId(car.id)"
                >
                  Reserve
                </button>
              </div>
            </div>
          </l-popup>
        </l-marker>
      </l-map>
    </div>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";
import { icon } from "leaflet";

import ReservationModal from "@/components/ReservationComponents/ReservationModal.vue";

import { db } from "@/firebase/firebase.js";
import { ref, onValue } from "firebase/database";
import { showInfoToast } from "@/firebase/Toasts";

export default {
  name: "AppMap",

  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    ReservationModal,
  },
  data() {
    return {
      position: null,
      center: [56.947222, 24.122222], // Default center coordinates
      cars: [],
      carId: null,
      selectedBrand: "",
      minPrice: 0,
      maxPrice: 10, // Will be updated dynamically
      selectedMaxPrice: 10, // Will be used for filtering
      filteredCars: [],
      uniqueBrands: [],
      icon: icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/5193/5193688.png",
        iconSize: [40, 40],
        iconAnchor: [20, 40],
      }),
      userIcon: icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/1673/1673221.png",
        iconSize: [40, 40],
        iconAnchor: [20, 40],
      }),
      maxBounds: [
        [140, -160],
        [-140, 160],
      ],
    };
  },
  mounted() {
    this.fetchCars();

    // Check if geolocation is supported
    if (navigator.geolocation) {
      this.watchId = navigator.geolocation.watchPosition(
        (position) => {
          // Get the coordinates of the current position.
          var lat = position.coords.latitude;
          var lon = position.coords.longitude;

          // Set the position and center data properties
          this.position = [lat, lon];
          this.center = [lat, lon];
        },
        (error) => {
          console.log(error);
          if (error.code === error.PERMISSION_DENIED) {
            // Geolocation permission has been denied
            showInfoToast(
              "Geolocation permission has been denied. Please enable it to use this feature."
            );
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            // Geolocation position is unavailable
            showInfoToast(
              "Geolocation information is unavailable. Please make sure your device's location service is enabled."
            );
          } else if (error.code === error.TIMEOUT) {
            // Geolocation request timed out
            showInfoToast(
              "Geolocation request has timed out. Please try again later."
            );
          } else {
            // Other geolocation errors
            showInfoToast(
              "An error occurred while fetching your location. Please try again later."
            );
          }
        }
      );
    } else {
      // Geolocation is not supported
      console.log("Geolocation is not supported by this browser.");
      showInfoToast("Geolocation is not supported by this browser.");
    }
  },
  beforeUnmount() {
    if (this.watchId) {
      navigator.geolocation.clearWatch(this.watchId);
    }
  },
  methods: {
    // fetch cars that are available
    async fetchCars() {
      try {
        this.isLoading = true;
        const dbRef = ref(db, "cars");

        onValue(dbRef, (snapshot) => {
          const carsObject = snapshot.val();
          if (!carsObject) {
            return;
          }
          const carsArray = Object.keys(carsObject).map(
            (key) => carsObject[key]
          );
          carsArray.forEach((car, index) => {
            car.id = Object.keys(carsObject)[index];
          });
          const availableCars = carsArray.filter(
            (car) => car.status === "Available"
          );

          this.cars = availableCars;
          this.uniqueBrands = [
            ...new Set(availableCars.map((car) => car.brand)),
          ];
          this.filteredCars = availableCars;

          // Set max price dynamically
          if (availableCars.length > 0) {
            this.maxPrice = Math.max(
              ...availableCars.map((car) => car.pricePerMinute)
            );
            this.selectedMaxPrice = this.maxPrice;
          }
        });
      } catch (error) {
        console.error("Request failed:", error);
        this.Loading = true;
      } finally {
        this.isLoading = false;
      }
    },
    selectedCarId(id) {
      this.carId = id;
    },
    filterCars() {
      this.filteredCars = this.cars.filter((car) => {
        const matchesBrand = this.selectedBrand
          ? car.brand === this.selectedBrand
          : true;
        const matchesPrice =
          this.selectedMaxPrice !== null
            ? car.pricePerMinute <= this.selectedMaxPrice
            : true;
        return matchesBrand && matchesPrice;
      });
    },
    resetFilters() {
      this.selectedBrand = "";
      this.selectedMaxPrice = this.maxPrice; // Reset to max price
      this.filteredCars = this.cars;
    },
  },
};
</script>

<style scoped>
.popup-content {
  display: flex;
  align-items: center;
}

.popup-image {
  width: 100px;
  margin-right: 10px;
}

.popup-text {
  display: flex;
  flex-direction: column;
}

.popup-text h3 {
  margin: 0;
}

.popup-text p {
  margin: 0;
}
</style>
