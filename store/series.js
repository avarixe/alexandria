// initial state
export const state = () => ({
  bookmarks: {},
  collection: {
    'Solo-Leveling': {
      title: 'Solo Leveling',
      path: '/solo-leveling',
      chapters: new Array(270).fill().map((x, i) => i + 1)
    }
  }
})

export const getters = {
  getBookmark: state => series => state.bookmarks[series],
  getInfo: state => series => state.collection[series]
}

export const mutations = {
  bookmark (state, { series, chapter }) {
    state.bookmarks[series] = chapter
  }
}
