<template>
  <el-row>
    <div class="librarian userBalance">
        <div class="librarian_title">充值模版<span class="librarian_title_child">/ 用户余额</span></div> 
         <div class="librarian_content">
            <el-col :span="24"> 
              <div class="top" >  
                  <el-col :span="12"> 
                     <el-input  prefix-icon="el-icon-search" @keyup.enter.native="search()"   placeholder="请输入" v-model="searchID" oninput="javascript:value=this.value.replace(/[^\d]/g,'');" style="width:240px;padding-right: 20px;color:#333!important;" > 
                      </el-input> 
                      <el-button type="success" plain style="width:80px;margin-left:20rpx;" @click="search()" >查询</el-button> 
                  </el-col> 
              </div>
            </el-col>   
             <el-table   ref="multipleTable"   :data="tableData"  class="tableData"  tooltip-effect="dark"    style="width: 100%"   
                @cell-dblclick='copyContent'    > 
                <el-table-column   prop="name"  label="用户姓名"  class-name="userName" :show-overflow-tooltip='true'>   </el-table-column>
                <el-table-column    prop="phone_num"   label="手机号"     >   </el-table-column>  
                <el-table-column    prop="balance" label="用户余额" width="170px"   >    </el-table-column>  
                <el-table-column  prop="stock"  label="操作"   width="200px"   >
                   <template slot-scope="scope">
                      <el-button   type="text"  @click="recordList(tableData[scope.$index].user_id,scope.$index)" > 充值记录</el-button>
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
      <!-- recordListform 充值记录 -->
        <div class="pro-dialog-box order-dialog-Class">
          <el-dialog title="充值记录" :visible.sync="dialogRecordList"  >
              <el-col :span="24"> 
                <div class="orderInformation" >
                    <p class="orderInformation_title">订单信息</p>
                    <el-col :span="8"> 
                        <p style="margin-bottom: 20px!important;"> 用户姓名: <span class="orderInformation_contet" >&nbsp;{{name}}</span></p>
                   </el-col>
                    <el-col :span="8"> 
                        <p> 用户手机:<span class="orderInformation_contet" >&nbsp;{{phone_num}}</span></p>     
                    </el-col>
                  </div>
              </el-col>
              <el-col :span="24">  
                <div> 
                    <el-table :data="recordListform" class="recordListform" > 
                      <el-table-column property="amount" label="充值金额"  :show-overflow-tooltip='true'  ></el-table-column>
                      <el-table-column property="paid_at" label="充值时间"  :show-overflow-tooltip='true'></el-table-column>
                      <el-table-column property="pay_type" label="充值方式"  :show-overflow-tooltip='true'></el-table-column> 
                    </el-table>
                    <div style="padding: 25px 0 0 0 ;text-align: center;">  
                      <el-pagination  v-if="DialogtotalNum > DialogpageNum" 
                        @current-change="DialoghandleCurrentChange"
                        background
                        :current-page.sync="DialogcurrentPage"
                        layout="prev, pager, next,total,jumper"
                        :page-size="DialogpageNum"
                        :total="DialogtotalNum">
                      </el-pagination>
                    </div>  
                </div>
              </el-col> 
            <div slot="footer" class="dialog-footer">
              <!-- <div class="dialog-footer-btn-box" style="margin :30px 38px 0 0"> -->
                <!-- <el-button @click="dialogRecordList = false">取 消</el-button>  -->
              <!-- </div> -->
              <div class="dialog-footer-btn-box">
                <!-- <el-button type="primary" @click="submitFormRecordList('recordListform')">确定</el-button>  -->
                <el-button type="primary" @click="dialogRecordList = false">确定</el-button> 
              </div>
            </div>
          </el-dialog>
        </div>
    </div>
  </el-row>
</template>
<script>  

export default {
  name:'userBalance',  
  data() {
    return { 
        updateForm:  {   }  , 
        searchID:'' ,//查询
        user_id:'',
        tableData:[ 
          {
            "user_id": 23,
            "name": "用户137",
            "phone_num": 13901234137,
            "balance": 0.01
          },
          {
            "user_id": 22,
            "name": "丁德政",
            "phone_num": 13360573211,
            "balance": 0
          },
          {
            "user_id": 13,
            "name": "李泽森",
            "phone_num": 13580998161,
            "balance": 0
          },
          {
            "user_id": 12,
            "name": "李泽森",
            "phone_num": 13580998169,
            "balance": 0
          },
          {
            "user_id": 11,
            "name": "李泽森",
            "phone_num": 13580998168,
            "balance": 0
          },
          {
            "user_id": 6,
            "name": "娃娃",
            "phone_num": 13719311152,
            "balance": 2.01
          },
          {
            "user_id": 5,
            "name": "李泽森",
            "phone_num": 13580998167,
            "balance": 0
          },
        ],  
        currentPage: 0,
        pageNum:10,
        totalNum:0,
        
        //  * Dialog查看记录
        dialogRecordList:false,   
        recordListform: [  
          {
            amount: "0.01元",
            paid_at: "2020/09/12 19:29",
            pay_type: "支付宝"
          }, 
          {
            amount: "0.01元",
            paid_at: "2020/09/12 19:29",
            pay_type: "支付宝"
          },  
        ],
        name: "李泽森",
        phone_num: 13539916031, 
        DialogcurrentPage: 0,
        DialogpageNum:10,
        DialogtotalNum:0,
    };
  },
  created(){ 
    this.params()
  },  
  methods: { 
     params(phone){
      let me = this;  
        me.$requestAxios(me,{
          url : 'recharge',
            data : {} ,
            method : 'get',
            urlParam :'/list?offset='+(me.currentPage?me.currentPage:'0')+(phone?'&search='+phone:''),  
        },function(res,opt){ 
            // console.log(res)
          if (res.data.error_code == 200) {  
              me.tableData = res.data.data.data;  
              me.totalNum = res.data.data.total ? res.data.data.total : 0; 
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
        this.$ztdMessage('请输入查询！','warning' )  
        return false;
      } 
    },   
    //操作台-充值记录列表  
    recordList(user_id){  

        let me =this;
        me.user_id=user_id;     
        me.$requestAxios(me,{
          url : 'recharge',
            data : {} ,
            method : 'get',
            urlParam :'/record?user_id='+me.user_id+(me.DialogcurrentPage?'&offset='+me.DialogcurrentPage:''),  
        },function(res,opt){ 
          console.log(res)
          if (res.data.error_code == 200) {  
             me.dialogRecordList = true;    
              me.recordListform = res.data.data.data; 
              me.DialogtotalNum = res.data.data.total;   
          }
        })  
      },   
    DialoghandleCurrentChange(val) {//获取当前页的值事件    
      this.recordList(this.user_id); 
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
    .userBalance .el-table_1_column_1.is-leaf ,.userBalance .userName{
        padding-left: 30px!important;
    }  
    /* 固定el-table头部高度 */
    .userBalance .tableData .el-table__body-wrapper.is-scrolling-none{
      overflow-y: auto;
      height: calc(100vh - 370px)!important;
    }  
    .userBalance  .tableData .el-table{
         height: calc(100vh - 325px)!important;
    } 
    .userBalance .pro-dialog-box .el-table__body-wrapper.is-scrolling-none {
        overflow-y: auto;
        max-height: calc(100vh - 581px)!important;
    }
    .recordListform .el-table__empty-block{
      margin: 20px auto 10px;
    }
  /* .pro-dialog-Class .el-dialog {  
      width: 440px;
      
  } */
</style>