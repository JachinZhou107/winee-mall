<!--
 * @Author: your name
 * @Date: 2021-07-28 13:53:07
 * @LastEditTime: 2021-07-30 10:59:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-mall\src\components\Docker.vue
-->
<template>
  <div class="docker">
    <!-- <div
      v-for="(item) in dockerList"
      :key="item.icon"
      :class="{'docker__item': true, 'docker__item--active': item.name===currentPage}"
    >
      <router-link :to="item.path">
        <div class="iconfont" v-html="item.icon" />
        <div class="docker__title">{{item.text}}</div>
      </router-link>
    </div> -->
    <van-tabbar v-model="active" @change="pageChange" >
      <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="points">分类</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o">购物车</van-tabbar-item>
      <van-tabbar-item icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
export default {
  name: 'Docker',
  props: ['currentPage'],
  setup (props) {
    const active = ref(parseInt(props.currentPage))
    console.log(active)
    const route = ['Home', 'Category', 'Cart', 'User']
    const router = useRouter()
    const pageChange = (index) => {
      router.push({ name: route[index] })
    }
    return {
      active,
      pageChange
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../style/viriables.scss";
.docker {
  color: $content-fontcolor;
  display: flex;
  position: absolute;
  box-sizing: border-box;
  overflow: hidden;
  padding: 0 0.18rem;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0.49rem;
  border-top: 0.01PX solid #f1f1f1;
  background-color: #f1f1f1;
  a {
    color: inherit;
    text-decoration: none;
  }
}
</style>
