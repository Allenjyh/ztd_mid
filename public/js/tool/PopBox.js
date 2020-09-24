const $popBox = {
  message:function(content,type){
    this.$message({
      message: content?content:"",
      type: type?type:'',
      offset:80
    });
  },
  alert : function(content,title){
    this.$alert(content?content:"", title?title:"提示信息", {
      confirmButtonText: '确定',
      /*callback: action => {
        this.$message({
          type: 'info',
          //message: `action: ${ action }`
        });
      }*/
    });
  },
  warningBox : function(opt){

    let confirmButton = {
      confirmButtonText: '确定',
      type:opt.type ? opt.type :  'warning'
    }
    if(opt.cancel)
      confirmButton.cancelButtonText = '取消'

    this.$confirm(opt.content ? opt.content : "", opt.title ? opt.title : '提示', confirmButton).then(() => {
      opt.success();

    }).catch(() => {
      if(opt.cancel)
        opt.cancel();
    });
  }
}

export { $popBox }

// this.$ztdMessage(  '请先选择要进行操作的员工！',   'warning' )
// this.$ztdAlert(  '请先选择要进行操作的员工！',   '标题' )
// this.$alertBox({
//   content: '你的登录信息',
//   title: '信息过期',
//   success: function () {
//      
//   }
// })