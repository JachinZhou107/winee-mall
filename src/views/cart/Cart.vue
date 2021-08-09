<template>
  <van-nav-bar title="购物车" />
  <div class="cart__body">
    <van-checkbox-group
      @change="groupChange"
      v-model="result"
      ref="checkboxGroup"
    >
      <van-swipe-cell
        :right-width="50"
        v-for="(item, index) in list"
        :key="index"
      >
        <div class="good__item">
          <van-checkbox :name="item.productId" @click="checkOne(item)" />
          <div class="good__img" @click="goTo(`/product-detail/${item.productId}`)">
            <img :src="item.productMainImage" alt="" />
          </div>
          <div class="good__desc">
            <div class="good__title">
              <span class="van-multi-ellipsis--l2">{{ item.productName }}</span>
              <span>x{{ item.quantity }}</span>
            </div>
            <div class="good__btn">
              <div class="price">¥{{ item.productPrice }}</div>
              <van-stepper
                integer
                :min="1"
                :max="5"
                :model-value="item.quantity"
                :name="item.productId"
                async-change
                @change="onChange"
              />
            </div>
          </div>
        </div>
        <template #right>
          <van-button
            square
            icon="delete"
            type="danger"
            class="delete-button"
            @click="deleteGood(item.productId)"
          />
        </template>
      </van-swipe-cell>
    </van-checkbox-group>
    <div class="empty" v-if="!list.length">
      <img
        class="empty-cart"
        src="https://s.yezgea02.com/1604028375097/empty-car.png"
        alt="空购物车"
      />
      <div class="title">购物车空空如也</div>
      <van-button
        round
        color="linear-gradient(to left, #39bdce, #0099ff)"
        type="primary"
        @click="goTo('/home')"
        block
        >前往选购</van-button
      >
    </div>
  </div>
  <van-submit-bar
    v-if="list.length > 0"
    class="submit-all van-hairline--top"
    :price="total * 100"
    button-text="结算"
    @submit="onSubmit"
  >
    <van-checkbox @click="allCheck" v-model:checked="checkAll"
      >全选</van-checkbox
    >
  </van-submit-bar>
  <Docker currentPage="2" />
</template>

<script>
import { computed, toRefs, reactive, onMounted } from 'vue'
// import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { Toast } from 'vant'

import Docker from '../../components/Docker'
import { get, post } from '../../utils/request'

export default {
  name: 'Cart',
  components: {
    Docker
  },
  setup () {
    const router = useRouter()
    // const store = useStore()
    const state = reactive({
      checked: false,
      list: [],
      all: false,
      result: [],
      checkAll: false
    })

    onMounted(() => {
      // console.log('onMounted')
      init()
    })

    // const getCart = async () => {
    //   const { data } = await get('/product/list')
    //   console.log(data)
    //   return data
    // }
    const init = async () => {
      Toast.loading({ message: '加载中...', forbidClick: true })
      const { data: data1 } = await get('/cart/list')
      if (data1) {
        state.list = data1.cartProductList
      }
      const { data: data2 } = await get('/order/getCartSelectPdt')
      if (data2) {
        state.result = data2.orderItemVoList.map((item) => item.productId)
      }
      console.log(state.list, state.result)
      Toast.clear()
    }

    const total = computed(() => {
      let sum = 0
      const _list = state.list.filter((item) =>
        state.result.includes(item.productId)
      )
      _list.forEach((item) => {
        sum += item.quantity * item.productPrice
      })
      return sum
    })

    const goBack = () => {
      router.go(-1)
    }

    const goTo = (path) => {
      router.push({ path })
    }

    const checkOne = async ({ productId }) => {
      console.log(productId, state.result)
      if (state.result.includes(productId)) {
        await post(
          '/cart/check',
          {},
          {
            params: {
              productId
            }
          }
        )
      } else {
        await post(
          '/cart/unCheck',
          {},
          {
            params: {
              productId
            }
          }
        )
      }
    }

    const onChange = async (value, detail) => {
      if (value > 5) {
        Toast.fail('超出单个商品的最大购买数量')
        return
      }
      if (value < 1) {
        Toast.fail('商品不得小于0')
        return
      }
      if (
        state.list.filter((item) => item.productId === detail.name)[0]
          .quantity === value
      ) { return }
      Toast.loading({ message: '修改中...', forbidClick: true })
      const params = {
        productId: detail.name,
        count: value
      }
      await post(
        '/cart/update',
        {},
        {
          params: params
        }
      )
      state.list.forEach((item) => {
        if (item.productId === detail.name) {
          item.quantity = value
        }
      })
      Toast.clear()
    }

    const onSubmit = async () => {
      if (state.result.length === 0) {
        Toast.fail('请选择商品进行结算')
        return
      }
      // const order = await get('/order/create')
      router.push({ path: '/create-order' })
    }

    const deleteGood = async (id) => {
      await post(
        '/cart/delete',
        {},
        {
          params: {
            productId: id
          }
        }
      )
      // store.dispatch('updateCart')
      init()
    }

    const groupChange = async (result) => {
      console.log(1)
      if (result.length === state.list.length) {
        console.log(2)
        state.checkAll = true
      } else {
        console.log(3)
        state.checkAll = false
      }
      state.result = result
    }

    const allCheck = async () => {
      if (!state.checkAll) {
        await post('/cart/checkALL')
        state.result = state.list.map((item) => item.productId)
      } else {
        await post('/cart/unCheckALL')
        state.result = []
      }
    }

    return {
      ...toRefs(state),
      total,
      goBack,
      goTo,
      checkOne,
      onChange,
      onSubmit,
      deleteGood,
      groupChange,
      allCheck
    }
  }
}
</script>
<style lang="scss">
.cart__body {
  .van-checkbox {
    padding-right: .05rem;
  }
}
</style>
<style lang="scss" scpoed>
.cart__body {
  overflow: auto;
  margin-left: 0.1rem;
  position: absolute;
  bottom: 1rem;
  left: 0;
  right: 0;
  top: .5rem;
  .good__item {
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
      padding: .1rem .2rem;
      .good__title {
        display: flex;
        justify-content: space-between;
        font-size: .14rem;
        span:first-child {
          padding-right: .05rem;
        }
        span:last-child {
          padding-left: .05rem;
        }
      }
      .good__btn {
        display: flex;
        justify-content: space-between;
        .price {
          font-size: 16px;
          color: red;
          line-height: 28px;
        }
        .van-icon-delete {
          font-size: 20px;
          margin-top: 4px;
        }
      }
    }
  }
  .delete-button {
    width: 50px;
    height: 100%;
  }
}
.empty {
  width: 50%;
  margin: 0 auto;
  text-align: center;
  margin-top: 200px;
  .empty-cart {
    width: 150px;
    margin-bottom: 20px;
  }
  .van-icon-smile-o {
    font-size: 50px;
  }
  .title {
    font-size: 16px;
    margin-bottom: 20px;
  }
}
.cart {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0.51rem;
  border-bottom: 1px solid #f1f1f1;
}
.van-submit-bar {
  position: absolute;
  bottom: 0.51rem;
}
</style>
