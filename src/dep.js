export default function Dep () {
  this.watchers = []
}

// 实例化 Watcher 时候，会赋值 Dep.target = watcher 实例
Dep.target = null


/**
 * @description 添加依赖
 */
Dep.prototype.depend = function () {
  this.watchers.push(Dep.target)
}

/**
 * @description 通知依赖
 */
Dep.prototype.notify = function () {
  this.watchers.forEach(watcher => watcher.update())
}