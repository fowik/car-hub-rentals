<template></template>

<script>
export default {
  created() {
    this.logout();
  },
  methods: {
    logout() {
      localStorage.removeItem("user");
      this.$router.push({ path: "/" });
      setTimeout(this.ReloadPage);
    },
    ReloadPage() {
      location.reload();
    },
  },
};
</script>
