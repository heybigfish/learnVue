import Watcher from "../watcher.js"
export default function compileAttribute (node, vm) {
  const attrs = Array.from(node.attributes)
  for (const attr of attrs) {
    const { name, value } = attr
    if (name.match(/v-on:click/)) {
      // <button v-on:click="handleClick">click me</button>
      compileVOn(node, value, vm)
    } else if (name.match(/v-bind:/)) {
      // <button v-bind:title="title">click me</button>
      compileVBind(node, name, value, vm)
    } else if (name.match(/v-model/)) {
      // <input v-model="inputVal">
      compileVModel(node, value, vm)
    }
  }
}

/**
 * @description: 原理：就是添加了一个 click 事件
 */
function compileVOn (node, method, vm) {
  node.addEventListener('click', (...args) => {
    vm.$options.methods[method].apply(vm, args)
  })
}

function compileVBind (node, attrName, attrValue, vm) {
  //  <button v-bind:title="title">click me</button>
  // 移除节点上已有的 v-bind:xx 属性
  node.removeAttribute(attrName)
  attrName = attrName.replace(/v-bind:/, '')
  function cb () {
    node.setAttribute(attrName, vm[attrValue])
  }
  // 数据变更时，触发watcher的update方法，更新DOM
  new Watcher(cb)
}

function compileVModel (node, key, vm) {
  // <input v-model="inputVal">
  let { tagName, type } = node
  tagName = tagName.toLowerCase()
  if (tagName === 'input' && type === 'text') {
    // <input v-model="inputVal">
    // 初始值
    node.value = vm[key]
    // 响应式,当数据变化时，更新DOM
    node.addEventListener('input', () => {
      vm[key] = node.value
    })
  } else if (tagName === 'input' && type === 'checkbox') {
    //   <input type="checkbox" v-model="isChecked">
    node.checked = vm[key]
    node.addEventListener('change', () => {
      vm[key] = node.checked
    })
  } else if (tagName === 'select') {
    // <select v-model="selectValue">
    node.value = vm[key]
    node.addEventListener('change', () => {
      vm[key] = node.value
    })
  }
}