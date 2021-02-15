<script>

export default {
  name: 'HeroDisplayColumn',
  props: [
      'hero'
  ],
  data:  () => ({

    }),
  methods: {
    addToFavorite(hero) {
        this.$store.dispatch('addToFavorite', hero)
    },
    deleteFromFavorite(hero) {
        this.$store.dispatch('allowReset', true)
        this.$store.dispatch('deleteFromFavorite', hero)
    },
    resetHero(hero) {
      this.$store.dispatch('resetHero', hero)
    },
    goToHeroProfil(hero) {
        this.$store.dispatch('setHeroToModify', hero)
        const id = hero.id;
        this.$router.push({ path: `/Heroes/${id}` })
    }
  }
}
</script>

<template>
  <v-card
    class="mx-auto my-12"
    max-width="350"
    hover
    >
  <div @click="goToHeroProfil(hero)">
    <v-img
      height="250"
      :src="hero.thumbnail.path + '.' + hero.thumbnail.extension"
    ></v-img>

    <v-card-title>{{ hero.name }}</v-card-title>

    <v-card-text>

    <div v-if="hero.description" style="text-overflow:ellipsis">{{ hero.description }}</div>
    <div v-else>{{ $t('heroes.no-description') }}</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>
  </div>

    <v-card-actions>
      <v-btn v-if="!hero.isFavorite"
          class="mx-2"
          fab
          dark
          color="green"
          @click="addToFavorite(hero)"
      >
          <v-icon dark>mdi-plus</v-icon>
      </v-btn>
      <v-btn v-if="hero.isFavorite"
          class="mx-2"
          fab
          dark
          color="red"
          @click="deleteFromFavorite(hero)" 
      >
          <v-icon dark>mdi-minus</v-icon>
      </v-btn>
      <v-btn                     
          class="mx-4"
          fab
          color="red"
          @click="deleteHero(hero)"
      >
          <v-icon color="white">mdi-delete</v-icon>
      </v-btn>
      <v-btn v-if="hero.isModified"
          class="mx-2"
          fab
          dark
          color="orange"
          @click="resetHero(hero)"          
      >
        <v-icon dark>mdi-refresh-circle</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
