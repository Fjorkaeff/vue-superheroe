<script>
import HeroDisplayRow from '../components/HeroDisplayRow.vue'
import HeroDisplayColumn from '../components/HeroDisplayColumn.vue'
import NavBar from "../components/NavBar.vue";
import { mapState } from 'vuex'

export default {
    name: 'Heroes',
    data () {
        return {
            DisplayList: true,
            sortByName: true,
            sortByUp: true,
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
       HeroDisplayColumn
    },
    methods: {
        changeDisplay() {
            this.DisplayList = !this.DisplayList
        },
        changeSort() {
            this.sortByUp = !this.sortByUp
        },
        changeTypeOfSort() {
            this.sortByName = !this.sortByName
        },
        changeDisplayNumber(nb) {
            this.currentNbDisplay = nb
        },
    },
    computed: {
        ...mapState({
            favoriteHeroes: state => state.favorite_heroes,
            allowReset: state => state.allowReset,
            searchHero: state => state.searchHero
        }),
        orderedFavoriteHeroes: function () {
            let search = this.searchHero
            let favoriteHeroesList = this.favoriteHeroes
            let ascDesc = this.sortByUp ? 1 : -1;
            let offset = (this.currentPage - 1) * this.currentNbDisplay;
            let limit = offset + this.currentNbDisplay

            if(search) {
                favoriteHeroesList = favoriteHeroesList.filter(item => item.name.includes(search));
            }

            favoriteHeroesList = favoriteHeroesList.sort((a, b) => ascDesc * a.name.localeCompare(b.name));

            favoriteHeroesList = favoriteHeroesList.slice(offset, limit)

            return favoriteHeroesList
        }
    },
    created() {}
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
                            <h1> {{ $t('dashboard.message') }} </h1>
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
                                <v-icon v-if="this.DisplayList">mdi-format-list-bulleted</v-icon>
                                <v-icon v-if="!this.DisplayList">mdi-view-grid</v-icon>
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
            <div v-if="this.DisplayList">
                <HeroDisplayRow v-for="hero in orderedFavoriteHeroes" :key="hero.id" :hero="hero"></HeroDisplayRow>
            </div>
            <div v-if="!this.DisplayList">
                <v-row no-gutters>
                    <v-col md="3" v-for="hero in orderedFavoriteHeroes" :key="hero.id">
                        <HeroDisplayColumn :hero="hero"></HeroDisplayColumn>
                    </v-col>
                </v-row>
            </div>
        </div>
    </div>
</v-app>
</template>
