<script>
import HeroDisplayRow from '../components/HeroDisplayRow.vue'
import HeroDisplayColumn from '../components/HeroDisplayColumn.vue'
import NavBar from "../components/NavBar.vue";
import { mapState } from 'vuex'

export default {
    name: 'Heroes',
    data () {
        return {
            searchHeroes: [],
            sortByUp: true,
            DisplayList: true,
            nbDisplayHeroes: {
                nb1: 20,
                nb2: 40,
                nb3: 60,
                nb4: 80
            }
        }
    },
    components: {
        NavBar,
        HeroDisplayRow,
        HeroDisplayColumn
    },
    computed: mapState({
        isLoading: state => state.isLoading,
        heroes: state => state.heroes.results
    }),
    methods: {
        addToFavorite(hero) {
            this.$store.dispatch('addToFavorite', hero)
        },
        changeDisplay() {
            this.DisplayList = !this.DisplayList
            console.log('HERO : ', this.heroes)
        },
        changeSort() {
            this.sortByUp = !this.sortByUp
        }
    },
    mounted() {
    }
}
</script>

<template>
    <v-app>
        <div>
            <NavBar></NavBar>
            <div class="Heroes">
                <div class="HeroesTitle">
                    <v-row no-gutters>
                        <v-col md="8">
                            <h1> {{ $t('heroes.message') }} </h1>
                        </v-col>
                        <v-col md="4" class="ButtonDisplay">
                            <v-btn
                                @click="changeSort()"
                            >
                                <v-icon v-if="this.sortByUp">mdi-arrow-down-thick</v-icon>
                                <v-icon v-if="!this.sortByUp">mdi-arrow-up-thick</v-icon>
                            </v-btn>
                            <v-btn
                                @click="changeDisplay()"
                            >
                                <v-icon v-if="this.DisplayList">mdi-format-list-bulleted</v-icon>
                                <v-icon v-if="!this.DisplayList">mdi-view-grid</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </div>
                <div v-if="isLoading">
                    Loading <v-icon>fas fa-circle-notch fa-spin</v-icon>
                </div>
                <div v-if="this.DisplayList && !isLoading">
                    <HeroDisplayRow v-for="hero in heroes" :key="hero.id" :hero="hero"></HeroDisplayRow>
                </div>
                <div v-if="!this.DisplayList && !isLoading">
                    <v-row no-gutters>
                        <v-col md="3" v-for="hero in heroes" :key="hero.id">
                            <HeroDisplayColumn :hero="hero"></HeroDisplayColumn>
                        </v-col>
                    </v-row>
                </div>
            </div>
        </div>
    </v-app>
</template>