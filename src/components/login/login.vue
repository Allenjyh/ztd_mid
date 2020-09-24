<template>
    <div class="login">  
        <div class="loginBox"> 
            <el-row>
                <el-col :span="24">
                    <el-col :span="12">
                        <div class="left_box">
                            <div class="left-top" >
                                <div >我们的<span>图书</span>资源库</div> 
                                <div style="position: relative;"><i class="bookIcon"></i></div>
                            </div>
                            <div class="left-bottom"> <p> 知识传递者后台管理系统</p></div>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="right_box">
                            <div>
                                <div class="login_top">
                                    <div class="image"><img src="../../../static/image/login/login.png" alt="">   </div>
                                    <p>知识传递着后台系统</p>
                                </div>
                                <el-form :model="ruleForm"   ref="ruleForm">
                                    <div class="login-right-conten"> 
                                    <el-form-item prop="admin_name" :rules="[{ required: true, message: '请输入账号'} ]" >
                                    <el-input    class="login-phone"  v-model="ruleForm.admin_name" placeholder="账号"   :maxlength="18"    clearable>
                                    </el-input>
                                        <!-- <i class="iconfont  "></i> -->
                                        <i class="el-icon-s-custom iconfont"></i>
                                    </el-form-item>
                                    <el-form-item prop="password" :rules="[{required:true,message:'请输入密码'}]">
                                        <el-input   class="login-pwd" v-model="ruleForm.password"   placeholder="密码"  :maxlength="18"    show-password></el-input>
                                        <i class="el-icon-lock iconfont  "></i>
                                        <!-- <i class="iconfont icon-pwd"></i> --> 
                                    </el-form-item>
                                    <div class="login-btn" v-if="ruleForm.admin_name && ruleForm.password" slot="reference" @click="login('ruleForm')">登录</div>
                                    <div class="login-btn" v-else  style="opacity: 0.4;">登录</div>
                                    </div>
                                </el-form>
                            </div>
                        </div>
                    </el-col>
                </el-col>
            </el-row>
        </div>  
    </div>  
</template>
<script> 

  export default {
    name: "login",

    data() {
      return {
             ruleForm: {
        //   admin_name: '灿',//账号
        //   password:'123456',//密码
          admin_name: 'admin',//账号
          password:'123',//密码
        },  
         

      }
    }, 
    mounted(){
                       
                
    },
    methods:{
        login(formName){ 
            this.$refs[formName].validate((valid) => {
            if (valid) {  //登录状态执行 
              
               console.log(this.ruleForm)
                 let me = this;
                me.$requestAxios(me,{
                    loadingText : '系统正在拼命登录中...', 
                    url : 'login',
                    data : me.ruleForm ,
                    method : 'POST',
                    urlParam :' '
                },function(res,opt){
                    console.log(res)
                    if (res.data.error_code == 200) {
                        me.$ztdMessage(  '恭喜~ 登录成功啦 !',   'success' )  
                        me.$ztdLocalStorage.setLocalStorage('ztd_center_login',res.data.data.admin_info).location(); 
                    }

                })  
                
                    // me.$router.push( '/librarian' )
             
                        
                

            } else {
                this.$message.error('登录失败，账号或密码不正确!');
                return false;
            }
            });
    },
    }
  }
</script>

<style scoped> 
  /*@import "./../../public/css/header.css";*/ 
    p{
        padding: 0;
        margin: 0;
    }
     .login{
         width: 100vw;
         height: 100vh;
         background-image: url('../../../static/image/login/background.png'); 
        background-size: 100vw 100vh;
        background-repeat: no-repeat;
        display: flex;
        flex-direction: column;
     }
      body{
      min-width: 1280px;
      min-height: 608px; 
    } 
    .login .loginBox  { 
        width: 1000px; 
        height: 580px;  
        margin:  auto auto ;
        background: #fff;
        border-radius: 20px; 
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }
    .loginBox  .left_box{
        width: 500px;
        height: 580px;
        background-image: url('../../../static/image/login/leftBackground.png');
        background-size: 500px 580px;
        background-repeat: no-repeat;
    } 
    .loginBox  .left_box .left-top{ 
        font-size: 35px; 
        font-weight: 800;
        color: #FFFFFF;
        line-height: 49px;
        letter-spacing: 2px;
        padding-top: 211px; 
        margin-left: 92px;
    }
    .loginBox   .left_box .left-top span{ 
        color: rgba(255, 255, 255, 0.65);
    }
    .loginBox  .left_box .left-bottom{ 
        font-size: 16px;  
        color: #FFFFFF;
        line-height: 34px;
        padding-top: 236px;
        text-align: center; 
    }
    .loginBox  .left_box .bookIcon{
        position: absolute;
        top: -45px;
        right:85px;
        width:22px;
        height:20px; 
        background-size:22px 20px;
        background-repeat: no-repeat;
        background-image: url('../../../static/image/login/bookIcon.png');  
    }
    .loginBox  .right_box{
        width: 380px;
        height: 100%;
        margin : 112px auto 0; 
    }
    .login .login_top{ 
        display: flex;
        justify-content: start;
        margin-bottom: 52px;
    }
    .login .login_top .image{ 
        margin: 0 20px 0 47px;
    }
    .login .login_top img{
        width: 51px;
        height: 48px; 
    }
    .login .login_top p{ 
        font-size: 24px; 
        color: #67CFDC; 
        line-height: 51px;
    }
    .login  .el-form-item {
        margin-bottom: 40px;
        position: relative;
    }
    .login-btn{
        width: 380px;
        height: 50px;
        background: #67CFDC;
        border-radius: 2px; 
        font-size: 18px; 
        color: #FFFFFF;
        margin-top: 70px;
        line-height: 50px;
        text-align: center;
        cursor: pointer;
    } 
    .iconfont{
        position: absolute;
        top: 12px;
        left: 11px;
        height: 21px;
        width: 21px;
        /* background-image: url('../../../static/image/login/admin.png'); */
        background-size: 21px 21px;
        background-repeat: no-repeat;
        font-size: 21px!important; 
    } 
    .icon-pwd{
        /* background-image: url('../../../static/image/login/pwd.png');     */
    }
</style>
<style  >
    .login .el-input__icon { 
        line-height: 46px;
        font-size: 18px!important;
        padding-right: 10px;
    }
     .login .el-input--suffix .el-input__inner{
      height: 46px!important;
      line-height: 46px!important;
      padding-left: 45px;
    }
</style> 