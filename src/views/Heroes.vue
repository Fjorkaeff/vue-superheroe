<script>

export default {
      name: 'Dashboard',
      data () {
          return {
              heroes: []
          }
      },
      components: {},
      mounted() {
          this.heroes = this.$store.getters.getHeroes
      }
}
</script>

<template>
    <div>
        <h1> {{ $t('heroes.message') }} </h1>
    </div>
</template>