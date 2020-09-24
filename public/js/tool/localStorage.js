const ztdLocalStorage = {
  setLocalStorage : function(name,data){
    console.log(arguments)
    localStorage.setItem(name,JSON.stringify(data))
    return this;
  },
  location:function(){
    top.location.href = top.location.href.split("#")[0];
  },
  deleteItem : function (name){
    localStorage.removeItem(name);
    return this;
  }
}
export {
  ztdLocalStorage
}
// me.$ztdLocalStorage.setLocalStorage('yz_center_login',res.data).location();
