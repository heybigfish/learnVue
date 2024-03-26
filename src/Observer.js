import defineReactive from "./defineReactive.js";
import Dep from "./dep.js";
import observe from "./observe.js";
import protoArgument from "./protoArgument.js";

function Observe (obj) {
  if (!obj || typeof obj !== 'object') return
  Object.defineProperty(obj, '__ob__', {
    value: this,
    // 防止递归的时候进入 __ob__, 造成死循环
    // 在页面显示的时候，不希望是 __ob__，所以这里设置为 false
    enumerable: false,
    configurable: true,
    writable: true
  })

  // 对整个对象进行响应式，并储存dep实例 ，数组更新通知依赖更新时候使用
  obj.__ob__.dep = new Dep()

  if (Array.isArray(obj)) {
    //  增强数组的原型
    protoArgument(obj)
    // 数组的响应式处理
    this.observeArray(obj)
  } else {
    // 对象的响应式
    this.walk(obj)
  }
}
Observe.prototype.walk = function (obj) {
  for (const i in obj) {
    if (Object.hasOwnProperty.call(obj, i)) {
      const element = obj[i];
      defineReactive(obj, i, element)
    }
  }
}
Observe.prototype.observeArray = function (obj) {
  for (const item of obj) {
    // 对数组中的每一项做响应式处理
    observe(item)
  }
}
export default Observe