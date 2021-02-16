<script>
import { required, regex } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
import NavBar from "../components/NavBar.vue";
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
              img: null,
              name: '',
              description: '',
              isCreated: true
            },
            isImg: false
        }
    },
  methods: {
    submit() {
      this.$refs.observer.validate()
      this.$store.dispatch('addHero', this.newHero)
    },
    onFileSelected(event) {
      this.newHero.img = event.target.files[0]
      this.isImg = true
      console.log('IMG: ', this.newHero.img)
      console.log('isImg : ', this.isImg)
    }
  }
}
</script>

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
            <v-card>
              <v-row no-gutters style="height:auto">
                <v-col md="4">
                  <input type="file" webkitRelativePath @change="onFileSelected">
                  <v-img v-if="isImg"
                    :src="newHero.img.name"
                    width="80%"
                  ></v-img>
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
                        type="submit"
                        color="success"
                        :disabled="invalid"
                      >
                        {{ $t('heroModify.validateForm') }}
                      </v-btn>
                    </form>
                  </validation-observer>
                </v-col>
              </v-row>
            </v-card>
        </div>
    </v-app>
</template>