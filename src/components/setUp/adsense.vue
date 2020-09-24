<template>
  <el-row>
    <div class="librarian adsense">
        <div class="librarian_title">通用配置<span class="librarian_title_child">/ 广告位上传</span></div> 
         <div class="librarian_content">
            <el-col :span="24">
             
              <div class="top" >  
                  <el-col :span="12">
                    <div class="librarian_title_child">尺寸: 690px*160px</div>  
                  </el-col> 
                  <el-col :span="12"> 
                      <div class="rightControl"> 
                        <div v-if="isShowUpload"> 
                          <el-upload
                            class="upload-pic"
                            :action="domain"
                            :data="QiniuData"
                            :on-error="uploadError"
                            :on-success="uploadSuccess" 
                            :before-upload="beforeAvatarUpload" 
                              multiple
                            :show-file-list="false" >  
                            <div class="add_book"  style="width:150px;" ><span class="addicon">+</span><span>上传广告位</span></div>  
                          </el-upload> 
                        </div> 
                            <div v-else class="add_book"  style="width:150px;opacity:0.4!important;cursor: not-allowed;" ><span class="addicon">+</span><span>上传广告位</span></div>  
                      </div>
                  </el-col>
              </div>
            </el-col>   
             <el-table   ref="multipleTable"   :data="tableData"    tooltip-effect="dark"    style="width: 100%"      > 
                <el-table-column   prop="show_url"  label="缩略图"  class-name="userName" :show-overflow-tooltip='true'> 
                    <template slot-scope="scope">
                      <div style="width:282px;height:60px;line-height:86px;" @click="handlePictureCardPreview(tableData[scope.$index])">

                        <img :src="scope.row.show_url" alt="" width="282px" height="60px">
                      </div>
                    </template>
                    </el-table-column> 
                <el-table-column  prop="stock"  label="操作"   width="200px"   >
                   <template slot-scope="scope">
                      <el-button   type="text"  @click="delRow(tableData[scope.$index],scope.$index)"  class="redControl" >删除 </el-button>
                      <el-button   type="text"  @click="gotoTop(tableData[scope.$index].id)">置顶 </el-button>
                    </template> 
               </el-table-column>
              </el-table> 
                
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
    <!-- 图片放大 -->
    <div class="dialogImageUrl"> 
      <el-dialog :visible.sync="dialogVisible">
        <img width="690px" height="160px" :src="dialogImageUrl" alt="">
      </el-dialog>
    </div>
    </div>
  </el-row>
</template>
<script>  

export default { 
  name:'adsense',  
  inject:['reload'], 
  data() {
    return { 
      //广告位    get广告位列表, post 广告位上传, put 广告位置顶, delete广告位删除
      // banner : '/banner',  
      updateForm:  {   }  ,   
      tableData:[ 
        {
          // id: 22,
          // show_url: "http://ban.zscdzhe.com/banner@3x.png"
        },
        {
          // id: 1,
          // show_url: "http://ban.zscdzhe.com/1600851950.jpg"
        }
      ], 
      Index:'',//当前选中行 
      isShowUpload:true,
      //删除、激活
      operationDialog:false,//Dialog状态
      operationDialogtitle:"",//Dialog头部
      operationDialogText:"",//Dialog内容 

      // 图片放大      
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,

      QiniuData: {
        key: '', //图片名字处理
        token: "" //七牛云token
      },
      // deleteImg:'',
      domain: "https://upload-z2.qiniup.com", // 七牛云的上传地址（华南区）
      // qiniuaddr: "http://pics.zscdzhe.com", // 七牛云的图片外链地址
      // uploadPicUrl :'https://i.loli.net/2020/06/18/DcQy98mRIGCTHhe.png', //提交到后台图片地址
    };
  },
  created(){ 
    this.params()
    this.getQiniuToken('get')
  },  
  methods: { 
     params(){
      let me = this;  
        me.$requestAxios(me,{
          url : 'banner',
            data : {} ,
            method : 'get', 
        },function(res,opt){ 
            // console.log(res)
          if (res.data.error_code == 200) {  
            me.tableData = res.data.data;   
              me.isShowUpload = me.tableData.length == 3?false:true; 
          }
        })   
    },  
    //操作台-删除  
    delRow(e,index){ 
      this.updateForm =e; 
      this.Index =index;
      this.operationDialog = true;
      this.operationDialogtitle = "删除";  
      this.operationDialogText = '是否要删除该广告位图片 ?';
    }, 
    //Dialog关闭  删除
    operationDialogClose() {
      let me = this; 
      me.operationDialog = false;   
        me.$requestAxios(this,{
          url : 'banner',
          data : { },
          method : 'delete',
          urlParam :'/' +this.updateForm.id
        },function(res,opt){   
          me.reload()   
          me.$ztdMessage(  ' 删除成功！',   'success' )
        }) 
    },  
    gotoTop(id){//置顶
      let me = this;  
      me.$requestAxios(me,{
        url : 'banner',
        data : {} ,
        method : 'put', 
        urlParam : '/' +id 
      },function(res,opt){  
        if (res.data.error_code == 200) {  
          me.reload() 
        }
      })   
    },  
     UploadAjax(picture_url){//上传图片
      let me = this;   
      me.$requestAxios(me,{
        url : 'banner',
        data : {show_url:picture_url} ,
        method : 'post', 
        urlParam :''
      },function(res,opt){  
        console.log(res)
        if (res.data.error_code == 200) {
          me.reload()  
          me.$ztdMessage(  '恭喜~ 上传成功啦! ',   'success' )   
        }
      })   
    },  
     handlePictureCardPreview(file) { // 图片放大 
        this.dialogImageUrl = file.show_url;
        this.dialogVisible = true;
      },
     // 七牛云
      beforeAvatarUpload(file) {   
      const isPNG = file.type === "image/png";
      const isJPEG = file.type === "image/jpeg";
      const isJPG = file.type === "image/jpg";
      const isLt2M = file.size / 1024 / 1024 < 2;// 限制小于2M

      if (!isPNG && !isJPEG && !isJPG) {
        this.$ztdMessage("上传头像图片只能是 jpg、png、jpeg 格式!",'error');
        return false;
      }  
        if (!isLt2M) {
            this.$ztdMessage('图片大小不可超过 2MB!','error');
            return false;
        } else {
            const isSize = new Promise((resolve, reject) => {
                const width = 690;
                const height = 160;
                const _URL = window.URL || window.webkitURL;
                const img = new Image();
                img.onload = () => {
                    const valid = img.width >= width && img.height >= height && img.width === img.height;
                    valid ? resolve() : reject();
                };
                img.src = _URL.createObjectURL(file); 
            }).then(
                () => {
                    return file;
                },
                () => {
                    this.$ztdMessage('图片尺寸限制大小为690 x 160，大小不可超过2MB','error');
                    return Promise.reject();
                },
            );
            return isSize;
        } 
      let file_name =file.name.split('.')[file.name.split('.').length -1] 
      // console.log(file_name)
      this.QiniuData.key = Math.round(new Date() / 1000)+'.'+`${file_name}`; 
      // console.log(this.QiniuData.key)

    }, 
    uploadSuccess(response, file, fileList) {
      let me = this; 
         me.UploadAjax(response.key) 
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
            data :data ,
            method : method,
            urlParam :'?bucket=BANNER_BUCKET'
        },function(res,opt){
            // console.log(res)
          if (res.data.error_code == 200) { 
            me.QiniuData.token = res.data.token; 
          }
        })  
    },
  }
};
</script> 
<style   > 
    .adsense .top {
      margin-bottom: 0; 
    }
    .adsense .el-table_1_column_1.is-leaf ,.adsense .userName{
        padding-left: 30px!important;
    }   
    .adsense .el-table td  {
        border-bottom:1px solid  rgba(0, 0, 0, 0.08)!important;
    }
      .pro-dialog-Class .el-dialog {
        width: 440px;
    }
    .adsense .el-table__row,.adsense .el-table__row:hover {
        height: 86px!important;
    }
    /* <!-- 图片放大 --> */ 
     .dialogImageUrl .el-dialog {
        width: 757px;
        background: none!important;
        box-shadow: none!important;
    }
    .dialogImageUrl .el-dialog{
        margin-top: 35vh!important;
    }
    .dialogImageUrl .el-dialog__headerbtn .el-dialog__close { 
        font-size: 24px!important;
        color: #ffffff!important;
    }
</style>