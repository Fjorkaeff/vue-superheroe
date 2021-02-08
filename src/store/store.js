import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
const CryptoJS = require("crypto-js");
//const utils = require('./utils.json')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    heroes: [],
    favorites_heroes: []
  },
  getters: {
    getHeroes: (state) => {
      return state.heroes.results
    },
    getFavoritesHeroes: (state) => {
      return state.favorites_heroes
    },
    getNumberOfHeroes: (state) => {
      return state.heroes.count
    }
  },
  mutations: {
    setHeroesListFromMarvel(state, data) {
      state.heroes = data
    }
  },
  actions: {
    getHeroesListFromMarvel({commit}) {
      const PRIV_KEY = "2b101cf909b39cb27b679ea471287e2e2ba2aa81";
      const PUB_KEY = "e23507931830c9ee423da4a822ea0574";

      const ts = Date.now();
      const hash = CryptoJS.MD5(ts + PRIV_KEY + PUB_KEY).toString();
      const url = "http://gateway.marvel.com/v1/public/characters";
      Axios
        .get(url + '?ts=' + ts + '&apikey=' + PUB_KEY + '&hash=' + hash, {})
        .then(response => {
          commit('setHeroesListFromMarvel', response.data.data)
        })
    },
    //addToFavorite({commit}) {}
  },
  modules: {
  }
})
