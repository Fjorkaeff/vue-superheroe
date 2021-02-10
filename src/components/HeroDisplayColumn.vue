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
        this.$store.dispatch('deleteFromFavorite', hero)
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

    <v-img
      height="250"
      src="../assets/batman.jpg"
    ></v-img>

    <v-card-title>{{ hero.name }}</v-card-title>

    <v-card-text>

    <div v-if="hero.description">{{ hero.description }}</div>
    <div v-else>{{ $t('heroes.no-description') }}</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

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
          class="mx-2"
          fab
          dark
          color="blue"
      >
          <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
