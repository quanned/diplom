<template>
  <div class="shutter nav-shutter shutter-js nav-shutter-js menu-container-js">
    <div class="shutter__options">
      <a href="#" class="btn-shutter-close btn-shutter-close-js"><i>&nbsp;</i><span>Закрыть</span></a>
      <div class="menu-toggle menu-switcher-js">
        <a href="#mainNav" class="active"><span>Меню</span></a>
        <a href="#catalogMenu"><span>Каталог</span></a>
      </div>
    </div>
    <div class="shutter__align">
      <div class="shutter__holder">
        <div class="shutter-content active menu-panel-js" id="mainNav">
          <!--navigation-->
          <nav class="nav">
            <!--(1) START nav FIRST level-->
            <ul class="nav-list nav-js">
              <!--nav item start-->
              <li class="current">
                <NuxtLink to="/" title=""><span>Каталог</span></NuxtLink>
              </li>
              <!--nav item end-->
              <!--nav item start-->
              <!--nav item end-->
              <!--nav item start-->
              <li class="has-drop">
                <div class="nav__tab nav__tab-js">
                  <a href="https://svitanak.by/content/about/" title=""><span>О нас</span></a>
                  <span class="nav__angle nav-handler-js"><i>&nbsp;</i></span>
                </div>
                <!--(2) START nav SECOND level-->
                <div class="nav__drop nav-drop-js">
                  <ul class="sub-nav__list">
                    <li><a href="https://svitanak.by/content/about/istoriya/" title=""><span>История</span></a></li>
                    <li class="has-drop">
                      <div class="nav__tab nav__tab-js">
                        <a href="https://svitanak.by/content/about/o-proizvodstve/" title=""><span>О производстве</span></a>
                      </div>
                    </li>
                    <li><a href="https://svitanak.by/content/about/vozmozhnosti/" title=""><span>Возможности</span></a></li>
                    <li><a href="https://svitanak.by/content/about/dostizheniya/" title=""><span>Достижения</span></a></li>
                    <li><a href="https://svitanak.by/content/about/sistemy-menedzhmenta/" title=""><span>Системы менеджмента</span></a></li>
                  </ul>
                </div>
                <!--(2) END nav SECOND level-->
              </li>
              <!--nav item end-->
            </ul>
            <!--(1) END nav FIRST level-->
            <!--(1) START nav FIRST level-->
            <ul class="nav-list nav-js">
              <!--nav item start-->

              <!--nav item end-->
              <!--nav item start-->

              <!--nav item end-->
              <!--nav item start-->
              <li class="">
                <a href="https://svitanak.by/content/promotions/" title=""><span>Акции</span></a>
              </li>
              <!--nav item end-->
              <!--nav item start-->
              <li class="">
                <a href="https://svitanak.by/content/news/" title=""><span>Новости</span></a>
              </li>
              <!--nav item end-->
              <!--nav item start-->
              <li class="has-drop">
                <div class="nav__tab nav__tab-js">
                  <a href="https://svitanak.by/content/for-clients/" title=""><span>Клиентам</span></a>
                  <span class="nav__angle nav-handler-js"><i>&nbsp;</i></span>
                </div>
                <!--(2) START nav SECOND level-->
                <div class="nav__drop nav-drop-js">
                  <ul class="sub-nav__list">
                    <li><a href="https://svitanak.by/content/for-clients/nashi-predlozheniya/" title=""><span>Наши предложения</span></a></li>
                    <li><a href="https://svitanak.by/content/for-clients/kak-zakazat/" title=""><span>Как заказать</span></a></li>
                    <li><a href="https://svitanak.by/content/for-clients/polozhenie-o-poryadke-zakupok-tovarov-rabot-uslug-za-schet-sobstvennykh-sredstv/" title=""><span>Положение о порядке закупок товаров (работ, услуг) за счет собственных средств</span></a></li>
                    <li><a href="https://svitanak.by/content/for-clients/uslugi/" title=""><span>Услуги</span></a></li>
                    <li><a href="https://svitanak.by/content/for-clients/rasprodazha/" title=""><span>Продажа</span></a></li>
                    <li><a href="https://svitanak.by/content/for-clients/zakupki/" title=""><span>Закупки</span></a></li>
                    <li><a href="https://svitanak.by/content/for-clients/informatsiya-dlya-ip/" title=""><span>Информация для ИП</span></a></li>
                  </ul>
                </div>
                <!--(2) END nav SECOND level-->
              </li>
              <li class="has-drop">
                <div class="nav__tab nav__tab-js">
                  <a href="https://svitanak.by/content/pokupatelyam/" title=""><span>Покупателям</span></a>
                  <span class="nav__angle nav-handler-js"><i>&nbsp;</i></span>
                </div>
                <!--(2) START nav SECOND level-->
                <div class="nav__drop nav-drop-js">
                  <ul class="sub-nav__list">
                    <li><a href="https://svitanak.by/content/pokupatelyam/ukhod-za-izdeliyami/" title=""><span>Уход за изделиями</span></a></li>
                    <li><a href="https://svitanak.by/content/pokupatelyam/tablitsa-razmerov-rostov/" title=""><span>Таблица размеров-ростов</span></a></li>
                    <li><a href="https://svitanak.by/content/pokupatelyam/razmery-detskoy-odezhdy/" title=""><span>Размеры детской одежды</span></a></li>
                    <li><a href="https://svitanak.by/content/pokupatelyam/vopros-otvet/" title=""><span>Вопрос-ответ</span></a></li>
                    <li><a href="https://svitanak.by/content/pokupatelyam/polozhenie-o-diskontnoy-programme/" title=""><span>Положение о дисконтной программе</span></a></li>
                    <li><a href="https://svitanak.by/content/gift-certificates/" title=""><span>Подарочные сертификаты</span></a></li>
                  </ul>
                </div>
                <!--(2) END nav SECOND level-->
              </li>
              <!--nav item end-->
              <!--nav item start-->
              <li class="">
                <a href="https://svitanak.by/content/contacts/" title=""><span>Контакты</span></a>
              </li>
              <!--nav item end-->
              <!--nav item start-->
              <li class="">
                <a href="https://svitanak.by/content/franchayzing/" title=""><span>Франчайзинг</span></a>
              </li>
              <!--nav item end-->
              <li class="hide-min-1200">
                <a href="https://svitanak.by/content/gde-kupit/"><span>Где купить</span></a>
              </li>
            </ul>
            <!--(1) END nav FIRST level-->
          </nav>
          <!--navigation end-->
        </div>
        <div class="shutter-aside menu-panel-js" id="catalogMenu">
          <!--departments-->
          <ul class="dep-list">
            <li
              class="dep-item"
              v-for="(item, index) in $store.state.categories"
              :key="index"
            >
              <figure class="dep-img">
                <div><img :src="getImgUrl(item.image)" :alt="item.name"></div>
                <div><img :src="getImgUrl(item.image)" :alt="item.name"></div>
              </figure>
              <ul class="dep-sub-list">
                <li
                  v-for="(subitem, subindex) in item.subcategories"
                  :key="subindex"
                >
                  <NuxtLink :to="{'name': 'index', query: {'category': subitem.id}}" :title="subitem.name"><span>{{ subitem.name }}</span></NuxtLink>
                </li>
              </ul>
            </li>
          </ul>
          <!--departments end-->
          <div class="file-download">
            <a href="https://svitanak.by/upload/iblock/742/742882804ea42ce5e0c2ef30ed012069.pdf"><span>каталог осень-зима 2020-2021</span></a>
          </div>
          <div class="short-contacts-wrap">
            <svg xmlns="http://www.w3.org/2000/svg" style="display:none;">
              <symbol id="ico-phone" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M58 55.2c-3.8-2-5.3-0.6-7.1 1.4 -6.6 7.3-13.6 4.9-18.4 0l-7.1-7.1c-4.9-4.7-7.3-11.8 0-18.4 2-1.8 3.5-3.3 1.4-7.1l-9.2-12c-3.1-3.1-6.1-0.9-8.5 1.4C-5.7 28.3-1.6 40.9 14.8 57.3l9.9 9.9c16.4 16.4 29 20.5 43.8 5.7 2.3-2.4 4.5-5.4 1.4-8.5L58 55.2zM37.9 0c-1.2 0-2.1 1.1-2.1 2.1 0.1 1 1.1 1.9 2.1 1.9 23.2 0 42 18.8 42 42 0 1.1 0.9 2 2 2 1.1 0 2-1 2-2C83.9 20.6 63.3 0 37.9 0zM37.9 12c-1.2 0-2.1 1.1-2.1 2.1 0.1 1 1.1 1.9 2.1 1.9 16.6 0 30 13.4 30 30 0 1.1 0.9 2 2 2 1.1 0 2-1 2-2C71.9 27.2 56.7 12 37.9 12z"></path>
              </symbol>
              <symbol id="ico-fax" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M283 44.2V20c0-10.8-9.2-20-20-20h-97c-11.8 0-21 9.2-21 21v23h-25v141c0 56-89 56-89 0V44h-7c-1.7 0-3.4 0.2-5 0.6C8.3 46.9 0 56.8 0 69v154c0 11.3 8.3 21.1 19 23.4 1.6 0.4 3.3 0.6 5 0.6h261c13 0 24-11 24-24V69C309 51.1 297 45.2 283 44.2zM185 198h-25v-16h25V198zM185 170h-25v-17h25V170zM185 141h-25v-16h25V141zM228 198h-24v-16h24V198zM228 170h-24v-17h24V170zM228 141h-24v-16h24V141zM272 198h-25v-16h25V198zM272 170h-25v-17h25V170zM272 141h-25v-16h25V141zM273 105H155V21c0-6.3 4.7-11 11-11h97c5.2 0 10 4.8 10 10V105zM109 185V44c0-19-15-31-35-31 -17 0-31 14-31 31v141C43 226 109 226 109 185zM257.4 34H171c-2.2 0-4 1.6-4 3.6 0 2 1.8 3.6 4 3.6h86.4c2.2 0 4-1.6 4-3.6C261.4 35.6 259.6 34 257.4 34zM257.4 53H171c-2.2 0-4 1.6-4 3.6 0 2 1.8 3.6 4 3.6h86.4c2.2 0 4-1.6 4-3.6C261.4 54.6 259.6 53 257.4 53zM257.2 72.4h-86.4c-2.2 0-4 1.6-4 3.6 0 2 1.8 3.6 4 3.6h86.4c2.2 0 4-1.6 4-3.6C261.2 74 259.4 72.4 257.2 72.4z"></path>
              </symbol>
              <symbol id="ico-email" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M84.4 3.6C82.1 1.2 78.7 0 74.8 0H13.2C9.3 0 5.9 1.2 3.6 3.6S0 9.4 0 13.3v31.3c0 3.9 1.2 7.4 3.6 9.8S9.3 58 13.2 58h61.6c3.9 0 7.3-1.2 9.6-3.6s3.6-5.8 3.6-9.8V13.3C88 9.4 86.8 6 84.4 3.6zM4 44.6V13.3c0-2.9 0.8-5 2-6.5v0l21.1 22.2L5.6 50.6C4.6 49.1 4 47.2 4 44.6zM74.8 54H13.2c-1.8 0-3.3-0.3-4.5-0.9L29.8 32l8.9 9.4c0.4 0.4 0.9 0.6 1.4 0.6h8c4-1.9 7-6.6 10.1-9.9l21 21C78.1 53.7 76.6 54 74.8 54zM84 44.6c0 2.5-0.6 4.5-1.6 5.9L61.1 29.2 82 6.9c1.2 1.5 2 3.6 2 6.5V44.6z"></path>
              </symbol>
            </svg>
            <ul class="short-contacts">
              <li>
                <svg class="ico-search" viewBox="0 0 83.9 82" width="16" height="16">
                  <use xlink:href="#ico-phone"></use>
                </svg>
                <a href="tel:+375 (17) 753-36-20">
                  <span>+375 (17) 753-36-20</span>
                </a>
              </li>
              <li>
                <svg class="ico-search" viewBox="0 0 309 247" width="16" height="16">
                  <use xlink:href="#ico-fax"></use>
                </svg>
                <div>
                  <span>+375 (17) 757-03-73</span>
                </div>
              </li>
              <li>
                <svg class="ico-search" viewBox="0 0 88 58" width="16" height="16">
                  <use xlink:href="#ico-email"></use>
                </svg>
                <a href="mailto:office@svitanak.by">
                  <span>office@svitanak.by</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="shutter__panel">
      <!--user options-->
      <!--copy element for small devices-->
      <ul class="user-options">
        <li class="user-options__item user-options--message ">
          <!--<a href="#" title="Сообщения">-->
          <a href="#msg-popup" class="btn-popup-js" title="У вас есть новые сообщения: 1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 88 62" width="24" height="24">
              <path
                d="M77.3 0H10.7C4.8 0 0 4.7 0 10.4v41.3C0 57.3 4.8 62 10.7 62h66.6C83.2 62 88 57.3 88 51.6V10.4C88 4.7 83.2 0 77.3 0zM74.9 6.9L44 31.1 13.1 6.9H74.9zM80.9 51.6c0 2-1.5 3.5-3.6 3.5H10.7c-2 0-3.6-1.5-3.6-3.5V11.1l34.6 27.1c1.3 1 3.2 1 4.5 0l34.6-27.2V51.6z"></path>
            </svg>
            <span class="hide-text">Сообщения</span>
            <div class="user-options-counter">1</div>
          </a>
        </li>
        <li class="user-options__item user-options--login ">
          <a href="#log-popup" class="btn-popup-js" title="Вход">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58.7 64" width="24" height="24">
              <path
                d="M29.3 32.2c8.9 0 16.1-7.2 16.1-16.1S38.2 0 29.3 0s-16.1 7.2-16.1 16.1C13.2 25 20.4 32.2 29.3 32.2zM29.3 6.7V6.7c5.2 0 9.4 4.2 9.4 9.4s-4.2 9.4-9.4 9.4 -9.4-4.2-9.4-9.4C19.9 10.9 24.1 6.7 29.3 6.7zM29.3 34.7c-7.8 0-15.2 3.1-20.7 8.6C3.1 48.7 0 56.2 0 64h6.7c0-12.5 10.2-22.6 22.6-22.6 12.5 0 22.6 10.2 22.6 22.6h6.7C58.7 47.8 45.5 34.7 29.3 34.7z"></path>
            </svg>
            <span class="hide-text">Вход</span>
          </a>
        </li>
        <li class="user-options__item user-options--search hide--always">
          <a href="#" title="Поиск" class="btn-search-open-js">
            <svg class="for-close" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                 viewBox="0 0 57.2 57.2">
              <path
                d="M34.3 28.6L56 6.9c1.6-1.6 1.6-4.1 0-5.7 -1.6-1.6-4.1-1.6-5.7 0L28.6 22.9 6.9 1.3c-1.6-1.6-4.1-1.6-5.7 0 -1.6 1.6-1.6 4.1 0 5.7l21.7 21.6L1.3 50.3c-1.6 1.5-1.6 4.1 0 5.6 0.8 0.8 1.8 1.2 2.8 1.2s2-0.4 2.8-1.2l21.7-21.6L50.3 56c0.8 0.8 1.8 1.2 2.8 1.2s2-0.4 2.8-1.2c1.6-1.6 1.6-4.1 0-5.7L34.3 28.6z"></path>
            </svg>
            <svg class="for-open" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 89.8 89.8" width="24"
                 height="24">
              <path
                d="M68.1 61c11.4-14.9 10.3-36.3-3.3-49.9C57.6 3.9 48.1 0 37.9 0c-10.1 0-19.7 3.9-26.8 11.1C3.9 18.3 0 27.8 0 37.9c0 10.1 3.9 19.7 11.1 26.8 7.2 7.2 16.7 11.1 26.8 11.1 8.4 0 16.5-2.8 23.1-7.8l21.8 21.7 7.1-7.1L68.1 61zM57.7 57.7c-5.3 5.3-12.3 8.2-19.8 8.2 -7.5 0-14.5-2.9-19.8-8.2C12.9 52.4 10 45.4 10 37.9c0-7.5 2.9-14.5 8.2-19.8C23.5 12.9 30.5 10 37.9 10c7.5 0 14.5 2.9 19.8 8.2C68.6 29.1 68.6 46.8 57.7 57.7z"></path>
            </svg>
            <span class="hide-text">Поиск</span>
          </a>
        </li>
        <li class="user-options__item user-options--basket hide--always">
          <!--<a href="#" title="Корзина">-->
          <a href="#" title="В корзине товаров: 22" class="btn-bag-open-js">
            <svg class="for-close" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                 viewBox="0 0 57.2 57.2">
              <path
                d="M34.3 28.6L56 6.9c1.6-1.6 1.6-4.1 0-5.7 -1.6-1.6-4.1-1.6-5.7 0L28.6 22.9 6.9 1.3c-1.6-1.6-4.1-1.6-5.7 0 -1.6 1.6-1.6 4.1 0 5.7l21.7 21.6L1.3 50.3c-1.6 1.5-1.6 4.1 0 5.6 0.8 0.8 1.8 1.2 2.8 1.2s2-0.4 2.8-1.2l21.7-21.6L50.3 56c0.8 0.8 1.8 1.2 2.8 1.2s2-0.4 2.8-1.2c1.6-1.6 1.6-4.1 0-5.7L34.3 28.6z"></path>
            </svg>
            <svg class="for-open" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 29.3" width="24" height="24">
              <path
                d="M24 27.8c-0.9-7-1.7-13.2-1.2-19.7 0-0.4-0.1-0.7-0.4-1 -0.3-0.3-0.6-0.4-1-0.4h-4.2V5.8c0-3.2-2.4-5.8-5.3-5.8 -2.9 0-5.3 2.6-5.3 5.8v0.9H2.5C1.8 6.7 1.2 7.3 1.2 8l0 2.2c0 5.8 0 11.8-1.2 17.5 -0.1 0.4 0 0.8 0.3 1.1 0.3 0.3 0.6 0.5 1 0.5h21.4c0.4 0 0.8-0.2 1-0.5C24 28.6 24.1 28.2 24 27.8zM9.3 5.8c0-1.7 1.2-3.2 2.7-3.2 1.5 0 2.7 1.4 2.7 3.2v0.9L9.3 6.6V5.8zM2.9 26.7c1-5.5 0.9-11 0.9-16.4L3.8 9.3h16.2c-0.3 5.8 0.3 11.3 1.1 17.3H2.9z"></path>
            </svg>
            <span class="hide-text">Корзина</span>
            <div class="user-options-counter">22</div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    methods: {
      getImgUrl: function (path) {
        return process.env.PATH_MEDIA + path
      },
    }
  }
</script>
