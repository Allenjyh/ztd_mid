<template>
  <div id="app">
    <login v-if="!loginType"></login>
    <!---登录后--->
    <div v-if="loginType" >
    <!-- <div   > -->
      <el-container > <!--v-if="isRouterAlive" -->
        <el-header class="header" style="height: 60px">
          <vheader/>
        </el-header>
        <el-container>
          <el-aside width="200px" class="navmenu-box">
            <navmenu></navmenu>
          </el-aside>
          <el-main style="padding: 20px 20px 10px;">
            <router-view v-if="isRouterAlive"></router-view>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>
<script>
  import NavMenu from '@/components/index/NavMenu'
  import Header from '@/components/index/Header'
  import login from '@/components/login/login' 
  // import login from '@/components/index/login' 
  export default {
    provide () {    //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。                                             
            return {
                reload: this.reload                                              
            }
        },
    data () {
      return {
        loginType: false,
        isRouterAlive: true  //控制视图是否显示的变量
      }
    },
    name: 'app',
    components: {
      'navmenu': NavMenu,
      'vheader': Header,
      'login' : login
    },
    mounted () { 
     
      if(JSON.parse(localStorage.getItem('ztd_center_login'))){
        this.loginType = true
      }else {
        this.loginType = false
      }
    },
    methods: {
            reload () {
                this.isRouterAlive = false; //先关闭，
                this.$nextTick(function () {
                    this.isRouterAlive = true; //再打开
                }) 
            }
        }
  }
</script>

<style> 
    @import '../public/css/default.css';  
    @import  '../public/css/librarian.css';

  html,body{
    margin: 0;
    padding: 0;
    height: 100%;
  }
  
  .header {
    background-color: rgba(35, 204, 190, 1);
    color: #fff;
    line-height: 60px;
     padding: 0  ;
  }
  .navmenu-box{
    /* margin: 12px 20px 0 20px; */
    background:rgba(255,255,255,1);
    box-shadow:0px 2px 8px 0px rgba(14,202,187,0.15);
    border-radius:5px;
  }
  #app{
    height: 100%;
    background-color: rgba(242, 244, 247, 1);
    min-width: 1150px;
  }
  .el-main{
    height: calc(100vh - 60px);
  }
  
 
</style>

