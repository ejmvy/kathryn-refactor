<template>
  <section class="section py-14">
    <TitleDesign :title="titleText"></TitleDesign>
    <div class="flex justify-between w-11/12 overflow-auto mt-10">
      <div v-for="img in imagesToDisplay" :key="img">
        <img class="pic px-2" :src="require(`../../assets/${img}`)" />
      </div>
    </div>
  </section>
</template>

<script>
import TitleDesign from "../Designs/TitleDesign.vue";
export default {
  data() {
    return {
      titleText: "Keep In Touch!",
      imagesToDisplay: [
        "instaImages/hands.jpeg",
        "instaImages/class3.jpeg",
        "instaImages/jug.jpeg",
        "instaImages/class2.jpeg",
        "instaImages/jug2.jpeg",
        "latestDesigns/bowl1.jpeg",
        "latestDesigns/mug1.jpeg",
      ],
    };
  },
  components: {
    TitleDesign,
  },
};
</script>

<style scoped>
.pic {
  min-width: 160px;
  height: 150px;
}
</style>
