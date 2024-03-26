import mount from "./compiler/index.js"
import initData from "./initData.js"

export default function Vue (options) {
  this._init(options)
}

Vue.prototype._init = function (options) {
  this.$options = options
  // 初始化data
  // 1. data 有值，且是函数，则执行函数，将返回值赋值给 vm._data,否则直接赋值
  // 2. 代理data属性到实例
  // 3. 响应式处理
  initData(this)

  // 存在$el时挂载
  if (this.$options.el) {
    this.$mount()
  }
}
Vue.prototype.$mount = function () {
  mount(this)
}