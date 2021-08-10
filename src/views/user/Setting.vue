<!--
 * @Author: your name
 * @Date: 2021-07-30 10:38:52
 * @LastEditTime: 2021-08-10 10:55:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-mall\src\views\user\setting.vue
-->
<!--
 * 严肃声明：
 * 开源版本请务必保留此注释头信息，若删除我方将保留所有法律责任追究！
 * 本系统已申请软件著作权，受国家版权局知识产权以及国家计算机软件著作权保护！
 * 可正常分享和学习源码，不得用于违法犯罪活动，违者必究！
 * Copyright (c) 2020 陈尼克 all rights reserved.
 * 版权所有，侵权必究！
 *
-->

<template>
  <a-header :title="'账号管理'"></a-header>
  <div class="seting-box">
    <div class="avatar">
      <van-uploader  v-model="face" :max-count="1"  :after-read="afterRead" />
    </div>
    <div class="info__box">
      <van-cell-group inset class="info-item">
        <van-field v-model="username" label="登录名称" />
        <van-field v-model="phone" type="tel" label="手机号码" readonly />
        <van-field v-model="email" label="邮箱" />
        <van-field v-model="question" label="密保问题" />
        <van-field v-model="answer" label="密保答案" />
      </van-cell-group>
      <van-button round class="save-btn" color="#1baeae" type="primary" @click="save" block>保存</van-button>
    </div>
    <div class="pwd__box">
      <van-cell-group inset class="pwd-item">
        <van-field
          v-model="oldPwd"
          type='password'
          label="旧密码"
          :required="newPwd?true:false"
        />
        <van-field v-model="newPwd" type='password' label="新密码" />
      </van-cell-group>
      <van-button round class="save-btn" color="#1baeae" type="primary" @click="changePwd" block>修改密码</van-button>
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
      newPwd: ''
    })
    onMounted(async () => {
      if (route.query.from !== 'register') {
        const { data } = await post('/user/getUser')
        state.username = data.username
        state.face[0] = { url: data.face }
        state.phone = data.phone
        state.question = data.question
        state.answer = data.answer
        state.email = data.email
      }
      console.log(state.face)
    })

    const save = async () => {
      const params = {
        email: state.email,
        question: state.question,
        answer: state.answer,
        face: state.face[0].url
      }
      await post('/user/updateInfo', {}, { params })
      Toast.success('保存成功')
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
      console.log(state.face[0])
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
  margin-top: .5rem;
  .avatar {
    text-align: center;
  }
  .save-btn {
    width: 80%;
    margin: 20px auto ;
  }
}
</style>
