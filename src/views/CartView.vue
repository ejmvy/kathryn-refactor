<template>
  <div
    class="md:flex md:absolute w-screen h-screen overflow-hidden bg-green-light md:justify-center md:items-center"
  >
    <div
      class="w-full h-screen overflow-hidden md:w-4/5 md:h-4/5 bg-white shadow-2xl flex flex-col md:flex-row"
    >
      <div v-if="mobileWidth" class="relative right-0 flex justify-end p-2">
        <router-link to="/">
          <img
            class="h-6 w-6 cursor-pointer"
            src="https://i.ibb.co/gTWS0q1/close-grey.png"
          />
        </router-link>
      </div>
      <div class="purchases p-2 pt-0 md:p-5 md:pl-8 overflow-auto">
        <table class="mt-5 w-full" v-if="paymentStep === 1">
          <tr class="pb-10">
            <td class="text-xs uppercase text-left">Product</td>
            <td class="text-xs uppercase">Price</td>
            <td class="text-xs uppercase">Quantity</td>
            <td class="text-xs uppercase">Total</td>
          </tr>
          <div
            class="h-4/5 w-full border-2 border-yellow-400 overflow-y-auto overflow-auto"
          >
            <tr class="cartItem" v-for="(product, idx) in cartItems" :key="idx">
              <td>
                <div class="flex flex-col text-left md:mb-5">
                  <img
                    class="w-full h-20 md:w-20 md:h-20"
                    :src="product.imageUrlArray[0]"
                  />
                  <p class="my-1">{{ product.name }}</p>
                  <div class="text-xs text-gray-500">
                    {{ product.colourSelected }}
                  </div>
                  <div v-if="!mobileWidth" class="text-xs text-gray-500">
                    {{ product._id }}
                  </div>
                </div>
              </td>
              <td class="relative pt-6 text-xs">{{ product.price }}</td>

              <td class="relative pt-6">
                <div class="flex justify-center items-center">
                  <div class="cursor-pointer" @click="minusPrice(product)">
                    <div
                      class="cursor-pointer text-sx text-green-dark mx-3 md:mx-8 w-3 h-0.5 bg-green-light"
                    ></div>
                  </div>
                  <div>{{ product.qty }}</div>
                  <div
                    @click="plusPrice(product)"
                    class="cursor-pointer text-sx text-green-dark mx-3 md:mx-8 font-bold"
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

      <div
        class="buySection relative top-10 md:top-0 bg-green-dark"
        :class="{ topFormat: openBottom }"
      >
        <div
          class="circle absolute -top-10 right-0 m-3 p-4 rounded-full bg-green-dark cursor-pointer z-10"
          @click="openBottom = !openBottom"
        >
          <img
            class="arrow w-5 h-5"
            :class="{ rotateArrow: openBottom }"
            src="https://i.ibb.co/s5zL0XX/Arrowhead-Up-150.png"
          />
        </div>
        <div v-if="!mobileWidth" class="relative right-0 flex justify-end p-2">
          <router-link to="/">
            <img
              class="w-6 h-6 cursor-pointer"
              src="https://i.ibb.co/gTWS0q1/close-grey.png"
            />
          </router-link>
        </div>
        <div class="relative top-1/4 text-white bg-green-dark">
          <div class="text-white">
            <h3 class="font-bold pb-3">Total: {{ getTotal }}</h3>
            <p class="p-3 text-sm">Shipping & Postage Included</p>
          </div>
          <div class="py-4">
            <button
              v-if="paymentStep === 1"
              class="btn-white btn-lrg"
              @click="paymentStep = 2"
            >
              Checkout
            </button>
            <!-- <router-link to="/payment">
              <button
                v-if="paymentStep === 2"
                class="btn-white btn-lrg backwards"
                :disabled="isDisabled"
                :class="{ btnDisabled: !detailsConfirmed }"
              >
                Continue
              </button>
            </router-link> -->
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
      openBottom: false,
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
  min-height: 550px;
  border: 2px solid green;
}

.buySection {
  flex: 1;
  transition: all 1s ease-in-out;
}

.cartItem,
.arrow {
  transition: all 1s ease-in-out;
}

.removeBtn {
  transition: opacity 0.3s;
}
.removeAppear .removeBtn {
  opacity: 1;
}

td {
  /* text-align: center; */
  flex: 1;
}

tr {
  width: 100%;
  display: flex;
  justify-content: space-between;

  font-size: 15px;
}

.circle {
  -webkit-box-shadow: 2px 2px 5px 0px rgb(173, 172, 172);
  -moz-box-shadow: 2px 2px 5px 0px rgb(173, 172, 172);
  box-shadow: 2px 2px 5px 0px rgb(173, 172, 172);
}

.topFormat {
  top: -100px;
}

.rotateArrow {
  transform: rotate(-180deg);
}
</style>
