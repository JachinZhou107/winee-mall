<!--
 * 严肃声明：
 * 开源版本请务必保留此注释头信息，若删除我方将保留所有法律责任追究！
 * 本系统已申请软件著作权，受国家版权局知识产权以及国家计算机软件著作权保护！
 * 可正常分享和学习源码，不得用于违法犯罪活动，违者必究！
 * Copyright (c) 2020 陈尼克 all rights reserved.
 * 版权所有，侵权必究！
 *
-->

<template>
  <div class="product-detail">
    <a-header :title="'我的'"></a-header>
    <div class="detail-content">
      <div class="detail-swipe-wrap">
        <van-swipe class="my-swipe" indicator-color="#1baeae">
          <van-swipe-item v-for="(item, index) in detail.goodsCarouselList" :key="index">
            <img :src="item" alt="">
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="product-info">
        <div class="product-title">
          {{ detail.name || '' }}
        </div>
        <div class="product-desc">{{ detail.subtitle || '' }}</div>
        <div class="product-price">
          <span>¥{{ detail.price || '' }}</span>
          <span>库存{{ detail.stock}}</span>
        </div>
      </div>
      <van-tabs v-model:active="show">
        <van-tab title="商品信息" />
        <van-tab title="商品评价" />
      </van-tabs>
      <div class="product-intro" v-if="!show">
        <ul>
          <li>概述</li>
          <li>参数</li>
          <li>安装服务</li>
          <li>常见问题</li>
        </ul>
        <div class="product-content" v-html="detail.detail || ''"></div>
      </div>
    </div>
    <van-action-bar>
      <van-action-bar-icon icon="chat-o" text="客服" />
      <van-action-bar-icon icon="cart-o" :badge="!count ? '' : count" @click="goTo()" text="购物车" />
      <van-action-bar-button type="warning" @click="handleAddCart" text="加入购物车" />
      <van-action-bar-button type="danger" @click="goToCart" text="立即购买" />
    </van-action-bar>
  </div>
</template>

<script>
import { reactive, onMounted, computed, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { Toast } from 'vant'

import aHeader from '../../components/aHeader.vue'
import { get, post } from '../../utils/request'

export default {
  name: 'ProductDetail',
  components: {
    aHeader
  },
  setup () {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    const state = reactive({
      detail: {
        goodsCarouselList: []
      },
      show: 0
    })
    onMounted(async () => {
      Toast.loading({
        message: '加载中',
        forbidClick: true
      })
      const { id } = route.params
      // console.log(id)
      const { data } = await get('product/detail', { productId: id })
      // console.log(data)
      state.detail = data
      store.dispatch('updateCart')
      Toast.clear()
    })

    // nextTick(() => {
    //   // 一些和DOM有关的东西
    //   const content = document.querySelector('.detail-content')
    //   content.scrollTop = 0
    // })

    const goTo = () => {
      router.push({ path: '/cart' })
    }

    const addCart = async () => {
      return { resultCode: 200 }
    }
    const handleAddCart = async () => {
      const { id } = route.params
      const { resultCode } = await post('/cart/add', {}, {
        params: {
          count: 1,
          productId: id
        }
      })
      if (resultCode === 200) Toast.success('添加成功')
      store.dispatch('updateCart')
    }

    const goToCart = async () => {
      await addCart({ goodsCount: 1, goodsId: state.detail.goodsId })
      store.dispatch('updateCart')
      router.push({ path: '/cart' })
    }

    const count = computed(() => {
      console.log(111, store.state.cartCount)
      return store.state.cartCount
    })

    return {
      ...toRefs(state),
      goTo,
      handleAddCart,
      goToCart,
      count
    }
  }
}
</script>

<style lang="scss" >
.product-detail {
  .detail-content {
    .product-intro {
      .product-content {
        img {
          width: 100%;
        }
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.product-detail {
  .detail-content {
    height: calc(100vh - 50px);
    overflow: hidden;
    overflow-y: auto;
    .detail-swipe-wrap {
      .my-swipe .van-swipe-item {
        img {
          width: 100%;
          // height: 300px;
        }
      }
    }
    .product-info {
      padding: 0 10px;
      .product-title {
        font-size: 18px;
        text-align: left;
        color: #333;
      }
      .product-desc {
        font-size: 14px;
        text-align: left;
        color: #999;
        padding: 5px 0;
      }
      .product-price {
        span:nth-child(1) {
          color: #F63515;
          font-size: 22px;
        }
        span:nth-child(2) {
          color: #999;
          font-size: 16px;
        }
      }
    }
    .product-intro {
      width: 100%;
      padding-bottom: 50px;
      ul {
        width: 100%;
        margin: 10px 0;
        display: flex;
        li {
          flex: 1;
          padding: 5px 0;
          text-align: center;
          font-size: 15px;
          border-right: 1px solid #999;
          box-sizing: border-box;
          &:last-child {
            border-right: none;
          }
        }
      }
      .product-content {
        padding: 0 20px;
      }
    }
  }
  .van-action-bar-button--warning {
    background: linear-gradient(to left, #39bdce, #0099ff)
  }
  .van-action-bar-button--danger {
    background: linear-gradient(to right, #6eb8e2, #3883e4)
  }
}
</style>
