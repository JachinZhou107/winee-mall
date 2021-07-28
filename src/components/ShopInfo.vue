<template>
  <div class="shop">
    <img :src="item.imgUrl"
      class="shop__img">
    <div :class="{'shop__content':true,
      'shop__content--haveBorder': haveBorder}"
    >
      <div class="shop__content__title">{{item.name}}</div>
      <div class="shop__content__tags">
        <span class="shop__content__tag">月售{{item.sales}}+</span>
        <span class="shop__content__tag">起送¥{{item.expressLimit}}</span>
        <span class="shop__content__tag">基础运费¥{{item.expressPrice}}</span>
      </div>
      <p class="shop__content__highlight"><em>{{item.slogan}}</em></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShopInfo',
  props: ['item', 'haveBorder']
}
</script>

<style lang="scss" scoped>
@import '../style/viriables.scss';
.shop {
  display: flex;
  padding: .12rem 0 0 0;
  &__img {
    margin-right: .16rem;
    width: .56rem;
    height: .56rem;
  }
  &__content {
    flex: 1;
    &--haveBorder {
      border-bottom: 1px solid #f1f1f1;
    }
    &__title {
      line-height: .22rem;
      font-size: .16rem;
    }
    &__tags {
      margin-top: .08rem;
      line-height: .18rem;
      font-size: .13rem;
      color: $content-fontcolor;
    }
    &__tag{
      margin-right: .16rem;
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
