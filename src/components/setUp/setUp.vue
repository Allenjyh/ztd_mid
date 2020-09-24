<template>
  <el-row> 
      <div class="librarian setUp">
          <div class="librarian_title">通用设置<span class="librarian_title_child">/ 通用设置</span></div> 
          <div class="librarian_content el-drawer__body">
              <div style="padding: 40px 0 0 40px;">  
                <el-form :model="setform" ref="setform" label-width="104px" label-position="top">
                  <p>个人信息</p>
                  <el-row>
                    <el-col :span="24">
                      <el-col :span="9"> 
                        <div   style="width: 85%;">
                          <el-form-item   label="默认保证金(元)"     prop="deposit_amount">
                            <el-input v-model="setform.deposit_amount" placeholder="请输入" autocomplete="off" style=" height: 40px;" maxlength="15"  oninput="javascript:value=this.value.replace(/[^\d.]/g,'');"></el-input>
                          </el-form-item> 
                          <el-form-item   label="首次借书免费天数(天)"     prop="first_borrow_day">
                            <el-input v-model="setform.first_borrow_day" placeholder="请输入" autocomplete="off" style=" height: 40px;" maxlength="15" oninput="javascript:value=this.value.replace(/[^\d]/g,'');"></el-input>
                          </el-form-item> 
                          <el-form-item   label="借书周期"     prop="borrow_cycle">
                            <el-input v-model="setform.borrow_cycle" placeholder="请输入" autocomplete="off" style=" height: 40px;" maxlength="15" oninput="javascript:value=this.value.replace(/[^\d]/g,'');"></el-input>
                          </el-form-item> 
                          <el-form-item   label="续借每天扣除金额(元)"     prop="borrow_price">
                            <el-input v-model="setform.borrow_price" placeholder="请输入" autocomplete="off" style=" height: 40px;" maxlength="15" oninput="javascript:value=this.value.replace(/[^\d.]/g,'');"></el-input>
                          </el-form-item> 
                          <el-form-item size="large"> 
                              <el-button  class="white"  @click="resetForm('setform')"  > 重 置 </el-button>
                              <el-button  type="primary" style="margin:20px 0 30px;" @click="setSubmitForm('setform')"  > 保 存 </el-button>
                          </el-form-item> 
                        </div> 
                      </el-col>
                      <el-col :span="9"> 
                          <div   style="width: 85%;">
                          <el-form-item   label="订单可借阅图书数(本)"     prop="can_borrow_total">
                            <el-input v-model="setform.can_borrow_total" placeholder="请输入" autocomplete="off" style=" height: 40px;" maxlength="15" oninput="javascript:value=this.value.replace(/[^\d]/g,'');"></el-input>
                          </el-form-item> 
                          <el-form-item   label="免费续借天数(天)"     prop="free_continue_day">
                            <el-input v-model="setform.free_continue_day" placeholder="请输入" autocomplete="off" style=" height: 40px;" maxlength="15" oninput="javascript:value=this.value.replace(/[^\d]/g,'');"></el-input>
                          </el-form-item> 
                          <el-form-item   label="即将到期天数(天)"     prop="be_about_to_day">
                            <el-input v-model="setform.be_about_to_day" placeholder="请输入" autocomplete="off" style=" height: 40px;" maxlength="15" oninput="javascript:value=this.value.replace(/[^\d]/g,'');"></el-input>
                          </el-form-item>  
                          <el-form-item   label="服务费"     prop="service_fee">
                            <el-input v-model="setform.service_fee" placeholder="请输入" autocomplete="off" style=" height: 40px;" maxlength="15" oninput="javascript:value=this.value.replace(/[^\d.]/g,'');"></el-input>
                          </el-form-item>  
                        </div> 
                      </el-col> 
                    </el-col> 
                  </el-row>  
                </el-form>
            </div>   
          </div>    
      </div> 
  </el-row>
</template>
<script>    
export default {
  name:'setUp',  
  data() {
    return {  
        setform: { 
          "deposit_amount": "",//默认保证金(元)
          "can_borrow_total": "",//订单可借阅图书数(本)
          "borrow_cycle": "",//借书周期
          "be_about_to_day": "",//即将到期天数(天)
          "first_borrow_day": "",//首次借书免费天数
          "free_continue_day": "",//免费续借天数(天)
          "borrow_price": "",//续借每天扣除金额(元)
          "service_fee": "",//服务费   
        },  
    };
  },
  created(){ 
    this.params()
  },  
  methods: { 
     params(phone){
      let me = this;  
        me.$requestAxios(me,{
          url : 'setting',
            data : {} ,
            method : 'get', 
        },function(res,opt){ 
            // console.log(res)
          if (res.data.error_code == 200) {  
              me.setform = res.data.data;   
          }
        })   
    }, 
    setSubmitForm(formName){  //提交按钮
        let me = this;   
         let _data =JSON.parse(JSON.stringify( me.setform)); 
         _data.deposit_amount =Number(_data.deposit_amount * 100);
         _data.borrow_price =Number(_data.borrow_price * 100);
         _data.service_fee =Number(_data.service_fee * 100); 
        let _number=0;
          for(let i in  _data){ 
            if(!_data[i] ){
                _number += 1 ;
              delete _data[i]; 
              if(8 == _number){
                me.$ztdMessage(  '请添加修改内容',   'warning' )  
                return ;
              }
            }
          }  
        me.$requestAxios(me,{
            url : 'setting',
            data : {data:_data  } ,
            method : 'PUT', 
        },function(res,opt){ 
            if (res.data.error_code == 200) {   
              me.$ztdMessage(  '保存成功',   'success' )  
          }  
        })    
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
  }
};
</script> 
<style  scoped > 
     .setUp .librarian_content p{font-size: 18px;  color: #333333; line-height: 33px; margin-bottom: 30px; }
     .setUp .el-form-item { margin-bottom: 30px; }
</style>
<style  >
      .setUp .el-form--label-top .el-form-item__label {padding:0!important; } 
</style>