/*
 * @Author: your name
 * @Date: 2021-07-28 13:53:07
 * @LastEditTime: 2021-07-30 15:32:21
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
  Toast,
  NavBar,
  Image as VanImage,
  Cell,
  CellGroup
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
  .use(NavBar)
  .use(VanImage)
  .use(Cell)
  .use(CellGroup)
  .use(Toast)
  .mount('#app')
