import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入主页
import Home from '../views/Home.vue'
// 导入云村
import yuncun from '../views/yuncun.vue'
// 歌单详情
import songsdetail from '../views/songsdetail.vue'
// 搜索页面
import Search from '@/views/Search.vue'
// 搜索结果页面
import searchlist from '@/views/searchList.vue'
// 用户
import user from '@/views/user.vue'
// 每日推荐 
import album from '@/views/album.vue'

// 每日推荐 
import dayrec from '@/views/dayRec.vue'
// 歌单广场 
import songsquare from '@/views/songsquare.vue'
// 歌单标签
import songslabel from '@/views/songslabel.vue'
// 歌单分类
import songsort from '@/views/songsort.vue'
// 排行榜
import rankinglist from '@/views/rankinglist.vue'
// 排行榜详情
import rankingdetail from '@/views/rankingdetail.vue'


// 歌手
import singer from '@/views/singer.vue'
// 歌手标签
import singerlabel from '@/views/singerlabel.vue'
// 歌手详情
import singerdetail from '@/views/singerdetail.vue'

// 视频
import videos from '@/views/videos.vue'

// 登录
import Login from '@/views/Login.vue'

// 播客
import boke from '@/views/boke.vue'
// 播单广场
import bosquare from '@/views/bosquare.vue'
// 播单详情 
import bodetail from '@/views/bodetail.vue'

// 我的
import myself from '@/views/myself.vue'
// K歌
import Ksings from '@/views/Ksings.vue'

// MV
import Mv from '@/views/Mv.vue'

// MV广场
import Mvsquare from '@/views/Mvsquare.vue'
Vue.use(VueRouter)

const routes = [
  {
    // 主页面
    path: '/',
    name: 'Home',
    component: Home,
    meta: { showNav: true }

  },
  {
    // 云村
    // 主页面
    path: '/yuncun',
    name: 'yuncun',
    component: yuncun,
    meta: { showNav: true }

  },
  // 歌单详情
  {
    path: '/songsdetail/:id',
    name: 'songsdetail',
    component: songsdetail,
    props: true,
    meta: { showNav: false }

  },
  {
    // 搜索页面
    path: '/search',
    name: 'Search',
    component: Search,
    meta: { showNav: false }
  },
  // 搜索结果页面
  {
    path: '/searchlist/:name',
    name: 'searchlist',
    props: true,
    component: searchlist,
    meta: { showNav: false }
  },
  // 专辑页面
  {
    path: '/album/:id',
    name: 'album',
    component: album,
    props: true,
    meta: { showNav: false }
  },
  // 用户页面
  {
    path: '/user/:id',
    name: 'user',
    component: user,
    props: true,
    meta: { showNav: false }
  },
  // 每日推荐
  {
    path: '/dayrec',
    name: 'dayrec',
    component: dayrec,
    meta: { showNav: false }
  },
  // 歌单广场 
  {
    path: '/songsquare',
    name: 'songsquare',
    component: songsquare,
    meta: { showNav: false }
  },
  // 歌单标签 
  {
    path: '/songslabel',
    name: 'songslabel',
    component: songslabel,
    meta: { showNav: false }
  },
  // 歌单分类
  {
    path: '/songsort/:name',
    name: 'songsort',
    component: songsort,
    meta: { showNav: false },
    props: true,
  },
  // 排行榜 
  {
    path: '/rankinglist',
    name: 'rankinglist',
    component: rankinglist,
    meta: { showNav: false }
  },
  // 排行榜 详情
  {
    path: '/rankingdetail',
    name: 'rankingdetail',
    component: rankingdetail,
    meta: { showNav: false }
  },
  // 歌手 
  {
    path: '/singer',
    name: 'singer',
    component: singer,
    meta: { showNav: false }
  },
  // 歌手 标签
  {
    path: '/singerlabel',
    name: 'singerlabel',
    component: singerlabel,
    meta: { showNav: false }
  },
  // 歌手 详情
  {
    path: '/singerdetail/:id',
    name: 'singerdetail',
    component: singerdetail,
    meta: { showNav: false },
    props: true,
  },
  // 视频 详情
  {
    path: '/videos/:id',
    name: 'videos',
    component: videos,
    meta: { showNav: false },
    props: true,
  },

  {//登录页面
    path: '/login',
    name: 'Login',
    component: Login
  },
  {//播客
    path: '/boke',
    name: 'boke',
    component: boke,
    meta: { showNav: true },
  },
   {//播单广场
    path: '/bosquare',
    name: 'bosquare',
    component: bosquare,
    meta: { showNav: false },
  },
    {//播单详情
      path: '/bodetail/:id',
      name: 'bodetail',
      component: bodetail,
    props: true,
      meta: { showNav: false },
    },
  {//我的
    path: '/myself',
    name: 'myself',
    component: myself
  },
  {//K歌
    path: '/Ksings',
    name: 'Ksings',
    component: Ksings
  },
  // mv 
  {
    path: '/mv/:id',
    name: 'mv',
    component: Mv,
    props: true,
    meta: { showNav: false }
  },
  // Mv广场
   {//K歌
    path: '/Mvsquare',
    name: 'Mvsquare',
    component: Mvsquare
  },
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  try {
    if (to.name == 'dayrec' || to.name == 'yuncun' || to.name == 'myself' || to.name == 'Ksings') {
      let username = sessionStorage.getItem('username');
      let password = sessionStorage.getItem('password');
      let code = sessionStorage.getItem('code');

      if (code == 200) {
        next()
      } else {
        next('/login')
      }
    } else {
      next()
    }
  }
  catch { () => { } }
})
export default router
