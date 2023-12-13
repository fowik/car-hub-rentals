import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import NotFound from "../views/NotFound.vue";
import Profile from "../views/Profile.vue";
import Logout from "../views/Logout.vue";
import ControlPanel from "../views/ControlPanel.vue";
import ControlPanelUsers from "../views/ControlPanelUsers.vue";
import ControlPanelCars from "../views/ControlPanelCars.vue";
import Map from "../views/Map.vue";
import Reservation from "../views/Reservation.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/profile/logout",
    name: "Logout",
    component: Logout,
  },
  {
    path: "/control-panel",
    name: "ControlPanel",
    component: ControlPanel,
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
  },
  {
    path: "/control-panel/users",
    name: "ControlPanelUsers",
    component: ControlPanelUsers,
  },
  {
    path: "/control-panel/cars/",
    name: "ControlPanelCars",
    component: ControlPanelCars,
  },
  {
    path: "/map",
    name: "Map",
    component: Map,
  },
  {
    path: "/reservation",
    name: "Reservation",
    component: Reservation,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
