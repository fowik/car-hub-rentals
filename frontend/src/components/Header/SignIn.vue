<template>
  <div>
    <ul class="navbar-nav">
      <li class="nav-item" v-if="isVerified && !userDataLoaded">
        <router-link to="/sign-up" class="nav-link"><fa icon="sign-in" class="fs-6" /> Sign up</router-link>
      </li>
      <li class="nav-item">
        <router-link
          to="/dashboard"
          class="nav-link"
          :class="{ active: $route.path === '/dashboard' }"
          v-if="isAdmin && userDataLoaded"
          ><fa icon="user-secret" class="fs-6" /> Dashboard
        </router-link>
      </li>
      <li class="nav-item" v-if="isVerified && userDataLoaded">
        <router-link to="/profile" class="nav-link"
          ><fa icon="user-circle" class="fs-6" /> Profile</router-link
        >
      </li>
      <li class="nav-item" v-if="isVerified && userDataLoaded">
        <router-link to="" class="nav-link" disabled
          >Balance: {{ this.balance }}€</router-link
        >
      </li>
      <li class="nav-item" v-if="isVerified && userDataLoaded">
        <router-link to="/" class="nav-link" @click="signOut"
          ><fa icon="sign-out" class="fs-6" /> Sign out</router-link
        >
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { db, getCurrentUser } from "@/firebase/firebase";
import { onValue, ref } from "firebase/database";
export default {
  name: "SignIn",
  data() {
    return {
      balance: 0,
    };
  },
  computed: {
    ...mapGetters(["isVerified", "isAdmin", "userDataLoaded"]),
  },
  created() {
    this.fetchUserData();
  },
  watch: {
    userDataLoaded(newVal) {
      if (newVal && this.isVerified) {
        this.getUserBalance();
      }
    },
  },
  methods: {
    ...mapActions(["fetchUserData", "signOut"]),

    async getUserBalance() {
      const user = await getCurrentUser();
      const userRef = ref(db, `users/${user.id}`);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        this.balance = parseFloat(data.balance).toFixed(2);
      });
    },
    async signOut() {
      this.balance = 0;
      await this.$store.dispatch("signOut");
    },
  },
};
</script>
