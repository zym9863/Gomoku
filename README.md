# 五子棋 (Gomoku) - Vue 3 + TypeScript

[简体中文](README.md) | [English](README_EN.md)

一个基于 Vue 3、TypeScript 和 Vite 构建的人机对战五子棋游戏。

## 功能特点

- 人机对战模式
- 美观的界面设计
- 响应式布局
- 高亮显示最后一步棋子
- 游戏状态实时显示

## 技术栈

- **前端框架**: Vue 3
- **开发语言**: TypeScript
- **构建工具**: Vite
- **样式**: CSS (使用 CSS 变量实现主题)

## 视觉设计

游戏界面经过精心设计，包含以下视觉元素：

- 自定义棋盘纹理和棋子效果
- 渐变色标题栏
- 自定义图标和状态指示器
- 动画效果（如最后落子的脉冲动画）
- 交互反馈（如悬停效果）

## 项目结构

```
src/
├── assets/            # 静态资源
│   ├── icons/         # 图标文件
│   ├── board-texture.svg  # 棋盘纹理
│   └── favicon.svg    # 网站图标
├── components/        # 组件
│   ├── Cell.vue       # 棋盘单元格组件
│   └── GameBoard.vue  # 游戏棋盘组件
├── utils/             # 工具函数
│   ├── computerAI.ts  # 电脑AI逻辑
│   └── gameLogic.ts   # 游戏核心逻辑
├── App.vue            # 主应用组件
├── main.ts            # 入口文件
└── style.css          # 全局样式
```

## 运行项目

1. 安装依赖：
   ```
   npm install
   ```

2. 开发模式运行：
   ```
   npm run dev
   ```

3. 构建生产版本：
   ```
   npm run build
   ```

## 游戏规则

- 黑子先行
- 先形成五子连线（横、竖、斜）的一方获胜
- 玩家使用黑子，电脑使用白子

## 未来计划

- 添加难度选择
- 实现玩家对战模式
- 增加音效
- 支持悔棋功能
- 增加游戏记录和回放功能
