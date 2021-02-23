<template>
  <v-app>
    <div>
      <NavBar></NavBar>
      <div class="Heroes">
        <div class="HeroesTitle">
          <v-row no-gutters class="HeadPage">
            <v-col md="6">
              <h1>{{ $t("dashboard.message") }}</h1>
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
                    {{ currentNbDisplayFav }}
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-for="nb in nbDisplayHeroesFav"
                    :key="nb"
                    @click="changeDisplayNumber(nb)"
                  >
                    <v-list-item-title style="margin-left: 7px">{{
                      nb
                    }}</v-list-item-title>
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
        <div v-if="isLoading" class="HeroesLoader">
          <v-progress-circular
            :size="200"
            color="primary"
            indeterminate
          ></v-progress-circular>
        </div>
        <v-container v-if="orderedFavoriteHeroes.length < 1" class="LonelyMeme">
          <h2>{{ $t("dashboard.noHero") }}</h2>
          <v-img
            src="@/assets/meme-wait.jpg"
            max-width="500"
            max-height="500"
            style="margin-top: 50px; margin-left: auto; margin-right: auto"
          ></v-img>
        </v-container>
        <v-container v-if="this.DisplayList">
          <HeroDisplayRow
            v-for="hero in orderedFavoriteHeroes"
            :key="hero.id"
            :hero="hero"
          ></HeroDisplayRow>
        </v-container>
        <div v-if="!this.DisplayList">
          <v-row no-gutters>
            <v-col md="3" v-for="hero in orderedFavoriteHeroes" :key="hero.id">
              <HeroDisplayColumn :hero="hero"></HeroDisplayColumn>
            </v-col>
          </v-row>
        </div>
        <v-row justify="center">
          <div class="Pagination">
            <v-pagination
              v-if="paginationLength > 0"
              v-model="currentPageFav"
              :length="paginationLength"
              :total-visible="5"
            ></v-pagination>
          </div>
        </v-row>
      </div>
    </div>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import { mapActions } from "vuex";
import HeroDisplayRow from "../components/HeroDisplayRow.vue";
import HeroDisplayColumn from "../components/HeroDisplayColumn.vue";
import NavBar from "../components/NavBar.vue";

export default {
  name: "Heroes",
  components: {
    NavBar,
    HeroDisplayRow,
    HeroDisplayColumn
  },
  data() {
    return {
      DisplayList: true,
      sortByName: true,
      sortByUp: true,
      nbDisplayHeroesFav: [20, 40, 60, 80],
      currentNbDisplayFav: 20,
      currentPageFav: 1
    };
  },
  computed: {
    ...mapState({
      heroes: state => state.heroes,
      isLoading: state => state.isLoading,
      allowReset: state => state.allowReset,
      searchHero: state => state.searchHero
    }),
    orderedFavoriteHeroes() {
      let search = this.searchHero.toLowerCase();
      let favoriteHeroesList = this.heroes;
      let ascDesc = this.sortByUp ? 1 : -1;
      let typeSort = this.sortByName;
      let offset = (this.currentPageFav - 1) * this.currentNbDisplayFav;
      let limit = offset + this.currentNbDisplayFav;

      if (favoriteHeroesList.results) {
        favoriteHeroesList = favoriteHeroesList.results.filter(item => item.isFavorite === true);

        if (search)
          favoriteHeroesList = favoriteHeroesList.filter(item => item.name.includes(search));
        if (typeSort) {
          favoriteHeroesList = favoriteHeroesList.sort((a, b) => ascDesc * a.name.localeCompare(b.name));
        } else {
          favoriteHeroesList = favoriteHeroesList.sort((a, b) => ascDesc * a.id - b.id);
        }
        favoriteHeroesList = favoriteHeroesList.slice(offset, limit);

        return favoriteHeroesList;
      } else {
        return null;
      }
    },
    paginationLength() {
      let favoriteHeroesList = this.heroes;
      let paginationLength;

      if (favoriteHeroesList.results) {
        favoriteHeroesList = favoriteHeroesList.results.filter(item => item.isFavorite === true);
        paginationLength = Math.ceil(favoriteHeroesList.length / this.currentNbDisplayFav);

        return paginationLength;
      } else {
        return 0;
      }
    }
  },
  created() {
    this.searchText("");
  },
  methods: {
    ...mapActions(["searchText"]),
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
      const previousNbDisplay = this.currentNbDisplayFav;
      this.currentNbDisplayFav = nb;
      const oldOffset = previousNbDisplay * (this.currentPageFav - 1);

      if (this.currentPageFav > 1 && this.currentNbDisplayFav < previousNbDisplay) {
        this.currentPageFav = oldOffset / this.currentNbDisplayFav + 1;
      }
      if (this.currentPageFav > 1 && this.currentNbDisplayFav > previousNbDisplay) {
        if (this.currentNbDisplayFav < oldOffset) this.currentPageFav = oldOffset / this.currentNbDisplayFav + 1;
        else this.currentPageFav = 1;
      }
    }
  }
};
</script>

<style>
.Pagination {
  margin-top: 3rem;
  margin-bottom: 3rem;
}

.HeroesLoader {
  margin: 10rem;
  text-align: center;
}

.LonelyMeme {
  text-align: center;
}
</style>
