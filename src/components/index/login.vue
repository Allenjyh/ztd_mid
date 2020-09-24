<template>
  <div style="height: 100%">
    <el-container style="height: 100% !important;">
      <el-aside class="login-left-box" v-if="hm">

        <div class="login-left-bg"  :style="{'margin-top':marginTop}">
          <div class="login-left-bg-cp a-round" :style="{'animation-play-state':animationShow}"></div>

          <div class="login-text" :style="{'font-size':logintext}">{{loginTextContent}}</div>
        </div>
      </el-aside>
      <el-main class="login-right-box"  v-loading="setLoading">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <div class="login-right-conten">
          <div class="login-logo"></div>

          <el-form-item prop="loginPhone">
          <el-input
            class="login-phone"
            placeholder="请输入用户账号"
            v-model="ruleForm.loginPhone"
            :maxlength="18"
            clearable>
          </el-input>
          </el-form-item>
          <el-form-item prop="loginPwd">
            <el-input
              class="login-pwd"
              placeholder="请输入密码"
              v-model="ruleForm.loginPwd"
              :maxlength="18"
              show-password></el-input>
          </el-form-item>
          <div class="login-btn" slot="reference" @click="login('ruleForm')">登录</div>
        </div>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data() {
      return {
        ruleForm: {
          loginPhone: '灿',//账号
          loginPwd:'123456',//密码
          // loginPhone: '',//账号
          // loginPwd:'',//密码
        },
        rules: {
          loginPhone: [
            {required: true, message: '请输入用户账号', trigger: 'blur'}
          ],
          loginPwd: [
            {required: true, message: '请输入密码', trigger: 'blur'}
   /*         {min: 18, max: 18, message: '长度在 3 到 6 个字符', trigger: 'blur'}*/
          ],
        },
        marginTop:0,//背景图的MarginTop 随着浏览器的放大缩小改变
        hm:true,
        animationShow:"paused", //running
        logintext:'',
        loginTextContent:365,
        setLoading:false

      }
    },
    mounted () {
      const that = this
      that.marginTop = that.setMarginTop(document)

      that.onresizeW(document.body.clientWidth)
      window.onresize = () => {
        return (() => {
          that.marginTop = that.setMarginTop(document)
          that.onresizeW(document.body.clientWidth)
        })()
      }
    },
    methods:{
      login(formName){
        var self = this;
        var loginsetInterval = "";

        this.$refs[formName].validate((valid) => {
          if (valid) {

            //登录状态执行
            self.animationLoading(self,"running");
            self.setLoading = true;


            self.loginTextContent = 0;
            var loginsetInterval = setInterval (function () {
              self.loginTextContent++
              if(self.loginTextContent == 365){

                clearInterval(loginsetInterval)

                self.animationLoading(self,"paused")
                self.setLoading = false;

              }

            }, 20);

            setTimeout(function(){
              self.$api.login({username:self.ruleForm.loginPhone,password:self.ruleForm.loginPwd}).then(res => {
                if(res){

                  let userCookiesKey = self.$appConfig.userCookiesKey

                  if(!this.$cookies.isKey(userCookiesKey)){
                    this.$cookies.set(userCookiesKey,JSON.stringify(res.data.user_info), parseInt(res.data.session_lifetime)*60);
                  }

                  clearInterval(loginsetInterval)
                  self.loginTextContent = 365;
                  self.setLoading = false;
                  self.animationLoading(self,"paused")

                  self.$message({
                    message: "登录"+res.message,
                    type: 'success'
                  })

                  setTimeout(function(){
                    self.$router.go(0);
                  },300)

                }else {
                  clearInterval(loginsetInterval)
                  self.loginTextContent = 365;
                  self.setLoading = false;
                  self.animationLoading(self,"paused")
                }



              }).catch(res => {

                clearInterval(loginsetInterval)
                self.loginTextContent = 365;
                self.setLoading = false;
                self.animationLoading(self,"paused")

              })
            },1000)




          } else {
            /*console.log('error submit!!');*/
            return false;
          }
        });

        //this.$message("短信需要60秒后才能再发送",true)
      },
      //背景图的MarginTop 随着浏览器的放大缩小改变
      setMarginTop(e){

        try {
          this.logintext = this.$el.childNodes[0].childNodes[0].childNodes[0].childNodes[2].clientHeight + "px";
        }catch (e) {

        }


        return (-(e.body.clientWidth * 0.58 * 0.7) / 2 + "px")




      },
      //当浏览器宽度小于750
      onresizeW(e){
        if(e < 750){
          this.hm = false
        }else {
          this.hm = true
        }
      },
      //开始动画
      animationLoading(e,type){
        e.animationShow = type
      }

    }
  }
</script>

<style scoped>
  html,body{
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
.login-left-box{
  width: 58% !important;
  background-color: rgba(35, 204, 190, 1);
  overflow: hidden;
}
  .login-left-bg{
    width: calc(100vw * 0.58 * 0.7);
    height:  calc(100vw * 0.58 * 0.7);
    /* background-image: url("../../static/login/loginLeft.png"); */
    background-repeat: no-repeat;
    background-size: 100%;
    margin: 0 auto;
    position: relative;
    top: 50%; /*偏移*/

  }

  /*
      turnbg : 定义的动画名称
      1s : 动画时间
      linear : 动画以何种运行轨迹完成一个周期
      infinite :规定动画应该无限次播放
     */
  @keyframes turnbg{
    0%{-webkit-transform:rotate(0deg);}
    25%{-webkit-transform:rotate(90deg);}
    50%{-webkit-transform:rotate(180deg);}
    75%{-webkit-transform:rotate(270deg);}
    100%{-webkit-transform:rotate(360deg);}
  }

  .login-left-bg-cp{
    width: calc(100vw * 0.58 * 0.7);
    height:  calc(100vw * 0.58 * 0.7);
    /* background-image: url("../../static/login/loginLeftCp.png"); */
    background-repeat: no-repeat;
    background-size: 100%;
    margin: 0 auto;
    z-index: 9;
    position: absolute;
    top: 0; /*偏移*/
  }
  .a-round{
    animation:turnbg 2s linear infinite;
  }
  .login-right-box{
    background:rgba(255,255,255,1);
    padding: 0;
  }
  .login-right-conten{
    width: 278px;
    height: 388px;
    margin: 0 auto;
    position: relative;
    top: 50%; /*偏移*/
    /*margin-top: 214px;*/
    margin-top: calc(100vh * 0.25);
  }
  .login-logo{
    width: 278px;
    height: 79px;
    /* background-image: url("../../static/login/login-logo.png"); */
    background-repeat: no-repeat;
    background-size: 278px 79px;
    margin-bottom: 54px;
  }
  .login-phone{
    /*margin-bottom: 44px;*/
  }
  .login-pwd{
    margin-top: 4px;
  }
  .login-btn{
    margin-top: 60px;
    width:260px;
    height:48px;
    background:rgba(35,204,190,1);
    border-radius:4px;
    margin: 060px auto 0 auto;
    font-size:20px;
    font-family:PingFang SC;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height: 48px;
    text-align: center;
    cursor: pointer;
  }
  html {
    font-size: 62.5%; /* 10 ÷ 16 × 100% = 62.5% */
  }
  .login-text{
    position: absolute;
    /*top: 397px;*/
    top: 50.91%;
    /*left: 462px;*/
    left: 59.27%;
    font-size: 62px;
    font-weight: bold;
    font-family: PingFang SC;
    width: 16.83%;
    height: 9.63%;
    color: #FFFFFF;
    background: linear-gradient(to right, #2ae0d2 , #2ee9da);
    text-align: center;
  }
</style>
<style>
  .login-right-conten .el-input__inner{
    width: 100% !important;
    border: 0px !important;
    border-bottom: 2px solid rgba(0,0,0,0.25) !important;
    outline: none;
    padding: 25px 19px !important;
    border-radius: 0px !important;
    font-size: 16px !important;
  }

  .login-right-conten .el-form-item__error{
    text-indent: 19px !important;
  }
</style>
