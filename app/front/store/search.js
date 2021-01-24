export const state = () => ({
  isOpen: false
})


export const mutations = {
  openSearch(state) {
    state.isOpen = !state.isOpen
  }
}

export const getters = {
  getOpenSearch: (state) => {
    return state.isOpen
  }
}
