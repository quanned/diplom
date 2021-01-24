<template>
  <div
    :class="[
        'p-filters-item',
        isOpen ? 'p-filters-is-open' : '',
        isActive ? 'p-filters-on' : ''
      ]"
  >
    <div class="p-filters-placeholder">Отметте необходимое
      значение
    </div>
    <div class="p-filters-selected"
         data-filter-value-prefix="Выбрано" data-filter-value-postfix=""></div>
    <div class="p-filters-inner">
      <div class="p-filters-select" @click="changeViewBlock()">
        <div class="p-filters-select-head">
          <div class="p-filters__title">{{ title }}</div>
        </div>
        <div class="p-filters-angle"><i>&nbsp;</i></div>
      </div>
      <div class="p-filters-drop">
        <ul class="p-filters-drop-list">
          <li
            v-for="(item, index) in list"
            :key="index"
            @click="test(index, item.id)"
          >
            <label onclick="return false;" class="check-label">
              <input  onclick="return false;" type="checkbox" :checked="item.isActive" />
              <i>&nbsp;</i>
              <span>{{ getNameByKey(item)}}</span>
            </label>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: [
      'list',
      'title',
      'key_name',
      'id',
      'openDefault',
      'storeName',
    ],
    data() {
      return {
        isOpen: false,
        isActive: false,
      }
    },
    mounted() {
      this.isOpenBlock()
    },
    methods: {
      changeViewBlock: function () {
        let name = 'block__' + this.id
        this.isOpen = !this.isOpen
        if (process.browser) {
          localStorage.setItem(name, this.isOpen)
        }
      },
      isOpenBlock: function () {
        let name = 'block__' + this.id
        if (process.browser) {
          let status = localStorage.getItem(name)
          if (status != null) {
            this.isOpen = JSON.parse(status)
          } else {
            this.isOpen = this.openDefault
          }
        }
      },
      getNameByKey: function (item) {
        return item[this.key_name]
      },
      test: function (index, id) {
        console.log(index, id)
          this.$store.commit('setItemFilterActiveValue', {name: this.storeName, index})
          this.$store.commit('addToChosedFilter', {name: this.storeName, index, id})
      },
    },
    watch: {
      list: {
        deep: true,
        handler(value) {
          let status = false
          value.forEach(x => {
            if (x.isActive) status = true;
          });
          this.isActive = status
        }
      }
    }

  }
</script>
