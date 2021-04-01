<template>
  <div class="flex items-center w-11/12 justify-center mt-5 mb-4">
    <div class="w-full bg-green-dark h-0.5"></div>
    <div class="titleText w-4/6 text-md uppercase">{{ title }}</div>
    <div class="w-full bg-green-dark h-0.5"></div>
  </div>
</template>

<script>
export default {
  props: ["title"],
};
</script>

<style scoped>
.titleText {
  font-family: "Nova Mono", monospace;
}
</style>
