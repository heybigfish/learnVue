import observe from "./observe.js"
import proxy from "./proxy.js"

export default function initData (vm) {
  const data = vm.$options.data
  //? data 有值，且是函数，则执行函数，将返回值赋值给 vm._data,否则直接赋值
  if (data) {
    vm._data = typeof data === 'function' ? data.call(vm) : data
  }
  // 代理data属性到实例
  for (const key in vm._data) {
    proxy(vm, '_data', key)
  }
  // 响应式处理
  observe(vm._data)
}