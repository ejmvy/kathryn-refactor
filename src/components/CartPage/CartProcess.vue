<template>
  <div
    class="md:flex md:absolute w-screen h-screen overflow-hidden bg-green-light md:justify-center md:items-center"
  >
    <div
      class="w-full h-screen overflow-hidden md:w-4/5 md:h-4/5 bg-white shadow-2xl flex flex-col items-center"
    >
      <div
        class="flex justify-between items-center w-4/5 border-2 border-red-500 pt-5"
      >
        <div class="flex flex-col items-center">
          <div class="circleProgress">1</div>
          <div class="text-xs mt-3 uppercase">Sign In</div>
        </div>
        <div class="flex flex-col items-center">
          <div class="circleProgress">2</div>
          <div class="text-xs mt-3 uppercase">Address Details</div>
        </div>
        <div class="flex flex-col items-center">
          <div class="circleProgress">3</div>
          <div class="text-xs mt-3 uppercase">Confirm Order</div>
        </div>
      </div>
      <div class="w-full">
        <AddressDetails> </AddressDetails>
      </div>
    </div>
  </div>
</template>

<script>
import AddressDetails from "./AddressDetails.vue";
export default {
  data() {
    return {};
  },
  components: {
    AddressDetails,
  },
};
</script>
