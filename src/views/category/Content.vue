<!--
 * @Author: your name
 * @Date: 2021-07-28 13:53:07
 * @LastEditTime: 2021-08-09 23:38:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-mall\src\views\category\Content.vue
-->
<template>
  <div class="content">
    <van-sidebar v-model="curTab">
      <van-sidebar-item
        v-for="item in contentList"
        :key="item.id"
        :title="item.name"
      />
    </van-sidebar>
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
import CategoriesInfo from './CategoriesInfo.vue'

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
    const result = await get('/category/list')
    // console.log(result.data)
    data.contentList = result.data
    data.curTab = 0
    Toast.clear()
  }
  const { contentList, curTab } = toRefs(data)
  return { contentList, curTab, getContentData }
}

export default {
  name: 'Content',
  components: {
    CategoriesInfo
  },
  setup () {
    const { contentList, curTab, getContentData } = useCategories()
    getContentData()
    return { contentList, curTab }
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
.van-sidebar {
  background-color: #f7f8fa;
  width: 1rem;
}
.product {
  flex: 1;
  overflow-y: scroll;
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
