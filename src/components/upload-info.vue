<template>
    <div class="librarian">
        <div class="upload-info">
            <div>
                <!-- :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :limit="1"  
                 :on-exceed="handleExceed" -->
                <!-- :file-list="fileList" --> 
            <el-upload
                class="upload-pic"
                :action="domain"
                :data="QiniuData"
                :on-error="uploadError"
                :on-success="uploadSuccess"
                :before-upload="beforeAvatarUpload"
                :on-change="handleAvatarChange"
                  multiple
                :show-file-list="false"
                >
                 <!-- <div class="upImage"> 
                       <div v-if="uploadPicUrl">

                        <img  :src="uploadPicUrl" alt="" width="100%" height="100%">
                       </div>
                  </div> -->

                  <draggable
                      class="list-group"
                      tag="ul"
                      v-model="allList"
                      v-bind="dragOptions"
                      @start="drag = true"
                      @end="drag = false"
                      
                  >
                    <!--<transition-group type="transition" :name="!drag ? 'flip-list' : null">-->
                    <div v-loading="loadingapp" class="img-wrapper divBox" v-for="(item,index) in allList" :key="index">
                      <img :src="item.url" v-if="item.url" width="148" height="148" class="imgSty">
                      <i class="el-icon-delete delIcon" @click="deleImg(item.URL,index)"></i>
                      <!--<img class="img-big" :src="imgUrl" v-else width="362" height="272">-->
                    </div>
                    <!--</transition-group>-->
                  </draggable>

                  
            </el-upload>
            <div>
                <!-- <img class="pic-box" :src="uploadPicUrl" v-if="uploadPicUrl"> -->
            </div>
            </div>
            <div>
            <el-button type="primary" :loading="loading" @click="handleSubmit">提交</el-button>
            <el-button type="info" plain >取消</el-button>
            </div>
        </div>


    </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      QiniuData: {
        key: "", //图片名字处理
        token: "" //七牛云token
      },
      domain: "https://upload-z2.qiniup.com", // 七牛云的上传地址（华南区）
      qiniuaddr: "http://pics.zscdzhe.com", // 七牛云的图片外链地址
      uploadPicUrl: "", //提交到后台图片地址
      fileList: []
    };
  },
  mounted() {
    this.getQiniuToken();
  },
  methods: {
    // handleRemove(file, fileList) {
    //   this.uploadPicUrl = "";
    // },
    // handleExceed(files, fileList) {
    //   this.$message.warning(
    //     `当前限制选择 3 张图片，如需更换，请删除上一张图片在重新选择！`
    //   );
    // },
     handleAvatarChange(file,filelist){
          this.uploadPicUrl=URL.createObjectURL(file.raw);
      console.log(this.uploadPicUrl);
          
	 },
    beforeAvatarUpload(file) {
      const isPNG = file.type === "image/png";
      const isJPEG = file.type === "image/jpeg";
      const isJPG = file.type === "image/jpg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isPNG && !isJPEG && !isJPG) {
        this.$message.error("上传头像图片只能是 jpg、png、jpeg 格式!");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
        return false;
      }
      this.QiniuData.key = `${file.name}`;
    },
    uploadSuccess(response, file, fileList) {
      console.log(response);
      console.log(file);
      console.log(fileList);
      this.uploadPicUrl = `${this.qiniuaddr}/${response.key}`;
    //   this.uploadPicUrl = `${response.key}`;

     this.$message({
        message: "上传成功！",
        type: "success",
        center: true
      });
      // this.uploadPicUrl =`${file.name}`;
      // this.uploadPicUrl ='https://i.loli.net/2020/06/18/DcQy98mRIGCTHhe.png';
    },
    uploadError(err, file, fileList) {
      this.$message({
        message: "上传出错，请重试！",
        type: "error",
        center: true
      });
    },
    // beforeRemove(file, fileList) {
    //   return this.$confirm(`确定移除 ${ file.name }？`);
    // },
    //提交数据到后台
    handleSubmit() {
      let ajaxData = {
        receipt_img: this.uploadPicUrl //图片地址
      };
      this.$http.put("/xxx", ajaxData)
        .then(response => {
          let { code, data } = response.data;
          if (code == "0") {
            this.$message({
              message: "提交成功！",
              type: "success",
              center: true
            });
          }
        })
        .catch(error => {
          this.$message({
            message: error.msg,
            type: "error",
            center: true
          });
        });
    },
    //请求后台拿七牛云token
    getQiniuToken() {
        let me = this
        me.$requestAxios(me,{
            url : 'qiniuToken',
            data :{} ,
            method : 'get',
            urlParam :'?bucket=PICS_BUCKET'
        },function(res,opt){
            console.log(res)
          if (res.data.error_code == 200) { 
            me.QiniuData.token = res.data.token;
            console.log(me.QiniuData.token)
          }
        })
    //   this.$http.get("/qiniuToken",{"bucket":"ACCESSORY_BUCKET"})
    //     .then(response => {
    //       let { code, data } = response.data;
    //       if (code == "0") {
    //         this.QiniuData.token = data;
    //       }
    //     })
    //     .catch(error => {});




    },
  }
};
</script>
<style   scoped>
.upImage{
      width:80px;
      /* height:192px; */
      height: 102px!important;
      background:rgba(255,255,255,1);
      border-radius:4px;
      border:1px solid rgba(0,0,0,0.15);
      display: inline-block;
      padding: 24px 20px;
    }
</style>