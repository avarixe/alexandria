<template lang="pug">
  v-app
    v-main
      nuxt
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'Layout',
    computed: mapState([
      'dark'
    ]),
    watch: {
      dark: {
        immediate: true,
        handler (dark) {
          this.$vuetify.theme.dark = dark
        }
      }
    }
  }
</script>
