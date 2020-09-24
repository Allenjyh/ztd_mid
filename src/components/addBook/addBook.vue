<template>
    <div class="addBook"> 
      <!--<div class="addBook" @click="dialog = true"><span class="addicon">+</span><span>{{Info}}</span></div>  -->
      <!-- :before-close="handleClose"  -->
      <el-drawer  class="addBook" v-if="Info.bookTitle == '修改图书'  || Info.bookTitle == '添加图书'"  :title="Info.bookTitle"        :visible.sync="Info.dialog"  :before-close="cancelForm"  direction="rtl"
        custom-class="demo-drawer"  ref="sdrawer"    size="60%"   > 
        <div class="demo-drawer__content">
          <el-row>
            <el-form :model="updateForm"  ref="updateForm" >
                <el-col :span="24"  >
                  <el-col :span="8"  >
                    <div   style="width:90%;margin-right: 20px;">
                      <el-form-item  label-position="top"    prop="isbn"     label="ISBN码" :rules="[{ min: 13, max: 13, message: '请输入13位正确的ISBN码', trigger: 'blur' }, { required: true, message: 'ISBN码不能为空'} ]"  >
                        <el-input v-model="updateForm.isbn" autocomplete="off" placeholder="请输入" maxlength="13"  oninput="javascript:value=this.value.replace(/[^\d]/g,'');if(this.value.length>13) this.value=this.value.substring(0,13);"></el-input>
                      </el-form-item> 
                    </div>
                  </el-col  >
                  <!-- <el-col :span="8"  >
                    <div   style="width:90%;margin-right: 20px;">
                      <el-form-item  label-position="top"    prop="book_num"     label="书号(9位数)" :rules="[  { min: 9, max: 9, message: '请输入9位正确书号', trigger: 'blur' }, { required: true, message: '请输入9位书号'}]"  >
                        <el-input v-model="updateForm.book_num" autocomplete="off" type="string" placeholder="请输入"  maxlength="9"  oninput="javascript:value=this.value.replace(/[^\d]/g,'');if(this.value.length>9) this.value=this.value.substring(0,9);" ></el-input>
                      </el-form-item>
                    </div>
                  </el-col  > -->
                  <el-col :span="8"  >
                    <div   style="width:90%;margin-right: 20px;">
                      <el-form-item  label-position="top"    prop="book_name"     label="书名" :rules="[ { required: true, message: '书名不能为空'} ]"  >
                        <el-input v-model="updateForm.book_name" autocomplete="off" placeholder="请输入" maxlength="40"></el-input>
                      </el-form-item>
                    </div>
                  </el-col  > 
                  <el-col :span="8"  >
                    <div   style="width:90%;margin-right: 20px;">
                      <el-form-item  label-position="top"    prop="author"     label="作者" :rules="[ { required: true, message: '作者不能为空'} ]"  >
                        <el-input v-model="updateForm.author" autocomplete="off" placeholder="请输入"></el-input>
                      </el-form-item>
                    </div>
                  </el-col  >
                </el-col  >
                <el-col :span="24"  > 
                  <el-col :span="8"  >
                    <div   style="width:90%;margin-right: 20px;">
                      <el-form-item  label-position="top"    prop="publisher"     label="出版社" :rules="[ { required: true, message: '出版社不能为空'} ]"  >
                        <el-input v-model="updateForm.publisher" autocomplete="off" placeholder="请输入"></el-input>
                      </el-form-item>
                    </div>
                  </el-col  >
                  <el-col :span="8"  >
                    <div   style="width:90%;margin-right: 20px;">
                      <el-form-item  label-position="top"    prop="publish_date"      label="出版日期" :rules="[ { required: true, message: '出版日期不能为空'} ]"  >
                         <el-date-picker style="width:100%;"
                            v-model="updateForm.publish_date"
                            type="date"
                            value-format="timestamp"
                            placeholder="请选择">
                          </el-date-picker>
                      </el-form-item>
                    </div>
                  </el-col  > 
                  <el-col :span="8"  >
                    <div   style="width:90%;margin-right: 20px;">
                      <el-form-item  label-position="top"    prop="price"     label="定价" :rules="[ { required: true, message: '定价不能为空'} ]"  >
                        <el-input v-model="updateForm.price" autocomplete="off" placeholder="请输入"></el-input>
                      </el-form-item>
                    </div>
                  </el-col  >
                </el-col  >
                <el-col :span="24"  > 
                  <el-col :span="8"  >
                    <div   style="width:90%;margin-right: 20px;">
                      <el-form-item label="模式" label-position="top" :rules="[ { required: true, message: '户名不能为空'} ]">
                        <el-select v-model="updateForm.mode" placeholder="请选择"  style="width:100%;">
                          <el-option label="幼儿模式" value="1"></el-option>
                          <el-option label="少儿模式" value="2"></el-option>
                          <el-option label="青少年模式" value="3"></el-option>
                          <el-option label="成年模式" value="4"></el-option>  
                        </el-select>
                      </el-form-item>
                    </div> 
                  </el-col  >
                  <el-col :span="8"  >
                    <div   style="width:90%;margin-right: 20px;">
                      <el-form-item  label-position="top"    prop="sort_num"     label="分类号" :rules="[ { required: true, message: '分类号不能为空'} ]"  >
                        <el-input v-model="updateForm.sort_num" autocomplete="off" placeholder="请输入"></el-input>
                      </el-form-item>
                    </div>
                  </el-col  > 
                  <el-col :span="8"  >
                    <div   style="width:90%;margin-right: 20px;">
                      <el-form-item  label-position="top"    prop="stock"     label="库存" :rules="[ { required: true, message: '库存不能为空'} ]"  >
                        <el-input v-model="updateForm.stock" autocomplete="off"   placeholder="请输入"></el-input>
                      </el-form-item>
                    </div>
                  </el-col  > 
                 
                </el-col  >
                <!-- <el-col :span="24"  >
                  <el-col :span="8"  >
                    <div   style="width:90%;margin-right: 20px;">
                      <el-form-item  label-position="top"    prop="edition"     label="版次" :rules="[ { required: true, message: '版次不能为空'} ]"  >
                        <el-input v-model="updateForm.edition" autocomplete="off"   placeholder="请输入"></el-input>
                      </el-form-item>
                    </div>
                  </el-col  >
                 
                  <el-col :span="8"  >
                    <div   style="width:90%;margin-right: 20px;">
                      <el-form-item  label-position="top"    prop="book_size"     label="开本" :rules="[ { required: true, message: '开本不能为空'} ]"  >
                        <el-input v-model="updateForm.book_size" autocomplete="off"   placeholder="请输入"></el-input>
                      </el-form-item>
                    </div>
                  </el-col> 
                  <el-col :span="8"  >
                    <div   style="width:90%;margin-right: 20px;">
                      <el-form-item label="装帧" label-position="top" :rules="[ { required: true, message: '装帧不能为空'} ]">
                        <el-select v-model="updateForm.binding" placeholder="请选择" style="width:100%;">
                          <el-option   v-for="(item,i) in bindingList"  :value='item.value' :label="item.name" :key="i" ></el-option>
                        </el-select>
                      </el-form-item>
                    </div> 
                  </el-col  > 
                </el-col>
                <el-col :span="24"  >
                  <el-col :span="8"  >
                    <div   style="width:90%;margin-right: 20px;">
                      <el-form-item  label-position="top"    prop="page_num"     label="页码" :rules="[ { required: true, message: '页码不能为空'} ]"  >
                        <el-input v-model="updateForm.page_num" autocomplete="off"   placeholder="请输入"></el-input>
                      </el-form-item>
                    </div>
                  </el-col  >
                  
                  <el-col :span="8"  >
                    <div   style="width:90%;margin-right: 20px;">
                      <el-form-item  label-position="top"    prop="rack_no"     label="架位号" :rules="[{ min: 7, max: 7, message: '请输入7位正确架位号', trigger: 'blur' }, { required: true, message: '架位号不能为空'} ]"  >
                        <el-input v-model="updateForm.rack_no" autocomplete="off"   placeholder="请输入" oninput="javascript:value=this.value.replace(/[^\d]/g,'');if(this.value.length>7) this.value=this.value.substring(0,7);"></el-input>
                      </el-form-item>
                    </div>
                  </el-col> 
                </el-col> -->
                <el-col :span="24"  >
                   <el-col :span="8"  >
                    <div   style="width:90%;margin-right: 20px;">
                      <el-form-item  label-position="top"    prop="stack_room"     label="藏馆点" :rules="[ { required: true, message: '藏馆点不能为空'} ]"  >
                        <el-input v-model="updateForm.stack_room" autocomplete="off"   placeholder="请输入"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>  
                </el-col>
                <el-col :span="24"  >
                  <el-col :span="16"  >
                    <div   style="width:95%;margin-right: 20px; ">
                      <el-form-item  label="简介"   prop="synopsis" style="position: relative;" :rules="[ { required: true, message: '简介不能为空'}, ]" >
                        <el-input id="content-input" class="textArea"   type="textarea" v-model="updateForm.synopsis" autocomplete="off" maxlength="200" placeholder="请输入（200字以内）"></el-input>
                      </el-form-item>
                    </div>
                  </el-col  > 
                  <el-col :span="8"  >
                    <div  style="width:150px;margin-right: 20px;"> 
                       <el-form-item  label-position="top"    prop="picture_url"     label="导入图片" :rules="[ { required: true, message: '导入图片'} ]"  >
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
                            <div class="upImage"> 
                                <!-- <img  :src="uploadPicUrl" alt="" width="100%" height="100%"> -->
                                  <img  :src="updateForm.picture_url" alt="" width="100%" height="100%">
                                <!-- v-if="updateForm.picture_url"<img v-else src="https://i.loli.net/2020/06/18/DcQy98mRIGCTHhe.png" alt="" width="100%" height="100%"> -->
                            </div>  
                         </el-upload>
                      </div>
                      </el-form-item>
                    </div> 
                  </el-col  > 
                </el-col>
                  <el-col :span="24"  >
                    <div class="demo-drawer__footer" > 
                      <el-button type="primary"  @click="drawerSubmitForm('updateForm')"  > 确 定 </el-button>
                      <el-button @click="cancelForm('updateForm')">取 消</el-button>
                    </div>
                </el-col>
            </el-form>
          </el-row> 
        </div>
      </el-drawer>
      <el-drawer  class="addBook" v-else  title="详情"        :visible.sync="Info.dialog"  :before-close="cancelForm"  direction="rtl"
        custom-class="demo-drawer"  ref="sdrawer"    size="60%"   > 
        <div class="demo-drawer__content">
          <el-row>
            <el-form :model="updateForm"  ref="updateForm" >
                <el-col :span="24"  >
                  <el-col :span="8"  >
                    <div   style="width:90%;margin-right: 20px; margin-top:20px;"> 
                        <div class="updateForm_title"> ISBN码: <span class="updateForm_content">&nbsp;{{updateForm.isbn}}</span></div>
                    </div>
                  </el-col  >
                  <!-- <el-col :span="8"  >
                    <div   style="width:90%;margin-right: 20px;margin-top:20px;"> 
                        <div class="updateForm_title"> 书号(9位数): <span class="updateForm_content">&nbsp;{{updateForm.book_num}}</span></div>
                    </div>
                  </el-col  > -->
                  <el-col :span="8"  >
       
                    <div   style="width:90%;margin-right: 20px;margin-top:20px;"> 
                      <el-tooltip class="item" effect="dark" :content="updateForm.book_name" placement="top">
                        <div class="updateForm_title onehide"> 书名: <span class="updateForm_content  "  >&nbsp;{{updateForm.book_name}}</span></div>
                      </el-tooltip>
                    </div>
                  </el-col  > 
                  <el-col :span="8"  >
                    <div   style="width:90%;margin-right: 20px;margin-top:20px;"> 
                        <div class="updateForm_title"> 作者: <span class="updateForm_content">&nbsp;{{updateForm.author}}</span></div>
                    </div>
                  </el-col  >
                </el-col  >
                <el-col :span="24"  >
                  
                  <el-col :span="8"  >
                    <div   style="width:90%;margin-right: 20px;"> 
                        <div class="updateForm_title"> 出版社: <span class="updateForm_content">&nbsp;{{updateForm.publisher}}</span></div>
                    </div>
                  </el-col  >
                  <el-col :span="8"  >
                    <div   style="width:90%;margin-right: 20px;"> 
                        <div class="updateForm_title"> 出版日期: <span class="updateForm_content">&nbsp;{{updateForm.publish_date}}</span></div>
                    </div>
                  </el-col  > 
                  <el-col :span="8"  >
                    <div   style="width:90%;margin-right: 20px;"> 
                        <div class="updateForm_title"> 定价: <span class="updateForm_content">&nbsp;{{updateForm.price}}</span></div>
                    </div>
                  </el-col  >
                </el-col  >
                <el-col :span="24"  >
                 
                  <el-col :span="8"  >
                    <div   style="width:90%;margin-right: 20px;"> 
                        <div class="updateForm_title"> 模式: <span class="updateForm_content">&nbsp;{{updateForm.mode == 1?'幼儿模式':updateForm.mode == 2?'少儿模式': updateForm.mode == 3?'青少年模式':'成年模式'  }}</span></div>
                    </div> 
                  </el-col  >
                  <el-col :span="8"  >
                    <div   style="width:90%;margin-right: 20px;"> 
                        <div class="updateForm_title"> 分类号: <span class="updateForm_content">&nbsp;{{updateForm.sort_num}}</span></div>
                    </div>
                  </el-col  > 
                  <el-col :span="8"  >
                    <div   style="width:90%;margin-right: 20px;">
                        <div class="updateForm_title"> 库存: <span class="updateForm_content">&nbsp;{{updateForm.stock}}</span></div>
                    </div>
                  </el-col>  
                </el-col  >
                <!-- <el-col :span="24"  >
                  <el-col :span="8"  >
                    <div   style="width:90%;margin-right: 20px;"> 
                        <div class="updateForm_title"> 版次: <span class="updateForm_content">&nbsp;{{updateForm.edition}}</span></div>
                    </div>
                  </el-col  >
                  <el-col :span="8"  >
                    <div   style="width:90%;margin-right: 20px;"> 
                        <div class="updateForm_title"> 开本: <span class="updateForm_content">&nbsp;{{updateForm.book_size}}</span></div>
                    </div>
                  </el-col> 
                  <el-col :span="8"  >
                    <div   style="width:90%;margin-right: 20px;"> 
                        <div class="updateForm_title"> 装帧: <span class="updateForm_content">&nbsp;{{updateForm.binding}}</span></div>
                    </div> 
                  </el-col  > 
                </el-col>
                <el-col :span="24"  >
                  <el-col :span="8"  >
                    <div   style="width:90%;margin-right: 20px;">
                        <div class="updateForm_title"> 页码: <span class="updateForm_content">&nbsp;{{updateForm.page_num}}</span></div>
                    </div>
                  </el-col  >
                 
                  <el-col :span="8"  >
                    <div   style="width:90%;margin-right: 20px;">
                        <div class="updateForm_title"> 架位号: <span class="updateForm_content">&nbsp;{{updateForm.rack_no?updateForm.rack_no:''}}</span></div>
                    </div>
                  </el-col> 
                </el-col> -->
                <el-col :span="24"  >
                  <el-col :span="8"  >
                    <div   style="width:90%;margin-right: 20px;">
                        <div class="updateForm_title"> 藏馆点: <span class="updateForm_content">&nbsp;{{updateForm.stack_room}}</span></div>
                    </div>
                  </el-col  > 
                 
                </el-col>
                <el-col :span="24"  >
                  <!-- <el-col :span="16"  > -->
                    <div   style="width:95%;margin-right: 20px; ">
                        <div class="updateForm_title"> 简介: <span class="updateForm_content">&nbsp;{{updateForm.synopsis}}</span></div>
                    </div>
                  <!-- </el-col  >  -->
                  
                </el-col>
                <el-col :span="24"  > 
                   <el-col :span="8"  >
                    <div  style="width:150px;margin-right: 20px;"> 
                       <el-form-item  label-position="left"    prop="picture_url"     label="导入图片:"    >
                      <!-- <div  >  -->
                            <div class="upImage">  
                                  <img  :src="updateForm.picture_url" alt="" width="100%" height="100%">
                             </div>   
                      <!-- </div> -->
                      </el-form-item> 
                    </div> 
                  </el-col  > 
                </el-col>
                  <el-col :span="24"  >
                    <div class="demo-drawer__footer" style="margin-top:50px;" > 
                      <el-button type="primary"  @click="cancelForm('updateForm')"  > 确 定 </el-button>
                      <!-- <el-button @click="cancelForm('updateForm')">取 消</el-button> -->
                    </div>
                </el-col>
            </el-form>
          </el-row> 
        </div>
      </el-drawer>
    </div>
</template>
<script>
export default {
  props:{
      updateForm:'',
      Info:{},
      //  dialog:false, 
      //   fristParam:false,//点击'添加图片'清除数据
      //   bookTitle:'修改图书'
    },
  data() {
    return { 
      table: false, 
      loading: false, 
      bookTitle:'修改图书',
      initDate: {
              // book_num : '', //String  书号
              price : '', //Double  定价(保留两位小数)
              publish_date: '', //Date  出版时间
              // rack_no: '', //String  架位号
              mode: '', //Number  1:幼儿模式 2:少年模式 3:青少年模式 4:成人模式
              stock: '', //Number  库存
              isbn: '', //Number  条形码
              book_name: '', //String  书名
              author: '', //String  作者
              publisher: '', //String  出版社
              sort_num: '', //String  分类号
              // book_size: '', //String  开本
              stack_room: '', //String  库区
              // page_num: '', //Number  页码
              // edition: '', //String  版次
              // binding: '', //String  装帧
              picture_url: '', //Stirng 图片地址
              // picture_url: 'https://i.loli.net/2020/06/18/DcQy98mRIGCTHhe.png', //Stirng 图片地址
              synopsis: '' //String  简介
          },
      bindingList:[
        {  value:'精装',  name:'精装'},
        {  value:'半精装',  name:'半精装'},
        {  value:'不露背锁线装',  name:'不露背锁线装'},
        {  value:'磁带',  name:'磁带'},
        {  value:'覆膜',   name:'覆'},
        {  value:'光盘',  name:'光盘'},
        {  value:'函装',  name:'函装'},
        {  value:'盒装',  name:'盒装'},
        {  value:'活页装',  name:'活页装'},
        {  value:'假精',  name:'假精'},
        {  value:'精简装',  name:'精简装'},
        {  value:'经折装',  name:'经折装'},
        {  value:'平膜',  name:'平膜'},
        {  value:'平膜勒口',  name:'平膜勒口'},
        {  value:'平望',  name:'平望'},
        {  value:'平塑单衬',  name:'平塑单衬'},
        {  value:'平塑护封',  name:'平塑护封'},
        {  value:'平塑勒',  name:'平塑勒'},
        {  value:'平塑勒单衬',  name:'平塑勒单衬'},
        {  value:'平塑勒腰单衬',  name:'平塑勒腰单衬'},
        {  value:'平塑勒腰风',  name:'平塑勒腰风'},
        {  value:'平塑腰风',  name:'平塑腰风'},
        {  value:'平装',  name:'平装'},
        {  value:'平装覆膜',  name:'平装覆膜'},
        {  value:'平装护封',  name:'平装护封'},
        {  value:'平装胶订',  name:'平装胶订'},
        {  value:'平装勒',  name:'平装勒'},
        {  value:'平装勒单村',  name:'平装勒单村'},
        {  value:'平装物单村腰',  name:'平装物单村腰'},
        {  value:'平装勒腰封',  name:'平装勒腰封'},
        {  value:'平装单色',  name:'平装单色'},
        {  value:'平装四色',  name:'平装四色'},
        {  value:'全套',  name:'全套'},
        {  value:'软精装',  name:'软精装'},
        {  value:'散页装',  name:'散页装'},
        {  value:'塑精',  name:'塑精'},
        {  value:'塑装',  name:'塑装'},
        {  value:'锁线胶订',  name:'锁线胶订'},
        {  value:'套装',  name:'套装'},
        {  value:'图书',  name:'图书'},
        {  value:'线装',  name:'线装'},
        {  value:'新书',  name:'新书'},
        {  value:'专著',  name:'专著'},  
      ],  
       QiniuData: {
        key: '', //图片名字处理
        token: "" //七牛云token
      },
      deleteImg:'',
      domain: "https://upload-z2.qiniup.com", // 七牛云的上传地址（华南区）
      qiniuaddr: "http://pics.zscdzhe.com", // 七牛云的图片外链地址
      // uploadPicUrl :'https://i.loli.net/2020/06/18/DcQy98mRIGCTHhe.png', //提交到后台图片地址
    };
  },
  mounted(){
    this.getQiniuToken('get'); 
  },
  created(){ 
      this.params()   
  },
  updated(){
    this.fristParams() 

  },
  methods: { 
    fristParams(){
     console.log( this.updateForm)
       this.$nextTick(() => { // 这里开始赋值  
          let me = this  
          if(me.Info.fristParam){  
            try{  
              me.updateForm=me.initDate; 
              me.$refs['updateForm'].resetFields();   
              me.Info.fristParam= false; 
              return
            }catch (e) { } 
          } 
       })
    },
    params(){ 
      //  console.log(this.updateForm)  
        },  
    cancelForm(formName) {//取消 
       this.Info.dialog = false;  
    }, 
     toFather(data){ // 自定义事件  传递值“子向父组件传值” 
            this.$emit("childInfo",{childInfo:data });
            //  console.log(data) 
      },
      drawerSubmitForm(formName){  //提交按钮
        let self = this; 
        self.$refs[formName].validate((valid) => {
          if (valid) { 
            self.toFather(this.updateForm)
             console.log('提交成功' ) 
             console.log( self.updateForm)
          } else {
            console.log('提交失败')
            console.log( self.updateForm)
            return false;  
          }
        });
      },
      // 七牛云
      beforeAvatarUpload(file) {  
         if(this.updateForm.isbn.length != 13){ 
            this.$ztdMessage(  '请先填写13位正确的ISBN码 ',   'warning' );
            return false;
         }
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
      let file_name =file.name.split('.')[file.name.split('.').length -1] 
      console.log(file_name)
      this.QiniuData.key =`${this.updateForm.isbn}_` + Math.round(new Date() / 1000)+'.'+`${file_name}`; 
      console.log(this.QiniuData.key)

    }, 
    uploadSuccess(response, file, fileList) {
      let me = this;
      console.log(file); 
       me.$nextTick(() => { // 这里开始赋值   
         me.updateForm.picture_url = `${me.qiniuaddr}/${response.key}`;  
          })
      try{ 
          if(me.deleteImg)
          this.getQiniuToken('delete',{'imagekey':me.deleteImg}); 
          // me.$api.deleteImg({"bucket":"ACCESSORY_BUCKET",'imagekey':me.deleteImg}).then(res=>{  })  
      }catch(e){  } 
				 me.deleteImg =response.key;   
        me.$ztdMessage(  '恭喜~ 上传成功啦! ',   'success' )  
    }, 
    uploadError(err, file, fileList) {
      //  this.$message.error('错了哦，这是一条错误消息');
      this.$ztdMessage(  '上传出错，请重试！',   'error' ) 
    }, 
    //请求后台拿七牛云token
    getQiniuToken(method,data) {
        let me = this;
        me.$requestAxios(me,{
            url : 'qiniuToken',
            data :data ,
            method : method,
            urlParam :'?bucket=PICS_BUCKET'
        },function(res,opt){
            // console.log(res)
          if (res.data.error_code == 200) { 
            me.QiniuData.token = res.data.token;
            // console.log(me.QiniuData.token)
          }
        })  
    },
  }
}
</script>
<style   scoped> 
    .el-drawer__open .el-drawer.rtl{
      height: 100vh;
    }
    .addBook .demo-drawer__content{
        padding: 0 30px;
        justify-content: space-around; 
    }
    .addBook .el-form-item {
        margin-bottom: 10px;
    }
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
    /* 取消、确定按钮 */
    .addBook .demo-drawer__footer .el-button { 
        background:rgba(255,255,255,1);
        border-radius:8px;
        border:1px solid rgba(103,207,220,1);
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(103,207,220,1); 
        float: right;
        margin:60px 10px 30px;
    }
    .addBook .demo-drawer__footer  .el-button--primary{
        margin-right: 20px;
        background:rgba(103,207,220,1)!important;
        color:rgba(255,255,255,1)!important;
     }

     /* 详情 */
     .addBook .updateForm_title,.addBook .updateForm_content{ 
        font-size: 14px; 
        color: #77778C ;
        line-height: 20px;
        margin-bottom: 20px
     }
     .addBook .updateForm_content{ 
        color: #333333!important; 
     }
</style>
<style    > 
  .addBook .el-drawer__body{
    overflow-y: auto; 
  }
  .addBook  :focus {
      outline: none!important;
  }
  .addBook .el-drawer__header {
      font-size:24px;
      font-family:PingFangSC-Medium,PingFang SC; 
      color:rgba(119,119,140,1);
      line-height:33px;
      margin-bottom: 20px;
      padding: 20px 30px 0;
  }
  .addBook .el-textarea__inner{
      height: 150px!important;
      font-family: PingFangSC;
      line-height: 25px;
      font-size: inherit;
    }
   .addBook .el-form-item__label{ 
      line-height:30px;
      font-size:14px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(51,51,51,1); 
    }
 
</style>