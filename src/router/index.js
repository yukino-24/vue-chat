import Vue from 'vue'
// 该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'

// 引用组件
// import HomeView from '../views/HomeView.vue'
import RoomList from '../views/RoomList.vue'
import ChatBoard from '../views/ChatBoard.vue'
import LoginView from '../views/LoginView.vue'
import SignUp from '../views/SignIn.vue'
// import firebase from "@/firebase/firebase"

Vue.use(VueRouter)

// 创建一个路由器
const routes = [
  {
    path: '/',
    name: 'RoomList',
    component: RoomList,
    meta: { requiresAuth: true }
  },
  {
    path: '/chat',
    name: 'ChatBoard',
    component: ChatBoard
  },
  {
    path: '/login',
    name: 'LoginView',
    component: LoginView
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 暴露一个路由器
export default router

router.beforeEach((to, from, next) => {
  const requiresAuth=to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth) {
    const user =sessionStorage.getItem('user')
    console.log(JSON.parse(user))
    if (!user) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }

    // firebase.auth().onAuthStateChanged((user)=>{
    //   if (!user) {
    //     next({
    //       path: '/login',
    //       query: { redirect: to.fullPath }
    //     })
    //   } else {
    //     next()
    //   }

    // })
  
  
  } else {
    next() // 确保一定要调用 next()
  }
})

