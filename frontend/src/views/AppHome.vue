<template>
  <div>
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
section:first-of-type {
  height: calc(100vh - 74.34px - 176px);
  padding-right: 1.5rem;
  padding-left: 1.5rem;
}

section:nth-of-type(3) {
  height: calc(100vh - 74.34px - 176px);
  padding-right: 1.5rem;
  padding-left: 1.5rem;
}

section:nth-of-type(even) {
  background-color: rgba(0, 0, 0, 0.5);
}

section {
  height: calc(100vh);
}
</style>
