<template>
  <div class="product__detail">
    <a-header :title="'商品详情'" :backTo="'/'+(from || 'product-list')"></a-header>
    <div class="detail__content">
      <div class="product__img">
        <img :src="detail.mainImage" alt="">
      </div>
      <div class="product__info">
        <div class="product__title">
          {{ detail.name || '' }}
        </div>
        <div class="product__desc">{{ detail.subtitle || '' }}</div>
        <div class="product__price">
          <span>¥{{ detail.price || '' }}</span>
          <span>库存{{ detail.stock}}</span>
        </div>
      </div>
      <van-tabs
        v-model:active="show"
        color="#1fa4fc"
      >
        <van-tab title="商品信息" />
        <van-tab title="商品评价" />
      </van-tabs>
      <div class="product__intro" v-if="!show">
        <ul>
          <li>概述</li>
          <li>参数</li>
          <li>服务</li>
          <li>常见问题</li>
        </ul>
        <div class="product__content" v-html="detail.detail || ''"></div>
      </div>
      <div class="product__comment" v-else>
        <ProductComment :commentList="comments" />
      </div>
    </div>
  </div>
  <div class="cart__docker">
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
import ProductComment from './ProductComment'
import { get, post } from '../../utils/request'

export default {
  name: 'ProductDetail',
  components: {
    aHeader,
    ProductComment
  },
  setup () {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    const state = reactive({
      detail: {
        goodsCarouselList: []
      },
      comments: [],
      show: 0,
      from: route.query.from
    })
    onMounted(async () => {
      Toast.loading({
        message: '加载中',
        forbidClick: true
      })
      const { id } = route.params
      const { data: detail } = await get('product/detail', { productId: id })
      state.detail = detail
      const { data: comments } = await get('/comment/list', { productId: id })
      state.comments = comments
      store.dispatch('updateCart')
      Toast.clear()
    })

    const goTo = () => {
      router.push({ path: '/cart' })
    }

    const handleAddCart = async () => {
      const { id } = route.params
      const { status } = await post('/cart/add', {}, {
        params: {
          count: 1,
          productId: id
        }
      })
      if (status === 10000) Toast.success('添加成功')
      store.dispatch('updateCart')
    }

    const goToCart = async () => {
      const { id } = route.params
      await post('/cart/add', {}, {
        params: {
          count: 1,
          productId: id
        }
      })
      store.dispatch('updateCart')
      router.push({ path: '/cart' })
    }

    const count = computed(() => {
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
.product__detail {
  .detail__content {
    .product__intro {
      .product__content {
        img {
          width: 100%;
        }
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.product__detail {
  position: absolute;
  left: 0;
  top: .5rem;
  bottom: .5rem;
  right: 0;
  background-color: white;
  overflow: auto;
  .detail__content {
    overflow: hidden;
    overflow-y: auto;
    .product__img {
      img {
        width: 100%;
        box-sizing: border-box;
        padding:  .05rem;
      }
    }
    .product__info {
      padding: 0 .1rem;
      div {
        padding: .1rem;
      }
      .product__title {
        font-size: .18rem;
        text-align: left;
        color: #333;
      }
      .product__desc {
        font-size: .14rem;
        text-align: left;
        color: #999;
        padding: 0.05rem 0.02rem;
      }
      .product__price {
        display: flex;
        justify-content: space-between;
        span:nth-child(1) {
          color: #F63515;
          font-size: .22rem;
        }
        span:nth-child(2) {
          color: #999;
          font-size: .16rem;
        }
      }
    }
    .product__intro {
      width: 100%;
      padding-bottom: .5rem;
      ul {
        width: 100%;
        margin: .1rem 0;
        display: flex;
        li {
          flex: 1;
          padding: .05rem 0;
          text-align: center;
          font-size: .15rem;
          border-right: .01rem solid #999;
          box-sizing: border-box;
          &:last-child {
            border-right: none;
          }
        }
      }
      .product__content {
        padding: 0 .15rem;
      }
    }
    .product__comment {
      background-color: #f2f2f2;
      padding: .1rem 0;
    }
  }
}

.cart__docker {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  z-index: 9;
  .van-action-bar-button--warning {
    background: linear-gradient(to left, #39bdce, #0099ff)
  }
  .van-action-bar-button--danger {
    background: linear-gradient(to right, #6ea0e2, #2478e7)
  }
}
</style>
