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
  DropdownItem
} from 'vant'
import 'normalize.css'
import './style/index.scss'
import 'vant/lib/index.css'

createApp(App)
  .use(store)
  .use(router)
  .use(Tabs)
  .use(Tab)
  .use(List)
  .use(PullRefresh)
  .use(DropdownMenu)
  .use(DropdownItem)
  .mount('#app')
