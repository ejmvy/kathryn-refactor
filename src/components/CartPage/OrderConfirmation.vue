<template>
  <div class="bg-white mt-3 pb-5">
    <div class="bg-white mt-3 p-3">
      <h5 class="uppercase text-xs pb-4">Thank you for your order</h5>
      <p class="text-xs text-gray-400 pt-3">
        Please check your inbox, as a confirmation email is on the way
      </p>
      <div class="text-left mt-10">
        <div class="flex flex-col">
          <div class="label">Order Total</div>
          <p class="text-xs">€ 115.40</p>
        </div>

        <div class="flex flex-col mt-5">
          <div class="label">Order Reference</div>
          <p class="text-xs">124XH4239UB</p>
        </div>

        <div class="flex flex-col mt-5">
          <div class="label">Delivery</div>
          <p class="text-xs">Delivered on or before Monday 26th April 2021</p>
        </div>

        <div class="flex flex-col mt-5">
          <div class="label">Order Status</div>
          <p class="text-xs">Received</p>
        </div>
      </div>
    </div>

    <div class="bg-gray-200 w-full p-1"></div>

    <div class="bg-white h-11/12 mt-5">
      <h5 class="uppercase text-xs font-bold text-left pl-3 pb-3">My Items</h5>
      <div
        v-for="(product, idx) in cartItems"
        :key="idx"
        class="w-full h-36 flex flex-col justify-center border-b border-gray-300 px-3 py-4"
      >
        <div class="flex h-36 items-center justify-between">
          <div class="w-24 h-28">
            <img class="h-28 w-24" :src="product.imageUrlArray[0]" />
          </div>
          <div class="itemDesc flex flex-col items-center justify-between px-8">
            <div class="flex items-center justify-between w-full pb-4">
              <div class="text-gray-500">{{ product.name }}</div>
              <div class="text-xs font-bold">{{ product.price }}</div>
            </div>
            <div class="text-gray-400 text-xs">{{ product._id }}</div>
            <div class="flex items-center pt-3">
              <div class="text-xs">{{ product.colourSelected }}</div>
              <div class="h-4 w-0.5 bg-gray-200 mx-5"></div>
              <div class="text-xs">Qty {{ product.qty }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <router-link to="/shop">
      <button class="btn-green btn-lrg mt-10">Continue Shopping</button>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartItems: [],
      user: [],
    };
  },
  created() {
    this.cartItems = this.$store.getters["cart/products"];
    this.user = this.$store.getters["getUserDetails"];

    console.log("USER DETAILS: ", this.user);
  },
};
</script>

<style scoped>
.itemDesc {
  flex: 2;
}
</style>
