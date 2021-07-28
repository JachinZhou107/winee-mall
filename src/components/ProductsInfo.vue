<template>
  <div class="product__item">
    <img class="product__item__img" :src="item.imgUrl" >
        <div class="product__item__detail">
          <h4 class="product__item__title">{{item.name}}</h4>
          <p class="product__item__sales">月售{{item.sales}}件</p>
          <p class="product__item__price">
            <span class="icon-yen">¥</span>
            <span class="price">{{item.price}}</span>
            <span class="origin-price">¥{{item.oldPrice}}</span>
          </p>
        </div>
        <div class="product__number">
          <span
            class="product__number__minus"
            @click="()=>{changeItemInCart(shopId,item,-1)}"
          >-</span>
          <span class="product__number__total">
            {{cartList?.[shopId]?.[item._id]?.count || 0}}
          </span>
          <span
            class="product__number__plus"
            @click="()=>{changeItemInCart(shopId,item,1)}"
          >+</span>
        </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { toRefs } from 'vue'

const useCart = () => {
  const store = useStore()
  const { cartList } = toRefs(store.state)
  const changeItemInCart = (shopId, productInfo, num) => {
    // console.log(shopId, productInfo._id)
    store.commit('changeItemInCart', { shopId, productInfo, num })
  }
  return { cartList, changeItemInCart }
}
export default {
  name: 'ProductsInfo',
  props: ['item', 'shopId'],
  setup () {
    const { cartList, changeItemInCart } = useCart()
    return { cartList, changeItemInCart }
  }
}
</script>

<style lang="scss" scoped>
@import '../style/mixins.scss';
.product {
  &__item {
    display: flex;
    position: relative;
    padding: .12rem 0;
    margin: 0 .16rem;
    border-bottom: solid .01rem #f1f1f1;
    &__img {
      width: .68rem;
      height: .68rem;
      margin-right: .16rem;
    }
    &__title {
      margin: 0;
      line-height: .2rem;
      font-size: .14rem;
      color: #333;
      @include ellipsis;
    }
    &__detail {
      overflow: hidden;
    }
    &__sales {
      margin: .06rem 0;
      color: #333;
      line-height: .16rem;
      font-size: .12rem;
    }
    &__price {
      color: #E93B3B;
      margin: 0;
      .price {
        line-height: .2rem;
        font-size: .14rem;
      }
      .icon-yen {
        font-size: .12rem;
      }
      .origin-price {
        margin-left: .06rem;
        line-height: .2rem;
        font-size: .12rem;
        color: #999;
        text-decoration: line-through;
      }
    }
    .product__number {
      position: absolute;
      right: 0;
      bottom: 0.12rem;
      &__total {
        font-size: .14rem;
        line-height: .2rem;
        color: #333;
      }
      &__minus {
        width: .19rem;
        height: .19rem;
        display: inline-block;
        text-align: center;
        line-height: .18rem;
        border: solid .01rem #666;
        border-radius: 50%;
        font-size: .2rem;
        color: #666;
        margin: 0 .1rem;
      }
      &__plus {
        background-color: #0091ff;
        border: none;
        color: white;
        width: .20rem;
        height: .20rem;
        display: inline-block;
        text-align: center;
        line-height: .18rem;
        border-radius: 50%;
        font-size: .2rem;
        margin: 0 .1rem;
      }
    }
  }
}
</style>
