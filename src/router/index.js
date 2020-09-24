import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  routes: [ 
    {
      path: '/login',
      name: 'login',
      component: () =>
        import ('./../components/login/login.vue')
    }, 
    {//图书管理
      path: '/librarian',
      name: 'librarian',
      component: () =>
        import ('./../components/addBook/librarian.vue')
    }, 
    
    {//用户列表
      path: '/',
      name: 'userList',
      component: () =>
        import ('./../components/userList/userList.vue')
    }, 
    {//用户列表
      path: '/userList',
      name: 'userList',
      component: () =>
        import ('./../components/userList/userList.vue')
    },
    {//配送员列表
      path: '/distributorList',
      name: 'distributorList',
      component: () =>
        import ('./../components/userList/distributorList.vue')
    },
    {//订单列表
      path: '/orderList',
      name: 'orderList',
      component: () =>
        import ('./../components/orderList/orderList.vue')
    },
    {//借阅列表
      path: '/bookBorrow',
      name: 'bookBorrow',
      component: () =>
        import ('./../components/orderList/bookBorrow.vue')
    },
    {//还书列表
      path: '/returnList',
      name: 'returnList',
      component: () =>
        import ('./../components/orderList/returnList.vue')
    },
    {//缺书反馈
      path: '/feedback',
      name: 'feedback',
      component: () =>
        import ('./../components/feedback/feedback.vue')
    },
    {//用户余额
      path: '/userBalance',
      name: 'userBalance',
      component: () =>
        import ('./../components/userBalance/userBalance.vue')
    },
    {//通用设置
      path: '/setUp',
      name: 'setUp',
      component: () =>
        import ('./../components/setUp/setUp.vue')
    },
    {//安装包更新
      path: '/package',
      name: 'package',
      component: () =>
        import ('./../components/setUp/package.vue')
    },
    {//广告位上传
      path: '/adsense',
      name: 'adsense',
      component: () =>
        import ('./../components/setUp/adsense.vue')
    },
    {//个人中心
      path: '/center',
      name: 'center',
      component: () =>
        import ('./../components/setCenter/center.vue')
    },
    {//个人中心
      path: '/upload-info',
      name: 'upload-info',
      component: () =>
        import ('./../components/upload-info.vue')
    },
    {//用户列表
      path: '/test',
      name: 'test',
      component: () =>
        import ('./../components/userList/test.vue')
    },

  ]
})
