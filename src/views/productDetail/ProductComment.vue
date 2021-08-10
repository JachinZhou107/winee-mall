<!--
 * @Author: your name
 * @Date: 2021-08-10 15:59:41
 * @LastEditTime: 2021-08-10 22:11:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-mall\src\views\productDetail\ProductComment.vue
-->
<template>
  <div
    class="comment__box"
    v-for="(item, index) in list"
    :key="index"
  >
    <van-cell-group inset>
      <van-cell>
        <template #icon>
          <div class="avatar">
            <van-image
              round
              :src="item.face"
              width=".4rem"
              height=".4rem"
            />
          </div>
        </template>
        <template #title>
          <span class="username">{{item.username}}</span>
        </template>
        <template #value>
          <div class="rating">
            <span></span>
            <van-rate
              v-model="item.rating"
              readonly
              allow-half
              size=".15rem"
              color="#1fa4fc"
              void-color="#f1f1f1"
            />
          </div>
        </template>
      </van-cell>
      <van-cell>
        <van-field
          v-model="item.content"
          autosize
          readonly
          type="textarea"
          placeholder="该用户没有填写文字评价"
        />
      </van-cell>
    </van-cell-group>
  </div>
  <div class="empty" v-if="!list.length">
    <van-cell-group inset>
      <van-cell title="此商品暂时还没有人评论~~" />
    </van-cell-group>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'

export default {
  name: 'productComment',
  props: ['commentList'],
  setup (props) {
    const state = reactive({
      list: props.commentList
    })
    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang="scss" scoped>
.comment__box {
  padding-bottom: .1rem;
  .avatar {
    height: .4rem;
    width: .4rem;
  }
  .username {
    line-height: .4rem;
    padding-left: .1rem;
  }
  .rating {
    line-height: .4rem;
  }
}

</style>
