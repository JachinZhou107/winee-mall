<!--
 * @Author: your name
 * @Date: 2021-07-30 10:40:00
 * @LastEditTime: 2021-07-30 10:55:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-mall\src\components\aHeader.vue
-->

<template>
  <van-nav-bar
    :title="title"
    left-arrow
    @click-left="onClickLeft"
  />
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'a-header',
  props: ['title'],
  setup () {
    const router = useRouter()
    const onClickLeft = () => {
      router.back()
    }
    return {
      onClickLeft
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
