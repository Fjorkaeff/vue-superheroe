<script>

export default {
  name: 'HeroDisplayRow',
  props: [
      'hero'
  ],
  methods: {
    addToFavorite(hero) {
        this.$store.dispatch('addToFavorite', hero)
    },
    deleteFromFavorite(hero) {
        this.$store.dispatch('deleteFromFavorite', hero)
    },
    deleteHero(hero) {
        this.$store.dispatch('deleteHero', hero)
    },
    goToHeroProfil(hero) {
        const id = hero.id;
        this.$router.push({ path: `/Heroes/${id}`, query: {hero} })
    },
  }
}
</script>

<template>
    <v-container class="containerRow">
        <v-row
            no-gutters 
            class="rowHero"
        >
        <v-col md="2" @click="goToHeroProfil(hero)">
            <div class="heroImgContainer">
                <v-img
                    class="HeroImg"
                    :src="hero.thumbnail.path + '.' + hero.thumbnail.extension"
                ></v-img>
            </div>
        </v-col>
        <v-col md="9" @click="goToHeroProfil(hero)">
            <div class="heroName">
                {{ hero.name }}
            </div>
            <div v-if="hero.description" class="HeroDescription">
                <span>{{ hero.description }}</span>
            </div>
            <div v-else class="HeroDescription">
                <span> {{ $t('heroes.no-description') }} </span>
            </div>
        </v-col>
        <v-col md="1">
            <v-card-actions>
                <div class="ButtonContainer">
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
                <v-btn v-if="hero.isModified"
                    class="mx-2"
                    fab
                    dark
                    color="orange"

                >
                    <v-icon dark>mdi-refresh-circle</v-icon>
                </v-btn>
                <v-btn                     
                    class="mx-2"
                    fab
                    color="red"
                    @click="deleteHero(hero)"
                >
                    <v-icon color="white">mdi-delete</v-icon>
                </v-btn>
                </div>
            </v-card-actions>
        </v-col>
        </v-row>
    </v-container>
</template>

<style>
.ButtonContainer {
    align-items: center;
}
</style>