<template>
  <div>
    <div class="bg-white px-3 py-4 flex w-full justify-between items-center">
      <img
        @click="closeMenu()"
        class="w-5 h-5 transform rotate-90 curos"
        src="https://i.ibb.co/dQxfSHq/down.png"
      />
      <p class="uppercase text-sm tracking-wider">My Orders</p>
      <div class="w-5 h-5"></div>
    </div>
    <div class="bg-gray-200 w-full p-1"></div>

    <div class="md:flex md:flex-col md:w-2/3 md:m-auto">
      <div class="mt-10" v-if="!userOrders.length">
        <p class="text-xs text-gray-500">There are no orders to show</p>
        <button class="btn-green btn-sm mt-10">Start Shopping now!</button>
      </div>

      <div>
        <div class="w-full mt-4" v-for="order in userOrders" :key="order">
          <div class="flex items-center px-3">
            <div class="labelxs mr-10">Status:</div>
            <div>Processing..</div>
          </div>
          <div class="w-full h-0.5 bg-gray-200 my-2"></div>
          <div
            class="w-full mt-3 h-24 sm:h-32 flex justify-center overflow-auto"
          >
            <div
              class="h-24 w-24 sm:h-32 sm:w-32 mx-2"
              v-for="product in order.products"
              :key="product"
            >
              <img class="h-24 w-24 mx-2" :src="product.imageUrlArray[0]" />
            </div>
          </div>
          <div class="flex flex-col items-start pl-8">
            <div class="flex mt-5 items-center">
              <div class="labelxs mr-5">Total:</div>
              <p class="text-sm">€ {{ order.paymentTotal }}</p>
            </div>
            <div class="flex mt-1 items-center">
              <div class="labelxs mr-5">Order No:</div>
              <p class="text-sm">{{ order.orderRef }}</p>
            </div>
            <div class="flex mt-1 items-center">
              <div class="labelxs mr-5">Order Date:</div>
              <p class="text-sm">
                {{ convertDate(order.orderDate) }}
              </p>
            </div>
          </div>

          <button class="mt-10 btn-green btn-lrg">View Order</button>
          <div class="bg-gray-200 w-full p-1 my-5"></div>
        </div>
      </div>
    </div>
    <div class="w-full relative bottom-0 border-t-2 border-gray-300">
      <div class="w-full flex justify-between p-2 text-xs">
        <p>@2021 KC</p>
        <p>Designed by EJ</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userOrders: [],
    };
  },
  methods: {
    closeMenu() {
      this.$emit("closeMenu", "userOrders");
    },
    convertDate(orderDate) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(orderDate).toLocaleDateString(undefined, options);
    },
  },

  created() {
    this.userOrders = this.$store.getters["getUserOrders"];
    console.log("user orders");
    console.log(this.userOrders);
  },
};
</script>
