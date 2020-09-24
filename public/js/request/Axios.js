import Qs from 'qs'
import Axios from 'axios'
// import { Message } from 'element-ui'
import requestConfig from './requesrConfig'
 
Axios.defaults.baseURL = requestConfig;
console.log(requestConfig)


const requestAxios = {
    interface : {
        //登录
        login : '/login',
        // 个人中心，编辑管理员信息
        editAdminData : '/editAdminData', 
        //获取qiniuToken  
        qiniuToken : '/qiniuToken', //?bucket=PICS_BUCKET
        //获取所有用户列表数据
        userList : '/userList',  
        //对用户信息进行增删改
        userInfo : '/userInfo',  
        //激活用户
        activateUser : '/activateUser',  
        //获取Excel导入的图书列表数据
        bookList : '/bookList',  
        //对Excel导入的书籍进行增删改查
        book : '/book',  
        //缺书反馈列表，删除反馈图书
        feedback : '/feedback', 

        // 图书借阅 
        //type 模块 1订单列表 2借阅列表 3还书列表
        //state 订单列表（1新订单 2已接单 3配送中）借阅列表（1借阅中 2快到期 3已到期）还书列表（5预约还书 6已接单 7已取书 8检损中 9已完成）
       
        //1.图书借阅列表 order/list   
        //2.订单详情  order/show    
        //3.接收图书  order/receiveTheBook   
        //4.检损(修改为状态9完成)  order/checkLoss
        //5.撤销订单  order/repeal
        order : '/order',  

        //用户列表  recharge/list 
        //余额列表  recharge/record 
        recharge : '/recharge',  

        //获取配置信息
        setting : '/setting', 

        //安装包更新  get方法：获取版本号列表数据；post方法：增加数据； delete方法：删除数据
        appVersion : '/appVersion', 

        //广告位    get广告位列表, post 广告位上传, put 广告位置顶, delete广告位删除
        banner : '/banner',  
        
    }
}
requestAxios.setAxios = function($vue,opt,fn,eorr){ 

    let me = this;

    try {
      // console.log(opt);  
      // console.log((requestAxios.interface[opt.url] ? requestAxios.interface[opt.url] : "") +(opt.urlParam ? opt.urlParam : '' ));

    }catch (e) {
  
    } 

    let loading = "";

    if(!opt.loading){
       loading = $vue.$loading({
        lock: true,
        text: opt.loadingText ? opt.loadingText : 'Loading',
        spinner: opt.spinner ? opt.spinner : 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)', 
      });
    } 

    Axios({
        method: opt.method ? opt.method : 'get',
    
        url: (requestAxios.interface[opt.url] ? requestAxios.interface[opt.url] : "") +(opt.urlParam ? opt.urlParam : '' ),
        
     
        data:Qs.stringify(opt.data),

        headers: {
          'Content-Type':'application/x-www-form-urlencoded',
          // 'AUTHORIZATION':uni.getStorageSync('user_token')?uni.getStorageSync('user_token'):'' ,
        },
        withCredentials:true,  

      }).then(function(res){


        if(loading){
          loading.close();
        }
        try {
            console.log(res,opt);
          }catch (e) {
      
          }

        if(res.data.error_code == 200){
            if(typeof fn == "function"){
                fn(res,opt,$vue);
            }
        }else if(res.data.error_code == 1002){//登录失败
           $vue.$ztdMessage(  res.data.message+' !','error' )  
              
        }else if(res.data.error_code == 1008){//请登录
            localStorage.removeItem('ztd_center_login')
            window.location.reload() 
          // $vue.$router.push("/login")
        }else if(res.data.error_code == 1010){
            $vue.$ztdMessage(res.data.data ? res.data.data : res.data.message, 'warning'); 
            // $vue.$ztdLocalStorage.deleteItem('ztd_center_login')
            // $vue.$router.go(0)
        }else if(res.data.error_code == 2023){
               $vue.$router.push("/")

        }else{
          console.log($vue)
          $vue.$ztdMessage(res.data.data ? res.data.data : res.data.message, 'warning');

            if(eorr){
                eorr(res,opt)
              }
        }
        

      }).catch(function(err){


        if(loading){
          loading.close();
        }

        if(eorr){
          eorr(err)
          return;
        }
        
        $vue.$ztdAlert("服务器繁忙，请稍后再试！");
        console.log(err);
      });

}
export {  requestAxios }
 
// this.$requestAxios(this,{
//     url : 'login',
//     data : {},
//     method : 'get',
    // urlParam :'/132'
//   },function(res,opt){
//     self.managerOptions =res.data.data
// })