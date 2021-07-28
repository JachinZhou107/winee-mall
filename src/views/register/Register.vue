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
      v-model="password1"
      >
    </div>
    <div class="wrapper__input">
      <input
      type="password"
      class="wrapper__input__content"
      placeholder="确认密码"
      v-model="password2"
      >
    </div>
    <div class="wrapper__register-button" @click="handleRegister">注册</div>
    <div class="wrapper__tools">
      <span class="wrapper__tools__register" @click="handleGoLogin">已有账号去登录</span>
    </div>
    <Toast v-if="show" :message="toastMessage"/>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { post } from '../../utils/request'
import Toast, { useToast } from '../../components/Toast'

const useRegister = (showToast) => {
  const router = useRouter()
  const data = reactive({
    username: '',
    password1: '',
    password2: ''
  })
  const handleRegister = async () => {
    try {
      const result = await post('/api/user/register', {
        username: data.username,
        password: data.password1
      })
      if (result?.errno === 0) {
        showToast('注册成功请登录')
        setTimeout(() => {
          router.push({ name: 'Login' })
        }, 2100)
      } else {
        showToast('注册失败')
      }
    } catch (e) {
      showToast('请求失败')
    }
  }

  const { username, password1, password2 } = toRefs(data)
  return {
    username,
    password1,
    password2,
    handleRegister
  }
}

export default {
  name: 'Register',
  components: { Toast },
  setup () {
    const router = useRouter()
    const { showToast, show, toastMessage } = useToast()
    const { handleRegister, username, password1, password2 } = useRegister(showToast)
    const handleGoLogin = () => {
      router.push({ name: 'Login' })
    }
    return {
      handleGoLogin,
      handleRegister,
      username,
      password1,
      password2,
      show,
      toastMessage
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
    border: 1px solid rgba(0,0,0,0.10);
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
