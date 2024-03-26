import Observer from './Observer.js'
export default function observe (value) {
  if (typeof value !== 'object' || value === null) {
    return
  }
  // 说明数据已经被响应式处理了
  if (value.__ob__) {
    return value.__ob__
  }
  const ob = new Observer(value)
  return ob
}