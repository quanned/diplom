<template>
  <header class="header">
    <div class="max-wrap layout">
      <a href="#" class="btn-menu btn-nav-js" title="Главное меню">
        <span>Меню</span>
        <i>&nbsp;</i>
      </a>
      <!--logo-->
      <strong class="logo">
        <NuxtLink to="/">
          <em>Свитанак. Белорусский трикотаж из Жодино</em>
        </NuxtLink>
        <img style="display: none;" class="logo-print" src="img/logo-print.png"
             alt="Свитанак. Белорусский трикотаж из Жодино">
      </strong>
      <!--logo end-->
      <div class="header__holder">
        <div class="header__col header__col--slogan">
          <div class="header__cell">
            <span class="slogan">Трикотаж для всей семьи <br>от ведущего производителя из Беларуси</span>
          </div>
        </div>
        <div class="header__col header__col--menu">
          <div class="header__cell">
            <ul class="menu-list">
              <li class="current"><NuxtLink to="/"><span>Каталог</span></NuxtLink></li>
              <li><a href="https://svitanak.by/content/for-clients/nashi-predlozheniya/"><span>Клиентам</span></a></li>
              <li><a href="https://svitanak.by/content/contacts/"><span>Контакты</span></a></li>
              <li><a href="https://svitanak.by/content/franchayzing/"><span>Франчайзинг</span></a></li>
              <li><a href="https://svitanak.by/content/gde-kupit/"><span>Где купить</span></a></li>
            </ul>
          </div>
        </div>
        <HeaderRight />
      </div>
    </div>
  </header>
</template>
