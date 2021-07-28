<template>
<div class="wrapper">
  <div class="search">
    <div
      class="search__backarrow"
      @click="handleGoBack()"
    ><b></b><i></i></div>
    <div class="search__content">
      <span class="iconfont">&#xe644;</span>
      <span class="search__content__input">
        <input type="text" name="search" value="请输入商品名称">
      </span>
    </div>
  </div>
  <ShopInfo :item='item' :haveBorder='false' v-if="item.imgUrl"/>
  <Content />
  <Cart />
</div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { get } from '../../utils/request'
import ShopInfo from '../../components/ShopInfo'
import Content from './Content'
import Cart from './Cart'

// 获取商铺信息
const useShopInfo = () => {
  const data = reactive({ item: {} })
  const route = useRoute()
  const getItemData = async () => {
    const result = await get(`/api/shop/${route.params.id}`)
    if (result?.errno === 0 && result?.data) {
      data.item = result.data
    }
  }
  const { item } = toRefs(data)
  return { getItemData, item }
}

export default {
  name: 'Shop',
  components: {
    ShopInfo,
    Content,
    Cart
  },
  setup () {
    const router = useRouter()
    const { item, getItemData } = useShopInfo()
    const handleGoBack = () => {
      router.back()
    }
    getItemData()
    return { item, handleGoBack }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 0 .18rem;
  .search {
    margin: .16rem 0 .04rem .29rem;
    line-height: .32rem;
    background-color: #f5f5f5;
    color: #b7b7b7;
    border-radius: .16rem;
    font-size: .14rem;
    &__backarrow {
      position: absolute;
      width: .30rem;
      height: .32rem;
      left: 18px;
      b {
        position: absolute;
        left: .03rem;
        top: .09rem;
        width: .15rem;
        height: .15rem;
        background-color: #b6b6b6;
        transform: rotate(45deg);
      }
      i {
        position: absolute;
        left: .05rem;
        top: .09rem;
        width: .15rem;
        height: .15rem;
        background-color: white;
        transform: rotate(45deg);
      }
    }
    &__content {
      &__input {
        margin: 0 .44rem 0 .9rem;
        height: .32rem;
        position: absolute;
        left: 0;
        right: 0;
        top: .17rem;
      }
      input {
        color: #333333;
        box-sizing: border-box;
        background-color: #f5f5f5;
        height: .32rem;
        border: solid 0px;
        width: 100%;
        font-size: .14rem;
        line-height: .16rem;
      }
      input:focus-visible {
        outline: 0;
      }
      .iconfont {
        position: relative;
        top: .01rem;
        font-size: .2rem;
        display: inline-block;
        padding: 0 .08rem 0 .16rem ;
      }
    }
  }
}
</style>
