<template>
  <div
    class="ma-3"
    :style="style"
    v-html="content"
  />
</template>

<script>
  import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator'
  import axios from 'axios'

  @Component
  export default class ChapterViewer extends Vue {
    @Prop({ type: Object, required: true }) series
    @Prop(Number) chapter

    content = ''

    get chapterName () {
      return this.chapter !== null
        ? this.chapter.toString().padStart(3, '0')
        : ''
    }

    get file () {
      return this.chapter !== null
        ? `${this.series.path}/chapter-${this.chapterName}.html`
        : null
    }

    get style () {
      return this.$store.state.dark
        ? { backgroundColor: '#333', color: '#eee' }
        : null
    }

    @Watch('chapter', { immediate: true })
    async setContent () {
      if (this.chapter !== null) {
        const res = await axios({
          method: 'get',
          baseUrl: '/',
          url: this.file
        })

        this.content = res.data
      } else {
        this.content = ''
      }
    }
  }
</script>
