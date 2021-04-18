<template>
  <div class="bg-white mt-3 pb-5">
    <h5 class="uppercase text-xs py-4">Confirm Order</h5>

    <div class="w-full flex flex-col p-3">
      <h5 class="uppercase text-xs font-bold self-start">My Bag</h5>
      <div class="flex w-full overflow-auto py-4">
        <div class="" v-for="item in cartItems" :key="item">
          <img class="pic px-1 w-20 h-16" :src="item.imageUrlArray[0]" />
        </div>
      </div>
      <div class="flex w-full justify-between border-t border-gray-300 pt-3">
        <div class="text-xs">{{ getTotalItems }} items</div>
        <div class="text-xs">€ {{ getItemsAmount }}</div>
      </div>
    </div>

    <div class="bg-gray-200 w-full p-1"></div>

    <div class="w-full flex flex-col p-3">
      <h5 class="uppercase text-xs font-bold self-start">Email Address</h5>
      <div class="text-xs self-start pt-5">{{ userDetails.email }}</div>
    </div>

    <div class="bg-gray-200 w-full p-1"></div>
    <div class="w-full flex flex-col p-3">
      <div class="flex justify-between">
        <h5 class="uppercase text-xs font-bold">Shipping Address</h5>
        <img
          @click="changeAddress()"
          class="w-4 h-4"
          src="https://i.ibb.co/N6vxTqj/pencil-green.png"
        />
      </div>
      <div class="text-xs self-start pt-5">
        {{ userDetails.userAddress.firstName }}
        {{ userDetails.userAddress.lastName }}
      </div>
      <div class="text-xs self-start pt-1">
        {{ userDetails.userAddress.addressLine1 }}
        {{ userDetails.userAddress.addressLine2 }}
      </div>
      <div class="text-xs self-start pt-1">
        {{ userDetails.userAddress.city }}
      </div>
      <div class="text-xs self-start pt-1">
        {{ userDetails.userAddress.postCode }}
      </div>
      <div class="text-xs self-start pt-1">
        {{ userDetails.userAddress.country }}
      </div>
      <div class="text-xs self-start pt-1">
        {{ userDetails.userAddress.phoneNumber }}
      </div>
    </div>

    <div class="bg-gray-200 w-full p-1"></div>

    <div class="w-full flex flex-col p-3">
      <h5 class="uppercase text-xs font-bold self-start">Delivery Info</h5>
      <div class="flex justify-between items-center">
        <div class="flex flex-col">
          <div class="text-xs self-start pt-5">
            Shipped within 3-5 Working Days
          </div>
          <div class="text-xs self-start pt-2">Standard Delivery</div>
          <div class="text-xs self-start pt-2">Expected date: 1 - 2 weeks</div>
        </div>
        <div class="text-sm">€ {{ shippingFee }}</div>
      </div>
    </div>

    <div class="bg-gray-200 w-full p-1"></div>

    <div class="w-full flex justify-between items-center p-3">
      <div class="flex flex-col text-left">
        <h5 class="uppercase text-xs font-bold">Complete Order</h5>
        <p class="text-xs text-gray-500 pt-3">Pay with Stripe</p>
      </div>
      <div class="font-bold">€ {{ getTotalAmount }}</div>
    </div>
    <button class="btn-green btn-lrg mt-4" @click="stripePayment">
      Confirm
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartItems: [],
      userDetails: {},
      shippingFee: 6.99,
      totalAmount: 0,
    };
  },

  methods: {
    stripePayment() {
      const confirmOrder = {
        userId: this.userDetails._id,
        cartTotal: this.getItemsAmount,
        paymentTotal: this.getTotalAmount,
        orderStatus: "Received",
        products: this.cartItems,
      };

      fetch("http://localhost:3000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(confirmOrder),
      })
        .then((res) => {
          console.log("RESPONSE");
          console.log(res);
          return res;
        })
        .then((newOrder) => {
          console.log("payment taken");
          console.log(newOrder);
          this.$store.dispatch("cart/setPaymentStep", 3);
          window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    changeAddress() {
      console.log("change address");
      this.$store.dispatch("cart/setPaymentStep", 1);
    },
    generateOrderNumber() {
      return;
    },
  },

  computed: {
    getTotalItems() {
      return this.$store.getters["cart/quantity"];
    },
    getItemsAmount() {
      //   this.$store.getters["cart/totalSum"].toFixed(2);
      return this.$store.getters["cart/totalSum"].toFixed(2);
    },
    getTotalAmount() {
      const itemsAmount = parseFloat(this.$store.getters["cart/totalSum"]);

      return (parseFloat(this.shippingFee) + itemsAmount).toFixed(2);
    },
  },

  created() {
    this.cartItems = this.$store.getters["cart/products"];
    this.userDetails = this.$store.getters["getUserDetails"];
    console.log("cart and user:");
    console.log(this.userDetails);
    console.log(this.cartItems);
  },
};
</script>

<style scoped>
.pic {
  min-width: 40px;
  /* height: 150px; */
}
</style>
