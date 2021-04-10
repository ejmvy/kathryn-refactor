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

      const productInCartIdx = state.items.findIndex(
        (cartItem) => cartItem._id === productData._id
      );
      const productInCart = state.items.find(
        (cartItem) => cartItem._id === productData._id
      );

      console.log(`index:  + ${productInCartIdx}`);
      console.log(productInCart);

      // if (productInCart >= 0) {
      //   if (productInCart.colourSelected === productData.colourSelected) {
      //     state.items;
      //   }
      // }

      productData.qty = 1;

      state.items.push(productData);
      state.qty++;
      state.total += productData.price;
    },
    removeProductFromCart(state, payload) {
      const prodId = payload._id;

      console.log("item: ");
      console.log(payload);
      const productInCart = state.items.find(
        (cartItem) => cartItem._id === prodId
      );
      console.log("index: ");
      console.log(productInCart);
      state.items.splice(productInCart, 1);
      state.qty -= productInCart.qty;

      state.total -= productInCart.price * productInCart.qty;
    },
  },

  actions: {
    addToCart(context, payload) {
      const prodId = payload.id;
      const products = context.rootGetters["prods/products"];
      try {
        const product = products.find((prod) => prod._id === prodId);
        product.colourSelected = payload.colourSelected;
        console.log("color sent: " + product.colourSelected);
        context.commit("addProductToCart", product);
      } catch (e) {
        console.log("api error", e);
      }
    },
    removeFromCart(context, payload) {
      context.commit("removeProductFromCart", payload.item);
    },
  },
  getters: {
    products: (state) => state.items,
    totalSum: (state) => state.total,
    quantity: (state) => state.qty,
  },
};
