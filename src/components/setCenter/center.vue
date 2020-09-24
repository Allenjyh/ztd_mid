<template>
  <el-row>
    <div class="librarian  center">
        <div class="librarian_title">个人中心<span class="librarian_title_child"> </span></div> 
         <div class="librarian_content el-drawer__body">
            <div style="padding: 40px 0 0 40px;">  
              <el-form :model="centerform" ref="centerform" label-width="104px" label-position="left">
                <p>个人信息</p>
                <div class="avatar_img">
                  <div class="avatar_title">头像</div>
                  <img :src="centerform.avatar_url? centerform.avatar_url: avatar_url"  width="80px" height="80px"> 
                  <div  >
                    <el-upload
                      class="upload-pic"
                      :action="domain"
                      :data="QiniuData"
                      :on-error="uploadError"
                      :on-success="uploadSuccess" 
                      :before-upload="beforeAvatarUpload" 
                        multiple
                      :show-file-list="false"    > 
                        <!-- <div class="upImage">  -->
                            <!-- <img  :src="uploadPicUrl" alt="" width="100%" height="100%"> -->
                              <!-- <img  :src="updateForm.picture_url" alt="" width="100%" height="100%"> -->
                              <!-- v-if="updateForm.picture_url"<img v-else src="https://i.loli.net/2020/06/18/DcQy98mRIGCTHhe.png" alt="" width="100%" height="100%"> -->
                        <!-- </div>   -->
                      <div class="putAvatar">更换头像</div>
                      </el-upload>
                  </div>
                </div>
                <el-form-item   label="姓名"     prop="nickname"       >
                  <el-input v-model="centerform.nickname" placeholder="请输入" autocomplete="off" style="width: 360px;height: 40px;" maxlength="15"></el-input>
                </el-form-item>  
                <p style="margin:60px 0 30px">账号密码</p> 
                      <el-form-item   label="原密码"     prop="old_password"       >
                        <el-input v-model="centerform.old_password" placeholder="请输入" autocomplete="off" style="width: 360px;height: 40px;" maxlength="15" ></el-input>
                      </el-form-item>
                      <el-form-item   label="新密码"     prop="new_password"       >
                        <el-input v-model="centerform.new_password" placeholder="请输入" autocomplete="off" style="width: 360px;height: 40px;" maxlength="15"></el-input>
                      </el-form-item>
                      <el-form-item   label="确认密码"     prop="newPassword"       >
                        <el-input v-model="centerform.newPassword" placeholder="请输入" autocomplete="off" style="width: 360px;height: 40px;" maxlength="15" ></el-input>
                      </el-form-item> 
                      <div size="large">
                         <el-button  class="white"  @click="resetForm('centerform')"  > 重 置 </el-button> 
                          <el-button style="margin:20px 0 30px;" type="primary" @click="onSubmit">保 存</el-button> 
                      </div>
              </el-form>
           </div> 
             
         </div>  
    </div>
  </el-row>
</template>
<script>   
export default {
  name:'center',  
  data() {
    return {
      avatar_url:"../../../static/image/header-nav/head.png", 
       centerform: { 
          nickname:'',
          old_password:'',
          new_password:'',
          newPassword:'',
          avatar_url:"", 
        }, 
        QiniuData: {
        key: '', //图片名字处理
        token: "" //七牛云token
        },
        deleteImg:'',
        domain: "https://upload-z2.qiniup.com", // 七牛云的上传地址（华南区）
        qiniuaddr: "http://avatar.zscdzhe.com", // 七牛云的图片外链地址
        // uploadPicUrl :'https://i.loli.net/2020/06/18/DcQy98mRIGCTHhe.png', //提交到后台图片地址
    };
  },
  created(){ 
                  

    this.getQiniuToken('get'); 
    // try { 
    //       this.centerform.nickname= JSON.parse(localStorage.getItem('ztd_center_login')).nickname;  
    //       this.centerform.avatar_url= JSON.parse(localStorage.getItem('ztd_center_login')).avatar_url;  
    //     } catch (error) {  }
    this.params()
  },
  mounted(){  
    
  },
  updated(){   },
  methods: {
    params(){ 
      let me = this;
       me.$requestAxios(me,{  url : 'editAdminData',  data : me.centerform ,  method : 'get',  },function(res,opt){ 
              // console.log(res)
              if (res.data.error_code == 200) {  
                 me.centerform.nickname= res.data.data.nickname;  
                 me.centerform.avatar_url= res.data.data.avatar_url;   
              }
            })  
    }, 
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    onSubmit(){ 
      let me = this;
        if(me.centerform.nickname  ){ 
          if(me.centerform.new_password == me.centerform.newPassword){  
            if(me.centerform.new_password.length > 0   && me.centerform.old_password == ''){ 
               me.$ztdMessage(  '请输入原密码',   'error' )  
               return;
            }
            me.$requestAxios(me,{
                url : 'editAdminData',
                data : me.centerform ,
                method : 'put',
                urlParam :''
            },function(res,opt){ 
              if (res.data.error_code == 200) {  
                 let admin_info=JSON.parse(localStorage.getItem('ztd_center_login'))
                    admin_info.nickname=me.centerform.nickname
                    admin_info.avatar_url=me.centerform.avatar_url 
                 me.$ztdLocalStorage.setLocalStorage('ztd_center_login',admin_info);
                 me.$router.go(0); 
                 me.$ztdMessage(  '保存成功',   'success' )  
              }
            })  
          }else{
            me.$ztdMessage(  '新密码与确认密码不一致',   'error' )  
          }
        }else{
               me.$ztdMessage(  '姓名不能为空',   'error' )  
        }
    },
      // 七牛云
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
      this.QiniuData.key =  Math.round(new Date() / 1000);
    }, 
    uploadSuccess(response, file, fileList) {
      let me = this;
      console.log(file); 
       me.$nextTick(() => { // 这里开始赋值  
         me.centerform.avatar_url = `${me.qiniuaddr}/${response.key}`; 
          })
      // try{ 
      //     if(me.deleteImg)
      //     this.getQiniuToken('delete',{'imagekey':me.deleteImg}); 
      //     // me.$api.deleteImg({"bucket":"ACCESSORY_BUCKET",'imagekey':me.deleteImg}).then(res=>{  })  
      // }catch(e){  } 
				 me.deleteImg =response.key;  

     me.$message({ message: "上传成功！",  type: "success",    center: true  });  
    }, 
    uploadError(err, file, fileList) {
      this.$message({   message: "上传出错，请重试！",  type: "error",   center: true  });
    }, 
    //请求后台拿七牛云token
    getQiniuToken(method,data) {
        let me = this;
        me.$requestAxios(me,{
            url : 'qiniuToken',
            data :data ,
            method : method,
            urlParam :'?bucket=AVATAR_BUCKET'
        },function(res,opt){
            // console.log(res)
          if (res.data.error_code == 200) { 
            me.QiniuData.token = res.data.token;
            // console.log(me.QiniuData.token)
          }
        })  
    }, 
  }
};
</script>
<style   scoped>
      /* @import  '../../../public/css/librarian.css'; */ 
       .center .librarian_content p{ 
        font-size: 18px; 
        color: #333333;
        line-height: 33px;
      }
     .center  .avatar_img{
         display: flex;
         justify-content: start;
         line-height: 80px;
         align-items: center;
         margin: 40px 0 40px 0;
      }
      .center .avatar_img .avatar_title{
        width: 104px;
        font-size: 14px;  
        color: #77778C;
        line-height: 22px;
      }
     .center .putAvatar{
        cursor: pointer;
        width: 106px;
        height: 38px;
        background: #FFFFFF;
        border-radius: 8px;
        border: 1px solid #67CFDC;
        margin-left: 40px; 
        font-size: 16px; 
        font-weight: 400;
        color: #67CFDC;
        line-height: 38px;
        text-align: center;
      }
      .center .save{
         width: 80px;
        height: 40px;
        background: #67CFDC;
        border-radius: 8px; 
        font-size: 18px; 
        font-weight: 400;
        color: #FFFFFF;
        line-height: 40px;
        border: none;
        text-align: center;
        cursor: pointer;
      }
      .center .el-form-item {
          margin-bottom: 40px;
      }
</style> 