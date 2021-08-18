<!--
 * @Author: your name
 * @Date: 2021-08-06 10:54:50
 * @LastEditTime: 2021-08-18 10:23:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-mall\src\views\order\CreateOrder.vue
-->
<template>
  <a-header :title="'生成订单'" backTo="/cart" />
  <div class="address__wrap">
    <div class="name" @click="goTo">
      <span>{{ address.receiverName }} </span>
      <span>{{ address.receiverMobile }}</span>
    </div>
    <div class="address">
      {{ address.receiverProvince }} {{ address.receiverCity }}
      {{ address.receiverDistrict }} {{ address.receiverAddress }}
    </div>
    <van-icon class="arrow" name="arrow" />
  </div>
  <div class="create__order">
    <div class="good">
      <div class="good__item" v-for="(item, index) in cartList" :key="index">
        <div class="good__img">
          <img :src="item.productImage" alt="" />
        </div>
        <div class="good__desc">
          <div class="good__title">
            <span class="van-multi-ellipsis--l2">{{ item.productName }}</span>
            <span>x{{ item.quantity }}</span>
          </div>
          <div class="good__btn">
            <div class="price">¥{{ item.currentUnitPrice }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="pay__wrap">
      <div class="price">
        <span>商品金额</span>
        <span>¥{{ total }}</span>
      </div>
      <van-button
        @click="handleCreateOrder"
        class="pay__btn"
        color="#1fa4fc"
        type="primary"
        block
      >
        生成订单
      </van-button>
    </div>
    <van-popup
      closeable
      :close-on-click-overlay="false"
      v-model:show="showPay"
      position="bottom"
      :style="{ height: '20%' }"
      @close="close"
    >
      <div :style="{ width: '90%', margin: '0 auto', padding: '.5rem 0 0 0' }">
        <van-button
          v-show="!payPage"
          color="#1989fa"
          block
          @click="handlePayOrder()"
          >支付宝支付</van-button
        >
      </div>
      <div v-html="payPage"></div>
    </van-popup>
  </div>
</template>

<script>
import { reactive, onMounted, nextTick, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import aHeader from '../../components/aHeader'
import { get, post } from '../../utils/request'
import { Toast } from 'vant'

export default {
  name: 'CreateOrder',
  components: {
    aHeader
  },
  setup () {
    const router = useRouter()
    const route = useRoute()
    const state = reactive({
      cartList: [],
      total: 0,
      address: {},
      showPay: false,
      orderNo: '',
      payPage: ''
    })

    onMounted(() => {
      init()
    })

    const init = async () => {
      Toast.loading({ message: '加载中...', forbidClick: true })
      const { addressId } = route.query
      const {
        data: { orderItemVoList: list, productTotalPrice: total }
      } = await get('/order/getCartSelectPdt')

      if (list.length <= 0) { route.push('/cart') }
      const { data: address } = (addressId
        ? await get('/ship/detail', { shippingId: addressId })
        : await get('/ship/default'))
      if (!address) {
        Toast.fail('请选择或添加地址！')
        router.push({ path: '/address' })
        return
      }
      state.cartList = list
      state.total = total
      state.address = address
      Toast.clear()
    }

    const goTo = () => {
      router.push({ path: '/address', query: { from: 'create-order' } })
    }

    const handleCreateOrder = async () => {
      const params = {
        shippingId: state.address.id
      }
      const { data } = await post('/order/create', {}, { params })
      state.orderNo = data.orderNo
      state.showPay = true
    }

    const close = () => {
      router.push({ path: '/order' })
    }

    const handlePayOrder = async () => {
      state.payPage = await post('/order/pay', {}, {
        params: {
          orderNo: state.orderNo
        }
      })
      nextTick(function () { document.forms[0].submit() })
      Toast.success('请完成支付')
    }

    return {
      ...toRefs(state),
      goTo,
      handleCreateOrder,
      close,
      handlePayOrder
    }
  }
}
</script>

<style lang="scss" scoped>

.address__wrap {
  position: absolute;
  top: .48rem;
  right: 0;
  left: 0;
  background: #fff;
  font-size: .14rem;
  padding: .15rem;
  z-index: 9;
  color: #222333;
  .name {
    span {
      padding: 0 .05rem;
    }
  }
  .address {
    margin: .1rem 0;
  }
  .arrow {
    position: absolute;
    right: .1rem;
    top: 50%;
    transform: translateY(-50%);
    font-size: .2rem;
  }
  &::before {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: .02rem;
    background: -webkit-repeating-linear-gradient(
      135deg,
      #ff6c6c 0,
      #ff6c6c 20%,
      transparent 0,
      transparent 25%,
      #1989fa 0,
      #1989fa 45%,
      transparent 0,
      transparent 50%
    );
    background: repeating-linear-gradient(
      -45deg,
      #ff6c6c 0,
      #ff6c6c 20%,
      transparent 0,
      transparent 25%,
      #1989fa 0,
      #1989fa 45%,
      transparent 0,
      transparent 50%
    );
    background-size: .8rem;
    content: "";
  }
}
.create__order {
  background: #f9f9f9;
  position: absolute;
  top: 1.4rem;
  left: 0;
  right: 0;
  bottom: 1rem;
  overflow: auto;
  .good__item {
    padding: .1rem;
    background: #fff;
    display: flex;
    .good__img {
      img {
        width: 1rem;
        height: 1rem;
      }
    }
    .good__desc {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
      padding: .2rem;
      .good__title {
        display: flex;
        justify-content: space-between;
        span {
          padding: 0 .06rem;
        }
      }
      .good__btn {
        display: flex;
        justify-content: space-between;
        .price {
          font-size: .16rem;
          color: red;
          line-height: .28rem;
        }
        .van-icon-delete {
          font-size: .2rem;
          margin-top: .04rem;
        }
      }
    }
  }
  .pay__wrap {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
    padding: .1rem 0;
    padding-bottom: .5rem;
    border-top: 1PX solid #e9e9e9;
    > div {
      display: flex;
      justify-content: space-between;
      padding: 0 5%;
      margin: .1rem 0;
      font-size: .14rem;
      span:nth-child(2) {
        color: red;
        font-size: .18rem;
      }
    }
    .pay__btn {
      position: fixed;
      bottom: .07rem;
      right: 0;
      left: 0;
      width: 90%;
      margin: 0 auto;
    }
  }
}
</style>
