import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
const CryptoJS = require("crypto-js");

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    heroes: [],
    heroToModify: {},
    searchHero : '',
    notifMessage: '',
    isLoading: false,
    isPaginationLoading: false,
    isLoadingReset: false,
    isEdit: false,
    allowReset: false,
    idAvailable: 1
  },
  getters: {
    getHeroToModify: (state) => {
      return state.heroToModify;
    },
    getNbHeroes: (state) => {
      return state.heroes.total;
    }
  },
  mutations: {
    SET_HEROES_LIST_FROM_MARVEL(state, data) {
      state.heroes = data;
    },
    SET_HERO_FROM_MARVEL(state, data) {
      const indexHero = data.indexHero;
      const resHero = data.hero;
      
      state.heroes.results.splice(indexHero, 1);
      state.heroes.results.push(resHero);
    },
    SET_MORE_HEROES_LIST_FROM_MARVEL(state, data) {
      data.forEach(function(hero) {
        state.heroes.results.push(hero);
      })
    },
    SET_HERO_TO_FAVORITE(state, index) {
      state.heroes.results[index].isFavorite = true;
    },
    SET_LOADING_STATUS(state, status){
      state.isLoading = status;
    },
    SET_PAGINATION_LOADING_STATUS(state, status){
      state.isPaginationLoading = status;
    },
    SET_RESET_LOADING_STATUS(state, status){
      state.isLoadingReset = status;
    },
    UNSET_HERO_FROM_FAVORITE(state, index) {
      state.heroes.results[index].isFavorite = false;
    },
    DELETE_HERO(state, index) {
      state.heroes.results.splice(index, 1);
    },
    SET_HERO_TO_MODIFY(state, data) {
      state.heroToModify = data;
    },
    MODIFY_HERO(state, data) {
      const newName = data.hero.newName;
      const newDescription = data.hero.newDescription;
      
      state.heroToModify.name = newName;
      state.heroToModify.description = newDescription;

      Vue.set(state.heroes.results[data.indexHero], 'isModified', true);
      state.heroes.results[data.indexHero].name = newName;
      state.heroes.results[data.indexHero].description = newDescription;
    },
    ADD_HERO(state, data) {
      let idAvailable = state.idAvailable;

      Vue.set(data, 'id', idAvailable);
      idAvailable++;
      state.heroes.results.push(data);
      console.log(idAvailable)
    },
    setNotifMessage(state, message) {
      state.notifMessage = message;
    },
    EDIT (state) {
      state.isEdit = !state.isEdit;
    },
    ALLOW_RESET (state, bool) {
      state.allowReset = bool;
    },
    SEARCH_TEXT (state, text) {
      state.searchHero = text;
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
          for (let i = 0; i < response.data.data.count; i++) {
            Vue.set(response.data.data.results[i], 'isFavorite', false);
          }
          commit('SET_HEROES_LIST_FROM_MARVEL', response.data.data)
          commit('ALLOW_RESET', false)
          commit('SET_LOADING_STATUS', false)
        })
    },
    getHeroesListFromMarvelWithOffset({commit, state}) {	
      const PRIV_KEY = "2b101cf909b39cb27b679ea471287e2e2ba2aa81";	
      const PUB_KEY = "e23507931830c9ee423da4a822ea0574";	
      const offset = state.heroes.results.length;
      const ts = Date.now();	
      const hash = CryptoJS.MD5(ts + PRIV_KEY + PUB_KEY).toString();	
      const url = "http://gateway.marvel.com/v1/public/characters";	

      commit('SET_PAGINATION_LOADING_STATUS', true)	
      Axios	
        .get(url + '?ts=' + ts + '&apikey=' + PUB_KEY + '&hash=' + hash + '&limit=100&offset=' + offset, {})	
        .then(response => {
          for (let i = 0; i < response.data.data.count; i++) {
            Vue.set(response.data.data.results[i], 'isFavorite', false);
          }	
          commit('SET_MORE_HEROES_LIST_FROM_MARVEL', response.data.data.results)	
          commit('ALLOW_RESET', false)	
          commit('SET_PAGINATION_LOADING_STATUS', false)
        })
    },
    resetHero({commit, state}, data) {
      const PRIV_KEY = "2b101cf909b39cb27b679ea471287e2e2ba2aa81";
      const PUB_KEY = "e23507931830c9ee423da4a822ea0574";

      const ts = Date.now();
      const hash = CryptoJS.MD5(ts + PRIV_KEY + PUB_KEY).toString();
      const id = data.id;
      const url = "http://gateway.marvel.com/v1/public/characters/" + id;

      commit('SET_RESET_LOADING_STATUS', true)
      Axios
        .get(url + '?ts=' + ts + '&apikey=' + PUB_KEY + '&hash=' + hash, {})
        .then(response => {
          Vue.set(response.data.data.results[0], 'isFavorite', false)
          let data = {
            hero: response.data.data.results[0],
            indexHero: state.heroes.results.findIndex(hero => hero.id === id)
          }
          commit('SET_HERO_FROM_MARVEL', data)
          commit('SET_RESET_LOADING_STATUS', false)
        })
    },
    addToFavorite({commit, state}, favHero) {
      let index = state.heroes.results.findIndex(hero => hero.id === favHero.id);
      commit('SET_HERO_TO_FAVORITE', index)
    },
    deleteFromFavorite({commit, state}, favHero) {
      let index = state.heroes.results.findIndex(hero => hero.id === favHero.id);
      commit('UNSET_HERO_FROM_FAVORITE', index)
    },
    deleteHero({commit, state}, data) {
      let index = state.heroes.results.findIndex(hero => hero.id === data.id);
      commit('DELETE_HERO', index)
    },
    modifyHero({commit, state}, modifyHero) {
      let data = {
        hero: modifyHero,
        indexHero: state.heroes.results.findIndex(hero => hero.id === modifyHero.heroId)
      }
      commit('MODIFY_HERO', data)
    },
    setHeroToModify({commit}, data) {
      commit('SET_HERO_TO_MODIFY', data)
    },
    addHero({commit}, data) {
      if (!data.isImg) Vue.set(data, 'img', '../assets/batman.jpg')
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
