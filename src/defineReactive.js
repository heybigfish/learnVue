import Dep from "./dep.js"
import observe from "./observe.js"

export default function defineReactive (target, key, val) {
  // 返回ob实例
  const childOb = observe(val)
  const dep = new Dep()
  Object.defineProperty(target, key, {
    enumerable: true,
    configurable: true,
    get () {
      console.log('get', key)
      // dep.target = watcher  watcher已经被实例化了。  
      if (Dep.target) {
        dep.depend()
        // 如果存在子属性，让子属性也依赖收集
        if (childOb) {
          childOb.dep.depend()
        }
      }
      return val
    },
    set (newValue) {
      console.log('set', key)
      if (val === newValue) return
      val = newValue
      observe(newValue)
      dep.notify()
    }
  })
}
