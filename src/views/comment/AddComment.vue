<!--
 * @Author: your name
 * @Date: 2021-08-10 10:26:08
 * @LastEditTime: 2021-08-10 13:44:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-mall\src\views\comment\AddComment.vue
-->
<template>
  <a-header title="撰写评价"/>
  <div class="wrapper">
    <van-card
      style="background: #fff"
      :price="item.price"
      :title="item.name"
      :thumb="item.mainImage"
    />
    <div class="rate">
      <span class="ratingTitle">商品评分：</span>
      <van-rate
        v-model="rating"
        allow-half
        size=".25rem"
        color="#1fa4fc"
      />
      <span class="ratingValue">{{`${rating} 分`}}</span>
    </div>
    <van-field
      v-model="content"
      autosize
      size="large"
      type="textarea"
      maxlength="50"
      placeholder="请输入评论"
      show-word-limit
    />
    <van-button
      type="primary"
      round
      block
      color="#1fa4fc"
      @click="handleSubmit"
    >提交评论</van-button>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue'
import { Dialog, Toast } from 'vant'
import { useRoute, useRouter } from 'vue-router'

import aHeader from '../../components/aHeader'
import { post, get } from '../../utils/request'

export default {
  name: 'AddComment',
  components: {
    aHeader
  },
  setup () {
    const route = useRoute()
    const router = useRouter()
    const state = reactive({
      item: {},
      content: '',
      rating: 0
    })
    const id = route.query.id
    const init = async () => {
      Toast.loading({
        duration: 0,
        forbidClick: true
      })
      const res = await get('/product/detail', { productId: id })
      Toast.clear()
      state.item = res.data
    }

    const submit = async () => {
      const res = await post('/comment/add', {}, {
        params: {
          productId: id,
          rating: state.rating,
          content: state.content
        }
      })
      Toast.success(res.msg)
      if (res.status === 10000) {
        router.push(`/product-detail/${id}`)
      }
    }
    const handleSubmit = () => {
      Dialog.confirm({
        title: '确认提交？',
        confirmButtonColor: '#1fa4fc'
      }).then(() => {
        submit()
      })
    }
    onMounted(() => {
      init()
    })
    return {
      ...toRefs(state),
      handleSubmit
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  position: absolute;
  left: 0;
  top: 0.6rem;
  bottom: 0;
  right: 0;
  background-color: white;
  padding: 0 .18rem .2rem .18rem;
  overflow-y: auto;
  .rate {
    padding: .1rem 0 .1rem .2rem;
    .ratingTitle {
      font-size: .14rem;
    }
    .van-rate {
      padding: .1rem 0 .1rem .1rem ;
    }
    .ratingValue {
      padding-left: .1rem;
      font-size: .18rem;
      color: #1fa4fc;
    }
  }
}
</style>
