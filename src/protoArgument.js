import observe from "./observe.js"

/**
 * @description 数组的响应式实现
 * @param {*} obj 
 */
const arrProto = Array.prototype
const arrayMethods = Object.create(arrProto)
// 这7个方法会改变原数组
const methods = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse']

methods.forEach((method) => {
  // 以push为例
  // this.arr.push(4)
  Object.defineProperty(arrayMethods, method, {
    value: function (...args) {
      const result = arrProto[method].apply(this, args)
      const ob = this.__ob__
      let inserted
      //! 这3个方法会新增值，需要进一步响应式处理
      switch (method) {
        case 'push':
        case 'unshift':
          inserted = args
          break
        case 'splice':
          // this.arr.splice(idx, deleteNum, addNumber)
          inserted = args.slice(2)
          break
      }
      // 存在新增的值，需要进行响应式处理
      if (inserted) {
        observe(inserted)
      }
      // 依赖通知更新
      ob.dep.notify()
      return result
    },
    enumerable: false,
    configurable: true,
    writable: true
  })
})


// 增强数组的原型
export default function protoArgument (arr) {
  arr.__proto__ = arrayMethods
}