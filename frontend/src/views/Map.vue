<template>
  <div>
    <div ref="map" class="leaflet-map"></div>
  </div>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default {
  name: "MapComponent",
  data() {
    return {
      map: null,
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      this.map = L.map(this.$refs.map).setView([0, 0], 2);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          'Map data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
      }).addTo(this.map);

      this.getUserLocation();
    },
    getUserLocation() {
      const onLocationFound = (e) => {
        const radius = e.accuracy / 40;

        L.marker(e.latlng)
          .addTo(this.map)
          .bindPopup(`You are within ${radius} meters from this point`)
          .openPopup();

        L.circle(e.latlng, radius).addTo(this.map);
      };

      const onLocationError = (e) => {
        alert(e.message);
      };

      this.map.on("locationfound", onLocationFound);
      this.map.on("locationerror", onLocationError);

      this.map.locate({ setView: true, maxZoom: 16, enableHighAccuracy: true });
    },
  },
};
</script>

<style scoped>
.leaflet-map {
  height: 800px; /* Adjust the height as needed */
  width: 80%;
  margin: 0 auto;
}
</style>
