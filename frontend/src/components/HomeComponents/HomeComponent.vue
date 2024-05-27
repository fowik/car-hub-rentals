<template>
  <section id="home" class="container d-flex align-middle">
    <div class="row">
      <div class="col-xs-4 col-md-4 col-lg-4 col-xl-4 text-start">
        <div class="d-flex align-items-center h-100">
          <div class="row">
            <div class="mb-3">
              <h1>Discover the Freedom with CarHub Car Rental</h1>
            </div>
            <div class="col-xs-12 col-md-12">
              <button
                type="button"
                class="btn btn-outline-light btn-lg me-2 mb-3"
                data-mdb-ripple-color="#000000"
                @click="installApp"
              >
                <fa class="text-white me-2 fs-1" :icon="['fab', 'app-store']" />
                Download app
              </button>
              <button
                type="button"
                class="btn btn-outline-light btn-lg me-2 mb-3"
                data-mdb-ripple-color="#000000"
                @click="installApp"
              >
                <fa
                  class="text-white me-2 fs-1"
                  :icon="['fab', 'google-play']"
                />
                Download app
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xs-10 col-md-8 d-flex align-self-center">
        <img src="@/assets/img/hero-01.png" alt="carHub" class="img-fluid" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "HomeComponent",
  methods: {
    installApp() {
      alert("App installed successfully");
    },
  },
};
</script>
