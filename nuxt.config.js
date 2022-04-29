import pkg from './package'
import nodeExternals from 'webpack-node-externals'

export default {
  target: 'static',

  server: {
    host: '0.0.0.0',
    port: process.env.NODE_ENV === 'production' ? '8082' : '4000'
  },

  /*
  ** Headers of the page
  */
  head: {
    title: 'Alexandria',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Global CSS
  */
  css: [
    '@/styles/index.scss'
  ],

  /*
  ** Customize the progress bar color
  */
  // loading: '~/components/App/LoadingOverlay.vue', // { color: '#3B8070' },

  buildModules: [
    '@nuxtjs/vuetify'
  ],

  modules: [
    'cookie-universal-nuxt'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '@/plugins/nuxt-client-init.js', ssr: false }
  ],

  /*
  ** Build configuration
  */
  build: {
    // analyze: true,

    transpile: [/^vuetify/],

    postcss: {},

    extractCSS: true,

    extend (config, { isDev, isClient }) {
      // Run ESLint on save
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      if (process.server) {
        config.externals = [
          nodeExternals({
            whitelist: [/^vuetify/]
          })
        ]
      }
    }
  }
}
