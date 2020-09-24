<template>
  <el-row class="tac" height="800px;">
    <el-col :span="24">
      <el-menu
        class="el-menu-vertical-demo"
        default-active="userList"
        router
        unique-opened
        @open="handleOpen"
        @close="handleClose"
        background-color="rgba(255, 255, 255, 1)"
        text-color="rgba(119, 119, 140, 1)"
        active-text-color="#FFFFFF">
        <el-submenu v-for="item in menu" :index="item.id" :key="item.id" >
          <template slot="title">
            <!-- <i :class="item.icon"></i> -->
            <!-- <span class="iconfont " style="width:30px;height:24px;padding-right: 10px;font-size: 20px!important;">{{item.icon}}</span>  -->
            <!-- <span class="iconfont " style="width:30px;height:24px;padding-right: 10px;font-size: 20px!important;">&#xe61c;</span>  -->


            <span class="iconfont" :class="item.icon" style="width:30px;height:24px;padding-right: 10px;font-size: 20px!important;"></span>

            <span v-text="item.name"></span> 
          </template>
          <el-menu-item-group class="over-hide" v-for="sub in item.sub" :key="sub.componentName">
            <el-menu-item :index="sub.componentName" v-text="sub.name" :route="sub.value">
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>

      </el-menu>
    </el-col>
  </el-row>
</template>

<style scoped>
  .over-hide {
    overflow: hidden;
  }
</style>

<script>

  import menu from '../../../public/js/config/menu-config' ;
  // import menu from '../../../public/js/config/menu-config' ;
  // import "./../../../public/css/aliIcon/iconfont.js"; 

  export default {
    data () {
      return {
        menu: menu
      }
    },
    created(){ 

    },
     updated(){ 
   },
    methods: {
      handleOpen (key, keyPath) {
        //console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        //console.log(key, keyPath)
      }
    }
  }
</script>
<style >
  @import "./../../../public/css/aliIcon/iconfont.css"; 

  .tac .el-submenu{
    width: 200px;
  }
  .tac .el-submenu__title{
      /* width: 200px; */
      /* font-size: 20px;
      font-family: PingFang SC;
      font-weight:bold;
      color:rgba(25,25,25,0.85); */
      
      font-size: 19px;
      font-family: PingFangSC-Medium, PingFang SC; 
      color: #77778C;
      /* line-height: 25px; */
  }
  .tac .el-submenu__title:hover,.tac .el-submenu.is-opened .el-submenu__title,.tac .el-submenu.is-opened .el-submenu__title i{  
     /* font-weight: 500!important; */
     color: #67CFDC!important; 
     background: #ffffff!important;

  }
  .tac .el-submenu__title:hover i{   
    color: #67CFDC!important; 

  }  
  .tac .el-submenu .el-menu-item{
      
      font-weight: 400;
      color: #67CFDC;
      font-size: 18px;
       padding-left: 56px!important; 
  }
  .tac .el-submenu .el-menu-item:hover,.tac .el-menu-item.is-active{ 
      color: #67CFDC!important;
    background:#fff!important;
    border-right: #67CFDC 4px solid;
  }


  .tac .el-menu-item.is-active{
      /* background: rgba(35, 204, 190, 1)!important; */
      /* border-radius: 5px;  */
  }
   .tac .el-menu-item-group__title{
     padding: 0;
  }  
  .tac .el-submenu__icon-arrow { 
      color: rgba(119, 119, 140, 1)!important;
      font-size: 16px;
  }
</style>
