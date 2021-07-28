<!--
 * @Author: your name
 * @Date: 2021-07-28 13:53:07
 * @LastEditTime: 2021-07-28 14:00:28
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \my-mall\src\views\home\Home.vue
-->
<template>
  <div class="wrapper">
    <StaticPart />
    <NearBy />
  </div>
  <Docker />
</template>
<script>
import StaticPart from './StaticPart'
import NearBy from './NearBy'
import Docker from './Docker'
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
