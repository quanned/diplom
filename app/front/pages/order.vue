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
                <li>
                  <NuxtLink to="/"><span title="Главная">Главная</span></NuxtLink>
                </li>
                <li><span title="Мои заказы">Оформление заказа</span></li>
              </ul>
            </div>
            <div class="heading">
              <h1>Оформление заказа <span class="sep">&nbsp;</span></h1>
              <div class="heading__options">
                <NuxtLink to="/" class="btn-underline btn-with-icon" title="Перейти в каталог">
                  <svg class="svg-ico-arr-l" xmlns="http://www.w3.org/2000/svg" width="12" height="12"
                       viewBox="0 0 62 45.2">
                    <path
                      d="M61.6 20.7c-0.8-2.3-3-3.7-5.6-3.7 -11.3 0-22.6 0-33.9 0h-1.1c0.3-0.3 0.5-0.5 0.7-0.6 2.4-2.1 4.8-4.2 7.1-6.3 2.9-2.6 2.9-6.6 0-8.8C28 0.7 27 0.4 26.1 0h-1.8c-1.8 0.4-3.2 1.6-4.6 2.8C14.1 7.8 8.4 12.8 2.7 17.7 1.4 18.8 0.4 20.1 0 21.8v1.6c0.4 1.9 1.7 3.2 3.1 4.5 5.7 4.9 11.3 9.9 17 14.9 1.2 1.1 2.5 2.1 4.2 2.5h1.8c0.7-0.3 1.5-0.5 2.2-0.9 3.1-1.8 3.7-6.1 1.1-8.6 -2.5-2.4-5.1-4.5-7.6-6.8 -0.2-0.2-0.4-0.4-0.7-0.7h1c11.2 0 22.4 0 33.6 0 3.4 0 5.3-1.4 6.3-4.7 0 0 0.1-0.1 0.1-0.1v-1.6C61.9 21.4 61.8 21.1 61.6 20.7z"></path>
                  </svg>
                  <span>В каталог</span>
                </NuxtLink>
              </div>
            </div>
            <div v-if="card.length > 0">
              <div class="cart-order bottom-space-lg order-calc-js">
                <table class="c-table">
                  <thead class="c-thead">
                  <tr class="c-tr">
                    <th colspan="1" class="c-th c-th--caption">Наименование</th>
                    <th class="c-th c-th--model">Модель</th>
                    <th class="c-th c-th--size">Размер</th>
                    <th class="c-th c-th--height">Рост</th>
                    <th class="c-th c-th--spinner">Кол-во шт.</th>

                    <th class="c-th c-th--price">Цена</th>
                    <th class="c-th c-th--price-total">Стоимость</th>
                    <th class="c-th c-th--del">
                      <svg class="svg-ico-bin" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                           viewBox="0 0 48 58">
                        <path
                          d="M45 6H30V3c0-1.7-1.3-3-3-3h-6c-1.7 0-3 1.3-3 3v3H3C1.3 6 0 7.3 0 9v3h48V9C48 7.3 46.7 6 45 6zM3 55c0 1.7 1.3 3 3 3h36c1.7 0 3-1.3 3-3V15H3V55zM33 24c0-1.7 1.3-3 3-3s3 1.3 3 3v25c0 1.7-1.3 3-3 3s-3-1.3-3-3V24zM21 24c0-1.7 1.3-3 3-3s3 1.3 3 3v25c0 1.7-1.3 3-3 3s-3-1.3-3-3V24zM9 24c0-1.7 1.3-3 3-3s3 1.3 3 3v25c0 1.7-1.3 3-3 3s-3-1.3-3-3V24z"></path>
                      </svg>
                      <span>Удалить</span></th>
                  </tr>
                  </thead>
                  <tbody class="c-tbody">
                  <template
                    v-for="(product, product_index) in card"
                  >
                    <tr class="c-tr c-tr--head order-calc__item-js order-calc__head-js" id="P209101">
                      <td class="c-td c-td--caption" data-label="Наименование">
                        <div class="td__val">
                          <NuxtLink :to="{name: 'products-id', 'params': {id: product.id}}" class="caption-for-table">
                            <div class="img-for-table">
                              <img :src="getImgUrl(product.image)" :alt="product.name"/>
                            </div>
                            <div class="title-for-table">
                              {{product.name}}
                            </div>
                          </NuxtLink>
                        </div>
                      </td>
                      <td class="c-td c-td--model" data-label="Модель">
                        <div class="c-td__val">
                          {{ product.model }}
                        </div>
                      </td>
                      <td class="c-td c-td--size" data-label="Размер">
                        <div class="c-td__val">
                          &mdash;
                        </div>
                      </td>
                      <td class="c-td c-td--height" data-label="Рост">
                        <div class="c-td__val">
                          &mdash;
                        </div>
                      </td>
                      <td class="c-td c-td--packs-length" data-label="Кол-во шт.">
                        <div class="c-td__val">
                          <span class="order-calc__packs-in-group-js">{{ product.count }}</span> шт.
                        </div>
                      </td>


                      <td class="c-td c-td--price" data-label="Цена">
                        <div class="c-td__val">
                          &mdash;
                        </div>
                      </td>
                      <td class="c-td c-td--price-sum" data-label="Сумма">
                        <div class="c-td__val">
                          <span class="order-calc__price-sum-in-group-js">{{ product.amount }}</span> BYN.
                        </div>
                      </td>
                      <td class="c-td c-td--del">
                        <a
                          class="btn-del"
                          title="Удалить группу из корзины"
                          @click="removeGroup(product_index)"
                        >
                          <svg class="svg-ico-close" xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                               viewBox="0 0 57.2 57.2">
                            <path
                              d="M34.3 28.6L56 6.9c1.6-1.6 1.6-4.1 0-5.7 -1.6-1.6-4.1-1.6-5.7 0L28.6 22.9 6.9 1.3c-1.6-1.6-4.1-1.6-5.7 0 -1.6 1.6-1.6 4.1 0 5.7l21.7 21.6L1.3 50.3c-1.6 1.5-1.6 4.1 0 5.6 0.8 0.8 1.8 1.2 2.8 1.2s2-0.4 2.8-1.2l21.7-21.6L50.3 56c0.8 0.8 1.8 1.2 2.8 1.2s2-0.4 2.8-1.2c1.6-1.6 1.6-4.1 0-5.7L34.3 28.6z"></path>
                          </svg>
                          <span>Удалить группу из корзины</span>
                        </a>
                      </td>
                    </tr>
                    <tr
                      class="c-tr c-tr--child order-calc__item-js order-calc__child-js"
                      data-id="P209101_170_84"
                      :data-group-id="product.model"
                      v-for="(item, item_index) in product.data"
                    >

                      <td class="c-td c-td--model" data-label="Модель">
                        <div class="c-td__val">
                          ...
                        </div>
                      </td>
                      <td class="c-td c-td--model" data-label="Модель">
                        <div class="c-td__val">
                          ...
                        </div>
                      </td>

                      <td class="c-td c-td--size" data-label="Размер">
                        <div class="c-td__val">
                          {{ item.size }}
                        </div>
                      </td>
                      <td class="c-td c-td--height" data-label="Рост">
                        <div class="c-td__val">
                          {{ item.height }}
                        </div>
                      </td>
                      <td class="c-td c-td--packs-length" data-label="Кол-во шт.">
                        <div class="c-td__val">
                          <span class="ui-spinner ui-corner-all ui-widget ui-widget-content" style="height: 30px;">
                            <input
                              class="spinner spinner-js order-calc__spin-packs-js ui-spinner-input"
                              :max="item.max_count"
                              min="0"
                              type="number"
                              name="value"
                              :value="item.count"
                              data-only-number=""
                              aria-valuemin="0"
                              aria-valuemax="100"
                              aria-valuenow="5"
                              autocomplete="off"
                              role="spinbutton"
                            >
                            <a
                              data-entity="basket-item-quantity-plus"
                              tabindex="-1"
                              aria-hidden="true"
                              class="ui-button ui-widget ui-spinner-button ui-spinner-up ui-corner-tr ui-button-icon-only"
                              role="button"
                              @click="setItemCount(item, product, false)"
                            >
                              <span class="ui-button-icon ui-icon ui-icon-triangle-1-n">
                              </span>
                              <span class="ui-button-icon-space"> </span>
                            </a>
                            <a
                              data-entity="basket-item-quantity-minus"
                              tabindex="-1"
                              aria-hidden="true"
                              class="ui-button ui-widget ui-spinner-button ui-spinner-down ui-corner-br ui-button-icon-only"
                              role="button"
                              @click="setItemCount(item, product, true)"
                            >
                              <span class="ui-button-icon ui-icon ui-icon-triangle-1-s"></span>
                              <span class="ui-button-icon-space"> </span>
                            </a>
                          </span>
                        </div>
                      </td>


                      <td class="c-td c-td--price" data-label="Цена">
                        <div class="c-td__val">
                          <div class="order-calc__price-js" :data-price="product.price">{{ product.price }} BYN</div>
                        </div>
                      </td>
                      <td class="c-td c-td--price-sum" data-label="Сумма">
                        <div class="c-td__val">
                          <span class="order-calc__price-sum-js">{{ item.amount }}</span> BYN
                        </div>
                      </td>
                      <td class="c-td c-td--del">
                        <a
                          class="btn-del"
                          title="Удалить товар из корзины"
                          @click="removeItem(product_index, item_index)"
                        >
                          <svg class="svg-ico-close" xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                               viewBox="0 0 57.2 57.2">
                            <path
                              d="M34.3 28.6L56 6.9c1.6-1.6 1.6-4.1 0-5.7 -1.6-1.6-4.1-1.6-5.7 0L28.6 22.9 6.9 1.3c-1.6-1.6-4.1-1.6-5.7 0 -1.6 1.6-1.6 4.1 0 5.7l21.7 21.6L1.3 50.3c-1.6 1.5-1.6 4.1 0 5.6 0.8 0.8 1.8 1.2 2.8 1.2s2-0.4 2.8-1.2l21.7-21.6L50.3 56c0.8 0.8 1.8 1.2 2.8 1.2s2-0.4 2.8-1.2c1.6-1.6 1.6-4.1 0-5.7L34.3 28.6z"></path>
                          </svg>
                          <span>Удалить товар из корзины</span>
                        </a>
                      </td>
                    </tr>
                  </template>

                  </tbody>
                  <tfoot class="c-tfoot order-calc__total-results-js">
                  <tr class="c-tr">
                    <td class="c-td" colspan="4">
                      <div class="td__val">Итого:</div>
                    </td>
                    <td class="c-td" colspan="2">
                      <div class="c-td__val">
                        <span class="mark order-calc__packs-total-js">{{ countChose }}</span>&nbsp;шт.
                      </div>
                    </td>

                    <td class="c-td" colspan="2">
                      <div class="c-td__val">
                        <span class="mark order-calc__price-total-js">{{ amountChose }}</span>&nbsp;BYN
                      </div>
                    </td>
                  </tr>
                  </tfoot>
                </table>
                <!--!!! Текст, который будет отображаться, когда нет товаров-->
                <div class="order-calc__empty">- Корзина пуста -</div>
                <!--!!! Текст, который всплывает после очистки корзины-->
                <div class="order-calc__empty-alert">Ваша корзина пуста</div>
              </div>
              <div class="heading">
                <h2>Личные данные <span class="sep">&nbsp;</span></h2>
              </div>
              <div class="layout-flood bottom-space-lg">
                <div class="dl-list bottom-space">
                  <div class="dl-list__di">
                    <div class="dl-list__dt">Адрес доставки:</div>
                    <div class="dl-list__dd">
                      <input
                        placeholder="Введите адрес..."
                        class="dark-form input-style"
                        type="text"
                        v-model="address"
                      />
                    </div>
                  </div>
                  <div class="dl-list__di">
                    <div class="dl-list__dt">Электронная почта:</div>
                    <div v-if="$auth.loggedIn" class="dl-list__dd">
                      {{ $auth.user }}
                    </div>
                    <div class="dl-list__dd" v-else>
                      <input
                        placeholder="Введите E-mail..."
                        class="dark-form input-style"
                        type="email"
                        v-model="email"
                      />
                    </div>
                  </div>
                  <div class="dl-list__di">
                    <div class="dl-list__dt">Телефон:</div>
                    <div class="dl-list__dd">
                      <input
                        placeholder="Введите телефон (375-XX-XXX-XX-XX)"
                        class="dark-form input-style"
                        type="text"
                        v-mask="'###-##-###-##-##'"
                        v-model="phone"
                      />
                    </div>
                  </div>
                  <div class="dl-list__di">
                    <div class="dl-list__dt">ФИО контактного лица:</div>
                    <div class="dl-list__dd">
                      <input
                        placeholder="Введите инициалы..."
                        class="dark-form input-style"
                        type="text"
                        v-model="initials"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="heading">
                <h2>Комментарий к заказу <span class="sep">&nbsp;</span></h2>
              </div>
              <div class="comment-form">
                <!--<label for="form-clear-ta-base">Ваше сообщение...</label>-->
                <textarea v-model="commentary" placeholder="Ваше сообщение..." class="dark-form"></textarea>

                <div class="note note--align-left" style="margin-bottom: 20px;margin-top: -20px;">После оформления
                  заказа менеджер ОАО «Свiтанак» свяжется с Вами для
                  уточнения окончательных деталей заказа.
                </div>
                <div
                  style="text-align: center; color:red;padding-bottom: 15px;"
                >
                  {{ error }}
                </div>
                <div class="form-buttons">
                  <button @click="toOrder()" class="btn-default order-calc-btn float-right">
                    <span class="for-desk">Оформить заказ</span>
                    <span class="for-mob">Оформить</span>
                  </button>
                </div>
              </div>
            </div>
            <form v-else>Невозможно оформить заказ. У вас пустая корзина.</form>
          </div>
        </div>
        <!--CONTENT end-->
      </div>
    </div>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    head() {
      return {
        title: "Оформление заказа"
      }
    },
    data() {
      return {
        onPersonalData: true,
        card: [],

        countChose: 0,
        amountChose: 0,

        address: null,
        email: null,
        phone: null,
        initials: null,
        commentary: null,

        error: null,
      }
    },
    mounted() {
      this.getCardToOrder()
      this.loadScript('js/common.js')

    }
    ,
    methods: {
      toOrder() {
        if (!this.validateField(this.address, 'Адрес доставки не заполнен')) {
          return
        }

        if (!this.$auth.loggedIn && this.validateField(this.email, 'Поле E-mail не заполнено')) {

        } else if (!this.$auth.loggedIn && this.validateEmail(this.email)) {
          this.error = 'Поле E-mail заполнен неверно.'
          return;
        }

        if (!this.validateField(this.phone, 'Поле телефона не заполнено')) {
          return;
        }

        if (!this.validateField(this.initials, 'Поле ФИО не заполнено')) {
          return;
        }

        this.error = null

        let path = process.env.PATH_MEDIA + '/api/order'
        let data = {
          'products': this.card,
          'info': {
            'address': this.address,
            'email': this.$auth.loggedIn ? this.$auth.user : this.email,
            'phone': this.phone.match(/\d/g).join(""),
            'initials': this.initials,
            'commentary': this.commentary,
          }
        }

        this.$axios.$post(path, data, {
          headers: {
            'Content-Type': 'application/json',
          }
        }).then((response) => {
          this.$store.commit('localStorage/setSessionId', null)
          this.$store.commit('card/setToCard', {'products': [], 'amount': 0.00})
          this.$router.push('/success?order=1')
        }).catch((error) => {
          this.error = error.response.data
        })

      },
      validateField(field, error) {
        if (field === null || this.field === "") {
          this.error = error
          return false
        }
        return true
      },
      validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      },
      getImgUrl: function (path) {
        return process.env.PATH_MEDIA + path
      },
      setItemCount(item, product, toMinus = false) {
        if (!toMinus && item.count + 1 <= item.max_count) {
          item.count = item.count + 1
          product.count = product.count + 1

          item.amount = item.count * item.price
          this.updateProduct(product)

          this.countChose = this.countChose + 1
        } else if (toMinus && item.count > 0) {
          item.count = item.count - 1
          product.count = product.count - 1

          item.amount = item.count * item.price
          this.updateProduct(product)


          this.countChose = this.countChose - 1
        }

        let amountChose = 0
        this.card.forEach((product) => {
          amountChose = product.amount + amountChose
        })
        this.amountChose = amountChose
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
      getCardToOrder() {
        let session_id = this.$store.state.localStorage.sessionId
        if (session_id !== null) {
          let path = process.env.PATH_MEDIA + '/api/order' + '?session_id=' + session_id
          this.$axios.get(path, {
            headers: {
              'Content-Type': 'application/json'
            }
          }).then((response) => {
            if (response.status === 200) {
              this.card = response.data
            }
          })
        }
      },
      updateProduct(product) {
        let amountProduct = 0
        let countChose = 0
        product.data.forEach((i) => {
          amountProduct = amountProduct + i.amount
          countChose = i.count + countChose
        })

        product.count = countChose
        product.amount = amountProduct
      },
      updateCard(value_) {
        let countChose = 0
        let amountChose = 0
        value_.forEach((product) => {
          countChose = countChose + product.count
          amountChose = amountChose + product.amount
        })
        this.countChose = countChose
        this.amountChose = amountChose
      },
      removeGroup(index) {
        this.card.splice(index, 1)
      },
      removeItem(product_index, item_index) {
        this.card[product_index].data.splice(item_index, 1)
        if (this.card[product_index].data.length === 0) {
          this.removeGroup(product_index)
        } else {
          this.updateProduct(this.card[product_index])
          this.updateCard(this.card)
        }
      },


    }
    ,
    watch: {
      card(value_) {
        this.updateCard(value_)
      },
    }
  }
</script>

<style>
  .input-style {
    border: none !important;
    outline: none !important;
    padding-bottom: 10px !important;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3) !important;
  }
</style>
