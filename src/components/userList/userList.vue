<template>
  <el-row>
    <div class="librarian userList">
        <div class="librarian_title">用户列表<span class="librarian_title_child">/ 用户列表</span></div> 
         <div class="librarian_content">
            <el-col :span="24">
             
              <div class="top" >  
                  <el-col :span="12"> 
                     <el-input  prefix-icon="el-icon-search" @keyup.enter.native="search()"   placeholder="请输入手机号" v-model="searchID"  style="width:240px;padding-right: 20px;color:#333!important;" 
                          oninput="javascript:value=this.value.replace(/[^\d]/g,'');if(this.value.length>11) this.value=this.value.substring(0,11);"  >
                      </el-input> 
                      <el-button type="success" plain style="width:80px;margin-left:20rpx;" @click="search()" >查询</el-button> 
                  </el-col>
                  <el-col :span="12"> 
                      <div class="rightControl">
                          <div class="add_book"   @click="dialogAddUser = true"><span class="addicon">+</span><span>添加用户</span></div>  
                      </div>
                  </el-col>
              </div>
            </el-col>     
             <el-table   ref="multipleTable"   :data="tableData"  class="tableData"  tooltip-effect="dark"    style="width: 100%"   
                @cell-dblclick='copyContent'    >
                <el-table-column  prop="name" class-name="userName"   label="用户姓名"   >   </el-table-column>
                <el-table-column   prop="phone_num"  label="手机号"   >   </el-table-column>
                <el-table-column    prop="id_card"   label="身份证"  width="270px"  >   </el-table-column>  
                <el-table-column    prop="is_activate" label="状态"    >   
                  <template slot-scope="scope"> 
                      <i v-bind:class="`${scope.row.is_activate == 1?'mid-point mid-point-blue':'mid-point mid-point-default'}`" > </i> 
                      {{ scope.row.is_activate == 0 ?  '未激活' : "已激活" }}  
                  </template>
                </el-table-column>  
                <el-table-column  prop="stock"  label="操作"   width="280px"   >
                   <template slot-scope="scope">
                      <el-button v-if="scope.row.is_activate == 1" type="text" style="color: #BBBBC6!important;cursor: not-allowed;" > 激活 </el-button>
                      <el-button v-if="scope.row.is_activate == 0" type="text" @click="activatRow(tableData[scope.$index],scope.$index)" > 激活 </el-button>
                      <el-button  type="text"  @click="editData(tableData[scope.$index])" >编辑 </el-button>
                      <el-button v-if="scope.row.is_activate == 1" type="text" style="opacity:0.4!important;cursor: not-allowed;" class="redControl"  > 删除 </el-button>
                      <el-button v-if="scope.row.is_activate == 0" type="text"  @click="delRow(tableData[scope.$index],scope.$index)" class="redControl"  > 删除 </el-button>
                      <!-- <el-button  type="text" @click="Delete(scope.$index)"  class="redControl"  > 删除 </el-button> -->
                   </template> 
               </el-table-column>
              </el-table> 
               <div style="padding: 25px 0 0 0 ;text-align: center;"> 
                  <!-- -->
                <el-pagination  v-if="totalNum > pageNum" 
                  @current-change="handleCurrentChange"
                  background
                  :current-page.sync="currentPage"
                  layout="prev, pager, next,total,jumper"
                  :page-size="pageNum"
                  :total="totalNum">
                </el-pagination>
              </div>  
         </div>  

    <!-- AddUserform 添加用户 -->
    <div class="pro-dialog-box pro-dialog-Class">
      <el-dialog title="添加用户" :visible.sync="dialogAddUser">
        <el-form :model="AddUserform" ref="AddUserform">
          <table>
            <tr>
              <td> 
                <el-form-item   label="用户姓名"   label-position="top"   prop="name"    :rules="[  { required: true, message: '用户姓名不能为空'}, ]"  >
                  <el-input v-model="AddUserform.name" placeholder="请输入用户姓名" autocomplete="off" style="width: 360px;height: 40px;" maxlength="10" ></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td> 
                <el-form-item   label="身份证件号"   label-position="top"   prop="id_card"  :rules="rules.IdNo">
                  <el-input v-model="AddUserform.id_card" placeholder="请输入身份证件号" autocomplete="off" style="width: 360px;height: 40px;" maxlength="18" ></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td> 
                <el-form-item    label="手机号"   label-position="top"   prop="phone_num" :rules="rules.phone"  >
                  <el-input v-model="AddUserform.phone_num" placeholder="请输入手机号" autocomplete="off" style="width: 360px;height: 40px;" maxlength="11"></el-input>
                </el-form-item>
              </td>
            </tr>
          </table>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <div class="dialog-footer-btn-box" style="margin-right: 38px">
            <el-button @click="dialogAddUser = false">取 消</el-button>
            <!-- <div class="pro-nav-btn-shadow"></div> -->
          </div>
          <div class="dialog-footer-btn-box">
            <el-button type="primary" @click="submitFormAddUser('AddUserform')">确定</el-button>
            <!-- <div class="pro-nav-btn-shadow"></div> -->
          </div>
        </div>
      </el-dialog>
    </div>

    <!-- EditUserform 编辑用户信息 -->
    <div class="pro-dialog-box pro-dialog-Class">
      <el-dialog title="编辑用户信息" :visible.sync="dialogEditUser">
        <el-form :model="EditUserform" ref="EditUserform">
          <table>
            <tr>
              <td> 
                <el-form-item   label="用户姓名"   label-position="top"   prop="name"    :rules="[  { required: true, message: '用户姓名不能为空'}, ]"  >
                  <el-input v-model="EditUserform.name" maxlength="10" placeholder="请输入用户姓名" autocomplete="off" style="width: 360px;height: 40px;" ></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td> 
                <el-form-item   label="身份证件号"   label-position="top"   prop="id_card"  :rules="rules.IdNo"   >
                  <el-input v-model="EditUserform.id_card" maxlength="18" placeholder="请输入身份证件号" autocomplete="off" style="width: 360px;height: 40px;" ></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td> 
                <el-form-item    label="手机号"   label-position="top"   prop="phone_num" :rules="rules.phone"  >
                  <el-input v-model="EditUserform.phone_num" maxlength="11" placeholder="请输入手机号" autocomplete="off" style="width: 360px;height: 40px;" ></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td> 
                <el-form-item    label="密码"   label-position="top"   prop="password"   >
                  <el-input v-model="EditUserform.password" maxlength="15" placeholder="请输入密码" autocomplete="off" style="width: 360px;height: 40px;" ></el-input>
                </el-form-item>
              </td>
            </tr>
          </table>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <div class="dialog-footer-btn-box" style="margin-right: 38px">
            <el-button  @click="cancelForm('EditUserform')">取 消</el-button> 
            <!-- <el-button @click="dialogEditUser = false">取 消</el-button>  -->
          </div>
          <div class="dialog-footer-btn-box">
            <el-button type="primary" @click="submitFormEditUser('EditUserform')">确定</el-button> 
          </div>
        </div>
      </el-dialog>
    </div>
    
     <!--Dialog 弹出一个对话框(删除、禁用、激活)-->
    <div class="pro-dialog-box">
      <el-dialog  :title="operationDialogtitle"  :visible.sync="operationDialog"  width="400px">
        <span>{{operationDialogText}}</span>
        <span slot="footer" class="dialog-footer">
          <div class="dialog-footer-btn-box" style="margin-right: 38px">
            <el-button @click="operationDialog = false">取 消</el-button>
            <div class="pro-nav-btn-shadow"></div>
          </div>
          <div class="dialog-footer-btn-box">
            <el-button type="primary" @click="operationDialogClose()">确 定</el-button>
            <div class="pro-nav-btn-shadow"></div>
          </div>
        </span>
      </el-dialog>
    </div>

    </div>
  </el-row>
</template>
<script> 
// import userC from '../../../public/js/librarian/user.js'
import {validateIdNo,validatePhone } from '../../../public/js/tool/validator'; 

export default {
  inject:['reload'], 
  name:'userList',  
  data() {
    return { 
        updateForm:  {   }  , 
        searchID:'' ,//查询
        tableData1: [ 
          {
              "user_id": 13,
              "user_type": 2,
              "phone_num": 15697777444,
              "is_activate": 1,
              "name": "1李新春",
              "id_card": "110101199410113189",
              "balance": 0,
              "create_time": 1598519718
          },
          {
              "user_id": 13,
              "user_type": 1,
              "phone_num": 15697777444,
              "is_activate": 0,
              "name": "2李新春",
              "id_card": "110101199410113189",
              "balance": 0,
              "create_time": 1598519718
          },
          {
              "user_id": 13,
              "user_type": 2,
              "phone_num": 15697777444,
              "is_activate":1,
              "name": "3李新春",
              "id_card": "110101199410113189",
              "balance": 0,
              "create_time": 1598519718
          },
          {
              "user_id": 13,
              "user_type": 2,
              "phone_num": 15697777444,
              "is_activate":0,
              "name": "李新春",
              "id_card": "110101199410113189",
              "balance": 0,
              "create_time": 1598519718
          },  
        ],
        tableData:[ ], 
        Index:'',//当前选中行

        currentPage: 0,
        pageNum:12,
        totalNum:0,

        //  * Dialog添加用户
        dialogAddUser:false,   
        AddUserform: { 
          "user_type":'1', 
          "phone_num": "" , 
          "name": "",
          "id_card": "", 
        },
        //  * Dialog编辑用户信息
        dialogEditUser:false,   
        EditUserform: { 
          "user_type":'1', 
          "phone_num": "" , 
          "name": "",
          "id_card": "", 
          "password": "", 
        },
        Editform:[],
        //删除、激活
        operationDialog:false,//Dialog状态
        operationDialogtitle:"",//Dialog头部
        operationDialogText:"",//Dialog内容
        rules: {
          IdNo:[
            {required: true, message: '身份证件号不能为空'},
            {validator:validateIdNo,trigger:'blur'},
            ], 
          phone:[ 
            {required: true, message: '手机号不能为空'},
            {validator:validatePhone,trigger:'blur'},
            ], 
        },
    };
  },
  created(){ 
    this.params()
  },
  mounted(){  

   },
  updated(){   },
  methods: { 
     params(phone){
      let me = this;  
        me.$requestAxios(me,{
          url : 'userList',
            data : {} ,
            method : 'get',
            urlParam :'?user_type=1&limit=12&currentPage='+(me.currentPage?me.currentPage:'0')+(phone?'&search='+phone:''),  
        },function(res,opt){ 
            console.log(res)
          if (res.data.error_code == 200) {  
              me.tableData1 = res.data.data.data; 
              me.tableData= JSON.parse(JSON.stringify(me.tableData1))
              me.currentPage == 0 ? (me.totalNum = res.data.data.totalNum ? res.data.data.totalNum : 0) : ''; 
          }
          //
        })  

    },
     handleCurrentChange(val) {//获取当前页的值事件
      // console.log(`当前页: ${val}`);
      this.params();
      this.searchID='';
    },
    search(){//查询 searchID
      if(this.searchID.length == 11){  
        this.params(this.searchID);
        this.currentPage = 0;
        this.totalNum = 1; 
      }else if(this.searchID.length == ''){  
        this.params();
        this.currentPage = 0;
        this.totalNum = 1;  
      } else {
        console.log('error submit!!');
        this.$ztdMessage('请输入正确的手机号！','success' )  
        return false;
      } 
    },  
      //添加用户
      submitFormAddUser(formName){
        console.log('添加用户')
        let me = this;
        me.$refs[formName].validate((valid) => {
          if (valid) { 
              let _data =JSON.parse(JSON.stringify(me.AddUserform))
              // _data.is_activate=0 
            me.$requestAxios(me,{
              url : 'userInfo',
              data : me.AddUserform,
              method : 'post',
            },function(res,opt){  
                me.reload()
              // me.tableData.unshift(_data); 
              me.$ztdMessage( ' 添加成功！','success' ) 
              me.$refs[formName].resetFields();
              me.dialogAddUser = false;
            })  
          } else {
            return false; 
          }
        });
      },
       //编辑用户信息
       editData(e){  
       this.EditUserform =  e ;
       this.Editform =  JSON.parse(JSON.stringify(e))  ; 
       this.dialogEditUser = true; 
    },  
     cancelForm(formName) {//取消 
        this.$refs[formName].resetFields();
        this.dialogEditUser = false;  
    },
    submitFormEditUser(formName){ 
      console.log('编辑用户信息')
      let me = this;
      me.$refs[formName].validate((valid) => {
        if (valid) { 
            let modify={
              id_card: me.EditUserform.id_card,
              name: me.EditUserform.name,
              phone_num: me.EditUserform.phone_num, 
              user_type:me.EditUserform.user_type,
              password:me.EditUserform.password , 
            } 
           me.$requestAxios(me,{
              url : 'userInfo',
              data :{id:me.EditUserform.user_id,modify :  JSON.stringify(modify)} , 
              method : 'put',
            },function(res,opt){  
           
              me.$ztdMessage( ' 编辑成功！','success' ) 
              // me.$refs[formName].resetFields(); 
              me.dialogEditUser = false; 
            }) 
        } else {
          return false; 
        }
      });
    },
     //操作台-删除 、激活
      delRow(e,index){
        this.operationRow("删除",e,index)
      },
      activatRow(e,index){
        this.operationRow("激活",e,index)  
      }, 
      operationRow(title,e,index,fn){ 
        this.updateForm =e; 
        this.Index =index;
        this.operationDialog = true;
        this.operationDialogtitle = title;  
         this.operationDialogText = '是否要'+ title +' ' + this.updateForm.name +' ?';
      }, 
      //Dialog关闭  删除、激活
      operationDialogClose() {
        let me = this; 
        me.operationDialog = false;  
        if('删除' == this.operationDialogtitle){ 
          me.$requestAxios(this,{
            url : 'userInfo',
            data : {ids:this.updateForm.user_id},
            method : 'delete',
          },function(res,opt){  
            me.tableData.splice(me.Index,1)
            me.$ztdMessage(  ' 删除成功！',   'success' )
          })
        }else{//激活
          me.$requestAxios(this,{
            url : 'activateUser',
            data : {user_id:this.updateForm.user_id},
            method : 'put',
          },function(res,opt){   
             me.tableData[me.Index].is_activate=1
             me.$ztdMessage( ' 激活成功！', 'success' ) 
          })
        } 
      },   
      copyContent(row, column, cell, event){//双击复制单元格内容  
         let _this = this;
          this.$copyText(cell.innerText).then(function (e) { 
             _this.$ztdMessage( ' 复制成功', 'success' )  
          }, function (e) {
             _this.$ztdMessage( ' 复制失败，请手动复制', 'error' )  
          })
      }, 
  }
};
</script>
<style  lang="scss">
      // @import  '../../../public/css/librarian.css';
      // @import "../../../public/sass/l-select.scss";  
</style>
<style   >
     /* 状态 */
      .mid-point-blue{ 
        background:rgba(103, 207, 220, 1); 
     }
      .mid-point-default{ 
        background: #BBBBC6; 
     }
     .mid-point{
        width: 8px;
        height: 8px;
        display: inline-block;
        border-radius: 50%;
        margin-right: 2px;
     }
     
    .userList .el-table_1_column_1.is-leaf ,.userList .userName{
        padding-left: 30px!important;
    }  
    /* 固定el-table头部高度 */
    .userList .el-table__body-wrapper.is-scrolling-none{
      overflow-y: auto;
      max-height: calc(100vh - 370px)!important;
    }  
    .userList  .tableData .el-table{
        height: calc(100vh - 325px)!important;
    }
   /*过滤 */
    .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner  {
      background-color: rgba(103,207,220,1)!important;
      border-color: rgba(103,207,220,1)!important;
   }
   .el-checkbox__input  .el-checkbox__inner:hover { 
      border-color: rgba(103,207,220,1)!important;
   }
     .el-table th>.cell.highlight {
      color: rgba(103, 207, 220, 1)!important;
  }
  .el-checkbox__input.is-checked+.el-checkbox__label,.el-table-filter__bottom button:hover {
      color: rgba(103,207,220,1)!important;
  }  
  /*过滤end */

  .pro-dialog-Class .el-dialog {
    width: 440px;
}
</style>