<template>
  <el-row>
    <div class="librarian  returnList">
        <div class="librarian_title">图书借阅<span class="librarian_title_child">/ 还书列表</span></div> 
         <div class="librarian_content">
           <el-col :span="24">
              <div  >
                  <el-tabs v-model="activeName" @tab-click="handleClick" class="_color">
                    <el-tab-pane label="预约还书" name="预约还书" state="5"></el-tab-pane>
                    <el-tab-pane label="已接单" name="已接单" state="6"></el-tab-pane> 
                    <el-tab-pane label="已取书" name="已取书" state="7"></el-tab-pane>
                    <el-tab-pane label="审阅中" name="审阅中" state="8"></el-tab-pane>
                    <el-tab-pane label="已完成" name="已完成" state="9"></el-tab-pane>
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
              <el-table  ref="multipleTable"   :data="tableData" class="tableData"   tooltip-effect="dark"    style="width: 100%"   
                  @cell-dblclick='copyContent'    > 
                  <el-table-column  prop="name"  label="姓名"  class-name="userName"  width="155px" >   </el-table-column>
                  <el-table-column  prop="phone_num"   label="手机号" > </el-table-column>  
                  <el-table-column  prop="subscribe_at" label="预约时间"   :show-overflow-tooltip='true'></el-table-column>  
                  <el-table-column  prop="back_name" label="配送员"   ></el-table-column>  
                  <el-table-column  prop="back_phone_num" label="配送员手机号" ></el-table-column>  
                  <el-table-column  prop="stock"  label="操作"   width="230px"   >
                    <template slot-scope="scope">
                        <el-button  v-if="state == 8" type="text"  @click="reviewDetail(tableData[scope.$index])" > 审阅 </el-button> 
                        <el-button  v-if="state == 7" type="text"  @click="receiveBook(tableData[scope.$index],scope.$index)">接收图书 </el-button> 
                        <el-button  type="text"  @click="orderDetail(tableData[scope.$index].order_id)"> 订单详情 </el-button> 
                      </template> 
                </el-table-column> 
                </el-table> 
              </div>  
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
                <el-button type="primary"  @click="dialogOrderDetail = false">确定</el-button> 
              </div>
            </div>
          </el-dialog>
        </div>
      <!-- reviewDetailform 审阅 -->
        <div class="pro-dialog-box order-dialog-Class ">
          <el-dialog title="审阅" :visible.sync="dialogReviewDetail"  >
              <el-col :span="24"> 
                <div class="orderInformation">
                    <p class="orderInformation_title">订单信息</p>
                    <el-col :span="8"> 
                        <p> 用户姓名: <span class="orderInformation_contet">&nbsp;{{reviewDetailform.name}}</span></p>
                   </el-col>
                    <el-col :span="8"> 
                        <p> 用户手机:<span class="orderInformation_contet">&nbsp;{{reviewDetailform.phone_num}}</span></p>       
                    </el-col> 
                  </div>
              </el-col>
              <el-col :span="24"> 
                <div>
                    <p class="librarianInformation_title">图书信息</p>
                    <el-table :data="reviewDetailform.book_info">
                      <el-table-column property="book_name" label="书籍"  width="280" :show-overflow-tooltip='true'  ></el-table-column>
                      <el-table-column property="isbn" label="ISBN码" :show-overflow-tooltip='true'></el-table-column>
                      <el-table-column property="is_lose" label="是否遗失"    > 
                         <template slot-scope="scope"> 
                                  {{ scope.row.is_lose == '0' ?  '否' : "是" }}
                         </template> 
                      </el-table-column>
                      <el-table-column property="isDamage" label="损坏程度" width="230">
                        <template slot-scope="scope">
                          <div v-if="scope.row.is_lose == '0'"> 
                            <el-radio v-model="scope.row.isDamage" label="0">完好</el-radio>
                            <el-radio v-model="scope.row.isDamage" label="1">损坏</el-radio> 
                          </div>
                          <div v-else>空数据</div>
                        </template> 
                      </el-table-column>
                    </el-table>
                </div>
              </el-col> 
              <el-col :span="24"> 
                <div>
                    <div class="damages"> 
                       <span>总赔偿金额&nbsp; </span>  
                       <el-input style="width:100px" v-model="reviewDetailform.compensation" ></el-input><span> &nbsp;元</span>
                    </div>
                </div>
                 <el-col :span="8"> 
                        <p style="margin-top: 42px;"> 审阅人: <span class="orderInformation_contet">&nbsp;{{reviewDetailform.nickname}}</span></p>
                  </el-col>
              </el-col> 
            <div slot="footer" class="dialog-footer">
              <div class="dialog-footer-btn-box" style="margin :30px 38px 0 0">
                <el-button @click="dialogReviewDetail = false">取 消</el-button> 
              </div>
              <div class="dialog-footer-btn-box">
                <el-button type="primary" @click="submitFormreviewDetail('reviewDetailform')">确定</el-button> 
              </div>
            </div>
          </el-dialog>
        </div>

     <!--Dialog 弹出一个对话框(接收图书、撤销)-->
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

export default {
  name:'returnList',  
  inject:['reload'], 
  data() {
    return {  
        activeName: '预约还书',
        state:5,//还书列表（5预约还书 6已接单 7已取书 8审阅中 9已完成

        updateForm:  {   }  , 
        searchID:'' ,//查询
        
        tableData:[ 
          // back_name: "",
          // back_phone_num: "",
          // name: "李泽森",
          // order_id: 61,
          // phone_num: "13333333333",
          // subscribe_at: "1970/01/01 08:00"
        ], 
        Index:'',//当前选中行操作

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
            //     publisher: "1",//损坏程度
            //   },
            //   {
            //     author: "闫润京编著",
            //     book_name: "我是电脑知识大王",
            //     isbn: "9787515003108",
            //     publisher: "2",
            //   }
            // ],
            //   order_code: "1598523343901086445",
            //   state: "预约还书",
            //   subscribe_at: "2020/08/27 18:15",
              // id_card: "440111199803220430",
              // name: "李泽森",
              // phone_num: 13539916031,
              
        },
        //  * Dialog审阅中
        dialogReviewDetail:false,   
        reviewDetailform: {  
            book_info:[
              // {
              //   is_lose: "1",
              //   book_name: "壶觞清酌:中华酒文化大观",
              //   isbn: "9787554209516",
              //   isDamage: "0",
              // },
              // {
              //   is_lose: "0",//否
              //   book_name: "我是电脑知识大王",
              //   isbn: "9787515003108",
              //   isDamage: "0",
              // },
              // {
              //   is_lose: "1",
              //   book_name: "壶觞清酌:中华酒文化大观",
              //   isbn: "9787554209516",
              //   isDamage: "0",
              // },
              // {
              //   is_lose: "0",//否
              //   book_name: "我是电脑知识大王",
              //   isbn: "9787515003108",
              //   isDamage: "0",
              // }
            ], 
              name: "",
              phone_num: '',
              nickname:'',
              compensation:'',//赔偿金
        },
        reviewSubmitform:{
          // order_id:'',
          // user_id:'',
          // compensation:'',//赔偿金
          // damage:   {
          //     "9787515003108": 1,//isbn:isDamage
          //     "9787554209516": 0
          //   },
          
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
            urlParam :'/list?type=3&state='+(me.state?me.state:'5')+(me.currentPage?'&offset='+me.currentPage:'')+(phone?'&search='+phone:''),  
        },function(res,opt){  
          if (res.data.error_code == 200) {  
              me.tableData = res.data.data.list;  
              me.totalNum = res.data.data.total ? res.data.data.total : 0; 
              for(let i in me.tableData){ 
                  me.tableData[i].back_name=me.tableData[i].back_name?me.tableData[i].back_name:'一一一一';
                  me.tableData[i].back_phone_num=me.tableData[i].back_phone_num?me.tableData[i].back_phone_num:'一一一一';
              }
          }
        })   
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
     handleCurrentChange(val) {//获取当前页的值事件
      // console.log(`当前页: ${val}`);
      this.params();
      this.searchID='';
    },
    handleClick(tab, event) {//还书列表（5预约还书 6已接单 7已取书 8审阅中 9已完成
        this.currentPage = 0;
        this.state = tab.$options._parentVnode.data.attrs.state;
        this.params();
      },  
      //订单详情
    orderDetail(order_id){   
        let me = this;   
        me.$requestAxios(me,{
          url : 'order',
            data : {} ,
            method : 'get',
            urlParam :'/show?type=2&order_id='+order_id,  
        },function(res,opt){ 
          // console.log(res)
          if (res.data.error_code == 200) {  
              me.dialogOrderDetail = true;    
              me.orderDetailform = res.data.data;   
          }
        })    
    },
   //审阅中
    reviewDetail(_reviewData){   
        let me = this;  
        me.reviewSubmitform.order_id=_reviewData.order_id;
        me.reviewSubmitform.user_id=_reviewData.user_id;

        me.reviewDetailform.compensation=''; 
        me.reviewDetailform.phone_num=_reviewData.phone_num;
        me.reviewDetailform.name=_reviewData.name;
        me.reviewDetailform.nickname=JSON.parse(localStorage.getItem('ztd_center_login'))?JSON.parse(localStorage.getItem('ztd_center_login')).nickname:'';
        me.$requestAxios(me,{
          url : 'order',
            data : {} ,
            method : 'get',
            urlParam :'/checkLoss?order_id='+Number(_reviewData.order_id) ,  
        },function(res,opt){ 
          // console.log(res)
          if (res.data.error_code == 200) {  
            me.dialogReviewDetail = true;  
                me.reviewDetailform.book_info =res.data.data; 
              res.data.data.forEach(function(item,index)  { 
                me.reviewDetailform.book_info[index].isDamage='0'; 
              });  
          }
        })    
    }, 
     submitFormreviewDetail(formName){  //审阅中提交操作
      let me = this; 
        me.reviewSubmitform.compensation=me.reviewDetailform.compensation*100;  
        if (me.reviewDetailform.compensation) {
           let _damage={};
              me.reviewDetailform.book_info.forEach(function(item,index)  {  
                  if(item.is_lose == '0'){ 
                   let name=item.isbn,  value=item.isDamage; 
                  _damage[name] = value; 
                  }
              });  
              me.reviewSubmitform.damage=_damage ; 

            me.$requestAxios(me,{
              url : 'order',
                data :me.reviewSubmitform ,
                method : 'put',
                urlParam :'/checkLoss'  ,  
            },function(res,opt){  
              if (res.data.error_code == 200) {  
                // me.tableData.splice(me.Index,1)
               me.reload(); 

                me.$ztdMessage('提交成功', 'success') 
                me.dialogReviewDetail = false;
              }
            })     
        } else {
            me.$ztdMessage('总赔偿金额不能为空', 'warning')
          return false; 
        } 
    }, 
    // 接收图书
      receiveBook(e,index,fn){  
        this.Index=index;
        this.updateForm =e;
        this.operationDialog = true;
        this.operationDialogtitle = '接收图书';  
         this.operationDialogText = '图书是否归还到图书管?';
      }, 
      //Dialog关闭 接收图书操作
      operationDialogClose() { 
        let me = this;
        me.operationDialog = false;
        me.$requestAxios(this,{
            url : 'order',
            data : {order_id:me.updateForm.order_id},
            method : 'put',
            urlParam:'/receiveTheBook',
          },function(res,opt){
            console.log(res)  
            me.tableData.splice(me.Index,1)
            me.$ztdMessage(  ' 接收图书成功！',   'success' )
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
    .returnList .el-table_1_column_1.is-leaf ,.returnList .userName{
        padding-left: 30px!important;
    }  
    /* 固定el-table头部高度 */
    .returnList .el-table__body-wrapper.is-scrolling-none{
      overflow-y: auto;
      max-height: calc(100vh - 455px)!important;
    }  
    .returnList  .tableData .el-table{
        height: calc(100vh - 410px)!important;
        /* height: calc(100vh - 325px); */
    } 
    /* el-dialog */
    .pro-dialog-Class .tableData .el-dialog {
        width: 440px;
    }
    .pro-dialog-box .damages { 
      float: right;
      margin : 30px 10px 0 0 ;
    }   
    .pro-dialog-box .damages span{ 
      font-size: 18px; 
      font-weight: 400;
      color: #FCC017;
      line-height: 25px; 
    }  
    /* el-dialog end*/
</style>