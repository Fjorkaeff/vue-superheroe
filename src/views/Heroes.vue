<template>
  <v-app>
    <div>
      <NavBar></NavBar>
      <div class="Heroes">
        <div class="HeroesTitle">
          <v-row no-gutters class="HeadPage">
            <v-col md="6">
              <h1>{{ $t("heroes.message") }}</h1>
            </v-col>
            <v-col md="2">
              <router-link class="AddHeroLink" to="/AddHero"
                ><v-btn class="ma-2" color="success">
                  {{ $t("heroes.addHero") }}
                </v-btn></router-link
              >
            </v-col>
            <v-col md="2">
              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn v-bind="attrs" v-on="on" class="NbHeroes">
                    {{ currentNbDisplay }}
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="nb in nbDisplayHeroes"
                    :key="nb"
                    @click="changeDisplayNumber(nb)"
                  >
                    <v-list-item-title style="margin-left: 7px">
                      {{ nb }}
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-col>
            <v-col md="2" class="ButtonDisplay">
              <v-btn @click="changeTypeOfSort()">
                <v-icon v-if="this.sortByName">mdi-numeric</v-icon>
                <v-icon v-if="!this.sortByName">mdi-format-letter-case</v-icon>
              </v-btn>
              <v-btn @click="changeSort()">
                <v-icon v-if="this.sortByUp">mdi-arrow-down-thick</v-icon>
                <v-icon v-if="!this.sortByUp">mdi-arrow-up-thick</v-icon>
              </v-btn>
              <v-btn @click="changeDisplay()">
                <v-icon v-if="this.DisplayList">mdi-view-grid</v-icon>
                <v-icon v-if="!this.DisplayList"
                  >mdi-format-list-bulleted</v-icon
                >
              </v-btn>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col class="ButtonDisplay">
              <v-btn
                v-if="this.allowReset"
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
        <div v-if="isLoading" class="HeroesLoader">
          <v-progress-circular
            :size="200"
            color="primary"
            indeterminate
          ></v-progress-circular>
        </div>
        <v-container v-if="this.DisplayList && !isLoading">
          <HeroDisplayRow
            v-for="hero in orderedHeroes"
            :key="hero.id"
            :hero="hero"
          ></HeroDisplayRow>
        </v-container>
        <div v-if="!this.DisplayList && !isLoading">
          <v-row no-gutters>
            <v-col md="3" v-for="hero in orderedHeroes" :key="hero.id">
              <HeroDisplayColumn :hero="hero"></HeroDisplayColumn>
            </v-col>
          </v-row>
        </div>
        <v-row v-if="!isLoading" justify="center">
          <div v-if="!isPaginationLoading" class="Pagination">
            <v-pagination
              v-model="currentPage"
              :length="paginationLength"
              :total-visible="10"
            ></v-pagination>
          </div>
          <v-btn
            v-if="!isPaginationLoading && heroesLength < heroesMaxNumber"
            class="Pagination"
            @click="loadMoreHeroes()"
          >
            <v-icon>mdi-plus-thick</v-icon>
          </v-btn>
          <div v-if="isPaginationLoading" class="Pagination">
            <v-progress-circular
              :size="50"
              color="primary"
              indeterminate
            ></v-progress-circular>
          </div>
        </v-row>
      </div>
    </div>
  </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import HeroDisplayRow from '../components/HeroDisplayRow.vue';
import HeroDisplayColumn from '../components/HeroDisplayColumn.vue';
import NavBar from '../components/NavBar.vue';

export default {
  name: 'Heroes',
  components: {
    NavBar,
    HeroDisplayRow,
    HeroDisplayColumn,
  },
  data() {
    return {
      sortByUp: true,
      DisplayList: true,
      sortByName: true,
      nbDisplayHeroes: [
        20,
        40,
        60,
        80
      ],
      currentNbDisplay: 20,
      currentPage: 1
    }
  },
  computed: {
    ...mapState({
      isLoading: state => state.isLoading,
      isPaginationLoading: state => state.isPaginationLoading,
      heroes: state => state.heroes,
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

      if (heroesList.results) {
        heroesList = heroesList.results;

        if (search) heroesList = heroesList.filter(item => item.name.toLowerCase().includes(search));
        if (typeSort) {
          heroesList.results = heroesList.sort((a, b) => ascDesc * a.name.localeCompare(b.name));
        } else {
          heroesList = heroesList.sort((a, b) => ascDesc * a.id - b.id);
        }
        heroesList = heroesList.slice(offset, limit);

        return heroesList;
      } else {
        return null;
      }
    },
    paginationLength() {
      let heroesList = this.heroes;
      let paginationLength;

      if (heroesList.results) {
        paginationLength = Math.ceil(heroesList.results.length / this.currentNbDisplay);
        return paginationLength;
      } else {
        return 0;
      }
    },
    heroesLength() {
      let heroesNumber = this.heroes;

      if (heroesNumber.results) {
        return heroesNumber.results.length;
      } else {
        return 0;
      }
    },
    heroesMaxNumber() {
      let heroesList = this.heroes;

      if (heroesList.results) {
        return heroesList.total;
      } else {
        return 0;
      }
    }
  },
  created() {
    this.searchText('');
  },
  methods: {
    ...mapActions([
      'getHeroesListFromMarvel',
      'getHeroesListFromMarvelWithOffset',
      'searchText'
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
      let previousNbDisplay = this.currentNbDisplay;
      this.currentNbDisplay = nb;
      let oldOffset = previousNbDisplay * (this.currentPage - 1);

      if (this.currentPage > 1 && this.currentNbDisplay < previousNbDisplay) {
        this.currentPage = (oldOffset / this.currentNbDisplay) + 1;
      }
      if (this.currentPage > 1 && this.currentNbDisplay > previousNbDisplay) {
        if (this.currentNbDisplay < oldOffset) this.currentPage = (oldOffset / this.currentNbDisplay) + 1;
        else this.currentPage = 1;
      }
    },
    loadMoreHeroes() {
      this.getHeroesListFromMarvelWithOffset();
    },
    reset() {
      this.getHeroesListFromMarvel();
    }
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

.HeroesLoader {
  margin: 10rem;
  text-align: center;
}
</style>