<template>
  <div class="w-full h-screen flex bg-white">
    <div class="imageArea w-1/3 h-screen">
      <div class="logo text-white text-4xl absolute top-3 left-8 bg-green-dark">
        KC
      </div>
      <!-- <img
        class="w-full h-screen leftImage"
        src="https://i.ibb.co/YffVZ9q/cups1.jpg"
      /> -->
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
          <div>
            <input
              id="passwordInput"
              class="adminLoginInput w-full"
              v-model="userPassword"
              type="password"
            />

            <transition name="fade-button">
              <span class="viewPassword cursor-pointer">
                <svg
                  v-if="!viewUserPassword"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  @click="viewPassword()"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  @click="viewPassword()"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </span>
            </transition>
          </div>
          <p class="self-end text-xs text-green-light" @click="sendPassword()">
            Forgot Password?
          </p>
        </div>

        <button v-on:click="checkUserAuth" class="btn-green btn-lrg mt-10">
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
      viewUserPassword: false,
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
    viewPassword() {
      const pass = document.getElementById("passwordInput");

      this.viewUserPassword = !this.viewUserPassword;

      return (pass.type = this.viewUserPassword ? "text" : "password");
    },
    sendPassword() {
      console.log("send new password");
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

.passwordIcon {
  transition: all 0.2s ease-in-out;
}

.fullOpacity {
  opacity: 1;
}

.viewPassword {
  z-index: 2;
  position: relative;
  float: right;
  right: 10px;
  top: -35px;
}

.fade-button-enter-from,
.fade-button-leave-to {
  opacity: 0;
}
.fade-button-enter-active {
  transition: opacity 0.6s ease-out;
}

.fade-button-leave-active {
  transition: opacity 0.6s ease-in;
}
.fade-button-enter-to,
.fade-button-leave-from {
  opacity: 1;
}
</style>
