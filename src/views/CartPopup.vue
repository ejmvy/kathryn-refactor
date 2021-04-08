<template>
  <div
    class="cartArea absolute top-0 z-10 w-screen h-screen bg-green-dark mt-0 flex flex-col pb-5"
  >
    <div class="arrow"></div>
    <!-- //v-if='mobileWidth' -->
    <div class="absolute right-3 top-3 cursor-pointer">
      <img
        @click="$emit('closePopup')"
        class="w-4 h-4"
        src="https://i.ibb.co/tmmDGnL/close-x.png"
      />
    </div>
    <div
      class="flex items-center justify-between px-8 py-3 mt-6 border-b border-gray-300"
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

    <div class="mt-5 px-5">
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
    <router-link to="/cart">
      <button class="btn-white">View Cart</button>
    </router-link>
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
      //idx
      console.log("item to delete:", item._id);
      //   fetch(`http://localhost:3000/api/cart/${item._id}`, {
      //     method: "DELETE",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   });
      //   this.cartData.splice(idx, 1);
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
</style>
