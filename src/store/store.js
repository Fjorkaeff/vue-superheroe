import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
const CryptoJS = require("crypto-js");
//const utils = require('./utils.json')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    heroes: [],
    favorite_heroes: []
  },
  getters: {
    getHeroes: (state) => {
      return state.heroes.results
    },
    getFavoritesHeroes: (state) => {
      return state.favorite_heroes
    },
    getIsFavorite: (state, data) => {
      const favoriteHeroes = state.favorite_heroes
      favoriteHeroes.forEach(function(hero) {
        if (hero.id === data.id) {
          return true
        }
      })
      return false
    }
  },
  mutations: {
    setHeroesListFromMarvel(state, data) {
      state.heroes = data
    },
    setHeroToFavorite(state, data) {
      const favoriteHeroes = state.favorite_heroes
      const heroesList = state.heroes.results
      Vue.set(data, 'isFavorite', true)
      heroesList.forEach(function(hero) {
        if (data.id === hero.id) {
          Vue.set(hero, 'isFavorite', true)
        }
      })
      favoriteHeroes.push(data)
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
    addToFavorite({commit}, data) {
      commit('setHeroToFavorite', data)
    }
  },
  modules: {
  }
})
