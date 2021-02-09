<script>
//import HeroDisplayRow from '../components/HeroDisplayRow.vue'
//import { mapActions } from 'vuex'

export default {
    name: 'Heroes',
    data () {
        return {
            heroes: [],
            isFavorite: false
        }
    },
    components: {
       // HeroDisplayRow
    },
    methods: {
        /*...mapActions([
            'addToFavorite'
        ]),*/
        addToFavorite(hero) {
            this.$store.dispatch('addToFavorite', hero)
        },
        isFavoriteHero(hero) {
            this.isFavorite = this.$store.getters.getIsFavorite(hero)
        }
    },
    computed: {
    },
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
    <v-container class="containerRow">
        <v-row v-for="hero in heroes" :key="hero.id"
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
                <v-btn v-if="!isFavorite"
                    class="mx-2"
                    fab
                    dark
                    color="success"
                    @click="addToFavorite(hero)"
                >
                    <v-icon dark>mdi-plus</v-icon>
                </v-btn>
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