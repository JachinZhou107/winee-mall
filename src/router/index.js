/*
 * @Author: your name
 * @Date: 2021-07-28 13:53:07
 * @LastEditTime: 2021-07-29 20:09:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-mall\src\router\index.js
 */
import { createRouter, createWebHashHistory } from 'vue-router'
import { post } from '../utils/request'

const getLoginStatus = async () => {
  const result = await post('/api/user/getUser', {})
  if (result?.status === 10000) { return 1 } else return 0
}
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/home/Home')
  },
  {
    path: '/category',
    name: 'Category',
    component: () => import(/* webpackChunkName: "category" */ '../views/category/Category')
  },
  {
    path: '/product-detail/:id',
    name: 'ProductDetail',
    component: () => import(/* webpackChunkName: "product-detail" */ '../views/productDetail/ProductDetail')
  },
  {
    path: '/product-list',
    name: 'ProductList',
    component: () => import(/* webpackChunkName: "product-list" */ '../views/productList/ProductList')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/Login'),
    beforeEnter: (to, from, next) => {
      getLoginStatus()
        .then((res) => {
          const isLogin = res
          console.log(isLogin);
          (isLogin ? next({ name: 'Home' }) : next())
        })
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/register/Register'),
    beforeEnter: (to, from, next) => {
      getLoginStatus()
        .then((res) => {
          const isLogin = res
          console.log(isLogin);
          (isLogin ? next({ name: 'Home' }) : next())
        })
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  console.log(to, from)
  getLoginStatus()
    .then((res) => {
      const isLogin = res;
      (isLogin || to.name === 'Login' || to.name === 'Register' || to.name === 'Home') ? next() : next({ name: 'Login' })
    })
})

export default router
