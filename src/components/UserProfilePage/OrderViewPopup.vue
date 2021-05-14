<template>
  <div
    class="popupArea bg-white m-auto w-1/2 flex flex-col fixed py-8 px-16 rounded-xl shadow-xl"
  >
    <div class="labelxs text-gray-dark mb-5">Your Items</div>
    <div v-for="(product, idx) in orderList" :key="idx">
      <div class="w-full flex h-36 items-center justify-around">
        <div class="w-24 h-28 mr-16">
          <img class="h-28 w-24" :src="getImageUrl(product._id)" />
        </div>
        <div class="flex flex-col items-center justify-between">
          <div class="flex items-center justify-between w-full pb-4">
            <div class="text-gray-500">{{ product.name }}</div>
            <div class="text-xs font-bold">{{ product.price }}</div>
          </div>
          <div class="text-gray-400 text-xs">{{ product._id }}</div>
          <div class="flex items-center pt-3">
            <div class="text-xs">{{ product.colourSelected }}</div>
            <div class="h-4 w-0.5 bg-gray-200 mx-5"></div>
            <div class="text-xs">Qty {{ product.qty }}</div>
          </div>
        </div>
      </div>
    </div>
    <button @click="closePopup" class="btn-green btn-lrg mt-10">Close</button>
  </div>
</template>

<script>
export default {
  props: ["orderList"],

  methods: {
    closePopup() {
      this.$emit("closePopop");
    },
    getImageUrl(productId) {
      const products = this.$store.getters["prods/products"];
      const product = products.find((prod) => prod._id == productId);

      return product
        ? product.imageUrlArray[0]
        : "https://i.ibb.co/NCDk0sY/corrupt-Image.png";
    },
  },

  created() {
    console.log("ORDERS VIEW");
    console.log(this.orderList);
  },
};
</script>

<style scoped>
.popupArea {
  top: 15%;
  left: 25%;
  z-index: 2;
}
</style>
