<template>
    <v-container class="containerRow">
        <v-row no-gutters
            class="HeroRow"
            v-if="isResetLoading">
            <v-progress-circular
                :size="75"
                color="primary"
                indeterminate
            ></v-progress-circular>
        </v-row>
        <v-row
            no-gutters 
            class="HeroRow"
            v-if="!isResetLoading"
        >
        <v-col md="2" @click="goToHeroProfil(hero)">
            <div class="HeroImgContainer">
                <v-img
                    v-if="hero.thumbnail"
                    class="HeroImg"
                    :src="hero.thumbnail.path + '.' + hero.thumbnail.extension"
                ></v-img>
                <v-img
                    v-if="hero.isCreated"
                    class="HeroImg"
                    lazy-src="../assets/batman.jpg"
                    :src="hero.img"
                ></v-img>
            </div>
        </v-col>
        <v-col md="9" @click="goToHeroProfil(hero)">
            <div class="HeroName">
                {{ hero.name }}
            </div>
            <div v-if="hero.description" class="HeroDescription">
                <span>{{ hero.description }}</span>
            </div>
            <div v-else class="HeroDescription">
                <span> {{ $t('heroes.no-description') }} </span>
            </div>
        </v-col>
        <v-col md="1">
            <v-card-actions>
            <div class="ButtonContainer">
                <v-btn v-if="!hero.isFavorite"
                    class="mx-4"
                    fab
                    dark
                    color="green"
                    @click="addToFavorite(hero)"
                >
                    <v-icon dark>mdi-heart</v-icon>
                </v-btn>
                <v-btn v-if="hero.isFavorite"
                    class="mx-4"
                    fab
                    dark
                    color="red"
                    @click="deleteFromFavorite(hero)" 
                >
                    <v-icon dark>mdi-heart-broken</v-icon>
                </v-btn>
                <v-btn v-if="hero.isModified && !hero.isCreated"
                    class="mx-4"
                    fab
                    dark
                    color="orange"
                    @click="resetHero(hero)"
                >
                    <v-icon dark>mdi-refresh-circle</v-icon>
                </v-btn>
                <v-dialog
                    v-model="confirmation"
                    persistent
                    width="500"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn                     
                            class="mx-4"
                            fab
                            color="red"
                            v-bind="attrs"
                            v-on="on"
                        >
                            <v-icon color="white">mdi-delete</v-icon>
                        </v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            {{ $t('deleteHero.title') }}
                        </v-card-title>
                        <v-card-text>
                            {{ $t('deleteHero.text') }}
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="black"
                            style="margin-right:1rem"
                            text
                            @click="confirmation = false"
                          >
                            {{ $t('deleteHero.choice1') }}
                          </v-btn>
                          <v-btn
                            class="ConfirmationDelete"
                            text
                            @click="deleteHero(hero)"
                          >
                            {{ $t('deleteHero.choice2') }}
                          </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </div>
            </v-card-actions>
        </v-col>
        </v-row>
    </v-container>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name: 'HeroDisplayRow',
  props: [
      'hero'
  ],
  data () {
        return {
            confirmation: false
        }
    },
  methods: {
    addToFavorite(hero) {
        this.$store.dispatch('addToFavorite', hero)
    },
    deleteFromFavorite(hero) {
        this.$store.dispatch('deleteFromFavorite', hero)
    },
    deleteHero(hero) {
        this.confirmation = false;
        console.log('HERO : ', hero)
        this.$store.dispatch('deleteHero', hero)
        this.$store.dispatch('allowReset', true)
    },
    resetHero(hero) {
        this.$store.dispatch('resetHero', hero)
    },
    goToHeroProfil(hero) {
        this.$store.dispatch('setHeroToModify', hero)
        const id = hero.id;
        this.$router.push({ path: `/Heroes/${id}` })
    },
  },
  computed: {
      ...mapState({
          isResetLoading: state => state.isResetLoading
        }),
  }
}
</script>

<style>
.ButtonContainer {
    height: 125px;
    margin-top: 1rem;
    margin-left: 2rem;
}

.ConfirmationDelete{
    text-emphasis-color: red;
    background-color: gray;
}
</style>