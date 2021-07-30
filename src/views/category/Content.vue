<!--
 * @Author: your name
 * @Date: 2021-07-28 13:53:07
 * @LastEditTime: 2021-07-30 10:16:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-mall\src\views\category\Content.vue
-->
<template>
  <div class="content">
    <ul class="category">
      <li
        v-for="(item,index) in contentList"
        :key="item.categoryId"
        :class="{'category__item':true,
        'category__item--active': curTab===index}"
        @click="handleCategoryClick(index)"
      >{{item.categoryName}}</li>
    </ul>
    <div class="product">
      <template
        v-for="(item,index) in contentList"
        :key="index"
      >
        <CategoriesInfo v-if="index===curTab" :item="item" />
      </template>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { Toast } from 'vant'

import { get } from '../../utils/request'
import CategoriesInfo from '../../components/CategoriesInfo'

const useCategories = () => {
  const data = reactive({
    contentList: [],
    curTab: 0
  })
  const getContentData = async () => {
    Toast.loading({
      message: '加载中',
      forbidClick: true
    })
    const result = await get('/api/categories')
    data.contentList = result.data
    data.curTab = 0
    Toast.clear()
  }
  const handleCategoryClick = (tab) => {
    data.curTab = tab
  }
  const { contentList, curTab } = toRefs(data)
  return { contentList, curTab, getContentData, handleCategoryClick }
}

export default {
  name: 'Content',
  components: {
    CategoriesInfo
  },
  setup () {
    const { contentList, curTab, getContentData, handleCategoryClick } = useCategories()
    getContentData()
    return { contentList, curTab, handleCategoryClick }
  }
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  top: .65rem;
  bottom: .5rem;
}
.category {
  width: 1.16rem;
  height: 100%;
  overflow-y: scroll;
  background-color: #f5f5f5;
  list-style: none;
  padding: 0;
  margin: 0;
  &__item  {
    padding: .02rem;
    height: .45rem;
    text-align: center;
    font-size: .14rem;
    line-height: .5rem;
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
