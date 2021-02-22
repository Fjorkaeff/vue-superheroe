
<template>
  <div id="app" data-app>
    <NotificationContainer/>
      <router-view/>
  </div>
</template>

<script>
import NotificationContainer from '@/components/NotificationContainer.vue'
  export default {
    name: "app",
    components: {
      NotificationContainer
    },
    mounted() {
      this.$store.dispatch('getHeroesListFromMarvel')
    }
  };
</script>

<style lang="css">
@import 'styles.css';
</style>
