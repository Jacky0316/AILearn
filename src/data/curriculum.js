// AILearn · AI 知识学习地图 —— 单一数据源
// 结构：4 阶段 → 8 章 → 34 课；每课内置 sources[] 实现开源项目知识的自动匹配。

export const repos = {
  aipath: {
    key: 'aipath',
    name: 'buynao/aipath',
    desc: '零数学 AI 通识课（37 课），本站设计语言来源',
    url: 'https://github.com/buynao/aipath',
    site: 'https://aipath.buynao.com',
  },
  cloner: {
    key: 'cloner',
    name: 'JCodesMore/ai-website-cloner-template',
    desc: '设计系统克隆方法论，本站界面工程参考',
    url: 'https://github.com/JCodesMore/ai-website-cloner-template',
  },
  claudeCode: {
    key: 'claudeCode',
    name: 'shareAI-lab/learn-claude-code',
    desc: 'Claude Code 内核 17 章机制拆解（Harness 工程学）',
    url: 'https://github.com/shareAI-lab/learn-claude-code',
  },
  genai: {
    key: 'genai',
    name: 'microsoft/generative-ai-for-beginners',
    desc: '微软 21 课生成式 AI 全景入门',
    url: 'https://github.com/microsoft/generative-ai-for-beginners',
  },
  llmu: {
    key: 'llmu',
    name: 'datawhalechina/llm-universe',
    desc: 'Datawhale 中文 LLM 应用开发课（RAG 主线）',
    url: 'https://github.com/datawhalechina/llm-universe',
  },
  agents: {
    key: 'agents',
    name: 'huggingface/agents-course',
    desc: 'Hugging Face Agents 认证课程',
    url: 'https://github.com/huggingface/agents-course',
    site: 'https://huggingface.co/learn/agents-course',
  },
  nnzero: {
    key: 'nnzero',
    name: 'karpathy/nn-zero-to-hero',
    desc: '神经网络从零实现（原理选修支线）',
    url: 'https://github.com/karpathy/nn-zero-to-hero',
  },
  agentic: {
    key: 'agentic',
    name: 'WenyuChiou/awesome-agentic-ai-zh',
    desc: 'Agent 中文学习路线图（Stage / Track 双轨）',
    url: 'https://github.com/WenyuChiou/awesome-agentic-ai-zh',
  },
}

const G = 'https://github.com/microsoft/generative-ai-for-beginners/tree/main'
const L = (c) => `https://github.com/datawhalechina/llm-universe/tree/main/docs/${c}`
const CC = (s) => `https://github.com/shareAI-lab/learn-claude-code/tree/main/${s}`
const HF = (p) => `https://huggingface.co/learn/agents-course/${p}`
const NZ = 'https://github.com/karpathy/nn-zero-to-hero/tree/master/lectures'
const AP = 'https://aipath.buynao.com'
const AG = 'https://github.com/WenyuChiou/awesome-agentic-ai-zh'

// tags: sky=延伸阅读 terracotta=核心难点 amber=易混淆 sage=动手实战
export const stages = [
  {
    id: '1',
    num: 'STAGE 01',
    title: 'AI 系统地图',
    meta: '10-12 小时 · 4 章 18 课 · AI Agent 系统拆解卡',
    desc: '面向零基础的学习者：先建立 AI、机器学习、深度学习与 LLM 的系统地图，看清「训练 → 生成 → 应用」的全景，再进入后面的工程阶段。',
    chapters: [
      {
        id: '1.1',
        title: '模型诞生',
        goal: '理解机器怎么从数据中「学」出模型，以及大模型的三段式炼成流程。',
        lessons: [
          {
            id: '1.1.1', title: '模型的训练过程', minutes: 20, level: '入门',
            summary: '从「写规则」到「喂数据」：参数、损失函数与梯度下降如何让机器自己学出规律。',
            tags: [{ label: '核心概念', tone: 'sky' }],
            sources: [
              { repo: 'aipath', ref: 'L02 机器是怎么学习的 · L04 训练就是下山', url: AP },
              { repo: 'genai', ref: 'Lesson 01 · Introduction to Generative AI and LLMs', url: `${G}/01-introduction-to-genai` },
              { repo: 'nnzero', ref: '选修 · micrograd：手写反向传播', url: NZ },
            ],
          },
          {
            id: '1.1.2', title: '三种训练范式', minutes: 18, level: '入门',
            summary: '监督学习、无监督学习与强化学习的分工：各自解决什么问题，为何 LLM 三者都用。',
            tags: [{ label: '易混淆', tone: 'amber' }],
            sources: [
              { repo: 'aipath', ref: 'L01 三个圈的关系 · L02 从写规则到喂数据', url: AP },
              { repo: 'genai', ref: 'Lesson 01 · Introduction to Generative AI and LLMs', url: `${G}/01-introduction-to-genai` },
              { repo: 'llmu', ref: '第 1 章 · 大模型简介', url: L('C1') },
            ],
          },
          {
            id: '1.1.3', title: 'Pretraining、SFT 和 RLHF', minutes: 25, level: '基础',
            summary: '大模型三段式炼成：预训练学语言，SFT 学会对话格式，RLHF 对齐人类偏好。',
            tags: [{ label: '核心难点', tone: 'terracotta' }],
            sources: [
              { repo: 'aipath', ref: 'L12 预训练 · L13 从 GPT 到 ChatGPT', url: AP },
              { repo: 'genai', ref: 'Lesson 18 · Fine-Tuning LLMs', url: `${G}/18-fine-tuning` },
              { repo: 'llmu', ref: '第 1 章 · 大模型简介', url: L('C1') },
            ],
          },
          {
            id: '1.1.4', title: '强化学习的现实意义', minutes: 20, level: '基础',
            summary: '为什么对齐要靠强化学习：奖励模型、策略优化，以及 RL 在 Agent 时代的回归。',
            tags: [{ label: '延伸阅读', tone: 'sky' }],
            sources: [
              { repo: 'aipath', ref: 'L13 从 GPT 到 ChatGPT：SFT 与 RLHF', url: AP },
              { repo: 'genai', ref: 'Lesson 03 · Using Generative AI Responsibly', url: `${G}/03-using-generative-ai-responsibly` },
              { repo: 'agents', ref: 'Unit 1 · What are LLMs?', url: HF('unit1/what-are-llms') },
            ],
          },
          {
            id: '1.1.5', title: 'Scaling Laws 与涌现', minutes: 20, level: '基础',
            summary: '算力、数据与参数的幂律关系；规模跨越阈值后的能力涌现，以及它的边界。',
            tags: [{ label: '核心难点', tone: 'terracotta' }],
            sources: [
              { repo: 'aipath', ref: 'L15 Scaling Laws 与涌现：大力出奇迹', url: AP },
              { repo: 'genai', ref: 'Lesson 02 · Exploring and comparing different LLMs', url: `${G}/02-exploring-and-comparing-different-llms` },
              { repo: 'llmu', ref: '第 1 章 · 大模型简介', url: L('C1') },
            ],
          },
        ],
      },
      {
        id: '1.2',
        title: '问答原理',
        goal: '拆开 LLM 回答一个问题的完整链路：分词 → 向量 → 注意力 → 概率输出。',
        lessons: [
          {
            id: '1.2.1', title: 'Token 分词机制', minutes: 19, level: '入门',
            summary: 'BPE 与子词切分：token 如何决定模型的输入输出、上下文长度与计费方式。',
            tags: [{ label: '核心概念', tone: 'sky' }],
            sources: [
              { repo: 'aipath', ref: 'L11 Token：大模型眼中的世界', url: AP },
              { repo: 'nnzero', ref: '选修 · Let\'s build the GPT Tokenizer', url: NZ },
              { repo: 'agents', ref: 'Unit 1 · Messages and Special Tokens', url: HF('unit1/messages-and-special-tokens') },
            ],
          },
          {
            id: '1.2.2', title: 'Embedding 语义向量', minutes: 22, level: '基础',
            summary: '把语义变成几何：词与句的向量表示，距离与方向如何刻画「意思相近」。',
            tags: [{ label: '核心概念', tone: 'sky' }],
            sources: [
              { repo: 'aipath', ref: 'L08 词变成数字：Embedding 与向量空间', url: AP },
              { repo: 'genai', ref: 'Lesson 08 · Building Search Apps: Vector Databases', url: `${G}/08-building-search-applications` },
              { repo: 'llmu', ref: '第 3 章 · 搭建知识库（词向量）', url: L('C3') },
            ],
          },
          {
            id: '1.2.3', title: 'Transformer 注意力机制', minutes: 28, level: '进阶',
            summary: 'QKV 自注意力让模型学会「划重点」；多头与位置编码如何支撑长文本理解。',
            tags: [{ label: '核心难点', tone: 'terracotta' }],
            sources: [
              { repo: 'aipath', ref: 'L09 注意力机制 · L10 Transformer 架构', url: AP },
              { repo: 'nnzero', ref: '选修 · Let\'s build GPT：从零写 Transformer', url: NZ },
              { repo: 'genai', ref: 'Lesson 01 · Introduction to Generative AI and LLMs', url: `${G}/01-introduction-to-genai` },
            ],
          },
          {
            id: '1.2.4', title: 'Softmax 输出层', minutes: 16, level: '基础',
            summary: '从 logits 到概率分布；温度与 top-p 采样如何控制回答的确定性与创造性。',
            tags: [{ label: '易混淆', tone: 'amber' }],
            sources: [
              { repo: 'aipath', ref: 'L14 温度与采样：AI 为什么每次回答不一样', url: AP },
              { repo: 'genai', ref: 'Lesson 02 · Exploring and comparing different LLMs', url: `${G}/02-exploring-and-comparing-different-llms` },
              { repo: 'llmu', ref: '第 2 章 · 使用 LLM API（采样参数）', url: L('C2') },
            ],
          },
        ],
      },
      {
        id: '1.3',
        title: '发展路线',
        goal: '看清从 Prompt 到 Agent 的四层工程演进：提示 → 上下文 → 骨架 → 循环。',
        lessons: [
          {
            id: '1.3.1', title: 'Prompt Engineering', minutes: 22, level: '入门',
            summary: '指令、上下文、角色与输出约束的工程化写法：让模型的输出稳定可控。',
            tags: [{ label: '动手实战', tone: 'sage' }],
            sources: [
              { repo: 'genai', ref: 'Lesson 04 · Prompt Engineering Fundamentals', url: `${G}/04-prompt-engineering-fundamentals` },
              { repo: 'llmu', ref: '第 2 章 · Prompt Engineering', url: L('C2') },
              { repo: 'agentic', ref: 'Stage 2 · Prompt 设计', url: AG },
            ],
          },
          {
            id: '1.3.2', title: 'Context Engineering', minutes: 20, level: '基础',
            summary: '上下文窗口是稀缺资源：该放什么、怎么排序、何时压缩与隔离。',
            tags: [{ label: '核心难点', tone: 'terracotta' }],
            sources: [
              { repo: 'aipath', ref: 'L17 上下文窗口：AI 的工作记忆', url: AP },
              { repo: 'claudeCode', ref: 's08 · Context Compact 上下文压缩', url: CC('s08_context_compact') },
              { repo: 'genai', ref: 'Lesson 05 · Creating Advanced Prompts', url: `${G}/05-advanced-prompts` },
            ],
          },
          {
            id: '1.3.3', title: 'Harness Engineering', minutes: 24, level: '进阶',
            summary: 'Agent = 模型 + 骨架：工具、权限、钩子与技能加载等工程化外壳的设计。',
            tags: [{ label: '核心难点', tone: 'terracotta' }],
            sources: [
              { repo: 'claudeCode', ref: 's03 权限 · s04 钩子 · s15 集成骨架', url: CC('s15_integrated_harness') },
              { repo: 'agentic', ref: 'Track B · Stage 5 Claude Code 生态', url: AG },
              { repo: 'aipath', ref: 'L24 MCP 与 AI 工程生态', url: AP },
            ],
          },
          {
            id: '1.3.4', title: 'Loop Engineering', minutes: 22, level: '基础',
            summary: '从单次调用到 Thought → Action → Observation 循环：规划、重试与终止条件。',
            tags: [{ label: '核心概念', tone: 'sky' }],
            sources: [
              { repo: 'claudeCode', ref: 's01 · Agent Loop 代理循环', url: CC('s01_agent_loop') },
              { repo: 'agents', ref: 'Unit 1 · Thought-Action-Observation 循环', url: HF('unit1/agent-steps-and-structure') },
              { repo: 'genai', ref: 'Lesson 17 · AI Agents', url: `${G}/17-ai-agents` },
            ],
          },
          {
            id: '1.3.5', title: '泛化与边界 · AGI', minutes: 18, level: '基础',
            summary: '泛化能力的来源，幻觉与推理的边界；通往 AGI 路线上的主要争论。',
            tags: [{ label: '延伸阅读', tone: 'sky' }],
            sources: [
              { repo: 'aipath', ref: 'L15 Scaling Laws · L23 推理模型与慢思考', url: AP },
              { repo: 'genai', ref: 'Lesson 01 · Introduction to Generative AI and LLMs', url: `${G}/01-introduction-to-genai` },
              { repo: 'agentic', ref: '核心名词表 · Glossary', url: AG },
            ],
          },
        ],
      },
      {
        id: '1.4',
        title: '应用前沿',
        goal: '掌握 RAG、多模态、MCP 生态与评估安全四大应用支柱。',
        lessons: [
          {
            id: '1.4.1', title: 'RAG 的搭法与应用', minutes: 22, level: '基础',
            summary: '检索增强生成全景：外挂知识库的完整链路、典型场景与「为什么需要 RAG」。',
            tags: [{ label: '核心概念', tone: 'sky' }],
            sources: [
              { repo: 'llmu', ref: '第 3 章 搭建知识库 · 第 4 章 构建 RAG 应用', url: L('C4') },
              { repo: 'genai', ref: 'Lesson 15 · RAG and Vector Databases', url: `${G}/15-rag-and-vector-databases` },
              { repo: 'aipath', ref: 'L18 RAG：给 AI 外挂知识库', url: AP },
            ],
          },
          {
            id: '1.4.2', title: '多模态：AI 看懂图文', minutes: 19, level: '基础',
            summary: '图文对齐与视觉语言模型的工作方式；文生图扩散模型的去噪直觉。',
            tags: [{ label: '延伸阅读', tone: 'sky' }],
            sources: [
              { repo: 'aipath', ref: 'L21 文生图 · L22 多模态', url: AP },
              { repo: 'genai', ref: 'Lesson 09 · Building Image Generation Applications', url: `${G}/09-building-image-applications` },
            ],
          },
          {
            id: '1.4.3', title: 'API、MCP 与 AI 工程生态', minutes: 18, level: '基础',
            summary: '从各家模型 API 到 MCP 协议：模型、工具与数据之间标准化连接的方式。',
            tags: [{ label: '核心概念', tone: 'sky' }],
            sources: [
              { repo: 'claudeCode', ref: 's14 · MCP Plugin 工具发现与命名空间', url: CC('s14_mcp_plugin') },
              { repo: 'aipath', ref: 'L24 MCP 与 AI 工程生态', url: AP },
              { repo: 'genai', ref: 'Lesson 11 · Integrating with Function Calling', url: `${G}/11-integrating-with-function-calling` },
            ],
          },
          {
            id: '1.4.4', title: 'AI 的评估与安全', minutes: 20, level: '基础',
            summary: '评测集与红队测试、负责任的 AI：效果、风险与合规的工程化处理。',
            tags: [{ label: '动手实战', tone: 'sage' }],
            sources: [
              { repo: 'genai', ref: 'Lesson 03 负责任 AI · Lesson 13 安全防护', url: `${G}/13-securing-ai-applications` },
              { repo: 'llmu', ref: '第 5 章 · 系统评估与优化', url: L('C5') },
              { repo: 'agents', ref: 'Bonus Unit 2 · Observability and Evaluation', url: HF('bonus-unit2/introduction') },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '2',
    num: 'STAGE 02',
    title: '编程与工程基础',
    meta: '4-5 小时 · 2 章 6 课 · 动手实战起点',
    desc: '动手阶段的第一步：搭好环境、跑通 API、写好 Prompt，并用 Function Calling 构建第一个真正的 AI 应用。',
    chapters: [
      {
        id: '2.1',
        title: '开发环境与 API',
        goal: '搭好开发环境，跑通第一次 LLM API 调用，并学会在闭源、开源与本地模型之间选型。',
        lessons: [
          {
            id: '2.1.1', title: '环境搭建与密钥管理', minutes: 15, level: '入门',
            summary: 'Python / Node 环境与 SDK 安装；API Key 的存放、轮换与防泄漏实践。',
            tags: [{ label: '动手实战', tone: 'sage' }],
            sources: [
              { repo: 'genai', ref: 'Lesson 00 · Course Setup', url: `${G}/00-course-setup` },
              { repo: 'llmu', ref: '第 1 章 · 环境配置', url: L('C1') },
            ],
          },
          {
            id: '2.1.2', title: '第一次调用 LLM API', minutes: 20, level: '入门',
            summary: 'Chat Completions 参数全解：model、messages、temperature、max_tokens 与流式输出。',
            tags: [{ label: '动手实战', tone: 'sage' }],
            sources: [
              { repo: 'llmu', ref: '第 2 章 · 使用 LLM 的 API 开发应用', url: L('C2') },
              { repo: 'genai', ref: 'Lesson 06 · Building Text Generation Applications', url: `${G}/06-text-generation-apps` },
              { repo: 'aipath', ref: 'L26 第一次调用 API：30 行代码的聊天机器人', url: AP },
            ],
          },
          {
            id: '2.1.3', title: '模型选型：闭源、开源与本地部署', minutes: 20, level: '基础',
            summary: 'GPT / Claude / GLM 的能力与成本对比；Hugging Face 开源模型与 Ollama 本地化方案。',
            tags: [{ label: '延伸阅读', tone: 'sky' }],
            sources: [
              { repo: 'genai', ref: 'Lesson 02 选型 · Lesson 16 开源模型 · Lesson 19 SLM', url: `${G}/16-open-source-models` },
              { repo: 'aipath', ref: 'L25 开源与闭源 · L27 本地跑大模型 Ollama', url: AP },
              { repo: 'llmu', ref: '第 1 章 · 大模型简介', url: L('C1') },
            ],
          },
        ],
      },
      {
        id: '2.2',
        title: 'Prompt 与应用构建',
        goal: '从写好一条 Prompt，到构建带工具调用能力的完整聊天应用。',
        lessons: [
          {
            id: '2.2.1', title: 'Prompt 工程基础', minutes: 20, level: '入门',
            summary: '零样本与少样本、角色设定、分隔符与输出格式约束的实战写法与反模式。',
            tags: [{ label: '动手实战', tone: 'sage' }],
            sources: [
              { repo: 'genai', ref: 'Lesson 04 · Prompt Engineering Fundamentals', url: `${G}/04-prompt-engineering-fundamentals` },
              { repo: 'llmu', ref: '第 2 章 · Prompt Engineering', url: L('C2') },
              { repo: 'agentic', ref: 'Stage 2 · Zero-Shot / Few-Shot / CoT', url: AG },
            ],
          },
          {
            id: '2.2.2', title: '高级模式：Few-Shot、CoT 与结构化输出', minutes: 22, level: '基础',
            summary: '思维链与自洽性采样；用 JSON Schema 约束输出，加上校验与重试策略。',
            tags: [{ label: '核心难点', tone: 'terracotta' }],
            sources: [
              { repo: 'genai', ref: 'Lesson 05 · Creating Advanced Prompts', url: `${G}/05-advanced-prompts` },
              { repo: 'genai', ref: 'Lesson 11 · Integrating with Function Calling', url: `${G}/11-integrating-with-function-calling` },
              { repo: 'agents', ref: 'Unit 1 · What are Tools?', url: HF('unit1/tools') },
            ],
          },
          {
            id: '2.2.3', title: 'Function Calling 与聊天应用', minutes: 25, level: '基础',
            summary: '函数调用协议、多轮会话状态管理与流式 UX：实现一个能查数据、调工具的聊天应用。',
            tags: [{ label: '动手实战', tone: 'sage' }],
            sources: [
              { repo: 'genai', ref: 'Lesson 07 聊天应用 · Lesson 11 Function Calling · Lesson 12 AI UX', url: `${G}/07-building-chat-applications` },
              { repo: 'llmu', ref: '第 2 章 · API 封装与实践', url: L('C2') },
              { repo: 'aipath', ref: 'L19 Function Calling：AI 长出双手', url: AP },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '3',
    num: 'STAGE 03',
    title: 'RAG 与知识库',
    meta: '4-5 小时 · 2 章 5 课 · RAG 实战三部曲',
    desc: '以 Datawhale《LLM Universe》为主线，从文档处理到向量检索再到评估优化，完整搭一个可用的私人知识库。',
    chapters: [
      {
        id: '3.1',
        title: '搭建知识库',
        goal: '从原始文档出发，搭出一个可检索、可问答的向量知识库。',
        lessons: [
          {
            id: '3.1.1', title: '文档处理与切片', minutes: 20, level: '基础',
            summary: 'PDF / Markdown / 网页的内容抽取与清洗；固定长度、递归与语义分块的取舍。',
            tags: [{ label: '动手实战', tone: 'sage' }],
            sources: [
              { repo: 'llmu', ref: '第 3 章 · 数据处理（读取 / 清洗 / 切片）', url: L('C3') },
              { repo: 'genai', ref: 'Lesson 15 · RAG and Vector Databases', url: `${G}/15-rag-and-vector-databases` },
              { repo: 'aipath', ref: 'RAG 进阶② · 切得好，量得出', url: AP },
            ],
          },
          {
            id: '3.1.2', title: 'Embedding 与向量数据库', minutes: 22, level: '基础',
            summary: 'Embedding 模型选型与入库：相似度度量、索引结构与主流向量数据库对比。',
            tags: [{ label: '核心概念', tone: 'sky' }],
            sources: [
              { repo: 'llmu', ref: '第 3 章 · 搭建并使用向量数据库', url: L('C3') },
              { repo: 'genai', ref: 'Lesson 08 · Vector Databases', url: `${G}/08-building-search-applications` },
              { repo: 'aipath', ref: 'L18 RAG：给 AI 外挂知识库', url: AP },
            ],
          },
          {
            id: '3.1.3', title: '检索问答链与应用部署', minutes: 25, level: '基础',
            summary: '用 LangChain 串联检索与生成，配 Streamlit 部署：一个完整可用的知识库问答助手。',
            tags: [{ label: '动手实战', tone: 'sage' }],
            sources: [
              { repo: 'llmu', ref: '第 4 章 · 构建 RAG 应用 + Streamlit 部署', url: L('C4') },
              { repo: 'llmu', ref: '第 6 章 · 精选案例：个人知识库助手', url: L('C6') },
              { repo: 'aipath', ref: 'L28 实战 RAG：搭建你的私人知识库', url: AP },
            ],
          },
        ],
      },
      {
        id: '3.2',
        title: '评估与优化',
        goal: '让 RAG 从「能用」走向「可靠」：建立评估体系，逐环节优化。',
        lessons: [
          {
            id: '3.2.1', title: 'RAG 系统评估方法', minutes: 20, level: '进阶',
            summary: '检索命中率、忠实度与答案相关性：构建评估集，用自动化指标替代「感觉变好了」。',
            tags: [{ label: '核心难点', tone: 'terracotta' }],
            sources: [
              { repo: 'llmu', ref: '第 5 章 · 系统评估与优化', url: L('C5') },
              { repo: 'aipath', ref: 'RAG 进阶① · 为什么查不准，怎么查准', url: AP },
              { repo: 'agents', ref: 'Bonus Unit 2 · Observability and Evaluation', url: HF('bonus-unit2/introduction') },
            ],
          },
          {
            id: '3.2.2', title: '检索与生成优化策略', minutes: 22, level: '进阶',
            summary: '混合检索与重排序、query 改写、上下文压缩与引用溯源的逐环节优化。',
            tags: [{ label: '核心难点', tone: 'terracotta' }],
            sources: [
              { repo: 'llmu', ref: '第 5 章 · 评估并优化检索 / 生成部分', url: L('C5') },
              { repo: 'aipath', ref: 'RAG 进阶①②③ 三部曲', url: AP },
              { repo: 'genai', ref: 'Lesson 14 · The Generative AI Application Lifecycle', url: `${G}/14-the-generative-ai-application-lifecycle` },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '4',
    num: 'STAGE 04',
    title: 'Agent 工程',
    meta: '5-6 小时 · 2 章 5 课 · Harness 工程实战',
    desc: '以 learn-claude-code 与 HF Agents Course 为蓝本，亲手实现 Agent Loop、工具权限、记忆压缩，走向生产级 Agent。',
    chapters: [
      {
        id: '4.1',
        title: 'Agent 核心机制',
        goal: '亲手实现 Agent 的循环、工具与记忆三大核心机制，理解「智能体」的骨架。',
        lessons: [
          {
            id: '4.1.1', title: 'Agent Loop 与 ReAct', minutes: 25, level: '进阶',
            summary: '实现最小 Agent：messages + while 循环；Thought → Action → Observation 与「代码即动作」。',
            tags: [{ label: '核心难点', tone: 'terracotta' }],
            sources: [
              { repo: 'claudeCode', ref: 's01 · Agent Loop 代理循环', url: CC('s01_agent_loop') },
              { repo: 'agents', ref: 'Unit 1 · ReAct 与第一个 smolagents Agent', url: HF('unit1/tutorial') },
              { repo: 'genai', ref: 'Lesson 17 · AI Agents', url: `${G}/17-ai-agents` },
            ],
          },
          {
            id: '4.1.2', title: '工具调用与权限系统', minutes: 24, level: '进阶',
            summary: '工具分发表与并发执行；PermissionRule 审批管道，危险操作如何被拦截与放行。',
            tags: [{ label: '核心难点', tone: 'terracotta' }],
            sources: [
              { repo: 'claudeCode', ref: 's02 工具使用 · s03 权限系统 · s04 钩子', url: CC('s03_permission') },
              { repo: 'agents', ref: 'Unit 1 · What are Tools?', url: HF('unit1/tools') },
              { repo: 'agentic', ref: 'Track B · Stage 3 工具使用与 Agent Loop', url: AG },
            ],
          },
          {
            id: '4.1.3', title: '上下文压缩与记忆系统', minutes: 25, level: '进阶',
            summary: '工具结果预算与 snip / micro / history 三级压缩；短期记忆与长期记忆的提取与巩固。',
            tags: [{ label: '核心难点', tone: 'terracotta' }],
            sources: [
              { repo: 'claudeCode', ref: 's08 上下文压缩 · s09 记忆系统', url: CC('s09_memory') },
              { repo: 'agentic', ref: 'Track B · Stage 6 Memory 与 RAG', url: AG },
              { repo: 'aipath', ref: 'L17 上下文窗口：AI 的工作记忆', url: AP },
            ],
          },
        ],
      },
      {
        id: '4.2',
        title: '生产级 Agent',
        goal: '让 Agent 从 demo 走向生产：多代理协作、任务编排与可观测的自动化评估。',
        lessons: [
          {
            id: '4.2.1', title: '多 Agent 协作与工作流', minutes: 25, level: '进阶',
            summary: '子代理的上下文隔离、任务分解与认领；用 LangGraph / LlamaIndex 编排 Agent 工作流。',
            tags: [{ label: '动手实战', tone: 'sage' }],
            sources: [
              { repo: 'claudeCode', ref: 's06 子代理 · s13 代理团队 · s16 工作流运行时', url: CC('s13_agent_teams') },
              { repo: 'agents', ref: 'Unit 2 · smolagents / LlamaIndex / LangGraph', url: HF('unit2/introduction') },
              { repo: 'agents', ref: 'Unit 3 · Agentic RAG 用例实战', url: HF('unit3/agentic-rag/introduction') },
            ],
          },
          {
            id: '4.2.2', title: 'Observability 与 Evaluation', minutes: 22, level: '进阶',
            summary: '追踪与监控、基准测试（GAIA）与自动化评估：Agent 上线前的最后一道验收。',
            tags: [{ label: '动手实战', tone: 'sage' }],
            sources: [
              { repo: 'agents', ref: 'Bonus Unit 2 · Observability · Unit 4 GAIA 期末', url: HF('unit4/introduction') },
              { repo: 'genai', ref: 'Lesson 14 · The Generative AI Application Lifecycle', url: `${G}/14-the-generative-ai-application-lifecycle` },
              { repo: 'claudeCode', ref: 's17 · Goal Loop 目标门控与自动续跑', url: CC('s17_goal_loop') },
            ],
          },
        ],
      },
    ],
  },
]

// 扁平化课程列表（学习顺序 = 定义顺序）
export const flatLessons = stages.flatMap((s) =>
  s.chapters.flatMap((c) => c.lessons.map((l) => ({ ...l, stageId: s.id, stageNum: s.num, stageTitle: s.title, chapterId: c.id, chapterTitle: c.title })))
)

export const totalLessons = flatLessons.length

export function getLesson(id) {
  return flatLessons.find((l) => l.id === id)
}

export function lessonIndex(id) {
  return flatLessons.findIndex((l) => l.id === id)
}
