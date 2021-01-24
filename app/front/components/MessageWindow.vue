<template>
  <div id="msg-popup" class="default-popup mfp-with-anim mfp-hide">
    <div class="default-popup__content">
      <div class="pseudotabs-nav">
        <div class="pseudotabs-tab">
          <a><span>Сообщение</span></a>
        </div>
      </div>
      <div class="msg-form">
        <div v-if="sended" class="js-form_result js-ajax_replace" id="form-result-message">
          <div class="success-text">Спасибо!<br> Ваша заявка принята!</div>
        </div>
        <div v-if="!sended">
          <input v-model="firstName" type="text" placeholder="Ваше имя">
          <input v-model="email" type="email" placeholder="E-mail">
          <input v-mask="'###-##-###-##-##'" v-model="phone" type="text" placeholder="Телефон (375-XX-XXX-XX-XX)">
          <textarea v-model="message" placeholder="Сообщение"></textarea>
          <div
            style="text-align: center; color:red;padding-bottom: 15px;"
          >
            {{ error }}
          </div>
          <div class="form-buttons">
            <button @click="sendMessage()" class="btn-default btn-submit">Отправить</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        firstName: null,
        email: null,
        phone: null,
        message: null,

        sended: false,
        error: null,
      }
    },
    methods: {
      resetData(){
        this.firstName = null
        this.email = null
        this.phone = null
        this.message = null
        this.sended = false
        this.error = null
      },
      sendMessage() {
        document.getElementById("msg-popup").getElementsByClassName('mfp-close')[0].onclick = this.resetData
        if (!this.validateField(this.firstName, 'Поле Имя не заполнено')) {
          return
        }

        if (!this.validateField(this.email, 'Поле E-mail не заполнено')) {
          return;
        } else if (!this.validateEmail(this.email)) {
          this.error = "Поле E-mail заполнено неверно."
          return;
        }

        if (!this.validateField(this.phone, 'Поле Телефона не заполнено')) {
          return
        }

        if (!this.validateField(this.message, 'Поле Сообщения не заполнено')) {
          return
        }

        this.error = null

        let path = process.env.PATH_API_MESSAGE
        let phone = this.phone.match(/\d/g)
        let data = {
          first_name: this.firstName,
          email: this.email,
          phone: phone.join(""),
          message: this.message
        }

        this.$axios.$post(path, data, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((response) => {
          this.sended = true
        }).catch((response) => {
          console.log(response)
          this.error = response
        })

      },
      validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      },
      validateField(field, error) {
        if (field === null || this.field === "") {
          this.error = error
          return false
        }
        return true
      }
    }
  }
</script>
