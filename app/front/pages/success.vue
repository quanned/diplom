<template>
  <div>
    <!--MAIN-->
    <div class="main">
      <div class="main__holder">
        <!--CONTENT-->
        <div class="content-wrap">
          <div class="content user-content">
            <div class="err">
              <div class="success__holder">
                <h1 style="text-align: center;">Заказ успешно сформирован</h1>
                <p style="text-align: center;">В ближайшее время с вами свяжется наш специалист. Номер вашего заказа: {{
                  id }}.</p>
                <div style="text-align: center;">
                  <NuxtLink to="/">Вернуться на главную</NuxtLink>
                  или в
                  <NuxtLink to="/account">Личный кабинет</NuxtLink>
                </div>
                <div style="text-align: center;"></div>
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
        title: "Заказ сформирован"
      }
    },
    data() {
      return {
        id: null
      }
    },
    mounted() {
      this.loadScript('js/common.js')
      this.id = this.$route.query.order

    }
    ,
    methods: {
      loadScript(name) {
        if (!process.server) {
          var script = document.createElement("script");
          script.onload = this.onScriptLoaded;
          script.type = "text/javascript";
          script.src = name;
          document.body.appendChild(script);
        }
      },

    }
  }
</script>
