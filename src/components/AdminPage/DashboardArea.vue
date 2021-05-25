<template>
  <div class="w-full">
    <div class="w-11/12 m-auto flex justify-between">
      <svg
        @click="closeChart()"
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 cursor-pointer"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
      <h1>{{ getDashboardName }}</h1>
      <div></div>
    </div>
    <div class="w-full">
      <div class="flex flex-wrap justify-center">
        <div
          class="h-80 my-20 mx-10"
          v-for="category in categoryNames"
          :key="category"
        >
          <h1>{{ category }}</h1>
          <PieChart :pieData="categories[category]" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PieChart from "../Charts/PieChart.vue";
export default {
  props: ["dashboardData"],
  data() {
    return {
      dashboardNames: {
        categoryStats: "Category Breakdown Dashboard",
      },
      pieData: {
        labels: [],
        data: [],
      },
      categories: {},
      categoryNames: [],
    };
  },

  methods: {
    closeChart() {
      this.$emit("closeChart");
    },
  },

  computed: {
    getDashboardName() {
      return this.dashboardNames[this.dashboardData.name];
    },
  },

  created() {
    console.log("stats: ");
    console.log(this.dashboardData);

    this.categoryNames = Object.keys(this.dashboardData.data);

    for (var key in this.dashboardData.data) {
      this.categories[key] = {
        labels: Object.keys(this.dashboardData.data[key]),
        data: Object.values(this.dashboardData.data[key]),
      };
    }
  },

  components: {
    PieChart,
  },
};
</script>
