<template>
  <div class="indexMain">
    <transition name="appear">
      <div v-if="showNotification" class="noteTransition">
        <Notification :notificationObj="noteObjet"></Notification>
      </div>
    </transition>

    <router-view v-slot="{ Component }">
      <transition name="slide-fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
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

h1 {
  /* font-family: "Cormorant Unicase", serif; */
  font-family: "Playfair Display SC", serif;
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
  transition: all 0.3s ease;
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
  transition: all 0.5s ease-in-out;
  right: 0;
  top: 0;
  position: fixed;
  z-index: 12;
}

.appear-enter,
.appear-enter-active,
.appear-leave-active {
  top: -130px;
}

.slide-fade-enter-from {
  opacity: 0;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  /* transition: transform 0.3s ease; */
  transition: opacity 0.5s ease-in;
}

.slide-fade-leave-to {
  /* transform: translateX(-10px); */
  opacity: 0;
}

/* SLIDE IN  */
.slide-in-enter-active {
  transition: all 0.8s ease;
}
.slide-in-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-in-enter-from,
.slide-in-leave-to {
  transform: translateX(30px);
  opacity: 0;
}

/* SLIDE UP */
.slide-up-enter-active {
  transition: all 0.8s ease;
}
.slide-up-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translatey(30px);
  opacity: 0;
}
</style>
