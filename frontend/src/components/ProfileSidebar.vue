<template>
  <div class="side-bar-left">
    <div class="side-bar-username">
      <img
        src="https://marketplace.canva.com/EAFXS8-cvyQ/1/0/400w/canva-brown-and-light-brown%2C-circle-framed-instagram-profile-picture-SsX0UeCGP8g.jpg"
        alt="profile_picture"
      />
      <h3>{{ user.username }}</h3>
    </div>
    <div class="side-bar-links">
      <router-link to="/profile"
        ><span class="icon"><ion-icon name="person-outline"></ion-icon></span>
        <p class="text">Profile</p></router-link
      >
      <router-link to="/profile/history"
        ><span class="icon"
          ><ion-icon name="bookmarks-outline"></ion-icon
        ></span>
        <p class="text">History</p></router-link
      >
      <router-link to="/profile/settings"
        ><span class="icon"><ion-icon name="settings-outline"></ion-icon></span>
        <p class="text">Settings</p></router-link
      >
      <router-link to="/profile/logout"
        ><span class="icon"><ion-icon name="log-out-outline"></ion-icon> </span>
        <p class="text">Logout</p></router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
    };
  },
  created() {},
  methods: {
    CheckUserSession() {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log(user);
      if (user && user.username) {
        this.username = user.username;
        this.email = user.email;
      } else {
        this.$router.push({ path: "/login" });
      }
    },
  },
};
</script>

<style scoped>
body {
  width: 90%;
}

.side-bar-left {
  display: flex;
  flex-direction: column;
  max-height: 56vh;
  width: 10%;
  background-color: #292929;
  color: #ffffff;
  border-radius: 15px;
}

.side-bar-username {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 30%;
  border-bottom: 3px solid #343434;
}

.side-bar-username h3 {
  margin-bottom: 10px;
}

.side-bar-username img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-top: 20px;
  margin-bottom: 10px;
  /* transform: scale(2); */
}

.side-bar-links {
  display: flex;
  flex-direction: column;
  justify-content: left;
}

.side-bar-links a.router-link-active {
  border-left: 5px solid #ffa31a;
  color: #ffa31a;
  width: 100%-5px !important;
  background-color: #f4920080;
}

.side-bar-links a {
  display: flex;
  padding-left: 15px;
  padding-bottom: 15px;
  padding-top: 15px;
  color: #ffffff;
  font-weight: 600;
}

.side-bar-links a:hover {
  border-left: 5px solid #ffa31a;
  color: #ffa31a;
  width: 100%-5px !important;
  background-color: #f4920080;
}

.side-bar-links a:hover:last-child {
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
}

.side-bar-links a .icon {
  position: relative;
  min-width: 60px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  font-size: 18px;
  margin-left: -12px;
}

.side-bar-links a .icon ion-icon {
  font-size: 1.2em;
}

@media (max-width: 768px) {
  .navigation {
    width: 80px;
  }
  .main-bar {
    width: 90%;
    min-height: auto;
  }
  .side-bar-left {
    width: 15%;
    min-height: auto;
    margin-bottom: 20px;
  }

  .side-bar-links p.text {
    display: none !important;
    width: 0 !important;
  }
  .side-bar-username img {
    display: none;
  }

  .side-bar-username h3 {
    margin-top: 20px;
  }
}
</style>
