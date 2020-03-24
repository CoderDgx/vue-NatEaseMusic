import Vue from 'vue'
import VueRouter from 'vue-router'

const Rank = () => import('views/rank/Rank')
const Recommend = () => import('views/recommend/Recommend')
const Search = () => import('views/search/Search')
const Singer = () => import('views/singer/Singer')
const SingerDetail = () => import('components/content/singerDetail/SingerDetail')
const Disc = () => import('components/content/disc/Disc')
const TopList = () => import('components/content/topList/TopList')
const UserCenter = () => import('views/userCenter/UserCenter')

  Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    component: Recommend,
    children: [
      {
        path: ':id',
        component: Disc
      }
    ]
  },
  {
    path: '/rank',
    component: Rank,
    children: [
      {
        path: ':id',
        component: TopList
      }
    ]
  },
  {
    path: '/singer',
    component: Singer,
    children: [
      {
        path: ':id',
        component: SingerDetail
      }
    ]
  },
  {
    path: '/search',
    component: Search,
    children: [
      {
        path: ':id',
        component: SingerDetail
      }
    ]
  },
  {
    path: '/user',
    component: UserCenter
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
