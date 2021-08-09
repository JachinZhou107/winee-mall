/*
 * @Author: your name
 * @Date: 2021-07-28 13:53:07
 * @LastEditTime: 2021-07-28 18:33:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-mall\src\store\index.js
 */
import { createStore } from 'vuex'

import { get } from '../utils/request'

export default createStore({
  state: {
    // cartList: {
    //   ShopId: {
    //     ProductId: {
    //       imgUrl: "http://www.dell-lee.com/imgs/vue3/tomato.png",
    //       name: "番茄 250g / 份",
    //       oldPrice: 39.6,
    //       price: 33.6,
    //       sales: 10,
    //       _id: "1",
    //       count: 2
    //     }
    //   }
    // },
    cartCount: 0
  },
  mutations: {
    addCart (state, payload) {
      state.cartCount = payload.count
    }
  },
  actions: {
    async updateCart (state) {
      const { data: { cartProductList } } = await get('/cart/list')
      state.commit('addCart', {
        count: cartProductList.length || 0
      })
    }
  },
  modules: {
  }
})
