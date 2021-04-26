<template>
  <div>
    <Header></Header>
    <section class="section pb-8 pt-16 md:pt-24 mb-24 bg-gray-100">
      <TitleDesign :title="titleText"></TitleDesign>
      <div class="w-11/12 sm:mt-6 flex justify-between">
        <div class="flex">
          <p>Collections</p>
          <div class="px-5">/</div>
          <select
            class="bg-transparent pr-10 cursor-pointer"
            v-model="categorySelected"
            @change="changeCategory"
          >
            <option
              v-for="category in categoryOptions"
              :key="category"
              :value="category"
            >
              {{ category }}
            </option>
          </select>
        </div>
        <p>{{ productData.length }} items</p>
      </div>
      <div
        class="w-11/12 flex justify-center pt-10 md:pt-6 md:justify-between flex-wrap"
      >
        <div v-for="item in productData" :key="item">
          <ItemCard :displayItem="item"></ItemCard>
        </div>
      </div>
    </section>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "../components/LandingPage/Header.vue";
import Footer from "../components/LandingPage/Footer.vue";
import TitleDesign from "../components/Designs/TitleDesign.vue";
import ItemCard from "../components/Designs/ItemCard.vue";

export default {
  data() {
    return {
      titleText: "Our Collection",
      productData: [],
      categoryName: "",
      categoryOptions: ["All", "Bowls", "Mugs", "Dishes", "Plates", "Misc"],
      categorySelected: "All",
      serverData: [],
    };
  },
  created() {
    const categoryParam = this.$route.params.category;
    console.log("category: " + categoryParam);
    if (categoryParam)
      this.categoryName =
        categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1);

    fetch("http://localhost:3000/api/products/")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        this.serverData = data;
        if (categoryParam) {
          this.categorySelected =
            this.categoryName.slice(0, 1).toUpperCase() +
            this.categoryName.slice(1);
          return this.findItems(this.categoryName);
        }
        this.productData = data;
      });
    const products = this.$store.getters["prods/products"];
    console.log("PRODS FROM STORE:");
    console.log(products);
    // const total = this.$store.getters["prods/productTotal"];
  },

  methods: {
    findItems(searchCategory) {
      var dataArr = [];
      this.serverData.forEach((item) => {
        if (item.category.name == searchCategory) {
          dataArr.push(item);
        }
      });
      this.productData = dataArr;
    },
    changeCategory() {
      console.log(`this cat: ${this.categorySelected}`);
      if (this.categorySelected === "All") {
        return (this.productData = this.serverData);
      }
      this.findItems(this.categorySelected);
    },
  },

  components: {
    Header,
    Footer,
    TitleDesign,
    ItemCard,
  },
};
</script>

<style scoped>
.routerLink {
  transition: all 0.2s ease;
}
.routerLink:hover {
  border-bottom: 2px solid rgba(32, 72, 88, 0.7);
  transform: scale(1.1);
}

select:focus {
  outline: none;
}
</style>
