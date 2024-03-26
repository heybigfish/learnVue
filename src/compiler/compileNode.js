import compileText from "./compileTextNode.js"
import compileAttribute from "./compileAttribute.js"

export default function compileNode (nodes, vm) {
  for (const node of nodes) {
    if (node.nodeType === 3 && node.textContent.match(/\{\{(.*)\}\}/)) {
      // 文本节点,编译文本节点中的{{ xxx }}
      compileText(node, vm)
    } else if (node.nodeType === 1) {
      // 元素节点,编译节点上的各个属性，如v-bind，v-model，v-on,递归编译
      compileAttribute(node, vm)
      compileNode(node.childNodes, vm)
    }

  }
}