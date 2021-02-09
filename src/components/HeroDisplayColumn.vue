<script>

export default {
  name: 'HeroDisplayColumn',
  data:  () => ({

    }),
  methods: {}
}
</script>

<template>
    <v-card
        class="card mx-auto my-12"
        max-width="374"
        height="420"
        width="300"
        hover
        rounded="lg"
        z-index="5"
        @click="goToHeroProfil(hero)"
    >
        <v-img
          height="250"
          :lazy-src="getHeroPics"
          :src="getHeroPics"
        ></v-img>
        <v-divider class="red darken-1"></v-divider>
          <v-card-title 
            :title="hero.name" 
            class="heroName"
            >{{hero.name}}</v-card-title>
        <v-card-text  max-height="150">
          <div class="descriptionCard" v-if="hero.description.length > 0">{{hero.description.slice(0,35)}}...</div>
          <div class="descriptionCard" v-else>{{$t('noHeroDescription')}}</div>
        </v-card-text>
        <v-divider class="mx-3"></v-divider>
        <v-card-actions >
          <v-btn v-if="!hero.isFavorite"
            @click.stop="addToFavoriteList(hero)"
            color="grey lighten-2"
          > {{$t('addToFavorite')}} <v-icon style="color: #19bb20" >mdi-plus</v-icon>
          </v-btn>
          <v-btn v-if="hero.isFavorite && this.$route.path === '/Dashboard'"
            @click.stop="removeHeroFromFavoriteList(hero.id)"
            color="grey lighten-2"
          > {{$t('deleteFromFavorite')}} <v-icon style="color: rgba(189,25,17,1)">mdi-delete</v-icon>
          </v-btn>
          <v-btn v-if="hero.isFavorite && this.$route.path === '/Heroes'"
            color="grey lighten-2"
          > {{$t('alreadyAddToFavorite')}} <v-icon style="color #151515">mdi-check</v-icon>
          </v-btn>
        </v-card-actions>
    </v-card>
</template>
