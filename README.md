<!--

 * @Author: XJN
 * @Date: 2023-10-06 02:24:25
 * @LastEditors: xiaojunnanya
 * @LastEditTime: 2024-01-02 16:41:00
 * @FilePath: \easy_pan\README.md
 * @Description: 
 * @前端实习生: 鲸落
-->
## 网盘项目

个人网盘项目

后端部分：[kbws13/Netdisk](https://github.com/kbws13/Netdisk)

个人博客：www.xiaojunnan.cn



## 前提

- node版本：16.16.0
- 安装环境：`npm i`
- 运行：`npm start`
- React + TS



## 项目结构

```markdown
├── public
│   └── favicon.ico               # 图标
|   └── index.html                # 根
├── src
│   ├── assets                    # 静态文件
│   ├── components                # 组件
│   ├── router                    # 路由
│   ├── service                   # 前后端交互
│   ├── store                     # 仓库
│   ├── utils                     # 工具
│   ├── views                     # 视图
│   ├── App.tsx
│   ├── index.tsx
│   ├── react-app-env.d.ts
│   └── setupProxy.js             # 本地开发设置代理
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json
```



## 依赖

常见的并没有做解释
- `spark-md5`：用户输入密码加密
- `highlight.js`：代码高亮
- `copy-to-clipboard`：复制到剪切板
- `react-pdf`：pdf预览
- `DPlayer`/`hls.js`：视频播放
- `xlsx`：excel预览
- `docx-preview`：doc预览
- `nanoid`：生成唯一id



## 网盘功能

- 登录模块
    - [x] 登录
    - [x] 注册
    - [x] 重置密码
    - [x] 邮箱验证码
- 首页标头模块
    - [x] 退出登录
    - [x] 空间使用的刷新
    - [x] 修改头像
      - [ ] 修改账户
    - [x] 修改密码
- 首页模块
    - [x] 表格展示
    - [x] 新建文件夹
    - [x] 删除与批量删除
    - [x] 分享
    - [x] 下载
    - [x] 文件搜索
    - [x] 预览：图片、pdf、excel、world、video、md、code、文件夹
    - [x] 刷新
    - [x] 没有数据的显示上述文件或文件夹而不是空数据
    - [x] 表格加载loading
    - [x] 文件文件夹重命名
    - [ ] 移动、批量移动
    - [x] 大件上传（计划使用web work优化）
      - [ ] 多选分享
      - [ ] 暂停上传，中途上传失败的重传
    - [x] 文件删除取消删除
- 分享模块
    - [x] 取消分享、批量取消分享
    - [x] 复制链接
    - [x] 搜索
    - [x] 刷新
- 回收站模块
    - [x] 还原、批量还原
    - [x] 删除、批量删除
    - [x] 搜索
    - [x] 刷新
    - [x] 回收站批量删除/删除 应该要刷新一个空间使用
- 设置模块（管理员）
    - [x] 用户文件的展示，功能与首页一样
    - [x] 删除、批量删除
    - [x] 下载
    - [x] 搜索
    - [x] 刷新
    - [x] 用户管理
    - [x] 用户昵称搜索与状态筛选
    - [x] 禁用用户账户
      - [ ] 用户文件夹的预览
    - [ ] 设置管理员
    - [ ] 分配空间（思考觉得不合理，在后续将其改为设置空间大小）
- 外部分享模块
    - [x] 分享链接失效或链接错误
    - [x] 分享链接前的校验code
    - [x] 分享内容展示等功能
    - [x] 判断是否是本人请求的链接
    - [x] 取消分享（本人访问）
    - [ ] 保存到我的网盘（非本人访问）
      - [ ] 文件夹预览
- 用户体验优化模块
    - [x] 全局提示
    - [x] 表格屏幕自适应
    - [ ] 面包屑导航
      - [ ] 表格分页（分页请求数据）
      - [ ] 视频加载速度的优化+视频加载中快进报错
      - [ ] 表格模块的复用



## 其他的问题

对于每个模块的复用性感觉做的不是很好，特别是对于表格发复用，在多处的地方都用到了表格，
但是每个地方的标题与展示内容都造成了对于其封装的困难



## 项目难点与亮点

对于网盘项目来说，项目的难点与亮点自然就是大文件上传了
我计划添加web worker来解决对于文件过大阻塞单一线程造成浏览器卡顿的问题