<template>
  <div class="container">
    <div
      class="navigation bg-black-light transition-all duration-500 border-l-10 border-black-light fixed top-16 h-screen w-80"
    >
      <ul>
        <li>
          <a href="#">
            <span class="icon"
              ><ion-icon name="car-sport-outline"></ion-icon
            ></span>
            <span class="title">Carhub</span>
          </a>
        </li>
        <li>
          <router-link to="/control-panel">
            <span class="icon"><ion-icon name="home-outline"></ion-icon></span>
            <span class="title">Dashboard</span>
          </router-link>
        </li>
        <li>
          <router-link to="/control-panel/users">
            <span class="icon"
              ><ion-icon name="people-outline"></ion-icon
            ></span>
            <span class="title">Customers</span>
          </router-link>
        </li>
        <li>
          <router-link to="/control-panel/cars">
            <span class="icon"
              ><ion-icon name="car-sport-outline"></ion-icon
            ></span>
            <span class="title">Cars</span>
          </router-link>
        </li>
        <li>
          <a href="#">
            <span class="icon"
              ><ion-icon name="chatbubble-outline"></ion-icon
            ></span>
            <span class="title">Message</span>
          </a>
        </li>
        <li>
          <a href="#">
            <span class="icon"><ion-icon name="help-outline"></ion-icon></span>
            <span class="title">Help</span>
          </a>
        </li>
        <li>
          <a href="#">
            <span class="icon"
              ><ion-icon name="settings-outline"></ion-icon
            ></span>
            <span class="title">Settings</span>
          </a>
        </li>
        <li>
          <a href="#">
            <span class="icon"
              ><ion-icon name="lock-closed-outline"></ion-icon
            ></span>
            <span class="title">Password</span>
          </a>
        </li>
        <li>
          <a href="#">
            <span class="icon"
              ><ion-icon name="log-out-outline"></ion-icon
            ></span>
            <span class="title">Sign out</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem("user"));
    // Check if the user object is present and has a username property
    if (user) {
      if (user.isAdmin === true) {
      } else {
        this.$router.push({ path: "/profile" });
      }
    } else {
      // Handle the case when the user is not logged in or user data is not available in localStorage
      this.$router.push({ path: "/" });
    }

    this.setupMenuToggle();
  },
  methods: {
    setupMenuToggle() {
      let toggle = document.querySelector(".toggle");
      let navigation = document.querySelector(".navigation");
      let main = document.querySelector(".main");
      let list = document.querySelectorAll(".navigation li");

      toggle.onclick = () => {
        toggle.classList.toggle("active");
        navigation.classList.toggle("active");
        main.classList.toggle("active");
      };

      function activeLink() {
        list.forEach((item) => item.classList.remove("hovered"));
        this.classList.add("hovered");
      }

      list.forEach((item) => item.addEventListener("mouseover", activeLink));
    },
    beforeDestroy() {
      // Cleanup logic when component is destroyed
      // Remove event listeners or any other cleanup if necessary
      let list = document.querySelectorAll(".navigation li");
      list.forEach((item) =>
        item.removeEventListener("mouseover", this.activeLink)
      );
    },
  },
};
</script>

<style>
.container {
  position: relative;
  width: 100%;
}

.navigation {
  position: fixed;
  top: 72px;
  left: 0;
  width: 300px;
  height: calc(100vh);
  background: var(--black-light);
  transition: 0.5s;
  border-left: 10px solid var(--black-light);
  overflow: hidden;
}
.navigation.active {
  width: 80px;
}
.navigation ul {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.navigation ul li {
  color: var(--white);
  position: relative;
  width: 100%;
  list-style: none;
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
}

.navigation ul li:hover,
.navigation ul li.hovered {
  background: var(--orange-dark);
}

.navigation ul li a.router-link-active {
  border-left: 5px solid #ffa31a;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  background: var(--orange-dark);
}

.navigation ul li a.router-link-active {
  color: var(--orange);
}

.navigation ul li a.router-link-active::before,
.navigation ul li a.router-link-active::before {
  content: "";
  position: absolute;
  top: -50px;
  right: 0;
  width: 50px;
  height: 50px;
  background: transparent;
  border-radius: 50%;
  box-shadow: 35px 35px 0 10px var(--orange-dark);
  pointer-events: none;
}

.navigation ul li a.router-link-active::after,
.navigation ul li a.router-link-active::after {
  content: "";
  position: absolute;
  bottom: -50px;
  right: 0;
  width: 50px;
  height: 50px;
  background: transparent;
  border-radius: 50%;
  box-shadow: 35px -35px 0 10px var(--orange-dark);
  pointer-events: none;
}

.navigation ul li:nth-child(1) {
  margin-bottom: 40px;
  pointer-events: none;
}

.navigation ul li a {
  position: relative;
  display: block;
  width: 100%;
  display: flex;
  text-decoration: none;
  color: var(--white);
}

.navigation ul li:hover a,
.navigation ul li.hovered a {
  color: var(--orange);
}

.navigation ul li a .icon {
  position: relative;
  display: block;
  min-width: 60px;
  height: 60px;
  line-height: 80px;
  text-align: center;
  font-size: 18px;
}

.navigation ul li a .icon ion-icon {
  font-size: 1.75em;
}

.navigation ul li a .title {
  position: relative;
  display: block;
  padding: 0 10px;
  line-height: 60px;
  text-align: start;
  white-space: nowrap;
  font-size: 15px;
}

/* curve outside */

.navigation ul li:hover a::before,
.navigation ul li.hovered a::before {
  content: "";
  position: absolute;
  top: -50px;
  right: 0;
  width: 50px;
  height: 50px;
  background: transparent;
  border-radius: 50%;
  box-shadow: 35px 35px 0 10px var(--orange-dark);
  pointer-events: none;
}

.navigation ul li:hover a::after,
.navigation ul li.hovered a::after {
  content: "";
  position: absolute;
  bottom: -50px;
  right: 0;
  width: 50px;
  height: 50px;
  background: transparent;
  border-radius: 50%;
  box-shadow: 35px -35px 0 10px var(--orange-dark);
  pointer-events: none;
}

/* main content */

.main {
  position: absolute;
  top: 82px;
  width: calc(100% - 300px);
  margin-left: 300px;
  min-height: calc(100vh - 163px);
  transition: 0.5s;
}

.main.active {
  width: calc(100% - 80px);
  margin-left: 80px;
}

.topbar {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
}

.toggle {
  position: relative;
  top: 0;
  left: 0px;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 2.5em;
}

.search {
  position: relative;
  width: 400px;
  margin: 0 10px;
}

.search label {
  position: relative;
  width: 100%;
}

.search label input {
  width: 100%;
  height: 40px;
  border-radius: 40px;
  padding: 5px 20px;
  padding-left: 35px;
  font-size: 18px;
  outline: none;
  border: 1px solid var(--black-light);
}

.search label ion-icon {
  position: absolute;
  top: -1px;
  left: 10px;
  font-size: 1.2em;
  color: var(--black-light);
}

.user {
  position: relative;
  min-width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  background-color: var(--black-light);
}

.user img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 768px) {
  .main,
  .topbar,
  .cardBox,
  .details {
    width: calc(100% - 80px);
    margin-left: -120px;
  }

  .cardBox {
    overflow: auto;
    width: calc(100% - 40px) !important;
    margin-left: -100px !important;
    margin-right: auto !important;
  }

  .cardBox::-webkit-scrollbar {
    width: 3px;
    background: var(--black);
    border-radius: 10px;
  }

  .cardBox::-webkit-scrollbar-thumb {
    background: var(--orange);
    border-radius: 10px;
  }

  .navigation {
    width: 80px !important;
  }

  .navigation ul li a .title {
    display: none;
    visibility: hidden;
    width: 0;
    height: 0;
    overflow: hidden;
    padding: 0;
    margin: 0;
  }
}
</style>
