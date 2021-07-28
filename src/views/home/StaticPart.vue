<template>
<div class="position">
    <span class="iconfont position__icon">&#xe6b4;</span>
    北京理工大学国防科技园2号楼10层北京理工大学国防科技园2号楼10层
    <span class="iconfont position__notice">&#xe60a;</span>
  </div>
  <div class="search">
    <span class="iconfont">&#xe644;</span>
    <span class="search__input"><input type="text" name="search" placeholder="山姆会员商店优惠商品限时抢购速来,过期不候"></span>
  </div>
  <div class="banner">
    <img class="banner__img" src="http://www.dell-lee.com/imgs/vue3/banner.jpg">
  </div>
  <div class="icons">
    <div
      v-for="item in iconsInfo"
      :key="item.id"
      class="icons__item">
      <img class="icons__item__img"
        :src="item.imgUrl">
      <p class="icons__item__desc">{{item.desc}}</p>
    </div>
  </div>
  <div class="gap"></div>
</template>

<script>
export default {
  name: 'StaticPart',
  setup () {
    const iconsInfo = [
      {
        id: 1,
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/超市.png',
        desc: '超市便利'
      }, {
        id: 2,
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/菜市场.png',
        desc: '菜市场'
      }, {
        id: 3,
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/水果店.png',
        desc: '水果店'
      }, {
        id: 4,
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/鲜花.png',
        desc: '鲜花绿植'
      }, {
        id: 5,
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/医药健康.png',
        desc: '医药健康'
      }, {
        id: 6,
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/家居.png',
        desc: '家居时尚'
      }, {
        id: 7,
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/蛋糕.png',
        desc: '烘焙蛋糕'
      }, {
        id: 8,
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/签到.png',
        desc: '签到'
      }, {
        id: 9,
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/大牌免运.png',
        desc: '大牌免运'
      }, {
        id: 10,
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/红包.png',
        desc: '红包套餐'
      }
    ]
    return {
      iconsInfo
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../style/viriables.scss';
  @import '../../style/mixins.scss';
  .position {
    color: $content-fontcolor;
    position: relative;
    padding: .16rem .24rem .16rem 0;
    line-height: .22rem;
    font-size: .16rem;
    @include ellipsis;
    .position__icon {
      position: relative;
      top: .01rem;
      font-size: .2rem;
    }
    .position__notice {
      position: absolute;
      right: 0;
      top: .17rem;
      font-size: .2rem;
    }
  }
  .search {
    line-height: .32rem;
    background-color: #f5f5f5;
    color: #b7b7b7;
    border-radius: .16rem;
    font-size: .14rem;
    margin-bottom: .12rem;
    &__input {
      padding: 0 .44rem 0 .62rem;
      height: .32rem;
      position: absolute;
      left: 0;
      right: 0;
      top: .57rem;
    }
    input {
      color: #090909;
      box-sizing: border-box;
      background-color: #f5f5f5;
      height: .32rem;
      border: solid 0px;
      width: 100%;
      font-size: .14rem;
    }
    input:focus-visible {
      outline: 0;
    }
    .iconfont {
      position: relative;
      top: .01rem;
      font-size: .2rem;
      display: inline-block;
      padding: 0 .08rem 0 .16rem ;
    }
  }
  .banner {
    height: 0;
    overflow: hidden;
    padding-bottom: 25.4%;
    &__img {
      width: 100%;
    }
  }
  .icons {
    display: flex;
    flex-wrap: wrap;
    margin-top: .16rem;
    &__item {
      width: 20%;
      &__img {
        display: block;
        width: .4rem;
        height: .4rem;
        margin: 0 auto;
      }
      &__desc {
        margin: .06rem 0 .16rem 0;
        text-align: center;
        color: $content-fontcolor;
      }
    }
  }
  .gap {
    height: 10px;
    background-color: #f1f1f1;
    margin: 0 -.18rem;
  }
</style>
