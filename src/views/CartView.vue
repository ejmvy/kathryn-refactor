<template>
  <div
    class="absolute w-full h-full bg-green-light flex justify-center items-center"
  >
    <div class="w-4/5 h-4/5 bg-white shadow-2xl flex">
      <div v-if="mobileWidth" class="relative right-0 flex justify-end p-2">
        <router-link to="/">
          <img
            class="h-6 w-6 cursor-pointer"
            src="https://i.ibb.co/gTWS0q1/close-grey.png"
          />
        </router-link>
      </div>
      <div class="purchases p-5 pl-8 overflow-hidden">
        <table class="mt-10 w-full" v-if="paymentStep === 1">
          <tr class="pb-10">
            <td class="text-xs uppercase text-left">Product</td>
            <td class="text-xs uppercase text-right">Price</td>
            <td class="text-xs uppercase">Quantity</td>
            <td class="text-xs uppercase">Total</td>
          </tr>
          <div class="cartListArea">
            <tr class="cartItem" v-for="(product, idx) in cartItems" :key="idx">
              <td>
                <div
                  class="flex flex-col text-left mb-5"
                  :class="{ padRight: mobileWidth }"
                >
                  <img class="w-20 h-20" :src="product.imageUrlArray[0]" />
                  <p class="my-1">{{ product.name }}</p>
                  <div class="text-xs text-gray-500">
                    {{ product.colourSelected }}
                  </div>
                  <div v-if="!mobileWidth" class="text-xs text-gray-500">
                    {{ product._id }}
                  </div>
                </div>
              </td>
              <td class="relative pt-6">{{ product.price }}</td>

              <td class="relative pt-6">
                <div class="flex justify-center items-center">
                  <div class="cursor-pointer" @click="minusPrice(product)">
                    <div
                      class="cursor-pointer text-sx text-green-dark mx-8 w-3 h-0.5 bg-green-light"
                    ></div>
                  </div>
                  <div>{{ product.qty }}</div>
                  <div
                    @click="plusPrice(product)"
                    class="cursor-pointer text-sx text-green-dark mx-8 font-bold"
                  >
                    +
                  </div>
                </div>
                <div :class="{ removeAppear: product.qty === 0 }">
                  <div
                    @click="removeItem(product)"
                    class="removeBtn mt-10 text-xs cursor-pointer underline opacity-0"
                  >
                    Remove
                  </div>
                </div>
              </td>
              <td class="relative pt-6">
                {{ (product.price * product.qty).toFixed(2) }}
              </td>
            </tr>
          </div>
          <div
            v-if="cartItems.length > 2"
            class="flex justify-end relative bottom-8"
          >
            <img
              class="w-5 h-5"
              src="https://i.ibb.co/K9bhgv7/down-green.png"
            />
          </div>
        </table>
        <!-- <AddressDetails
          v-if="paymentStep === 2"
          @addressConfirmed="addressDetailsConfirmed"
        ></AddressDetails> -->
      </div>
      <div class="buySection bg-green-dark">
        <div v-if="!mobileWidth" class="relative right-0 flex justify-end p-2">
          <router-link to="/">
            <img
              class="w-6 h-6 cursor-pointer"
              src="https://i.ibb.co/gTWS0q1/close-grey.png"
            />
          </router-link>
        </div>
        <div class="relative top-1/4 text-white">
          <div class="text-white">
            <h3 class="font-bold pb-3">Total: {{ getTotal }}</h3>
            <p class="p-3 text-sm">Shipping & Postage Included</p>
          </div>
          <div class="pt-4">
            <button
              v-if="paymentStep === 1"
              class="btn-white btn-lrg"
              @click="paymentStep = 2"
            >
              Checkout
            </button>
            <router-link to="/payment">
              <button
                v-if="paymentStep === 2"
                class="btn contactBtn backwards"
                :disabled="isDisabled"
                :class="{ btnDisabled: !detailsConfirmed }"
              >
                Continue
              </button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import AddressDetails from "../CartSection/AddressDetails.vue";
export default {
  data() {
    return {
      cartItems: [],
      total: 0,
      isRemoved: false,
      windowWidth: window.innerWidth,
      paymentStep: 1,
      detailsConfirmed: false,
    };
  },
  mounted() {
    window.addEventListener("rezise", () => {
      this.windowWidth = window.innerWidth;
    });
  },
  methods: {
    minusPrice(product) {
      if (product.qty > 0) {
        this.$store.dispatch("cart/decreaseQty", product);
      }
    },
    plusPrice(product) {
      this.$store.dispatch("cart/increaseQty", product);
    },
    removeItem(product) {
      product.isRemoved = true;
      this.$store.dispatch("cart/removeFromCart", {
        item: product,
      });
    },
    addressDetailsConfirmed() {
      console.log("Details Confirmed");
      this.detailsConfirmed = true;
    },
  },
  computed: {
    getTotal: function () {
      var totalValue = 0;
      this.cartItems.forEach((product) => {
        let productTotal = product.price * product.qty;
        totalValue = totalValue + productTotal;
      });
      return totalValue.toFixed(2);
    },
    mobileWidth() {
      return this.windowWidth <= 750;
    },
    isDisabled() {
      return this.detailsConfirmed ? false : true;
    },
  },
  created() {
    this.cartItems = this.$store.getters["cart/products"];
    console.log("cart: ", this.cartItems);
  },
  components: {
    // AddressDetails,
  },
};
</script>

<style scoped>
.purchases {
  flex: 2;
}

.buySection {
  flex: 1;
}

.cartItem {
  transition: all 5s ease-in-out;
}

.padRight {
  margin-right: 30px;
}

.removeBtn {
  transition: opacity 0.3s;
}
.removeAppear .removeBtn {
  opacity: 1;
}

td {
  text-align: center;
  flex: 1;
}

tr {
  width: 100%;
  display: flex;
  justify-content: space-between;
  /* align-items: center; */

  font-size: 15px;
  /* border: 1px solid blue; */
}

.cartListArea {
  /* position: relative; */
  overflow: auto;
  height: 500px !important;
}
</style>
