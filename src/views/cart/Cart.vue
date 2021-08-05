<template>
  <van-nav-bar
    title="购物车"
  />
  <div class="cart-body">
    <van-checkbox-group @change="groupChange" v-model="result" ref="checkboxGroup">
      <van-swipe-cell :right-width="50" v-for="(item, index) in list" :key="index">
        <div class="good-item">
          <van-checkbox :name="item.cartItemId" />
          <div class="good-img"><img :src="$filters.prefix(item.goodsCoverImg)" alt=""></div>
          <div class="good-desc">
            <div class="good-title">
              <span>{{ item.goodsName }}</span>
              <span>x{{ item.goodsCount }}</span>
            </div>
            <div class="good-btn">
              <div class="price">¥{{ item.sellingPrice }}</div>
              <van-stepper
                integer
                :min="1"
                :max="5"
                :model-value="item.goodsCount"
                :name="item.cartItemId"
                async-change
                @change="onChange"
              />
            </div>
          </div>
        </div>
        <template #right>
          <van-button
            square
            icon="delete"
            type="danger"
            class="delete-button"
            @click="deleteGood(item.cartItemId)"
          />
        </template>
      </van-swipe-cell>
    </van-checkbox-group>
  </div>
  <div class="empty" v-if="!list.length">
    <img class="empty-cart" src="https://s.yezgea02.com/1604028375097/empty-car.png" alt="空购物车">
    <div class="title">购物车空空如也</div>
    <van-button round color="linear-gradient(to left, #39bdce, #0099ff)" type="primary" @click="goTo" block>前往选购</van-button>
  </div>
  <div class="cart">
    <div class="check">
      <div class="check__icon">
        <img
          src="http://www.dell-lee.com/imgs/vue3/basket.png"
          class="check__icon__img"
        >
        <div class="check__icon__tag">{{total}}</div>
      </div>
      <div class="check__info">
        <span class="check__info__title">总计：</span>
        <span class="check__info__price">&yen; {{price}}</span>
      </div>
      <div class="check__button">去结算</div>
    </div>
  </div>
  <Docker />
</template>

<script>
import { computed, toRefs, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

import Docker from '../../components/Docker'

const useCart = () => {
  const store = useStore()
  const route = useRoute()
  const shopId = route.params.id
  const cartList = store.state.cartList
  const total = computed(() => {
    const productList = cartList[shopId]
    let count = 0
    if (productList) {
      for (const i in productList) {
        const product = productList[i]
        count += product.count
      }
    }
    return count
  })
  const price = computed(() => {
    const productList = cartList[shopId]
    let count = 0
    if (productList) {
      for (const i in productList) {
        const product = productList[i]
        count += (product.count * product.price)
      }
    }
    return count.toFixed(2)
  })
  return { total, price }
}

export default {
  name: 'Cart',
  components: {
    Docker
  },
  setup () {
    const { total, price } = useCart()
    const state = reactive({
      checked: false,
      list: [],
      all: false,
      result: [],
      checkAll: true
    })
    const groupChange = (result) => {
      console.log(1)
      if (result.length === state.list.length) {
        console.log(2)
        state.checkAll = true
      } else {
        console.log(3)
        state.checkAll = false
      }
      state.result = result
    }
    return { ...toRefs(state), total, price, groupChange }
  }
}
</script>

<style lang="scss" scpoed>
.cart__body {
  margin: 16px 0 100px 0;
  padding-left: 10px;
  .good-item {
    display: flex;
    .good-img {
      img {
        width: 1rem;
        height: 1rem;
      }
    }
    .good-desc {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
      padding: 20px;
      .good-title {
        display: flex;
        justify-content: space-between;
      }
      .good-btn {
        display: flex;
        justify-content: space-between;
        .price {
          font-size: 16px;
          color: red;
          line-height: 28px;
        }
        .van-icon-delete {
          font-size: 20px;
          margin-top: 4px;
        }
      }
    }
  }
  .delete-button {
    width: 50px;
    height: 100%;
  }
}
.empty {
  width: 50%;
  margin: 0 auto;
  text-align: center;
  margin-top: 200px;
  .empty-cart {
    width: 150px;
    margin-bottom: 20px;
  }
  .van-icon-smile-o {
    font-size: 50px;
  }
  .title {
    font-size: 16px;
    margin-bottom: 20px;
  }
}
.cart {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0.51rem;
  border-bottom: 1px solid #f1f1f1;
}
.check {
  display: flex;
  height: .5rem;
  border-top: solid .01rem #f1f1f1;
  line-height: .5rem;
  &__icon {
    width: .84rem;
    position: relative;
    &__img {
      height: .26rem;
      width: .28rem;
      display: block;
      margin: .12rem auto;
    }
    &__tag {
      width: auto;
      min-width: .2rem;
      height: 0.2rem;
      text-align: center;
      line-height: 0.2rem;
      position: absolute;
      top: 0.02rem;
      left: 0.48rem;
      font-size: 0.16rem;
      color: white;
      border-radius: .1rem;
      background-color: #E93B3B;
      transform: scale(.5);
      transform-origin: left center;
    }
  }
  &__info {
    flex: 1;
    &__title {
      font-size: .12rem;
      color: #333;
      text-align: center;
    }
    &__price {
      font-size: .18rem;
      color: #E93B3B;
      text-align: center;
    }
  }
  &__button {
    width: .98rem;
    color: white;
    font-size: .14rem;
    text-align: center;
    background: linear-gradient(to right, #47b1ee, #3883e4);
  }
}
</style>
