<template>
  <div class="pseudotabs-panel history-orders">
    <div class="c-table" v-if="orders.data.length > 0">
      <div class="c-thead">
        <div class="c-tr">
          <div class="c-th">№&nbsp;заказа</div>
          <div class="c-th">Дата</div>
          <div class="c-th">статус</div>
          <div class="c-th">Сумма заказа</div>
        </div>
      </div>
      <div class="c-tbody">
        <a class="c-tr" v-for="order in orders.data">
          <div class="c-td" data-label="№&nbsp;заказа">
            <div class="c-td__val">
              {{ order.id }}
            </div>
          </div>
          <div class="c-td" data-label="Дата">
            <div class="c-td__val">
             {{ order.date }}
            </div>
          </div>
          <div class="c-td" data-label="Статус">
            <div class="c-td__val">
              {{ order.status }}
            </div>
          </div>
          <div class="c-td" data-label="Остаток">
            <div class="c-td__val">
              {{ order.amount }} BYN
            </div>
          </div>
        </a>
      </div>
    </div>
    <div class="c-table" v-else>
        У вас нет заказов.
    </div>
    <div v-if="orders.data.length > 0" class="c-table-result">
      <div class="c-table-result__total">
        <div class="c-table-result__label">Итого:</div>
        <span class="c-table-result__count">{{ orders.count }}</span> позиций на <span
        class="c-table-result__price">{{ orders.amount }}</span> BYN
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    props: ['orders']
  }
</script>
