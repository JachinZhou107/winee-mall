<template>
  <div class="wrapper">
    <img src="http://www.dell-lee.com/imgs/vue3/user.png" class="wrapper__img">
    <div class="register__step1" v-if="step===1">
      <div class="wrapper__input">
        <input
        type="text"
        class="wrapper__input__content"
        placeholder="请输入手机号"
        v-model="phone"
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
      <div class="wrapper__register-button" @click="handleRegister">注册</div>
      <div class="wrapper__tools">
        <span class="wrapper__tools__register" @click="handleGoLogin">已有账号去登录</span>
      </div>
    </div>
    <div class="register__step2" v-else>
      <div class="wrapper__input">
        <input
        type="text"
        class="wrapper__input__content"
        placeholder="设置你的登录名称"
        v-model="username"
        >
      </div>
      <div class="wrapper__input">
        <input
          type="password"
          class="wrapper__input__content"
          placeholder="设置你的登录密码"
          v-model="password"
        >
      </div>
      <div class="wrapper__register-button" @click="handleConfirmRegister">确定</div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { Toast } from 'vant'

import { post, get } from '../../utils/request'

export default {
  name: 'Register',
  setup () {
    const router = useRouter()
    const data = reactive({
      username: '',
      password: '',
      phone: '',
      buttonText: '发送验证码',
      waiting: 60,
      step: 1
    })

    const handleRegister = async () => {
      try {
        Toast.loading({
          duration: 0,
          forbidClick: true,
          message: '注册中...'
        })
        const result = await post('/user/register_phone', {}, {
          params: {
            phone: data.phone,
            code: data.password
          }
        })
        Toast.clear()
        if (result.status === 10000) {
          Toast.success('注册成功\n设置用户名和密码')
          data.step = 2
          data.password = null
          data.username = null
          // setTimeout(() => {
          //   router.push({ name: 'CodeLogin' })
          // }, 2100)
        } else {
          Toast.fail(result.msg)
        }
      } catch (e) {
        Toast.clear()
        Toast.fail('请求失败')
      }
    }

    const handleConfirmRegister = async () => {
      if (!data.password || data.password.length < 6) {
        Toast.fail('密码长度不小于6！')
        return
      }
      if (!data.username) {
        Toast.fail('请设置用户名！')
        return
      }
      try {
        Toast.loading({
          duration: 0,
          forbidClick: true,
          message: '提交中...'
        })
        const result = await post('/user/register', {}, {
          params: {
            username: data.username,
            password: data.password,
            phone: data.phone
          }
        })
        Toast.clear()
        if (result.status === 10000) {
          Toast.success(result.msg)
          setTimeout(() => {
            router.push({ name: 'Setting', query: { from: 'register' } })
          }, 1100)
        } else {
          Toast.fail(result.msg)
        }
      } catch (e) {
        Toast.clear()
        Toast.fail('请求失败')
      }
    }

    const handleGoLogin = () => {
      router.push({ name: 'Login' })
    }

    let timer = null
    const handleSend = async () => {
      if (!data.phone) {
        Toast.fail('请输入手机号')
        return
      }
      data.password = null
      Toast.loading({
        duration: 0,
        forbidClick: true,
        message: '发送中...'
      })
      const res = await get('/user/auth_code', { phone: data.phone })
      Toast.clear()
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
      handleGoLogin,
      handleRegister,
      handleConfirmRegister,
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
    &__register {
      padding-right: .12rem;
    }
    &__password {
      padding-left: .12rem;
    }
  }
}
</style>
