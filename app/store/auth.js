export const state = () => ({
  user: {},
})

export const mutations = {
  SET_USER(state, user) {
    state.user = user
  },
}

export const actions = {
  setUser({ commit }, user) {
    commit('SET_USER', user)
  },
}

export const getters = {
  /**
   * Returns if authenticated or not
   * @param {*} state
   * @returns {Boolean}
   */
  isAuthenticated(state) {
    return !!state.user.email
  },
}
