export default {
  namespaced: true,
  state() {
    return {
      items: [],
      total: 0,
      qty: 0,
      paymentStep: 0,
    };
  },

  mutations: {
    addProductToCart(state, payload) {
      const productData = payload;
      const prodId = payload._id;

      const productInCartIdx = state.items.findIndex(
        (cartItem) =>
          cartItem._id === prodId &&
          cartItem.colourSelected === productData.colourSelected
      );

      if (productInCartIdx >= 0) {
        state.items[productInCartIdx].qty++;
      } else {
        state.items.push(productData);
      }

      state.qty++;
      state.total += productData.price;
    },
    removeProductFromCart(state, payload) {
      const prodId = payload._id;

      console.log("item: ");
      console.log(payload);

      const productInCartIdx = state.items.findIndex(
        (cartItem) =>
          cartItem._id === prodId &&
          cartItem.colourSelected === payload.colourSelected
      );
      const productInCart = state.items.find(
        (cartItem) =>
          cartItem._id === prodId &&
          cartItem.colourSelected === payload.colourSelected
      );

      console.log("index1: " + productInCartIdx);
      state.items.splice(productInCartIdx, 1);
      state.qty -= productInCart.qty;
      state.total -= productInCart.price * productInCart.qty;
    },

    increaseQty(state, payload) {
      const prodId = payload._id;
      const productInCartIdx = state.items.findIndex(
        (cartItem) =>
          cartItem._id === prodId &&
          cartItem.colourSelected === payload.colourSelected
      );

      state.items[productInCartIdx].qty++;
      state.qty++;
      state.total += state.items[productInCartIdx].price;
    },
    decreaseQty(state, payload) {
      const prodId = payload._id;
      const productInCartIdx = state.items.findIndex(
        (cartItem) =>
          cartItem._id === prodId &&
          cartItem.colourSelected === payload.colourSelected
      );

      state.items[productInCartIdx].qty--;
      state.qty--;
      state.total -= state.items[productInCartIdx].price;
    },

    increasePaymentStep(state) {
      state.paymentStep++;
    },
  },

  actions: {
    addToCart(context, payload) {
      const prodId = payload.id;
      const products = context.rootGetters["prods/products"];
      try {
        const product = products.find((prod) => prod._id == prodId);
        const newProduct = { ...product };
        newProduct.colourSelected = payload.colourSelected;
        newProduct.qty = payload.qty ? payload.qty : 1;
        console.log("color sent: " + newProduct.colourSelected);
        context.commit("addProductToCart", newProduct);
      } catch (e) {
        console.log("api error", e);
      }
    },
    removeFromCart(context, payload) {
      context.commit("removeProductFromCart", payload.item);
    },
    increaseQty(context, payload) {
      context.commit("increaseQty", payload);
    },
    decreaseQty(context, payload) {
      context.commit("decreaseQty", payload);
    },
    increasePaymentStep(context) {
      context.commit("increasePaymentStep");
    },
  },
  getters: {
    products: (state) => state.items,
    totalSum: (state) => state.total,
    quantity: (state) => state.qty,
    paymentStep: (state) => state.paymentStep,
  },
};
