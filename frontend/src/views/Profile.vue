<template>
  <section>
    <ProfileSidebar />
    <div class="main-bar">
      <div class="main-bar-content">
        <div class="menu">
          <h2>Profile</h2>
          <p>Last updated: 2023/02/15 15:18:14</p>
        </div>
        <div class="content-to-save">
          <div class="input-row">
            <div class="input-group">
              <label>Full name</label>
              <input type="text" placeholder="Enter your full name" />
            </div>
            <div class="input-group">
              <label>Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                :value="username"
              />
            </div>
          </div>
          <div class="input-row">
            <div class="input-group">
              <label>Email</label>
              <input
                type="text"
                placeholder="Enter your email"
                :value="email"
              />
            </div>
            <div class="input-group">
              <label>Smth else</label>
              <input type="text" placeholder="Enter your Smth else" />
            </div>
          </div>
          <div class="save-btn">
            <button>Save</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import router from "@/router";
import ProfileSidebar from "@/components/ProfileSidebar.vue";

export default {
  data() {
    return {
      username: "",
      email: "",
    };
  },
  components: {
    ProfileSidebar,
  },
};
</script>

<style scoped>
section {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
}

.main-bar {
  display: flex;
  flex-direction: column;
  width: 40%;
  min-height: 41vh;
  background-color: #292929;
  color: #ffffff;
  border-radius: 15px;
  margin-left: 3%;
}

.main-bar-content {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-left: 45px;
  margin-right: 45px;
}

.main-bar-content .menu {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.main-bar-content .menu h2 {
  padding-left: 15px;
  border-left: 5px solid #ffa31a;
  color: #ffa31a;
}

.main-bar-content .menu p {
  right: 0px;
  margin: auto 0px auto auto;
  color: #666666;
  font-weight: 600;
  font-size: small;
}

.main-bar-content .content-to-save {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}

.main-bar-content .content-to-save label {
  width: 100%;
  text-align: left;
  font-weight: 500;
  font-size: small;
  margin-top: 10px;
}

.main-bar-content .content-to-save input {
  /* width: calc(100%); */
  background: none;
  padding: 10px;
  margin: 10px 0;
  border: none;
  border-radius: 5px;
  outline: none;
  border: 2px solid #666666;
  color: #ffffff;
}

.input-row {
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
  justify-content: space-between;
}

.input-group {
  width: 400px;
}

.input-group label {
  display: block;
  padding-left: auto;
  margin-bottom: 5px;
}

.input-group input {
  width: 80%;
  border: none;
  border-radius: 5px;
  justify-content: center;
  outline: none;
}

.save-btn button {
  display: flex;
  margin: auto 0px auto auto;
  background-color: #ffa31a;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
}

.save-btn button:hover {
  background-color: #f49200;
}
</style>
