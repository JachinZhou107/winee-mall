<template>
  <div class="search">
    <span class="search__title">云逸商城 ｜</span>
    <span class="search__input">
      <router-link to="/product-list?from=home"><span>云蒸霞蔚，逸群绝伦</span></router-link>
    </span>
    <span class="loginInfo">
      <span v-if="loginStatus">
        <router-link to="/user"><van-icon name='user-o' /></router-link>
      </span>
      <span v-else><router-link to="/login"><span style="font-size: .16rem;">登录</span></router-link></span>
    </span>
  </div>
  <van-swipe class="banner" :autoplay="3000" >
    <van-swipe-item v-for="image in images" :key="image">
    <van-image :src="image" fit="contain" height='100%'/>
  </van-swipe-item>
  </van-swipe>
  <van-grid
    :column-num="5"
    :border='false'
  >
    <van-grid-item
      v-for="item in iconsInfo"
      :key="item.id"
      class="icons__item"
      :icon="item.imgUrl"
      :text="item.desc"
    >
    </van-grid-item>
  </van-grid >
</template>

<script>
import { ref } from 'vue'
import { post } from '../../utils/request'
export default {
  name: 'StaticPart',
  setup () {
    const images = [
      'https://img.yzcdn.cn/vant/apple-1.jpg',
      'https://img.yzcdn.cn/vant/apple-2.jpg',
      'http://www.dell-lee.com/imgs/vue3/banner.jpg'
    ]
    const iconsInfo = [
      {
        desc: '云逸超市',
        imgUrl: 'https://s.yezgea02.com/1604041127880/%E8%B6%85%E5%B8%82%402x.png',
        id: 1
      }, {
        desc: '云逸服饰',
        imgUrl: 'https://s.yezgea02.com/1604041127880/%E6%9C%8D%E9%A5%B0%402x.png',
        id: 2
      }, {
        desc: '全球购',
        imgUrl: 'https://s.yezgea02.com/1604041127880/%E5%85%A8%E7%90%83%E8%B4%AD%402x.png',
        id: 3
      }, {
        desc: '云逸生鲜',
        imgUrl: 'https://s.yezgea02.com/1604041127880/%E7%94%9F%E9%B2%9C%402x.png',
        id: 4
      }, {
        desc: '云逸到家',
        imgUrl: 'https://s.yezgea02.com/1604041127880/%E5%88%B0%E5%AE%B6%402x.png',
        id: 5
      }, {
        desc: '充值缴费',
        imgUrl: 'https://s.yezgea02.com/1604041127880/%E5%85%85%E5%80%BC%402x.png',
        id: 6
      }, {
        desc: '9.9元拼',
        imgUrl: 'https://s.yezgea02.com/1604041127880/9.9%402x.png',
        id: 7
      }, {
        desc: '领劵',
        imgUrl: 'https://s.yezgea02.com/1604041127880/%E9%A2%86%E5%88%B8%402x.png',
        id: 8
      }, {
        desc: '省钱',
        imgUrl: 'https://s.yezgea02.com/1604041127880/%E7%9C%81%E9%92%B1%402x.png',
        id: 9
      }, {
        desc: '全部',
        imgUrl: 'https://s.yezgea02.com/1604041127880/%E5%85%A8%E9%83%A8%402x.png',
        id: 10
      }
    ]
    const loginStatus = ref(0)
    const getLoginStatus = async () => {
      const result = await post('/user/getUser')
      if (result?.status === 10000) { return 1 } else return 0
    }
    getLoginStatus().then((res) => {
      loginStatus.value = res
    })
    return {
      iconsInfo,
      images,
      loginStatus
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../style/viriables.scss';
  @import '../../style/mixins.scss';
  .search {
    line-height: .32rem;
    background-color: #f5f5f5;
    color: #b7b7b7;
    border-radius: .16rem;
    font-size: .14rem;
    margin: .12rem .5rem .12rem 0;
    position: relative;
    &__title {
      color: $primary-color;
      font-weight: bold;
      font-size: .2rem;
      padding-left: .15rem;
    }
    &__input {
      margin: 0 .14rem 0 1.26rem;
      height: .32rem;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      a span {
        display: block;
        box-sizing: border-box;
        background-color: #f5f5f5;
        height: .32rem;
        width: 100%;
        border: 0;
        font-size: .14rem;
        color: #b7b7b7;
        @include ellipsis;
      }
    }
    .loginInfo {
      position: absolute;
      right: -0.44rem;
      font-weight: bolder;
      font-size: .26rem;
      a {
        color: $primary-color;
      }
    }
  }
  .banner {
    height: 1.2rem;
    align-content: center;
  }
</style>
