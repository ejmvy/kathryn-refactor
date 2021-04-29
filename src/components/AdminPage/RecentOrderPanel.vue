<template>
  <div style="height: 100%">
    <div class="w-10/12 m-auto flex flex-col">
      <h5 class="uppercase text-sm text-gray-500 font-bold">
        Your Recent Orders
      </h5>

      <div class="mt-10">
        <table class="w-full">
          <tr class="bg-gray-100 text-xs text-gray-400">
            <th class="py-4 text-left pl-5">Customer</th>
            <th class="py-4">Items</th>
            <th class="py-4">Amount</th>
            <th class="py-4">Order Date</th>
            <th class="py-4">Mark as Delivered</th>
            <th class="py-4"></th>
          </tr>

          <tr
            class="border-b border-gray-300 text-sm"
            v-for="item in recentOrders"
            :key="item"
          >
            <td class="py-6 text-left pl-5">{{ item.customerName }}</td>
            <td class="py-6">{{ item.products.length }}</td>
            <td class="py-6">{{ item.totalAmount }}</td>
            <td class="py-6">{{ item.orderDate }}</td>
            <td class="py-6">
              <input type="checkbox" />
            </td>
            <td class="py-6 flex justify-end mr-5">
              <img
                @click="showOrderDetails(item)"
                class="openIcon w-4 h-4 cursor-pointer"
                src="https://i.ibb.co/Qm0BCkd/right.png"
                :class="{ rotateArrow: item.showDetails }"
              />
            </td>
          </tr>
        </table>
      </div>
    </div>
    <transition name="slide-fade" mode="out-in" appear>
      <ViewOrderDetails
        v-if="showOrderPanel"
        :orderDetails="viewOrder"
        @closePopup="closeShowOrderDetails"
      ></ViewOrderDetails>
    </transition>
  </div>
</template>

<script>
import ViewOrderDetails from "./ViewOrderDetails.vue";
export default {
  data() {
    return {
      showDetails: false,
      viewOrder: {},
      showOrderPanel: false,

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
  methods: {
    showOrderDetails(order) {
      this.viewOrder = order;
      this.showOrderPanel = true;
      this.$emit("showOverlay");
    },
    closeShowOrderDetails() {
      console.log("CLOSEEEE");
      this.showOrderPanel = false;
      this.$emit("closeOverlay");
    },
  },
  components: {
    ViewOrderDetails,
  },
};
</script>
