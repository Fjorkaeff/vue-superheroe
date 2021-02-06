<script>
  import NavBar from "@/components/NavBar";
  export default {
    name: "app",
    components: { NavBar },
  };
</script>


<style lang="css">
@import 'styles.css';
</style>

<template>
  <div id="app">
      <NavBar/>
      <router-view/>
  </div>
</template>