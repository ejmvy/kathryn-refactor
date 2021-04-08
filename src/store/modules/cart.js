export default {
  namespaced: true,
  state() {
    return {
      items: [],
      total: 0,
      qty: 0,
    };
  },

  mutations: {
    addProductToCart(state, payload) {
      const productData = payload;

      productData.qty = 1;

      state.items.push(productData);
      state.qty++;
      state.total += productData.price;
    },
    removeProductFromCart(state, payload) {
      const prodId = payload.id;

      const productInCartIndex = state.items.findIndex((cartItem) => {
        cartItem.productId === prodId;
      });

      const prodData = state.items[productInCartIndex];
      state.items.splice(productInCartIndex, 1);
      state.qty -= prodData.qty;
      state.total -= prodData.price * prodData.qty;
    },
  },

  actions: {
    addToCart(context, payload) {
      const prodId = payload.id;
      const products = context.rootGetters["prods/products"];
      try {
        const product = products.find((prod) => prod._id === prodId);
        product.colourSelected = payload.colourSelected;
        context.commit("addProductToCart", product);
      } catch (e) {
        console.log("api error", e);
      }
    },
    removeFromCart(context, payload) {
      context.commit("removeProductFromCart", payload);
    },
  },
  getters: {
    products: (state) => state.items,
    totalSum: (state) => state.total,
    quantity: (state) => state.qty,
  },
};
