<template>
处理中...
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { Toast } from 'vant'

import { get } from '../../utils/request'

export default {
  name: 'PayReturn',
  setup () {
    const router = useRouter()
    const route = useRoute()

    const orderNo = route.query.out_trade_no
    const res = get('/order/pay_status', { orderNo })
    res.then(({ data }) => {
      if (data.msg === 'Success') {
        Toast.success('支付成功')
      } else Toast.fail('支付失败')
      setTimeout(() => {
        router.push({ path: '/order-detail', query: { from: 'pay_return', orderNo } })
      }, 1500)
    })
  }
}
</script>
