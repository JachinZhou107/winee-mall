import { createStore } from 'vuex'

export default createStore({
  state: {
    cartList: {
      // ShopId: {
      //   ProductId: {
      //     imgUrl: "http://www.dell-lee.com/imgs/vue3/tomato.png",
      //     name: "番茄 250g / 份",
      //     oldPrice: 39.6,
      //     price: 33.6,
      //     sales: 10,
      //     _id: "1",
      //     count: 2
      //   }
      // }
    }
  },
  mutations: {
    changeItemInCart (state, payload) {
      const { shopId, productInfo, num } = payload
      // console.log(shopId, productInfo._id)
      let cartShopInfo = state.cartList[shopId]
      if (!cartShopInfo) {
        cartShopInfo = {}
      }
      let cartProductInfo = cartShopInfo[productInfo._id]
      if (!cartProductInfo) {
        cartProductInfo = productInfo
        cartProductInfo.count = 0
      }
      if (cartProductInfo.count + num >= 0) { cartProductInfo.count += num }
      cartShopInfo[productInfo._id] = cartProductInfo
      state.cartList[shopId] = cartShopInfo
    }
  },
  actions: {
  },
  modules: {
  }
})
