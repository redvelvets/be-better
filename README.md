
# Be Better - 个人学习计划管理平台

Be Better 是一个基于 Vue 3 + TypeScript + Vite 开发的学习计划管理平台，帮助用户更好地规划和追踪学习进度。

## 功能特点

- 📚 学习计划管理
  - 创建自定义学习计划
  - 按天划分学习任务
  - 可视化的学习进度追踪
  - 丰富的动画和交互效果
  
- 🎯 任务完成度追踪
  - 任务打卡功能
  - 进度条显示
  - 完成动画和庆祝效果
  
- 👤 用户系统
  - 用户登录/注册
  - 个人计划管理
  - 头像和个人信息设置

## 技术栈

- 前端框架：Vue 3
- 开发语言：TypeScript
- 构建工具：Vite
- UI 组件库：Naive UI
- 路由管理：Vue Router
- HTTP 请求：Axios
- 动画效果：Canvas Confetti

## 项目结构
src/
├── api/ # API 请求相关
│ ├── index.ts # API 接口定义
│ └── request.ts # 请求工具配置
├── assets/ # 静态资源
├── components/ # 公共组件
├── mock/ # Mock 数据
│ ├── types.ts # 类型定义
│ └── .ts # 模块数据
├── pages/ # 页面组件
├── styles/ # 全局样式
├── types/ # 类型声明
├── utils/ # 工具函数
└── main.ts # 入口文件

## 开发环境

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 构建开发版本（使用 mock 数据）

```bash
npm run build:dev
```

### 预览构建结果

```bash
npm run preview
```

## 开发规范

### 命名规范

- 文件命名：
  - 组件文件：使用 PascalCase，如 `NavBar.vue`
  - 工具函数：使用 camelCase，如 `request.ts`
  - 类型定义：使用 PascalCase，如 `UserInfo.ts`
  
- 变量命名：
  - 组件名：使用 PascalCase
  - 变量和函数：使用 camelCase
  - 常量：使用 UPPER_SNAKE_CASE
  
### TypeScript 规范

- 始终为组件的 props 定义类型
- 使用 interface 而不是 type 来定义对象类型
- 为异步函数标注返回类型
- 避免使用 any 类型

### 组件规范

- 使用 `<script setup>` 语法
- 组件按功能分类放置在对应目录
- 公共组件放在 components 目录
- 页面组件放在 pages 目录

### Git 提交规范

提交信息格式：`<type>(<scope>): <subject>`

type 类型：
- feat: 新功能
- fix: 修复
- docs: 文档
- style: 格式
- refactor: 重构
- test: 测试
- chore: 构建过程或辅助工具的变动

### 环境变量

- `.env`: 所有环境通用的配置
- `.env.development`: 开发环境配置
- `.env.production`: 生产环境配置

## 注意事项

1. 开发时注意区分环境：
   - 开发环境使用 mock 数据
   - 生产环境使用实际 API

2. 类型安全：
   - 确保所有数据结构都有类型定义
   - API 响应数据需要类型声明
   - 避免使用 any 类型

3. 性能优化：
   - 路由懒加载
   - 组件按需加载
   - 合理使用 keepAlive
   - 图片资源优化

4. 代码提交：
   - 提交前进行代码格式化
   - 确保 TypeScript 类型检查通过
   - 遵循 Git 提交规范

5. 组件开发：
   - 遵循单一职责原则
   - 保持组件的可复用性
   - 注意组件之间的解耦

## 浏览器支持

- Chrome >= 87
- Firefox >= 78
- Safari >= 14
- Edge >= 88

## 许可证

[MIT License](LICENSE)