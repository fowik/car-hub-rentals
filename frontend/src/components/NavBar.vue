<template>
  <nav class="navbar">
    <div class="nav-bar-container">
      <div class="logo">
        <router-link to="/"
          ><h1>Car<span class="orange-box">hub</span></h1></router-link
        >
      </div>
      <div class="burger" @click="toggleNavbar">
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
      </div>
      <ul class="nav-links" :class="{ active: isNavbarActive }">
        <li @click="scrollToHome"><router-link to="/">Home</router-link></li>
        <li @click="scrollToCars">
          <router-link :to="{ path: '/' }">Cars</router-link>
        </li>
        <li @click="scrollToAbout">
          <router-link :to="{ path: '/' }">About</router-link>
        </li>
        <li>
          <router-link :to="{ path: '/reservation' }">Reservation</router-link>
        </li>
        <li>
          <router-link :to="{ path: '/map' }">Map</router-link>
        </li>
        <li>
          <router-link v-if="isLoggedIn" to="/profile">Profile</router-link>
          <router-link v-else :to="{ name: 'Register' }">Sign Up</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: false,
      isNavbarActive: false,
    };
  },
  mounted() {
    this.checkUserSession();
    window.addEventListener("resize", this.checkWindowWidth);
  },
  methods: {
    scrollToHome() {
      const targetElement = document.getElementById("home"); // Assuming "home" is the ID of the target element
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: "smooth",
        });
      }
    },
    scrollToCars() {
      const targetElement = document.getElementById("cars"); // Assuming "cars" is the ID of the target element
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: "smooth",
        });
      }
    },
    scrollToAbout() {
      const targetElement = document.getElementById("about"); // Assuming "about" is the class of the target element
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: "smooth",
        });
      }
    },
    checkUserSession() {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user.username) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    },
    checkWindowWidth() {
      if (window.innerWidth < 786) {
        this.isNavbarActive = false; // Close the navbar when window is resized to less than 786px
      }
    },
    toggleNavbar() {
      this.isNavbarActive = !this.isNavbarActive;
    },
  },
};
</script>

<style scoped>
.nav-bar-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 90%;
}

.navbar {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #292929;
  padding: 20px;
}

.logo h1 {
  margin: 0;
  font-size: 28px;
  color: #ffffff;
}

.logo .orange-box {
  background-color: #ffa31a;
  padding: 5px;
  border-radius: 5%;
  color: #1b1b1b;
  margin-left: 5px;
}

.nav-links {
  list-style-type: none;
  margin: 0;
  display: flex;
  flex-direction: row;
  gap: 20px;
  padding-right: 20px;
}

.nav-links a {
  text-decoration: none;
  color: #ffffff;
  font-weight: bold;
}

.nav-links a:hover {
  text-decoration: underline;
}

.burger {
  display: flex;
  flex-direction: column;
  cursor: pointer;
  display: none;
}

.bar {
  background-color: #ffffff;
  height: 3px;
  width: 25px;
  margin: 3px 0;
  transition: 0.4s;
}

@media (max-width: 786px) {
  .nav-bar {
    display: sticky;
  }
  .burger {
    display: block;
  }

  .nav-links {
    z-index: 100;
    display: none;
    flex-direction: column;
    position: absolute;
    top: 72px;
    left: 0;
    background-color: #292929;
    width: 100%;
    padding: 10px;
    text-align: center;
  }

  .nav-links.active {
    display: flex;
  }
}
</style>
