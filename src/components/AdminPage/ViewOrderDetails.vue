<template>
  <div class="cartArea fixed w-10/12 h-10/12 bg-white shadow-xl flex">
    <div class="purchases">
      <table class="productArea w-full mt-6 mb-10">
        <tr>
          <th class="text-left pb-8 text-xs uppercase">Product</th>
          <th class="pb-8 text-xs uppercase">Type</th>
          <th class="pb-8 text-xs uppercase">Quantity</th>
          <th class="pb-8 text-xs uppercase">Total</th>
        </tr>
        <tbody class="w-full">
          <tr
            class=""
            v-for="(product, idx) in orderDetails.products"
            :key="idx"
          >
            <td>
              <div class="flex flex-col text-left mb-3">
                <img
                  class="w-20 h-20"
                  src="https://i.ibb.co/kHNCjdK/mug2.jpg"
                />

                <div class="text-xs text-gray-400">
                  {{ product._id }}
                </div>
              </div>
            </td>
            <td>
              <p>{{ product.name }}</p>
              <div class="text-xs text-gray-400">{{ product.colour }}</div>
            </td>
            <td class="">{{ product.quantity }}</td>
            <td class="">
              {{ (product.price * product.quantity).toFixed(2) }}
            </td>
          </tr>
        </tbody>
      </table>
      <div class="flex absolute bottom-3 w-1/2 items-center justify-between">
        <p class="text-sm uppercase text-gray-500">Total</p>

        <div class="text-green-light text-lg font-bold">
          {{ orderDetails.totalAmount }}
        </div>
      </div>
    </div>
    <div class="buySection bg-green-dark">
      <div class="absolute right-0 flex self-end p-2">
        <img
          @click="$emit('closePopup')"
          class="w-4 h-4 cursor-pointer"
          src="https://i.ibb.co/tmmDGnL/close-x.png"
        />
      </div>
      <div
        class="relative text-left pl-3 my-10 text-white flex h-11/12 flex-col justify-between"
      >
        <div class="text-sm">
          <h5 class="text-sm text-white uppercase mb-8">Customer Details</h5>
          <p class="my-2">{{ orderDetails.customerName }}</p>
          <div>
            <label class="label-grey">Address: </label>
            <p class="my-2">{{ orderDetails.customerAddress }}</p>
            <p class="my-2">{{ orderDetails.customerCity }}</p>
            <p class="my-2">{{ orderDetails.customerPostcode }}</p>
          </div>
          <div>
            <label class="label-grey">Email: </label>
            <p class="my-2">{{ orderDetails.customerEmail }}</p>
          </div>
          <div>
            <label class="label-grey">Tel: </label>
            <p class="my-2">{{ orderDetails.customerTel }}</p>
          </div>
        </div>
        <div class="text-sm mt-16">
          <h5 class="text-sm text-white uppercase mb-8">Order Details</h5>
          <p class="my-2">{{ orderDetails.orderNumber }}</p>
          <div>
            <label class="label-grey">Ordered: </label>
            <p class="my-2">{{ orderDetails.orderDate }}</p>
          </div>
          <div>
            <label class="label-grey">Delivered: </label>

            <p v-if="orderDetails.deliveredDate" class="my-2">
              {{ orderDetails.deliveredDate }}
            </p>
            <div
              v-if="!orderDetails.deliveredDate"
              class="flex items-center mt-2"
            >
              <input type="checkbox" />
              <p class="ml-8">Mark as Delivered</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["orderDetails"],
  data() {
    return {};
  },
};
</script>

<style scoped>
.cartArea {
  top: 10%;
  left: 10%;
  z-index: 2;
}

.purchases {
  flex: 2;
  padding: 20px;
  padding-left: 50px;
}

.buySection {
  flex: 1;
}

.productArea {
  max-height: 500px !important;
}
</style>
