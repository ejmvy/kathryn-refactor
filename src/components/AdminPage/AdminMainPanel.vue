<template>
  <div class="h-screen">
    <AdminLogin v-if="!userLoggedIn"></AdminLogin>

    <div v-if="userLoggedIn">
      <AdminHeader></AdminHeader>

      <div class="w-2/3 m-auto my-10">
        <div class="flex justify-between items-center">
          <img
            @click="changeWindow(0)"
            class="w-10 h-10 cursor-pointer"
            src="https://i.ibb.co/W3kjX3s/file-green.png"
          />
          <div class="line"></div>

          <img
            @click="changeWindow(1)"
            class="w-10 h-10 cursor-pointer"
            src="https://i.ibb.co/HdwZh2S/graph.png"
          />
          <div class="line"></div>
          <img
            @click="changeWindow(2)"
            class="w-10 h-10 cursor-pointer"
            src="https://i.ibb.co/DRD73Z5/list-green.png"
          />
          <div class="line"></div>
          <img
            @click="changeWindow(3)"
            class="w-10 h-10 cursor-pointer"
            src="https://i.ibb.co/N6vxTqj/pencil-green.png"
          />
        </div>
      </div>

      <div class="pt-8 border-t border-gray-200">
        <div class="adminArea">
          <RecentOrderPanel
            class="panel"
            v-if="currentIndex === 0"
            key="1"
          ></RecentOrderPanel>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminLogin from "../AdminPage/AdminLogin.vue";
import AdminHeader from "../AdminPage/AdminHeader.vue";
// import AdminConfigPangel from "../AdminPage/AdminConfigPanel.vue";
import RecentOrderPanel from "../AdminPage/RecentOrderPanel.vue";
// import OrderHistoryPanel from "../AdminPage/OrderHistoryPanel.vue";
// import StatsPanel from "../AdminPage/StatsPanel.vue";

export default {
  data() {
    return {
      openConfigPanel: true,
      openOrderPanel: false,
      openHistoryPanel: false,
      currentIndex: 0,
      back: false,
    };
  },
  methods: {
    changeWindow(newIdx) {
      if (this.currentIndex < newIdx) {
        // console.log("HIGHER");
        this.back = false;
        // console.log('BACK:' + this.back );
        this.currentIndex = newIdx;
      } else if (this.currentIndex > newIdx) {
        // console.log("LOWER");
        this.back = true;

        this.currentIndex = newIdx;
      }
      // console.log(`CURRENT idx: ${this.currentIndex}`);
    },
  },
  computed: {
    userLoggedIn() {
      return this.$store.getters["isAuthenticated"];
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

    console.log(`user logged: `, this.$store.state.user);
  },
  components: {
    AdminLogin,
    AdminHeader,

    // AdminConfigPangel,
    RecentOrderPanel,
    // OrderHistoryPanel,
    // StatsPanel,
  },
};
</script>

<style scoped>
.line {
  width: 100px;
  height: 3px;
  background: rgba(32, 72, 88, 0.7);
  border-radius: 5px;
}
</style>
