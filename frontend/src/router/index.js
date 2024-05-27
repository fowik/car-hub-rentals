import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";

import Home from "@/views/AppHome.vue";
import AppRegister from "@/views/AppRegister.vue";
import AppNotFound from "@/views/AppNotFound.vue";
import AppLogin from "@/views/AppLogin.vue";
import AppProfile from "@/views/AppProfile.vue";
import AppDashboard from "@/views/AppDashboard.vue";
import AppReservation from "@/views/AppReservation.vue";
import DashboardMessages from "@/components/DashboardComponents/DashboardMessages.vue";
import DashboardHome from "@/components/DashboardComponents/DashboardHome.vue";
import DashboardCars from "@/components/DashboardComponents/DashboardCars.vue";
import DashboardCustomers from "@/components/DashboardComponents/DashboardCustomers.vue";
import DashboardReservations from "@/components/DashboardComponents/DashboardRents.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/sign-up",
      name: "Register",
      component: AppRegister,
      meta: { requiresAuth: false, requiresGuest: true }, // Allow access to sign-up page for unauthenticated users
    },
    {
      path: "/sign-in",
      name: "AppLogin",
      component: AppLogin,
      meta: { requiresAuth: false, requiresGuest: true }, // Allow access to sign-in page for unauthenticated users
    },
    {
      path: "/profile",
      name: "AppProfile",
      component: AppProfile,
      meta: { requiresAuth: true }, // Require authentication to access the profile page
    },
    {
      path: "/dashboard",
      name: "AppDashboard",
      component: AppDashboard,
      meta: { requiresAuth: true, requiresAdmin: true }, // Require authentication and admin role for dashboard
      children: [
        {
          path: "",
          name: "DashboardHome",
          component: DashboardHome,
        },
        {
          path: "messages",
          name: "DashboardMessages",
          component: DashboardMessages,
        },
        {
          path: "cars",
          name: "DashboardCars",
          component: DashboardCars,
        },
        {
          path: "customers",
          name: "DashboardCustomers",
          component: DashboardCustomers,
        },
        {
          path: "reservations",
          name: "DashboardReservations",
          component: DashboardReservations,
        },
      ],
    },
    {
      path: "/reservation",
      name: "AppReservation",
      component: AppReservation,
      meta: { requiresAuth: true }, // Require authentication to access the reservation page
    },
    {
      path: "/:catchAll(.*)",
      name: "AppNotFound",
      component: AppNotFound,
    },
  ],
});

// Navigation guard to enforce authentication and role-based access control

router.beforeEach(async (to, from, next) => {
  await store.dispatch("fetchUserData");

  const isAuthenticated =
    store.getters.isVerified && store.getters.userDataLoaded;
  const isAdmin = store.getters.isAdmin;

  // Check if the route requires authentication
  if (to.meta.requiresAuth) {
    // If the user is not authenticated, redirect to the sign-in page
    if (!isAuthenticated) {
      next({ name: "AppLogin" });
    } else {
      // If the route requires admin role and the user is not an admin, redirect to home
      if (to.meta.requiresAdmin && !isAdmin) {
        next({ name: "AppProfile" });
      } else {
        next();
      }
    }
  } else {
    // If the route does not require authentication, allow access
    if (to.meta.requiresGuest && isAuthenticated) {
      next({ name: "AppProfile" });
    } else {
      next();
    }
  }
});

export default router;
