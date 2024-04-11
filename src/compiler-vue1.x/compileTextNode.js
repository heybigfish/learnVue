
import Watcher from "../watcher.js"
export default function compileText (node, vm) {
  const key = RegExp.$1.trim()
  function cb () {
    let value = vm[key]
    node.textContent = typeof value === 'object' ? JSON.stringify(value) : String(value)
  }
  new Watcher(cb)
}