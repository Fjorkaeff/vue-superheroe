import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
const CryptoJS = require("crypto-js");

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    heroes: [],
    favorite_heroes: [],
    heroToModify: {},
    notifMessage: '',
    isLoading: false,
    isEdit: false,
    allowReset: false
  },
  getters: {
    getHeroes: (state) => {
      return state.heroes.results
    },
    getFavoritesHeroes: (state) => {
      return state.favorite_heroes
    },
    getHeroToModify: (state) => {
      return state.heroToModify
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
    setHeroFromMarvel(state, data) {
      const favoriteHeroes = state.favorite_heroes
      const heroesList = state.heroes.results
      const resHero = data[0]

      favoriteHeroes.find(hero => {
        if (hero.id === resHero.id) {
          favoriteHeroes.splice(favoriteHeroes.indexOf(hero), 1)
          favoriteHeroes.push(resHero)
        }
      })
      heroesList.find(hero => {
        if (hero.id === resHero.id) {
          heroesList.splice(heroesList.indexOf(hero), 1)
          heroesList.push(resHero)
        }
      })
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
    },
    setLoadingStatus(state, status){
      state.isLoading = status
    },
    unsetHeroFromFavorite(state, data) {
      const favoriteHeroes = state.favorite_heroes
      const heroesList = state.heroes.results
      heroesList.forEach(function(hero) {
        if (hero.id === data.id) {
          Vue.set(hero, 'isFavorite', false)
        }
      })
      favoriteHeroes.find(hero => {
        if (hero.id === data.id) {
          favoriteHeroes.splice(favoriteHeroes.indexOf(hero), 1)
        }
      })
    },
    deleteHero(state, data) {
      const favoriteHeroes = state.favorite_heroes
      const heroesList = state.heroes.results

      favoriteHeroes.find(hero => {
        if (hero.id === data.id) {
          favoriteHeroes.splice(favoriteHeroes.indexOf(hero), 1)
        }
      })
      heroesList.find(hero => {
        if (hero.id === data.id) {
          heroesList.splice(heroesList.indexOf(hero), 1)
        }
      })
    },
    setHeroToModify(state, data) {
      state.heroToModify = data
    },
    modifyHero(state, data) {
      const heroId = data.heroId
      const newName = data.newName
      //const newDescription = data.description
      
      const favoriteHeroes = state.favorite_heroes
      const heroesList = state.heroes.results
      const heroModify = state.heroToModify

      heroModify.name = newName
      //heroModify.description = newDescription

      heroesList.forEach(function(hero) {
        if (hero.id === heroId) {
          Vue.set(hero, 'isModified', true)
          hero.name = newName
          //hero.description = newDescription
        }
      })

      favoriteHeroes.forEach(function(hero) {
        if (hero.id === heroId) {
          Vue.set(hero, 'isModified', true)
          hero.name = newName
          //hero.description = newDescription
        }
      })
    },
    setNotifMessage(state, message) {
      state.notifMessage = message
    },
    edit (state) {
      state.isEdit = !state.isEdit
    },
    allowReset (state, bool) {
      state.allowReset = bool
    }
  },
  actions: {
    getHeroesListFromMarvel({commit}) {
      const PRIV_KEY = "2b101cf909b39cb27b679ea471287e2e2ba2aa81";
      const PUB_KEY = "e23507931830c9ee423da4a822ea0574";

      const ts = Date.now();
      const hash = CryptoJS.MD5(ts + PRIV_KEY + PUB_KEY).toString();
      const url = "http://gateway.marvel.com/v1/public/characters";

      commit('setLoadingStatus', true)
      Axios
        .get(url + '?ts=' + ts + '&apikey=' + PUB_KEY + '&hash=' + hash, {})
        .then(response => {
          commit('setHeroesListFromMarvel', response.data.data)
          commit('allowReset', false)
          commit('setLoadingStatus',false)
        })
    },
    addToFavorite({commit}, data) {
      commit('setHeroToFavorite', data)
    },
    deleteFromFavorite({commit}, data) {
      commit('unsetHeroFromFavorite', data)
    },
    deleteHero({commit}, data) {
      commit('deleteHero', data)
    },
    modifyHero({commit}, data) {
      commit('modifyHero', data)
    },
    setHeroToModify({commit}, data) {
      commit('setHeroToModify', data)
    },
    setNotifMessage({commit}, message) {
      commit('setNotifMessage', message)
    },
    edit({commit}) {
      commit('edit')
    },
    allowReset({commit}, bool) {
      commit('allowReset', bool)
    },
    resetHero({commit}, data) {
      const PRIV_KEY = "2b101cf909b39cb27b679ea471287e2e2ba2aa81";
      const PUB_KEY = "e23507931830c9ee423da4a822ea0574";

      const ts = Date.now();
      const hash = CryptoJS.MD5(ts + PRIV_KEY + PUB_KEY).toString();
      const id = data.id;
      const url = "http://gateway.marvel.com/v1/public/characters/" + id;

      commit('setLoadingStatus', true)
      Axios
        .get(url + '?ts=' + ts + '&apikey=' + PUB_KEY + '&hash=' + hash, {})
        .then(response => {
          commit('setHeroFromMarvel', response.data.data.results)
          commit('setLoadingStatus', false)
        })
    }
  },
  modules: {
  }
})
