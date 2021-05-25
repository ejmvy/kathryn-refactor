<template>
  <table class="w-full border-none mt-8" cellspacing="0" cellpadding="0">
    <thead class="bg-green-light text-white uppercase text-xs">
      <th class="py-3" v-for="th in tableHeader" :key="th">
        <div class="flex justify-center items-center">
          <span>{{ th.text }}</span>
        </div>
      </th>
    </thead>
    <tbody>
      <tr v-for="order in tableData" :key="order">
        <td>{{ order.orderRef }}</td>
        <td>{{ order.customer.name }}</td>
        <td>{{ convertDate(order.orderDate) }}</td>
        <td>{{ order.orderStatus }}</td>
        <td>{{ convertDate(order.deliveredDate) }}</td>
        <td>{{ order.products.length }}</td>
        <td>{{ order.paymentTotal }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "Table Data",
  props: {
    columns: Array,
    entries: Array,
  },
  methods: {
    convertDate(orderDate) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(orderDate).toLocaleDateString(undefined, options);
    },
  },
  computed: {
    tableHeader() {
      return this.columns || [];
    },
    tableData() {
      return this.entries || [];
    },
  },
};
</script>

<style scoped>
table td {
  font-size: 13px;
  padding: 22px 0;
  border-bottom: 1px solid rgb(228, 227, 227);
}
</style>
