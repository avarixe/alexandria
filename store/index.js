// initial state
export const state = () => ({
  dark: false
})

// mutations
export const mutations = {
  setDark (state, dark) {
    state.dark = dark
  }
}

// actions
export const actions = {
  async nuxtClientInit ({ commit }, { $cookies }) {
    const dark = $cookies.get('dark')
    if (dark) {
      commit('setDark', dark)
    }

    // load bookmarks
    const bookmarks = $cookies.get('bookmarks')
    if (bookmarks) {
      for (let series in bookmarks) {
        commit('series/bookmark', {
          series,
          chapter: bookmarks[series]
        })
      }
    }
  }
}
