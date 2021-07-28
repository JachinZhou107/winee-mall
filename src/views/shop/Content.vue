<template>
  <div class="content">
    <ul class="category">
      <li
        v-for="item in categories"
        :key="item.name"
        :class="{'category__item':true,
        'category__item--active': curTab===item.tab}"
        @click="handleCategoryClick(item.tab)"
      >{{item.name}}</li>
      <li class="category__item">休闲食品</li>
      <li class="category__item">时令蔬菜</li>
      <li class="category__item">肉蛋家禽</li>
    </ul>
    <ul class="product">
      <li
        v-for="item in contentList"
        :key="item._id"
      >
        <ProductsInfo :item='item' :shopId='shopId'/>
      </li>
    </ul>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import { get } from '../../utils/request'
import ProductsInfo from '../../components/ProductsInfo'

const useCategory = (shopId) => {
  const categories = [{
    name: '全部商品',
    tab: 'all'
  }, {
    name: '秒杀',
    tab: 'seckill'
  }, {
    name: '新鲜水果',
    tab: 'fruit'
  }]
  const data = reactive({
    contentList: [],
    curTab: categories[0].tab
  })
  const getContentData = async (tab = categories[0].tab) => {
    const result = await get(`/api/shop/${shopId}/products`, { tab })
    console.log(result.data)
    data.curTab = tab
    data.contentList = result.data
  }
  const { contentList, curTab } = toRefs(data)
  return { contentList, curTab, categories, getContentData }
}

export default {
  name: 'Content',
  components: {
    ProductsInfo
  },
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const { contentList, curTab, categories, getContentData } = useCategory(shopId)
    const handleCategoryClick = (tab) => {
      getContentData(tab)
      console.log('click')
    }
    handleCategoryClick(categories[0].tab)
    return { shopId, categories, contentList, curTab, handleCategoryClick }
  }
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  top: 1.5rem;
  bottom: .5rem;
}
.category {
  width: .76rem;
  height: 100%;
  overflow-y: scroll;
  background-color: #f5f5f5;
  list-style: none;
  padding: 0;
  margin: 0;
  &__item  {
    height: .4rem;
    text-align: center;
    font-size: .14rem;
    line-height: .4rem;
    color: #333333;
    &--active {
      background-color: #fff;
    }
  }
}
.product {
  flex: 1;
  overflow-y: scroll;
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
