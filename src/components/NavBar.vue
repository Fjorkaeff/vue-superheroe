<script>
import i18n from '../i18n';

export default {
  name: 'NavBar',
  data:  () => ({
      languages: [
        {
          flag: 'us',
          language: 'en',
          title: 'English' 
        },
        {
          flag: 'fr',
          language: 'fr',
          title: 'Français'
        } 
      ]
    }),
  methods: {
      changeLocale(locale) {
        i18n.locale = locale;
      }
  }
}
</script>

<template>
  <div>
    <div><router-link to="/"><img class="imgSite" src="../assets/bandeau.jpg"/></router-link></div>
    <v-app-bar color="#DF1E1E">
      <router-link class="router-link" to="/"><v-toolbar-title class="title">{{ $t('NavBar.title2') }}</v-toolbar-title></router-link>
      <router-link class="router-link" to="/Dashboard"><v-toolbar-title class="title">{{ $t('NavBar.title1') }}</v-toolbar-title></router-link>
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
        <v-list>
          <v-list-item v-for="item in languages" :key="item.title" @click="changeLocale(item.language)">
            <v-list-item-title >{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>