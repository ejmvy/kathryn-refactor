<template>
  <div
    class="absolute w-full h-full flex justify-center items-center overflow-hidden bg-green-light"
  >
    <div class="container hidden md:inline" id="container" ref="containerRef">
      <div class="form-container sign-up-container bg-green-dark text-white">
        <router-link to="/">
          <img
            class="w-5 h-5 absolute cursor-pointer right-0 m-3"
            src="https://i.ibb.co/wQLVVf3/home.png"
          />
        </router-link>
        <form
          class="bg-white flex items-center justify-center flex-col h-full text-center px-10"
        >
          <h5 class="uppercase text-gray-400 font-bold tracking-widest">
            Create Account
          </h5>
          <input
            class="loginInput webInput"
            placeholder="Name"
            v-model="newUser.name"
          />
          <input
            class="loginInput webInput"
            placeholder="Email"
            v-model="newUser.email"
          />
          <input
            class="loginInput webInput"
            placeholder="Password"
            v-model="newUser.password"
          />
          <button
            class="btn-green btn-lrg mt-10"
            @click="registerUser"
            :class="{ disable: informationComplete }"
          >
            Sign Up
          </button>
        </form>
      </div>
      <div class="form-container sign-in-container">
        <router-link to="/">
          <img
            class="w-5 h-5 absolute cursor-pointer left-0 m-3"
            src="https://i.ibb.co/wQLVVf3/home.png"
          />
        </router-link>
        <form
          class="bg-white flex items-center justify-center flex-col h-full text-center px-10"
        >
          <h5 class="text-gray-600 uppercase font-bold tracking-widest">
            Sign in
          </h5>
          <input
            class="loginInput webInput"
            placeholder="Email"
            v-model="loginUser.email"
          />
          <input
            class="loginInput webInput"
            placeholder="Password"
            v-model="loginUser.password"
          />
          <button
            @click="loginUserFn"
            class="btn-green btn-lrg mt-10"
            :class="{ disable: loginComplete }"
          >
            Sign In
          </button>
        </form>
      </div>
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h5 class="uppercase pb-10 text-lg font-bold tracking-widest">
              Already have an Account?
            </h5>
            <p>Click here to login</p>
            <button
              class="btn-white btn-lrg mt-10"
              id="signIn"
              @click="signInButton"
            >
              Sign In
            </button>
          </div>
          <div class="overlay-panel overlay-right">
            <h5 class="uppercase pb-10 text-lg font-bold tracking-widest">
              New Friend?
            </h5>
            <p>Click here to register</p>
            <button
              class="btn-white btn-lrg mt-10"
              id="signUp"
              @click="signUpButton"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- MOBILE LOGIN -->
    <div class="md:hidden h-screen w-full overflow-hidden bg-green-light">
      <router-link to="/">
        <img
          class="w-5 h-5 absolute cursor-pointer left-0 m-2"
          src="https://i.ibb.co/wQLVVf3/home.png"
        />
      </router-link>
      <div
        class="flex flex-col justify-around items-center text-white w-full h-4/5 pt-6"
        v-if="!toLogin"
      >
        <img class="w-20 h-20" src="https://i.ibb.co/wBkvvKz/owl.png" />
        <form
          class="flex items-center justify-center flex-col h-full w-4/5 text-center px-0"
        >
          <h5 class="text-white uppercase">Create Account</h5>
          <input
            class="loginInput mobileInput"
            placeholder="Name"
            v-model="newUser.name"
          />
          <input
            class="loginInput mobileInput"
            placeholder="Email"
            v-model="newUser.email"
          />
          <input
            class="loginInput mobileInput"
            placeholder="Password"
            v-model="newUser.password"
          />
          <button
            class="btn-full-white btn-lrg"
            @click="registerUser"
            :class="{ disable: informationComplete }"
          >
            Sign Up
          </button>
        </form>
        <div class="otherRoute">
          <h5 class="text-xs uppercase text-green-dark mt-5">
            Already have an Account?
          </h5>
          <button
            class="btn-green btn-sm mt-3"
            id="signIn"
            @click="toLogin = !toLogin"
          >
            Sign In
          </button>
        </div>
      </div>
      <div
        class="flex flex-col justify-around items-center text-white w-full h-4/5 pt-6"
        v-if="toLogin"
      >
        <img class="w-20 h-20" src="https://i.ibb.co/wBkvvKz/owl.png" />
        <form
          class="flex items-center justify-center flex-col h-full w-4/5 text-center px-0 text-white"
        >
          <h5 class="text-white uppercase">Sign in</h5>
          <input
            class="loginInput mobileInput"
            placeholder="Email"
            v-model="loginUser.email"
          />
          <input
            class="loginInput mobileInput"
            placeholder="Password"
            v-model="loginUser.password"
          />
          <button
            @click="loginUserFn"
            class="btn-full-white btn-lrg"
            :class="{ disable: loginComplete }"
          >
            Sign In
          </button>
        </form>
        <div class="otherRoute">
          <h5 class="text-xs uppercase mt-5 text-green-dark">New Friend?</h5>
          <button
            class="btn-green btn-sm mt-3"
            id="signIn"
            @click="toLogin = !toLogin"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      toLogin: true,
      toRegister: false,
      newUser: {
        name: "",
        email: "",
        password: "",
      },
      loginUser: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    signInButton() {
      console.log("Sign in!");
      const container = this.$refs.containerRef;
      container.classList.remove("right-panel-active");
    },
    signUpButton() {
      console.log("Sign Up!");
      const container = this.$refs.containerRef;
      container.classList.add("right-panel-active");
    },

    loginUserFn(e) {
      e.preventDefault();
      console.log("LOGGING in");
      fetch("http://localhost:3000/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(this.loginUser),
        mode: "cors",
      })
        .then((res) => {
          const resp = res.text();
          return resp;
        })
        .then((key) => {
          this.getUserDetails(key);
        })
        .catch((err) => {
          console.log("Error:", err);
        });
    },
    getUserDetails(key) {
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
          console.log("key to login:");
          console.log(key);
          this.$store.dispatch("setUserkey", key);
          this.$store.dispatch("login", data);

          //     this.$store.dispatch("cart/addToCart", {
          //   id: item._id,
          //   colourSelected: this.colourChosen,
          // });

          console.log("user login:");
          console.log(data);

          const cartProcess = this.$store.getters["cart/paymentStep"];

          console.log("process: " + cartProcess);

          let userName = data.name.split(" ")[0];
          this.emitter.emit("showNotification", {
            state: true,
            title: `Welcome Back ${userName} !`,
          });

          if (cartProcess > 0) {
            if (data.userAddress) {
              this.$store.dispatch("cart/setPaymentStep", 2);
            }
            return this.$router.push("/checkout");
          } else {
            this.$router.push("/shop");
          }
        })
        .catch((err) => {
          console.log(`Err: ${err}`);
          this.emitter.emit("showNotification", {
            state: false,
            title: "Ooops!",
            message: "Somethings gone wrong.",
          });
        });
    },
    registerUser(e) {
      e.preventDefault();

      if (this.newUser.name && this.newUser.email && this.newUser.password) {
        console.log("have all values");
        fetch("http://localhost:3000/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.newUser),
        })
          .then((res) => {
            return res.json();
          })
          .then((newUser) => {
            this.$store.dispatch("login", newUser);

            const cartProcess = this.$store.getters["cart/paymentStep"];

            console.log("process: " + cartProcess);

            let userName = newUser.name.split(" ")[0];
            this.emitter.emit("showNotification", {
              state: true,
              title: `Welcome ${userName} !`,
            });

            if (cartProcess > 0) {
              return this.$router.push("/checkout");
            } else {
              this.$router.push("/shop");
            }
          })
          .catch((err) => {
            console.log("Error:", err);
            this.emitter.emit("showNotification", {
              state: false,
              title: "Ooops!",
              message: "Somethings gone wrong.",
            });
          });
      } else {
        this.emitter.emit("showNotification", {
          state: false,
          title: `Ooops! Some Information is missing`,
        });
      }
    },
  },
  computed: {
    informationComplete() {
      if (this.newUser.name && this.newUser.email && this.newUser.password) {
        return false;
      }
      return true;
    },
    loginComplete() {
      if (this.loginUser.email && this.loginUser.password) {
        return false;
      }
      return true;
    },
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

span {
  font-size: 12px;
}

.container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.container.right-panel-active .sign-in-container {
  transform: translateX(100%);
}

.sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.container.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
}

@keyframes show {
  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

.overlay {
  background: #365a69;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay-panel {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-panel p {
  color: white;
}

.overlay-left {
  transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
  transform: translateX(0);
}

.overlay-right {
  right: 0;
  transform: translateX(0);
}

.container.right-panel-active .overlay-right {
  transform: translateX(20%);
}

.otherRoute {
  height: 400px;
  width: 140%;
  border-radius: 50%;
  background: white;
  color: #365a69;
  padding-top: 10px;
  position: absolute;
  overflow: hidden;
  bottom: -40%;
}
</style>
