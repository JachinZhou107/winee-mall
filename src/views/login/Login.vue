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
      type="password"
      class="wrapper__input__content"
      placeholder="请输入密码"
      v-model="password"
      >
    </div>
    <div class="wrapper__login-button" @click="handleLogin">登陆</div>
    <div class="wrapper__tools">
      <span class="wrapper__tools__register" @click="handleGoRegister">立即注册</span> |
      <span class="wrapper__tools__password">忘记密码</span>
    </div>
    <Toast v-if="show" :message="toastMessage"/>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { post } from '../../utils/request'
import Toast, { useToast } from '../../components/Toast'

const useLogin = (showToast) => {
  const router = useRouter()
  const data = reactive({
    username: '',
    password: ''
  })
  const handleLogin = async () => {
    try {
      const result = await post('/api/user/login', {
        username: data.username,
        password: data.password
      })
      if (result?.status === 10000) {
        router.push({ name: 'Home' })
      } else {
        showToast(result?.msg)
      }
    } catch (e) {
      showToast('请求失败')
    }

    // .then(() => {
    //   alert('成功')
    //   localStorage.isLogin = true
    //   router.push({ name: 'Home' })
    // }).catch(() => {
    //   alert('失败')
    // })
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
  components: { Toast },
  setup () {
    const router = useRouter()
    const { showToast, show, toastMessage } = useToast()
    const { handleLogin, username, password } = useLogin(showToast)
    const handleGoRegister = () => {
      router.push({ name: 'Register' })
    }
    return {
      handleLogin,
      handleGoRegister,
      username,
      password,
      toastMessage,
      show
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
    &__register {
      padding-right: .12rem;
    }
    &__password {
      padding-left: .12rem;
    }
  }
}
</style>
