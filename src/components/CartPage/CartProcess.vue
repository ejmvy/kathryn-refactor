<template>
  <div
    class="md:flex md:absolute w-screen h-screen bg-green-light md:justify-center md:items-center"
  >
    <div
      class="w-full h-screen md:w-4/5 md:h-4/5 bg-white shadow-2xl flex flex-col items-center"
    >
      <div
        class="relative w-full flex justify-between items-center p-2 bg-green-light"
      >
        <router-link class="logo text-3xl text-white" to="/">KC</router-link>
        <div class="flex">
          <img class="w-6 h-6" src="https://i.ibb.co/vzdx4Vj/cart.png" />
          <div
            class="w-5 h-5 text-xs flex items-center justify-center bg-white rounded-full text-green font-bold relative -top-2"
          >
            {{ getCartLength }}
          </div>
        </div>
      </div>

      <div class="flex justify-between w-4/5 pt-2 py-3">
        <div class="flex flex-col items-center w-20">
          <div class="circleProgress progressCompleted">1</div>
          <div class="text-xxs mt-3 uppercase">Sign In</div>
        </div>
        <div class="w-20 h-0.5 bg-green-dark mt-3"></div>
        <div class="flex flex-col items-center w-20">
          <div
            class="circleProgress"
            :class="[
              getPaymentStep == 2 || getPaymentStep == 3
                ? 'progressCompleted'
                : 'progressTodo',
            ]"
          >
            2
          </div>
          <div class="text-xxs mt-3 uppercase">Address Details</div>
        </div>
        <div class="w-20 h-0.5 bg-green-dark mt-3"></div>
        <div class="flex flex-col items-center w-20">
          <div
            class="circleProgress"
            :class="[
              getPaymentStep == 3 ? 'progressCompleted' : 'progressTodo',
            ]"
          >
            3
          </div>
          <div class="text-xxs mt-3 uppercase">Confirm Order</div>
        </div>
      </div>
      <div class="w-full bg-gray-200">
        <div class="w-full">
          <AddressDetails v-if="getPaymentStep == 1"> </AddressDetails>
          <ConfirmOrder v-if="getPaymentStep == 2"></ConfirmOrder>
          <OrderConfirmation v-if="getPaymentStep == 3"></OrderConfirmation>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddressDetails from "./AddressDetails.vue";
import ConfirmOrder from "./ConfirmOrder.vue";
import OrderConfirmation from "./OrderConfirmation.vue";

export default {
  data() {
    return {
      // paymentStep: 1,
    };
  },

  computed: {
    getCartLength() {
      return this.$store.getters["cart/quantity"];
    },

    getPaymentStep() {
      const paymentStep = this.$store.getters["cart/paymentStep"];
      console.log("STEP: " + paymentStep);
      return paymentStep;
    },
  },
  components: {
    AddressDetails,
    ConfirmOrder,
    OrderConfirmation,
  },
};
</script>
