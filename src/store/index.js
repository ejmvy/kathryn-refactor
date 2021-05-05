import { createStore } from "vuex";

import cartModule from "./modules/cart.js";
import productModule from "./modules/products.js";
import recentOrders from "./modules/recentOrders.js";

export default createStore({
  modules: {
    prods: productModule,
    cart: cartModule,
    recentOrders: recentOrders,
  },
  state: {
    isLoggedIn: false,
    user: {},
    notification: {
      state: "",
      title: "",
      message: "",
    },
    userKey: "",
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
      state.userKey = "";
    },
    saveAddress(state, payload) {
      console.log("address to save:");
      console.log(payload);
      state.user.userAddress = payload;
    },
    setUserKey(state, payload) {
      state.userKey = payload;
    },
  },
  actions: {
    login: (context, payload) => context.commit("login", payload),
    logout: (context) => context.commit("logout"),
    // setUserKey: (context, payload) => {},
    saveAddress: (context, payload) => context.commit("saveAddress", payload),
    updateUserDetails: ({ dispatch, getters }) => {
      const key = getters["getUserKey"];
      console.log("key: " + key);
      fetch("http://localhost:3000/api/users/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": key,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          dispatch("login", data);
        })
        .catch((e) => {
          console.log(`err ${e}`);
        });
    },
    setKey: (context, payload) => {
      context.commit("setUserKey", payload);
    },
  },

  getters: {
    isAuthenticated: (state) => state.isLoggedIn,
    getUserDetails: (state) => state.user,
    getAddress: (state) => state.user.userAddress,
    getUserOrders: (state) => state.user.orders,
    getUserKey: (state) => state.userKey,
  },
});
