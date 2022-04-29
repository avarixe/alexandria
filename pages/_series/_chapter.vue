<template lang="pug">
  v-container(fluid :style="style")
    v-app-bar(color="primary" dark app)
      v-toolbar-title {{ series.title }}
      v-spacer
      span(style="width: 200px")
        v-text-field(
          v-model.number="jumpChapter"
          label="Jump to Chapter"
          prepend-icon="mdi-book-search"
          :append-outer-icon="jumpButton"
          type="number"
          hide-details
          @click:append-outer="jumpToChaper"
        )
      template(#extension)
        v-tabs(
          :value="thisChapter - 1"
          background-color="transparent"
          dark
          centered
          center-active
          show-arrows
        )
          v-tab(
            v-for="chapter in chapters"
            :key="chapter.value"
            :to="chapterLink(chapter.value)"
            nuxt
          ) {{ chapter.value }}
    chapter-viewer(
      :series="series"
      :chapter="thisChapter"
    )
    v-bottom-navigation(app :dark="dark" grow)
      v-btn(to="/" nuxt :dark="dark")
        span Home
        v-icon mdi-home
      v-btn(
        active-class=""
        :dark="dark"
        @click="$store.commit('SET_DARK', !dark)"
      )
        span {{ dark ? 'Dark' : 'Light' }} Mode
        v-icon mdi-weather-{{ dark ? 'night' : 'sunny' }}
      v-btn(
        :to="chapterLink(thisChapter - 1)"
        nuxt
        :dark="dark"
        :disabled="thisChapter === 1"
      )
        span Previous
        v-icon mdi-arrow-left
      v-btn(
        active-class=""
        :dark="dark"
        @click="goToTop"
      )
        span Back to Top
        v-icon mdi-arrow-up
      v-btn(
        :to="chapterLink(thisChapter + 1)"
        nuxt
        :dark="dark"
        :disabled="thisChapter === lastChapter"
      )
        span Next
        v-icon mdi-arrow-right
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import ChapterViewer from '@/components/Chapter/Viewer'

  export default {
    name: 'SeriesPage',
    components: {
      ChapterViewer
    },
    data: () => ({
      jumpChapter: null
    }),
    head () {
      return {
        title: `${this.series.title} - Chapter ${this.thisChapter}`
      }
    },
    computed: {
      ...mapState([
        'dark'
      ]),
      ...mapGetters('series', [
        'getInfo'
      ]),
      thisChapter () {
        return parseInt(this.$route.params.chapter)
      },
      lastChapter () {
        return this.series.chapters[this.series.chapters.length - 1]
      },
      series () {
        return this.getInfo(this.$route.params.series)
      },
      chapters () {
        return this.series.chapters.map(value => ({
          value,
          text: `Chapter ${value}`
        }))
      },
      style () {
        return this.dark
          ? { backgroundColor: '#333', color: '#eee' }
          : null
      },
      jumpButton () {
        return 1 <= this.jumpChapter && this.jumpChapter <= this.lastChapter
          ? 'mdi-arrow-right'
          : null
      }
    },
    mounted () {
      this.$store.commit('series/BOOKMARK', {
        series: this.$route.params.series,
        chapter: this.thisChapter
      })
    },
    methods: {
      goToTop () {
        this.$vuetify.goTo('body')
      },
      chapterLink (chapter) {
        return {
          name: 'series-chapter',
          params: {
            series: this.$route.params.series,
            chapter
          }
        }
      },
      jumpToChaper () {
        if (1 <= this.jumpChapter && this.jumpChapter <= this.lastChapter) {
          this.$router.push(this.chapterLink(this.jumpChapter))
        }
      }
    }
  }
</script>
