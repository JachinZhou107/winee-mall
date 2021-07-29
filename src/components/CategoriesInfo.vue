<!--
 * @Author: your name
 * @Date: 2021-07-28 14:13:30
 * @LastEditTime: 2021-07-29 10:26:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-mall\src\components\ProductsInfo.vue
-->
<template>
  <div class="categories__box">
    <div
      class="categories__item"
      v-for="(secItem,index) in item.secondLevelCategoryVOS"
      :key="index"
    >
      <h3 class="categories__title">{{secItem.categoryName}}</h3>
      <div class="category__box">
        <div
          class="category__item"
          v-for="(thiItem,index) in secItem.thirdLevelCategoryVOS"
          :key="index"
          @click="handleSelectCategory(thiItem.categoryId)"
        >
          <img src="//s.weituibao.com/1583591077131/%E5%88%86%E7%B1%BB.png" alt="" class="category__item__img">
          <p class="category__item__name">{{thiItem.categoryName}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

const useCategory = () => {
  const router = useRouter()
  const handleSelectCategory = (categoryId) => {
    // console.log(categoryId)
    router.push({ path: '/product-list', query: { categoryId: categoryId } })
  }
  return { handleSelectCategory }
}
export default {
  name: 'CategoriesInfo',
  props: ['item'],
  setup () {
    const { handleSelectCategory } = useCategory()
    return { handleSelectCategory }
  }
}
</script>

<style lang="scss" scoped>
@import '../style/mixins.scss';
.categories {
  &__box {
    width: 100%;
    font-size: .14rem;
  }
  &__item {
    padding: .16rem .16rem 0 .16rem;
  }
  &__title {
    margin: 0 0 .15rem 0;
    line-height: .5rem;
    font-size: .20rem;
    font-weight: normal;
    color: #333;
  }
}
.category {
  &__box {
    display: flex;
    flex-wrap: wrap;
  }
  &__item {
    flex: 0 0 33.33%;
    width: .6rem;
    text-align: center;
    &__img {
      width: .3rem;
      height: .3rem;
    }
  }
}
</style>
