<template>
  <el-row>
    <div class="librarian feedback">
        <div class="librarian_title">缺书反馈<span class="librarian_title_child">/ 缺书反馈</span></div> 
         <div class="librarian_content">
            <el-col :span="24">
             
              <div class="top" >  
                  <el-col :span="12"> 
                     <el-input  prefix-icon="el-icon-search" @keyup.enter.native="search()"   placeholder="请输入书名" v-model="searchID"  style="width:240px;padding-right: 20px;color:#333!important;" 
                         oninput="javascript:value=this.value.replace(/[^\d]/g,'');" > 
                      </el-input> 
                      <el-button type="success" plain style="width:80px;margin-left:20rpx;" @click="search()" >查询</el-button> 
                  </el-col> 
              </div>
            </el-col>   
             <el-table   ref="multipleTable"   :data="tableData"    tooltip-effect="dark"    style="width: 100%"   
                @cell-dblclick='copyContent'    > 
                <el-table-column   prop="book_name"  label="书名"  class-name="userName" :show-overflow-tooltip='true'>   </el-table-column>
                <el-table-column    prop="isbn"   label="ISBN"     >   </el-table-column>  
                <el-table-column    prop="count" label="反馈次数" width="170px"   >    </el-table-column>  
                <el-table-column  prop="stock"  label="操作"   width="200px"   >
                   <template slot-scope="scope">
                      <el-button   type="text"  @click="delRow(tableData[scope.$index],scope.$index)" class="redControl"  > 删除 </el-button>
                    </template> 
               </el-table-column>
              </el-table> 
               <div style="padding: 25px 0 0 0 ;text-align: center;">  
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
// import {validateIdNo,validatePhone } from '../../../public/js/tool/validator'; 

export default {
  name:'feedback',  
  data() {
    return { 
        updateForm:  {   }  , 
        searchID:'' ,//查询
        
        tableData:[ 
          // book_name: "我的手机号码"
          // count: 1
          // isbn: "5162726272626"
        ], 
        Index:'',//当前选中行

        currentPage: 0,
        pageNum:12,
        totalNum:0,
 
        //删除、激活
        operationDialog:false,//Dialog状态
        operationDialogtitle:"",//Dialog头部
        operationDialogText:"",//Dialog内容 
    };
  },
  created(){ 
    this.params()
  },  
  methods: { 
     params(phone){
      let me = this;  
        me.$requestAxios(me,{
          url : 'feedback',
            data : {} ,
            method : 'get',
            urlParam :'?limit=12&currentPage='+(me.currentPage?me.currentPage:'0')+(phone?'&search='+phone:''),  
        },function(res,opt){ 
            console.log(res)
          if (res.data.error_code == 200) {  
              me.tableData = res.data.data.data;  
              me.currentPage == 0 ? (me.totalNum = res.data.data.totalNum ? res.data.data.totalNum : 0) : ''; 
          }
        })   
    },
     handleCurrentChange(val) {//获取当前页的值事件
      // console.log(`当前页: ${val}`);
      this.params();
       this.searchID='';
    },
    search(){//查询 searchID
      if(this.searchID.length > 0){  
         this.params(this.searchID);
          this.currentPage = 0;
          this.totalNum = 1; 
      }else if(this.searchID.length == ''){  
        this.params();
        this.currentPage = 0;
        this.totalNum = 1;
      } else {
        console.log('error submit!!');
        this.$ztdMessage('请输入书名！','warning' )  
        return false;
      } 
    },   
     //操作台-删除  
      delRow(e,index){ 
        this.updateForm =e; 
        this.Index =index;
        this.operationDialog = true;
        this.operationDialogtitle = "删除";  
         this.operationDialogText = '是否要删除 '  + this.updateForm.book_name +' 的图书反馈 ?';
      }, 
      //Dialog关闭  删除、激活
      operationDialogClose() {
        let me = this; 
        me.operationDialog = false;   
          me.$requestAxios(this,{
            url : 'feedback',
            data : {book_name:me.updateForm.book_name},
            method : 'delete',
          },function(res,opt){  
            me.tableData.splice(me.Index,1)
            me.$ztdMessage(  ' 删除成功！',   'success' )
          }) 
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
<style   > 
    .feedback .el-table_1_column_1.is-leaf ,.feedback .userName{
        padding-left: 30px!important;
    }  
    /* 固定el-table头部高度 */
    .feedback .el-table__body-wrapper.is-scrolling-none{
      overflow-y: auto;
      max-height: calc(100vh - 370px)!important;
    }  
    .feedback   .el-table{
        height: calc(100vh - 325px)!important;
    } 
  .pro-dialog-Class .el-dialog {
    width: 440px;
}
</style>