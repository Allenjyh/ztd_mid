<template>
  <el-row>
    <div class="librarian userList package">
        <div class="librarian_title">通用设置<span class="librarian_title_child">/ 安装包更新</span></div> 
         <div class="librarian_content"> 
            <el-col :span="24">
              <div class="top" > 
                  <el-col :span="12"> 
                     <el-input  prefix-icon="el-icon-search" @keyup.enter.native="search()"  placeholder="请输入版本名称" v-model="searchID"  style="width:240px;padding-right: 20px;color:#333!important;" 
                          oninput="javascript:value=this.value.replace(/[^\d.]/g,'');"  >
                      </el-input> 
                      <el-button type="success" plain style="width:80px;margin-left:20rpx;" @click="search()" >查询</el-button> 
                  </el-col>
                  <el-col :span="12"> 
                      <div class="rightControl">
                          <div class="add_book"  style="width:150px;"  @click="UploadEdit( )" ><span class="addicon">+</span><span>上传安装包</span></div>  
                      </div>
                  </el-col>
              </div>
            </el-col>   
             <el-table   ref="multipleTable"   :data="tableData"   class="tableData" tooltip-effect="dark"    style="width: 100%"   
                @cell-dblclick='copyContent' >
                <el-table-column  prop="version_id" class-name="userName"   label="版本ID"   >   </el-table-column>
                <el-table-column  prop="version_name"  label="版本名称"   >   </el-table-column>
                <el-table-column  prop="target_size"  label="文件大小"   >   </el-table-column>
                <el-table-column   prop="is_required"   label="是否强制更新"  >  
                </el-table-column>
                <el-table-column   prop="is_setup"   label="是否安装包">
                    <!-- <template slot-scope="scope">
                      <span>{{scope.row.is_setup == 0 ?'否':'是'}}</span>
                    </template> -->
                </el-table-column>
                <el-table-column  prop="create_time"   label="创建时间"    >   </el-table-column>
                  <el-table-column  prop="stock"  label="操作"   width="280px"   >
                   <template slot-scope="scope"> 
                      <el-button   type="text"  @click="revoke(tableData[scope.$index],scope.$index)" class="redControl">删除</el-button>
                      <el-button  type="text"  @click="orderDetail(tableData[scope.$index])"> 查看详情 </el-button>  
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
     <!-- orderDetailform 安装包详情 -->
        <div class="pro-dialog-box order-dialog-Class">
          <el-dialog title="安装包详情" :visible.sync="dialogOrderDetail"  class="Uploadform" >
              <el-col :span="24"> 
                <div class="orderInformation">
                    <p class="orderInformation_title">安装包信息</p>
                    <el-col :span="7"> 
                        <p> 版本ID:<span class="orderInformation_contet">&nbsp;{{orderDetailform.version_id}}</span></p>
                        <p> 是否强制更新:<span class="orderInformation_contet">&nbsp;{{orderDetailform.is_required}}</span></p>
                        <p> 创建时间:<span class="orderInformation_contet">&nbsp;{{orderDetailform.create_time?orderDetailform.create_time:' /'}}</span></p> 
                    </el-col>
                    <el-col :span="11"> 
                        <p> 版本号名称: <span class="orderInformation_contet">&nbsp;{{orderDetailform.version_name}}</span></p>
                        <p> 下载地址:<span class="orderInformation_contet">&nbsp;{{orderDetailform.app_url}}</span></p>
                                
                    </el-col>
                    <el-col :span="6"> 
                        <p> 是否安装包:<span class="orderInformation_contet">&nbsp;{{orderDetailform.is_setup}}</span></p> 
                        <p> 文件大小:<span class="orderInformation_contet">&nbsp;{{orderDetailform.target_size}}</span></p>
                    </el-col>
                  </div>
              </el-col>
              <el-col :span="24"> 
                <div>
                    <p class="librarianInformation_title">更新日志</p> 
                      <el-input id="content-input"  class="textArea"  readonly   type="textarea" v-model="orderDetailform.version_log" autocomplete="off" maxlength="200" placeholder="请输入"></el-input>
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
    <!-- Uploadform 安装包上传 -->
    <div class="pro-dialog-box order-dialog-Class orderEdit-dialog-Class">
      <el-dialog title="安装包上传" :visible.sync="dialogUploadEdit"  >
         <el-form :model="Uploadform" ref="Uploadform" class="Uploadform">
          <table>
            <tr >
              <td style="height:132px">  
                <el-form-item   label="版本号名称"   label-position="top"   prop="version_name"    :rules="[  { required: true, message: '版本号名称不能为空'}, ]"  >
                  <el-input v-model="Uploadform.version_name" placeholder="请输入" autocomplete="off" style="width: 300px;margin-right:20px;height: 40px;" ></el-input>
             
                </el-form-item>
              </td>
              <td> 
                <el-form-item   label="安装包上传"   label-position="top"   prop="app_url"  :rules="[  { required: true, message: '安装包不能为空'}, ]"  >
                  <!-- <el-input v-model="Uploadform.app_url" placeholder="请上传" autocomplete="off" style="width: 300px;height: 40px;" >
                     <template slot="append" class="Upload">上传</template>
                  </el-input> -->
                  <div>
                    <el-upload
                      class="upload-demo"
                      ref="upload"
                      :action="domain"
                      :data="QiniuData" 
                      :on-error="uploadError"
                      :on-success="uploadSuccess" 
                      :before-upload="beforeAvatarUpload" 
                      :on-remove="handleRemove" 
                      :show-file-list="isFilelistShow"
                      :limit='1'
                       :on-change="onChange"
                      :auto-upload="false" 
                      > 
                      <!-- 
                      :show-file-list="false" -->

                      

                      <!-- <template slot="append" class="Upload"  >上传</template> -->
                      <!-- <el-input   v-model="Uploadform.app_url" placeholder="请选择"  @click="RemoveUpload" readonly="readonly" autocomplete="off" style="width: 240px;height: 40px;" >
                      </el-input> 
                      <el-button style="width: 60px;"    size="small" type="primary" >上传</el-button>  -->
                      <el-input slot="trigger" v-model="Uploadform.app_url" placeholder="请选择"  @click="RemoveUpload" autocomplete="off" style="width: 240px;height: 40px;" >
                      </el-input> 
                      <el-button style="width: 60px;"    size="small" type="primary" @click="submitUpload">上传</el-button> 
                 

                      <!-- <el-button  slot="trigger" size="small" type="primary"  >选取文件</el-button> 
                      <el-button style="width: 100px;"    size="small" type="primary" @click="submitUpload">上传文件</el-button> -->
                        
                      
                    </el-upload> 
                  </div>  

                </el-form-item>
              </td>
            </tr>
            <tr>  
              <td> 
                  <el-form-item > 
                    <p>是否强制更新</p>
                    <div> 
                        <el-radio v-model="Uploadform.is_required" label="1">是</el-radio>
                        <el-radio v-model="Uploadform.is_required" label="0">否</el-radio> 
                    </div> 
                  </el-form-item >
              </td>
              <td> 
                  <el-form-item >
                    <p>是否安装</p>
                    <div> 
                        <el-radio v-model="Uploadform.is_setup" label="1">是</el-radio>
                        <el-radio v-model="Uploadform.is_setup" label="0">否</el-radio> 
                    </div> 
                  </el-form-item>
              </td> 
            </tr>
            <tr>
              <td colspan="2"> 
                  <div> 
                    <el-form-item  label="更新日志"   prop="version_log" style="position: relative;"  >
                      <el-input id="content-input"  class="textArea"   type="textarea" v-model="Uploadform.version_log" autocomplete="off" maxlength="200" placeholder="请输入"></el-input>
                    </el-form-item>
                  </div> 
              </td>
            </tr>
          </table>
        </el-form> 
        <div slot="footer" class="dialog-footer">
          <div class="dialog-footer-btn-box" style="margin:0px 38px 0 0">
            <el-button @click="dialogUploadEdit = false">取 消</el-button> 
          </div>
          <div class="dialog-footer-btn-box">
            <el-button type="primary" @click="submitFormUploadEdit('Uploadform')">确定</el-button> 
          </div>
        </div>
      </el-dialog>
    </div>
    </div>
  </el-row>
</template>
<script>   
export default {
  inject:['reload'], 
  name:'userList',  
  data() {
    return {   
        updateForm:  {   }  , 
        searchID:'' ,//查询
        Index:'',//当前选中行 
        tableData: [ 
          {
            "version_id": 12,
            "client_type": 1,//用户类型
            "app_url": "url",//  'app的下载地址，更新文件七牛的key',
            "version_name": "版本4.0.9",
            "target_size": 1008,
            "version_log": "我是日志",
            "is_required": 0,//'是否强制更新（1强制更新 0选择更新）',
            "is_setup": 0,// '是否安装包（1是 0否）',
            "create_time": 1600765796
          } 
        ],
        tabledata:[], 
        currentPage: 0,
        pageNum:12,
        totalNum:0, 

        //  * Dialog编辑
        dialogUploadEdit:false,     
        Uploadform: { 
          "version_name": '', //版本号名称，如 1.0.0
          "is_required": "0" , //是否强制更新（1强制更新 0选择更新）
          "is_setup": "0",//是否安装包（1是 0否）
          "version_log": "", //更新日志 
          app_url:'',//      'app的下载地址，更新文件七牛的key', 
          target_size:'',//   '更新文件大小(b字节)',
 
        },
         //  * Dialog安装包详情
        dialogOrderDetail:false,   
        orderDetailform: {   
            // app_url: "http://apps.zscdzhe.com/ktc_2.wgt",
            // client_type: 1,
            // create_time: 123123,
            // is_required: 0,
            // is_setup: 0,
            // target_size: 12,
            // version_id: 2,
            // version_log: "44444",
            // version_name: "1.0001"
        },
        //删除、激活
        operationDialog:false,//Dialog状态
        operationDialogtitle:"",//Dialog头部
        operationDialogText:"",//Dialog内容

        isFilelistShow:true,
        QiniuData: {
          key: '', //图片名字处理
          token: "" //七牛云token
        },
        deleteImg:'',
        domain: "https://upload-z2.qiniup.com", // 七牛云的上传地址（华南区）
        // qiniuaddr: "http://pics.zscdzhe.com", // 七牛云的图片外链地址
        // uploadPicUrl :'https://i.loli.net/2020/06/18/DcQy98mRIGCTHhe.png', //提交到后台图片地址
        //  上传文件
      };
  },
  created(){ 
    this.params() 
    this.getQiniuToken('get')

  },
  mounted(){ 
    console.log(this.fileList)
   }, 
  methods: {   
  
    params(phone){
      let me = this;  
        me.$requestAxios(me,{
          url : 'appVersion',
            data : {} ,
            method : 'get', 
            urlParam :'?limit='+me.pageNum+'&currentPage='+(me.currentPage?me.currentPage:'0')+(phone?'&search='+phone:''),  
        },function(res,opt){  
          console.log(res)
          if (res.data.error_code == 200) {  
              me.tableData = res.data.data.data;  
              me.totalNum = res.data.data.totalNum ? res.data.data.totalNum : 0; 
              for(let i in me.tableData){ 
                  me.tableData[i].is_required= me.tableData[i].is_required == 0 ? '否' :'是';
                  me.tableData[i].is_setup= me.tableData[i].is_setup == 0 ? '否' :'是'; 
                  me.tableData[i].create_time = new Date( me.tableData[i].create_time.toString().length == 10 ? me.tableData[i].create_time * 1000 : me.tableData[i].create_time ).toLocaleDateString()  ;
              }
          }
        })   
    },
    //安装包详情
    orderDetail(e){  
        let me = this;     
        me.dialogOrderDetail = true;    
        me.orderDetailform =e;    
    },  
     handleCurrentChange(val) {//获取当前页的值事件
      // console.log(`当前页: ${val}`);
      this.params();
      this.searchID='';
    }, 
    search(){//查询 searchID
      if(this.searchID.length  > 0){  
         this.params(this.searchID);
          this.currentPage = 0;
          this.totalNum = 1; 
      }else if(this.searchID.length == ''){  
        this.params();
        this.currentPage = 0;
        this.totalNum = 1;
      } else {
        console.log('error submit!!');
        this.$ztdMessage('请输入！','warning' )  
        return false;
      } 
    },     
       //上传安装包
    UploadEdit(){ 
      //  console.log(name) 
      //  this.Uploadform =  e
       this.dialogUploadEdit = true; 
    },  
    submitFormUploadEdit(formName){ 
      console.log('上传安装包')
      let me = this;
      me.$refs[formName].validate((valid) => {
        if (valid) {
            console.log(me.Uploadform) 
          me.$requestAxios(me,{
            url : 'appVersion',
              data : me.Uploadform ,
              method : 'post',   
          },function(res,opt){  
            console.log(res)
            if (res.data.error_code == 200) {  
              me.reload() 
            me.$ztdMessage('上传安装包成功', 'success')
            }
          })   
            // me.getdeptList(3);

            // me.$refs[formName].resetFields();
            me.dialogUploadEdit = false;

          
        } else {
          return false; 
        }
      });
    }, 
     // 删除  
      revoke(e,index,fn){  
        this.Index=index;
        this.updateForm =e;
        this.operationDialog = true;
        this.operationDialogtitle = '删除安装包';  
         this.operationDialogText = '是否要删除该安装包?';
      }, 
      //Dialog关闭
      operationDialogClose() { 
        let me = this;
        me.operationDialog = false;
        console.log(me.updateForm)
        me.$requestAxios(this,{
            url : 'appVersion',
            data : { ids:me.updateForm.version_id},
            method : 'delete',
            urlParam:'',
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
        // 七牛云
      submitUpload() {
        
        this.$refs.upload.submit();
      },
      RemoveUpload() {
        console.log(213)
        this.$refs.upload.clearFiles();
      },
      handleRemove(file, fileList) {
        let me =this;
        console.log(me.deleteImg)
            try{ 
          if(me.deleteImg)
          me.getQiniuToken('delete',{'imagekey':me.deleteImg}); 
          // me.$api.deleteImg({"bucket":"ACCESSORY_BUCKET",'imagekey':me.deleteImg}).then(res=>{  })  
      }catch(e){  } 
        this.Uploadform.app_url ='';

        console.log(file, fileList);
      }, 
      onChange(file, fileList) {
        console.log(file, fileList);
        this.isShowdiver
        // this.Uploadform.app_url =file.name;
        // this.Uploadform.target_size =file.size; 
      }, 
      beforeAvatarUpload(file) {   
        console.log(file);
        
        this.Uploadform.app_url =file.name;
        this.Uploadform.target_size =file.size; 
      let last_file_name =file.name.split('.')[file.name.split('.').length -1]
      const isPNG = file.type === "application/vnd.android.package-archive";
      const isWGT = last_file_name === "wgt";
      const isAPK = last_file_name === "apk";
      // const isLt2M = file.size / 1024 / 1024 < 2;// 限制小于2M

      if (!isPNG && !isWGT && !isAPK) {
        this.$ztdMessage("上传安装包只能是 apk、wgt 格式!",'error');
        return false;
      }  
        // if (!isLt2M) {
        //     this.$ztdMessage('图片大小不可超过 2MB!','error');
        //     return false;
        // } 
      // let file_name =file.name.split('.')[file.name.split('.').length -1] 
      // console.log(file_name)
      this.QiniuData.key = Math.round(new Date() / 1000); 
      // this.QiniuData.key = Math.round(new Date() / 1000)+'.'+`${last_file_name}`; 
      // console.log(this.QiniuData.key)

    }, 
    uploadSuccess(response, file, fileList) {
      let me = this; 
      // this.isFilelistShow=false;
      console.log(arguments)
    
				 me.deleteImg =response.key; 
        //  me.UploadAjax(response.key) 
        //  me.deleteImg =response.key;   
        // me.$ztdMessage(  '恭喜~ 上传成功啦! ',   'success' )  
    }, 
    uploadError(err, file, fileList) { 
      this.$ztdMessage(  '上传出错，请重试！',   'error' ) 
    },
    //请求后台拿七牛云token
      getQiniuToken(method,data) {
        let me = this;
        me.$requestAxios(me,{
            url : 'qiniuToken',
            data :data,
            method : method, 
            urlParam :'?bucket=BANNER_BUCKET' 
            // urlParam :'?bucket=APPS_BUCKET'+(data?'&imagekey='+me.deleteImg:'')
        },function(res,opt){
            console.log(res)
          if (res.data.error_code == 200) { 
            me.QiniuData.token = res.data.token; 
          }
        })  
    },         
  }
};
</script> 
<style   > 
    .package .el-table_1_column_1.is-leaf ,.package .userName{
        padding-left: 30px!important;
    }  
    /* 固定el-table头部高度 */
    .package .el-table__body-wrapper.is-scrolling-none{
      overflow-y: auto;
      max-height: calc(100vh - 455px)!important;
    }  
    .package .tableData .el-table{
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

  .Uploadform .el-textarea__inner{
    height: 190px!important;
    font-family: PingFangSC;
    line-height:20px;
    font-size: inherit;
  }
 .Uploadform .el-input-group__append{
    background: #67CFDC; 
    color: #ffffff;
  }
  /* dialog table end*/
  /*  */
   .package  .el-upload-list__item.is-success .el-upload-list__item-name:focus, .package  .el-upload-list__item.is-success .el-upload-list__item-name:hover {
      color: #67CFDC;
      cursor: pointer;
  }
</style>