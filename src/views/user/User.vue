<!--
 * @Author: your name
 * @Date: 2021-07-30 10:38:30
 * @LastEditTime: 2021-07-30 10:52:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-mall\src\views\user\user.vue
-->
<template>
  <a-header :title="'我的'"></a-header>
  <div class="wrapper"></div>
  <Docker />
</template>

<script>
import aHeader from '../../components/aHeader'
import Docker from '../../components/Docker'

export default {
  name: 'User',
  components: {
    aHeader,
    Docker
  },
  setup () {}
}
</script>

<style lang="scss" scoped>
.wrapper {

}
</style>
