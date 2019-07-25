import cookieparser from 'cookieparser'

// actions
export const actions = {
  async nuxtServerInit ({ commit }, { req }) {
    // load bookmarks
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      const bookmarks = JSON.parse(parsed.bookmarks)

      if (bookmarks) {
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
