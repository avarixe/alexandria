<template lang="pug">
  v-card
    v-card-title.subtitle-1.d-block.text-center
      span.primary--text.font-weight-light {{ series.title }}
    v-divider.mx-3
    v-select.mx-3(
      v-model="chapter"
      :items="chapters"
      item-value="value"
      hide-details
    )
    v-card-actions
      v-btn(
        color="primary"
        text
        nuxt
        block
        @click="goToChapter"
      ) Read
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
          query: {
            series: this.series.key,
            chapter: this.chapter
          }
        })
      }
    }
  }
</script>
