<template>
  <div class="indexMain">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
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

h1 {
  font-family: "Nova Mono", monospace;
}
</style>
