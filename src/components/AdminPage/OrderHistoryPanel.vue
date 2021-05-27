<template>
  <div style="height: 100%">
    <div
      class="flex flex-col h-full w-11/12 lg:w-5/6 m-auto items-center justify-center mb-10"
    >
      <div class="w-full flex justify-between items-center">
        <select
          class="w-16 cursor-pointer focus:outline-none"
          v-model="currentEntries"
          @change="paginateEntries"
        >
          <option v-for="entry in showEntries" :key="entry" :value="entry">
            {{ entry }}
          </option>
        </select>
        <h5 class="labelxs text-gray-500">Order history</h5>
        <!-- showSearch = !showSearch -->
        <!-- <img
          @click="loadData()"
          class="w-7 h-7 cursor-pointer hover:scale-110"
          src="https://i.ibb.co/tPpm16k/specs.png"
        /> -->
        <div>
          <input
            type="search"
            class="w-32 border-b border-green-light"
            placeholder="Search here.."
            v-model="searchInput"
            @keyup="searchEvent"
          />
        </div>
      </div>

      <TableData :columns="columns" :entries="filteredEntries" />

      <div
        class="mt-16 w-full px-10 flex items-center justify-between my-12 py-3"
      >
        <div class="text-xs">
          Page {{ currentPage + 1 }} of {{ allPages }} for
          {{ entries.length }} entries
        </div>
        <div class="flex justify-around">
          <div class="flex mr-3">
            <svg
              @click="toBeginning()"
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 cursor-pointer mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#627F8A"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
              />
            </svg>
            <svg
              @click="toPrev()"
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#627F8A"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </div>
          <div class="flex ml-3">
            <svg
              @click="toNext()"
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#627F8A"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
            <svg
              @click="toEnd()"
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 cursor-pointer ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#627F8A"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 5l7 7-7 7M5 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>

      <transition name="slide-up">
        <ViewOrderDetails
          v-if="showOrderPanel"
          :orderDetails="viewOrder"
          @closePopup="closeShowOrderDetails"
        ></ViewOrderDetails>
      </transition>
    </div>
  </div>
</template>

<script>
import ViewOrderDetails from "./ViewOrderDetails.vue";
import TableData from "./TableData.vue";
import axios from "axios";

export default {
  data: () => ({
    columns: [
      { id: "order", text: "Order" },
      { id: "recipient", text: "Recipient" },
      { id: "ordered", text: "Ordered" },
      { id: "status", text: "Status" },
      { id: "delivered", text: "Delivered" },
      { id: "items", text: "Items" },
      { id: "total", text: "Total" },
    ],
    entries: [],
    showEntries: [5, 10, 15, 25, 50, 100],
    currentEntries: 5,
    filteredEntries: [],
    currentPage: 0,
    allPages: 1,
    searchInput: "",
    searchEntries: [],

    showSearch: false,
    viewOrder: {},
    showOrderPanel: false,
  }),

  methods: {
    showOrderDetails(order) {
      this.viewOrder = order;
      this.emitter.emit("showOverlay");
      this.showOrderPanel = true;
    },
    closeShowOrderDetails() {
      this.emitter.emit("hideOverlay");
      this.showOrderPanel = false;
    },

    async loadData() {
      await axios
        .get("http://localhost:3000/api/orders/history")
        .then((data) => {
          this.entries = data.data;
          this.filteredEntries = this.entries.slice(0, this.currentEntries);
          this.ordersLength = data.length;
          this.allPages = this.entries.length / this.currentEntries;
          if (this.allPages % 1 != 0)
            this.allPages = Math.round(this.allPages + 1);
        });
    },
    paginateEntries() {
      if (this.searchInput.length >= 3) {
        this.searchEntries = this.entries.filter(this.searchInput);
        // const start = this.currentPage * this.currentEntries;
        // const end = this.currentPage * this.currentEntries + this.currentEntries;
        // this.filteredEntries = this.entries.slice(start, end);
      }
      const start = this.currentPage * this.currentEntries;
      const end = this.currentPage * this.currentEntries + this.currentEntries;
      this.filteredEntries = this.entries.slice(start, end);
    },
    toBeginning() {
      this.currentPage = 0;
      this.paginateEntries();
    },
    toEnd() {
      this.currentPage = this.allPages - 1;
      this.paginateEntries();
    },
    toPrev() {
      this.currentPage--;
      this.paginateEntries();
    },
    toNext() {
      this.currentPage++;
      this.paginateEntries();
    },
    searchEvent() {
      this.currentPage = 1;
      this.paginateEntries();
    },
  },

  computed: {
    showInfo() {
      // const getCurrentEntries = (this.searchEntries.length <= 0) ? this.entries: this.searchEntries;
      const showObj = {
        current: this.currentPage,
        of: this.currentEntries,
        outOf: this.entries.length,
      };
      return showObj;
    },
    showPagination() {
      return 4;
      // return this.allPages.slice(this.currentPage, 3);
    },
  },

  mounted() {
    this.loadData();
    this.emitter.on("reloadData", () => {
      console.log("reload");
      this.loadData();
    });
  },
  components: {
    TableData,
    ViewOrderDetails,
  },
};
</script>

<style scoped>
/* https://codepen.io/bilalo05/pen/oNgrKXo?editors=1010 */
</style>
