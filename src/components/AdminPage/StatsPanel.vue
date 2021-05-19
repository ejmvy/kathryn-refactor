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
      icon: "https://i.ibb.co/KbjV0KG/star.png",
    },
    top2: {
      icon: "https://i.ibb.co/KbjV0KG/star.png",
    },
    top3: {
      icon: "https://i.ibb.co/KbjV0KG/star.png",
    },
  }),
  created() {
    const timestamp = new Date();
    const year = timestamp.getFullYear();
    const month = timestamp.getMonth();

    fetch(`http://localhost:3000/api/orders/${year}/${month}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("data");
        console.log(data.topSales);
        this.totalSales.cardFigure = data.current;
        this.totalSales.change = `${data.orderDifference}%`;
        this.totalSales.direction = data.current > data.prev ? "up" : "down";

        this.monthlyIncome.cardFigure = `€ ${data.currentSales}`;
        this.monthlyIncome.change = `${data.salesDifference}%`;
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
  },
};
</script>

<style scoped></style>
