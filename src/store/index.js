import { createStore } from "vuex";

import cartModule from "./modules/cart.js";
import productModule from "./modules/products.js";

export default createStore({
  modules: {
    prods: productModule,
    cart: cartModule,
  },
  state: {
    isLoggedIn: false,
    user: {},
    notification: {
      state: "",
      title: "",
      message: "",
    },
  },
  mutations: {
    login(state, payload) {
      console.log("user logging in...");
      console.log(payload);
      state.user = payload;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = {};
    },
    saveAddress(state, payload) {
      console.log("address to save:");
      console.log(payload);
      state.user.userAddress = payload;
    },
  },
  actions: {
    login: (context, payload) => context.commit("login", payload),
    logout: (context) => context.commit("logout"),
    saveAddress: (context, payload) => context.commit("saveAddress", payload),
  },

  getters: {
    isAuthenticated: (state) => state.isLoggedIn,
    getUserDetails: (state) => state.user,
    // addressDetails: (state) => state.user.addressDetails,
    getAddress: (state) => state.user.userAddress,
    getUserOrders: (state) => state.user.orders,
    getUserKey: (state) => state.user.userKey,
  },
});
