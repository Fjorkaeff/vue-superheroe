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
    'heroToModify',
  ],
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  computed: {},
  data:  () => ({
    heroName: '',
    heroDescription: '',
    App: [
      {
        title: "Comics",
        items: null
      },
      {
        title: "Series",
        items: null
      },
      {
        title: "Events",
        items: null
      }
    ]
  }),
  methods: {
    submit() {
      const data = {
        newName: this.heroName,
        newDescription: this.heroDescription,
        heroId: this.heroToModify.id
      }

      this.$refs.observer.validate()
      this.$store.dispatch('modifyHero', data)
      this.$store.dispatch('edit')
    }
  },
  mounted () {
    this.heroName = this.heroToModify.name
    this.heroDescription = this.heroToModify.description
    this.App[0].items = this.heroToModify.comics.items
    this.App[1].items = this.heroToModify.series.items
    this.App[2].items = this.heroToModify.events.items
  }
}
</script>

<template>
  <v-card>
    <v-row no-gutters style="height:auto">
      <v-col md="4">
        <v-img
          width="80%"
          :src="heroToModify.thumbnail.path + '.' + heroToModify.thumbnail.extension"
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
            v-model="heroName"
            :counter="20"
            maxlength="20"
            :error-messages="errors"
            style="max-width:50%"
            :label="heroToModify.name"
            :value="heroName"></v-text-field>
          
            </validation-provider>
            <validation-provider
              v-slot="{ errors }"
              name="Description"
            >
          
            <v-textarea
            v-model="heroDescription"
            class="CardText"
            :counter="350"
            max-length="350"
            :error-messages="errors"
            auto-grow
            label="Description"
            :value="heroDescription"
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
      <v-col md="4">
        <v-list>
          <v-list-group
            v-for="item in App"
            :key="item.title"
            no-action
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item
              v-for="child in item.items"
              :key="child.name"
            >
              <v-list-item-content>
                <v-list-item-title v-text="child.name"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </v-list>
      </v-col>
    </v-row>
  </v-card>
</template>