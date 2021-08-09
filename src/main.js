/*
 * @Author: your name
 * @Date: 2021-07-28 13:53:07
 * @LastEditTime: 2021-08-09 23:23:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-mall\src\main.js
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {
  Icon,
  Tabs, Tab,
  List,
  PullRefresh,
  DropdownMenu, DropdownItem,
  Toast, Dialog,
  NavBar,
  Image as VanImage,
  Card,
  Cell, CellGroup,
  Grid, GridItem,
  Swipe, SwipeItem, SwipeCell,
  Sidebar, SidebarItem,
  Tabbar, TabbarItem,
  Collapse, CollapseItem,
  ActionBar, ActionBarIcon, ActionBarButton,
  Checkbox, CheckboxGroup,
  Stepper,
  Button,
  Radio,
  SubmitBar,
  AddressList, AddressEdit,
  Popup,
  Pagination,
  Field,
  Uploader
} from 'vant'
import 'normalize.css'
import './style/index.scss'
import 'vant/lib/index.css'

Toast.setDefaultOptions({ duration: 1000 })

createApp(App)
  .use(store)
  .use(router)
  .use(Icon)
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
  .use(Card)
  .use(Grid)
  .use(GridItem)
  .use(Swipe)
  .use(SwipeItem)
  .use(Sidebar)
  .use(SidebarItem)
  .use(SwipeCell)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Collapse)
  .use(CollapseItem)
  .use(ActionBar)
  .use(ActionBarIcon)
  .use(ActionBarButton)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(Stepper)
  .use(Button)
  .use(Radio)
  .use(SubmitBar)
  .use(AddressList)
  .use(AddressEdit)
  .use(Pagination)
  .use(Popup)
  .use(Field)
  .use(Uploader)
  .use(Dialog)
  .use(Toast)
  .mount('#app')
