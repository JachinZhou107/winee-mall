<!--
 * @Author: your name
 * @Date: 2021-07-28 13:53:07
 * @LastEditTime: 2021-08-06 11:04:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-mall\src\components\ProductInfo.vue
-->
<template>
  <div class="shop">
    <img :src="item.mainImage"
      class="shop__img">
    <div :class="{'shop__content':true}"
    >
      <div class="shop__content__title van-multi-ellipsis--l2">{{item.name}}</div>
      <div class="shop__content__tags">
        <span class="shop__content__price">¥{{item.price}}</span>
        <span class="shop__content__tag">月售{{item.sales||99}}+</span>
      </div>
      <p class="shop__content__highlight"><em>{{item.subtitle}}</em></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductInfo',
  props: ['item']
}
</script>

<style lang="scss" scoped>
@import '../style/viriables.scss';
.shop {
  display: flex;
  flex-direction: column;
  padding: .12rem 0 0 0;
  &__img {
    margin: auto;
    width: 1.26rem;
    height: 1.26rem;
  }
  &__content {
    flex: 1;
    padding: .06rem;
    &__title {
      line-height: .22rem;
      font-size: .16rem;
    }
    &__tags {
      display: flex;
      justify-content: space-between;
      margin-top: .08rem;
      line-height: .18rem;
      font-size: .13rem;
      color: $content-fontcolor;
    }
    &__tag{
      margin-right: .16rem;
    }
    &__price {
      color: #E93B3B;
      font-size: .2rem;
    }
    &__highlight {
      color: #E93B3B;
      margin: .08rem 0 .12rem 0;
      line-height: .18rem;
      font-size: .13rem;
    }
  }
}
</style>
