<!--
 * @Author: your name
 * @Date: 2021-07-28 13:53:07
 * @LastEditTime: 2021-08-18 09:45:58
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
        :key="item.id"
        :to="`/product-detail/${item.id}?from=home`"
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
import { Toast } from 'vant'

import { get } from '../../utils/request'
import ProductInfo from './ProductInfo'

const useNearbyList = (api) => {
  const nearbyList = ref([])
  const getNearbyList = async () => {
    Toast.loading({
      message: '加载中',
      forbidClick: true
    })
    const { data } = await get(api)
    nearbyList.value = data
    Toast.clear()
  }
  return { nearbyList, getNearbyList }
}

export default {
  name: 'NearBy',
  props: ['name', 'api'],
  components: {
    ProductInfo
  },
  setup (props) {
    const { nearbyList, getNearbyList } = useNearbyList(props.api)
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
    background-color: #f4f4f4;
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
