<template>
  <div class="bg-green-dark flex flex-col w-full pt-10">
    <div
      class="flex flex-col sm:flex-row justify-between items-center sm:px-20 lg:w-3/4 lg:m-auto"
    >
      <div class="logo">
        <img class="h-24 w-24" src="https://i.ibb.co/wBkvvKz/owl.png" />
      </div>

      <div class="footerCol">
        <div class="uppercase text-gray-500 font-bold">About</div>
        <p>Home</p>
        <p>FAQ's</p>
        <p>Get in Touch</p>
      </div>
      <div class="footerCol">
        <div class="uppercase text-gray-500 font-bold">Products</div>
        <p>How It Works</p>
        <p>Shipping Info</p>
        <p>Returns</p>
      </div>

      <div class="footerCol">
        <div class="uppercase text-gray-500 font-bold">Contact</div>
        <p>+353 85 2577 656</p>
        <p>kathrynokelly@gmail.com</p>
        <p>Rathgar, Dublin, Ireland</p>
      </div>
    </div>

    <div class="flex justify-between m-auto w-1/3 my-12">
      <div v-for="icon in logos" :key="icon">
        <img :src="icon" class="w-7 h-7 cursor-pointer" />
      </div>
    </div>
    <div class="w-full border-t border-gray-500">
      <div class="w-full flex justify-between p-2 text-xs text-gray-200">
        <p>@2021 {{ getfooterText ? shortName : longName }}</p>
        <p>Designed by EJ</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logos: [
        "https://i.ibb.co/BjyZdsG/insta-Logo.png",
        "https://i.ibb.co/FDkCfv4/fb-f.png",
        "https://i.ibb.co/xmwsQMm/etsy2.png",
      ],
      windowWidth: window.innerWidth,
      longName: "Kathryn Ceramics",
      shortName: "KC",
    };
  },
  mounted() {
    window.addEventListener("rezise", () => {
      this.windowWidth = window.innerWidth;
    });
  },
  computed: {
    getfooterText() {
      return this.windowWidth <= 600;
    },
  },
};
</script>

<style scoped>
.circle {
  transition: all 0.2s ease-in-out;
  min-width: 45px;
}
.circle:hover {
  transform: scale(1.05);
}
</style>
