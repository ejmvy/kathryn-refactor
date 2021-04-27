<template>
  <header
    class="w-full bg-green-light flex justify-between px-3 py-4 items-center shadow-2xl"
  >
    <router-link to="/">
      <img
        class="w-5 h-5 cursor-pointer"
        src="https://i.ibb.co/jgk6zTW/house.png"
      />
    </router-link>
    <p class="text-white font-bold">Welcome Kathryn!</p>
    <img
      @click="logoutUser()"
      class="w-5 h-5 cursor-pointer"
      src="https://i.ibb.co/HV3Kzt9/close.png"
    />
  </header>
</template>

<script>
export default {
  data() {
    return {
      openConfigPanel: true,
      openOrderPanel: false,
      openHistoryPanel: false,
      currentIndex: 0,
      back: false,
    };
  },
  methods: {
    logoutUser() {
      this.$store.dispatch("logout");
      this.$router.push("/");
      this.emitter.emit("showNotification", {
        state: true,
        message: "Bye for now",
      });
    },
  },
};
</script>
