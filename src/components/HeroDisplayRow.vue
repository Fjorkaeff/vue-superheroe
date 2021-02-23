<template>
    <v-row
        no-gutters 
        class="HeroRow"
        @click="goToHeroProfil(hero)"
    >
        <template v-if="isResetLoading">
            <v-progress-circular
                :size="75"
                color="primary"
                indeterminate
            ></v-progress-circular>
        </template>
        <template v-else>
        <v-col md="2">
            <div class="HeroImgContainer">
                <v-img
                    v-if="hero.isCreated"
                    class="HeroImg"
                    lazy-src="../assets/batman.jpg"
                    :src="hero.img"
                ></v-img>
                <v-img
                    v-else-if="hero.isImgModified"
                    class="HeroImg"
                    :lazy-src="hero.thumbnail.path + '.' + hero.thumbnail.extension"
                    :src="hero.img"
                ></v-img>
                <v-img
                    v-else
                    class="HeroImg"
                    :src="hero.thumbnail.path + '.' + hero.thumbnail.extension"
                ></v-img>
            </div>
        </v-col>
        <v-col class="col px-4">
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
        <v-col class="col col-auto column layout" style="flex-direction: auto; display: flex; padding-right:16px;">
                <v-btn v-if="!hero.isFavorite"
                    class="mt-4"
                    fab
                    small
                    dark
                    color="green"
                    @click.stop="addToFavorite(hero)"
                >
                    <v-icon dark>mdi-heart</v-icon>
                </v-btn>
                <v-btn v-if="hero.isFavorite"
                    class="mt-4"
                    fab
                    small
                    dark
                    color="red"
                    @click.stop="deleteFromFavorite(hero)" 
                >
                    <v-icon dark>mdi-heart-broken</v-icon>
                </v-btn>
                <v-btn v-if="hero.isModified && !hero.isCreated"
                    class="mt-4"
                    fab
                    small
                    dark
                    color="orange"
                    @click.stop="resetHero(hero)"
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
                            class="mt-4"
                            fab
                            small
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
        </v-col>
        </template>
    </v-row>
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
.HeroRow {
  background-color: #202020;
  max-height:200px;
  border-radius: 0.5em;
  color:white;
  transition: all .2s ease-in-out;
  cursor: pointer;
}

.HeroRow:hover {
  background-color:#851014;
  transform: scale(1.01);
}

.HeroName {
  font-size: 1.2em;
  font-weight: 600;
}

.HeroDescription {
  margin-top:10px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 600;
  text-align: justify;
}

.HeroImgContainer {
  padding: 16px;
}

.HeroImg{
    height: 168px;
    border-radius: 0.5em;
}

.ConfirmationDelete{
    text-emphasis-color: red;
    background-color: gray;
}
</style>