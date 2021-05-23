<template>
  <div class="slowShow">
    <div
      class="bg-white px-3 py-4 flex w-full justify-between md:justify-center items-center"
    >
      <img
        @click="closeMenu()"
        class="w-5 h-5 md:hidden transform rotate-90 cursor-pointer"
        src="https://i.ibb.co/dQxfSHq/down.png"
      />
      <p class="uppercase text-sm tracking-wider">My Details</p>
      <div class="w-5 h-5"></div>
    </div>
    <div class="bg-gray-200 w-full p-1"></div>
    <div class="bg-white mt-3 p-3 md:flex md:flex-col md:w-full md:m-auto">
      <form class="px-3 mt-10">
        <div class="flex flex-col">
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
          <div class="label-grey self-start">Phone Number:</div>
          <input
            class="addressInput"
            v-model="userObject.phoneNumber"
            type="text"
            placeholder="*Phone Number"
          />
        </div>
      </form>
      <div>
        <button class="btn-green btn-lrg mt-10" @click="saveDetails">
          Save Changes
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
        phoneNumber: "",
      },
      missingValues: true,
    };
  },
  methods: {
    saveDetails() {
      //   this.closeMenu();

      const user = this.$store.getters["getUserDetails"];
      console.log("USER: ", user);

      fetch(`http://localhost:3000/api/users/${user._id}`, {
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
          this.$store.dispatch("updateUserDetails");
          this.closeMenu();
        })
        .catch((e) => {
          console.log(`error: ${e}`);
        });
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

    getFirstName() {
      return this.userObject.name.split(" ")[0];
    },
    isDisabled() {
      const values = Object.values(this.userObject);

      return values.every((val) => val != "");
    },
  },
  mounted() {
    const userDetails = this.$store.getters["getUserDetails"];

    var newObj = {
      firstName: userDetails.name.split(" ")[0],
      lastName: userDetails.name.split(" ")[1],
      email: userDetails.email,
      phoneNumber: userDetails.phoneNumber,
    };

    if (userDetails) this.userObject = newObj;
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
