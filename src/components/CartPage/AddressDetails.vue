<template>
  <div>
    <form>
      <h5>Your Details</h5>
      <div style="display: flex">
        <div class="inputArea">
          <label>First Name:</label>
          <input v-model="userObject.firstName" type="text" />
        </div>
        <div class="inputArea">
          <label>Last Name:</label>
          <input v-model="userObject.lastName" type="text" />
        </div>
      </div>
      <div class="inputArea">
        <label>Email:</label>
        <input v-model="userObject.email" type="text" />
      </div>
      <div class="inputArea">
        <label>Address Line 1:</label>
        <input v-model="userObject.addressLine1" type="text" />
      </div>
      <div class="inputArea">
        <label>Address Line 2:</label>
        <input v-model="userObject.addressLine2" type="text" />
      </div>
      <div style="display: flex">
        <div class="inputArea">
          <label>City:</label>
          <input v-model="userObject.city" type="text" />
        </div>
        <div class="inputArea">
          <label>Postcode:</label>
          <input v-model="userObject.postCode" type="text" />
        </div>
      </div>
      <div class="inputArea">
        <label>Country:</label>
        <input v-model="userObject.country" type="text" />
      </div>
    </form>

    <div class="buttonArea">
      <button class="btn" @click="confirmDetails">Confirm Details</button>
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
      },
    };
  },
  methods: {
    confirmDetails() {
      var missingValues = [];
      for (var key in this.userObject) {
        if (!this.userObject[key]) {
          missingValues.push(key);
          // console.log(missingValues);
        } else {
          // console.log('all');
        }
      }
      this.$emit("addressConfirmed");
    },
  },
};
</script>

<style scoped>
/* // form inputs  */

form h5 {
  margin-bottom: 80px;
  text-transform: uppercase;
}
.inputArea {
  flex: 1 1 50%;
  display: flex;
  flex-direction: column;
  padding: 0 10px;
}

input {
  width: 100%;
  flex: 1 2 auto;
  /* box-shadow: inset 0 0 5px #ccc; */
  padding: 15px 0 10px 5px;
  border: none;
  border-bottom: 1px solid #ccc;
  transition: all 0.2s ease-in-out;
  /* margin: 10px 0; */
}

input:focus {
  outline: none;
  border-bottom: 1px solid #365a69;
}

label {
  font-size: 12px;
  text-transform: uppercase;
  text-align: left;
  padding-top: 15px;
}

.missingInfo {
  border-bottom: 2px solid red;
}
</style>
