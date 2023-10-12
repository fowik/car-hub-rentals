<template></template>

<script>
export default {
  data() {
    return {
      isLoggedIn: false, // Set this to true when the user is logged in
    };
  },
  created() {
    this.logout();
  },
  methods: {
    logout() {
      // Clear user data from sessionStorage
      sessionStorage.removeItem("user"); // Remove the user data from localStorage
      // Update the isLoggedIn property to indicate that the user is not logged in
      this.isLoggedIn = false;
      // Redirect the user to the home page or any other desired route
      this.$router.push("/");
    },
  },
};
</script>
