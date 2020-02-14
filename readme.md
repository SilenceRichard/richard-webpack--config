# 自定义webpack

> [参考文章](https://juejin.im/post/5cfe4b13f265da1bb13f26a8#heading-4)

## 安装webpack

```bash
yarn add webpack webpack-cli webpack-dev-server -D //webpack4把webpack拆分了
```
## babel编译ES6,JSX等

```js
// @babel/core-babel核心模块    @babel/preset-env-编译ES6等 @babel/preset-react-转换JSX
cnpm i babel-loader @babel/core @babel/preset-env  @babel/plugin-transform-runtime   @babel/preset-react -D
// @babel/plugin-transform-runtime: 避免 polyfill 污染全局变量，减小打包体积
// @babel/polyfill: ES6 内置方法和函数转化垫片
cnpm i @babel/polyfill @babel/runtime
```