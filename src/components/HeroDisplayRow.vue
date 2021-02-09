<script>

export default {
  name: 'HeroDisplayRow',
  props: [
      'Hero'
  ],
  methods: {
    getHeroPics() {
        let src
            if (this.hero.isImgModified) {
                src = `${this.hero.thumbnail.path}`
            }else {
                src = `${this.hero.thumbnail.path}.${this.hero.thumbnail.extension}` 
            }
        return src
      }
  }
}
</script>

<template>
    <v-container class="containerRow">
        <v-row v-for="hero in heroes" :key="hero.id"
            no-gutters 
            class="rowHero"
        >
            <div class="heroImgContainer">
                <v-img
                    class="heroImg"
                    src="../assets/batman.jpg"
                ></v-img>
            </div>
            <div class="heroName">
                {{hero.name}}
            </div>
            <div v-if="hero.description" class="heroDescription">
                <span>{{hero.description}}</span>
            </div>
            <div v-else class="heroDescription">
                <span>Pas de description</span>
            </div>
            <div class="buttonContainer">
                <v-btn
                    class="mx-2"
                    fab
                    dark
                    color="success"
                >
                    <v-icon dark>mdi-plus</v-icon>
                </v-btn>
                <v-btn                     
                    class="mx-2"
                    fab
                    dark
                    color="cyan"
                >
                    <v-icon dark>mdi-pencil</v-icon>
                </v-btn>
            </div>
        </v-row>
    </v-container>
</template>