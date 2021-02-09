<script>
//import HeroDisplayRow from '../components/HeroDisplayRow.vue'

export default {
      name: 'Dashboard',
      data () {
          return {
              heroes: []
          }
      },
      components: {
         // HeroDisplayRow
      },
      methods: {},
      mounted() {
          this.heroes = this.$store.getters.getHeroes
      }
}
</script>

<template>
    <div class="heroesContainer">
        <div style="display:flex;flex-direction: row;justify-content: space-between">
            <h1> {{ $t('heroes.message') }} </h1>
        </div>
    <v-container>
        <v-row v-for="hero in heroes" :key="hero.id"
            no-gutters 
            class="rowHero"
        >
            <div class="heroName">
                {{hero.name}}
            </div>
            <div v-if="hero.description" class="heroDescription">
                <span>{{hero.description}}</span>
            </div>
            <div v-else class="heroDescription">
                <span>Pas de description</span>
            </div>
        </v-row>
    </v-container>
    </div>
</template>