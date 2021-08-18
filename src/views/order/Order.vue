<template>
  <div class="order-header">
    <a-header title="我的订单" backTo="/user"></a-header>
    <van-tabs
      @click="onChangeTab"
      color="#1fa4fc"
      title-active-color="#1fa4fc"
      class="order-tab"
      v-model="status"
    >
      <van-tab title="全部" name=''></van-tab>
      <van-tab title="待付款" name="10"></van-tab>
      <van-tab title="待发货" name="20"></van-tab>
      <van-tab title="已发货" name="40"></van-tab>
      <van-tab title="交易完成" name="50"></van-tab>
      <van-tab title="交易结束" name="60"></van-tab>
      <van-tab title="已取消" name="0"></van-tab>
    </van-tabs>
  </div>
  <div class="order-box">
    <div class="content">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh" class="order-list-refresh">
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          @offset="10"
        >
          <div v-for="(item, index) in list" :key="index" class="order-item-box" @click="goTo(item.orderNo)">
            <div class="order-item-header">
              <span>订单时间：{{ item.createTime }}</span>
              <span class="order-item-status">{{ item.statusDesc }}</span>
            </div>
            <van-card
              v-for="one in item.orderItemVoList"
              :key="one.productId"
              :num="one.quantity"
              :price="one.currentUnitPrice"
              :desc="'顺丰包邮'"
              :title="one.productName"
              :thumb="one.productImage"
            />
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'

import aHeader from '../../components/aHeader'
import { get } from '../../utils/request'

export default {
  name: 'Order',
  components: {
    aHeader
  },
  setup () {
    const router = useRouter()
    const state = reactive({
      status: '',
      loading: false,
      finished: false,
      refreshing: false,
      list: [],
      page: 1,
      totalPage: 0
    })

    const loadData = async () => {
      const { data, data: { list } } = await get('/order/list', { pageNum: state.page, status: state.status })
      state.list = state.list.concat(list)
      state.totalPage = data.pages
      state.loading = false
      if (state.page >= data.pages) state.finished = true
    }

    const onChangeTab = (name) => {
      state.status = name
      onRefresh()
    }

    const goTo = (id) => {
      router.push({ path: '/order-detail', query: { orderNo: id } })
    }

    const goBack = () => {
      router.go(-1)
    }

    const onLoad = () => {
      if (!state.refreshing && state.page < state.totalPage) {
        state.page = state.page + 1
      }
      if (state.refreshing) {
        state.list = []
        state.refreshing = false
      }
      loadData()
    }

    const onRefresh = () => {
      state.refreshing = true
      state.finished = false
      state.loading = true
      state.page = 1
      onLoad()
    }

    return {
      ...toRefs(state),
      onChangeTab,
      goTo,
      goBack,
      onLoad,
      onRefresh
    }
  }
}
</script>

<style lang="scss" scoped>
.order-header {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10000;
  width: 100%;
  height: .5rem;
  line-height: .5rem;
  padding: 0 .1rem;
  box-sizing: border-box;
  color: #252525;
  background: #fff;
  border-bottom: 1PX solid #dcdcdc;
  .van-tabs {
    position: absolute;
    top: .48rem;
    left: 0;
    right: 0;
  }
}
.order-box {
  position: absolute;
  top: .5rem;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
  background-color: #f8f8f8;
  .order-tab {
    position: fixed;
    left: 0;
    z-index: 1000;
    width: 100%;
    border-bottom: 1PX solid #e9e9e9;
  }
  .content {
    overflow: hidden;
    overflow-y: scroll;
    padding-top: .3rem;
  }
  .order-list-refresh {
    .van-card__content {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .van-pull-refresh__head {
      background: #f9f9f9;
    }
    .order-item-box {
      margin: .2rem .1rem;
      background-color: #fff;
      .order-item-header {
        padding: .1rem .2rem 0 .2rem;
        display: flex;
        justify-content: space-between;
        font-size: .14rem;
        .order-item-status {
          color: #1fa4fc;
        }
      }
      .van-card {
        background-color: #fff;
        margin-top: 0;
      }
    }
  }
}
</style>
