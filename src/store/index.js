/*
 * @Author: your name
 * @Date: 2021-07-28 13:53:07
 * @LastEditTime: 2021-07-28 18:33:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-mall\src\store\index.js
 */
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
      const { productInfo, num } = payload
      // console.log(shopId, productInfo._id)
      let cartProductInfo = state.cartList[productInfo._id]
      if (!cartProductInfo) {
        cartProductInfo = productInfo
        cartProductInfo.count = 0
      }
      if (cartProductInfo.count + num >= 0) { cartProductInfo.count += num }
      state.cartList[productInfo._id] = cartProductInfo
    }
  },
  actions: {
  },
  modules: {
  }
})
