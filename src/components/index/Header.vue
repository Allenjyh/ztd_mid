<template>
  <div>
  <div id="index-header">
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <!--logo-->
          <div style="background:#FFF;width:200px;height:60px; "> 
            <div style="position: absolute;margin-left:20px;top: 15px; ">  
                  <div style=" float: left;"> 
                  <img src="../../../static/image/login/login.png" width="36px" height="36px"/>
                  </div>
                  <div class="headTitle"> 
                  <span>知识传递者</span>
                  </div> 
              </div>
          </div> 
          <!--头像信息栏-->
          <div style="position: absolute;top: 8px;right: 20px;height: 42px;">
            <span class="index-header-userName">你好,{{admin_info.nickname}}</span>
            <img class="Image" :src="admin_info.avatar_url?admin_info.avatar_url:avatar_url" alt="">
            <!-- <img  class="Image" style="padding:3px 0 0" :src="dropdown_url" alt="">  -->  
             <el-select v-model="model"    class="elEdit" > 
               <el-option  style="width:120px;" value="1"> 
                  <span style="float: left;color:yello;">
                    <span class="iconfont">&#xe90e;</span> 
                  </span> 
                  <span style="float: right;  font-size: 13px" @click="gotoCenter">个人中心</span> 
                </el-option> 
               <el-option  style="width:120px;" value="2" > 
                  <span style="float: left;color:yello;"> 
                    <span class="iconfont">&#xe611;</span> 
                  </span> 
                  <span  @click="repeal()" class="headIcon" style=" float: right;  font-size: 13px">退出登录</span> 
                </el-option> 
              </el-select> 
          </div>
        </div>
      </el-col>
    </el-row>
  </div> 
  </div>
</template>
<script>  
  export default {
    name: "Header",

    data() {
      return {
        model:'0',
        //  dropdown_url:'../../../static/image/header-nav/drop-down.png', 
        avatar_url:"../../../static/image/header-nav/head.png",  
        admin_info:{   
            avatar_url:"../../../static/image/header-nav/head.png", 
            nickname: "先生",
        }  
      }
    }, 
    mounted(){ 
      this.params()
    },
    updated(){ 
    },
    methods:{
      params(){
        try { 
          this.admin_info= JSON.parse(localStorage.getItem('ztd_center_login'));   
        } catch (error) {  } 
      },
      repeal(){
        let me = this; 
        this.$alertBox({content:"确定退出登录？",success:function(){
            me.$requestAxios(me,{
              loadingText : '正在退出登录...',
              url : 'login',
              method : 'delete'
            },function(res,opt){
                    // console.log(res) 
              if(res.data.error_code == 200){
                me.$ztdMessage("账号退出成功",'success');
                setTimeout(function(){ 
                  me.$ztdLocalStorage.deleteItem('ztd_center_login'); 
                  window.location.reload() 
                },1000)

              }else if(res.data.error_code == 1010){ 
                me.$ztdLocalStorage.deleteItem('ztd_center_login')//.location();
                window.location.reload() 
              }
            })
          }})
      }, 
      
      gotoCenter(){ 
          this.$router.push( '/center' )  
      },

    }
  }
</script>

<style   > 
  @import "./../../../public/css/aliIcon/iconfont.css";
   .el-header{
      padding: 0!important;
    }
  .el-tabs__item {
    height: 35px!important; 
  }
  .headTitle{
    margin-left: 10px;
    font-size: 21px; 
    font-weight: 400;
    color: #333333;
    line-height: 33px;
    float: left;
  }
 
   /* .el-select-dropdown__item.selected {
        color: red!important;
        font-weight: 700;
    } */
  /* 弹框按钮 */
  .el-message-box__content{
    padding: 10px 20px;
  }
    .el-button--primary, .el-button--primary:hover {
      background-color: #67CFDC !important;
      color: #fff!important;
      border-color: #67CFDC!important;
    }
    .white.el-button,.white.el-button:focus,.white.el-button:hover {
        color: #67CFDC !important;
        border-color: #67CFDC !important;
        background-color: #fff!important;
    } 
   .el-message-box__header{
    padding:15px 20px 10px;
  }
  .el-icon-warning:before {
      content: ""!important;
  }
  .el-message-box__status+.el-message-box__message {
      padding-left: 5px;
      padding-right: 20px;
  }
  .el-message-box__btns button:first-of-type{
    margin-right: 15px;
  }
  .el-message-box__btns button{
      box-shadow: 0px 5px 17px -5px #67CFDC;
      border: none;
      color: #67CFDC;
  }

  #index-header .el-button--small, .el-button--small.is-round {
    padding: 9px 20px;
  }
  .el-message-box__title {
    padding-left: 0;
    margin-bottom: 0;
    font-size: 16px;
    line-height: 1;
    color: #000;
  }
  .el-message-box__headerbtn .el-message-box__close:hover{
    color: #67CFDC;

  }
  /* 弹框按钮 end*/
</style>
  <style scoped>
   
    .bg-purple-dark{
      box-shadow:0px 3px 16px 0px rgba(0,0,0,0.12);
      /* background: #198CFF !important; */
      background: #FFF !important;
    }  
    .index-header-userName {
      font-family: PingFangSC-Regular, sans-serif; 
      height: 42px;
      line-height: 42px; 
      color: #8C8C8C; 
      font-size: 17px;
      float: left;
    } 
     .Image{
        width: 36px;
        height: 36px; 
        border-radius: 36px;
        padding: 3px 0px 0 10px;
        /* padding: 3px 20px 0 10px; */
       float: left;

     }
     .el-select-dropdown__item.selected {
          color: #606266;  
          font-weight: 700;
      }
      .el-select-dropdown__item:hover {
          color: rgba(255,255,255,1)!important;
          background: rgba(35,204,190,1);
      } 
    .elEdit {
      position: absolute;
      right: -2px;
      /* right: 9px; */
      -webkit-transition: -webkit-transform .3s;
      transition: -webkit-transform .3s;
      transition: transform .3s;
      transition: transform .3s, -webkit-transform .3s;
      font-size: 12px;
      opacity: 0.01;
      /* opacity: 1; */
      z-index: 10;
  }
    .el-input--suffix .el-input__inner {
    width: 20px;
}
   

   

    .grid-content {
      min-height: 60px;
    }
    ::-webkit-input-placeholder { /* WebKit browsers */
      color: #FFFFFF !important;
      font-size: 16px;
    }

    ::-moz-placeholder { /* Mozilla Firefox 19+ */
      color: #FFFFFF !important;
      font-size: 16px;
    }

    :-ms-input-placeholder { /* Internet Explorer 10+ */
      color: #FFFFFF !important;
      font-size: 16px;
    }

    #index-header >>> .el-select .el-input {
      width: 130px;
    }

      #index-header >>> .input-with-select .el-input-group__prepend {
      background-color: #fff;
    }

      #index-header >>> .el-input-group {
      width: 346px;
      background: transparent;
    }

      #index-header >>> .el-select .el-input {
      width: 40px;
      background: transparent;
    }

      #index-header >>> .input-with-select .el-input-group__prepend {
      background: transparent;
    }

      #index-header >>> .el-input__inner,  #index-header >>> .el-input-group__append {
      background: transparent;
      /*color: #FFFFFF !important;*/
    }

      #index-header >>> .el-input__inner:active,  #index-header >>> .el-input__inner:focus {
      border-color: #FFFFFF !important;
    }

      #index-header >>> .el-select__caret,  #index-header >>> .el-input__icon, .el-icon-arrow-up {
      color: #FFFFFF !important;
    }

</style>

