<template>
  <div class="bg-black-dark flex flex-col w-full py-5">
    <div class="flex justify-around items-center">
      <div class="logo">
        <p class="logo text-green-white text-4xl sm:text-5xl">KC</p>
      </div>
      <div class="text-xs text-left text-gray-light">
        <p>+353 85 2577 656</p>
        <p>kathrynokelly@gmail.com</p>
        <p>Dublin, Ireland</p>
      </div>
      <div class="text-xs text-left text-gray-light">
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
