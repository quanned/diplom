<template>
  <article class="products__item">
    <div class="products__inner">
      <div class="products__brand">
        <img :src="getImgUrlBrand" alt="Бренд"/>
      </div>
      <NuxtLink :to="{name: 'products-id', 'params': {id: data.id}}">
        <div class="products__visual">
          <div v-if="data.is_new" class="products__new">&nbsp;</div>
          <div class="products__figure">
            <div class="products__img">
              <img :src="getImgUrlProduct" :alt="data.name"/>
            </div>
          </div>
        </div>
        <div class="products__title"><span>{{ data.name }}</span> <em
          class="products__model">{{ data.model }}</em></div>
      </NuxtLink>
      <div class="products__content">
        <div class="products__dl">
          <div class="products__di">
            <div class="products__dt">Модель:</div>
            <div class="products__dd">{{ data.model }}</div>
          </div>
          <div v-if="data.brand" class="products__di">
            <div class="products__dt">Торг. марка:</div>
            <div class="products__dd">{{ data.brand.name }}</div>
          </div>
          <div class="products__di">
            <div class="products__dt">Полотно:</div>
            <div class="products__dd">{{ data.cloth }}</div>
          </div>
          <div class="products__di">
            <div class="products__dt">Состав:</div>
            <div class="products__dd">{{ data.structure }}</div>
          </div>
          <div class="products__di">
            <div class="products__dt">Размеры:</div>
            <div class="products__dd">84-108</div>
          </div>
          <div class="products__di">
            <div class="products__dt">Цвет</div>
            <div class="products__dd">
              <div class="color-pics">
                {{ data.colors }}}
                <div
                  v-for="color in data.colors"
                  class="color-pic" :style="'background-color: #' + color + ';'"
                >
                  {{ '#' + color }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="products__footer">
        <div class="products__price">
          <div class="cur"><strong class="val">{{ data.price }}</strong> <span class="unit">BYN</span>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
  export default {
    props: ['data'],
    methods: {
      getImgUrl: function (path) {
        return process.env.PATH_MEDIA + path
      }
    },
    computed: {
      getImgUrlProduct: function () {
        if (this.data){
          return this.getImgUrl(this.data.image)
        }
      },
      getImgUrlBrand: function () {
        if (this.data){
          return this.getImgUrl(this.data.brand.image)
        }
      },

    }
  }
</script>
