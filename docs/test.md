# 本地测试步骤

安装依赖

```
yarn
```

编译 TypeScript 文件

```
yarn build
```

临时注册到本地索引

```
yarn link
```

在其他项目中引入

```
yarn link "heng-protocol"
```

在其他项目中自由测试

```
```

在其他项目中解除引入

```
yarn unlink "heng-protocol"
```

回到本仓库，解除临时注册

```
yarn unlink
```
