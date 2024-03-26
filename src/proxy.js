export default function proxy (target, sourceKey, key) {
  Object.defineProperty(target, key, {
    get () {
      return target[sourceKey][key]
    },
    set (newValue) {
      target[sourceKey][key] = newValue
    }
  })
}