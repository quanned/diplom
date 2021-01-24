<template>
  <div>
    <!--[if lt IE 9]>
    <div class="browserupgrade"><p>You are using an <strong>outdated</strong> browser. Please <a
      href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p></div> <![endif]-->
    <Header/>
    <div class="wrapper">
      <div class="max-wrap layout">
        <div class="main">
				<div class="main__holder">
					<div class="content-wrap">
						<div class="content user-content">
							<div class="err">
								<div class="err__holder">
									<h1 style="text-align: center;">Page Not Found</h1>
									<p style="text-align: center;">Sorry, but the page you were trying to view does not exist.</p>
									<div style="text-align: center;"><NuxtLink to="/">Home page</NuxtLink></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

      </div>
    </div>
    <Sidebar/>
    <SearchWindow/>
    <CardWindow/>
    <MessageWindow/>
    <AuthWindow/>
    <LoginWindow/>
    <LeftMenu/>
    <Footer/>
  </div>
</template>

<script>
  export default {
    mounted() {
      this.setViewProduct()
      this.getInitialData()

      let session_id = this.$store.state.localStorage.sessionId
      if (session_id !== null){
        this.initialCard(session_id)
      }
    },
    methods: {
      initialCard(session_id){
        let path = process.env.PATH_API_CARD + '?session_id=' + session_id
        this.$axios.get(path, {
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
      getInitialData: function () {
        const path = process.env.PATH_API_INITIAL + "?only=brands,colors,height,sizes"
        this.$axios.$get(path).then(
          (response) => {
            this.$store.commit('setCategories', response.categories)
            this.$store.commit('setBrandsFilter', response.brands)
            this.$store.commit('setColorsFilter', response.colors)
            this.$store.commit('setHeightsFilter', response.height)
            this.$store.commit('setSizesFilter', response.sizes)
            this.$store.commit('setOrdersByList', response.orders)
          }
        )
      },
      setViewProduct: function () {
        const name = 'setProductBigView'
        if (process.browser) {
          const value = JSON.parse(localStorage.getItem(name))
          this.$store.commit(name, value)
        }
      }
    }
  }
</script>
