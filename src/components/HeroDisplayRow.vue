<script>

export default {
  name: 'HeroDisplayRow',
  props: [
      'Hero'
  ],
  methods: {}
}
</script>

<template>
    <v-container>
        <v-row
            no-gutters 
            class="rowHero"
        >
            <div class="heroName">
                {{Hero.name}}
            </div>
            <div v-if="Hero.description" class="heroDescription">
                <span>{{Hero.description}}</span>
            </div>
            <div v-else class="heroDescription">
                <span>Pas de description</span>
            </div>
        </v-row>
    </v-container> 
</template>