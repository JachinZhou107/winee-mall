/*
 * @Author: your name
 * @Date: 2021-07-28 13:53:07
 * @LastEditTime: 2021-07-30 10:10:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-mall\src\main.js
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {
  Tabs,
  Tab,
  List,
  PullRefresh,
  DropdownMenu,
  DropdownItem,
  Toast
} from 'vant'
import 'normalize.css'
import './style/index.scss'
import 'vant/lib/index.css'

Toast.setDefaultOptions({ duration: 1000 })

createApp(App)
  .use(store)
  .use(router)
  .use(Tabs)
  .use(Tab)
  .use(List)
  .use(PullRefresh)
  .use(DropdownMenu)
  .use(DropdownItem)
  .use(Toast)
  .mount('#app')
