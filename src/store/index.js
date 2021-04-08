import { createStore } from "vuex";

import cartModule from "./modules/cart.js";
import productModule from "./modules/products.js";

export default createStore({
  modules: {
    prods: productModule,
    cart: cartModule,
  },
  state: {},
  mutations: {},
  actions: {},
});
