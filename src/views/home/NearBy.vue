<!--
 * @Author: your name
 * @Date: 2021-07-28 13:53:07
 * @LastEditTime: 2021-07-30 10:15:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-mall\src\views\home\NearBy.vue
-->
<template>
  <div class="nearby">
    <h3 class="nearby__title">{{name}}</h3>
    <div class="nearby__box">
      <router-link
        v-for="item in nearbyList"
        :key="item._id"
        :to="`/product-detail/${item._id}`"
      >
        <ProductInfo
          :item="item"
        />
      </router-link>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { get } from '../../utils/request'
import ProductInfo from '../../components/ProductInfo'
import { Toast } from 'vant'

const useNearbyList = () => {
  const nearbyList = ref([])
  const getNearbyList = async () => {
    Toast.loading({
      message: '加载中',
      forbidClick: true
    })
    const result = await get('/api/shop/hot-list')
    // console.log(result)
    if (result?.errno === 0 && result?.data?.length) {
      nearbyList.value = result.data
    }
    Toast.clear()
  }
  // console.log(nearbyList)
  return { nearbyList, getNearbyList }
}

export default {
  name: 'NearBy',
  props: ['name'],
  components: {
    ProductInfo
  },
  setup () {
    const { nearbyList, getNearbyList } = useNearbyList()
    getNearbyList()
    return {
      nearbyList
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';
.nearby {
  &__title {
    margin: 0 -0.18rem 0.1rem -0.18rem;
    line-height: .5rem;
    font-size: .20rem;
    text-align: center;
    font-weight: normal;
    color: #2682be;
    background-color: #f1f1f1;
  }
  &__box {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  a {
    color: #333333;
    text-decoration: none;
    box-sizing: border-box;
    border-bottom: 1PX solid #f1f1f1;
    width: 50%;
    &:nth-child(2n+1) {
      border-right: 1PX solid #f1f1f1f1;
    }
  }
}
</style>
