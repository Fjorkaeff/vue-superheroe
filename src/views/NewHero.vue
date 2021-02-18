<template>
<v-app>
    <div>
        <NavBar></NavBar>
            <div class="Heroes">
                <div class="HeroesTitle">
                    <v-row no-gutters class="HeadPage">
                        <v-col md="6">
                            <h1> {{ $t('newHero.title') }} </h1>
                        </v-col>
                    </v-row>
                </div>
            </div>
            <v-card style="margin:2rem">
              <v-row no-gutters>
                <v-col md="4">
                    <validation-provider
                      v-slot="{ errors }"
                      name="Image"
                    >
                    <v-text-field
                      v-model="newHero.img"
                      :counter="50"
                      maxlength="50"
                      :error-messages="errors"
                      label="Saisissez l'url de votre image"
                      style="max-width:75%; margin-left:1rem"></v-text-field>

                    </validation-provider>
                </v-col>
                <v-col md="4">
                  <validation-observer
                    ref="observer"
                    v-slot="{ invalid }"
                  >
                  <form @submit.prevent="submit">
                    <validation-provider
                      v-slot="{ errors }"
                      name="Name"
                      :rules="{
                        required: true,
                        regex: '[a-zA-Z0-9-]'
                        }"
                    >
                      <v-text-field
                      v-model="newHero.name"
                      :counter="20"
                      maxlength="20"
                      :error-messages="errors"
                      :label="$t('newHero.newHeroNameLabel')"
                      style="max-width:50%"></v-text-field>

                      </validation-provider>
                      <validation-provider
                        v-slot="{ errors }"
                        name="Description"
                      >

                      <v-textarea
                      v-model="newHero.description"
                      class="CardText"
                      :counter="350"
                      max-length="350"
                      :error-messages="errors"
                      auto-grow
                      :label="$t('newHero.newHeroDescriptionLabel')"
                      ></v-textarea>

                      </validation-provider>

                      <v-btn
                        class="mr-4"
                        style="margin-top:3rem; margin-bottom:3rem"
                        type="submit"
                        color="success"
                        :disabled="invalid"
                      >
                        {{ $t('heroModify.validateForm') }}
                      </v-btn>
                    </form>
                  </validation-observer>
                  </v-col>
                  <v-col md="4">
                    <v-img
                      style="float:right"
                      width="70%"
                      src="../assets/batman.jpg"
                    ></v-img>
                  </v-col>
              </v-row>
            </v-card>
        </div>
    </v-app>
</template>

<script>
import {required, regex} from 'vee-validate/dist/rules'
import {extend, ValidationObserver, ValidationProvider, setInteractionMode} from 'vee-validate'
import NavBar from '../components/NavBar.vue';
//import axios from 'axios';

  setInteractionMode('eager')

  extend('required', {
    ...required,
    
    message: 'This field can not be empty',
  })

  extend('regex', {
    ...regex,
    message: 'Only letters, numbers and `-` are allow',
  })

export default {
  name: 'NewHero',
  components: {
    ValidationProvider,
    ValidationObserver,
    NavBar
  },
  data () {
    return {
        newHero: {
          img: '',
          name: '',
          description: '',
          isCreated: true,
          isImg: false
        }
    }
  },
  methods: {
    submit() {
      this.$refs.observer.validate()
      this.$store.dispatch('addHero', this.newHero)
      this.$router.push({ path: `/Heroes` })
    }
  },
  created() {
    this.$store.dispatch('searchText', '')
  }
}
</script>
