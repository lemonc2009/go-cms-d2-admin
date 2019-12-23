import Vue from 'vue'
import i18n from './i18n'
import App from './App'
import store from '@/store'
import d2Admin from '@/plugin/d2admin'

import router, { constantRoutes } from './router'
import menu from '@/menu'
import menuHeader from '@/menu/header'

import './permission'

Vue.use(d2Admin)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  async created () {
    // 处理路由 得到每一级的路由设置
    this.$store.commit('d2admin/page/init', constantRoutes)
    // 设置顶栏菜单
    this.$store.commit('d2admin/menu/headerSet', menuHeader)
    // 设置侧边栏菜单
    this.$store.commit('d2admin/menu/asideSet', menu)
    // 初始化菜单搜索功能
    this.$store.commit('d2admin/search/init', menu)
    // 加载接口配置
    await this.$store.dispatch('d2admin/api/load')
  },
  async mounted () {
    // 展示系统信息
    this.$store.commit('d2admin/releases/versionShow')
    // 用户登录后从数据库加载一系列的设置
    await this.$store.dispatch('d2admin/sys/load')
    // 获取并记录用户 UA
    this.$store.commit('d2admin/ua/get')
    // 初始化全屏监听
    this.$store.commit('d2admin/fullscreen/listen')
  }
}).$mount('#app')
