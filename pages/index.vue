<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <div class="overline">Alexandria</div>
        <div class="headline font-weight-thin">Series</div>
      </v-col>

      <v-col cols="12">
        <v-data-iterator
          :items="seriesList"
          :items-per-page="-1"
          no-data-text="No Series Found"
          hide-default-footer
        >
          <template #item="{ item }">
            <v-col
              cols="12"
              md="6"
              lg="4"
              xl="3"
            >
              <series-card :series="item" />
            </v-col>
          </template>
        </v-data-iterator>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { Vue, Component } from 'nuxt-property-decorator'
  import { mapState } from 'vuex'
  import SeriesCard from '@/components/Series/Card'

  @Component({
    components: {
      SeriesCard
    },
    computed: mapState('series', [
      'collection'
    ])
  })
  export default class HomePage extends Vue {
    layout = () => 'default'

    get seriesList () {
      return Object.keys(this.collection).map(key => ({
        ...this.collection[key],
        key
      }))
    }
  }
</script>
