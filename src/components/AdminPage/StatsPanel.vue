<template>
  <div style="height: 100%">
    <div class="flex flex-col h-full w-full items-center">
      <h5 class="mb-10 labelxs text-gray-500">This Month</h5>
      <div class="flex w-full justify-around">
        <transition appear>
          <StatCard class="mx-2" :cardObject="totalSales"></StatCard>
        </transition>
        <StatCard class="mx-2" :cardObject="newUsers"></StatCard>
        <StatCard class="mx-2" :cardObject="monthlyIncome"></StatCard>
      </div>

      <h5 class="pt-20 mb-10 labelxs text-gray-500">
        Popular Products this month
      </h5>
      <div class="flex w-full justify-around">
        <StatCard class="mx-2" :cardObject="top1"></StatCard>
        <StatCard class="mx-2" :cardObject="top2"></StatCard>
        <StatCard class="mx-2" :cardObject="top3"></StatCard>
      </div>
    </div>
  </div>
</template>

<script>
import StatCard from "../Designs/StatCard.vue";
export default {
  data: () => ({
    totalProducts: "52",
    newCustomers: "16",

    totalSales: {
      cardTitle: "Total Sales",
      cardFigure: "134",
      change: "3.48%",
      direction: "down",
      icon: "https://i.ibb.co/vzdx4Vj/cart.png",
    },
    newUsers: {
      cardTitle: "New Users",
      cardFigure: "24",
      change: "7.52%",
      direction: "up",
      icon: "https://i.ibb.co/pn8FWKn/userIcon.png",
    },
    monthlyIncome: {
      cardTitle: "Monthly Income",
      cardFigure: "2,586",
      change: "4.22%",
      direction: "up",
      icon: "https://i.ibb.co/8NbhCC5/dollar.png",
    },
    top1: {
      cardTitle: "Bowl 4",
      cardFigure: "12",
      change: "1.89%",
      direction: "up",
      icon: "https://i.ibb.co/KbjV0KG/star.png",
    },
    top2: {
      cardTitle: "Mug 1",
      cardFigure: "7",
      change: "14.50%",
      direction: "up",
      icon: "https://i.ibb.co/KbjV0KG/star.png",
    },
    top3: {
      cardTitle: "Misc 3",
      cardFigure: "11",
      change: "53.20%",
      direction: "up",
      icon: "https://i.ibb.co/KbjV0KG/star.png",
    },
  }),

  components: {
    StatCard,
  },
};
</script>

<style scoped></style>
