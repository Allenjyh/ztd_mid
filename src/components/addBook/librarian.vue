<template>
  <el-row>
    <div class="librarian _librarian">
        <div class="librarian_title">图书管理</div>
         <div class="librarian_content">
            <el-col :span="24">
              <div class="top" >  
                  <el-col :span="12"> 
                     <el-input  prefix-icon="el-icon-search" @keyup.enter.native="search()"  placeholder="请输入ISBN码" v-model="isbn"  style="width:240px;padding-right: 20px;color:#333!important;" 
                          oninput="javascript:value=this.value.replace(/[^\d]/g,'');if(this.value.length>13) this.value=this.value.substring(0,13);"  >
                      </el-input> 
                      <el-button type="success" plain style="width:80px;margin-left:20rpx;" @click="search()" >查询</el-button> 
                  </el-col>
                  <el-col :span="12">
                      <div class="rightControl rightCont" v-if="selectID.length > 0" @click="Delete()" ><span>删除</span></div>
                      <div class="rightControl rightCont" v-else style="opacity:0.45;cursor:not-allowed; " ><span>删除</span></div>
                      <div class="rightControl">
                          <div class="add_book" @click="addBook"><span class="addicon">+</span><span>添加图书</span></div>  
                      </div>
                  </el-col>
              </div>
            </el-col>    
             <el-table   ref="multipleTable"   :data="tableData"    tooltip-effect="dark"    style="width: 100%"   
                :cell-class-name="tableCellClassName"
                :row-class-name="tableRowClassName"
                @cell-dblclick='copyContent'
                @selection-change="handleSelectionChange">
                <el-table-column  prop="isbn"  type="selection"   width="55">    </el-table-column>
                <el-table-column  label="ISBN" width="155"><template slot-scope="scope">{{ scope.row.isbn }}</template></el-table-column>
                <!-- <el-table-column  prop="book_num"  label="书号"   width="155" ></el-table-column> -->
                <el-table-column  prop="book_name" label="书名"   :show-overflow-tooltip='true'></el-table-column>
                <el-table-column  prop="author"    label="作者"   width="140"  :show-overflow-tooltip='true'></el-table-column>
                <el-table-column  prop="publisher" label="出版社" width="160px" :show-overflow-tooltip='true'></el-table-column>
                <el-table-column  prop="stock"     label="库存"   width="80px"></el-table-column>
                <el-table-column  prop="stock"     label="操作"   width="190">
                   <template slot-scope="scope">
                      <el-button  type="text" @click="detail(tableData[scope.$index].isbn,scope.$index)"> 详情 </el-button>
                      <el-button  type="text" @click="editDate(tableData[scope.$index].isbn,scope.$index)"> 修改 </el-button>
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
              <addBook   v-on:childInfo="childChange" v-bind:Info="Info" v-bind:updateForm="updateForm"></addBook> 
         </div>  
    </div>
  </el-row>
</template>
<script>
import addBook from '../addBook/addBook.vue'
import Book from '../../../public/js/librarian/book.js'

export default {
  name:'librarian', 
  inject:['reload'], 
  components:{addBook},
  data() {
    return {
      //子组件
         //提交的参数
        Info:{
          dialog:false, 
          fristParam:false,//点击添加图片清除数据 
          bookTitle:'修改图书'
        }, 
        Index:'',//选中行
        updateForm:  {   }  ,
        method:'post',//get方法：获取某一条数据；post方法：增加数据；put方法：修改数据；delete方法：删除数据 
        isbn:'' ,
        tableData1: [ 
          {
              book_num : 234988976, //String  书号
              price : 13.33, //Double  定价(保留两位小数)
              publish_date: '1598457600000', //Date  出版时间
              rack_no: 'B234', //String  架位号
              mode: 1, //Number  1:幼儿模式 2:少年模式 3:青少年模式 4:成人模式
              stock: 23, //Number  库存
              isbn: '1', //Number  条形码
              book_name: '薛兆丰经济学', //String  书名
              author: '欧阳离合', //String  作者
              publisher: '中国人民日报出版社', //String  出版社
              sort_num: '分类号', //String  分类号
              book_size: 'A4', //String  开本
              stack_room: 'B1-90', //String  库区
              page_num: '146', //Number  页码
              edition: '版次', //String  版次
              binding: '1', //String  装帧
              picture_url: 'http://pics.zscdzhe.com/公司7.jpg', //Stirng 图片地址
              synopsis: '简介' //String  简介
          },
          {
              book_num : 234988976, //String  书号
              price : 13.33, //Double  定价(保留两位小数)
              publish_date: '1598457600000', //Date  出版时间
              rack_no: 'B234', //String  架位号
              mode: 1, //Number  1:幼儿模式 2:少年模式 3:青少年模式 4:成人模式
              stock: 23, //Number  库存
              isbn: '2', //Number  条形码
              book_name: '薛兆丰经济学', //String  书名
              author: '欧阳离合', //String  作者
              publisher: '中国人民日报出版社', //String  出版社
              sort_num: '分类号', //String  分类号
              book_size: 'A4', //String  开本
              stack_room: 'B1-90', //String  库区
              page_num: '146', //Number  页码
              edition: '版次', //String  版次
              binding: '1', //String  装帧
              picture_url: 'http://pics.zscdzhe.com/公司7.jpg', //Stirng 图片地址
              synopsis: '简介' //String  简介
          },
          {
              book_num : 234988976, //String  书号
              price : 13.33, //Double  定价(保留两位小数)
              publish_date: '1598457600000', //Date  出版时间
              rack_no: 'B234', //String  架位号
              mode: 1, //Number  1:幼儿模式 2:少年模式 3:青少年模式 4:成人模式
              stock: 23, //Number  库存
              isbn: '3', //Number  条形码
              book_name: '薛兆丰经济学', //String  书名
              author: '欧阳离合', //String  作者
              publisher: '中国人民日报出版社', //String  出版社
              sort_num: '分类号', //String  分类号
              book_size: 'A4', //String  开本
              stack_room: 'B1-90', //String  库区
              page_num: '146', //Number  页码
              edition: '版次', //String  版次
              binding: '1', //String  装帧
              picture_url: 'http://pics.zscdzhe.com/公司7.jpg', //Stirng 图片地址
              synopsis: '简介' //String  简介
          },
          {
              book_num : 234988976, //String  书号
              price : 13.33, //Double  定价(保留两位小数)
              publish_date: '1598457600000', //Date  出版时间
              rack_no: 'B234', //String  架位号
              mode: 1, //Number  1:幼儿模式 2:少年模式 3:青少年模式 4:成人模式
              stock: 23, //Number  库存
              isbn: '4', //Number  条形码
              book_name: '薛兆丰经济学', //String  书名
              author: '欧阳离合', //String  作者
              publisher: '中国人民日报出版社', //String  出版社
              sort_num: '分类号', //String  分类号
              book_size: 'A4', //String  开本
              stack_room: 'B1-90', //String  库区
              page_num: '146', //Number  页码
              edition: '版次', //String  版次
              binding: '1', //String  装帧
              picture_url: 'http://pics.zscdzhe.com/公司7.jpg', //Stirng 图片地址
              synopsis: '简介' //String  简介
          },
          {
              book_num : 234988976, //String  书号
              price : 13.33, //Double  定价(保留两位小数)
              publish_date: '1598457600000', //Date  出版时间
              rack_no: 'B234', //String  架位号
              mode: 1, //Number  1:幼儿模式 2:少年模式 3:青少年模式 4:成人模式
              stock: 23, //Number  库存
              isbn: '5', //Number  条形码
              book_name: '薛兆丰经济学', //String  书名
              author: '欧阳离合', //String  作者
              publisher: '中国人民日报出版社', //String  出版社
              sort_num: '分类号', //String  分类号
              book_size: 'A4', //String  开本
              stack_room: 'B1-90', //String  库区
              page_num: '146', //Number  页码
              edition: '版次', //String  版次
              binding: '1', //String  装帧
              picture_url: 'http://pics.zscdzhe.com/公司7.jpg', //Stirng 图片地址
              synopsis: '简介' //String  简介
          },
          {
              book_num : 234988976, //String  书号
              price : 13.33, //Double  定价(保留两位小数)
              publish_date: '1598457600000', //Date  出版时间
              rack_no: 'B234', //String  架位号
              mode: 1, //Number  1:幼儿模式 2:少年模式 3:青少年模式 4:成人模式
              stock: 23, //Number  库存
              isbn: '6', //Number  条形码
              book_name: '薛兆丰经济学', //String  书名
              author: '欧阳离合', //String  作者
              publisher: '中国人民日报出版社', //String  出版社
              sort_num: '分类号', //String  分类号
              book_size: 'A4', //String  开本
              stack_room: 'B1-90', //String  库区
              page_num: '146', //Number  页码
              edition: '版次', //String  版次
              binding: '1', //String  装帧
              picture_url: 'http://pics.zscdzhe.com/公司7.jpg', //Stirng 图片地址
              synopsis: '简介' //String  简介
          },
          {
              book_num : 2, //String  书号
              price : 13.33, //Double  定价(保留两位小数)
              publish_date: '1598457600000', //Date  出版时间
              rack_no: 'B234', //String  架位号
              mode: 1, //Number  1:幼儿模式 2:少年模式 3:青少年模式 4:成人模式
              stock: 23, //Number  库存
              isbn: '7', //Number  条形码
              book_name: '书名', //String  书名
              author: '书的作者', //String  作者
              publisher: '出版社', //String  出版社
              sort_num: '分类号', //String  分类号
              book_size: 'A4', //String  开本
              stack_room: 'B1-90', //String  库区
              page_num: '146', //Number  页码
              edition: '版次', //String  版次
              binding: '1', //String  装帧
              picture_url: 'http://pics.zscdzhe.com/公司6.jpg', //Stirng 图片地址
              synopsis: '简介' //String  简介
          }
        ],
        tableData:[],
        multipleSelection: [],//当前选中的数据
        selectID: [],  //当前选中行id
        checkedInfo: '',  //选多行
        loading: false,  

        currentPage: 0,
        pageNum:12,
        totalNum:0,
    };
  },
  created(){ 
    this.params()
  },
  mounted(){  },
  updated(){   },
  methods: {
    params(phone){
      let me = this; 
        // me.tableData= JSON.parse(JSON.stringify(me.tableData1))  //复制对象 

        // console.log(Book)
        //获取列表
      //  Book.getList(me.tableData1)
      //  console.log(Book.list)
      
        //  console.log(me.tableData)
      // Book.post(Book1)

      // Book.put(12376768757,{
      //     price: 23.88
      // }) 
 
      // Book.checkAll() 
        me.$requestAxios(this,{
          url : 'bookList',
            data : {} ,
            method : 'get',
            urlParam :'?limit='+me.pageNum+'&currentPage='+(me.currentPage?me.currentPage:'0')+(phone?'&search='+phone:''),  
        },function(res,opt){ 
            console.log(res)
          if (res.data.error_code == 200) {  
              me.tableData = res.data.data.data; 
              // me.tableData= JSON.parse(JSON.stringify(me.tableData1)) 
              // res.data.data.totalNum ? (me.totalNum = res.data.data.totalNum ? res.data.data.totalNum : 0) : ''; 
              me.currentPage == 0 ? (me.totalNum = res.data.data.totalNum ? res.data.data.totalNum : 0) : ''; 
              for(let i=0;i<res.data.data.data.length;i++){ 
                me.tableData[i].publish_date = res.data.data.data[i].publish_date ? res.data.data.data[i].publish_date * 1000: '';
              } 
              //  Book.getList(me.tableData)
          }
        })    
    },
    childChange(e){
      let me =this;
      console.log(e)
       e.childInfo.picture_url =e.childInfo.picture_url.split('/')[e.childInfo.picture_url.split('/').length - 1]; 
      //  me.Info.dialog=false
      // this.updateForm =e.updateForm ; 
      if('post' ==  me.Info.method){//添加 
          let _data =JSON.parse(JSON.stringify(e.childInfo))
          // _data.is_activate=0 
          me.$requestAxios(me,{
            url : 'book',
            data : _data,
            method : 'post',
          },function(res,opt){  
            console.log(res) 
            me.$ztdMessage( ' 添加成功！','success' ) 
            me.reload(); 
            me.Info.dialog=false;
          })   
      }else{//修改  
          let dataID=  e.childInfo.id; 
         
          let modify =JSON.parse(JSON.stringify(e.childInfo)) 
          delete modify.id   
          delete modify.type_ids   
          me.$requestAxios(me,{
            url : 'book',
            data :{id:dataID,modify:JSON.stringify(modify)} , 
            method : 'put',
          },function(res,opt){  
            me.reload();  
            // me.tableData[me.Index]=e.childInfo;           
            me.$ztdMessage( ' 修改成功！','success' )  
            me.Info.dialog=false; 
          })   
      }
    },
     handleCurrentChange(val) {//获取当前页的值事件
      // console.log(`当前页: ${val}`);
      this.params();
      this.searchID='';
    },
    addBook(){//添加
      let me =this; 
      me.Info.dialog = true;
      me.Info.fristParam = true;  
      me.Info.bookTitle='添加图书'
      me.Info.method = "post";  
    },
    editDate(e,index){//修改
       this.Info.dialog = true;  
       this.Info.bookTitle='修改图书';
       this.Index=index; 
        this.updateForm=JSON.parse(JSON.stringify(this.tableData[index] )) 
        // this.updateForm.rack_no=this.updateForm.rack_no+'';
        // this.updateForm.book_num=this.updateForm.book_num+'';
        this.updateForm.mode=this.updateForm.mode+'';
      //  console.log(this.updateForm)  
       this.Info.method = "put";
    },
    detail(e,index){//详情
      let me =this; 
      me.Info.dialog = true;  
      me.Info.bookTitle='' ;
      this.Index=index; 
      this.updateForm=JSON.parse(JSON.stringify(this.tableData[index] )) 
      // this.updateForm.rack_no=this.updateForm.rack_no+'';
      // this.updateForm.book_num=this.updateForm.book_num+'';
      // this.updateForm.mode=this.updateForm.mode+'';
      let publish_date = new Date( me.updateForm.publish_date.toString().length == 10 ? me.updateForm.publish_date * 1000 : me.updateForm.publish_date  ).toLocaleDateString().split("/");    
      me.updateForm.publish_date  = me.updateForm.publish_date ? publish_date[0]+"年"+publish_date[1]+"月"+publish_date[2]+"日" : '';
    },
    Delete(){    
      let me =this; 
       me.$requestAxios(this,{
          url : 'book',
          data : {ids:this.checkedInfo},
          method : 'delete',
        },function(res,opt){  
          console.log(res )
          // me.reload(); 
          Book.delete(me.selectID) 
          me.tableData=Book.list;  
          me.$ztdMessage(  ' 删除成功！',   'success' )
        }) 
    },   
     search(){//查询 isbn 
      if(this.isbn.length == 13){  
          this.params(this.isbn);
          this.currentPage = 0;
          this.totalNum = 1;  
      }else if(this.isbn.length == ''){  
          this.params();
          this.currentPage = 0;
          this.totalNum = 1;   
      } else {
        this.$ztdMessage('请输入正确的ISBN码！','success' )  
        console.log('error submit!!');
        return false;
      } 
    }, 
    // 选中背景色
    tableRowClassName({ row, rowIndex }) {
      let color = ''
      for(let item of this.selectID.values()){
        if(item === row.isbn)color = 'table-SelectedRow-bgcolor'
      }
      // console.log(color)
      return color
    }, 
    // 选中操作背景色
    tableCellClassName({ row, column, rowIndex, columnIndex }) {
      let color = ''
      for(let item of this.selectID.values()){
        // if(item === row.isbn)color = 'table-SelectedCell-bgcolor'
      }
      // console.log(color)
      return color
    },  
    /*  获取当前选中的数据 */
      handleSelectionChange(row) { 
        this.multipleSelection = row;
        // console.log(row)
         this.selectID = []
          var  checkedInfo='';
        if (row.length > 0) {
          row.forEach((value, index) => {
            this.selectID.push(value.id)
             if(value.id ){ 
                checkedInfo+=value.id? value.id+',':'';
              }
          })
          console.log(this.selectID) 
        }  
          this.checkedInfo=checkedInfo.slice(0, checkedInfo.length - 1) 
      },
      rowSelection(val) {
        console.log(val)
        if (val) { 
          this.$refs.multipleTable.toggleRowSelection(val); 
        }  

      },
      copyContent(row, column, cell, event){//双击复制单元格内容 
          
         let _this = this;
          this.$copyText(cell.innerText).then(function (e) { 
            _this.$message({ showClose: true,  message: "复制成功",  type: "success"});
          }, function (e) {
            _this.$message({showClose: true, message: "复制失败，请手动复制", type: "error"});
          })
      },
    
  }
};
</script>
<style   scoped>
    /* @import  '../../../public/css/librarian.css'; */
</style>
<style   >
    ._librarian  .table-SelectedRow-bgcolor   td{/* 选中变背景颜色*/
       background:rgba(250,250,252,1)!important; 
    }
    ._librarian  .table-SelectedCell-bgcolor   button{/* 选中变操作颜色*/
       /* background:red!important; */
       opacity: 0.45;cursor:not-allowed
       
    }
   ._librarian .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner  {
      background-color: rgba(103,207,220,1)!important;
      border-color: rgba(103,207,220,1)!important;
   }
   ._librarian .el-checkbox__input  .el-checkbox__inner:hover { 
      border-color: rgba(103,207,220,1)!important;
   } 
    /* 固定el-table头部高度 */
    ._librarian .el-table__body-wrapper.is-scrolling-none{
      overflow-y: auto;
      max-height: calc(100vh - 370px)!important;
    }   
    /* 固定el-table头部高度 */
    ._librarian .el-table__body-wrapper.is-scrolling-none{
      overflow-y: auto;
      max-height: calc(100vh - 370px)!important;
    }  
    ._librarian  .tableData .el-table{
        height: calc(100vh - 325px)!important;
    }
</style>