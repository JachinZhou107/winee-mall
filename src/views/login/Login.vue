<template>
  <div class="wrapper">
    <img src="http://www.dell-lee.com/imgs/vue3/user.png" class="wrapper__img">
    <div class="wrapper__input">
      <input
      type="text"
      class="wrapper__input__content"
      placeholder="请输入账号名称或手机号"
      v-model="username"
      >
    </div>
    <div class="wrapper__input">
      <input
      type="password"
      class="wrapper__input__content"
      placeholder="请输入密码"
      v-model="password"
      >
    </div>
    <div class="wrapper__login-button" @click="handleLogin">登陆</div>
    <div class="wrapper__tools">
      <span class="wrapper__tools__code-login" @click="handleGoCodeLogin">验证码登录</span> |
      <span class="wrapper__tools__register" @click="handleGoRegister">立即注册</span> |
      <span class="wrapper__tools__password">忘记密码</span>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { Toast } from 'vant'
import { post } from '../../utils/request'

const useLogin = () => {
  const router = useRouter()
  const data = reactive({
    username: '',
    password: ''
  })
  const handleLogin = async () => {
    Toast.loading({
      duration: 0,
      forbidClick: true,
      message: '登录中...'
    })
    try {
      const config = {}
      config.params = {
        username: data.username,
        password: data.password
      }
      const result = await post('/user/login', {}, config)
      Toast.clear()
      if (result?.status === 10000) {
        Toast.success('登录成功')
        router.push({ name: 'Home' })
      } else {
        Toast.fail(result?.msg)
      }
    } catch (e) {
      Toast.fail('请求失败')
    }
  }

  const { username, password } = toRefs(data)
  return {
    username,
    password,
    handleLogin
  }
}

export default {
  name: 'Login',
  setup () {
    const router = useRouter()
    const { handleLogin, username, password } = useLogin()
    const handleGoRegister = () => {
      router.push({ name: 'Register' })
    }
    const handleGoCodeLogin = () => {
      router.push({ name: 'CodeLogin' })
    }
    return {
      handleLogin,
      handleGoRegister,
      handleGoCodeLogin,
      username,
      password
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
  &__input {
    background: #F9F9F9;
    border: 1PX solid rgba(0,0,0,0.10);
    border-radius: .06rem;
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
  &__login-button {
    margin: .32rem .4rem 0 .4rem;
    background: #0091FF;
    box-shadow: 0 .04rem .08rem 0 rgba(0,145,255,0.32);
    border-radius: .04rem;
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
    &__code-login {
      padding-right: .12rem;
    }
    &__register {
      padding: 0 .12rem;
    }
    &__password {
      padding-left: .12rem;
    }
  }
}
</style>
