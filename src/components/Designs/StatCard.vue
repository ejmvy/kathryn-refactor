<template>
  <div
    class="cardItem border border-gray-300 shadow-xl py-5 px-10 flex flex-col justify-between rounded-xl h-44 hover:shadow-2xl cursor-pointer"
  >
    <div class="flex justify-between items-center">
      <div class="flex flex-col">
        <h5 class="uppercase text-green-dark text-xs font-bold">
          {{ cardObject.cardTitle }}
        </h5>
        <p class="text-left text-4xl mt-3 font-bo text-green-dark">
          {{ cardObject.cardFigure }}
        </p>
      </div>
      <div class="cardIcon">
        <img
          class="bg-green-dark p-4 h-16 w-16 rounded-full"
          :src="cardObject.icon"
        />
      </div>
    </div>
    <div class="flex items-center self-start">
      <img
        class="w-4 h-4"
        :src="
          cardObject.direction == 'up'
            ? 'https://i.ibb.co/n6wwL5x/green-Increase.png'
            : 'https://i.ibb.co/qksddSx/redDown.png'
        "
      />
      <div class="px-8">{{ cardObject.change }}</div>
      <p class="text-gray-400 text-sm">Since last month</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["cardObject"],
};
</script>

<style scoped>
/* increaseColor = #4BDD68   #71CC98*/
/* decreaseColor = #E23F36 */

.cardItem {
  border-top: 4px solid #365a69;
}
</style>
