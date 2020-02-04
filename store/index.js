import cookieparser from 'cookieparser'
import Cookie from 'js-cookie'

// initial state
export const state = () => ({
  dark: false
})

// mutations
export const mutations = {
  SET_DARK (state, dark) {
    state.dark = dark
    Cookie.set('dark', dark)
  }
}

// actions
export const actions = {
  async nuxtServerInit ({ commit }, { req }) {
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)

      if (parsed.dark) {
        commit('SET_DARK', parsed.dark === 'true')
      }

      // load bookmarks
      if (parsed.bookmarks) {
        const bookmarks = JSON.parse(parsed.bookmarks)

        for (let series in bookmarks) {
          commit('series/BOOKMARK', {
            series,
            chapter: bookmarks[series]
          })
        }
      }
    }
  }
}
