<script>

export default {
  name: 'HeroDisplayRow',
  props: [
      'hero'
  ],
  methods: {
    /*getHeroPics() {
        let src
            if (this.hero.isImgModified) {
                src = `${this.hero.thumbnail.path}`
            }else {
                src = `${this.hero.thumbnail.path}.${this.hero.thumbnail.extension}` 
            }
        return src
      },*/
        addToFavorite(hero) {
            this.$store.dispatch('addToFavorite', hero)
        },
        deleteFromFavorite(hero) {
            this.$store.dispatch('deleteFromFavorite', hero)
        }
        /*isFavoriteHero(hero) {
            this.isFavorite = this.$store.getters.getIsFavorite(hero)
        }*/
  }
}
</script>

<template>
    <v-container class="containerRow">
        <v-row
            no-gutters 
            class="rowHero"
        >
            <div class="heroImgContainer">
                <v-img
                    class="heroImg"
                    src="../assets/batman.jpg"
                ></v-img>
            </div>
            <div class="heroName">
                {{ hero.name }}
            </div>
            <div v-if="hero.description" class="heroDescription">
                <span>{{ hero.description }}</span>
            </div>
            <div v-else class="heroDescription">
                <span> {{ $t('heroes.no-description') }} </span>
            </div>
            <div class="buttonHeroes">
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
            </div>
        </v-row>
    </v-container>
</template>