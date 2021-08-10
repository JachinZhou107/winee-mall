<!--
 * @Author: your name
 * @Date: 2021-07-28 18:38:19
 * @LastEditTime: 2021-08-10 20:53:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-mall\src\views\productList\ProductList.vue
-->
<template>
  <div class="header">
    <div class="search">
      <div
        class="search__backarrow"
        @click="handleGoBack"
      ><b></b><i></i></div>
      <div class="search__content">
        <span class="iconfont">&#xe644;</span>
        <span class="search__content__input" >
          <input
            type="text"
            name="search"
            placeholder="请输入关键词"
            v-model="keywords"
          >
        </span>
      </div>
      <button class="search__submit" @click="getSearch">搜索</button>
    </div>
    <van-dropdown-menu active-color="#1fa4fc" >
      <van-dropdown-item v-model="select" :options="option1" />
      <van-dropdown-item v-model="sort" :options="option2" @change="onRefresh" />
    </van-dropdown-menu>
  </div>
  <div class="wrapper">
    <div class="content">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh" >
        <van-list
          v-model:loading="loading"
          :finished="finished"
          :finished-text="productList.length ? '到底了哦~' : '想要什么搜搜看吧~'"
          @load="onLoad"
        >
          <template v-if="productList.length">
            <div class="product__item" v-for="(item, index) in productList" :key="index" @click="productDetail(item)">
              <img :src="item.mainImage" />
              <div class="product__item__info">
                <p class="product__item__name">{{item.name}}</p>
                <p class="product__item__subtitle">{{item.subtitle}}</p>
                <span class="product__item__price">￥ {{item.price}}</span>
              </div>
            </div>
          </template>
          <img class="content__empty" v-else src="https://s.yezgea02.com/1604041313083/kesrtd.png" alt="搜索">
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { get } from '../../utils/request'

export default {
  name: 'ProductList',
  setup () {
    const route = useRoute()
    const router = useRouter()
    const state = reactive({
      keywords: route.query.keywords || '',
      searchBtn: false,
      seclectActive: false,
      refreshing: false,
      select: '',
      list: [],
      loading: false,
      finished: false,
      productList: [],
      totalPage: 0,
      page: 1,
      sort: ''
    })
    const option1 = [
      { text: '全部商品', value: '' }
    ]
    const option2 = [
      { text: '默认排序', value: '' },
      { text: '好评升序', value: 'rating&asc' },
      { text: '好评降序', value: 'rating&desc' },
      { text: '价格升序', value: 'price&asc' },
      { text: '价格降序', value: 'price&desc' }
    ]
    // onMounted(() => {
    //   init()
    // })

    const init = async () => {
      const { categoryId } = route.query
      if (!categoryId && !state.keywords) {
        // Toast.fail('请输入关键词')
        state.finished = true
        state.refreshing = false
        state.loading = false
        return
      }
      const { data, data: { list } } = await get('/product/list',
        {
          pageNumber: state.page,
          pageSize: 20,
          categoryId: categoryId,
          keyword: state.keywords,
          sortBy: state.sort.split('&')[0],
          sortOrder: state.sort.split('&')[1]
        })
      state.productList = state.productList.concat(list)
      state.totalPage = data.pages
      state.refreshing = false
      state.loading = false
      if (state.page >= data.pages) state.finished = true
    }

    const handleGoBack = () => {
      router.push({ name: route.query.from || 'Category' })
    }

    const productDetail = (item) => {
      router.push({ path: `/product-detail/${item.id}` })
    }

    const onLoad = () => {
      if (!state.refreshing && state.page < state.totalPage) {
        state.page = state.page + 1
      }
      if (state.refreshing) {
        state.productList = []
      }
      init()
    }

    const onRefresh = () => {
      console.log('refresh')
      state.refreshing = true
      state.finished = false
      state.loading = true
      state.page = 1
      onLoad()
    }

    const getSearch = () => {
      onRefresh()
    }

    const changeTab = (name) => {
      console.log('name', name)
      state.sortBy = name
      onRefresh()
    }

    return {
      option1,
      option2,
      ...toRefs(state),
      handleGoBack,
      productDetail,
      getSearch,
      onRefresh,
      onLoad,
      changeTab
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';

.header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  width: 100%;
  background-color: #fff;
  .search {
    margin: .16rem .64rem 0 .42rem;
    line-height: .31rem;
    background-color: #f5f5f5;
    color: #b7b7b7;
    border-radius: .16rem 0 0 .16rem;
    font-size: .14rem;
    &__backarrow {
      position: absolute;
      width: .30rem;
      height: .32rem;
      left: .18rem;
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
        margin: 0 .64rem 0 .8rem;
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
        padding: 0 .08rem 0 .12rem ;
      }
    }
    &__submit {
      position: absolute;
      top: .16rem;
      right: .16rem;
      height: .33rem;
      width: .46rem;
      border: none;
      border-radius: 0 .16rem .16rem 0;
      background-color: $primary-color;
      color: #f5f5f5;
    }
  }
}
.wrapper {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: auto;
  .van-tabs {
    margin: -0.14rem 0 .1rem 0;
  }
  .content {
    position: absolute;
    left: 0;
    top: 1rem;
    bottom: 0;
    right: 0;
    .product__item {
      width: 100%;
      height: 1.44rem;
      display: flex;
      justify-content: space-between;
      padding: .12rem;
      box-sizing: border-box;
      border-bottom: solid 1PX #f1f1f1;
      img {
        width: 1.2rem;
        height: 1.2rem;
        margin-right: .2rem;
      }
      &__info {
        width: 60%;
        text-align: left;
      }
      &__name {
        width: 100%;
        font-size: .18rem;
        margin: 0 0 .2rem 0;
        @include ellipsis;
      }
      &__subtitle {
        color: #b1b1b1;
        font-size: .14rem;
        @include ellipsis;
      }
      &__price {
        display: block;
        color: red;
        font-size: .18rem;
        margin-top: .3rem;
      }
    }
    &__empty {
      display: block;
      width: 1.5rem;
      margin: 0 auto;
    }
  }
}
</style>
