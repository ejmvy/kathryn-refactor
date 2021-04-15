<template>
  <div class="flex flex-col w-full pt-20 items-center">
    <div class="flex w-1/2 justify-center pb-20">
      <div
        class="circle flex justify-center text-white p-2 bg-green-light rounded-full mx-5 sm:mx-8 cursor-pointer"
        v-for="logo in logos"
        :key="logo"
      >
        <img class="w-7 h-7" :src="logo" />
      </div>
    </div>
    <p class="text-sm leading-10">+353 85 2577 656</p>
    <p class="text-sm leading-10">kathrynokelly@gmail.com</p>
    <p class="text-sm leading-10">RATHGAR, DUBLIN, IRELAND</p>

    <div class="w-full mt-32 border-t-2 border-gray-300">
      <div class="w-full flex justify-between p-2 text-xs">
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
