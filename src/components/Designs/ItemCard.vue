<template>
  <div
    class="bg-white w-80 flex justify-center flex-col items-center shadow-xl my-10"
  >
    <router-link :to="{ name: 'ItemDisplay', params: { id: displayItem._id } }">
      <div class="w-80 h-48">
        <div
          class="hoverBtn absolute w-80 h-48 opacity-0 flex justify-center items-center"
        >
          <button class="btn-white">View</button>
        </div>
        <img
          class="w-full h-48 cursor-pointer imgBorder"
          :src="displayItem.imageUrlArray[0]"
        />
      </div>
    </router-link>
    <div class="p-3 text-left w-full">
      <div class="pb-3">
        <h3 class="font-bold">{{ displayItem.name }}</h3>
        <h3 class="pt-1 text-gray-dark text-sm">
          {{ displayItem.description }}
        </h3>
        <p class="pt-1 text-xs text-gray-500">{{ displayItem.price }}</p>
      </div>
      <div class="flex pb-5 pt-3">
        <div
          v-for="color in getColourArray(displayItem.colour)"
          :key="color"
          class="flex space-x-4 px-4"
        >
          <button
            class="h-6 w-6 border-gray-200 border rounded-full cursor-pointer colorBtn"
            :style="{
              backgroundColor: colourMatch[color]
                ? colourMatch[color]
                : '#52B5B5',
            }"
          ></button>
        </div>
      </div>
      <div
        class="flex justify-between items-center border-t border-gray-light pt-3"
      >
        <p class="text-xs uppercase font-bold">Quick Add</p>
        <img
          @click="addItemToCart"
          class="w-4 h-4 cursor-pointer"
          src="https://i.ibb.co/z7TdxXP/Add-New-256.png"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["displayItem"],
  data() {
    return {
      colourMatch: {
        Rose: "#F7CAC9",
        Pink: "#FFC0CB",
        Red: "#F6404F",
        Teal: "#52B5B5",
        Blue: "#10A5F5",
        Navy: "#003366",
        Green: "#47B881",
        Purple: "#9B6DFF",
        Beige: "#FFFEEB",
        Cream: "#F9E4B7",
        White: "#F2F2F2",
        Terracotta: "#CB6843",
        Coffee: "#98694F",
        Brown: "#66462F",
      },
      colorCode: "",
    };
  },
  methods: {
    findColorCode(colour) {
      console.log(`color: ${this.colourMatch[colour]}`);
      return this.colourMatch[colour];
    },
    addItemToCart(item) {
      console.log("item to send:", item.name);
      fetch("http://localhost:3000/api/cart/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: item.name,
          price: item.price,
          description: item.description,
          quantity: 1,
        }),
      });
    },
    getColourArray(colorString) {
      const newArr = colorString.split(",").map((val) => val.trim());
      console.log("arr: ");
      console.log(newArr);
      return newArr;
    },
  },
  computed: {},
};
</script>

<style scoped>
.hoverBtn {
  background: rgba(251, 251, 251, 0.5);
  transition: all 0.5s ease-in-out;
}

.hoverBtn:hover {
  opacity: 1;
}
</style>
