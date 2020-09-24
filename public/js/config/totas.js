import vue from 'vue';
import toastComponent from './../components/totas.vue'; // 这里就是我们刚刚创建的那个静态组件
const ToastConstructor = vue.extend(toastComponent); // 返回一个 扩展实例构造器
var Test = true;
// 定义弹出组件的函数 接收2个参数, 要显示的文本 和 显示时间
function showToast (text, iconState, duration = 2000) {
  if (Test === false) {
    return;
  }
  const toastDom = new ToastConstructor({
    el: document.createElement('div'),
    data () {
      return {
        text: text,
        showWrap: true, // 是否显示组件
        showContent: true, // 作用:在隐藏组件之前,显示隐藏动画
        iconState: iconState
      };
    }
  });
  document.body.appendChild(toastDom.$el);
  Test = false;
  // 过了 duration 时间后隐藏整个组件
  setTimeout(() => {
    toastDom.showWrap = false;
    Test = true;
  }, duration);
}

// 注册为全局组件的函数
function registryToast () {
  // 将组件注册到 vue 的 原型链里去,
  // 这样就可以在所有 vue 的实例里面使用 this.$message()
  vue.prototype.$message = showToast;
}

export default registryToast;
