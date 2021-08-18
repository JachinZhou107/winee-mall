/*
 * @Author: your name
 * @Date: 2021-07-28 13:53:07
 * @LastEditTime: 2021-08-10 22:11:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-mall\src\router\index.js
 */
import { createRouter, createWebHashHistory } from 'vue-router'
import { Toast } from 'vant'
import { post } from '../utils/request'

const getLoginStatus = async () => {
  // return 1
  const result = await post('/user/getUser')
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
    path: '/cart',
    name: 'Cart',
    component: () => import(/* webpackChunkName: "cart" */ '../views/cart/Cart')
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import(/* webpackChunkName: "order" */ '../views/order/Order')
  },
  {
    path: '/create-order',
    name: 'CreateOrder',
    component: () => import(/* webpackChunkName: "create-order" */ '../views/order/CreateOrder')
  },
  {
    path: '/order-detail',
    name: 'OrderDetail',
    component: () => import(/* webpackChunkName: "order-detail" */ '../views/order/OrderDetail')
  },
  {
    path: '/pay_return',
    name: 'PayReturn',
    component: () => import(/* webpackChunkName: "pay_return" */ '../views/order/PayReturn')
  },
  {
    path: '/pay_quit',
    name: 'PayQuit',
    component: () => import(/* webpackChunkName: "pay_quit" */ '../views/order/PayReturn')
  },
  {
    path: '/user',
    name: 'User',
    component: () => import(/* webpackChunkName: "product-list" */ '../views/user/User')
  },
  {
    path: '/setting',
    name: 'Setting',
    component: () => import(/* webpackChunkName: "product-list" */ '../views/user/Setting')
  },
  {
    path: '/address',
    name: 'Address',
    component: () => import(/* webpackChunkName: "address" */ '../views/address/Address')
  },
  {
    path: '/edit-address',
    name: 'EditAddress',
    component: () => import(/* webpackChunkName: "edit-address" */ '../views/address/EditAddress')
  },
  {
    path: '/add-comment',
    name: 'AddComment',
    component: () => import(/* webpackChunkName: "add-comment" */ '../views/comment/AddComment')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/Login'),
    beforeEnter: (to, from, next) => {
      getLoginStatus()
        .then((res) => {
          const isLogin = res;
          (isLogin ? next({ name: 'Home' }) : next())
        })
    }
  },
  {
    path: '/code-login',
    name: 'CodeLogin',
    component: () => import(/* webpackChunkName: "code-login" */ '../views/login/CodeLogin'),
    beforeEnter: (to, from, next) => {
      getLoginStatus()
        .then((res) => {
          const isLogin = res;
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
          const isLogin = res;
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
  getLoginStatus()
    .then((res) => {
      const isLogin = res
      if (isLogin || to.name === 'Login' || to.name === 'CodeLogin' || to.name === 'Register' || to.name === 'Home') {
        if (to.path === '/home') {
          next({ name: 'Home' })
        } else next()
      } else {
        Toast.fail('请先登录')
        next({ name: 'Login' })
      }
    })
})

export default router
