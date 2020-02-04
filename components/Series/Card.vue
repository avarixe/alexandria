<template>
  <v-card :dark="$store.state.dark">
    <v-card-title class="subtitle-1 d-block text-center">
      <span class="primary--text font-weight-light">
        {{ series.title }}
      </span>
    </v-card-title>

    <v-divider class="mx-3" />

    <v-select
      v-model="chapter"
      :items="chapters"
      item-value="value"
      :dark="$store.state.dark"
      :menu-props="$store.state.dark ? 'dark' : ''"
      hide-details
      class="mx-3"
    />

    <v-card-actions>
      <v-btn
        color="primary"
        text
        nuxt
        block
        @click="goToChapter"
      >
        Read
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'SeriesCard',
    props: {
      series: {
        type: Object,
        required: true
      }
    },
    data: () => ({
      chapter: 1
    }),
    computed: {
      ...mapGetters('series', [
        'getBookmark'
      ]),
      chapters () {
        return this.series.chapters.map(value => ({
          value,
          text: `Chapter ${value}`
        }))
      }
    },
    mounted () {
      const bookmark = this.getBookmark(this.series.key)
      if (bookmark) {
        this.chapter = bookmark
      }
    },
    methods: {
      goToChapter () {
        this.$router.push({
          name: 'series-chapter',
          params: {
            series: this.series.key,
            chapter: this.chapter
          }
        })
      }
    }
  }
</script>
