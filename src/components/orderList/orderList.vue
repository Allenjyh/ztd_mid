<template>
  <el-row>
    <div class="librarian userList orderList">
        <div class="librarian_title">图书借阅<span class="librarian_title_child">/ 订单列表</span></div> 
         <div class="librarian_content">
            <el-col :span="24">
              <div  >
                  <el-tabs v-model="activeName" @tab-click="handleClick" class="_color">
                    <el-tab-pane label="新订单" name="新订单" state="1"></el-tab-pane>
                    <el-tab-pane label="已接单" name="已接单" state="2"></el-tab-pane> 
                    <el-tab-pane label="配送中" name="配送中" state="3"></el-tab-pane>
                  </el-tabs> 
              </div>
            </el-col>   
            <el-col :span="24">
              <div class="top" > 
                  <el-col :span="12"> 
                     <el-input  prefix-icon="el-icon-search" @keyup.enter.native="search()"  placeholder="请输入手机号" v-model="searchID"  style="width:240px;padding-right: 20px;color:#333!important;" 
                          oninput="javascript:value=this.value.replace(/[^\d]/g,'');if(this.value.length>11) this.value=this.value.substring(0,11);"  >
                      </el-input> 
                      <el-button type="success" plain style="width:80px;margin-left:20rpx;" @click="search()" >查询</el-button> 
                  </el-col>
                  <el-col :span="12"> 
                      <div class="rightControl">
                          <div class="add_book"    @click="orderEdit( )" ><span class="addicon">+</span><span>创建订单</span></div>  
                      </div>
                  </el-col>
              </div>
            </el-col>   
             <el-table   ref="multipleTable"   :data="tableData"   class="tableData" tooltip-effect="dark"    style="width: 100%"   
                @cell-dblclick='copyContent' >
                <el-table-column  prop="name" class-name="userName"   label="姓名"   >   </el-table-column>
                <el-table-column  prop="phone_num"  label="手机号"   >   </el-table-column>
                <el-table-column  :prop="state == 1 ?'subscribe_at':'send_at'"   :label="state == 1 ?'下单时间':'接单时间'"    >   </el-table-column>
                <el-table-column  v-if="state != 1" prop="send_name"   label="配送员"  >   </el-table-column>
                <el-table-column  v-if="state != 1" prop="send_phone_num"   label="配送员手机号">   </el-table-column>
                <el-table-column  v-if="state == 1" prop="books" label="状态"  width="280px" :show-overflow-tooltip='true'></el-table-column>   
                <el-table-column  prop="stock"  label="操作"   width="280px"   >
                   <template slot-scope="scope">
                      <el-button v-if="state == 1" type="text"  @click="orderEdit(tableData[scope.$index])" >编辑 </el-button>
                      <el-button v-if="state == 1"  type="text"  @click="revoke(tableData[scope.$index],scope.$index)" class="redControl">撤销</el-button>
                      <el-button  type="text"  @click="orderDetail(tableData[scope.$index].order_id)"> 订单详情 </el-button>  
                   </template> 
               </el-table-column>
              </el-table> 
               <div style="padding: 25px 0 0 0 ;text-align: center;">  
                <el-pagination v-if="totalNum > pageNum"
                  @current-change="handleCurrentChange"
                  background
                  :current-page.sync="currentPage"
                  layout="prev, pager, next,total,jumper"
                  :page-size="pageNum"
                  :total="totalNum">
                </el-pagination>
              </div>  
         </div>  
 
   
    
     <!--Dialog 弹出一个对话框(撤销、禁用、激活)-->
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
                <el-button type="primary " @click="dialogOrderDetail = false">确定</el-button>  

              </div>
            </div>
          </el-dialog>
        </div>
    <!-- orderEditform 订单编辑 -->
    <div class="pro-dialog-box order-dialog-Class orderEdit-dialog-Class">
      <el-dialog title="订单详情" :visible.sync="dialogOrderEdit"  >
         <el-form :model="EditUserform" ref="EditUserform">
        
          <table>
            <tr>
              <td> 
                <el-form-item   label="手机号"   label-position="top"   prop="name"    :rules="[  { required: true, message: '手机号不能为空'}, ]"  >
                  <el-input v-model="EditUserform.name" placeholder="请输入手机号" autocomplete="off" style="width: 300px;margin-right:20px;height: 40px;" ></el-input>
                </el-form-item>
              </td>
              <td> 
                <el-form-item   label="地址"   label-position="top"   prop="id_card"  :rules="[  { required: true, message: '地址不能为空'}, ]"  >
                  <el-input v-model="EditUserform.id_card" placeholder="请输入地址" autocomplete="off" style="width: 300px;height: 40px;" ></el-input>
                </el-form-item>
              </td>
            </tr>
            <tr>
              <td> 
                <el-form-item   label="保证金(元)"   label-position="top"   prop="id_card"  :rules="[  { required: true, message: '保证金不能为空'}, ]"  >
                  <el-input v-model="EditUserform.id_card" placeholder="请输入保证金" autocomplete="off" style="width: 300px;margin-right:20px;height: 40px;" ></el-input>
                </el-form-item>
              </td>
              <td> 
                 <div class="rightControl" style="float: left;">
                    <div class="add_book" style="margin-top: 35px;"  @click="dialogAddUser = true"><span class="addicon">+</span><span>添加ISBN</span></div>  
                </div>
              </td>
            </tr>
            
          </table>
        </el-form>
        
          <el-col :span="24"> 
            <div>
                <p class="librarianInformation_title">图书信息</p>
                <el-table :data="gridData">
                  <el-table-column property="book_name" label="书籍"  ></el-table-column>
                  <el-table-column property="author" label="作者" ></el-table-column>
                  <el-table-column property="publisher" label="出版社"></el-table-column>
                  <el-table-column property="isbn" label="ISBN码" width="200"></el-table-column>
                </el-table>
            </div>
          </el-col> 
        <div slot="footer" class="dialog-footer">
          <div class="dialog-footer-btn-box" style="margin :30px 38px 0 0">
            <el-button @click="dialogOrderEdit = false">取 消</el-button> 
          </div>
          <div class="dialog-footer-btn-box">
            <el-button type="primary" @click="submitFormOrderEdit('orderEditform')">确定</el-button> 
          </div>
        </div>
      </el-dialog>
    </div>
    </div>
  </el-row>
</template>
<script> 
import Book from '../../../public/js/librarian/book.js'

export default {
  inject:['reload'], 
  name:'userList',  
  data() {
    return { 
       activeName: '新订单',
        state:1,//订单列表（1新订单 2已接单 3配送中）
        updateForm:  {   }  , 
        searchID:'' ,//查询
        Index:'',//当前选中行 
        tableData: [ 
          // {
          //     "user_id": 13, 
          //     "phone_num": 15697777444, 
          //     "name": "1李新春", 
          //     "books": "钢铁是怎样炼成的、设计心理学钢铁是怎样炼成的、设计心理学致富",
          //     "balance": 0,
          //     "subscribe_at":' 2020/05/13  20:28'
          // },
          // {
          //     "user_id": 13, 
          //     "phone_num": 15697777444, 
          //     "name": "2李新春", 
          //     "books": "钢铁是怎样炼成的、设计心理学钢铁是怎样炼成的、设计心理学致富",
          //     "balance": 0,
          //     "subscribe_at":' 2020/05/13  20:28'
          // },
          // {
          //     "user_id": 13, 
          //     "phone_num": 15697777444, 
          //     "name": "3李新春", 
          //     "books": "钢铁是怎样炼成的、设计心理学钢铁是怎样炼成的、设计心理学致富",
          //     "balance": 0,
          //     "subscribe_at": 1598519718
          // },
          // {
          //     "user_id": 13, 
          //     "phone_num": 15697777444, 
          //     "name": "4李新春", 
          //     "books": "钢铁是怎样炼成的、设计心理学钢铁是怎样炼成的、设计心理学致富",
          //     "balance": 0,
          //     "subscribe_at": 1598519718
          // },
          // {
          //     "user_id": 13, 
          //     "phone_num": 15697777444, 
          //     "name": "5李新春", 
          //     "books": "钢铁是怎样炼成的、设计心理学钢铁是怎样炼成的、设计心理学致富",
          //     "balance": 0,
          //     "subscribe_at": 1598519718
          // },
          // {
          //     "user_id": 13, 
          //     "phone_num": 15697777444, 
          //     "name": "6李新春", 
          //     "books": "钢铁是怎样炼成的、设计心理学钢铁是怎样炼成的、设计心理学致富",
          //     "balance": 0,
          //     "subscribe_at":' 2020/05/13  20:28'
          // },
         
        ],
        tabledata:[], 
        currentPage: 0,
        pageNum:10,
        totalNum:0, 

        //  * Dialog编辑
        dialogOrderEdit:false,   
        orderEditform: {  
          // "user_id": 13, 
          // "book_name": '卧虎藏龙', 
          // "author": "张艺" , 
          // "publisher": "南京文学出版社",
          // "isbn": "978-692-9988-01-2",  
        }, 
        gridData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }],
        // dialogEditUser:false,   
        EditUserform: { 
          "user_id": 13, 
          "phone_num": "" , 
          "name": "",
          "id_card": "", 
          "pwd": "", 
        },
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
        //撤销、激活
        operationDialog:false,//Dialog状态
        operationDialogtitle:"",//Dialog头部
        operationDialogText:"",//Dialog内容
       
    };
  },
  created(){ 
    this.params() 
  },
  mounted(){  }, 
  methods: {   
    params(phone){
      let me = this;  
        me.$requestAxios(me,{
          url : 'order',
            data : {} ,
            method : 'get',
            urlParam :'/list?type=1&state='+(me.state?me.state:'1')+(me.currentPage?'&offset='+me.currentPage:'')+(phone?'&search='+phone:''),  
        },function(res,opt){  
          if (res.data.error_code == 200) {  
              me.tableData = res.data.data.list;  
              me.totalNum = res.data.data.total ? res.data.data.total : 0; 
              for(let i in me.tableData){ 
                  me.tableData[i].send_name=me.tableData[i].send_name?me.tableData[i].send_name:'一一一一';
                  me.tableData[i].send_phone_num=me.tableData[i].send_phone_num?me.tableData[i].send_phone_num:'一一一一';
              }
          }
        })   
    },
    //订单详情
    orderDetail(order_id){  
        let me = this;    
        me.$requestAxios(me,{
          url : 'order',
            data : {} ,
            method : 'get',
            urlParam :'/show?type=1&order_id='+order_id,  
        },function(res,opt){ 
          // console.log(res)
          if (res.data.error_code == 200) {  
              me.dialogOrderDetail = true;    
              me.orderDetailform = res.data.data;   
          }
        })    
    },  
     handleCurrentChange(val) {//获取当前页的值事件
      // console.log(`当前页: ${val}`);
      this.params();
      this.searchID='';
    },
    handleClick(tab, event) {//state 订单列表（1新订单 2已接单 3配送中）
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
       //订单编辑
    orderEdit(e){ 
       console.log() 
       this.orderEditform =  e
       this.dialogOrderEdit = true;
      //  console.log(this.tableData1) 
        //  this.updateForm=JSON.parse(JSON.stringify(this.tableData1[e])) 
      //  console.log(this.updateForm)

      // Book.put(e,{
      //     price: 23.88
      // })  
    },  
    submitFormOrderEdit(formName){ 
      console.log('订单编辑')
      let self = this;
      self.$refs[formName].validate((valid) => {
        if (valid) {
            console.log(this.orderEditform)
            
            // self.getdeptList(3);
            // self.$ztdMessage('撤销成功', 'success')

            // self.$refs[formName].resetFields();
            self.dialogorderEdit = false;

          
        } else {
          return false; 
        }
      });
    }, 
     // 撤销  
      revoke(e,index,fn){  
        this.Index=index;
        this.updateForm =e;
        this.operationDialog = true;
        this.operationDialogtitle = '撤销新订单';  
         this.operationDialogText = '是否要撤销该订单?';
      }, 
      //Dialog关闭
      operationDialogClose() { 
        let me = this;
        me.operationDialog = false;
        me.$requestAxios(this,{
            url : 'order',
            data : {order_id:me.updateForm.order_id},
            method : 'delete',
            urlParam:'/repeal',
          },function(res,opt){
            console.log(res)  
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
    .orderList .el-table_1_column_1.is-leaf ,.orderList .userName{
        padding-left: 30px!important;
    }  
    /* 固定el-table头部高度 */
    .orderList .el-table__body-wrapper.is-scrolling-none{
      overflow-y: auto;
      max-height: calc(100vh - 455px)!important;
    }  
    .orderList  .tableData .el-table{
        height: calc(100vh - 410px)!important;
        /* height: calc(100vh - 325px); */
    } 
   
   /* dialog 宽度 */
  .order-dialog-Class .el-dialog {
      width: 940px;
  }
  .orderEdit-dialog-Class .el-dialog {
      width: 700px;
  }
  .el-dialog .orderInformation_title ,.el-dialog .librarianInformation_title{ 
      font-size: 14px;  
      color: #333333;
      height: 40px;
      line-height: 40px;
      margin-top: 15px;
  } 
   .order-dialog-Class .el-dialog__body { 
      font-size: 14px!important;  
      color: #77778C!important; 
      line-height: 30px;
      padding: 0px 20px 30px;
        
  }
  .order-dialog-Class  .orderInformation_contet {  
      color:  #333333 ; 
  }  
  /* dialog table */
  .order-dialog-Class .el-table__header th {
      background: rgba(250, 250, 252, 1); 
      padding: 7px 0;
      font-size: 16px;
      font-weight: 400;
      color: #77778C!important;
  }
   .order-dialog-Class .el-table .cell {  
      color: #77778C!important; 
  }
  .order-dialog-Class .el-table--enable-row-transition .el-table__body td{
      height: 50px!important; 
      border-bottom: 1px solid rgba(0, 0, 0, 0.08)!important; 
  }  
   
  .order-dialog-Class .el-table--enable-row-hover .el-table__body tr:hover td:last-child,.order-dialog-Class .el-table--enable-row-hover .el-table__body tr:hover   td{
      border : none!important;   
      height: 50px!important; 
      border-bottom: 1px solid rgba(0, 0, 0, 0.08)!important; 
  }  
  /* dialog table end*/
</style>