<script>
import HeroDisplayRow from '../components/HeroDisplayRow.vue'
import HeroDisplayColumn from '../components/HeroDisplayColumn.vue'
import NavBar from "../components/NavBar.vue";
import { mapState } from 'vuex'

export default {
    name: 'Heroes',
    data () {
        return {
            sortByUp: true,
            DisplayList: true,
            nbDisplayHeroes: [
                20,
                40,
                60,
                80
            ],
            currentNbDisplay: 20,
            currentPage: 1,
        }
    },
    components: {
        NavBar,
        HeroDisplayRow,
        HeroDisplayColumn,
    },
    computed: {
        ...mapState({
            isLoading: state => state.isLoading,
            heroes: state => state.heroes.results,
            notifMessage: state => state.notifMessage,
            allowReset: state => state.allowReset,
        })
    },
    methods: {
        addToFavorite(hero) {
            this.$store.dispatch('addToFavorite', hero)
        },
        changeDisplay() {
            this.DisplayList = !this.DisplayList
        },
        changeSort() {
            this.sortByUp = !this.sortByUp
        },
        reset() {
            this.$store.dispatch('getHeroesListFromMarvel')
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
                    <v-row no-gutters class="HeadPage">
                        <v-col md="6">
                            <h1> {{ $t('heroes.message') }} </h1>
                        </v-col>
                        <v-col md="2">
                            <router-link to="/AddHero"><v-btn
                                class="ma-2"
                                color="success"
                            >
                                {{ $t('heroes.addHero') }}
                            </v-btn></router-link>
                        </v-col>
                        <v-col md="2">
                            <v-select
                            class="NbHeroes"
                                v-model="currentNbDisplay"
                                :items="nbDisplayHeroes"
                                filled
                                dense
                            ></v-select>
                        </v-col>
                        <v-col md="2" class="ButtonDisplay">
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
                    <v-row no-gutters>
                        <v-col class="ButtonDisplay">
                            <v-btn v-if="this.allowReset"
                                class="mx-4"
                                dark
                                color="orange"
                                @click="reset()"
                            >
                                <v-icon dark>mdi-refresh-circle</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </div>
                <div v-if="isLoading">
                    <loader object="#ff9633" color1="#ffffff" color2="#17fd3d" size="5" speed="2" bg="#343a40" objectbg="#999793" opacity="80" name="dots"></loader>
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
                <v-row v-if="!isLoading" justify="center">
                    <div class="Pagination">
                        <v-pagination
                          v-model="currentPage"
                          :length='(this.$store.getters.getNbHeroes / this.currentNbDisplay).toFixed(0)'
                          :total-visible="7"
                        ></v-pagination>
                    </div>
                </v-row>
            </div>
        </div>
    </v-app>
</template>

<style>
.Pagination {
    margin-top: 3rem;
    margin-bottom: 3rem;
}

.HeadPage {
    align-items: center;
}

.NbHeroes {
    width: 25.5%;
    float: right;
}
</style>