<!--
 * @Author: your name
 * @Date: 2021-07-30 10:38:30
 * @LastEditTime: 2021-07-30 15:54:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-mall\src\views\user\user.vue
-->
<template>
  <a-header :title="'我的'"></a-header>
  <div class="wrapper">
    <div class="user__info">
      <div class="user__info__img">
        <van-image
          src="https://s.yezgea02.com/1604040746310/aaaddd.png"
          width=".7rem"
          height=".7rem"
          round
          fit="fill"
        />
      </div>
      <div class="user__info__list">
        <span>账号名称：{{username}}</span>
        <span>手机号：{{phone}}</span>
        <span>邮箱：{{email}}</span>
      </div>
    </div>
    <div class="user__list">
      <van-cell-group>
        <van-cell title="订单管理" is-link to="home" />
        <van-cell title="地址管理" is-link to="home" />
        <van-cell title="账号管理" is-link to="home" />
      </van-cell-group>
    </div>
  </div>
  <Docker />
</template>

<script>
import { reactive, toRefs } from 'vue'
import { post } from '../../utils/request'
import aHeader from '../../components/aHeader'
import Docker from '../../components/Docker'

export default {
  name: 'User',
  components: {
    aHeader,
    Docker
  },
  setup () {
    const userData = reactive({
      username: '',
      password: '',
      email: '',
      phone: ''
    })
    const getUserData = async () => {
      const result = await post('/api/getUser', {})
      userData.username = result.data.username
      userData.password = result.data.password
      userData.email = result.data.email
      userData.phone = result.data.phone
    }
    getUserData()
    return {
      ...toRefs(userData)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';

.wrapper {
  display: flex;
  flex-direction: column;
  .user__info {
    display: flex;
    align-items: center;
    margin: .1rem .15rem;
    padding: .1rem .14rem;
    background: linear-gradient(90deg, $primary-color, #77a0dd);
    height: 1rem;
    border-radius: .1rem;
    box-shadow: 0 .02rem .08rem #4277c5cf;
    &__list {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-left: .06rem;
      height: 100%;
      span {
        line-height: .2rem;
        font-size: .14rem;
        color: #fff;
        height: .2rem;
        padding: .02rem;
      }
    }
  }
}
</style>
