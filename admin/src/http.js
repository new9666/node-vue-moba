import axios from 'axios';

import Vue from 'vue';

import router from './router'

let http = axios.create({
  baseURL: 'http://localhost:3000/admin/api'
})


http.interceptors.request.use(config => {

  if (localStorage.token) {
    config.headers.Authorization = "Bearer " + localStorage.token;
  }

  return config;
}, error => {
  return Promise.reject(error);
})



http.interceptors.response.use(res => {
  return res;
}, error => {

  // console.log()
  if (error.response.data.msg) {
    Vue.prototype.$message({
      type: 'error',
      message: error.response.data.msg
    })

    if (error.response.status === 401) {
      // console.log(error.response.status, '请先登录')
      router.push('/login')
    }
  }

  return Promise.reject(error);
})

export default http;