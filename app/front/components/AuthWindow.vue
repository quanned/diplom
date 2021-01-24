<template>
  <div id="reg-popup" class="default-popup mfp-with-anim mfp-hide">
    <div class="default-popup__content">
      <div class="pseudotabs-nav">
        <div class="pseudotabs-tab">
          <a href="#log-popup" class="btn-popup-js"><span>Вход</span></a>
        </div>
        <div class="pseudotabs-tab">
          <a href="javascript:void(0)" class="active-tab"><span>Регистрация</span></a>
        </div>
      </div>
      <div class="msg-form">
        <!--<label for="">E-mail:</label>-->
        <input type="email" placeholder="E-mail">
        <div class="error-note">Поле обязательное для заполнения</div>
        <div class="success-note">Подтверждено</div>
        <!--<label for="">Пароль:</label>-->
        <input type="password" placeholder="Пароль">
        <div class="error-note">Поле обязательное для заполнения</div>
        <div class="success-note">Подтверждено</div>
        <!--<label for="">Повторите пароль:</label>-->
        <input type="password" placeholder="Повторите пароль">
        <div class="error-note">Пароли не совпадают</div>
        <div class="success-note">Подтверждено</div>
        <div class="form-buttons">
          <button class="btn-default btn-submit">Зарегистрироваться</button>
        </div>
      </div>
    </div>
  </div>
</template>
