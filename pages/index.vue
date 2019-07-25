<template>
  <v-container
    fluid
    fill-height
    :style="style"
  >
    <v-row>
      <v-col cols="12">
        <div class="overline">Alexandria</div>
        <div class="headline font-weight-thin">Library</div>
      </v-col>

      <v-col cols="12">
        <v-btn
          :dark="dark"
          outlined
          text
          @click="$store.commit('SET_DARK', !dark)"
        >
          <v-icon left>
            mdi-weather-{{ dark ? 'night' : 'sunny' }}
          </v-icon>
          <span>{{ dark ? 'Dark' : 'Light' }} Mode</span>
        </v-btn>
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
    computed: {
      ...mapState([
        'dark'
      ]),
      ...mapState('series', [
        'collection'
      ])
    }
  })
  export default class HomePage extends Vue {
    layout = () => 'default'

    get seriesList () {
      return Object.keys(this.collection).map(key => ({
        ...this.collection[key],
        key
      }))
    }

    get style () {
      return {
        backgroundColor: this.dark ? '#333' : null,
        color: this.dark ? '#eee' : null,
        alignItems: 'flex-start'
      }
    }
  }
</script>
