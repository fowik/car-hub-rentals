<template>
  <div class="position-relative bg-dark">
    <NavBar />
    <ParticleJS v-if="isRouterViewLoaded" />

    <div class="wrapper m-0">
      <div id="app" class="text-white" data-bs-theme="dark">
        <div class="position-relative router-container"><router-view /></div>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import NavBar from "./components/OtherComponents/AppNavBar.vue";
import AppFooter from "./components/OtherComponents/AppFooter.vue";
import ParticleJS from "./components/Particles/ParticlesJS.vue";

export default {
  data() {
    return {
      isRouterViewLoaded: false,
    };
  },
  watch: {
    $route() {
      this.loadParticles();
    },
  },
  methods: {
    loadParticles() {
      this.isRouterViewLoaded = false;
      this.$nextTick(() => {
        setTimeout(() => {
          this.isRouterViewLoaded = true;
        }, 1200);
      });
    },
  },
  components: {
    NavBar,
    AppFooter,
    ParticleJS,
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: calc(100vh - 256px);
}

.wrapper {
  width: 100%;
  margin: 0 auto;
}

@media (min-height: 896px) {
  #app {
    min-height: calc(100vh - 252px) !important;
  }
}

@media (min-height: 844px) {
  #app {
    min-height: calc(100vh - 252px) !important;
  }
}
</style>
