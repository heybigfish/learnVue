
export function initMixin (MiniVue) {
  MiniVue.prototype._init = function (options) {
    // 初始化
    let vm = this
    vm.$options = options
  }
}