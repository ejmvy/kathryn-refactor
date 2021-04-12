<template>
  <div
    class="cartArea absolute top-0 z-10 w-screen h-screen right-0 lg:w-1/4 flex flex-col bg-green-dark mt-0 pb-5"
  >
    <!-- <div class="arrow"></div> -->
    <!-- //v-if='mobileWidth' -->
    <div class="absolute right-3 top-3 cursor-pointer">
      <img
        @click="$emit('closePopup')"
        class="w-4 h-4"
        src="https://i.ibb.co/tmmDGnL/close-x.png"
      />
    </div>
    <div
      class="flex items-center justify-between px-8 py-3 mt-8 border-b border-gray-300"
    >
      <div class="flex">
        <img class="w-5 h-5" src="https://i.ibb.co/vzdx4Vj/cart.png" />
        <div
          class="w-5 h-5 text-xs flex items-center justify-center bg-white rounded-full text-green font-bold relative -top-2"
        >
          {{ getCartLength }}
        </div>
      </div>
      <h5 class="text-white font-bold">Total: {{ getCartTotal }}</h5>
    </div>

    <div class="mt-20 px-5 sm:px-16">
      <h5 v-if="!getCartLength" class="text-white">
        There are no items in your cart
      </h5>
      <div
        class="flex justify-between items-center py-4 border-b border-gray-300"
        v-for="(item, idx) in cartData"
        :key="item"
      >
        <img class="w-20 h-20" :src="item.imageUrlArray[0]" />
        <div class="flex flex-col items-start">
          <label class="text-white font-bold">{{ item.name }}</label>
          <p class="text-gray-300 text-xs">{{ item.price }}</p>
          <p class="text-gray-300 text-xs">{{ item.colourSelected }}</p>
        </div>
        <div class="text-white">{{ item.qty }}</div>
        <img
          class="w-5 h-5 cursor-pointer"
          src="https://i.ibb.co/TKgDyPN/bin.png"
          @click="deleteItemFromCart(item, idx)"
        />
      </div>
    </div>
    <div class="flex justify-center">
      <router-link to="/cart" class="absolute bottom-5">
        <button class="btn-white" :class="{ disable: !getCartLength }">
          View Cart
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartData: [],
      cartTotal: 0,
      totalItems: 12,
    };
  },
  mounted() {
    window.addEventListener("rezise", () => {
      this.windowWidth = window.innerWidth;
    });
  },
  methods: {
    deleteItemFromCart(item) {
      console.log("item to delete:", item);
      this.$store.dispatch("cart/removeFromCart", {
        item: item,
      });
      this.getCartItems();
    },
    getCartItems() {
      const items = this.$store.getters["cart/products"];
      console.log("UPDATED CART ITEMS:");
      console.log(items);
    },
  },
  computed: {
    getCartTotal() {
      return this.$store.getters["cart/totalSum"].toFixed(2);
    },
    getCartLength() {
      return this.$store.getters["cart/quantity"];
    },
    mobileWidth() {
      return this.windowWidth <= 600;
    },
  },
  created() {
    const cartItems = this.$store.getters["cart/products"];
    console.log("CART ITEMS");
    console.log(cartItems[0]);

    this.cartData = cartItems;
  },
};
</script>

<style scoped>
.arrow {
  /* z-index: 10; */
  position: absolute;
  float: right;
  right: 30px;
  top: -15px;
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;

  border-bottom: 15px solid rgba(32, 72, 88, 0.9);
}
.cartArea {
  top: 0 !important;
  position: absolute;
  overflow: hidden;
}

@media screen and (min-width: 12000px) {
  .cartArea {
    height: 600px;
  }
}
</style>
