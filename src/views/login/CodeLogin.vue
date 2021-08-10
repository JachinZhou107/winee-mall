<!--
 * @Author: your name
 * @Date: 2021-08-10 01:21:16
 * @LastEditTime: 2021-08-10 11:03:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-mall\src\views\login\codeLogin.vue
-->
<template>
  <div class="wrapper">
    <img src="http://www.dell-lee.com/imgs/vue3/user.png" class="wrapper__img">
    <div class="wrapper__input">
      <input
      type="text"
      class="wrapper__input__content"
      placeholder="请输入手机号"
      v-model="username"
      >
    </div>
    <div class="wrapper__input">
      <input
      type="text"
      class="wrapper__input__content"
      placeholder="请输入验证码"
      v-model="password"
      >
    </div>
    <div class="wrapper__send">
      <van-button square type="primary" :disabled="waiting<60" @click="handleSend">{{ buttonText+(60-waiting>0?`(${waiting})`:'') }}</van-button>
    </div>
    <div class="wrapper__register-button" @click="handleLogin">登录</div>
    <div class="wrapper__tools">
      <span class="wrapper__tools__login" @click="handleGoLogin">账号密码登录</span> |
      <span class="wrapper__tools__register" @click="handleGoRegister">立即注册</span> |
      <span class="wrapper__tools__password">忘记密码</span>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { Toast } from 'vant'

import { post, get } from '../../utils/request'

export default {
  name: 'CodeLogin',
  setup () {
    const router = useRouter()
    const data = reactive({
      username: '',
      password: '',
      buttonText: '发送验证码',
      waiting: 60
    })
    const handleLogin = async () => {
      try {
        const result = await post('/user/login_phone', {}, {
          params: {
            phone: data.username,
            code: data.password
          }
        })
        if (result.status === 10000) {
          Toast.success('登录成功')
          setTimeout(() => {
            if (!result.data.username) router.push({ name: 'Setting', query: { from: 'login' } })
            else router.push({ name: 'Home' })
          }, 2100)
        } else {
          Toast.fail(result.msg)
        }
      } catch (e) {
        Toast.fail('请求失败')
      }
    }
    const handleGoRegister = () => {
      router.push({ name: 'Register' })
    }
    const handleGoLogin = () => {
      router.push({ name: 'Login' })
    }
    let timer = null
    const handleSend = async () => {
      if (!data.username) {
        Toast.fail('请输入手机号')
        return
      }
      data.password = null
      const res = await get('/user/auth_code', { phone: data.username })
      if (res.status === 10000) {
        Toast.success('验证码已发送')
        data.buttonText = '重新发送'
        data.waiting = 60
        timer = setInterval(() => {
          data.waiting -= 1
          if (data.waiting <= 0) {
            data.waiting = 60
            clearInterval(timer)
          }
        }, 1000)
      } else {
        Toast.fail(res.msg)
      }
    }
    return {
      handleGoRegister,
      handleGoLogin,
      handleLogin,
      handleSend,
      ...toRefs(data)
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  &__img {
    display: block;
    width: .66rem;
    height: .66rem;
    margin: 0 auto .4rem auto;
  }
  &__send {
    margin: 0 .4rem .16rem .4rem;
    height: .48rem;
    background: #0091FF;
    box-shadow: 0 .04rem .08rem 0 rgba(0,145,255,0.32);
    border-radius: .04rem;
    color: white;
    color: #FFFFFF;
    text-align: center;
    button {
      width: 100%;
      height: 100%;
    }
  }
  &__input {
    background: #F9F9F9;
    border: 1PX solid rgba(0,0,0,0.10);
    border-radius: 6px;
    border-radius: 6px;
    height: .48rem;
    margin: 0 .4rem .16rem .4rem;
    padding: 0 .16rem;
    &__content {
      line-height: .48rem;
      width: 100%;
      border: none;
      outline: 0;
      background: none;
      font-size: .16rem;
      color: rgba(0,0,0,0.70);
      &::placeholder {
        color: rgba(0,0,0,0.40);
        letter-spacing: 0;
        line-height: .24rem;
      }
    }
  }
  &__register-button {
    margin: .32rem .4rem 0 .4rem;
    background: #0091FF;
    box-shadow: 0 .04rem .08rem 0 rgba(0,145,255,0.32);
    border-radius: .04rem;
    color: white;
    line-height: .48rem;
    font-size: .16rem;
    color: #FFFFFF;
    text-align: center;
  }
  &__tools {
    color: rgba(0,0,0,0.50);
    text-align: center;
    margin-top: 0.16rem;
    font-size: .14rem;
    &__login {
      padding-right: .12rem;
    }
    &__register {
      padding:  0 .12rem;
    }
    &__password {
      padding-left: .12rem;
    }
  }
}
</style>
