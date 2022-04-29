<template lang="pug">
  v-container(fluid)
    v-app-bar(app)
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
          centered
          center-active
          show-arrows
        )
          v-tab(
            v-for="chapter in chapters"
            :key="chapter.value"
            :to="chapterLink(chapter.value)"
            exact
            nuxt
          ) {{ chapter.value }}
    chapter-viewer(
      :series="series"
      :chapter="thisChapter"
    )
    v-bottom-navigation(app grow)
      v-btn(to="/" nuxt)
        span Home
        v-icon mdi-home
      v-btn(
        active-class=""
        @click="setDark"
      )
        span {{ dark ? 'Dark' : 'Light' }} Mode
        v-icon mdi-weather-{{ dark ? 'night' : 'sunny' }}
      v-btn(
        :to="chapterLink(thisChapter - 1)"
        nuxt
        :disabled="thisChapter === 1"
      )
        span Previous
        v-icon mdi-arrow-left
      v-btn(
        active-class=""
        @click="goToTop"
      )
        span Back to Top
        v-icon mdi-arrow-up
      v-btn(
        :to="chapterLink(thisChapter + 1)"
        nuxt
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
        return parseInt(this.$route.query.chapter)
      },
      lastChapter () {
        return this.series.chapters[this.series.chapters.length - 1]
      },
      series () {
        return this.getInfo(this.$route.query.series)
      },
      chapters () {
        return this.series.chapters.map(value => ({
          value,
          text: `Chapter ${value}`
        }))
      },
      jumpButton () {
        return 1 <= this.jumpChapter && this.jumpChapter <= this.lastChapter
          ? 'mdi-arrow-right'
          : null
      }
    },
    fetch () {
      this.$cookies.set(
        'bookmarks',
        JSON.stringify({
          ...this.$store.state.series.bookmarks,
          [this.series]: this.chapter
        })
      )
      this.$store.commit('series/bookmark', {
        series: this.$route.query.series,
        chapter: this.thisChapter
      })
    },
    watch: {
      '$route.query': '$fetch'
    },
    methods: {
      goToTop () {
        this.$vuetify.goTo('body')
      },
      chapterLink (chapter) {
        return {
          name: 'series-chapter',
          query: {
            series: this.$route.query.series,
            chapter
          }
        }
      },
      jumpToChaper () {
        if (1 <= this.jumpChapter && this.jumpChapter <= this.lastChapter) {
          this.$router.push(this.chapterLink(this.jumpChapter))
        }
      },
      setDark () {
        this.$cookies.set('dark', !this.dark)
        this.$store.commit('setDark', !this.dark)
      }
    }
  }
</script>
