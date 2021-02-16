<template>
    <v-container class="containerRow">
        <v-row
            no-gutters 
            class="HeroRow"
        >
        <v-col md="2" @click="goToHeroProfil(hero)">
            <div class="HeroImgContainer">
                <v-img
                    v-if="hero.thumbnail"
                    class="HeroImg"
                    :src="hero.thumbnail.path + '.' + hero.thumbnail.extension"
                ></v-img>
            </div>
        </v-col>
        <v-col md="9" @click="goToHeroProfil(hero)">
            <div class="HeroName">
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
                    class="mx-4"
                    fab
                    dark
                    color="green"
                    @click="addToFavorite(hero)"
                >
                    <v-icon dark>mdi-heart</v-icon>
                </v-btn>
                <v-btn v-if="hero.isFavorite"
                    class="mx-4"
                    fab
                    dark
                    color="red"
                    @click="deleteFromFavorite(hero)" 
                >
                    <v-icon dark>mdi-heart-broken</v-icon>
                </v-btn>
                <v-btn v-if="hero.isModified"
                    class="mx-4"
                    fab
                    dark
                    color="orange"
                    @click="resetHero(hero)"
                >
                    <v-icon dark>mdi-refresh-circle</v-icon>
                </v-btn>
                <v-btn                     
                    class="mx-4"
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
        this.$store.dispatch('allowReset', true)
        this.$store.dispatch('deleteHero', hero)
    },
    resetHero(hero) {
        this.$store.dispatch('resetHero', hero)
    },
    goToHeroProfil(hero) {
        this.$store.dispatch('setHeroToModify', hero)
        const id = hero.id;
        this.$router.push({ path: `/Heroes/${id}` })
    },
  }
}
</script>

<style>
.ButtonContainer {
    height: 125px;
    margin-top: 1rem;
    margin-left: 2rem;
}
</style>