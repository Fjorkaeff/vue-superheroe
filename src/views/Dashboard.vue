<script>
//import HeroDisplayRow from '../components/HeroDisplayRow.vue'

export default {
    name: 'Heroes',
    data () {
        return {
            favoriteHeroes: [],
        }
    },
    components: {
       // HeroDisplayRow
    },
    methods: {},
    computed: {
    },
    created() {
        this.favoriteHeroes = this.$store.getters.getFavoritesHeroes
    }
}
</script>

<template>
<div class="heroesContainer">
        <div style="display:flex;flex-direction: row;justify-content: space-between">
            <h1> {{ $t('dashboard.message') }} </h1>
        </div>
    <v-container class="containerRow">
        <v-row v-for="hero in favoriteHeroes" :key="hero.id"
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
                {{hero.name}}
            </div>
            <div v-if="hero.description" class="heroDescription">
                <span>{{hero.description}}</span>
            </div>
            <div v-else class="heroDescription">
                <span>Pas de description</span>
            </div>
            <div class="buttonContainer">
                <v-btn                     
                    class="mx-2"
                    fab
                    dark
                    color="cyan"
                >
                    <v-icon dark>mdi-pencil</v-icon>
                </v-btn>
            </div>
        </v-row>
    </v-container>
    </div>
</template>
