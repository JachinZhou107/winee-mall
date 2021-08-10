<!--
 * @Author: your name
 * @Date: 2021-07-28 14:13:30
 * @LastEditTime: 2021-08-10 22:11:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-mall\src\components\ProductsInfo.vue
-->
<template>
  <div class="categories__box">
    <h3 class="categories__title">{{item.name}}</h3>
    <div class="category__box">
      <div
        class="category__item"
        v-for="(secItem,index) in item.childCategory"
        :key="index"
        @click="handleSelectCategory(secItem.id)"
      >
        <img
          src="https://zackyj-typora.oss-cn-chengdu.aliyuncs.com/YiMall/2021/08/09/1628523338759.png"
          alt=""
          class="category__item__img"
        >
        <p class="category__item__name">{{secItem.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

const useCategory = () => {
  const router = useRouter()
  const handleSelectCategory = (categoryId) => {
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
@import '../../style/mixins.scss';
.categories {
  &__box {
    box-sizing: border-box;
    padding: .1rem .2rem;
    width: 100%;
    font-size: .14rem;
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
