<template>
	<div>
                <!-- :action="domain"
                :data="QiniuData"
                :on-error="uploadError"
                :on-success="uploadSuccess"
                :before-upload="beforeAvatarUpload"
                :on-change="handleAvatarChange"
                  multiple 
                > -->
	<el-upload
        class="upload-pic" 
			:show-file-list="false"
		  :action="domain"
			list-type="picture-card"
			:data="QiniuData"
			:before-upload="beforeAvatarUpload"
			:on-preview="handlePictureCardPreview"
			:on-remove="handleRemove"
			:on-success="uploadAppSuccess">
		<el-button size="small" type="primary">点击上传</el-button>
		<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
	</el-upload>
	<draggable
			class="list-group"
			tag="ul"
			v-model="allList"
			v-bind="dragOptions"
			@start="drag = true"
			@end="drag = false" >
		<!--<transition-group type="transition" :name="!drag ? 'flip-list' : null">-->
		<div v-loading="loadingapp" class="img-wrapper divBox" v-for="(item,index) in allList" :key="index">
			<img :src="item.url" v-if="item.url" width="148" height="148" class="imgSty">
			<i class="el-icon-delete delIcon" @click="deleImg(item.URL,index,allList)"></i>
			<!--<img class="img-big" :src="imgUrl" v-else width="362" height="272">-->
		</div>
		<!--</transition-group>-->
	</draggable>
	<router-view></router-view>
	</div>
</template>
<style scoped>
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}
	.divBox{
		/*flex-direction: row;*/
		float: left;
		position: relative;
		
	}
	.imgSty{
		margin-left: 3px;
	}
	.delIcon{
		position: absolute;
		top: 0;
		right: 0;
		font-size: 50px;
	}
	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}
	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}
	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
</style>

<script>
  import draggable from "vuedraggable";
  // import uploader from '../../components/Uploader'
  // import {addOperateLanding, updateOperateLanding, QINIU_DOMAIN,uploadToken} from '../../api/api'
  export default {
    name: "transition-example-2",
    display: "Transitions",
    order: 7,
    components: {
      draggable,
      // uploader
    },
    data() {
      return {
        loadingapp:false,
        // loadingapp:false,
        allList:[],
        upload_token: {},
        // imgUrl: require('../../../static/image/default/nullData.png'),
        fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
        // list: message.map((name, index) => {
        //   return { name, order: index + 1 };
        // }),
        drag: false,


        QiniuData: {
          key: "", //图片名字处理
          token: "" //七牛云token
        },
        domain: "https://upload-z2.qiniup.com", // 七牛云的上传地址（华南区）
        qiniuaddr: "http://pics.zscdzhe.com", // 七牛云的图片外链地址
        uploadPicUrl: "", //提交到后台图片地址
        // fileList: []
        };
    },
    mounted(){
        // this.allList=this.fileList;
        this.getQiniuToken()
    },
    methods: {
      //删除图片
      deleImg(data,index,allList){
        console.log(allList)
        // console.log(data)
        // console.log(index)
	    	// this.allList.splice(index,1)
	  },
      //上传图片相关
      beforeAvatarUpload (file) {
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

      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
        console.log('hahah',this.dialogImageUrl)
      },
      uploadAppSuccess(response,file, fileList){
        console.log(response);
        console.log(file);
        console.log(fileList);
    //   this.uploadPicUrl = `${this.qiniuaddr}/${response.key}`;
    // //   this.uploadPicUrl = `${response.key}`;

    //  this.$message({
    //     message: "上传成功！",
    //     type: "success",
    //     center: true
    //   });


        console.log('上传成功') 
        console.log(this.qiniuaddr + '/' + response.key)
		var temp = {
          url:this.qiniuaddr + '/' + response.key,
		  URL:response.key
		  
		}
        this.allList.push(temp)
//启动拖拽功能

      },
      sort() {
        this.list = this.list.sort((a, b) => a.order - b.order);
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
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
    },
	  
	  
    },
    computed: {
      dragOptions() {
        return {
          animation: 200,
          group: "description",
          disabled: false,
          ghostClass: "ghost"
        };
      }
    }
  }
</script>
