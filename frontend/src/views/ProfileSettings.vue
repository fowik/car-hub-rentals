<template>
  <section>
    <ProfileSidebar />
    <div class="main-bar">
      <div class="main-bar-content">
        <div class="menu">
          <h2>Settings</h2>
          <p>Last updated: {{ user.updatedAt }}</p>
        </div>
        <div></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.main-bar {
  display: flex;
  flex-direction: column;
  width: 40%;
  min-height: 34vh;
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

.main-bar-content .main-content {
  position: absolute;
  top: 50%;
  transform: translateY(-40%);
  margin: 0 auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>

<script>
import axios from "axios";
import ProfileSidebar from "@/components/ProfileSidebar.vue";

export default {
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
    };
  },
  components: { ProfileSidebar },
};
</script>
