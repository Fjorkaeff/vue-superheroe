<script>

export default {
  name: 'Hero',
  props: [
    'hero'
  ],
  data:  () => ({
  }),
  methods: {},
  mounted () {
  }
}
</script>

<template>
    <v-card>
    <v-row no-gutters style="height:auto">
      <v-col md="4">
        <v-img
          width="80%"
          :src="hero.thumbnail.path + '.' + hero.thumbnail.extension"
        ></v-img>
      </v-col>
      <v-col md="4">
        <v-card-title class="CardTitle">
            {{ hero.name }}
        </v-card-title>
        <v-card-text class="CardText" v-if="hero.description">
            {{ hero.description }}
        </v-card-text>
        <v-card-text class="CardText" v-else>
            {{ $t('heroes.no-description') }}
        </v-card-text>
      </v-col>
      <v-col md="4">
      </v-col>
    </v-row>
  </v-card>
</template>

<style>
.CardTitle {
  font-size: xx-large;
  font-weight: bolder;
}

.CardText {
    margin-top: 2rem;
    font-size: larger;
}

.ComicsTitle {
    font-size: x-large;
    font-weight: bolder;
}
</style>