<template>
  <header class="bg-green-light w-full shadow-xl">
    <div class="flex py-3 px-5 md:px-10 justify-between items-center">
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
        <li class="li-class">
          <router-link v-if="!checkLoggedIn" to="/login">
            <img class="w-5 h-5" src="https://i.ibb.co/pn8FWKn/userIcon.png" />
          </router-link>
          <router-link v-if="checkLoggedIn" to="/userprofile">
            <img class="w-5 h-5" src="https://i.ibb.co/pn8FWKn/userIcon.png" />
          </router-link>
        </li>
        <li class="li-class">
          <a href="#">
            <img
              class="w-6 h-6"
              src="https://i.ibb.co/vzdx4Vj/cart.png"
              @click="openCart()"
            />
          </a>
        </li>
      </nav>
      <nav class="flex md:hidden items-center">
        <li class="list-none mx-4">
          <img class="w-4 h-4" src="https://i.ibb.co/DGCt4tJ/hamburger.png" />
        </li>
        <li class="list-none mx-4">
          <img
            class="w-5 h-5 middleLink"
            src="https://i.ibb.co/pn8FWKn/userIcon.png"
          />
        </li>
        <!-- <li v-if='$store.state.user.userData._id'>
          <router-link to="userprofile">
            <img class='userLogo middleLink' src='../assets/icons/userIcon.png' />
          </router-link>
        </li> -->
        <li class="list-none mx-4">
          <a href="#">
            <img
              class="w-6 h-6"
              src="https://i.ibb.co/vzdx4Vj/cart.png"
              @click="openCart()"
            />
          </a>
        </li>
      </nav>
    </div>
  </header>

  <!-- <div :class="{ cartOpened: cartOpen }">
    <div v-if="cartOpen" class="cartImport">
      <CartPopup @closePopup="openCart()"></CartPopup>
    </div>
  </div> -->
</template>

<script>
// import CartPopup from "../components/views/CartPopup.vue";
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
      console.log(`user logged: `, this.$store.state.user);
    },
  },
  computed: {
    mobileWidth() {
      return this.windowWidth <= 800;
    },
    // checkLoggedIn() {
    //   console.log("LOGGED IN:");
    //   console.log(this.$store.state.user);
    //   return this.$store.state.user.userData._id;
    // },
  },
  components: {
    // CartPopup,
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

.logo {
  font-family: "Megrim", cursive;
}

/* CART POPUP STYLES */
.cartImport {
  position: relative;
  right: -100px;
  opacity: 0;
  transition: right 0.3s, opacity 0.3s;
  z-index: -1;
}

.cartOpened .cartImport {
  right: 0;
  opacity: 1;
  z-index: 3;
}
</style>
