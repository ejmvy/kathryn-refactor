<template>
  <section class="section py-14">
    <TitleDesign :title="titleText"></TitleDesign>
    <div class="imageDisplay mt-10">
      <div v-for="img in imagesToDisplay" :key="img">
        <img class="pic" :src="require(`../../assets/${img}`)" />
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
.imageDisplay {
  display: flex;
  justify-content: space-between;
  width: 90%;
  /* border: 1px solid red; */
  overflow: auto;
}

.pic {
  /* flex: 1; */
  width: 200px;
  height: 150px;
  padding: 0 10px;
}
</style>
