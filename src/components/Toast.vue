<!--
 * @Author: your name
 * @Date: 2021-08-06 09:35:50
 * @LastEditTime: 2021-08-10 22:12:10
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \my-mall\src\components\Toast.vue
-->
<template>
  <div class="toast">
    {{message}}
  </div>
</template>
<script>
import { reactive, toRefs } from 'vue'

export default {
  props: ['message']
}
export const useToast = () => {
  const toastData = reactive({
    show: false,
    toastMessage: ''
  })
  const showToast = (message) => {
    toastData.show = true
    toastData.toastMessage = message
    setTimeout(() => {
      toastData.show = false
      toastData.toastMessage = ''
    }, 2000)
  }
  const { show, toastMessage } = toRefs(toastData)
  return {
    show,
    toastMessage,
    showToast
  }
}
</script>
<style lang="scss" scoped>
.toast {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50% ,-50%);
  padding: .1rem;
  background-color: gray;
  border: .05rem;
  color: #fff;
}
</style>
