<!--
 * @Author: your name
 * @Date: 2021-08-06 10:55:01
 * @LastEditTime: 2021-08-10 10:27:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-mall\src\views\order\orderDetail.vue
-->
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
  <div class="order-detail-box">
    <a-header :title="'订单详情'"></a-header>
    <div class="order-status">
      <div class="status-item">
        <label>收货地址：</label>
        <span>
          <div class="name">
            <span>{{ shipping.receiverName }} </span>
            <span>{{ shipping.receiverMobile }}</span>
          </div>
          <div class="address">
            {{ shipping.receiverProvince }} {{ shipping.receiverCity }}
            {{ shipping.receiverDistrict }} {{ shipping.receiverAddress }}
          </div>
        </span>
      </div>
      <div class="status-item">
        <label>订单状态：</label>
        <span>{{ detail.statusDesc }}</span>
      </div>
      <div class="status-item">
        <label>订单编号：</label>
        <span>{{ detail.orderNo }}</span>
      </div>
      <div class="status-item">
        <label>下单时间：</label>
        <span>{{ detail.createTime }}</span>
      </div>
      <!-- <van-button v-if="[1,2,3].includes(detail.orderStatus)" style="margin-bottom: 10px" color="#1baeae" block @click="confirmOrder(detail.orderNo)">确认订单</van-button> -->
      <van-button v-if="detail.status === 10" style="margin-bottom: 10px" color="#1fa4fc" block @click="showPayFn">去支付</van-button>
      <van-button v-if="(detail.status>0 && detail.status <= 20)" block @click="handleCancelOrder(detail.orderNo)">取消订单</van-button>
      <van-button v-if="(detail.status === 40 )" color="#1fa4fc" block @click="handleConfirmReceive(detail.orderNo)">确认收货</van-button>
    </div>
    <div class="order-price">
      <div class="price-item">
        <label>商品金额：</label>
        <span>¥ {{ detail.payment }}</span>
      </div>
      <div class="price-item">
        <label>配送方式：</label>
        <span>普通快递</span>
      </div>
    </div>
    <van-card
      v-for="item in detail.orderItemVoList"
      :key="item.productId"
      style="background: #fff"
      :num="item.quantity"
      :price="item.currentUnitPrice"
      desc="全场包邮"
      :title="item.productName"
      :thumb="item.productImage"
    />
    <van-popup
      v-model:show="showPay"
      position="bottom"
      :style="{ height: '24%' }"
    >
      <div :style="{ width: '90%', margin: '0 auto', padding: '20px 0' }">
        <van-button color="#1989fa" block @click="handlePayOrder(detail.orderNo)">支付宝支付</van-button>
      </div>
      <div v-html="payPage"></div>
    </van-popup>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, nextTick } from 'vue'
import { Dialog, Toast } from 'vant'
import { useRoute } from 'vue-router'

import aHeader from '../../components/aHeader'
import { get, post } from '../../utils/request'

export default {
  name: 'OrderDetail',
  components: {
    aHeader
  },
  setup () {
    const route = useRoute()
    const state = reactive({
      detail: {},
      shipping: {},
      showPay: false,
      payPage: ''
    })

    onMounted(() => {
      console.log('munted')
      init()
    })

    const init = async () => {
      Toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      const { data } = await get('/order/detail', { orderNo: route.query.orderNo })
      state.detail = data
      state.shipping = data.shippingVo
      Toast.clear()
    }

    const handleCancelOrder = (id) => {
      Dialog.confirm({
        title: '确认取消订单？'
      }).then(() => {
        post('/order/cancel', {}, { params: { orderId: id } }).then(res => {
          console.log(res)
          if (res.status === 10000) {
            Toast.success('删除成功')
            init()
          } else {
            Toast.fail(res.msg)
          }
        })
      }).catch((res) => {
        // on cancel
      })
    }

    const handleConfirmReceive = (id) => {
      Dialog.confirm({
        title: '确认收货？'
      }).then(() => {
        post('/order/receive', {}, { params: { orderNo: id } }).then(res => {
          // console.log(res)
          if (res.status === 10000) {
            Toast.success('收货成功')
            init()
          } else {
            Toast.fail(res.msg)
          }
        })
      }).catch((res) => {
        // on cancel
      })
    }

    const showPayFn = () => {
      state.showPay = true
    }

    const handlePayOrder = async (id) => {
      state.payPage = await post('/order/pay', {}, { params: { orderNo: id } })
      nextTick(function () { document.forms[0].submit() })
      state.showPay = false
    }

    const close = () => {
      Dialog.close()
    }

    return {
      ...toRefs(state),
      handleCancelOrder,
      handleConfirmReceive,
      showPayFn,
      handlePayOrder,
      close
    }
  }
}
</script>

<style lang="scss" scoped>
  .order-detail-box {
    background: #f7f7f7;
    margin-top: .5rem;
    .order-status {
      background: #fff;
      padding: 20px;
      font-size: 15px;
      .status-item {
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        label {
          color: #999;
        }
        span {
          margin-right: .05rem;
        }
      }
    }
    .order-price {
      background: #fff;
      margin: 20px 0;
      padding: 20px;
      font-size: 15px;
      .price-item {
        margin-bottom: 10px;
        label {
          color: #999;
        }
      }
    }
    .van-card {
      margin-top: 0;
    }
    .van-card__content {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
</style>
