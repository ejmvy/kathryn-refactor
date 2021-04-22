<template>
  <div class="bg-white px-3 py-4 flex w-full justify-between items-center">
    <img
      @click="closeMenu()"
      class="w-5 h-5 transform rotate-90"
      src="https://i.ibb.co/dQxfSHq/down.png"
    />
    <p class="uppercase text-sm tracking-wider">My Details</p>
    <div class="w-5 h-5"></div>
  </div>
  <div class="bg-gray-200 w-full p-1"></div>
  <div class="bg-white mt-3 p-3">
    <form class="px-3">
      <div>
        <input
          class="addressInput"
          v-model="userObject.firstName"
          type="text"
          placeholder="*First Name"
        />
      </div>
      <div>
        <input
          class="addressInput"
          v-model="userObject.lastName"
          type="text"
          placeholder="*Last Name"
        />
      </div>

      <div>
        <input
          class="addressInput"
          v-model="userObject.email"
          type="text"
          placeholder="*Email"
        />
      </div>
      <div>
        <input
          class="addressInput"
          v-model="userObject.phoneNumber"
          type="text"
          placeholder="*Phone Number"
        />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: ["user"],
  data() {
    return {
      userObject: {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
      },
      missingValues: true,
    };
  },
  methods: {
    saveDetails() {
      this.closeMenu();
      //   this.$store.dispatch("saveAddress", this.userObject);

      //   const user = this.$store.getters["getUserDetails"];
      //   console.log("USER: ", user);

      //   fetch(`http://localhost:3000/api/users/address/${user._id}`, {
      //     method: "PUT",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(this.userObject),
      //   })
      //     .then((res) => {
      //       return res.json();
      //     })
      //     .then((updatedUser) => {
      //       console.log("updated user: ");
      //       console.log(updatedUser);

      //     })
      //     .catch((e) => {
      //       console.log(`error: ${e}`);
      //     });
    },
    closeMenu() {
      this.$emit("closeMenu", "userDetails");
    },
  },

  computed: {
    checkAllDetails() {
      var isMissing = false;
      for (var key in this.userObject) {
        if (!this.userObject[key]) {
          isMissing = false;
        } else {
          isMissing = false;
        }
      }
      console.log(`MISSING: ${isMissing}`);
      return isMissing;
    },
    isDisabled() {
      const values = Object.values(this.userObject);

      return values.every((val) => val != "");
    },
  },
  created() {
    const addressDetails = this.$store.getters["getAddress"];
    if (addressDetails) this.userObject = addressDetails;
  },
};
</script>

<style scoped>
input:focus {
  outline: none;
  border-bottom: 2px solid #365a69;
}

.missingInfo {
  border-bottom: 2px solid red;
}
</style>
