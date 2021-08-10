<!--
 * @Author: your name
 * @Date: 2021-07-30 10:38:52
 * @LastEditTime: 2021-08-10 22:10:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-mall\src\views\user\setting.vue
-->

<template>
  <a-header :title="from==='register'?'完善资料':'账号管理'" :backTo="'/user'"></a-header>
  <div class="seting-box">
    <div class="avatar">
      <van-uploader  v-model="face" :max-count="1"  :after-read="afterRead" />
    </div>
    <div class="info__box">
      <van-cell-group inset class="info-item">
        <van-field v-model="username" label="登录名称" readonly />
        <van-field v-model="phone" type="tel" label="手机号码" readonly />
        <van-field v-model="email" label="邮箱" />
        <van-field v-model="question" label="密保问题" />
        <van-field v-model="answer" label="密保答案" />
      </van-cell-group>
      <van-button round class="save-btn" color="#1fa4fc" type="primary" @click="save" block>保存</van-button>
    </div>
    <div class="pwd__box" v-if="from!=='register'">
      <van-cell-group inset class="pwd-item">
        <van-field
          v-model="oldPwd"
          type='password'
          label="旧密码"
          :required="newPwd?true:false"
        />
        <van-field v-model="newPwd" type='password' label="新密码" />
      </van-cell-group>
      <van-button round class="save-btn" color="#1fa4fc" type="primary" @click="changePwd" block>修改密码</van-button>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import { Toast } from 'vant'

import aHeader from '../../components/aHeader'
import { post } from '../../utils/request'
export default {
  name: 'Setting',
  components: {
    aHeader
  },
  setup () {
    const route = useRoute()
    const state = reactive({
      username: '',
      face: [],
      email: '',
      phone: '',
      question: '',
      answer: '',
      oldPwd: '',
      newPwd: '',
      from: route.query.from
    })
    onMounted(async () => {
      const { data } = await post('/user/getUser')
      state.username = data.username
      state.face[0] = { url: data.face }
      state.phone = data.phone
      state.question = data.question
      state.answer = data.answer
      state.email = data.email
    })

    const save = async () => {
      const params = {
        email: state.email,
        question: state.question,
        answer: state.answer,
        face: state.face[0].url
      }
      const res = await post('/user/updateInfo', {}, { params })
      if (res.status === 10000) { Toast.success('保存成功') } else { Toast.fail(res.msg) }
    }

    const changePwd = async () => {
      const params = {
        oldPwd: state.oldPwd,
        newPwd: state.newPwd
      }
      await post('/user/resetPwd', {}, { params })
    }

    const afterRead = async (file) => {
      const formData = new FormData()
      formData.append('file', file.file)
      const { data } = await post('/admin/product/uploadFile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      state.face[0] = { url: data }
    }

    return {
      ...toRefs(state),
      save,
      changePwd,
      afterRead
    }
  }
}
</script>

<style lang="scss" scoped>
.seting-box {
  position: absolute;
  top: .5rem;
  bottom: 0;
  left: 0;
  right: 0;
  padding: .1rem;
  background-color: #f8f8f8;
  .avatar {
    text-align: center;
  }
  .save-btn {
    width: 80%;
    margin: 20px auto ;
  }
}
</style>
