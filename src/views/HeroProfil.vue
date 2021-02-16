<template>
  <v-app>
    <div>
        <NavBar></NavBar>
        <div class="Heroes">
          <div class="HeroesTitle">
            <v-row no-gutters>
              <v-col md="8">
                <h1> {{ $t('heroProfil.title') }} </h1>
              </v-col>
              <v-col md="4" class="ButtonDisplay">
                <v-btn
                    @click="edit()"
                >
                    <v-icon v-if="!this.isEdit" color="green">mdi-pencil</v-icon>
                    <v-icon v-if="this.isEdit" color="red">mdi-pencil</v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <v-container style="margin-top:50px">
              <HeroModify v-if="this.isEdit" :heroToModify="heroToModify"></HeroModify>
              <Hero v-if="!this.isEdit" :heroToModify="heroToModify"></Hero>
            </v-container>
          </div>
        </div>
    </div>
  </v-app>
</template>

<script>
import {mapState} from 'vuex'
import NavBar from '../components/NavBar.vue';
import HeroModify from '../components/HeroModify.vue';
import Hero from "../components/Hero.vue";

export default {
  name: 'HeroProfil',
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      heroToModify: state => state.heroToModify,
      isEdit: state => state.isEdit
    })
  },
  components: {
    NavBar,
    HeroModify,
    Hero
  },
  methods: {
    edit (){
      this.$store.dispatch('edit')
    }
    /*goBack() {
        window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    }*/
  },
  mounted () {}
}
</script>
