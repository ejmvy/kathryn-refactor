<template>
  <div
    class="banner absolute flex items-center top-5 right-5 py-3 px-6 text-left rounded-sm bg-white shadow-xl"
  >
    <img
      class="w-6 h-6 mr-5"
      :src="[
        notificationObj.state
          ? 'https://i.ibb.co/jTG9xf1/Submit-01-250.png'
          : 'https://i.ibb.co/0K16tTg/Warning-Message-250.png',
      ]"
    />

    <div class="tracking-widest flex flex-col">
      <h5 class="text-xs uppercase">
        {{ notificationObj.title }}
      </h5>
      <p class="text-xs pt-2" v-if="notificationObj.message">
        {{ notificationObj.message }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["notificationObj"],
};
</script>

<style scoped>
.banner {
  min-width: 250px;
  z-index: 5;
}
</style>
