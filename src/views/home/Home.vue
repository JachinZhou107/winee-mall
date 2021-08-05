<!--
 * @Author: your name
 * @Date: 2021-07-28 13:53:07
 * @LastEditTime: 2021-07-29 09:21:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-mall\src\views\home\Home.vue
-->
<template>
  <div class="wrapper">
    <StaticPart />
    <NearBy name="新品上线" />
    <NearBy name="热销商品" />
    <NearBy name="最新推荐" />
  </div>
  <Docker currentPage="0"/>
</template>
<script>
import StaticPart from './StaticPart'
import NearBy from './NearBy'
import Docker from '../../components/Docker'
export default {
  name: 'Home',
  components: {
    StaticPart,
    NearBy,
    Docker
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
  position: absolute;
  left: 0;
  top: 0;
  bottom: .5rem;
  right: 0;
  background-color: white;
  padding: 0 .18rem .2rem .18rem;
  overflow-y: auto;
}
</style>
