<template>
  <v-card>
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
  import { Vue, Component, Prop } from 'nuxt-property-decorator'
  import { mapGetters } from 'vuex'

  @Component({
    computed: mapGetters('series', [
      'getBookmark'
    ])
  })
  export default class SeriesCard extends Vue {
    @Prop({ type: Object, required: true }) series

    chapter = 1

    get chapters () {
      return this.series.chapters.map(value => ({
        value,
        text: `Chapter ${value}`
      }))
    }

    mounted () {
      const bookmark = this.getBookmark(this.series.key)
      if (bookmark) {
        this.chapter = bookmark
      }
    }

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
</script>
