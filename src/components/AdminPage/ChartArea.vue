<template>
  <div class="w-full lg:w-3/4">
    <div class="w-full flex justify-between">
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
      <h1>{{ getChartName }}</h1>
      <div>
        <select
          v-model="monthSelected"
          v-if="chartData.name == 'mostPopular'"
          @change="onChange()"
        >
          <option v-for="month in months" :key="month" :value="month">
            {{ month }}
          </option>
        </select>
      </div>
    </div>
    <div class="mt-14">
      <div
        v-if="
          chartData.name != 'monthlyIncome' && chartData.name != 'averageOrder'
        "
      >
        <BarChart :chartData="chartData"></BarChart>
      </div>
      <div v-else>
        <LineChart :chartData="chartData"></LineChart>
      </div>
    </div>
  </div>
</template>

<script>
import BarChart from "../Charts/BarChart.vue";
import LineChart from "../Charts/LineChart.vue";

export default {
  props: ["chartData"],
  data() {
    return {
      chartTitles: {
        totalSales: "Total Sales",
        newUsers: "New Users",
        monthlyIncome: "Monthly Income",
        mostPopular: "Most Popular Products This Month",
        averageOrder: "Average Order Value",
        returningUsers: "Returning Users",
      },
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      monthSelected: "",
    };
  },
  methods: {
    closeChart() {
      this.$emit("closeChart");
    },
    onChange() {
      console.log("month::");
      console.log(this.monthSelected);
    },
  },

  computed: {
    getChartName() {
      return this.chartTitles[this.chartData.name];
    },
  },

  components: {
    BarChart,
    LineChart,
  },
};
</script>

<style scoped></style>
