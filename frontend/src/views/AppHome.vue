<template>
  <div class="p-4">
    <HomeComponent />
    <CarsComponent />
    <AboutComponent />
  </div>
</template>

<script>
import HomeComponent from "../components/HomeComponents/HomeComponent.vue";
import CarsComponent from "../components/HomeComponents/CarsComponent.vue";
import AboutComponent from "../components/HomeComponents/AboutComponent.vue";

import { showSuccessToast, showInfoToast } from "@/firebase/Toasts";

export default {
  name: "AppHome",
  components: {
    HomeComponent,
    CarsComponent,
    AboutComponent,
  },
  created() {
    if (this.$route.query.hasNoAccess) {
      showInfoToast("Soorry!!");
      setTimeout(() => {
        this.$router.push({ path: this.$route.path, query: {} });
      }, 6000);
    }
  },
  watch: {
    "$route.query.logout"(newValue) {
      if (newValue) {
        showSuccessToast("User successfully logged out!");
        setTimeout(() => {
          this.$router.push({ path: this.$route.path, query: {} });
        }, 4000);
      }
    },
  },
};
</script>

<style scoped>
/* section {
  height: calc(90vh - 256px);
} */
</style>
