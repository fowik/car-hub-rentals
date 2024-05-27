<template>
  <div class="container-fluid">
    <div class="row flex-nowrap">
      <DashboardSidebarComponent />
      <router-view />
    </div>
  </div>
</template>

<script>
import DashboardSidebarComponent from "@/components/DashboardComponents/DashboardSidebarComponent.vue";

export default {
  name: "AppDashboard",
  components: {
    DashboardSidebarComponent,
  },
};
</script>

<style scoped></style>
