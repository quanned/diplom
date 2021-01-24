<template>
  <div id="log-popup" class="default-popup mfp-with-anim mfp-hide">
    <div class="default-popup__content">
      <div class="pseudotabs-nav">
        <div class="pseudotabs-tab">
          <a
            :class="[toLogin ? 'active-tab' : '']"
            @click="toLogin = true; resetData(false)"
          >
            <span>Вход</span>
          </a>
        </div>
        <div class="pseudotabs-tab">
          <a
            :class="[!toLogin ? 'active-tab' : '']"
            @click="toLogin = false; resetData(true)"
          >
            <span>Регистрация</span>
          </a>
        </div>
      </div>
      <div
        v-if="toLogin"
        class="msg-form"
      >
        <input type="email" v-model="email" placeholder="E-mail">
        <input type="password" v-model="password" placeholder="Пароль">

        <div
          style="text-align: center; color:red;padding-bottom: 15px;"
        >
          {{ loginError }}
        </div>
        <div class="form-buttons">
          <button @click="login()" class="btn-default btn-submit">Войти</button>
        </div>
      </div>
      <div
        v-else
        class="msg-form"
      >
        <input type="email" v-model="registerEmail" placeholder="E-mail">
        <input type="password" v-model="registerPassword" placeholder="Пароль">
        <input type="password" v-model="registerPasswordConfirm" placeholder="Подтвердите пароль">

        <div
          style="text-align: center; color:red;padding-bottom: 15px;"
        >
          {{ registerError }}
        </div>
        <div class="form-buttons">
          <button @click="register()" class="btn-default btn-submit">Регистрация</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        email: null,
        password: null,
        loginError: null,

        registerEmail: null,
        registerPassword: null,
        registerPasswordConfirm: null,
        registerError: null,


        toLogin: true
      }
    },
    methods: {
      resetData(t) {
        if (t) {
          this.email = null
          this.password = null
        } else {
          this.registerEmail = null
          this.registerPassword = null
          this.registerPasswordConfirm = null
        }
      },
      login() {
        if (!this.validateField(this.email, 'Поле Email не заполнено', true)) {
          return
        } else if (!this.validateEmail(this.email)) {
          this.loginError = "Поле E-mail заполнено неверно."
          return;
        }

        if (!this.validateField(this.password, 'Поле Пароля не заполнено', true)) {
          return
        }
        this.loginError = null

        try {
          this.$auth.loginWith('local', {
            data:
              {"username": this.email, "password": this.password}
          }).then(
            () => {
              this.loginError = null
              document.getElementsByClassName('mfp-close-btn-in')[0].click()
            }
          ).catch(() => {
            this.loginError = "Введенные данные не верные."
          })
        } catch {
          this.loginError = "Введенные данные не верные."
        }

      },
      register() {
        if (!this.validateField(this.registerEmail, 'Поле Email не заполнено', false)) {
          return
        } else if (!this.validateEmail(this.registerEmail)) {
          this.loginError = "Поле E-mail заполнено неверно."
          return;
        }

        if (!this.validateField(this.registerPassword, 'Поле Пароля не заполнено', false)) {
          return
        }
        if (this.registerPassword.length <= 6) {
          this.registerError = "Минимальная длина пароля - 6 символов."
          return;
        }
        if (!this.validateField(this.registerPasswordConfirm, 'Поле Подтверждения не заполнено', false)) {
          return
        }

        if (this.registerPassword !== this.registerPasswordConfirm) {
          this.registerError = "Пароли отличаются. Введите идентичные пароли."
          return;
        }

        this.registerError = null

        let dataRegister = {
          'email': this.registerEmail,
          'password': this.registerPassword,
        }

        let path = process.env.PATH_MEDIA + '/api/account/register'
        this.$axios.$post(path, dataRegister, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((response) => {
          this.$auth.loginWith('local', {
            data:
              {
                'username': this.registerEmail,
                'password': this.registerPassword,
              }
          }).then(() => {
            this.registerError = null
            document.getElementsByClassName('mfp-close-btn-in')[0].click()
          })
        }).catch((response) => {
          this.registerError = "Такой пользователь уже существует."
        })
      },
      validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      },
      validateField(field, error, login) {
        if (field === null || this.field === "") {
          if (login) {
            this.loginError = error
          } else {
            this.registerError = error
          }
          return false
        }
        return true
      }
    }
  }
</script>
