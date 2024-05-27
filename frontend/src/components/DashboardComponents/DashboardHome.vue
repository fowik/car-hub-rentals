<template>
  <div class="col m-4 w-75">
    <CardComponent />
    <ChartComponent />
    <div class="row">
      <div class="col-xs-8 col-md-8 col-lg-6 col-xl-6">
        <RecentRentsComponent />
      </div>
      <div class="col-xs-4 col-md-4 col-lg-6 col-xl-6">
        <RecentUsersComponent />
      </div>
    </div>
  </div>
</template>

<script>
import CardComponent from "@/components/DashboardComponents/CardComponent.vue";
import ChartComponent from "@/components/DashboardComponents/ChartComponent.vue";
import RecentUsersComponent from "@/components/DashboardComponents/RecentUsersComponent.vue";
import RecentRentsComponent from "@/components/DashboardComponents/RecentRentsComponent.vue";

export default {
  name: "DashboardHome",
  components: {
    CardComponent,
    ChartComponent,
    RecentUsersComponent,
    RecentRentsComponent,
  },
  methods: {
    isRouteHidden(routePath) {
      return this.$route.path !== routePath;
    },
  },
};
</script>

<style scoped></style>
