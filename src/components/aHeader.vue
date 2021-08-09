<!--
 * @Author: your name
 * @Date: 2021-07-30 10:40:00
 * @LastEditTime: 2021-08-09 20:19:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-mall\src\components\aHeader.vue
-->

<template>
  <div class="header__wraaper">
    <van-nav-bar
      :title="title"
      left-arrow
      @click-left="onClickLeft"
    />
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'a-header',
  props: ['title', 'backTo'],
  setup (props) {
    const router = useRouter()
    const onClickLeft = () => {
      if (!props.backTo) {
        router.back()
      } else {
        router.push(props.backTo)
      }
    }
    return {
      onClickLeft
    }
  }
}
</script>

<style lang="scss">
.header__wraaper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: .5rem;
}
</style>
