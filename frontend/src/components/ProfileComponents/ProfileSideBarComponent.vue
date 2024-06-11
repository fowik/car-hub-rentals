<template>
  <div class="border rounded bg-body-tertiary p-3 mb-3">
    <div class="text-center mt-4">
      <img
        :src="userImage"
        class="rounded img-fluid w-25 mb-4"
        alt="profile-picture"
      />
    </div>
    <div class="text-center mb-4">
      <h5>{{ userData.displayName }}</h5>
    </div>
    <OngoingBookingComponent />
  </div>
</template>

<script>
import { auth } from "@/firebase/firebase.js";
import { signOut } from "firebase/auth";
import OngoingBookingComponent from "@/components/ProfileComponents/OngoingBookingComponent.vue";

export default {
  name: "ProfileSideBarComponent",
  components: {
    OngoingBookingComponent,
  },
  props: {
    userData: Object,
  },
  data() {
    return {
      userImage: "https://picsum.photos/100",
    };
  },
  methods: {
    handleSignOut() {
      signOut(auth);
      this.$router.push({
        name: "Home",
        query: { logout: true },
      });
    },
  },
};
</script>

<style scoped></style>
