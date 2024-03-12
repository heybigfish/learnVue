(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.MiniVue = factory());
})(this, (function () { 'use strict';

  function initMixin(MiniVue) {
    MiniVue.prototype._init = function (options) {
      // 初始化
      var vm = this;
      vm.$options = options;
    };
  }

  function MiniVue(options) {
    // 初始化
    this._init(options);
  }
  initMixin(MiniVue);

  return MiniVue;

}));
//# sourceMappingURL=MiniVue.js.map
