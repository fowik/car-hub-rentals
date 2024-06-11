<template>
  <nav
    class="navbar navbar-expand-lg bg-dark border-body m-0 pt-3 pb-3 justify-content-center"
    data-bs-theme="dark"
  >
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand fs-4 fw-bold">CarHub</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#NavDropdown"
        aria-controls="NavDropdown"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse justify-content-end fw-semibold"
        id="NavDropdown"
      >
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link
              to="/"
              class="nav-link"
              :class="{ active: $route.path === '/' }"
              >Home</router-link
            >
          </li>

          <li class="nav-item">
            <router-link
              to="/reservation"
              class="nav-link"
              :class="{ active: $route.path === '/reservation' }"
              >Reservation</router-link
            >
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Others
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <router-link
                to="/#cars"
                @click="scrollToSection('cars')"
                class="dropdown-item"
                >Cars</router-link
              >
              <router-link
                to="/#about"
                @click="scrollToSection('about')"
                class="dropdown-item"
                >About Us</router-link
              >
            </div>
          </li>
        </ul>
      </div>
      <!-- Close the first navbar-collapse div here -->
      <div
        class="collapse navbar-collapse justify-content-end fw-semibold"
        id="NavDropdown"
      >
        <ul class="navbar-nav">
          <SignIn />
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import SignIn from "@/components/Header/SignIn.vue";

export default {
  name: "NavBar",
  components: {
    SignIn,
  },
  methods: {
    scrollToSection(sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    },
  },
};
</script>

<style scoped>
.navbar {
  background-color: rgba(0, 0, 0, 0.5) !important;
  z-index: 1000;
}

.container-fluid {
  width: 90%;
}
</style>
