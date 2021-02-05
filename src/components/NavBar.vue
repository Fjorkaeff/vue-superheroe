<template>
  <div>
    <v-app-bar dark color="red">
      <v-toolbar-title @click="goHome" class="white--text">{{ $t("NavBar.title1") }}</v-toolbar-title>
      <v-toolbar-title @click="goHeroes" class="white--text">{{ $t("NavBar.title2") }}</v-toolbar-title>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  data: function () {
    return {
      drawer: false
    }
  },
  methods: {
    goHome () {
      this.$router.replace('/')
    },
    goHeroes () {
        this.$router.replace('/Heroes')
    }
  }
}
</script>

