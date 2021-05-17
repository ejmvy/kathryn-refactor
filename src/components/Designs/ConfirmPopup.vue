<template>
  <div
    class="popupIndex w-screen h-screen fixed top-0 left-0 flex justify-center"
  >
    <div class="popupArea w-1/2 bg-white shadow-xl m-auto">
      <div
        class="w-full py-3 uppercase text-left pl-5 text-xs bg-green-dark text-white font-bold"
      >
        {{ popupData.title }}
      </div>
      <div class="text-sm px-4 py-10 text-left text-gray-500">
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
  min-height: 100px;
}
</style>
