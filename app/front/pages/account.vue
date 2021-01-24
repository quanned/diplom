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
                <li><a href="/"><span title="Главная">Главная</span></a></li>
                <li><span title="Личные данные">Личные данные</span></li>
              </ul>
            </div>
            <div class="heading">
              <h1>Личный кабинет <span class="sep">&nbsp;</span></h1>
              <div class="heading__options">
                <a @click="$auth.logout()" class="btn-underline"><span>выйти</span></a>
              </div>
            </div>
            <!--cabinet-->
            <div class="pseudotabs cabinet layout-flood">
              <div class="pseudotabs-nav align-center">
                <div class="pseudotabs-tab">
                  <a
                    @click="onPersonalData=true"
                    :class="[onPersonalData ? 'active-tab' : '']"
                  >
                    <span>Личные данные</span>
                  </a>
                </div>
                <div class="pseudotabs-tab">
                  <a
                    @click="onPersonalData=false"
                    :class="[!onPersonalData ? 'active-tab' : '']"
                  >
                    <span>Мои заказы</span>
                  </a>
                </div>
              </div>
              <div class="pseudotabs-panels">
                <PersonalData :info="resp.info" v-if="onPersonalData"/>
                <HistoryOrders :orders="resp.orders" v-else/>
              </div>
            </div>
            <!--cabinet end-->
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    middleware: 'auth',
    head() {
      return {
        title: "Личный кабинет"
      }
    },
    data() {
      return {
        onPersonalData: true,
        resp: {
          'info': {},
          'orders': {
            'data': [],
          }
        }
      }
    },
    mounted() {
      this.loadScript('js/common.js')
      this.getInfo()
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
      getInfo(){
        let path = process.env.PATH_MEDIA + '/api/account'
          this.$axios.get(path, {
            headers: {
              'Content-Type': 'application/json'
            }
          }).then((response) => {
            if (response.status === 200) {
              this.resp = response.data
            }
          })
      }
    }
    ,
  }
</script>
