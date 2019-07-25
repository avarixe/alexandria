<template>
  <v-container
    fluid
    :style="style"
  >
    <v-app-bar
      color="primary"
      dark
      app
    >
      <v-toolbar-title>
        {{ series.title }}
      </v-toolbar-title>

      <v-spacer />

      <span style="width: 200px">
        <v-text-field
          v-model.number="jumpChapter"
          label="Jump to Chapter"
          prepend-icon="mdi-book-search"
          :append-outer-icon="jumpButton"
          type="number"
          hide-details
          @click:append-outer="jumpToChaper"
        />
      </span>

      <template #extension>
        <v-tabs
          :value="chapter - 1"
          background-color="transparent"
          dark
          centered
          center-active
          show-arrows
        >
          <v-tab
            v-for="chapter in chapters"
            :key="chapter.value"
            :to="chapterLink(chapter.value)"
            nuxt
          >
            {{ chapter.value }}
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <chapter-viewer
      :series="series"
      :chapter="chapter"
    />

    <v-bottom-navigation
      app
      :dark="dark"
      grow
    >
      <v-btn
        to="/"
        nuxt
        :dark="dark"
      >
        <span>Home</span>
        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-btn
        active-class=""
        :dark="dark"
        @click="$store.commit('SET_DARK', !dark)"
      >
        <span>{{ dark ? 'Dark' : 'Light' }} Mode</span>
        <v-icon>mdi-weather-{{ dark ? 'night' : 'sunny' }}</v-icon>
      </v-btn>

      <v-btn
        :to="chapterLink(chapter - 1)"
        nuxt
        :dark="dark"
        :disabled="chapter === 1"
      >
        <span>Previous</span>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>

      <v-btn
        active-class=""
        :dark="dark"
        @click="goToTop"
      >
        <span>Back to Top</span>
        <v-icon>mdi-arrow-up</v-icon>
      </v-btn>

      <v-btn
        :to="chapterLink(chapter + 1)"
        nuxt
        :dark="dark"
        :disabled="chapter === lastChapter"
      >
        <span>Next</span>
        <v-icon>mdi-arrow-right</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-container>
</template>

<script>
  import { Vue, Component, Watch } from 'nuxt-property-decorator'
  import { mapState, mapGetters } from 'vuex'
  import ChapterViewer from '@/components/Chapter/Viewer'

  @Component({
    components: {
      ChapterViewer
    },
    computed: {
      ...mapState([
        'dark'
      ]),
      ...mapGetters('series', [
        'getInfo'
      ])
    }
  })
  export default class SeriesPage extends Vue {
    layout = () => 'default'

    head () {
      return {
        title: `${this.series.title} - Chapter ${this.chapter}`
      }
    }

    jumpChapter = null

    get chapter () {
      return parseInt(this.$route.params.chapter)
    }

    get lastChapter () {
      return this.series.chapters[this.series.chapters.length - 1]
    }

    get series () {
      return this.getInfo(this.$route.params.series)
    }

    get chapters () {
      return this.series.chapters.map(value => ({
        value,
        text: `Chapter ${value}`
      }))
    }

    get style () {
      return this.dark
        ? { backgroundColor: '#333', color: '#eee' }
        : null
    }

    get jumpButton () {
      return 1 <= this.jumpChapter && this.jumpChapter <= this.lastChapter
        ? 'mdi-arrow-right'
        : null
    }

    mounted () {
      this.$store.commit('series/BOOKMARK', {
        series: this.$route.params.series,
        chapter: this.chapter
      })
    }

    goToTop () {
      this.$vuetify.goTo('body')
    }

    chapterLink (chapter) {
      return {
        name: 'series-chapter',
        params: {
          series: this.$route.params.series,
          chapter
        }
      }
    }

    jumpToChaper () {
      if (1 <= this.jumpChapter && this.jumpChapter <= this.lastChapter) {
        this.$router.push(this.chapterLink(this.jumpChapter))
      }
    }
  }
</script>
