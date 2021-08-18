/*
 * @Author: your name
 * @Date: 2021-07-28 13:53:07
 * @LastEditTime: 2021-08-18 09:07:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-mall\src\store\index.js
 */
import { createStore } from 'vuex'

import { get } from '../utils/request'

export default createStore({
  state: {
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
