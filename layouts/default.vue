<template>
  <v-app>
    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
  import { Vue, Component } from 'nuxt-property-decorator'

  @Component
  export default class Layout extends Vue {
  }
</script>
