<template>
  <div class="shutter search-shutter shutter--wide shutter-js search-shutter-js group-js">
    <div class="shutter__options group__spacer-js">
      <a href="#" class="btn-shutter-close btn-shutter-close-js"><i>&nbsp;</i><span>Закрыть</span></a>
      <div class="search-form">
        <form action="#" method="post">
          <div class="search-form__field input-wrap">
            <input type="search" v-model="value" placeholder="текст для поиска"
                   class="search-form__input field-effects-js"/>
            <div class="search-form__btn">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 89.8 89.8" width="24" height="24">
                <path
                  d="M68.1 61c11.4-14.9 10.3-36.3-3.3-49.9C57.6 3.9 48.1 0 37.9 0c-10.1 0-19.7 3.9-26.8 11.1C3.9 18.3 0 27.8 0 37.9c0 10.1 3.9 19.7 11.1 26.8 7.2 7.2 16.7 11.1 26.8 11.1 8.4 0 16.5-2.8 23.1-7.8l21.8 21.7 7.1-7.1L68.1 61zM57.7 57.7c-5.3 5.3-12.3 8.2-19.8 8.2 -7.5 0-14.5-2.9-19.8-8.2C12.9 52.4 10 45.4 10 37.9c0-7.5 2.9-14.5 8.2-19.8C23.5 12.9 30.5 10 37.9 10c7.5 0 14.5 2.9 19.8 8.2C68.6 29.1 68.6 46.8 57.7 57.7z"></path>
              </svg>
              <span>Искать</span>
              <input type="submit" value="">
            </div>
          </div>
        </form>
      </div>
      <div v-if="value.length > 2" class="search-counter">найдено совпадений: <span class="mark">{{ total }}</span>
      </div>
    </div>
    <div class="shutter__align group__body-js">
      <div class="shutter__holder">
        <div class="search-results">
          <div class="search-results__list" v-if="products">
            <div
              class="search-results__item"
              v-for="(item, index) in products"
              :key="index"
            >
              <NuxtLink :to="{name: 'products-id', 'params': {id: item.id}}" class="search-results__inner">
                <div class="search-results__img">
                  <img :src="item.image" :alt="item.name"/>
                </div>
                <div class="search-results__title">{{ item.name }}</div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        value: "",
        products: [],
        links: {},
        total: 0,
      }
    },
    methods: {
      getProductsList(value) {
        let path = process.env.PATH_API_PRODUCTS + '?search=' + value
        this.$axios.$get(path).then(
          (response) => {
            this.products = response.results
            this.links = response.links
            this.total = response.count
          }
        )
      },
      getImgUrl: function (path) {
        return process.env.PATH_MEDIA + path
      },
    },
    watch: {
      value(val) {
        if (val.length > 2) {
          this.getProductsList(val)
        } else {
          this.products = []
          this.total = 0
          this.links = {}
        }
      },
      getOpenSearch(val) {
        if (val === false) {
          this.products = []
          this.total = 0
          this.links = {}
          this.value = ""
        }
      },
    },
    computed: {
      ...mapGetters({
        getOpenSearch: 'search/getOpenSearch',
      })
    },
  }
</script>
