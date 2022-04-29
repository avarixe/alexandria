<template lang="pug">
  v-container.fill-height.align-start(fluid)
    v-row
      v-col(cols="12")
        .overline Alexandria
        .headline.font-weight-thin Library
      v-col(cols="12")
        v-btn(
          outlined
          text
          @click="setDark"
        )
          v-icon(left) mdi-weather-{{ dark ? 'night' : 'sunny' }}
          span {{ dark ? 'Dark' : 'Light' }} Mode
      v-col(cols="12")
        v-data-iterator(
          :items="seriesList"
          :items-per-page="-1"
          no-data-text="No Series Found"
          hide-default-footer
        )
          template(#item="{ item }")
            v-col(cols="12" md="6" lg="4" xl="3")
              series-card(:series="item")
</template>

<script>
  import { mapState } from 'vuex'
  import SeriesCard from '@/components/Series/Card'

  export default {
    name: 'HomePage',
    components: {
      SeriesCard
    },
    computed: {
      ...mapState([
        'dark'
      ]),
      ...mapState('series', [
        'collection'
      ]),
      seriesList () {
        return Object.keys(this.collection).map(key => ({
          ...this.collection[key],
          key
        }))
      }
    },
    methods: {
      setDark () {
        this.$cookies.set('dark', !this.dark)
        this.$store.commit('setDark', !this.dark)
      }
    }
  }
</script>
