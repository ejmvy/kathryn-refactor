<template>
  <div style="height: 100%">
    <div class="flex justify-between h-full w-11/12 lg:w-4/5 xl:w-2/3 m-auto">
      <div class="flex flex-col w-full text-left px-5 categoryPanel">
        <h4 class="uppercase pb-5 pl-2 text-sm text-gray-dark">Categories</h4>

        <div class="scroll">
          <div
            class="colItem flex justify-between items-center py-5 x-2 border-b border-gray-light cursor-pointer hover:bg-gray-50"
            v-for="category in categoryList"
            :key="category"
            @click="viewCategory(category)"
          >
            <div>{{ category.name }}</div>
            <img class="w-4 h-4" src="https://i.ibb.co/Qm0BCkd/right.png" />
          </div>
        </div>
      </div>
      <div class="flex flex-col w-full text-left px-5 productPanel">
        <div>
          <h4
            v-if="categorySelected"
            class="uppercase pb-5 pl-2 text-sm text-gray-dark"
          >
            Products
          </h4>

          <div class="scroll">
            <div
              class="colItem flex flex-col border-b border-gray-light cursor-pointer p-2"
              v-for="product in productList"
              :key="product"
            >
              <div class="flex justify-between items-center">
                <div
                  class="productDesc flex items-center justify-start py-3 text-left"
                >
                  <div class="itemFont text-left font-bold pr-10">
                    {{ product.name }}
                  </div>
                  <div class="itemFont text-left text-xs">
                    € {{ product.price }}
                  </div>
                  <div class="itemFont text-left text-xs">
                    {{ product.numberInStock }} in stock
                  </div>
                </div>
                <div
                  class="productIcons flex items-center justify-end w-2/5 py-3"
                >
                  <img
                    @click="deleteProduct(product)"
                    class="w-4 h-4"
                    src="https://i.ibb.co/brmvC6C/bin-green.png"
                  />
                  <img
                    @click="editProduct(product)"
                    class="w-4 h-4 ml-8"
                    src="https://i.ibb.co/N6vxTqj/pencil-green.png"
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            v-if="categorySelected"
            @click="addNewProductBtn()"
            class="btn-green btn-lrg absolute bottom-5"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>

    <transition name="slide-up">
      <EditProductPopup
        v-if="showEditProductPopup"
        :productObject="productToEdit"
        @saveProduct="saveProductEdits"
        @closePopup="closeEditPopup"
      ></EditProductPopup>
    </transition>
  </div>
</template>

<script>
import EditProductPopup from "./EditProductPopup.vue";

export default {
  data() {
    return {
      hideProductBtn: false,
      categoryList: [],
      productList: [],
      showEditProductPopup: false,
      showNewProductPopup: false,
      categorySelected: "",
      productToEdit: {},
    };
  },
  methods: {
    viewCategory(category) {
      fetch(`http://localhost:3000/api/products/category/${category._id}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          this.productList = data;
        });
      this.categorySelected = category._id;
    },
    deleteProduct(product) {
      console.log("DELETE PRODUCT", product);
    },
    editProduct(product) {
      this.productToEdit = product;
      product.edit = !product.edit;
      this.hideProductBtn = !this.hideProductBtn;
      this.emitter.emit("showOverlay");
      this.showEditProductPopup = !this.showEditProductPopup;
    },
    addNewProductBtn() {
      console.log("ADD NEW PRODUCT");
      this.showEditProductPopup = true;
    },

    closeEditPopup() {
      console.log("CLOSE POPUP");
      this.productToEdit = {};
      this.showEditProductPopup = false;
      this.emitter.emit("hideOverlay");
    },
    refreshProducts() {
      fetch(
        `http://localhost:3000/api/products/category/${this.categorySelected}`
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log("category items: ", data);
          this.productList = data;
        });
    },
    saveProductEdits(productInfo) {
      console.log("SAVING: ");
      console.log(productInfo);
      if (productInfo._id) {
        console.log("product edited");
        this.saveEditedProduct(productInfo);
      } else {
        console.log("new product");
        productInfo.genreId = this.categorySelected;
        console.log(productInfo);
        this.addNewProduct(productInfo);
      }
      this.closeEditPopup();
      this.productToEdit = {};
    },
    saveEditedProduct(productObj) {
      fetch(`http://localhost:3000/api/products/${productObj._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productObj),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          this.refreshProducts();
          this.emitter.emit("showNotification", {
            state: true,
            title: "Success!",
            message: "New Details saved.",
          });
        })
        .catch((err) => {
          console.log(err);

          this.emitter.emit("showNotification", {
            state: false,
            title: "Ooops!",
            message: "Somethings gone wrong.",
          });
        });
    },
    addNewProduct(productObj) {
      fetch(`http://localhost:3000/api/products/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productObj),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          this.refreshProducts();
          this.emitter.emit("showNotification", {
            state: true,
            title: "Success!",
            message: "New Product saved.",
          });
        })
        .catch((err) => {
          console.log(err);
          this.emitter.emit("showNotification", {
            state: false,
            title: "Ooops!",
            message: "Somethings gone wrong.",
          });
        });
    },
  },
  created() {
    fetch("http://localhost:3000/api/categories/")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.categoryList = data;
      });
  },
  components: {
    EditProductPopup,
  },
};
</script>

<style scoped>
.categoryPanel,
.productIcons {
  flex: 1;
}

.productPanel {
  flex: 2;
}

.scroll {
  overflow: auto;
  height: 300px;
}

.colItem {
  transition: all 0.2s ease-in-out;
}

.productDesc {
  flex: 4;
}

.itemFont {
  width: 30%;
}
</style>
