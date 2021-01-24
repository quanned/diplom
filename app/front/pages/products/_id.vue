<template>
  <div class="main">
    <div class="main__holder">
      <!--CONTENT-->
      <div class="content-wrap">
        <div class="content user-content">
          <div class="p-card p-card-js">
            <NuxtLink
              v-if="prevProduct"
              :to="{name: 'products-id', 'params': {id: prevProduct.id}}"
              class="p-card__btn p-card__btn--prev"
            >
              <div class="p-card__btn__img">
                <img :src="getImgUrl(prevProduct.image)" alt="image description"/>
              </div>
              <div class="p-card__btn__arr def-arrows--prev">&nbsp;</div>
              <div class="p-card__btn__text"><span>{{ prevProduct.model }}</span></div>
            </NuxtLink>
            <NuxtLink
              v-if="nextProduct"
              :to="{name: 'products-id', 'params': {id: nextProduct.id}}"
              class="p-card__btn p-card__btn--next"
            >
              <div class="p-card__btn__img">
                <img :src="getImgUrl(nextProduct.image)" alt="image description"/>
              </div>
              <div class="p-card__btn__arr def-arrows--next">&nbsp;</div>
              <div class="p-card__btn__text"><span>{{ nextProduct.model }}</span></div>
            </NuxtLink>
            <div v-if="product.is_new" class="p-card__new">&nbsp;</div>
            <div class="p-card__visual">
              <div class="p-card__gallery">
                <div class="swiper-container p-card__gallery__list card-gallery-js">
                  <div class="swiper-wrapper">
                    <div
                      v-for="(item, index) in product.images"
                      :key="index"
                      class="p-card__gallery__item swiper-slide">
                      <div class="p-card__gallery__inner">
                        <img :src="getImgUrl(item.image)" :data-zoom="getImgUrl(item.image)" alt="image description"/>
                      </div>
                    </div>
                  </div>
                  <div class="p-card__gallery__pagination swiper-pagination"></div>

                  <div class="p-card__gallery__prev swiper-button-prev">Предыдущий</div>
                  <div class="p-card__gallery__next swiper-button-next">Слудующий</div>
                </div>
              </div>
            </div>
            <div class="p-card__zoom-container pane-container-js">&nbsp;</div>
            <div class="p-card__content card-info-js">
              <div class="p-card__content__holder">
                <div class="p-card__content__frame">
                  <!--copy / hide for devices-->
                  <div class="breadcrumbs">
                    <ul class="breadcrumbs__list">
                      <li>
                        <NuxtLink :to="{name: 'index'}"><span title="Главная">Каталог</span></NuxtLink>
                      </li>
                      <li>
                        <NuxtLink :to="{name: 'index'}"><span title="Бельё женское">Бельё женское</span></NuxtLink>
                      </li>
                      <li><span :title="product.model">{{ product.name }}</span></li>
                    </ul>
                  </div>
                  <div class="p-card__title">
                    <h2>{{ product.name }}</h2>
                    <div class="p-card__state">
                      <span class="p-card__model">модель: {{ product.model }}</span>
                      <div v-if="product.in_stock" class="p-card__store on">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="53.5 120.6 504.9 397.8">
                          <polygon
                            points="466.6 120.6 252.5 334.8 145.3 227.7 53.5 319.5 252.5 518.4 558.5 212.4 "></polygon>
                        </svg>
                        <span>Есть в наличии</span>
                      </div>
                      <div v-else class="p-card__store off">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56" width="16" heigth="16">
                          <polygon
                            points="56 13.5 42.5 0 28 14.5 13.5 0 0 13.5 14.5 28 0 42.5 13.5 56 28 41.5 42.5 56 56 42.5 41.5 28 "></polygon>
                        </svg>
                        <span>Нет в наличии</span>
                      </div>
                    </div>
                  </div>
                  <div class="p-card__widget">
                    <div class="p-card__price">
                      <div class="cur">
                        <strong class="val">{{ fixedPrice }}</strong>
                        <small>BYN</small>
                      </div>
                      <div v-if="product.price_old" class="old">
                        <strong class="val">{{ product.price_old }}</strong>
                        <small>BYN</small>
                      </div>
                    </div>
                  </div>
                  <div class="p-card__widget">
                    <div class="p-card__options__dl">
                      <div class="p-card__options__di">
                        <div class="p-card__options__dt">Модель:</div>
                        <div class="p-card__options__dd">{{ product.model }}</div>
                      </div>
                      <div v-if="product.brand" class="p-card__options__di">
                        <div class="p-card__options__dt">Торговая марка:</div>
                        <div class="p-card__options__dd">{{ product.brand.name }}</div>
                      </div>
                      <div v-if="product.cloth" class="p-card__options__di">
                        <div class="p-card__options__dt">Полотно:</div>
                        <div class="p-card__options__dd">{{ product.cloth }}</div>
                      </div>
                      <div v-if="product.structure" class="p-card__options__di">
                        <div class="p-card__options__dt">Состав:</div>
                        <div class="p-card__options__dd">{{ product.structure }}</div>
                      </div>
                      <div v-if="product.type_of_finishing" class="p-card__options__di">
                        <div class="p-card__options__dt">Вид отделки::</div>
                        <div class="p-card__options__dd">{{ product.type_of_finishing }}</div>
                      </div>
                      <div
                        class="p-card__options__di"
                        v-if="product.heights"
                      >
                        <div class="p-card__options__dt">Размеры:</div>
                        <div class="p-card__options__dd">{{ product.heights }}</div>
                      </div>
                    </div>
                  </div>
                  <div class="p-card__widget">
                    <strong class="p-card__widget__title">Размер:</strong>
                    <ul class="p-card__options__grid">
                      <li v-for="(item, index) in sizes">
                        <span :title="item">{{item}}</span>
                      </li>
                    </ul>
                  </div>
                  <div class="p-card__widget">
                    <strong class="p-card__widget__title">Рост:</strong>
                    <ul class="p-card__options__grid">
                      <li v-for="(item, index) in heights">
                        <span :title="item">{{item}}</span>
                      </li>
                    </ul>
                  </div>
                  <div class="p-card__widget">
                    <strong class="p-card__widget__title">Цвет:</strong>
                    <ul class="p-card__color">
                      <li v-for="(item, index) in colors">

                        <span class="color-pic" :style="'background-color: #' + item.value + ';'">{{ item.name }}</span>
                        – {{ item.name }}
                      </li>

                    </ul>
                  </div>
                  <div class="p-card__widget">
                    <div class="social-share social-share__container-js" data-select="false">
                      <a href="#" class="social-share__opener social-share__opener-js">
                        <svg class="svg-ico-share" xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                             viewBox="0 0 70 86">
                          <path
                            d="M55 56c-4.8 0-9.1 2.3-11.8 5.8L28.2 50.2C29.3 48 30 45.6 30 43c0-2.6-0.7-5.1-1.9-7.2l15.1-11.6C45.9 27.7 50.2 30 55 30c8.2 0 15-6.8 15-15S63.2 0 55 0 40 6.8 40 15c0 1.3 0.2 2.5 0.5 3.7L24.2 31.2C21.7 29.2 18.5 28 15 28 6.8 28 0 34.8 0 43s6.8 15 15 15c3.5 0 6.7-1.2 9.3-3.2L40.5 67.3C40.2 68.5 40 69.7 40 71c0 8.2 6.8 15 15 15s15-6.8 15-15C70 62.8 63.2 56 55 56zM55 6c5 0 9 4 9 9s-4 9-9 9 -9-4-9-9S50 6 55 6zM15 52c-5 0-9-4-9-9s4-9 9-9 9 4 9 9S20 52 15 52zM55 80c-5 0-9-4-9-9s4-9 9-9 9 4 9 9S60 80 55 80z"></path>
                        </svg>
                      </a>
                      <div class="social-share__list social-share__drop-js">
                        <div class="social-share__item">
                          <a href="http://www.facebook.com/svitanakzhodino" title="Facebook" class="fb" target="_blank">
                            <span>Facebook</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-13.7 637.9 123 263.5" class="fb-icon"
                                 width="24" height="24">
                              <path
                                d="M67.2 723.1v-27.3c0-10.4 6.6-12.6 11.5-12.6 4.9 0 29.5 0 29.5 0v-45.4H67.8c-44.8 0-55.2 33.9-55.2 55.2v30.1h-26.2v46.5h26.2c0 59.6 0 131.7 0 131.7h54.7c0 0 0-72.7 0-131.7h37.2l4.9-46.5L67.2 723.1 67.2 723.1z"></path>
                            </svg>
                          </a>
                        </div>
                        <div class="social-share__item">
                          <a href="http://www.vk.com/svitanakzhodino" title="Вконтакте" class="vk" target="_blank">
                            <span>Вконтакте</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-187.4 676 396.5 225.6" class="vk-icon"
                                 width="24" height="24">
                              <path
                                d="M199,864.7c-9.7-9.7-48.5-50.5-48.5-50.5c-5.8-7.8-7.8-17.5-1.9-25.2c11.7-15.5,33-42.7,40.8-54.4  c11.7-15.5,33-48.5,3.9-48.5h-64.1c-5.8,0-9.7,3.9-13.6,7.8c0,0-25.2,46.6-33,62.1c-21.4,42.7-36.9,29.1-36.9,9.7v-68  c0-11.7-9.7-21.4-21.4-21.4h-48.5c-13.6-1.9-25.2,5.8-35,15.5c0,0,25.2-3.9,25.2,29.1c0,7.8,0,31.1,0,50.5c0,7.8-5.8,13.6-13.6,13.6  c-3.9,0-7.8-1.9-11.7-3.9c-19.4-27.2-36.9-56.3-48.5-87.4c-1.9-3.9-7.8-7.8-11.7-7.8h-58.3c-5.8,0-9.7,3.9-9.7,9.7  c0,1.9,0,1.9,0,3.9c17.5,48.5,93.2,200,180.6,200h36.9c7.8,0,13.6-5.8,13.6-13.6v-21.4c0-7.8,5.8-13.6,13.6-13.6  c3.9,0,7.8,1.9,9.7,3.9l42.7,40.8c3.9,3.9,9.7,5.8,13.6,5.8h58.3C214.6,899.6,214.6,880.2,199,864.7z"></path>
                            </svg>
                          </a>
                        </div>
                        <div class="social-share__item">
                          <a href="https://www.ok.ru/svitanakzhodino" title="Одноклассники" class="ok" target="_blank">
                            <span>Одноклассники</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="47.6 587 470.7 792" class="ok-icon"
                                 width="24" height="24">
                              <path
                                d="M285.2,956.6c103,0,184.7-81.9,184.7-184.7s-81.7-185-184.7-185s-184.8,81.9-184.8,184.7  S182.3,956.6,285.2,956.6z M285.2,679.5c50.2,0,92.5,42.3,92.5,92.5c0,50.2-42.3,92.5-92.5,92.5s-92.5-42.4-92.5-92.6  C192.9,721.6,235,679.5,285.2,679.5z M470.1,982.9c-26.3,0-79.2,52.9-184.7,52.9s-158.6-52.9-185-52.9c-29,0-52.9,23.8-52.9,52.9  c0,26.3,15.8,39.6,26.3,44.8c31.7,18.5,132.1,60.7,132.1,60.7L92.4,1283.8c0,0-21.1,23.8-21.1,42.3c0,29,23.8,52.9,52.9,52.9  c26.3,0,39.6-18.5,39.6-18.5s118.8-142.6,118.8-139.9l118.8,139.9c0,0,13.3,18.5,39.6,18.5c29,0,52.9-23.8,52.9-52.9  c0-15.8-21.1-42.3-21.1-42.3l-113.6-142.6c0,0,100.3-42.3,132.1-60.7c10.6-7.9,26.3-18.5,26.3-44.8  C522.7,1006.7,499,982.9,470.1,982.9z"></path>
                            </svg>
                          </a>
                        </div>
                        <div class="social-share__item">
                          <a href="https://www.instagram.com/svitanak.by/" title="Instagram" class="instagram"
                             target="_blank">
                            <span>Instagram</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="38 318 612 612" class="instagram-icon"
                                 width="24" height="24">
                              <path
                                d="M507.7,625.8c0,90.7-73.5,164.2-164.2,164.2s-164.2-73.5-164.2-164.2c0-33.5,10.1-64.6,27.3-90.7H38  v254.2C38,867,101,930,178.7,930h330.4c77.7,0,140.7-63,140.7-140.7V535.1H480.2C497.5,561,507.7,592.3,507.7,625.8z M344,743.1  c64.8,0,117.3-52.5,117.3-117.3S408.8,508.5,344,508.5S226.7,561,226.7,625.8C226.7,690.6,279.2,743.1,344,743.1z M279.9,561.5  c17.2-17,40-26.6,64.1-26.6c24.3,0,47.1,9.4,64.3,26.6c17.2,17.2,26.6,40,26.6,64.3s-9.4,47.1-26.6,64.3  c-17.2,17.2-40,26.6-64.3,26.6c-24.3,0-47.1-9.4-64.1-26.6c-17.2-17.2-26.6-40-26.6-64.3C253.3,601.5,262.7,578.7,279.9,561.5z   M509.3,318H178.7c-7.4,0-14.8,0.5-22.1,1.6h22.6v142h-26.6V320.4c-9.2,1.6-18.1,4.3-26.4,7.8v133.6H99.7V342.3  C62.4,367.6,38,410.3,38,458.7v49.8h190.5c29.7-29,70.1-46.9,115-46.9c44.7,0,85.3,17.9,115,46.9H650v-49.8  C650,381,587,318,509.3,318z M577,461.6h-69.3v-69.3H577V461.6z"></path>
                            </svg>
                          </a>
                        </div>
                      </div>
                      <div class="social-share__label">Поделиться</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="order-1"
               class="order-container bottom-space-lg order-accordion order-accordion__container-js order-js">
            <div class="order__caption">
              <div class="order__caption__th">Модель</div>
              <div class="order__caption__th">Цвет</div>
            </div>
            <div class="order">
              <div
                v-for="(item, index) in feature_items"
                :key="index"
                class="order__item order-item-js order-accordion__item-js is-open"
              >
                <div class="order__head order-accordion__header-js is-open">
                  <div class="order__head__th caption-for-table">
                    <div class="img-for-table">
                      <img :src="getImgUrl(product.image)" alt="Комплект жен. (фуфайка+брюки)"/>
                    </div>
                    <div class="title-for-table" data-label="Модель">
                      {{ product.name }} <span class="light-color">/</span> {{ product.model }}
                    </div>
                  </div>
                  <div class="order__head__th" data-label="Цвет">
                    <div class="color-indicator">
                        <span
                          class="color-pic"
                          :style="'background-color: #' + item.color.value + ';'">#{{ item.color.value }}</span> <span
                      class="dash">–</span> <span class="color-name">{{ item.color.name }}</span>
                    </div>
                  </div>
                  <div class="order-accordion__hand order-accordion__hand-js is-open">
                    <i class="accordion__header__angle">&nbsp;</i>
                    <span>Развернуть</span>
                    <span>Свернуть</span>
                  </div>
                </div>
                <div class="order__group is-open" style="display: block;">
                  <div class="order__group__holder">
                    <div class="order__labels">
                      <div class="order__labels__th">Рост</div>
                      <div class="order__labels__th">
                        <div data-short="Доступн. размеры">Доступные размеры</div>
                      </div>
                    </div>
                    <div class="order__list">
                      <div class="order__list__side">
                        <div
                          v-for="(height_, height_index) in item.heights"
                          :key="height_index"
                        >
                          {{ height_ }} см
                        </div>
                      </div>
                      <div class="order__list__content">
                        <div class="order__list__layout">
                          <table>
                            <thead>
                            <tr>
                              <th
                                v-for="(size_, size_index) in item.sizes"
                                :key="size_index"
                              >
                                {{ size_ }}
                              </th>
                            </tr>
                            </thead>
                            <tbody class="c-tbody">
                            <tr
                              v-for="(row_value, row_key, row_index) in item.data"
                            >

                              <td
                                v-for="(value, value_index) in row_value"
                              >
                                <div class="order-select" v-if="value !== null">
                                    <span class="ui-spinner ui-corner-all ui-widget ui-widget-content"
                                          style="height: 30px;">
                                      <input
                                        :data-max="value.count"
                                        v-model="value.value_"
                                        type="number"
                                        name="value"
                                        placeholder="0"
                                        data-only-number=""
                                        class="spinner spinner-js ui-spinner-input"
                                        aria-valuemin="0"
                                        autocomplete="off"
                                        role="spinbutton"
                                        readonly
                                      >
                                      <a @click="changeValueUnit(value, false, item.id)"
                                         data-entity="basket-item-quantity-plus"
                                         tabindex="-1" aria-hidden="true"
                                         class="ui-button ui-widget ui-spinner-button ui-spinner-up ui-corner-tr ui-button-icon-only"
                                         role="button">
                                        <span class="ui-button-icon ui-icon ui-icon-triangle-1-n"></span>
                                        <span class="ui-button-icon-space"> </span>
                                      </a>
                                      <a
                                        @click="changeValueUnit(value, true, item.id)"
                                        data-entity="basket-item-quantity-minus"
                                        tabindex="-1"
                                        aria-hidden="true"
                                        :class="[
                                            'ui-button ui-widget ui-spinner-button ui-spinner-down ui-corner-br ui-button-icon-only',
                                          ]"

                                        role="button"
                                      >
                                        <span class="ui-button-icon ui-icon ui-icon-triangle-1-s"></span>
                                        <span class="ui-button-icon-space"> </span>
                                      </a></span>
                                </div>
                                <div v-else class="order-select">
                                    <span
                                      class="ui-spinner ui-corner-all ui-widget ui-widget-content custom-superSpinner-disabled ui-state-disabled"
                                      style="height: 30px;">
                                      <input data-max="0" type="number" name="value" data-disabled="true" disabled=""
                                             placeholder="0" class="spinner spinner-js ui-spinner-input"
                                             aria-valuemin="0" autocomplete="off" role="spinbutton">
                                      <a data-entity="basket-item-quantity-plus" tabindex="-1" aria-hidden="true"
                                         class="ui-button ui-widget ui-spinner-button ui-spinner-up ui-corner-tr ui-button-icon-only ui-button-disabled ui-state-disabled"
                                         role="button">
                                        <span class="ui-button-icon ui-icon ui-icon-triangle-1-n"></span>
                                        <span class="ui-button-icon-space"> </span>
                                      </a>
                                      <a data-entity="basket-item-quantity-minus" tabindex="-1" aria-hidden="true"
                                         class="ui-button ui-widget ui-spinner-button ui-spinner-down ui-corner-br ui-button-icon-only ui-button-disabled ui-state-disabled"
                                         role="button">
                                        <span class="ui-button-icon ui-icon ui-icon-triangle-1-s"></span>
                                        <span class="ui-button-icon-space"> </span>
                                      </a>
                                    </span>
                                </div>
                              </td>
                            </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


            </div>
            <div class="order-result">
              <div class="order-result__label" data-short="Итоги:">Общая сумма заказа:</div>
              <div class="order-result__group">
                <div class="order-result__total">
                  <span class="text-mark">{{ countChose }}</span> <span data-short="шт.">штук</span>
                  на&nbsp;<span
                  class="text-mark">{{ priceCountChosed }}</span>&nbsp;BYN.
                </div>
                <button
                  class="btn-default"
                  :disabled="countChose == 0"
                  @click="addToCard()"
                >
                  В корзину
                </button>
              </div>
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
        title: this.product.name
      }
    },
    data() {
      return {
        product: {},
        sizes: [],
        colors: [],
        heights: [],
        prevProduct: {},
        nextProduct: {},

        feature_items: [],

        countChose: 0,
        price: 0,
      }
    },
    mounted() {
      this.getProduct()

      this.loadScript('js/common.js')

    }
    ,
    methods: {
      addToCard() {
        let result = []
        this.feature_items.forEach((feature_item) => {
          for (const key in feature_item['data']) {
            let obj_ = feature_item['data'][key]
            for (let key_item in obj_) {
              let item = obj_[key_item]
              if (item === null) {
                continue
              }
              if (item.value_ > 0) {
                result.push({
                  'feature_id': feature_item.id,
                  'feature_item_id': item.id,
                  'count': item.value_
                })
              }
            }
          }
        })
        if (result.length > 0) {
          this.addToCardQuery(result)
        }
      },
      addToCardQuery(data) {
        let data_body = {
          'data': data,
          'id': this.product.id,
        }
        let path = process.env.PATH_API_CARD
        let session_id = this.$store.state.localStorage.sessionId
        if (session_id !== null) {
          path = path + '?session_id=' + session_id
        }
        this.$axios.$post(path, data_body, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((response) => {
          this.$store.commit('card/setToCard', response)
          this.$store.commit('localStorage/setSessionId', response.session_id)
        })
      },
      getImgUrl: function (path) {
        return process.env.PATH_MEDIA + path
      },
      changeValueUnit(item, toMinus) {
        if (!toMinus && item.value_ + 1 <= item.count) {
          item.value_ = item.value_ + 1
          this.countChose = this.countChose + 1
        } else if (toMinus && item.value_ > 0) {
          item.value_ = item.value_ - 1
          this.countChose = this.countChose - 1
        }
      },
      getProduct() {
        let path = process.env.PATH_API_PRODUCTS + `/${this.$route.params.id}`
        this.$axios.$get(path).then(
          (response) => {
            this.product = response

            this.colors = response.features.colors
            this.sizes = response.features.sizes
            this.heights = response.features.heights

            this.prevProduct = response.prev_product
            this.nextProduct = response.next_product


            this.feature_items = response.feature_items
            this.price = this.product.price
          }
        ).catch((response) => {
          this.$router.push({'name': 'index'})
        });
      },
      loadScript(name) {
        if (!process.server) {
          var script = document.createElement("script");
          script.onload = this.onScriptLoaded;
          script.type = "text/javascript";
          script.src = 'https://svitanak-shop.site/' + name;
          document.body.appendChild(script);
        }
      },
      roundFix(number, precision) {
        var multi = Math.pow(10, precision);
        return Math.round((number * multi).toFixed(precision + 1)) / multi;
      }
    },
    computed: {
      fixedPrice() {
        if (this.product === {}) {
          return 0.00
        } else {
          return this.roundFix(this.product.price, 2)
        }
      },
      priceCountChosed() {
        return this.countChose * this.price
      }
    }

  }
</script>
