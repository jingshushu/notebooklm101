# NotebookLM101

一个介绍 NotebookLM 的纯 HTML/CSS/JS 静态网站。

## 项目结构

```
notebooklm101/
├── index.html          # 主页
├── css/
│   └── style.css      # 样式文件
├── js/
│   └── main.js        # JavaScript 文件
├── assets/
│   └── images/        # 图片资源
└── README.md          # 项目说明
```

## 使用方法

### 直接在浏览器中打开

1. 双击 `index.html` 文件，或
2. 右键 `index.html` → 使用浏览器打开

### 使用本地服务器（推荐）

如果你安装了 Python，可以运行：

```bash
# Python 3
python -m http.server 8000

# 然后在浏览器访问
# http://localhost:8000
```

或者使用 Node.js 的 http-server：

```bash
npx http-server

# 然后在浏览器访问显示的地址
```

## 功能特性

- 响应式设计，支持移动端和桌面端
- 平滑滚动导航
- 现代化 UI 设计
- CSS 变量主题系统
- 语义化 HTML 结构

## 自定义

### 修改颜色

编辑 `css/style.css` 中的 CSS 变量：

```css
:root {
    --color-primary: #4285f4;      /* 主色调 */
    --color-secondary: #34a853;    /* 次要色调 */
    /* ... 更多变量 */
}
```

### 添加内容

在 `index.html` 中对应区块添加你的内容。

### 添加交互功能

在 `js/main.js` 中添加自定义 JavaScript 代码。

## 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge
- 其他现代浏览器

## License

MIT
