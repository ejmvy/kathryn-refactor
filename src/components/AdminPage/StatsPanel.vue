<template>
  <div style="height: 100%">
    <div
      v-if="!showChart"
      class="slowShow flex flex-col h-full w-full items-center"
    >
      <h5 class="mb-3 labelxs text-gray-500">This Month</h5>
      <div class="flex w-full justify-around flex-wrap">
        <transition appear>
          <StatCard
            @click="showBarChart('totalSales')"
            class="mx-2 mt-8"
            :cardObject="totalSales"
          ></StatCard>
        </transition>
        <StatCard
          @click="showBarChart('newUsers')"
          class="mx-2 mt-8"
          :cardObject="newUsers"
        ></StatCard>
        <StatCard
          @click="showBarChart('monthlyIncome')"
          class="mx-2 mt-8"
          :cardObject="monthlyIncome"
        ></StatCard>
      </div>

      <h5 class="pt-20 mb-3 labelxs text-gray-500">
        Popular Products this month
      </h5>
      <div class="flex w-full justify-around flex-wrap">
        <StatCard
          @click="showBarChart('mostPopular')"
          class="mx-2 mt-8"
          :cardObject="top1"
        ></StatCard>
        <StatCard class="mx-2 mt-8" :cardObject="top2"></StatCard>
        <StatCard class="mx-2 mt-8" :cardObject="top3"></StatCard>
      </div>
    </div>
    <div v-else class="w-full flex justify-center py-2 px-5">
      <ChartArea
        class="slowShow"
        :chartData="chartData"
        @closeChart="closeChart()"
      ></ChartArea>
    </div>
  </div>
</template>

<script>
import StatCard from "../Designs/StatCard.vue";
import ChartArea from "./ChartArea.vue";
import axios from "axios";

export default {
  data: () => ({
    showChart: false,
    chartData: {
      name: "",
      data: [],
    },

    totalSales: {
      cardTitle: "Total Sales",
      icon: "https://i.ibb.co/vzdx4Vj/cart.png",
    },
    newUsers: {
      cardTitle: "New Users",
      icon: "https://i.ibb.co/pn8FWKn/userIcon.png",
    },
    monthlyIncome: {
      cardTitle: "Monthly Income",
      icon: "https://i.ibb.co/8NbhCC5/dollar.png",
    },
    top1: {
      direction: "up",
      change: "Top 3",
      icon: "https://i.ibb.co/KbjV0KG/star.png",
    },
    top2: {
      direction: "up",
      change: "Top 3",
      icon: "https://i.ibb.co/KbjV0KG/star.png",
    },
    top3: {
      direction: "up",
      change: "Top 3",
      icon: "https://i.ibb.co/KbjV0KG/star.png",
    },
  }),
  methods: {
    async showBarChart(chartName) {
      await axios
        .get(`http://localhost:3000/api/stats/${chartName}`)
        .then((data) => {
          this.chartData.name = chartName;
          this.chartData.data = Object.values(data.data);
          if (chartName == "mostPopular")
            this.chartData.labels = Object.keys(data.data);
          this.showChart = true;
        })
        .catch((error) => {
          console.log("error: " + error);
        });
    },
    closeChart() {
      this.showChart = false;
    },
  },
  created() {
    const timestamp = new Date();
    const year = timestamp.getFullYear();
    const month = timestamp.getMonth();

    fetch(`http://localhost:3000/api/orders/${year}/${month}`)
      .then((res) => res.json())
      .then((data) => {
        this.totalSales.cardFigure = data.current;
        this.totalSales.change = `${data.orderDifference}%`;
        this.totalSales.direction = data.current > data.prev ? "up" : "down";

        this.monthlyIncome.cardFigure = `€ ${data.currentSales}`;
        this.monthlyIncome.change = `${data.salesDifference.toFixed(0)}%`;
        this.monthlyIncome.direction =
          data.currentSales > data.prevSales ? "up" : "down";

        this.top1.cardTitle = data.topSales[0].name;
        this.top1.cardFigure = data.topSales[0].amount;
        this.top2.cardTitle = data.topSales[1].name;
        this.top2.cardFigure = data.topSales[1].amount;
        this.top3.cardTitle = data.topSales[2].name;
        this.top3.cardFigure = data.topSales[2].amount;
      });

    fetch(`http://localhost:3000/api/users/${year}/${month}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        this.newUsers.cardFigure = data.current;
        this.newUsers.change = `${data.difference}%`;
        this.newUsers.direction = data.current > data.prev ? "up" : "down";
      });
  },

  components: {
    StatCard,
    ChartArea,
  },
};
</script>

<style scoped>
/* https://www.npmjs.com/package/vue3-chart-v2 */
/* https://vue3-chart-v2.netlify.app/guide/ */
</style>
