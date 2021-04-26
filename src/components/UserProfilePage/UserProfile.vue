<template>
  <div class="mainSection h-screen">
    <div class="w-screen h-full">
      <div
        class="bg-green-light w-full flex items-center justify-between p-2 md:p-5 shadow-xl"
      >
        <router-link to="/">
          <img class="w-5 h-5" src="https://i.ibb.co/jgk6zTW/house.png" />
        </router-link>
        <h5 class="text-white uppercase text-xs md:text-xl">My Account</h5>
        <svg
          @click="logoutUser"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="white"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
      </div>

      <transition name="fade" mode="out-in">
        <UserAccountMenu
          v-if="!hideMenu"
          @userSelect="openMenu"
          :userName="userDetails.name"
        ></UserAccountMenu>
      </transition>

      <transition name="fade" mode="out-in">
        <UserOrders
          v-if="menu.userOrders"
          @closeMenu="closeMenuOption"
        ></UserOrders>
      </transition>

      <transition name="fade" mode="out-in">
        <UserMainDetails
          v-if="menu.userDetails"
          @closeMenu="closeMenuOption"
        ></UserMainDetails>
      </transition>

      <transition name="fade" mode="out-in">
        <UserAddress
          v-if="menu.userAddress"
          @closeMenu="closeMenuOption"
        ></UserAddress>
      </transition>
    </div>
  </div>
</template>

<script>
import UserAccountMenu from "./UserAccountMenu.vue";
import UserOrders from "./UserOrders.vue";
import UserAddress from "./UserAddress.vue";
import UserMainDetails from "./UserMainDetails.vue";
export default {
  data() {
    return {
      hideMenu: false,
      menu: {
        userOrders: false,
        userDetails: false,
        userAddress: false,
        userHelp: false,
        userOrderLocation: false,
      },
      userDetails: {},
    };
  },
  methods: {
    logoutUser() {
      this.$store.dispatch("logout");
      this.$router.push("/login");
      this.emitter.emit("showNotification", {
        state: true,
        message: "Bye for now",
      });
    },

    openMenu(path) {
      console.log("user path:" + path);
      for (var key in this.menu) {
        if (key === path) {
          console.log("key: " + this.menu[key]);
          this.hideMenu = true;
          this.menu[key] = true;
        }
      }
    },
    closeMenuOption(path) {
      console.log("path to close: " + path);
      this.menu[path] = false;
      this.hideMenu = false;
    },
  },
  mounted() {
    this.userDetails = this.$store.getters["getUserDetails"];
  },
  components: {
    UserAccountMenu,
    UserOrders,
    UserMainDetails,
    UserAddress,
  },
};
</script>

<style scoped>
.mainSection {
  /* position: absolute;
  /* z-index: 5; 
  width: 100%;
  height: 100%;
  background-color: rgba(32, 72, 88, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden; */
}

.fade-enter {
  /* transform: translateX(10px); */
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-leave-to {
  /* transform: translateX(-10px); */
  opacity: 0;
}
</style>
