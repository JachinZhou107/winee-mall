<!--
 * @Author: your name
 * @Date: 2021-08-06 09:35:50
 * @LastEditTime: 2021-08-10 22:11:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-mall\src\App.vue
-->
<template>
<div :class="isPc?'router-view':''">
  <router-view />
</div>
</template>

<script>
import { reactive, toRefs } from 'vue'
export default {
  name: 'App',
  setup () {
    const state = reactive({
      isPc: 1
    })
    const _isMobile = () => {
      const flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      return flag
    }
    if (_isMobile()) {
      state.isPc = 0
    }
    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang="scss" scoped>
.router-view{
  width: 100%;
  // max-width: 400px;
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: 0 auto;
}
</style>
