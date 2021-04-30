<template>
  <div style="height: 100%">
    <div class="w-10/12 m-auto flex flex-col">
      <div class="flex justify-between">
        <div class="w-5 h-5"></div>
        <h5 class="uppercase text-sm text-gray-500 font-bold">
          Your Recent Orders
        </h5>
        <div>
          <img
            class="w-5 h-5"
            src="https://i.ibb.co/z7wkRzt/Document-Check-256.png"
          />
        </div>
      </div>

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
            <td class="py-6 text-left pl-5">{{ item.customer.name }}</td>
            <td class="py-6">{{ item.products.length }}</td>
            <td class="py-6">{{ item.paymentTotal }}</td>
            <td class="py-6">{{ convertDate(item.orderDate) }}</td>
            <td class="py-6">
              <input
                type="checkbox"
                v-model="item.isDelivered"
                @click="sendDelivered()"
                id="deliveredCheck"
              />
            </td>
            <td class="py-6 flex justify-end mr-5">
              <img
                @click="showOrderDetails(item)"
                class="w-5 h-5 cursor-pointer"
                src="https://i.ibb.co/tPpm16k/specs.png"
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
      recentOrders: [],
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
    convertDate(orderDate) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(orderDate).toLocaleDateString(undefined, options);
    },
    sendDelivered() {
      var isDelivered = document.getElementById("deliveredCheck");
      console.log("delivered: ", isDelivered);
    },
  },
  created() {
    fetch("http://localhost:3000/api/orders/recent")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("recent orders:");
        console.log(data);
        this.recentOrders = data;
      });
  },
  components: {
    ViewOrderDetails,
  },
};
</script>
