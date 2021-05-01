<template>
  <div class="w-screen h-screen flex justify-center">
    <div class="popupArea fixed w-1/2 bg-white shadow-xl m-auto">
      <div
        class="w-full py-3 uppercase text-left pl-5 text-xs bg-green-dark text-white font-bold"
      >
        {{ popupData.title }}
      </div>
      <div class="text-xs px-4 py-10 text-left text-gray-500">
        {{ popupData.message }}
      </div>
      <div class="flex justify-between border-t border-gray-400 py-3 px-2">
        <button
          class="uppercase text-sm border-none text-gray-500"
          @click="$emit('closePopup')"
        >
          Close
        </button>
        <button
          class="uppercase text-sm text-green-light border-none"
          @click="$emit('confirmAction')"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["popupData"],
};
</script>

<style scoped>
.popupArea {
  top: 40%;
  margin: 0 auto;
}
</style>
