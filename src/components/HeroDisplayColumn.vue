<script>

export default {
  name: 'HeroDisplayColumn',
  props: [
      'hero'
  ],
  data:  () => ({

    }),
  methods: {}
}
</script>

<template>
    <!--<v-card
        class="card mx-auto my-12"
        max-width="374"
        height="420"
        width="300"
        hover
        rounded="lg"
        z-index="5"
    >
        <v-img
          height="250"
          src="../assets/batman.jpg"
        ></v-img>
          <v-card-title 
            :title="hero.name" 
            class="heroName"
            >{{ hero.name }}</v-card-title>
        <v-card-text  max-height="150">
          <div class="descriptionCard" v-if="hero.description">{{ hero.description.slice(0,35) }}...</div>
          <div class="descriptionCard" v-else>{{ $t('heroes.no-description') }}</div>
        </v-card-text>
    </v-card>-->

  <v-card
    class="mx-auto my-12"
    max-width="374"
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
