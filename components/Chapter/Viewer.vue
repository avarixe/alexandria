<template lang="pug">
  .ma-3(v-html="content")
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'ChapterViewer',
    props: {
      series: {
        type: Object,
        required: true
      },
      chapter: {
        type: Number,
        default: null
      }
    },
    data: () => ({
      content: ''
    }),
    computed: {
      chapterName () {
        return this.chapter !== null
          ? this.chapter.toString().padStart(3, '0')
          : ''
      },
      file () {
        return this.chapter !== null
          ? `${this.series.path}/chapter-${this.chapterName}.html`
          : null
      }
    },
    watch: {
      chapter: {
        immediate: true,
        async handler () {
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
    }
  }
</script>
