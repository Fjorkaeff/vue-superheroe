<script>

export default {
  name: 'HeroModify',
  props: [
      'hero'
  ],
  data:  () => ({
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'The name of the hero is required',
        v => (v && v.length <= 20) || 'The name must be less than 20 characters',
      ]
  }),
  methods: {

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
        <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        >
          <v-text-field
          class="CardTitle"
          v-model="name"
          :counter="20"
          maxlength="20"
          :rules="nameRules"
          :label="hero.name"
          required
          style="max-width:50%"></v-text-field>
          <v-textarea
          class="CardText"
          :counter="350"
          auto-grow
          label="Description"
          :value="hero.description"></v-textarea>
        </v-form>
        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="validate"
          >
          Validate
      </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>