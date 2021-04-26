<template>
  <div class="w-full">
    <transition-group name="fade" tag="div" mode="out-in">
      <div v-for="i in [currentIndex]" :key="i">
        <img class="imgMain w-full h-80 relative shadow-xl" :src="currentImg" />
      </div>
    </transition-group>
    <div class="flex justify-center relative -top-12">
      <div
        class="imageBtn flex justify-center items-center w-10 h-10 rounded-full p-3"
      >
        <div class="prev text-xl" @click="prev">&#10094;</div>
      </div>
      <div class="mx-10"></div>
      <div
        class="imageBtn flex justify-center items-center w-10 h-10 rounded-full p-3"
      >
        <div class="next text-xl" @click="next">&#10095;</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Slider",
  props: ["images"],
  data() {
    return {
      timer: null,
      currentIndex: 0,
    };
  },

  mounted: function () {
    // this.startSlide();
  },

  methods: {
    // startSlide: function () {
    //   this.timer = setInterval(this.next, 5000);
    // },

    next: function () {
      this.currentIndex += 1;
    },
    prev: function () {
      this.currentIndex -= 1;
    },
  },

  computed: {
    currentImg: function () {
      if (this.images) {
        return this.images[Math.abs(this.currentIndex) % this.images.length];
      }
      return "";
    },
  },
};
</script>

<style scoped>
.imgMain {
  transition: all 0.5s ease-in-out;
}
.imageBtn {
  transition: all 0.5s ease-in-out;
  z-index: 3;
  cursor: pointer;
  /* position: relative; */
}

.imageBtn:hover,
.imageBtn:focus {
  background: white;
  opacity: 0.7;
}

.fade-enter-active,
.fade-leave-active {
  /* transition: all 0.9s ease; */
  overflow: hidden;
  /* visibility: visible; */
  position: absolute;
  /* width: 100%; */
  opacity: 1;
}

.fade-enter,
.fade-leave-to {
  visibility: hidden;
  /* width: 100%; */
  opacity: 0;
}

.slide-fade-enter {
  transform: translateX(10px);
  opacity: 0;
  visibility: hidden;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s ease;
  overflow: hidden;
  position: absolute;
}

.slide-fade-leave-to {
  transform: translateX(-10px);
  opacity: 0;
}
/*
img {
  height: 600px;
  width: 100%;
} */

/* .prev,
.next {
  cursor: pointer;
  position: absolute;
  top: 40%;
  width: auto;
  padding: 16px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.7s ease;
  border-radius: 0 4px 4px 0;
  text-decoration: none;
  user-select: none;
  z-index: 5;
} */
/*
.next {
  right: 0;
}

.prev {
  left: 0;
} 

.prev:hover,
.next:hover {
  background-color: rgba(0, 0, 0, 0.9); */
/* } */

/* // https://www.digitalocean.com/community/tutorials/vuejs-create-image-slider */
</style>
