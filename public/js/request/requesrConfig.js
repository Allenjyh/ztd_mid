let requestConfig = "";

// 开发环境
if (process.env.NODE_ENV == 'development') { 

  requestConfig = 'http://bktc.yizufw.com'
  // requestConfig = 'http://ktc_admin.zscdzhe.com'
 

  
}
// 测试环境
else if (process.env.NODE_ENV == 'debug') {
  requestConfig = 'http://bktc.yizufw.com'
  
}
// 生产环境
else if (process.env.NODE_ENV == 'production') {
  // requestConfig = 'http://bktc.yizufw.com'
  requestConfig = 'http://ktc_admin.zscdzhe.com'
  
  //  'http://mktc.yizufw.com'//后台网站
  // http://admin.zscdzhe.com/   正式的借书后台地址
}

export default requestConfig
