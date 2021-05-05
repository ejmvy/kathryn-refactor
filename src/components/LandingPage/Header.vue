<template>
  <header class="absolute bg-green-light w-full">
    <div class="flex py-3 px-5 md:px-10 justify-between items-center shadow-xl">
      <router-link class="logo text-3xl text-white" to="/">{{
        mobileWidth ? shortTitle : longTitle
      }}</router-link>
      <nav class="hidden items-center md:flex">
        <li class="li-class">
          <router-link to="/">Home</router-link>
        </li>
        <li class="li-class">
          <router-link to="/shop">Shop</router-link>
        </li>
        <li class="li-class">
          <router-link to="/contact">Contact</router-link>
        </li>
        <li class="li-class">
          <a href="#">Gallery</a>
        </li>
        <li class="li-class noUnderline">
          <router-link :to="checkLoggedIn ? '/userprofile' : '/login'">
            <img class="w-5 h-5" src="https://i.ibb.co/pn8FWKn/userIcon.png" />
          </router-link>
        </li>
        <li class="li-class cursor-pointer noUnderline hover:no-underline">
          <div class="flex hover:no-underline">
            <img
              class="w-6 h-6"
              src="https://i.ibb.co/vzdx4Vj/cart.png"
              @click="openCart()"
            />
            <div
              v-if="getCartLength"
              class="w-5 h-5 text-xs flex items-center justify-center bg-white rounded-full text-green-light font-bold relative -top-2"
            >
              {{ getCartLength }}
            </div>
          </div>
        </li>
      </nav>

      <!-- MOBILE NAV -->
      <nav class="flex md:hidden items-center">
        <div class="mx-4">
          <img class="w-4 h-4" src="https://i.ibb.co/DGCt4tJ/hamburger.png" />
        </div>
        <div class="flex md:hidden items-center">
          <router-link :to="checkLoggedIn ? '/userprofile' : '/login'">
            <img
              class="w-5 h-5 middleLink"
              src="https://i.ibb.co/pn8FWKn/userIcon.png"
            />
          </router-link>
        </div>
        <div class="ml-4">
          <div class="flex cursor-pointer">
            <img
              class="w-6 h-6"
              src="https://i.ibb.co/vzdx4Vj/cart.png"
              @click="openCart()"
            />
            <div
              v-if="getCartLength"
              class="w-5 h-5 text-xs flex items-center justify-center bg-white rounded-full text-green font-bold relative -top-2"
            >
              {{ getCartLength }}
            </div>
          </div>
        </div>
      </nav>
    </div>
  </header>

  <transition name="slide">
    <div v-if="cartOpen" class="cartImport">
      <CartPopup @closePopup="openCart()"></CartPopup>
    </div>
  </transition>
</template>

<script>
import CartPopup from "../../views/CartPopup.vue";
export default {
  data() {
    return {
      cartOpen: false,
      windowWidth: window.innerWidth,
      longTitle: "Ceramics By Kathryn",
      shortTitle: "KC",
    };
  },
  mounted() {
    window.addEventListener("rezise", () => {
      this.windowWidth = window.innerWidth;
    });
  },
  methods: {
    openCart() {
      this.cartOpen = !this.cartOpen;
    },
    showUser() {
      // console.log(`user logged: `, this.$store.state.user);
    },
  },
  computed: {
    mobileWidth() {
      return this.windowWidth <= 800;
    },
    checkLoggedIn() {
      console.log(`LOGGED IN: ${this.$store.getters.isAuthenticated}`);
      return this.$store.getters.isAuthenticated;
    },
    getCartLength() {
      return this.$store.getters["cart/quantity"];
    },
  },
  components: {
    CartPopup,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
li {
  border-bottom: 1px solid transparent;
  transition: all 0.5s ease;
}

li:hover {
  border-bottom: 1px solid white;
  color: #eaeaea;
}

header {
  z-index: 1;
}

/* CART POPUP STYLES */
.cartImport {
  position: relative;
  right: 0;
  top: 0;
  transition: all 0.5s ease-in-out;
}

.slide-enter,
.slide-enter-active,
.slide-leave-active {
  right: -100%;
}

.noUnderline:hover {
  text-decoration: none !important;
}
</style>
