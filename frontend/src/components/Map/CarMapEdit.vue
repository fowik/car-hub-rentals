<template>
  <l-map
    v-if="mapLoaded"
    :zoom="zoom"
    :center="center"
    style="height: 250px; border-radius: 0.375rem"
    @click="updateCarPositionOnClick"
  >
    <l-tile-layer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    ></l-tile-layer>
    <l-marker :lat-lng="carPosition">
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
  name: "CarMapEdit",
  props: {
    carLatitude: {
      type: Number,
      required: true,
    },
    carLongitude: {
      type: Number,
      required: true,
    },
  },
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
  },
  data() {
    return {
      carPosition: null,
      zoom: 14,
      mapLoaded: false,
    };
  },
  computed: {
    center() {
      return [this.carLatitude, this.carLongitude];
    },
  },
  async mounted() {
    try {
      await this.loadMap();
    } catch (error) {
      console.error("Error loading map:", error);
    }
  },
  watch: {
    carLatitude() {
      this.updateCarPosition();
    },
    carLongitude() {
      this.updateCarPosition();
    },
  },
  methods: {
    async loadMap() {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      this.mapLoaded = true;
      this.updateCarPosition();
    },
    updateCarPosition() {
      this.carPosition = [this.carLatitude, this.carLongitude];
    },
    updateCarPositionOnClick(event) {
      // Получаем координаты клика
      const clickedLatLng = event.latlng;
      // Генерируем событие с обновленными координатами
      this.$emit("update:carLatitude", clickedLatLng.lat);
      this.$emit("update:carLongitude", clickedLatLng.lng);

      // Обновляем позицию маркера
      this.carPosition = [clickedLatLng.lat, clickedLatLng.lng];
      console.log("Car position updated:", clickedLatLng);
    },
  },
};
</script>
