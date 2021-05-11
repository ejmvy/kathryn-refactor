<template>
  <div
    class="flex flex-col justify-center items-center my-5 md:flex-row w-11/12 md:w-3/4"
  >
    <div class="h-96 w-full md:w-8/12 z-0 shadow-xl">
      <img
        class="w-full h-full"
        :src="require(`../../assets/${displayCollection.img}`)"
      />
      <!-- <img class="reasonImage" src="../../assets/latestDesigns/dish1.jpeg" /> -->
    </div>
    <div
      class="flex flex-col items-center text-center relative -top-10 md:top-0 w-3/4 md:-left-5 p-8 md:flex-1 md:w-40 z-10 bg-white shadow-xl"
    >
      <div class="lineTop">
        <div class="line1 w-48 md:w-36"></div>
        <div class="line2 w-24 mt-3"></div>
        <div class="dot mb-5 mt-3"></div>
      </div>
      <div>
        <h2 class="text-sm font-bold pb-4 md:pb-8 uppercase">
          {{ displayCollection.title }}
        </h2>
        <p class="text-xs">
          {{
            getProductText
              ? displayCollection.shortText
              : displayCollection.longText
          }}
        </p>
        <router-link
          :to="{ name: 'ShowCollection', params: { category: collection } }"
        >
          <button class="btn-green btn-sm mt-8">SHOP NOW</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["displayCollection", "collection"],
  data() {
    return {
      windowWidth: window.innerWidth,
    };
  },
  mounted() {
    window.addEventListener("rezise", () => {
      this.windowWidth = window.innerWidth;
    });
  },
  computed: {
    getProductText() {
      return this.windowWidth <= 600;
    },
  },
};
</script>
