<template>
  <div>
    <!--MAIN-->
    <div class="main">
      <div class="main__holder">
        <!--CONTENT-->
        <div class="content-wrap">
          <div class="content user-content">
            <div class="breadcrumbs">
              <ul class="breadcrumbs__list">
                <li><span title="Главная">Главная</span></li>
              </ul>
            </div>
            <div class="article-entry">
              <h1>{{ categoryName ? categoryName : 'Каталог' }}</h1>
              <div class="article-entry__holder text-slide-js" data-btn-text-full="Текст полностью"
                   data-btn-text-short="Свернуть">
                <p>В каталоге ОАО «Свiтанак»  представлены актуальные на сегодняшний день модели белья и верхней
                  одежды, выпускаемой нашим предприятием, а также вся необходимая информация по каждой модели,
                  включающая фото и номер модели, ассортиментную группу, шкалу размеров, состав, полотно и вид
                  отделки.</p>
              </div>
            </div>
            <div class="box-options">
              <div class="box-options__label">Для удобства пользования каталог разбит на линии, а также снабжен
                удобным фильтром.
              </div>
              <div class="box-options__content">
                <!--departments-->
                <ul class="dep-list dep-list--horizontal equal-height-js">
                  <li
                    class="dep-item"
                    v-for="(item, index) in $store.state.categories"
                    :key="index"
                  >
                    <figure class="dep-img">
                      <div><img :src="getImgUrl(item.image)" :alt="item.name"></div>
                      <div><img :src="getImgUrl(item.image)" :alt="item.name"></div>
                    </figure>
                    <ul class="dep-sub-list">
                      <li
                        v-for="(subitem, subindex) in item.subcategories"
                        :key="subindex"
                      >
                        <a
                          style="cursor:pointer;"
                          :title="subitem.name"
                          @click="choseCategory(subitem.id, subitem.name)"
                        >
                          <span>{{ subitem.name }}</span>
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
            <!--Во время подбора результатов добавляем класс js-loading на контейнер с классом p-filters-js-->
            <div class="m-wrapper">
              <div class="p-filters-tags">
                <div class="p-filters-tags__holder">
                  <div class="p-filters-tags__frame">
                    <span
                      v-for="(value, key, index) in this.$store.state.chosedFilters"
                      :key="index"
                    >
                      <FilterChosedTop
                        v-for="(item, index_) in value.values"
                        :key="index_"
                        :item="item"
                      />
                    </span>
                  </div>
                </div>
              </div>
              <div class="m-container">
                <FiltersSidebar :filtersData="filters"/>
                <div class="m-content">
                  <div class="m-content__holder">
                    <FiltersTop/>
                    <div class="note bottom-space-lg">Цены в белорусских рублях приведены с учетом НДС
                    </div>
                    <div class="p-filters-tags">
                      <div class="p-filters-tags__holder">
                        <div class="p-filters-tags__frame p-filters-tags-js">
                        </div>
                      </div>
                    </div>
                    <div
                      :class="[
                        'products',
                        !$store.state.bigProductView ? 'grid-view': '',
                      ]"
                      data-toggle-view-panels="products"
                    >
                      <section class="products__list">
                        <ProductShort
                          v-for="(item, index) in products_list"
                          :key="index"
                          :data="item"
                          v-if="products_list.length > 0"
                        />
                        <div v-if="products_list.length == 0">
                          Товары не найдены.
                        </div>
                      </section>
                    </div>
                    <Pagination v-if="products_list.length > 0" :pages="pagination"/>
                  </div>
                </div>
              </div>
              <div class="loader-cover">&nbsp;</div>
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
    head() {
      return {
        title: "Каталог"
      }
    },
    data() {
      return {
        filters: {
          'brands': [],
          'colors': [],
          'heights': [],
          'sizes': [],
          'new': this.$store.state.newFilter
        },
        products_list: [],
        pagination: {
          'links': {
            'has_next': false,
            'has_prev': false,
          },
          'total_pages': 1,
          'current_page': 1,
        },
        filtersURLParams: null,
        categoryName: null,
      }
    },
    mounted() {
      this.loadScript('js/common.js')
      this.getProductsList()

      if (this.checkQueryUrlIsInt(this.$route.query.category)){
        this.$store.commit('setCategory', parseInt(this.$route.query.category))
      }
      if (this.checkQueryUrlIsInt(this.$route.query.page)){
        this.$store.commit('setPage', parseInt(this.$route.query.page))

      }
    }
    ,
    methods: {
      checkQueryUrlIsInt(value) {
        if (typeof value != "string") return false
        return !isNaN(value) && !isNaN(parseFloat(value))
      },
      getImgUrl: function (path) {
        return process.env.PATH_MEDIA + path
      },
      getProductsList() {
        let path = process.env.PATH_API_PRODUCTS
        let params = []
        if (this.getParamsURL !== ''){
          params.push(this.getParamsURL)
        }
        if (this.getFilterParamsURL !== ''){
          params.push(this.getFilterParamsURL)
        }
        if (params.length > 0){
          path = path + '?' + params.join('&')
        }

        this.$axios.$get(path).then(
          (response) => {
            this.products_list = response.results

            this.pagination['links'] = response.links
            this.pagination['total_pages'] = response.total_pages
            this.pagination['current_page'] = response.current_page
          }
        ).catch((response) => {
          this.products_list = []
        });
      },
      loadScript(name) {
        if (!process.server) {
          var script = document.createElement("script");
          script.onload = this.onScriptLoaded;
          script.type = "text/javascript";
          script.src = name;
          document.body.appendChild(script);
        }
      },
      choseCategory(id, name){
        this.categoryName = name
        this.$store.commit('setCategory', id)
        let query = {'category': id}
        if (this.checkQueryUrlIsInt(this.$route.query.page)){
          query['page'] = this.$route.query.page
        }

        this.$router.push({'name': 'index', query: query})
      },
    }
    ,
    computed: {
      brandsFilter() {
        return this.$store.state.brandsFilter
      },
      colorsFilter() {
        return this.$store.state.colorsFilter
      },
      heightsFilter() {
        return this.$store.state.heightsFilter
      },
      sizesFilter() {
        return this.$store.state.sizesFilter
      },
      ...mapGetters([
        'getFilterParamsURL',
        'getOrderBy',
        'getPageValue',
        'getCategoryValue',
        'getParamsURL',
      ])
    },
    watch: {
      getPageValue(val){
        this.getProductsList()
      },
      getCategoryValue(){
        this.getProductsList()
      },
      getFilterParamsURL(val) {
        this.getProductsList()
        this.filtersURLParams = val
      },
      getOrderBy(val) {
        this.getProductsList()
      },
      brandsFilter(new_value) {
        if (new_value.length > 0) {
          this.filters['brands'] = new_value
        }
      },
      colorsFilter(new_value) {
        if (new_value.length > 0) {
          this.filters['colors'] = new_value
        }
      },
      heightsFilter(new_value) {
        if (new_value.length > 0) {
          this.filters['heights'] = new_value
        }
      },
      sizesFilter(new_value) {
        if (new_value.length > 0) {
          this.filters['sizes'] = new_value
        }
      },
    }
    ,

  }
</script>
