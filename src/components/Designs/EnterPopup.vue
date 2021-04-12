<template>
  <div class="welcomePopup w-full bg-white text-white relative rounded-md">
    <div
      class="flex flex-col items-center justify-around h-full bg-green-dark pt-5 pb-3 rounded-t-md"
    >
      <img class="w-10 h-10" src="https://i.ibb.co/hfdBwLv/cheer.png" />
      <h3 class="uppercase tracking-wider font-bold my-8">Success !</h3>
      <h4 class="pb-3">Welcome {{ popupObject.userName }}</h4>
    </div>

    <p class="text-gray-500 pt-5 px-10">{{ popupObject.message }}</p>
    <div class="w-1/2 pt-3 pb-7 m-auto">
      <button class="btn-green btn-lrg mt-10" @click="enterShop">
        View Shop
      </button>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
export default {
  props: ["popupObject"],
  methods: {
    enterShop() {
      this.$router.push("/shop");
    },
  },
};
</script>

<style scoped>
.welcomePopup {
  min-height: 300px;

  transition: all 2s ease-in-out;
  box-shadow: 10px 10px 51px -3px rgba(49, 48, 48, 0.75);
}
</style>
