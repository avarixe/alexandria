// initial state
export const state = () => ({
  collection: {
    'Solo-Leveling': {
      title: 'Solo Leveling',
      path: '/solo-leveling',
      chapters: new Array(270).fill().map((x, i) => i + 1)
    }
  }
})
