<script>
import { required, regex } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

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
  name: 'HeroModify',
  props: [
    'hero',
  ],
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  computed: {},
  data:  () => ({
    name: '',
    //description: '',
  }),
  methods: {
    submit() {
      const data = {
        newName: this.name,
        //newDescription: this.description,
        heroId: this.hero.id
      }

      this.$refs.observer.validate()
      this.$store.dispatch('modifyHero', data)
      this.$store.dispatch('edit')
    }
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
            v-model="name"
            :counter="20"
            maxlength="20"
            :error-messages="errors"
            :label="hero.name"
            style="max-width:50%"></v-text-field>
          
            </validation-provider>
            <!--<validation-provider
              v-slot="{ errors }"
              name="Description"
            >
          
            <v-textarea
            v-model="description"
            class="CardText"
            :counter="350"
            max-length="350"
            :error-messages="errors"
            auto-grow
            label="Description"
            ></v-textarea>

            </validation-provider>-->
          
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
</template>