/*
 * @Author: your name
 * @Date: 2021-07-28 13:53:07
 * @LastEditTime: 2021-08-10 22:11:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-mall\src\utils\request.js
 */
import axios from 'axios'

const instance = axios.create({
  // baseURL: 'https://nwcts.uuuvw.xyz',
  baseURL: 'https://mall.uuuvw.xyz',
  timeout: 10000,
  withCredentials: true
})

export const post = (url, data, config) => {
  return new Promise((resolve, reject) => {
    instance.post(url, data, {
      ...config,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      resolve(response.data)
    }, err => {
      reject(err)
    })
  })
}
export const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    instance.get(url, { params }).then((response) => {
      resolve(response.data)
    }, err => {
      reject(err)
    })
  })
}
