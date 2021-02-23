<template>
    <v-card>
    <v-row no-gutters style="height:auto">
      <v-col md="4">
        <v-img
            v-if="heroToModify.isCreated"
            width="80%"
            lazy-src="../assets/batman.jpg"
            :src="heroToModify.img"
        ></v-img>
        <v-img
            v-else-if="heroToModify.isImgModified"
            width="80%"
            :lazy-src="heroToModify.thumbnail.path + '.' + heroToModify.thumbnail.extension"
            :src="heroToModify.img"
        ></v-img>
        <v-img
            v-else
            width="80%"
            :src="heroToModify.thumbnail.path + '.' + heroToModify.thumbnail.extension"
        ></v-img>
      </v-col>
      <v-col md="4">
        <v-card-title class="CardTitle">
            {{ heroToModify.name }}
        </v-card-title>
        <v-card-text class="CardText" v-if="heroToModify.description">
            {{ heroToModify.description }}
        </v-card-text>
        <v-card-text class="CardText" v-else>
            {{ $t('heroes.no-description') }}
        </v-card-text>
      </v-col>
      <v-col md="4">
        <v-list v-if="!heroToModify.isCreated">
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

<script>

export default {
  name: 'Hero',
  props: [
    'heroToModify'
  ],
  data:  () => ({
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
  methods: {},
  mounted () {
    if (!this.heroToModify.isCreated) {
      this.App[0].items = this.heroToModify.comics.items
      this.App[1].items = this.heroToModify.series.items
      this.App[2].items = this.heroToModify.events.items
    }
  }
}
</script>

<style>
.CardTitle {
  font-size: xx-large;
  font-weight: bolder;
}

.CardText {
    margin-top: 2rem;
    font-size: larger;
}

.ComicsTitle {
    font-size: x-large;
    font-weight: bolder;
}
</style>