<template>
  <v-card
    class="mx-auto my-12"
    max-width="350"
    hover
    >
  <div @click="goToHeroProfil(hero)">
    <v-img
        height="250"
        v-if="hero.isCreated"
        lazy-src="../assets/batman.jpg"
        :src="hero.img"
    ></v-img>
    <v-img
        height="250"
        v-else-if="hero.isImgModified"
        :lazy-src="hero.thumbnail.path + '.' + hero.thumbnail.extension"
        :src="hero.img"
    ></v-img>
    <v-img
        height="250"
        v-else
        :src="hero.thumbnail.path + '.' + hero.thumbnail.extension"
    ></v-img>

    <v-card-title>
      <div v-if="hero.name.length > 30">{{ hero.name.slice(0, 27) + "..." }}</div>
      <div v-else>{{ hero.name }}</div>
    </v-card-title>
  <div class="HeroDescripionCard">
    <v-card-text>
    <div v-if="!hero.description">{{ $t('heroes.no-description') }}</div>
    <div v-else-if="hero.description.length > 90">{{ hero.description.slice(0, 90) + "..." }}</div>
    <div v-else>{{ hero.description }}</div>
    </v-card-text>
  </div>

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
          <v-icon dark>mdi-heart</v-icon>
      </v-btn>
      <v-btn v-if="hero.isFavorite"
          class="mx-2"
          fab
          dark
          color="red"
          @click="deleteFromFavorite(hero)" 
      >
          <v-icon dark>mdi-heart-broken</v-icon>
      </v-btn>
      <v-dialog
        v-model="confirmation"
        persistent
        width="500"
      >
        <template v-slot:activator="{ on, attrs }">
            <v-btn                     
                class="mx-4"
                fab
                color="red"
                v-bind="attrs"
                v-on="on"
            >
                <v-icon color="white">mdi-delete</v-icon>
            </v-btn>
        </template>
        <v-card>
          <v-card-title>
            {{ $t('deleteHero.title') }}
          </v-card-title>
          <v-card-text>
              {{ $t('deleteHero.text') }}
          </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="black"
                style="margin-right:1rem"
                text
                @click="confirmation = false"
              >
                {{ $t('deleteHero.choice1') }}
              </v-btn>
              <v-btn
                class="ConfirmationDelete"
                text
                @click="deleteHero(hero)"
              >
                {{ $t('deleteHero.choice2') }}
              </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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

<script>

export default {
  name: 'HeroDisplayColumn',
  props: [
      'hero'
  ],
  data:  () => ({
    confirmation: false
    }),
  methods: {
    addToFavorite(hero) {
        this.$store.dispatch('addToFavorite', hero)
    },
    deleteFromFavorite(hero) {
        this.$store.dispatch('allowReset', true)
        this.$store.dispatch('deleteFromFavorite', hero)
    },
    deleteHero(hero) {
      this.confirmation = false;
      console.log('HERO : ', hero)
      this.$store.dispatch('deleteHero', hero)
      this.$store.dispatch('allowReset', true)
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

<style>
.HeroDescripionCard {
  margin-bottom: 1rem;
  height: 4rem;
}
</style>