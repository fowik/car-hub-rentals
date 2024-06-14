<template>
  <div class="col-auto col-md-0 col-xl-0 px-sm-2 px-0 pb-0 bg-dark">
    <div
      class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2"
    >
      <ul
        class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-center fs-4"
        id="menu"
      >
        <li class="d-none">
          <span
            class="d-inline-block"
            tabindex="0"
            data-bs-toggle="popover"
            data-bs-placement="right"
            data-bs-custom-class="fw-semibold fs-5"
            data-bs-trigger="hover"
            data-bs-content="Home"
          >
            <router-link
              to="/#"
              class="nav-link align-middle px-0 link-primary"
              disabled
            >
              <fa icon="fa-map-marker" />
            </router-link>
          </span>
        </li>
        <li>
          <span
            class="d-inline-block"
            tabindex="0"
            data-bs-toggle="popover"
            data-bs-placement="right"
            data-bs-custom-class="fw-semibold fs-5"
            data-bs-trigger="hover"
            data-bs-content="Dashboard"
          >
            <router-link
              to="/dashboard"
              class="nav-link align-middle px-0 link-primary"
            >
              <fa icon="tachometer" />
            </router-link>
          </span>
        </li>
        <li>
          <span
            class="d-inline-block"
            tabindex="0"
            data-bs-toggle="popover"
            data-bs-placement="right"
            data-bs-custom-class="fw-semibold fs-5"
            data-bs-trigger="hover"
            data-bs-content="Comments"
          >
            <router-link
              to="/dashboard/messages"
              class="nav-link align-middle px-0 link-primary position-relative"
            >
              <span
                class="position-absolute start-100 translate-middle badge rounded-pill bg-danger"
                style="font-size: 0.75rem"
              >
                {{ comments }}
              </span>
              <fa icon="message" />
            </router-link>
          </span>
        </li>
        <li>
          <span
            class="d-inline-block"
            tabindex="0"
            data-bs-toggle="popover"
            data-bs-placement="right"
            data-bs-custom-class="fw-semibold fs-5"
            data-bs-trigger="hover"
            data-bs-content="Cars"
          >
            <router-link
              to="/dashboard/cars"
              class="nav-link align-middle px-0 link-primary"
            >
              <fa icon="car" />
            </router-link>
          </span>
        </li>
        <li>
          <span
            class="d-inline-block"
            tabindex="0"
            data-bs-toggle="popover"
            data-bs-placement="right"
            data-bs-custom-class="fw-semibold fs-5"
            data-bs-trigger="hover"
            data-bs-content="Customers"
          >
            <router-link
              to="/dashboard/customers"
              class="nav-link align-middle px-0 link-primary"
            >
              <fa icon="users" />
            </router-link>
          </span>
        </li>
        <li>
          <span
            class="d-inline-block"
            tabindex="0"
            data-bs-toggle="popover"
            data-bs-placement="right"
            data-bs-custom-class="fw-semibold fs-5"
            data-bs-trigger="hover"
            data-bs-content="Rentals"
          >
            <router-link
              to="/dashboard/reservations"
              class="nav-link align-middle px-0 link-primary"
            >
              <fa icon="ticket" />
            </router-link>
          </span>
        </li>
      </ul>
      <hr />
    </div>
  </div>
</template>

<script>
import { db } from "@/firebase/firebase";
import { ref, onValue } from "firebase/database";

import bootstrap from "bootstrap/dist/js/bootstrap.bundle.js";

export default {
  name: "DashboardSidebarComponent",
  data() {
    return {
      comments: "",
    };
  },
  mounted() {
    this.initPopovers();
    this.fetchComments();
  },
  methods: {
    initPopovers() {
      const popoverTriggerList = document.querySelectorAll(
        '[data-bs-toggle="popover"]'
      );
      popoverTriggerList.forEach((popoverTriggerEl) => {
        new bootstrap.Popover(popoverTriggerEl);
      });
    },
    async fetchComments() {
      // fetch comments that are Active
      const commentsRef = ref(db, "messages");
      onValue(commentsRef, (snapshot) => {
        const data = snapshot.val();
        let total = 0;
        for (const key in data) {
          if (data[key].status === "Active") {
            total++;
          }
        }

        if (total > 99) {
          this.comments = "99+";
        } else {
          this.comments = total.toString();
        }
      });
    },
  },
};
</script>

<style scoped>
.bg-dark {
  background-color: rgba(0, 0, 0, 0.5) !important;
}

.custom-popover {
  --bs-popover-max-width: 200px;
  --bs-popover-border-color: var(--bd-violet-bg);
  --bs-popover-header-bg: var(--bd-violet-bg);
  --bs-popover-header-color: var(--bs-white);
  --bs-popover-body-padding-x: 1rem;
  --bs-popover-body-padding-y: 0.5rem;
}
</style>
