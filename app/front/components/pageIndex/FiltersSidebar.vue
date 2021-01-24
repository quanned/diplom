<template>
  <div class="m-aside m-aside-shutter-js">
    <div class="m-aside-layout">
      <form name="_form">
        <div class="m-aside-align">
          <div class="m-aside-holder">
            <div class="m-wrapper">
              <div class="p-filters-list">
                <FilterComponent
                  :list="filtersData['brands']"
                  title="Торговая марка"
                  key_name="name"
                  :id="1"
                  :openDefault="false"
                  storeName="brandsFilter"
                />
                <FilterComponent
                  :list="filtersData['sizes']"
                  title="Размер"
                  key_name="value"
                  :id="2"
                  :openDefault="false"
                  storeName="sizesFilter"
                />
                <FilterComponent
                  :list="filtersData['heights']"
                  title="Рост"
                  key_name="value"
                  :id="3"
                  :openDefault="false"
                  storeName="heightsFilter"
                />
                <FilterComponent
                  :list="filtersData['new']"
                  title="Новинка"
                  key_name="name"
                  :id="4"
                  :openDefault="true"
                  storeName="newFilter"
                />
                <FilterComponent
                  :list="filtersData['colors']"
                  title="Цвет"
                  key_name="name"
                  :id="5"
                  :openDefault="true"
                  storeName="colorsFilter"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="m-aside-footer">
          <button onclick="return false" @click="resetFilters()" class="btn-underline btn-with-icon btn-clear-filters" :disabled="!isFiltersChose">
            <svg class="svg-ico-close" xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                 viewBox="0 0 57.2 57.2">
              <path
                d="M34.3 28.6L56 6.9c1.6-1.6 1.6-4.1 0-5.7 -1.6-1.6-4.1-1.6-5.7 0L28.6 22.9 6.9 1.3c-1.6-1.6-4.1-1.6-5.7 0 -1.6 1.6-1.6 4.1 0 5.7l21.7 21.6L1.3 50.3c-1.6 1.5-1.6 4.1 0 5.6 0.8 0.8 1.8 1.2 2.8 1.2s2-0.4 2.8-1.2l21.7-21.6L50.3 56c0.8 0.8 1.8 1.2 2.8 1.2s2-0.4 2.8-1.2c1.6-1.6 1.6-4.1 0-5.7L34.3 28.6z"></path>
            </svg>
            <span class="for-desk">Очистить фильтр</span>
            <span class="for-mob">Очистить</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>


<script>
  import {mapGetters} from 'vuex'
  export default {
    props: ['filtersData'],

    methods: {
      resetFilters(){
        this.$store.commit('resetFilters')
      }
    },
    computed: {
      ...mapGetters([
        'isFiltersChose',
      ])
    }
  }
</script>
