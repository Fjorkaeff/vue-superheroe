<script>
import HeroDisplayRow from '../components/HeroDisplayRow.vue'
import HeroDisplayColumn from '../components/HeroDisplayColumn.vue'
import NavBar from "../components/NavBar.vue";

export default {
    name: 'Heroes',
    data () {
        return {
            favoriteHeroes: [],
            DisplayList: true,
            sortByUp: true
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
        }
    },
    computed: {
    },
    created() {
        this.favoriteHeroes = this.$store.getters.getFavoritesHeroes
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
                            <h1> {{ $t('dashboard.message') }} </h1>
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
            <div v-if="this.DisplayList">
                <HeroDisplayRow v-for="hero in favoriteHeroes" :key="hero.id" :hero="hero"></HeroDisplayRow>
            </div>
            <div v-if="!this.DisplayList">
                <HeroDisplayColumn v-for="hero in favoriteHeroes" :key="hero.id" :hero="hero"></HeroDisplayColumn>
            </div>
        </div>
    </div>
</v-app>
</template>
