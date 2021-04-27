<template>
  <div style="height: 100%">
    <div class="w-10/12 m-auto flex flex-col">
      <h5 class="uppercase text-sm text-gray-500 font-bold">
        Your Recent Orders
      </h5>

      <div class="mt-10">
        <div class="w-full p-4 bg-gray-100 flex justify-between text-xs">
          <div v-for="title in tableTitles" :key="title">
            <div class="text-center">{{ title }}</div>
          </div>
        </div>

        <div v-for="item in recentOrders" :key="item">
          <div
            class="flex justify-between text-sm border-b border-gray-200 px-4 py-6"
          >
            <div class="chunk text-left">{{ item.customerName }}</div>
            <div class="chunk text-left pl-5">{{ item.products.length }}</div>
            <div class="chunk text-left sm:pl-5">{{ item.totalAmount }}</div>
            <div class="chunk text-left">{{ item.orderDate }}</div>
            <div class="chunk">
              <input class="chunk" type="checkbox" />
            </div>
            <div class="smChunk flex justify-end">
              <img
                @click="item.showDetails = !item.showDetails"
                class="openIcon w-5 h-5 cursor-pointer"
                src="https://i.ibb.co/Qm0BCkd/right.png"
                :class="{ rotateArrow: item.showDetails }"
              />
            </div>
          </div>

          <div v-if="item.showDetails" class="hiddenDetails">
            <div class="productInfo">
              <div
                v-for="product in item.products"
                :key="product"
                class="productLine"
              >
                <img
                  class="productImage"
                  src="https://i.ibb.co/d6SqvBc/dish2.jpg"
                />
                <div>{{ product.name }}</div>
                <div>{{ product.quantity }}</div>
                <div>{{ product.colour }}</div>
                <div>{{ product.price }}</div>
              </div>
            </div>
            <div class="borderLine"></div>
            <div class="customerInfo">
              <div>{{ item.customerName }}</div>
              <div class="addressArea">
                <div>{{ item.customerAddress }}</div>
                <div>{{ item.customerCity }}</div>
                <div>{{ item.customerPostcode }}</div>
              </div>
              <div>{{ item.customerTel }}</div>
              <div>{{ item.customerEmail }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showDetails: false,
      tableTitles: [
        "Customer",
        "Items",
        "Amount",
        "Order Date",
        "Mark as Delivered",
        "",
      ],
      recentOrders: [
        {
          customerName: "EJ McVey",
          customerAddress: "37 Victoria Road, Rathgar",
          customerCity: "Dublin",
          customerPostcode: "D06 EA30",
          customerEmail: "ej@gmail.com",
          customerTel: "0851417730",
          orderDate: "2021-03-03 12:30:00",
          totalAmount: "€243",
          products: [
            {
              name: "Bowl 1",
              quantity: 2,
              description: "Serving Bowl",
              colour: "Teal",
              price: "12.99",
            },
            {
              name: "Bowl 1",
              quantity: 2,
              description: "Serving Bowl",
              colour: "Teal",
              price: "12.99",
            },
          ],
          isDelivered: false,
          showDetails: false,
        },
        {
          customerName: "Mia McVey",
          customerAddress: "37 Victoria Road, Rathgar",
          customerCity: "Dublin",
          customerPostcode: "D06 EA30",
          customerEmail: "ej@gmail.com",
          customerTel: "0851417730",
          orderDate: "2021-03-03 12:30:00",
          totalAmount: "€81",
          products: [
            {
              name: "Bowl 1",
              quantity: 2,
              description: "Serving Bowl",
              colour: "Teal",
              price: "12.99",
            },
          ],
          isDelivered: false,
          showDetails: false,
        },
        {
          customerName: "Marco McVey",
          customerAddress: "37 Victoria Road, Rathgar",
          customerCity: "Dublin",
          customerPostcode: "D06 EA30",
          customerEmail: "ej@gmail.com",
          customerTel: "0851417730",
          orderDate: "2021-03-03 12:30:00",
          totalAmount: "€45",
          products: [
            {
              name: "Bowl 1",
              quantity: 2,
              description: "Serving Bowl",
              colour: "Teal",
              price: "12.99",
            },
            {
              name: "Bowl 1",
              quantity: 2,
              description: "Serving Bowl",
              colour: "Teal",
              price: "12.99",
            },
            {
              name: "Bowl 1",
              quantity: 2,
              description: "Serving Bowl",
              colour: "Teal",
              price: "12.99",
            },
            {
              name: "Bowl 1",
              quantity: 2,
              description: "Serving Bowl",
              colour: "Teal",
              price: "12.99",
            },
          ],
          isDelivered: false,
          showDetails: false,
        },
        {
          customerName: "Eoin McVey",
          customerAddress: "37 Victoria Road, Rathgar",
          customerCity: "Dublin",
          customerPostcode: "D06 EA30",
          customerEmail: "ej@gmail.com",
          customerTel: "0851417730",
          orderDate: "2021-03-03 12:30:00",
          totalAmount: "€132",
          products: [
            {
              name: "Bowl 1",
              quantity: 2,
              description: "Serving Bowl",
              colour: "Teal",
              price: "12.99",
            },
            {
              name: "Bowl 1",
              quantity: 2,
              description: "Serving Bowl",
              colour: "Teal",
              price: "12.99",
            },
          ],
          isDelivered: false,
          showDetails: false,
        },
      ],
    };
  },
};
</script>

<style scoped>
.chunk {
  width: 20%;
}

.smChunk {
  width: 10%;
}
</style>
