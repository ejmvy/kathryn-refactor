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
  },
  actions: {
    login: (context, payload) => context.commit("login", payload),
    logout: (context) => context.commit("logout"),
  },

  getters: {
    isAuthenticated(state) {
      return state.isLoggedIn;
    },
  },
});
