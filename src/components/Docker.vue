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
    <div
      v-for="(item) in dockerList"
      :key="item.icon"
      :class="{'docker__item': true, 'docker__item--active': item.name===currentPage}"
    >
      <router-link :to="item.path">
        <div class="iconfont" v-html="item.icon" />
        <div class="docker__title">{{item.text}}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Docker',
  props: ['currentPage'],
  setup () {
    const dockerList = [
      { icon: '&#xe6f1;', text: '首页', name: 'home', path: '/' },
      { icon: '&#xe621;', text: '分类', name: 'category', path: '/category' },
      { icon: '&#xe705;', text: '购物车', name: 'cart', path: '/cart' },
      { icon: '&#xe658;', text: '我的', name: 'user', path: '/user' }
    ]
    return {
      dockerList
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
  &__item {
    flex: 1;
    text-align: center;
    .iconfont {
      font-size: 0.2rem;
      margin: 0.07rem 0 0.02rem 0;
    }
    &--active {
      color: #1fa4fc;
    }
  }
  &__title {
    font-size: 0.2rem;
    transform: scale(0.6, 0.6);
    transform-origin: center top;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
}
</style>
