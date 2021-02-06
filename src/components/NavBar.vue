<script>
import i18n from '../i18n';

export default {
  name: 'NavBar',
  data: function () {
    return {
      drawer: false,
      languages: [
        {
          flag: 'fr',
          language: 'fr',
          title: 'Français'
        },
        {
         flag: 'us',
         language: 'en',
         title: 'English' 
        } 
      ]
    }
  },
  methods: {
      changeLocale(locale) {
        i18n.locale = locale;
      }
  }
}
</script>


<template>
  <div>
    <div><router-link to="/"><img src="../assets/bandeau.jpg"/></router-link></div>
    <div>
      <ul>
        <li><router-link to="/"><h1>{{ $t('NavBar.title1') }}</h1></router-link></li>
        <li><router-link to="/Heroes"><h1>{{ $t('NavBar.title2') }}</h1></router-link></li>
        <button v-for="entry in languages" :key="entry.title" @click="changeLocale(entry.language)"><flag :iso="entry.flag" v-bind:squared=false /> {{ entry.title }} </button>
      </ul>
    </div>
  </div>
</template>