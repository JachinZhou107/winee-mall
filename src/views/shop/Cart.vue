<template>
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
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

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
  setup () {
    const { total, price } = useCart()
    return { total, price }
  }
}
</script>

<style lang="scss" scpoed>
.cart {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
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
    background-color: #4fb0f9;
  }
}
</style>
