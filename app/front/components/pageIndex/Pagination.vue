<template>
  <div class="pagination max-wrap-text">
    <div class="pg-left">
      <a
        v-if="pages.links.has_prev"
        class="pg-prev"
        @click="toPrevPage()"
      >
        <span>Назад</span>
        <i class="pg-prev-arr">&nbsp;</i>
      </a>
      <a class="pg-prev disabled" v-else>
        <span>Назад</span>
        <i class="pg-prev-arr">&nbsp;</i>
      </a>
    </div>
    <ul class="pg-list">
      <!--      <li><a href="#">1</a></li>-->
      <!--      <li><span class="dots">...</span></li>-->
      <!--      <li><a href="#">8</a></li>-->
      <li class="active"><a>{{ pages.current_page }}</a></li>
      <!--      <li><a href="#">10</a></li>-->
      <!--      <li><span class="dots">...</span></li>-->
      <!--      <li><a href="#">127</a></li>-->
    </ul>
    <div class="pg-right">
      <a
        v-if="pages.links.has_next"
        class="pg-next"
        @click="toNextPage"
        style="cursor:pointer;"
      >
        <span>Вперед</span>
        <i class="pg-next-arr">&nbsp;</i>
      </a>
      <a v-else class="pg-next disabled">
        <span>Вперед</span>
        <i class="pg-next-arr">&nbsp;</i>
      </a>
    </div>
    {{ pages }}
  </div>
</template>

<script>
  export default {
    props: ['pages'],
    data() {
      return {}
    },
    mounted() {
      console.log()
    },
    methods: {
      toNextPage() {
        let page = null
        if (this.$store.state.page != null) {
          page = this.$store.state.page
        } else {
          page = 1
        }
        this.$router.push({name: 'index', query: {page: page + 1}})
        this.$store.commit('setPage', page + 1)
      },
      toPrevPage() {
        let page = null
        if (this.$store.state.page != null) {
          page = this.$store.state.page
        } else {
          page = 1
        }
        this.$router.push({name: 'index', query: {page: page - 1}})
        this.$store.commit('setPage', page - 1)
      },
    },
    computed: {}
  }
</script>
