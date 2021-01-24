<template>
  <div class="pseudotabs-panel">
    <div class="user-form layout-flood">
      <div class="layout-text">
        <form action="#" method="post">
          <div class="form-caption">
            <div class="form-subtitle">Авторизация на сайте</div>
          </div>
          <div class="input-wrap">
            <div class="label-holder">
              <label for="cf__login-field">Ваш email <span class="form-mark">*</span></label>
            </div>
            <div class="input-holder">
              <input readonly type="text" :value="$auth.user" id="cf__login-field">
            </div>
          </div>
          <!--***-->
          <div class="form-caption">
            <div class="form-subtitle">Контактные данные</div>
          </div>
          <div v-if="info != null" class="input-wrap">
            <div>
              <div class="dl-list__di">
                <div class="dl-list__dt">Адрес:</div>
                <div class="dl-list__dd">
                  {{ info.address }}
                </div>
              </div>
              <div class="dl-list__di">
                <div class="dl-list__dt">Контактный телефон:</div>
                <div class="dl-list__dd">
                  {{ info.phone }}
                </div>
              </div>
            </div>
            <div class="dl-list__di">
                <div class="dl-list__dt">Ваши инициалы:</div>
                <div class="dl-list__dd">
                  {{ info.initials }}
                </div>
              </div>
          </div>
          <div v-else>
            Вы еще не совершали заказ
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['info']
  }
</script>
