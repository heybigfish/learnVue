import Dep from "./dep.js"

/**
 * @description 观察者
 * @param {*} cb  负责更新 DOM 节点
 */
export default function Watcher (cb) {
  this._cb = cb
  // 赋值
  Dep.target = this
  // 执行回调函数时候，新 DOM 节点，会有一些 this.xx 的读取操作，从而触发 getter ，进行依赖收集
  this._cb()
  // 防止重复收集，依赖收集完成之后，将 Dep.target 清空，方便下一个 watcher 使用
  Dep.target = null
}

Watcher.prototype.update = function () {
  // 当响应式数据更新时，执行回调函数，更新 dom 
  this._cb()
}