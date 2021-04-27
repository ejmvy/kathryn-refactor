<template>
  <div class="w-full h-screen flex bg-white">
    <div class="imageArea w-1/3 h-screen">
      <div class="logo text-white text-4xl absolute top-3 left-8">KC</div>
      <img
        class="w-full h-screen leftImage"
        src="https://i.ibb.co/YffVZ9q/cups1.jpg"
      />
    </div>
    <div class="flex w-2/3 flex-col justify-center items-center">
      <div class="absolute top-2 right-2">
        Back to
        <router-link to="/" class="text-green-light underline font-black"
          >Home</router-link
        >
      </div>
      <div class="w-2/3">
        <h5 class="text-4xl text-left mb-4">Log In</h5>
        <p class="text-left text-gray-500 mb-12 text-xs">
          Enter your details to access the Admin Panel
        </p>
        <div class="flex flex-col">
          <div class="label-grey self-start mb-2">Email</div>
          <input class="adminLoginInput" v-model="userEmail" />
        </div>
        <div class="flex flex-col mt-8">
          <div class="label-grey self-start mb-2">Password</div>
          <input class="adminLoginInput" v-model="userPassword" />
        </div>

        <button
          v-on:click="checkUserAuth"
          class="bg-green-dark w-full py-3 text-white mt-16"
        >
          Log In
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userEmail: "",
      userPassword: "",
    };
  },
  methods: {
    checkUserAuth() {
      console.log(`${this.userEmail} : ${this.userPassword}`);

      if (!this.userEmail || !this.userPassword) {
        return this.emitter.emit("showNotification", {
          state: false,
          title: "Ooops!",
          message: "Some information is missing",
        });
      }
      // first do call to AUTH api to check user is correct. Receive token
      // then check with token if user is Admin.

      fetch("http://localhost:3000/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.userEmail,
          password: this.userPassword,
        }),
      })
        .then((res) => {
          const resp = res.text();
          return resp;
        })
        .then((key) => {
          console.log("key" + key);
          this.checkAdminDetails(key);
          //   if (key !== "Invalid email or password") {

          //   } else {
          //     this.emitter.emit("showNotification", {
          //       state: false,
          //       title: "Ooops!",
          //       message: "Somethings gone wrong.",
          //     });
          //   }
        })
        .catch((error) => {
          this.emitter.emit("showNotification", {
            state: false,
            title: "Ooops!",
            message: `${error}`,
          });
        });
    },
    checkAdminDetails(key) {
      fetch("http://localhost:3000/api/users/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": key,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log("admin: ", data);
          if (data.isAdmin) {
            this.$store.dispatch("setKey", key);
            this.$store.dispatch("login", data);

            let userName = data.name.split(" ")[0];
            this.emitter.emit("showNotification", {
              state: true,
              title: `Welcome ${userName} !`,
            });
          } else {
            this.emitter.emit("showNotification", {
              state: false,
              title: "Ooops!",
              message: "User not recognised",
            });
          }
        })
        .catch(() => {
          this.emitter.emit("showNotification", {
            state: false,
            message: `${key}`,
          });
        });
    },
  },
  computed: {
    detailsEntered() {
      return this.userEmail && this.userPassword;
    },
  },
};
</script>

<style scoped>
.imageArea {
  background: black;
  overflow: hidden;
  background: rgb(54, 90, 105);
  background: linear-gradient(
    90deg,
    rgba(54, 90, 105, 1) 0%,
    rgba(54, 90, 105, 1) 100%
  );
}
.leftImage {
  object-fit: cover;
  opacity: 0.4;
}

input {
  transition: all 0.3s ease-in-out;
}
</style>
