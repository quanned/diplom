<template>
  <div class="shutter bag-shutter shutter-js bag-shutter-js group-js">
    <div class="shutter__align">
      <div class="shutter__holder">
        <div class="shutter__row group__body-js">
          <div class="shutter__cell">
            <div class="bag">
              <div class="bag__list">

                <div
                  class="bag__item"
                  v-for="(product, index) in products"
                >
                  <NuxtLink
                    :to="{name: 'products-id', 'params': {id: product.id}}"
                    class="bag__inner"
                    @click="close()"
                  >
                    <div class="bag__cell">
                      <div class="bag__img">
                        <img :src="getImgUrl(product.image)" :alt="product.name"/>
                      </div>
                    </div>
                    <div class="bag__cell">
                      <div class="bag__group">
                        <div class="bag__cell">
                          <div class="bag__title">{{ product.name }}</div>
                          <div class="bag__text">{{ product.count }} шт.</div>
                        </div>
                        <div class="bag__cell bag__cell--price">
                          <div class="bag__price">{{ product.amount }} BYN</div>
                        </div>
                      </div>
                    </div>
                  </NuxtLink>
                  <a @click="removeFromCard(product.id)" class="btn-del">
                    <svg class="svg-ico-close" xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                         viewBox="0 0 57.2 57.2">
                      <path
                        d="M34.3 28.6L56 6.9c1.6-1.6 1.6-4.1 0-5.7 -1.6-1.6-4.1-1.6-5.7 0L28.6 22.9 6.9 1.3c-1.6-1.6-4.1-1.6-5.7 0 -1.6 1.6-1.6 4.1 0 5.7l21.7 21.6L1.3 50.3c-1.6 1.5-1.6 4.1 0 5.6 0.8 0.8 1.8 1.2 2.8 1.2s2-0.4 2.8-1.2l21.7-21.6L50.3 56c0.8 0.8 1.8 1.2 2.8 1.2s2-0.4 2.8-1.2c1.6-1.6 1.6-4.1 0-5.7L34.3 28.6z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="shutter__row shutter__footer group__spacer-js">
          <div class="shutter__cell">
            <div class="bag-footer__row">
              <div class="bag-footer__cell">итого:</div>
              <div class="bag-footer__cell"><span class="mark">{{ amount }}</span> BYN</div>
            </div>
            <div class="bag-footer__row">
              <span
                @click="toOrder()"
                :class="['btn-default',  countProducts > 0 ? '' : 'btn-disable-card']"
              >
                Перейти в корзину
              </span>
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
    methods: {
      toOrder(){
        this.close()
        this.$router.push('/order')
      },
      getImgUrl: function (path) {
        return process.env.PATH_MEDIA + path
      },
      close(){
        document.getElementById('bag-open').click()
      },
      removeFromCard(id){
        let session_id = this.$store.state.localStorage.sessionId
        if (session_id === null){
          return
        }
        let path = process.env.PATH_API_CARD + '?session_id=' + session_id + '&id=' + id
        this.$axios.delete(path, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((response) => {
          if (response.status === 200){
            console.log(response)
            this.$store.commit('card/setToCard', response.data)
          }
        })
      },
    },
    computed: {
      ...mapGetters({
        amount: 'card/amountProducts',
        products: 'card/cardProducts',
        countProducts: 'card/countProducts',
      })
    }
  }
</script>

<style>
  .btn-disable-card {
    background-color: rgba(0, 0, 0, 0.4) !important;
    cursor: default !important;
  }
</style>
