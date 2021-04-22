<template>
  <div class="indexMain">
    <transition name="appear">
      <div v-if="showNotification" class="noteTransition">
        <Notification :notificationObj="noteObjet"></Notification>
      </div>
    </transition>
    <router-view></router-view>
  </div>
</template>

<script>
import Notification from "./components/Designs/Notification.vue";
export default {
  name: "App",
  data() {
    return {
      showNotification: "",
      noteObjet: {},
    };
  },
  mounted() {
    this.emitter.on("showNotification", (noteMessage) => {
      this.noteObjet = noteMessage;
      this.showNotification = true;

      setTimeout(() => {
        this.noteObjet = {};
        this.showNotification = false;
      }, 4000);
    });
  },
  components: {
    Notification,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

button {
  /* font-family: "Nova Mono", monospace; */
  transition: all 0.5s ease;
}

button:hover {
  transform: scale(1.05);
}

button:focus,
input:focus {
  outline: none;
}

h1 {
  font-family: "Nova Mono", monospace;
}

.logo {
  font-family: "Megrim", cursive;
}

@keyframes appear {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.noteTransition {
  transition: all 0.8s ease-in-out;
  right: 0;
  top: 0;
  position: fixed;
  z-index: 5;
}

.appear-enter,
.appear-enter-active,
.appear-leave-active {
  top: -100px;
}
</style>
