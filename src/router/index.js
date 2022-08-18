import Vue from 'vue'
import VueRouter from 'vue-router'
const home = () =>import('views/home/home')
const selfCenter = () =>import('views/selfcenter/selfCenter')
const editor = () =>import('views/editor/Editor')
const articleContent = () =>import('views/articlecontent/articleContent')
const about=()=>import('views/about/about')
const login=()=>import('views/login/login')
const searched=()=>import('views/search/search')
const atlas=()=>import('views/atlas/atlas')
const messageBoard=()=>import('views/messageBoard/messageBoard')

Vue.use(VueRouter)
const routes=[
    {
       path:'',
       redirect:'/home'
    },
    {
       path:'/home',
       name:'home',
       component:home,
       meta: {
        keepAlive: true, //需要被缓存
        // Author:true //需要被校验
        title:'首页'
    }
    },
    {
       path:'/editor',
       name:'editor',
       component:editor,
       meta: {
        title:'编辑'
     }
    },
    {
        path:'/selfCenter',
        name:'selfCenter',
        component:selfCenter,
        meta: {
            title:'个人中心'
         }
    },
    {
        path:'/articlecontent/:id',
        name:'articlecontent',
        component:articleContent,
        meta: {
            title:'文章'
         }
    },
    {
        path:'/about',
        name:'about',
        component:about,
        meta: {
            Author:true, //需要被校验
            title:'关于'
        }
    },
    {
        path:'/login',
        name:'login',
        component:login,
        meta: {
            Author:true, //需要被校验
            title:'登录'
         }
    },
    {
        path:'/searched',
        name:'searched',
        component:searched,
        meta: {
            Author:true, //需要被校验
            title:'更多文章'
        }
    },
    {
        path:'/atlas',
        name:'atlas',
        component:atlas,
        meta: {
            Author:true, //需要被校验
            title:'图集'
        }
    },
    {
        path:'/messageBoard',
        name:'messageBoard',
        component:messageBoard,
        meta: {
            Author:true ,//需要被校验
            title:'留言板'
        }
    },
    
   
 ]


 const router = new VueRouter({
    routes,
    mode:'history'
 })
 const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


export default router