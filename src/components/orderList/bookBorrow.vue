<template>
  <el-row>
    <div class="librarian userList bookBorrow">
        <div class="librarian_title">图书借阅<span class="librarian_title_child">/ 借阅列表</span></div> 
         <div class="librarian_content">
           <el-col :span="24">
              <div  >
                  <el-tabs v-model="activeName" @tab-click="handleClick" class="_color">
                    <el-tab-pane label="借阅中" name="借阅中" state="1"></el-tab-pane>
                    <el-tab-pane label="快到期" name="快到期" state="2"></el-tab-pane> 
                    <el-tab-pane label="已到期" name="已到期" state="3"></el-tab-pane>
                  </el-tabs> 
              </div>
            </el-col>   
            <el-col :span="24"> 
              <div class="top" >  
                  <el-col :span="12"> 
                     <el-input  prefix-icon="el-icon-search" @keyup.enter.native="search()"   placeholder="请输入手机号" v-model="searchID"  style="width:240px;padding-right: 20px;color:#333!important;" 
                         oninput="javascript:value=this.value.replace(/[^\d]/g,'');if(this.value.length>11) this.value=this.value.substring(0,11);" > 
                      </el-input> 
                      <el-button type="success" plain style="width:80px;margin-left:20rpx;" @click="search()" >查询</el-button> 
                  </el-col> 
              </div>
            </el-col>  
             <div  >  
             <!-- <div  v-if="tableData !=''">   -->
              <el-table  ref="multipleTable"   :data="tableData" class="tableData"   tooltip-effect="dark"    style="width: 100%"   
                  @cell-dblclick='copyContent'    > 
                  <el-table-column  prop="name"  label="姓名"  class-name="userName"  width="155px" >   </el-table-column>
                  <el-table-column  prop="phone_num"   label="手机号" > </el-table-column>  
                  <el-table-column  prop="delivery_at" label="到达时间"  v-if="state != 3" :show-overflow-tooltip='true'></el-table-column>  
                  <el-table-column  prop="borrow_at" label="借阅时间" width="350px"  ></el-table-column>  
                  <el-table-column  prop="overdue" label="逾期天数" v-if="state == 3"></el-table-column>  
                  <el-table-column  prop="stock"  label="操作"   width="250px"   >
                    <template slot-scope="scope">
                        <el-button  type="text"  @click="orderDetail(tableData[scope.$index].order_id)"    > 订单详情 </el-button> 
                        <el-button  v-if="state == 3" type="text"  @click="returnBook(tableData[scope.$index])"    > 预约还书 </el-button> 
                      </template> 
                </el-table-column> 
                </el-table> 
              </div>
              <!-- <div class="no-person-data-img" v-else>
                <img src="../../../static/image/default/nullData.png" width="400px">
                <span>啊哦~ 数据加载失败</span> 
              </div> -->
               <div style="padding: 25px 0 0 0 ;text-align: center;">   
                <el-pagination   v-if="totalNum > pageNum"
                  @current-change="handleCurrentChange"
                  background
                  :current-page.sync="currentPage"
                  layout="prev, pager, next,total,jumper"
                  :page-size="pageNum"
                  :total="totalNum">
                </el-pagination>
              </div>  
         </div>   
     <!-- orderDetailform 订单详情 -->
        <div class="pro-dialog-box order-dialog-Class">
          <el-dialog title="订单详情" :visible.sync="dialogOrderDetail"  >
              <el-col :span="24"> 
                <div class="orderInformation">
                    <p class="orderInformation_title">订单信息</p>
                    <el-col :span="8"> 
                        <p> 用户姓名: <span class="orderInformation_contet">&nbsp;{{orderDetailform.name}}</span></p>
                        <p> 下单时间:<span class="orderInformation_contet">&nbsp;{{orderDetailform.subscribe_at}}</span></p>
                        <p> 配送员手机号:<span class="orderInformation_contet">&nbsp;{{orderDetailform.send_phone_num?orderDetailform.send_phone_num:' /'}}</span></p> 
                    </el-col>
                    <el-col :span="8"> 
                        <p> 用户手机:<span class="orderInformation_contet">&nbsp;{{orderDetailform.phone_num}}</span></p>
                        <p> 订单状态:<span class="orderInformation_contet">&nbsp;{{orderDetailform.state}}</span></p>
                        <p> 订单编号:<span class="orderInformation_contet">&nbsp;{{orderDetailform.order_code}}</span></p>
                                
                    </el-col>
                    <el-col :span="8"> 
                        <p> 身份证号:<span class="orderInformation_contet">&nbsp;{{orderDetailform.id_card}}</span></p>
                        <p> 配送员姓名:<span class="orderInformation_contet">&nbsp;{{orderDetailform.send_name?orderDetailform.send_name:' /'}}</span></p> 
                    </el-col>
                  </div>
              </el-col>
              <el-col :span="24"> 
                <div>
                    <p class="librarianInformation_title">图书信息</p>
                    <el-table :data="orderDetailform.book_info">
                      <el-table-column property="book_name" label="书籍" :show-overflow-tooltip='true'  ></el-table-column>
                      <el-table-column property="author" label="作者" width="200" :show-overflow-tooltip='true'></el-table-column>
                      <el-table-column property="publisher" label="出版社" :show-overflow-tooltip='true'></el-table-column>
                      <el-table-column property="isbn" label="ISBN码" :show-overflow-tooltip='true'></el-table-column>
                    </el-table>
                </div>
              </el-col> 
            <div slot="footer" class="dialog-footer">
              <div class="dialog-footer-btn-box" style="margin :30px 38px 0 0">
                <!-- <el-button @click="dialogOrderDetail = false">取 消</el-button>  -->
              </div>
              <div class="dialog-footer-btn-box">
                <!-- <el-button type="primary" @click="submitFormOrderDetail('orderDetailform')">确定</el-button>  -->
                <el-button type="primary" @click="dialogOrderDetail = false">确定</el-button> 
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
// import {validateIdNo,validatePhone } from '../../../public/js/tool/validator'; 

export default {
  name:'bookBorrow',  
  data() {
    return { 
        activeName: '借阅中',
        state:1,//1借阅中 2快到期 3已到期

        updateForm:  {   }  , 
        searchID:'' ,//查询
        
        tableData:[ 
          //  "order_id": 94,
          //   "name": "李泽森",
          //   "phone_num": 13539916031,
          //   "borrow_at": "2020/08/27 18:15-2020/08/27 18:15",
          //   "delivery_at": "1970/01/01 08:00"
        ], 
        Index:'',//当前选中行

        currentPage: 0,
        pageNum:10,
        totalNum:0,
        
        //  * Dialog订单详情
        dialogOrderDetail:false,   
        orderDetailform: {  
            // book_info:[
            //   {
            //     author: "张长兴编著",
            //     book_name: "壶觞清酌:中华酒文化大观",
            //     isbn: "9787554209516",
            //     publisher: "中原农民出版社",
            //   },
            //   {
            //     author: "闫润京编著",
            //     book_name: "我是电脑知识大王",
            //     isbn: "9787515003108",
            //     publisher: "国家行政学院出版社",
            //   }
            // ],
            //   order_code: "1598523343901086445",
            //   state: "预约还书",
            //   subscribe_at: "2020/08/27 18:15",
              // id_card: "440111199803220430",
              // name: "李泽森",
              // phone_num: 13539916031,
        },
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
          url : 'order',
            data : {} ,
            method : 'get',
            urlParam :'/list?type=2&state='+(me.state?me.state:'1')+(me.currentPage?'&offset='+me.currentPage:'')+(phone?'&search='+phone:''),  
        },function(res,opt){ 
            // console.log(res)
          if (res.data.error_code == 200) {  
              me.tableData = res.data.data.list;  
              me.totalNum = res.data.data.total ? res.data.data.total : 0; 
          }
        })   
    },
    //订单详情
    orderDetail(order_id){  
        let me = this;  
          me.dialogOrderDetail = true; 

        me.$requestAxios(me,{
          url : 'order',
            data : {} ,
            method : 'get',
            urlParam :'/show?type=1&order_id='+order_id,  
        },function(res,opt){ 
          // console.log(res)
          if (res.data.error_code == 200) {  
              me.dialogOrderDetail = true; 
              // me.user_info = res.data.data.user_info;   
              me.orderDetailform = res.data.data;   
          }
        })    
    },  
     handleCurrentChange(val) {//获取当前页的值事件
      // console.log(`当前页: ${val}`);
       this.params();
       this.searchID='';
    },
    handleClick(tab, event) {//选择账单类型state 1-借阅中 2-快到期 3-已到期
      //  console.log(arguments) 
        this.currentPage = 0;
        this.state = tab.$options._parentVnode.data.attrs.state;
        this.params();
      }, 
    search(){//查询 searchID
      if(Number(this.searchID.length)  == 11){  
         this.params(this.searchID);
          this.currentPage = 0;
          this.totalNum = 1; 
      }else if(this.searchID.length == ''){  
        this.params();
        this.currentPage = 0;
        this.totalNum = 1;
      } else {
        console.log('error submit!!');
        this.$ztdMessage('请输入手机号！','warning' )  
        return false;
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
<style   > 
    .bookBorrow .el-table_1_column_1.is-leaf ,.bookBorrow .userName{
        padding-left: 30px!important;
    }  
    /* 固定el-table头部高度 */
    .bookBorrow .el-table__body-wrapper.is-scrolling-none{
      overflow-y: auto;
      max-height: calc(100vh - 455px)!important;
    }  
    .bookBorrow  .tableData .el-table{
        height: calc(100vh - 410px)!important;
        /* height: calc(100vh - 325px); */
    } 
  .pro-dialog-Class .tableData .el-dialog {
      width: 440px;
  }  

  /**没有数据的背景图**/
.no-person-data-img{
  width: 400px;
  height: 400px;
  margin: 0px auto;
  text-align: center;
}

.no-person-data-img span{
  /* display: block;
  font-weight:400;
  line-height:25px; */ 
  font-size:18px;
  color: #ABB3B4;
}


</style>