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
    searchHero : '',
    notifMessage: '',
    isLoading: false,
    isEdit: false,
    allowReset: false,
    idAvailable: 1
  },
  getters: {
    getFavoritesHeroes: (state) => {
      return state.favorite_heroes
    },
    getHeroToModify: (state) => {
      return state.heroToModify
    },
    getNbHeroes: (state) => {
      return state.heroes.total
    }
  },
  mutations: {
    SET_HEROES_LIST_FROM_MARVEL(state, data) {
      state.heroes = data
    },
    SET_HERO_FROM_MARVEL(state, data) {
      const favoriteHeroes = state.favorite_heroes
      const heroesList = state.heroes.results
      const indexFav = data.indexFavHero;
      const indexHero = data.indexHero;
      const resHero = data.hero[0]

      favoriteHeroes.splice(indexFav, 1)
      favoriteHeroes.push(resHero)
      
      heroesList.splice(indexHero, 1)
      heroesList.push(resHero)
    },
    SET_MORE_HEROES_LIST_FROM_MARVEL(state, data) {
      const heroesList = state.heroes.results
      data.forEach(function(hero) {
        heroesList.push(hero)
      })
    },
    SET_HERO_TO_FAVORITE(state, data) {
      const favoriteHeroes = state.favorite_heroes
      const heroesList = state.heroes.results

      Vue.set(data.hero, 'isFavorite', true)
      Vue.set(heroesList[data.index], 'isFavorite', true)

      favoriteHeroes.push(data.hero)
    },
    SET_LOADING_STATUS(state, status){
      state.isLoading = status
    },
    UNSET_HERO_FROM_FAVORITE(state, data) {
      const favoriteHeroes = state.favorite_heroes
      const heroesList = state.heroes.results

      favoriteHeroes.splice(data.indexFavHero, 1)
      Vue.set(heroesList[data.indexHero], 'isFavorite', false)
    },
    DELETE_HERO(state, index) {
      const favoriteHeroes = state.favorite_heroes;
      const heroesList = state.heroes.results;
      const indexFav = index.indexFavHero;
      const indexHero = index.indexHero;

      favoriteHeroes.splice(indexFav, 1)
      heroesList.splice(indexHero, 1)
    },
    SET_HERO_TO_MODIFY(state, data) {
      state.heroToModify = data
    },
    MODIFY_HERO(state, data) {
      const heroId = data.heroId
      const newName = data.newName
      const newDescription = data.newDescription
      
      const favoriteHeroes = state.favorite_heroes
      const heroesList = state.heroes.results
      const heroModify = state.heroToModify

      heroModify.name = newName
      heroModify.description = newDescription

      heroesList.forEach(function(hero) {
        if (hero.id === heroId) {
          Vue.set(hero, 'isModified', true)
          hero.name = newName
          hero.description = newDescription
        }
      })

      favoriteHeroes.forEach(function(hero) {
        if (hero.id === heroId) {
          Vue.set(hero, 'isModified', true)
          hero.name = newName
          hero.description = newDescription
        }
      })
    },
    ADD_HERO(state, data) {
      const heroesList = state.heroes.results
      const idAvailable = state.idAvailable

      Vue.set(data, 'id', idAvailable)
      heroesList.push(data)
    },
    setNotifMessage(state, message) {
      state.notifMessage = message
    },
    EDIT (state) {
      state.isEdit = !state.isEdit
    },
    ALLOW_RESET (state, bool) {
      state.allowReset = bool
    },
    SEARCH_TEXT (state, text) {
      state.searchHero = text
    }
  },
  actions: {
    getHeroesListFromMarvel({commit}) {
      const PRIV_KEY = "2b101cf909b39cb27b679ea471287e2e2ba2aa81";
      const PUB_KEY = "e23507931830c9ee423da4a822ea0574";

      const ts = Date.now();
      const hash = CryptoJS.MD5(ts + PRIV_KEY + PUB_KEY).toString();
      const url = "http://gateway.marvel.com/v1/public/characters";

      commit('SET_LOADING_STATUS', true)
      Axios
        .get(url + '?ts=' + ts + '&apikey=' + PUB_KEY + '&hash=' + hash + '&limit=100', {})
        .then(response => {
          commit('SET_HEROES_LIST_FROM_MARVEL', response.data.data)
          commit('ALLOW_RESET', false)
          commit('SET_LOADING_STATUS', false)
        })
    },
    getHeroesListFromMarvelWithOffset({commit}, offset) {	
      const PRIV_KEY = "2b101cf909b39cb27b679ea471287e2e2ba2aa81";	
      const PUB_KEY = "e23507931830c9ee423da4a822ea0574";	

      const ts = Date.now();	
      const hash = CryptoJS.MD5(ts + PRIV_KEY + PUB_KEY).toString();	
      const url = "http://gateway.marvel.com/v1/public/characters";	

      commit('SET_LOADING_STATUS', true)	
      Axios	
        .get(url + '?ts=' + ts + '&apikey=' + PUB_KEY + '&hash=' + hash + '&limit=100&offset=' + offset, {})	
        .then(response => {	
          commit('SET_MORE_HEROES_LIST_FROM_MARVEL', response.data.data.results)	
          commit('ALLOW_RESET', false)	
          commit('SET_LOADING_STATUS', false)
        })
    },
    resetHero({commit}, data) {
      const PRIV_KEY = "2b101cf909b39cb27b679ea471287e2e2ba2aa81";
      const PUB_KEY = "e23507931830c9ee423da4a822ea0574";

      const ts = Date.now();
      const hash = CryptoJS.MD5(ts + PRIV_KEY + PUB_KEY).toString();
      const id = data.id;
      const url = "http://gateway.marvel.com/v1/public/characters/" + id;

      commit('SET_LOADING_STATUS', true)
      Axios
        .get(url + '?ts=' + ts + '&apikey=' + PUB_KEY + '&hash=' + hash, {})
        .then(response => {
          let data = {
            hero: response.data.data.results,
            indexFavHero: null,
            indexHero: null
          }
    
          this.state.favorite_heroes.find(hero => {
            if (hero.id === id) {
              data.indexFavHero = this.state.favorite_heroes.indexOf(hero)
            }
          })
          this.state.heroes.results.find(hero => {
            if (hero.id === id) {
              data.indexHero = this.state.heroes.results.indexOf(hero)
            }
          })
          commit('SET_HERO_FROM_MARVEL', data)
          commit('SET_LOADING_STATUS', false)
        })
    },
    addToFavorite({commit}, favHero) {
      let data = {
        hero: favHero,
        index: null
      }

      this.state.heroes.results.find(hero => {
        if (hero.id === favHero.id) {
          data.index = this.state.heroes.results.indexOf(hero)
        }
      })
      commit('SET_HERO_TO_FAVORITE', data)
    },
    deleteFromFavorite({commit}, favHero) {
      let data = {
        hero: favHero,
        indexFavHero: null,
        indexHero: null
      }

      this.state.heroes.results.find(hero => {
        if (hero.id === favHero.id) {
          data.indexHero = this.state.heroes.results.indexOf(hero)
        }
      })
      this.state.favorite_heroes.find(hero => {
        if (hero.id === favHero.id) {
          data.indexFavHero = this.state.favorite_heroes.indexOf(hero)
        }
      })
      commit('UNSET_HERO_FROM_FAVORITE', data)
    },
    deleteHero({commit}, data) {
      let index = {
        indexFavHero: null,
        indexHero: null
      }

      this.state.favorite_heroes.find(hero => {
        if (hero.id === data.id) {
          index.indexFavHero = this.state.favorite_heroes.indexOf(hero)
        }
      })
      this.state.heroes.results.find(hero => {
        if (hero.id === data.id) {
          index.indexHero = this.state.heroes.results.indexOf(hero)
        }
      })
      commit('DELETE_HERO', index)
    },
    modifyHero({commit}, data) {
      commit('MODIFY_HERO', data)
    },
    setHeroToModify({commit}, data) {
      commit('SET_HERO_TO_MODIFY', data)
    },
    addHero({commit}, data) {
      commit('ADD_HERO', data)
    },
    setNotifMessage({commit}, message) {
      commit('setNotifMessage', message)
    },
    edit({commit}) {
      commit('EDIT')
    },
    allowReset({commit}, bool) {
      commit('ALLOW_RESET', bool)
    },
    searchText({commit}, text) {
      commit('SEARCH_TEXT', text)
    },
    Loading({commit}, status) {
      commit('SET_LOADING_STATUS', status)
    }
  }
})
