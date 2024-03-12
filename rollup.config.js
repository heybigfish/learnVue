import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';

// 打包配置
export default {
  input: './src/index.js', // 打包的入口文件
  output: {
    file: 'dist/MiniVue.js', // 打包后的文件
    format: 'umd', // 打包后的格式 umd 可以再window中使用
    name: 'MiniVue', // 打包后的全局变量
    sourcemap: true // 生成sourcemap
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'   // 排除node_modules中的文件,不需要转换
    }),
    serve({
      port: 3000, // 端口号,
      contentBase: '',  // 当前目录
      open: true, // 自动打开浏览器
      openPage: './index.html', // 打开的页面
    })
  ]
}