
<template>
  <div id="app" data-app>
      <router-view/>
  </div>
</template>
<script>

  export default {
    name: "app",
    components: { },
    mounted() {
      this.$store.dispatch('getHeroesListFromMarvel')
    }
  };
</script>

<style lang="css">
@import 'styles.css';
</style>
