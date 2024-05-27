<template>
  <l-map
    v-if="mapLoaded"
    :zoom="zoom"
    :center="center"
    :maxBounds="maxBounds"
    :min-zoom="5"
    style="height: 250px; border-radius: 0.375rem"
    @click="setCarPosition"
  >
    <l-tile-layer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      :min-zoom="5"
    ></l-tile-layer>
    <l-marker v-if="carPosition" :lat-lng="carPosition">
      <l-popup>Car will be here!</l-popup>
    </l-marker>
  </l-map>
  <div v-else>
    <p>Loading map...</p>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LPopup } from "@vue-leaflet/vue-leaflet";

export default {
  name: "CarMap",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
  },
  data() {
    return {
      carPosition: null,
      center: [56.96, 23.15],
      zoom: 14,
      mapLoaded: false,
      maxBounds: [
        [60, -180],
        [-90, 180],
      ],
    };
  },
  async mounted() {
    try {
      await this.loadMap();
      const position = await this.getCurrentPosition();
      this.center = [position.coords.latitude, position.coords.longitude];
      const city = await this.reverseGeocode(
        position.coords.latitude,
        position.coords.longitude
      );
      console.log("Current city:", city);
    } catch (error) {
      console.error("Error fetching city:", error);
    }
  },
  methods: {
    async loadMap() {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      this.mapLoaded = true;
    },
    setCarPosition(event) {
      this.carPosition = event.latlng;
      this.$emit("update:carPosition", [event.latlng.lat, event.latlng.lng]);
    },
    getCurrentPosition() {
      return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(resolve, (error) => {
            console.error("Geolocation error:", error);
            reject(error);
          });
        } else {
          reject(new Error("Geolocation is not supported by this browser."));
        }
      });
    },
    async reverseGeocode(latitude, longitude) {
      try {
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch reverse geocode data");
        }
        const data = await response.json();
        return data.address.city;
      } catch (error) {
        console.error("Reverse geocoding error:", error);
        throw error;
      }
    },
  },
};
</script>
