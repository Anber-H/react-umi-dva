# umi project

## Getting Started

Install dependencies,

```bash
$ yarn
```

Start the dev server,

```bash
$ yarn start
```
项目访问地址（你的服务启动后需要在后面加上users才能看到页面）：http://localhost:8000/users  

具体教程地址：https://juejin.cn/post/6983855069850501127

这是一个简单的增删改查项目。  
1、涉及知识点：  
UmiJS 3、DvaJS、antd、ProTable、ReactHook、TypeScript、DvaJS

2、dev分支：  
功能：列表的展示，新增，编辑，删除。  

3、大概的结构：
```
├──mock
├──src
    ├──pages
        ├──users
            ├──components
                └──UserModal.tsx --------弹窗组件
            ├──index.tsx ---------主页面的列表展现
            ├──model.ts ---------仓库
            └──service.ts ---------异步接口的逻辑
├──.editorconfig
├──.gitignore
├──.prettierignore
├──.prettierrc
├──.umirc.ts
├──package.json
├──README.md
├──tsconfig.json
└──typings.d.ts
```
