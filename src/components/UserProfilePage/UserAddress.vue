<template>
  <div>
    <div
      class="bg-white px-3 py-4 flex w-full justify-between md:justify-center items-center"
    >
      <img
        @click="closeMenu()"
        class="w-5 h-5 md:hidden transform rotate-90 cursor-pointer"
        src="https://i.ibb.co/dQxfSHq/down.png"
      />
      <p class="uppercase text-sm tracking-wider">Address Details</p>
      <div class="w-5 h-5"></div>
    </div>

    <div class="bg-gray-200 w-full p-1"></div>

    <div class="bg-white mt-3 p-3 md:flex md:flex-col md:w-full md:m-auto">
      <form class="px-3">
        <div class="flex flex-col mt-8">
          <div class="label-grey self-start">First Name:</div>
          <input
            class="addressInput"
            v-model="userObject.firstName"
            type="text"
            placeholder="*First Name"
          />
        </div>
        <div class="flex flex-col mt-8">
          <div class="label-grey self-start">Last Name:</div>
          <input
            class="addressInput"
            v-model="userObject.lastName"
            type="text"
            placeholder="*Last Name"
          />
        </div>

        <div class="flex flex-col mt-8">
          <div class="label-grey self-start">Email:</div>
          <input
            class="addressInput"
            v-model="userObject.email"
            type="text"
            placeholder="*Email"
          />
        </div>
        <div class="flex flex-col mt-8">
          <div class="label-grey self-start">Address Line 1:</div>
          <input
            class="addressInput"
            v-model="userObject.addressLine1"
            type="text"
            placeholder="*Address Line 1"
          />
        </div>
        <div class="flex flex-col mt-8">
          <div class="label-grey self-start">Address Line 2:</div>
          <input
            class="addressInput"
            v-model="userObject.addressLine2"
            type="text"
            placeholder="Address Line 2"
          />
        </div>
        <div class="flex justify-between sm:justify-around">
          <div class="flex flex-col mt-8">
            <div class="label-grey self-start">City:</div>
            <input
              class="addressInput"
              v-model="userObject.city"
              type="text"
              placeholder="*City"
            />
          </div>
          <div class="flex flex-col mt-8">
            <div class="label-grey self-start">Post Code:</div>
            <input
              class="addressInput"
              v-model="userObject.postcode"
              type="text"
              placeholder="*Post Code"
            />
          </div>
        </div>
        <div class="flex flex-col mt-8">
          <div class="label-grey self-start">Country:</div>
          <input
            class="addressInput"
            v-model="userObject.country"
            type="text"
            placeholder="*Country"
          />
        </div>
        <div class="flex flex-col mt-8">
          <div class="label-grey self-start">Phone Number:</div>
          <input
            class="addressInput"
            v-model="userObject.phoneNumber"
            type="text"
            placeholder="*Phone Number"
          />
        </div>
      </form>

      <div class="buttonArea">
        <!-- :class="{ disable: !missingValues }" -->
        <button
          class="btn-green btn-lrg mt-10"
          @click="saveDetails()"
          :class="{ disable: isDisabled }"
        >
          Confirm Details
        </button>
      </div>
    </div>
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
        addressLine1: "",
        addressLine2: "",
        city: "",
        postcode: "",
        country: "",
        phoneNumber: "",
      },
      missingValues: true,
    };
  },
  methods: {
    saveDetails() {
      this.$store.dispatch("saveAddress", this.userObject);

      const user = this.$store.getters["getUserDetails"];
      console.log("USER: ", user);

      fetch(`http://localhost:3000/api/users/address/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.userObject),
      })
        .then((res) => {
          return res.json();
        })
        .then((updatedUser) => {
          console.log("updated user: ");
          console.log(updatedUser);
          this.closeMenu();
        })
        .catch((e) => {
          console.log(`error: ${e}`);
        });
    },
    closeMenu() {
      this.$emit("closeMenu", "userAddress");
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
