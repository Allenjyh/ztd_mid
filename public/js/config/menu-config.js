module.exports = [
  {
    id: 'basic',
    name: '图书管理',
    icon: 'iconnav',
    sub: [{
      name: '图书管理',
      componentName: 'librarian',
      value: { path: '/librarian'} 
    }]
  },
  {
    id: 'userList',
    name: '用户列表',
    icon: 'iconuser-voice-fill',
    sub: [
      {
      name: '用户列表',
      componentName: 'userList',
      value: { path: '/userList'} 
      },
      {
      name: '配送员列表',
      componentName: 'distributorList',
      value: { path: '/distributorList'} 
     },
  ]
  },
  {
    id: 'orderList',
    name: '图书借阅',
    icon: 'iconbook',
    sub: [
      {
        name: '订单列表',
        componentName: 'orderList',
        value: { path: '/orderList'} 
      },
      {
        name: '借阅列表',
        componentName: 'bookBorrow',
        value: { path: '/bookBorrow'} 
      },
      {
        name: '还书列表',
        componentName: 'returnList',
        value: { path: '/returnList'} 
      },
    ]
  },
  {
    id: 'feedback',
    name: '缺书反馈',
    icon: 'iconfeedback',
    sub: [{
      name: '缺书反馈',
      componentName: 'feedback',
      value: { path: '/feedback'} 
    }]
  },
  {
    id: 'userBalance',
    name: '充值模版',
    icon: 'iconrecharge',
    sub: [{
      name: '用户余额',
      componentName: 'userBalance',
      value: { path: '/userBalance'} 
    }]
  },
  {
    id: 'setUp',
    name: '通用设置',
    icon: 'iconset',
    sub: [
      {
      name: '通用设置',
      componentName: 'setUp',
      value: { path: '/setUp'} 
    },
      {
      name: '安装包更新',
      componentName: 'package',
      value: { path: '/package'} 
    },
      {
      name: '广告位上传',
      componentName: 'adsense',
      value: { path: '/adsense'} 
    },
  ]
  },
] 
    