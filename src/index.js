import { initMixin } from './init'
function MiniVue (options) {
  // 初始化
  this._init(options)
}
initMixin(MiniVue)
export default MiniVue