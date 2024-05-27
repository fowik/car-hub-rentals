import { createStore } from "vuex";

import { getCurrentUser } from "@/firebase/firebase";
import { signOutUser } from "@/firebase/Authentication/SignOut";

export default createStore({
  state: {
    userData: null,
    isLoading: false,
  },
  mutations: {
    setUserData(state, userData) {
      state.userData = userData;
    },
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
  },
  actions: {
    async fetchUserData({ commit }) {
      try {
        const newUserData = await getCurrentUser();
        commit("setUserData", newUserData);
        return newUserData;
      } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
      }
    },
    async signOut({ commit }) {
      try {
        await signOutUser();
        commit("setUserData", null);
      } catch (error) {
        console.error("Error signing out:", error);
      }
    },
    setIsLoading({ commit }, isLoading) {
      commit("setIsLoading", isLoading);
    },
  },
  getters: {
    balance: (state) => state.userData?.balance ?? 0,
    isVerified: (state) => () => state.userData?.isVerified ?? false,
    isAdmin: (state) => state.userData !== null && state.userData.isAdmin,
    userDataLoaded: (state) => state.userData !== null,
    isLoading: (state) => state.isLoading,
  },
});
