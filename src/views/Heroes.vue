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
                            <router-link class="AddHeroLink" to="/AddHero"><v-btn
                                class="ma-2"
                                color="success"
                            >
                                {{ $t('heroes.addHero') }}
                            </v-btn></router-link>
                        </v-col>
                        <v-col md="2">
                            <v-menu offset-y>
                              <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                    v-bind="attrs"
                                    v-on="on"
                                    class="NbHeroes"
                                >
                                {{ currentNbDisplay }}
                                </v-btn>
                              </template>
                              <v-list>
                                <v-list-item v-for="nb in nbDisplayHeroes" :key="nb" @click="changeDisplayNumber(nb)">
                                  <v-list-item-title style="margin-left:7px">{{ nb }}</v-list-item-title>
                                </v-list-item>
                              </v-list>
                            </v-menu>
                        </v-col>
                        <v-col md="2" class="ButtonDisplay">
                            <v-btn
                                @click="changeTypeOfSort()"
                            >
                                <v-icon v-if="this.sortByName">mdi-format-letter-case</v-icon>
                                <v-icon v-if="!this.sortByName">mdi-numeric</v-icon>
                            </v-btn>
                            <v-btn
                                @click="changeSort()"
                            >
                                <v-icon v-if="this.sortByUp">mdi-arrow-down-thick</v-icon>
                                <v-icon v-if="!this.sortByUp">mdi-arrow-up-thick</v-icon>
                            </v-btn>
                            <v-btn
                                @click="changeDisplay()"
                            >
                                <v-icon v-if="this.DisplayList">mdi-view-grid</v-icon>
                                <v-icon v-if="!this.DisplayList">mdi-format-list-bulleted</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                    <v-row no-gutters>
                        <v-col class="ButtonDisplay">
                            <v-btn v-if="this.allowReset"
                            disabled
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
                    <HeroDisplayRow v-for="hero in orderedHeroes" :key="hero.id" :hero="hero"></HeroDisplayRow>
                </div>
                <div v-if="!this.DisplayList && !isLoading">
                    <v-row no-gutters>
                        <v-col md="3" v-for="hero in orderedHeroes" :key="hero.id">
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

<script>
import {mapState, mapActions} from 'vuex';
import HeroDisplayRow from '../components/HeroDisplayRow.vue';
import HeroDisplayColumn from '../components/HeroDisplayColumn.vue';
import NavBar from '../components/NavBar.vue';

export default {
    name: 'Heroes',
    data () {
        return {
            sortByUp: true,
            DisplayList: true,
            sortByName: true,
            maxNbHeroes: null,
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
            allowReset: state => state.allowReset,
            searchHero: state => state.searchHero
        }),
        orderedHeroes() {
            let search = this.searchHero.toLowerCase();
            let heroesList = this.heroes;
            let ascDesc = this.sortByUp ? 1 : -1;
            let typeSort = this.sortByName;
            let offset = (this.currentPage - 1) * this.currentNbDisplay;
            let limit = offset + this.currentNbDisplay;
            let max = this.maxNbHeroes;

            if (search) heroesList = heroesList.filter(item => item.name.toLowerCase().includes(search));

            if (typeSort) {
               heroesList = heroesList.sort((a, b) => ascDesc * a.name.localeCompare(b.name));
            } else {
                heroesList = heroesList.sort((a, b) => ascDesc * a.id - b.id);
            }

            if (limit > heroesList.length && heroesList.length < max) {
                this.$store.dispatch('Loading', true)
            } else {
                this.$store.dispatch('Loading', false)
                heroesList = heroesList.slice(offset, limit)
            }

            return heroesList
        }
    },
    methods: {
        ...mapActions([
            'getHeroesListFromMarvel'
        ]),
        changeDisplay() {
            this.DisplayList = !this.DisplayList;
        },
        changeSort() {
            this.sortByUp = !this.sortByUp;
        },
        changeTypeOfSort() {
            this.sortByName = !this.sortByName;
        },
        changeDisplayNumber(nb) {
            this.currentNbDisplay = nb;
        },
        reset() {
            this.getHeroesListFromMarvel;
        }
    },
    mounted() {
        this.maxNbHeroes = this.$store.getters.getNbHeroes;
    }
}
</script>



<style>
.Pagination {
    margin-top: 3rem;
    margin-bottom: 3rem;
}

.HeadPage {
    align-items: center;
}

.NbHeroes {
    float: right;
}

.AddHeroLink {
    text-decoration: none;
}
</style>