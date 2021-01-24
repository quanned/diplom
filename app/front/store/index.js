export const state = () => ({
  categories: [],
  brandsFilter: [],
  colorsFilter: [],
  heightsFilter: [],
  sizesFilter: [],
  newFilter: [
    {
      'id': true,
      'name': 'new',
      'isActive': false
    }
  ],
  chosedFilters: {
    'brandsFilter': {
      'values': [],
      'name': 'brands',
    },
    'colorsFilter': {
      'values': [],
      'name': 'colors',
    },
    'heightsFilter': {
      'values': [],
      'name': 'height',
    },
    'sizesFilter': {
      'values': [],
      'name': 'sizes',
    },
    'newFilter': {
      'values': [],
      'name': 'only_new',
    },
  },
  bigProductView: null,
  orders: [],
  orderBy: null,
  page: null,
  category: null,
})


export const mutations = {
  setPage(state, value){
    this.state.page = value
  },
  setCategory(state, value){
    this.state.category = value
  },
  setOrdersByList(state, data) {
    if (state.orders.length === 0) {
      state.orders = data
    }
  },
  choseOrderBy(state, value){
    state.orderBy = value
  },
  setCategories(state, data) {
    if (state.categories.length === 0) {
      state.categories = data
    }
  },
  setBrandsFilter(state, data) {
    if (state.brandsFilter.length === 0) {
      state.brandsFilter = data.map(v => ({...v, isActive: false}))
    }
  },
  setColorsFilter(state, data) {
    if (state.colorsFilter.length === 0) {
      state.colorsFilter = data.map(v => ({...v, isActive: false}))
    }
  },
  setHeightsFilter(state, data) {
    if (state.heightsFilter.length === 0) {
      state.heightsFilter = data.map(v => ({...v, isActive: false}))
    }
  },
  setSizesFilter(state, data) {
    if (state.sizesFilter.length === 0) {
      state.sizesFilter = data.map(v => ({...v, isActive: false}))
    }
  },
  setItemFilterActiveValue(state, {name, index}) {
    state[name][index].isActive = !state[name][index].isActive
  },
  addToChosedFilter(state, {name, index, id}) {
    if (state[name][index].isActive === true) {
      state.chosedFilters[name]['values'].push({index, name, value: state[name][index]})
    } else {
      state.chosedFilters[name]['values'].forEach(function (value, i) {
        if (value.value.id === id) {
          state.chosedFilters[name]['values'].splice(i, 1)
        }
      });

    }
  },
  delFromChosedFilter(state, {name, index, id}) {
    state[name][index].isActive = false
    state.chosedFilters[name]['values'].forEach(function (value, i) {
      if (value.value.id === id) {
        state.chosedFilters[name]['values'].splice(i, 1)
      }
    });
  },
  setProductBigView(state, value) {
    state.bigProductView = value
  },
  resetFilters(state) {
    let names = ['brandsFilter', 'colorsFilter', 'heightsFilter', 'sizesFilter', 'newFilter']
    names.forEach(function (name) {
      state[name].forEach(function (value) {
        value.isActive = false
      })
    })

    for (const [key, value] of Object.entries(state.chosedFilters)) {
      state.chosedFilters[key]['values'].splice(0, state.chosedFilters[key]['values'].length)
    }

  },
}

export const getters = {
  isFiltersChose: (state) => {
    let status = false
    for (const [key, value] of Object.entries(state.chosedFilters)) {
      if (value.values.length > 0) {
        status = true
        return status
      }
    }
    return status
  },
  getFilterParamsURL: (state) => {
    let urls = []
    for (const [key, value] of Object.entries(state.chosedFilters)) {
      let values = []
      if (value.values.length > 0) {
        value.values.forEach(function (v) {
          if (v.value.isActive) {
            values.push(v.value.id)
          }
        })
      }
      if (values.length > 0) {
        urls.push(value.name + '=' + values.join(','))
      }
    }
    return urls.join('&')
  },
  getParamsURL: (state) => {
    let params = []
    if (state.category != null){
      params.push(`category=${state.category}`)
    }
    if (state.orderBy != null){
      params.push(`order_by=${state.orderBy}`)
    }
    if (state.page != null){
      params.push(`page=${state.page}`)
    }
    return params.join('&')
  },
  getOrderBy: (state) => {
    return state.orderBy
  },
  getPageValue: (state) => {
    return state.page
  },
  getCategoryValue: (state) => {
    return state.category
  }
}
