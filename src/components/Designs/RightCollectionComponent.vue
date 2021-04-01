<template>
  <div
    class="flex flex-col justify-center items-center my-5 md:flex-row w-11/12 md:w-3/4"
  >
    <div
      class="flex flex-col order-last md:order-first items-center text-center relative -top-10 md:top-0 w-3/4 md:-right-3 p-8 md:flex-1 md:w-40 z-10 bg-white shadow-2xl"
    >
      <div class="lineTop">
        <div class="line1 w-48 md:w-36"></div>
        <div class="line2 w-24 mt-3"></div>
        <div class="dot mb-8 mt-3"></div>
      </div>
      <div class="text-sm">
        <h2 class="font-bold pb-5 md:pb-10 uppercase">
          {{ displayCollection.title }}
        </h2>
        <p>
          {{
            getProductText
              ? displayCollection.shortText
              : displayCollection.longText
          }}
        </p>
        <!-- <router-link
          :to="{ name: 'ShowCollection', params: { category: collection } }"
        >
          <button class="btn">SHOP NOW</button>
        </router-link> -->
      </div>
    </div>
    <div class="h-96 w-full md:w-8/12 z-0 shadow-xl">
      <img
        class="w-full h-full"
        :src="require(`../../assets/${displayCollection.img}`)"
      />
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

<style scoped>
h2 {
  padding-bottom: 10px;
}
.reason {
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.reason .picture {
  width: 60%;
  height: 400px;
  flex: 2;
}
.reason .picture .reasonImage {
  width: 100%;
  height: 100%;
}
.reason .reasonText {
  position: relative;
  left: 50px;
  flex: 1;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: white;
  box-shadow: 0 5px 15px #ccc;
}

.textSection {
  font-size: 15px;
}

button {
  margin-top: 12px;
}

@media screen and (max-width: 900px) {
  .reason {
    width: 60%;
    flex-direction: column;
    /* margin-right: 5%; */
  }
  .reason .reasonText {
    left: 0;
    order: 1;
    top: -70px;
    width: 80%;
  }
  .reason .picture {
    width: 100%;
    order: 0;
    height: 300px;
  }
}
@media screen and (max-width: 700px) {
  .reason {
    width: 90%;
    margin: 0;
  }
}

@media screen and (max-width: 400px) {
  .reason .reasonText {
    width: 90%;
  }
}
</style>
