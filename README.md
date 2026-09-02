# AILearn · AI 知识学习地图

从零基础到 Agent 工程的系统化 AI 学习网站：**4 阶段 · 8 章 · 34 课**，专为转型 AI 产品经理的学习者设计。每课是一条完整的「溯源式」学习路径——直觉 → 原理深挖 → 视频讲座 → 源头论文 → 权威资料 → 产品视角，把每个知识追到它最初被提出的地方。

## 快速开始

```bash
npm install
npm run dev        # 开发模式，默认 http://localhost:5173
npm run build      # 生产构建，输出到 dist/
npm run preview    # 预览生产构建
```

## 每课的 6 层学习结构

| 层 | 内容 | 数量 |
|---|---|---|
| ① 直觉 | 核心概念卡，建立第一直觉 | 每课 2~4 张 |
| ② 原理深挖 | 机制细节、关键公式 + 白话拆解、边界与反例 | 每课 2~3 节 |
| ③ 视频讲座 | Karpathy / 3Blue1Brown / Stanford / 论文作者亲讲（含时长与推荐理由） | 全站 24 个 |
| ④ 源头论文 | 提出该概念的原始论文（arXiv 直链 + 为什么是源头 + 核心贡献 + PM 一句话，可展开） | 全站 67 篇 |
| ⑤ 权威资料 | 经典图解（Jay Alammar）、官方文档、Lilian Weng 等 | 全站 66 份 |
| ⑥ 产品视角 | 这个知识如何转化为产品决策（AI PM 视角） | 每课 2~3 段 |

另有每课的常见误区对照、小练习（含参考答案）、以及自动匹配的开源项目动手实践章节。

## 溯源示例（每个知识点都能走通）

- **注意力机制**：本站原理深挖 → 3Blue1Brown / Karpathy 视频 → **Vaswani 2017《Attention Is All You Need》** → Illustrated Transformer → 「懂 n² 复杂度才懂长上下文定价」
- **RLHF**：Schulman（RLHF 负责人）亲讲 → **Christiano 2017 原点** → Constitutional AI → **DeepSeek-R1（RLVR）** → 推理模型的成本-延迟-准确率产品三角
- **Scaling Laws**：**Kaplan 2020** → Chinchilla → 涌现正方（Wei 2022）与反方（Schaeffer 2023「海市蜃楼」）同台 → 厂商融资与定价的底层逻辑

## 知识地图结构

| 阶段 | 章节 | 课数 |
|---|---|---|
| STAGE 01 · AI 系统地图 | 1.1 模型诞生 / 1.2 问答原理 / 1.3 发展路线 / 1.4 应用前沿 | 18 |
| STAGE 02 · 编程与工程基础 | 2.1 开发环境与 API / 2.2 Prompt 与应用构建 | 6 |
| STAGE 03 · RAG 与知识库 | 3.1 搭建知识库 / 3.2 评估与优化 | 5 |
| STAGE 04 · Agent 工程 | 4.1 Agent 核心机制 / 4.2 生产级 Agent | 5 |

## 知识来源

**一手学术/工程源头**（每课「源头论文/权威资料」层）：arXiv 原始论文（Vaswani、InstructGPT、Kaplan、Chinchilla、ReAct、RAG、MemGPT、GAIA 等 67 篇，全部验证可访问）、Anthropic/OpenAI 官方工程文、Jay Alammar 图解、Lilian Weng 博客、Stanford CS229/CS224N/CS336、Karpathy 与 3Blue1Brown 讲座等。

**动手实践层**（每课「动手实践」卡片，43 条深链全部验证）：

- [buynao/aipath](https://github.com/buynao/aipath) —— 零数学 AI 通识课（本站设计语言来源）
- [shareAI-lab/learn-claude-code](https://github.com/shareAI-lab/learn-claude-code) —— Claude Code 17 章机制拆解
- [microsoft/generative-ai-for-beginners](https://github.com/microsoft/generative-ai-for-beginners) —— 21 课生成式 AI 全景
- [datawhalechina/llm-universe](https://github.com/datawhalechina/llm-universe) —— Datawhale 中文 RAG 实战
- [huggingface/agents-course](https://huggingface.co/learn/agents-course) —— HF Agents 认证课
- [karpathy/nn-zero-to-hero](https://github.com/karpathy/nn-zero-to-hero) —— 神经网络从零实现（选修支线）
- [WenyuChiou/awesome-agentic-ai-zh](https://github.com/WenyuChiou/awesome-agentic-ai-zh) —— Agent 中文路线图

所有课程正文为本站原创提炼撰写并附来源链接；设计 token 与布局模式参考 aipath 的设计语言（该仓库无 LICENSE，未复制其文案与代码）。

## 项目结构

```
src/
├── data/curriculum.js      # 单一数据源：4 阶段 → 8 章 → 34 课 + 开源实践匹配
├── content/stage1~4.js     # 34 课溯源式正文（concepts/deepDive/videos/papers/readings/pmLens/…）
├── components/             # TopBar · Sidebar · TocModal · HomePage · LessonPage · LessonBlocks · icons
├── progress.js             # localStorage 学习进度（完成集 → 顶栏 n/34）
├── styles/                 # design.css（token）· layout.css · lesson.css
└── main.jsx · App.jsx      # hash 路由：#/ 地图页 · #/lesson/1.1.1 课程页
```

## 功能

- **知识地图页**：STAGE 卡片 + 章分组课程网格，「开始第一课」智能跳转第一个未完成课
- **左侧课程目录**：三级折叠树，当前课高亮，每课进度圈，窄屏收为抽屉
- **课程页**：学习路径条（可点击跳转）→ 6 层内容 → 误区/练习 → 标记完成 → 上下课导航
- **进度追踪**：localStorage 持久化，顶栏 `n / 34`，目录弹层快速跳转
- **深色模式**：跟随系统 + 手动切换；**响应式**：移动端抽屉与安全边距

## 维护指南

- **加课 / 改结构**：改 `src/data/curriculum.js`（元数据 + 实践来源）与对应 `content/stageN.js`（正文各层），界面自动更新；新区块渲染向后兼容（字段缺省不渲染）
- **改设计**：所有颜色、圆角、字体在 `styles/design.css` 的 `:root` / `[data-theme="dark"]` token 中
- **视觉回归**：`python .shots/capture.py` 重截 11 个关键视图（需 playwright，dev server 跑在 5175 或改脚本 BASE）
- **链接巡检**：`node --input-type=module` 导出 `content/index.js` 的 papers/videos/readings URL 后批量 curl 校验
