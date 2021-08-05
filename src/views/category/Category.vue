<template>
<div class="wrapper">
  <div class="search">
    <div
      class="search__backarrow"
      @click="handleGoBack()"
    ><b></b><i></i></div>
    <div class="search__content">
      <span class="iconfont">&#xe644;</span>
      <span class="search__content__input" >
        <router-link to="/product-list?from=home"><span>鸿星尔克促销！全场五十元起步</span></router-link>
      </span>
    </div>
  </div>
  <Content />
</div>
<Docker currentPage="1"/>
</template>

<script>
import { useRouter } from 'vue-router'
import Content from './Content'
import Docker from '../../components/Docker'

export default {
  name: 'Category',
  components: {
    Content,
    Docker
  },
  setup () {
    const router = useRouter()
    const handleGoBack = () => {
      router.back()
    }
    return { handleGoBack }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixins.scss';
.wrapper {
  padding: 0 .18rem;
  .search {
    margin: .16rem 0 .04rem .29rem;
    line-height: .32rem;
    background-color: #f5f5f5;
    color: #b7b7b7;
    border-radius: .16rem;
    font-size: .14rem;
    &__backarrow {
      position: absolute;
      width: .30rem;
      height: .32rem;
      left: 18px;
      b {
        position: absolute;
        left: .03rem;
        top: .09rem;
        width: .15rem;
        height: .15rem;
        background-color: #b6b6b6;
        transform: rotate(45deg);
      }
      i {
        position: absolute;
        left: .05rem;
        top: .09rem;
        width: .15rem;
        height: .15rem;
        background-color: white;
        transform: rotate(45deg);
      }
    }
    &__content {
      &__input {
        margin: 0 .44rem 0 .9rem;
        height: .32rem;
        position: absolute;
        left: 0;
        right: 0;
        top: .17rem;
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
      .iconfont {
        position: relative;
        top: .01rem;
        font-size: .2rem;
        display: inline-block;
        padding: 0 .08rem 0 .16rem ;
      }
    }
  }
}
</style>
