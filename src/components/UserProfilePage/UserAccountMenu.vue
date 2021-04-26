<template>
  <div>
    <div class="flex flex-col bg-white items-center pt-5">
      <div
        class="w-20 h-20 bg-green-dark border-4 border-gray-300 rounded-full text-4xl flex justify-center text-white items-center"
      >
        {{ getInitials }}
      </div>
      <div class="mt-6 mb-2">Hi,</div>
      <div class="font-bold text-lg tracking-widest pb-5">{{ userName }}</div>
    </div>
    <div class="bg-gray-200 w-full p-1"></div>

    <div
      class="md:w-3/4 md:m-auto md:flex md:justify-center bg-white"
      v-for="path in accountPaths"
      :key="path"
    >
      <div
        @click="showRoute(path.route)"
        class="w-full flex items-center py-5 pl-6 border-b border-gray-400"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-7 w-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            :d="path.icon"
          />
        </svg>
        <p class="ml-10 tracking-wider text-gray-600 text-sm">
          {{ path.pathName }}
        </p>
      </div>
    </div>
    <div class="w-full absolute bottom-0 border-t-2 border-gray-300">
      <div class="w-full flex justify-between p-2 text-xs">
        <p>@2021 KC</p>
        <p>Designed by EJ</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  //   props: ["userName"],
  data() {
    return {
      userName: "",
      accountPaths: [
        {
          pathName: "My orders",
          icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z",
          route: "userOrders",
        },
        {
          pathName: "My details",
          icon:
            "M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2",
          route: "userDetails",
        },
        {
          pathName: "Address details",
          icon:
            "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
          route: "userAddress",
        },
        {
          pathName: "Need help?",
          icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
          route: "userHelp",
        },
        {
          pathName: "Where's my order?",
          icon:
            "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
          route: "userOrderLocation",
        },
      ],
    };
  },

  methods: {
    showRoute(path) {
      this.$emit("userSelect", path);
    },
  },
  computed: {
    getInitials() {
      if (this.userName) {
        const name = this.userName.split(" ");
        const firstLetter = name[0].split("")[0];
        const lastLetter = name[1].split("")[0];
        return firstLetter + lastLetter;
      }
      return "";
    },
  },
  mounted() {
    const userDetails = this.$store.getters["getUserDetails"];
    this.userName = userDetails.name;
  },
};
</script>
