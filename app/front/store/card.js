export const state = () => ({
  products: [],
  amount: 0.00,

  isOpen: false
})


export const mutations = {
  setToCard(state, data) {
    state.products = data.products
    state.amount = data.amount
  },
}


export const getters = {
  countProducts: (state) => {
    return state.products.length
  },
  amountProducts: (state) => {
    return state.amount
  },
  cardProducts: (state) => {
    return state.products
  }
}
