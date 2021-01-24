<template>
  <div
    class="p-filters-tags__item p-filters-tags-item-js"
    data-filter-group="type"
  >
    <i @click="delFromChosedFilter()">X</i>
    <span class="p-filters-tag-text-js">{{ getItemName() }}</span>
  </div>
</template>

<script>
  export default {
    props: ['item',],
    methods: {
      getItemName() {
        if (this.item.value.value != null && this.item.value.name != null) {
          return this.item.value.name
        } else if (this.item.value.value != null) {
          return this.item.value.value
        }
        return this.item.value.name
      },
      delFromChosedFilter() {
        this.$store.commit('delFromChosedFilter', {
          name: this.item.name,
          index: this.item.index,
          id: this.item.value.id
        })
      }
    }
  }
</script>
