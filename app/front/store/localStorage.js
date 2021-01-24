export const state = () => ({
  sessionId: null
})

export const mutations = {
  setSessionId(state, value) {
    state.sessionId = value
  }
}
