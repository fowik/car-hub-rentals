<template>
  <section class="d-flex align-items-center justify-content-center p-4">
    <LoginFormComponent />
  </section>
</template>

<script>
import LoginFormComponent from "../components/OtherComponents/LoginFormComponent.vue";
import { showInfoToast } from "@/firebase/Toasts";

export default {
  name: "AppLogin",
  components: {
    LoginFormComponent,
  },
  mounted() {
    if (this.$route.query.needToLogin) {
      showInfoToast("You need to login to access this page!");
      setTimeout(() => {
        this.$router.push({ path: this.$route.path, query: {} });
      }, 6000);
    }
    if (this.$route.query.verifyEmail) {
      const email = this.$route.query.email;
      showInfoToast(
        `Please verify your email address to proceed. A verification email has been sent to ${email}.`
      );
      setTimeout(() => {
        this.$router.push({ path: this.$route.path, query: {} });
      }, 6000);
    }
  },
};
</script>

<style scoped></style>
