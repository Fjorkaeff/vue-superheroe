<template>
  <div>
    <div><router-link to="/"><img class="imgSite" src="../assets/bandeau.jpg"/></router-link></div>
    <v-app-bar color="#DF1E1E">
      <router-link class="router-link" to="/"><v-toolbar-title class="title">{{ $t('NavBar.title2') }}</v-toolbar-title></router-link>
      <router-link class="router-link" to="/Dashboard"><v-toolbar-title class="title">{{ $t('NavBar.title1') }}</v-toolbar-title></router-link>
      <v-spacer></v-spacer>
      <input class="searchBar" type="text" v-model="search" :placeholder="$t('NavBar.searchTitle')"/>
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              dark
              v-bind="attrs"
              v-on="on"
          >
          {{ $t('NavBar.language') }}
          </v-btn>
        </template>
        <div class="LangueList">
          <v-list>
            <v-list-item v-for="lang in languages" :key="lang.title" style="z-index:10" @click="changeLocale(lang.language)">
              <flag :iso="lang.flag" v-bind:squared=false />
              <v-list-item-title style="margin-left:7px">{{ lang.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </div>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
import i18n from '../i18n';

export default {
  name: 'NavBar',
  data () {
    return {
      languages: [
        {
          flag: 'us',
          language: 'en',
          title: 'English' 
        },
        {
          flag: 'es',
          language: 'es',
          title:'Español'
        },
        {
          flag: 'fr',
          language: 'fr',
          title: 'Français'
        },
        {
          flag: 'ru',
          language: 'ru',
          title: 'русский'
        },
        {
          flag: 'cn',
          language: 'cn',
          title: '中文'
        },
        {
          flag: 'kr',
          language: 'kr',
          title: '한국어'
        },
        {
          flag: 'jp',
          language: 'jp',
          title: 'にほんご'
        }
      ],
      search: ''
    }
  },
  watch: {
    search: function () {
      this.$store.dispatch('searchText', this.search);
    }
  },
  methods: {
    changeLocale(locale) {
      i18n.locale = locale;
    }
  }
}
</script>


<style>
.imgSite {
  margin: 0;
  padding: 0;
  display: block;
}

.title {
  color: white;
  padding: 17px;
}

.router-link {
  text-decoration: none;
  color: white;
  overflow: hidden;
}

.router-link:hover{
  cursor:pointer;
  background-color: #810109;
  color:black;
  text-decoration: none;
}

.searchBar {
  position: relative;
  border-radius: 0.5em;
  width: 30%;
  height: 80%;
}

.LangueList {
  max-height:175px;
}

.label {
  position: absolute;
  font-size: 12px;
  color: rgba(0,0,0,.50);
  top: 8px;
  left: 12px;
  z-index: -1;
  transition: .15s all ease-in-out;
}

input {
  padding: 4px 12px;
  color: rgba(0,0,0,.70);
  border: 1px solid rgba(0,0,0,.12);
  transition: .15s all ease-in-out;
  background: white;
}
  input:focus {
    outline: none;
    transform: scale(1.05);
  }

    input + label  {
      font-size: 10px;
      transform: translateY(-24px) translateX(-12px);
    }

  input::-webkit-input-placeholder {
      font-size: 12px;
      color: rgba(0,0,0,.50);
      font-weight: 100;
  }
</style>