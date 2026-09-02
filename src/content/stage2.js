// STAGE 02 · 编程与工程基础 —— 6 课正文（溯源式深读版）
export default {
  '2.1.1': {
    goals: [
      '搭好一套可运行的 LLM 开发环境（Python 或 Node）',
      '掌握 API Key 的安全存放、加载与防泄漏规范',
      '理解「配置与代码分离」的工程原则',
    ],
    concepts: [
      {
        t: '最小环境清单',
        body: [
          'Python 路线：3.10+、官方 SDK、httpx 或 requests。Node 路线：LTS 版本 + 厂商官方 SDK。两条路都建议从「裸调用」开始，熟悉后再引入 LangChain 这类编排框架——先理解地基，再上脚手架。',
        ],
      },
      {
        t: 'API Key 安全：三条铁律',
        body: [
          '永远不硬编码：Key 只放环境变量或 .env，且 .env 必须进 .gitignore——仓库泄 Key 是新手最常见也最昂贵的事故（扫描机器人分钟级捡走你的 Key 去刷接口）。按项目隔离多 Key，便于吊销与核算。厂商控制台配用量告警，它是失控时的最后一道闸。',
        ],
      },
    ],
    deepDive: [
      {
        t: '十二要素应用：配置即环境',
        body: [
          '「密钥与代码分离」不是经验主义，而是云时代的工程宪法——《The Twelve-Factor App》的 Config 原则：应用应在所有部署环境（开发/测试/生产）间完全一致，变化的只有配置；配置通过环境变量在启动时注入，而非写死在代码或配置文件仓库里。',
          { formula: '代码（提交到 git）+ 配置（环境注入）= 一次构建、多环境部署' },
          '落到实践三件事：① .env 存真实值且 gitignore；② .env.example 提交仓库作为配置说明书（只有键名没有值）；③ 代码里用 config 加载层统一读取，禁止散落各处的 os.getenv。这三件事让「新人第一天安全上手」成为可能。',
        ],
      },
      {
        t: 'Key 泄漏的完整攻击面',
        body: [
          '泄 Key 的通道远不止「提交到 git」：CI/CD 日志回显、异常堆栈里的请求头、前端代码打包、聊天记录里贴的截图、离职员工本地的旧副本。防御是分层的：最小权限（每个环境独立 Key）+ 快速吊销（发现即作废）+ 用量告警（异常消费几分钟内发现）+ 定期轮换。',
          '一个值得养成的习惯：把「搜索仓库里的 sk- 前缀字符串」纳入 CI 检查（开源生态有现成的 secret scanning 工具）。Key 泄漏的代价不是理论风险——按 token 计费的账单是真的会爆炸的。',
        ],
      },
    ],
    readings: [
      { title: 'Quickstart（快速开始）', author: 'OpenAI 官方文档', url: 'https://platform.openai.com/docs/quickstart', why: '官方第一步：注册、生成 API Key、发出首个请求的权威入口。' },
      { title: 'Get started with Claude（官方 Quickstart）', author: 'Anthropic 官方文档', url: 'https://platform.claude.com/docs/en/get-started', why: '从获取 Key 到首个 API 调用的完整官方路径。' },
      { title: 'The Twelve-Factor App · Config（配置）', author: 'Adam Wiggins / 12factor.net（官方中文版）', url: 'https://12factor.net/zh_cn/config', why: '「密钥与代码分离」的原则源头，云原生配置管理的宪法条文。' },
    ],
    mistakes: [
      {
        wrong: '把 Key 写在代码里，反正是私有仓库，不会泄。',
        right: '私有仓库会被协作者、CI 日志、截图分享暴露；且仓库转公开的瞬间就是事故现场。从第一天就用环境变量，形成肌肉记忆。',
      },
      {
        wrong: '所有项目共用一个 Key，方便管理。',
        right: '单 Key 意味着无法按项目核算用量、无法单独吊销、一个项目泄漏全线遭殃。多 Key 隔离是成本核算与安全边界的基础设施。',
      },
    ],
    practice: {
      task: '完成环境搭建：创建项目目录，配置 .env 与 .gitignore，封装一个 chat(prompt) 函数并成功调用一次模型。验收：git 历史中搜不到 Key；换一台电脑凭 .env.example 能复原配置。',
      hint: '先在厂商控制台确认：Key 已创建、账户有额度、用量告警已开启。',
      answer: '验收清单：① git log -p 全量搜索确认 .env 未入库；② 新目录按 .env.example 复原配置后程序可跑；③ 调用最便宜模型成功打印回复（环境、网络、鉴权三通）。',
    },
    pmLens: [
      '密钥治理是产品安全的底线项：AI 产品的安全评审第一题永远是「Key 放哪里、谁能看到、泄漏了怎么办」。把本课的三铁律 + CI 扫描写进团队工程规范，是成本最低的安全投资。',
      '多 Key 隔离还是成本核算的骨架：按功能/环境/客户分 Key，才能回答「这个功能每月烧多少 token」——没有这层数据，AI 功能的定价与毛利分析都是盲人摸象。',
    ],
  },

  '2.1.2': {
    goals: [
      '掌握 Chat Completions 的核心参数与 messages 协议',
      '实现流式输出的分片拼接与四类异常的统一处理',
      '理解「API 无状态」这一协议本质的全部推论',
    ],
    concepts: [
      {
        t: 'messages：对话的全部状态',
        body: [
          'API 是无状态的：所谓「多轮对话」，是你把历史消息每轮原样重发。messages 是数组，常见角色有 system（身份与规则）、user（用户输入）、assistant（模型历史回复）、tool（工具结果）。上下文管理完全由你控制——裁剪、摘要、压缩都是对这个数组的操作。',
        ],
      },
      {
        t: '五个必会参数',
        body: [
          'model（写配置别硬编码）、temperature（采样锐度）、max_tokens（输出上限，截断时 finish_reason=length 而非报错）、stream（流式开关）、tools（工具声明，2.2.3 展开）。',
        ],
      },
    ],
    deepDive: [
      {
        t: '无状态协议的全部推论',
        body: [
          { formula: '第 N 轮请求的 messages = [system, u1, a1, u2, a2, …, uN]    （历史每轮全量重发）' },
          '三个直接推论：① 成本随轮次线性增长——第 20 轮的请求带着前 19 轮的全部 token 计费；② 「记忆」是客户端责任——服务端不保存任何对话，换设备丢历史是设计使然；③ 上下文工程有天然的干预点——重发前你可以对历史做任何变换（裁剪、摘要、注入），1.3.2 的所有技术都发生在这一步。',
        ],
      },
      {
        t: '流式输出：SSE 协议与体感工程',
        body: [
          'stream=true 时服务端以 SSE（Server-Sent Events）推送事件流：每个事件携带一个增量片段（delta），客户端按序拼接成完整回答。协议要点：事件可能包含空 delta（要判空）、以 finish_reason 事件结尾（区分正常结束与截断）、断线需自行重连并已收到部分需保留。',
          '体感数据：非流式要等全部生成完（数十秒级），流式首字延迟几百毫秒——对聊天类产品，流式不是优化项而是及格线。MDN 的 SSE 标准文档值得通读：它是所有 LLM 流式 API 的底层协议，也是你自己实现代理转发时的协议依据。',
        ],
      },
      {
        t: '四类异常的统一处理层',
        body: [
          '鉴权失败（401，Key 错/过期）→ 告警不重试；限流（429）→ 指数退避重试（1s/2s/4s）+ 尊重 Retry-After 头；内容审查 → 不重试，转人工话术；超时 → 设显式超时（连接 + 读取分开配）后重试。把四类异常封装进统一调用层，业务代码只关心成功路径——这是所有 AI 应用代码的地基模块。',
        ],
      },
    ],
    readings: [
      { title: 'Chat Completions API 参考', author: 'OpenAI 官方文档', url: 'https://platform.openai.com/docs/api-reference/chat', why: '行业事实标准的消息式补全接口权威定义，含 stream 参数与 finish_reason 语义。' },
      { title: 'Messages API 文档', author: 'Anthropic 官方文档', url: 'https://platform.claude.com/docs/en/api/messages', why: 'Claude 的消息接口官方文档，与 OpenAI 版对照读最能理解「协议趋同、细节各异」。' },
      { title: 'Server-Sent Events（SSE）', author: 'MDN Web Docs（中文）', url: 'https://developer.mozilla.org/zh-CN/docs/Web/API/Server-sent_events', why: 'LLM 流式输出底层协议的标准定义，自建代理/网关时的协议依据。' },
    ],
    mistakes: [
      {
        wrong: '每次调用都会带上之前的对话记忆。',
        right: 'API 完全无状态，「记忆」是你重发历史的结果。忘发上一轮模型就「失忆」——排查对话不连贯时，先打印完整 messages 看缺了什么。',
      },
      {
        wrong: 'max_tokens 设得越大越好。',
        right: '上限过大有隐患：跑偏时浪费成本、部分模型接近上限时行为异常。按任务合理设限，并检查 finish_reason 判断是否真被截断。',
      },
    ],
    practice: {
      task: '封装 stream_chat(messages)：流式分片拼接、429 指数退避、显式超时；用三个连续问题验证多轮上下文生效，并故意改错 Key 验证异常层报错清晰。',
      hint: '流式拼接注意：delta.content 可能为空，判空再追加；结束看 finish_reason。',
      answer: '验收点：① 首字出现明显早于非流式；② 错 Key 得到清晰的鉴权错误而非原始堆栈；③ 第三问追问「我上一个问题是什么」能答对（messages 历史组织正确）；④ 把 max_tokens 调到 10 观察 finish_reason=length 的截断行为。',
    },
    pmLens: [
      '接入层封装是 AI 应用的「护城河下方」：统一调用层隔离厂商差异 + 统一异常语义 + 成本埋点，这层做得好，换模型是改配置，做不好，每次厂商调价都是一次重构。技术评审时重点看这一层。',
      '流式与「生成中可中断」是体验的分水岭：竞品流式而你非流式，用户体感差距是数量级的。同时首字延迟（TTFT）应进核心指标看板——它是用户对「快不快」的真实感知来源。',
    ],
  },

  '2.1.3': {
    goals: [
      '掌握选型四维框架（能力/成本/速度/合规）与任务分级路由',
      '理解开源权重模型的战略意义与技术报告的读法',
      '能用总拥有成本（TCO）框架做 API vs 本地的决策',
    ],
    concepts: [
      {
        t: '选型四维框架',
        body: [
          '能力：看「你的任务上的表现」而非榜单——用自建评估集测（1.4.4）。成本：比性价比曲线而非单价，很多任务小模型就达标。速度：首 token 延迟决定交互体感，吞吐量决定批处理时长。合规：数据是否用于训练、部署地域、行业资质——企业选型常一票否决的一维。',
        ],
      },
      {
        t: '开源模型与本地部署',
        body: [
          '开源权重模型（Llama、Qwen、DeepSeek 系）的价值：数据不出域、可微调定制、无按量计费。代价：自运维推理服务、GPU 资源、能力略滞后旗舰。轻量入口是 Ollama：一条命令跑量化小模型（7B~14B 消费级显卡可用），适合开发测试与隐私敏感的轻场景。',
        ],
      },
    ],
    deepDive: [
      {
        t: '技术报告的读法：三份开源说明书',
        body: [
          'LLaMA（2023）开启开源权重浪潮——证明「Chinchilla 式足料训练」的中等模型可媲美更大的闭源模型；Qwen2.5 报告是中文生态最重要的模型说明书（多语言、代码、数学的基准矩阵）；DeepSeek-V3 报告则展示了 MoE（混合专家）架构 + 极致工程优化如何把训练成本压到闭源的一个零头。',
          '读技术报告的方法：① 先看模型卡片与架构图（参数量、上下文、MoE 专家数）；② 直奔基准表格但只看你业务相关的行；③ 找「训练数据配比」章节（1.1.5 的 20 token/参数法则在这里验货）；④ 安全评估章节决定它能不能进你的合规评审。四步 20 分钟，胜过看十篇二手解读。',
        ],
      },
      {
        t: '任务分级路由：省钱的工程学',
        body: [
          { formula: '总拥有成本 TCO = API 费用 + GPU 折旧/租用 + 运维人力 + 峰值扩容溢价 + 迁移改造成本' },
          '分级路由（L1 简单任务用小模型 / L2 常规用中档 / L3 攻坚用旗舰）通常能砍掉一半以上成本；进阶用瀑布式——便宜模型先跑，置信不足再升级。Artificial Analysis 这类第三方榜单提供「性能/速度/价格」的横评坐标，是分级设计的速查表。Chip Huyen 的生产化长文则是「API 还是自托管」决策框架的权威论述：结论通常是「低流量租 API，高流量 + 数据敏感 + 需定制才本地」。',
        ],
      },
    ],
    videos: [
      { title: 'Deep Dive into LLMs like ChatGPT', speaker: 'Andrej Karpathy', minutes: 211, lang: 'en', url: 'https://www.youtube.com/watch?v=7xTGNNLPyMI', why: '3.5 小时讲透模型如何炼成、开源权重生态与模型版图——选型决策前最好的背景课，可分段看。' },
    ],
    papers: [
      {
        title: 'LLaMA: Open and Efficient Foundation Language Models', authors: 'Touvron et al. (Meta AI)', year: 2023, venue: 'arXiv',
        url: 'https://arxiv.org/abs/2302.13971',
        why: '开源权重 LLM 浪潮的开端：7B~65B 全系放出的决定重塑了行业格局，「开源 vs 闭源」选型讨论的源头。',
        contributions: ['按 Chinchilla 最优配比训练的中等参数模型系列', '权重开放催生 llama.cpp、量化、微调的整条开源生态', '证明「数据质量与配比」可以部分替代参数规模'],
        pmLens: 'LLaMA 的发布是「开源权重」作为商业策略的起点：Meta 免费开放换来生态标准地位。理解这层动机，你才能预判各厂商开源策略的演变与你的蹭法。',
      },
      {
        title: 'Qwen2.5 Technical Report', authors: 'Qwen Team (阿里巴巴)', year: 2024, venue: 'arXiv 技术报告',
        url: 'https://arxiv.org/abs/2412.15115',
        why: '中文生态最重要开源模型系列的官方技术报告：多语言、代码、数学的基准矩阵与训练配方披露。',
        contributions: ['0.5B 到 72B 全尺寸谱系，覆盖端侧到云端', '中文基准上的系统性领先（中文产品的首选自托管底座之一）', '开源 Apache 2.0 系许可，商用友好的代表'],
        pmLens: '中文产品做本地化部署时，Qwen 系是默认候选。读它的基准表时只看你的业务维度（如客服对话、长文档），别被满屏 SOTA 迷眼。',
      },
      {
        title: 'DeepSeek-V3 Technical Report', authors: 'DeepSeek-AI', year: 2024, venue: 'arXiv 技术报告',
        url: 'https://arxiv.org/abs/2412.19437',
        why: '开源 MoE 模型以极低成本对齐闭源的标志性报告（557 万美元训练成本核算公开），行业成本曲线的改写者。',
        contributions: ['MoE（混合专家）架构的工程化细节：671B 总参 / 37B 激活', 'FP8 混合精度训练与通信优化的完整披露', '把「训练成本」从黑箱变成公开核算——冲击全行业定价预期'],
        pmLens: 'DeepSeek-V3 报告的最大产品含义：开源模型的成本曲线陡降，闭源 API 的溢价空间被持续压缩。做三年期产品规划时，「开源追赶速度」必须作为核心假设变量。',
      },
    ],
    readings: [
      { title: 'Ollama（本地部署事实标准）', author: 'Ollama (GitHub)', url: 'https://github.com/ollama/ollama', why: '一条命令本地跑开源模型的事实标准工具，README 即官方文档。' },
      { title: 'Artificial Analysis 模型榜单', author: 'Artificial Analysis（独立第三方）', url: 'https://artificialanalysis.ai', why: '性能/速度/价格三维横评的独立榜单，分级路由设计时的速查坐标系。' },
      { title: 'Building LLM applications for production', author: 'Chip Huyen', url: 'https://huyenchip.com/2023/04/11/llm-engineering.html', why: '「API 还是自托管、按什么标准选模型」的权威论述，选型决策框架的文献源头。' },
    ],
    mistakes: [
      {
        wrong: '选型就看排行榜，谁分高用谁。',
        right: '榜单有数据污染与任务错配问题，高分维度（推理竞赛）未必是你的维度（中文客服）。唯一可信的是「在你自己的评估集上的表现」。',
      },
      {
        wrong: '本地部署一定更省钱。',
        right: '本地省按量费，花 GPU 折旧、运维人力与峰值扩容困难。低流量场景租 API 几乎总是更便宜；高流量、数据敏感、需定制微调时本地才划算。算 TCO 再决定。',
      },
    ],
    practice: {
      task: '为你的一个真实任务写选型报告：定义任务、建 10 条测试用例，用两个档位的模型各跑一遍，对比质量/延迟/成本，并按 TCO 公式估算年成本。',
      hint: '成本按「完成整个任务」算；延迟记录首字与总时长两个口径。',
      answer: '常见发现：抽取/格式化类任务小模型已达 90%+ 正确率，旗舰的溢价买不到东西；多步推理差距显著。多数应用最终收敛为「分级路由」。选型报告的合格标准：有数据、有 TCO、有可回退方案。',
    },
    pmLens: [
      '选型报告是 AI PM 的核心交付物：四维框架 + 自测数据 + TCO + 回退方案，四件套齐了才上评审会。这份文档同时是向上管理的工具——它把「为什么不用最贵的模型」变成一道算术题。',
      '开源权重的战略价值：供应链自主（不被单一厂商锁死）、成本上限可控、数据主权。哪怕你继续用闭源 API，「如果明天断供怎么办」的预案里也该有一个开源模型的名字。',
    ],
  },

  '2.2.1': {
    goals: [
      '掌握零样本/少样本的适用边界与示例工程',
      '会用分隔符做输入隔离与结构化输出约束',
      '建立「提示词 + 测试用例」的迭代工作流',
    ],
    concepts: [
      {
        t: '零样本先行，少样本兜底',
        body: [
          '现代模型对清晰指令的零样本响应已经很好——先试「说清楚要求」，不行再加示例。少样本的价值在定义「说不清的模式」：分类标准模糊、格式特殊、风格模仿。示例要多样且典型；反例（错误示范 + 说明）在边界判断上格外有效。',
        ],
      },
      {
        t: '隔离与结构化',
        body: [
          '用分隔符（XML 标签、三引号）把指令与数据分开，防注入污染任务。输出约束写具体：「以 JSON 数组输出，每元素含 sentiment 和 quote」远胜「输出结构化结果」——约束越接近可校验的 schema，下游代码越稳。',
        ],
      },
    ],
    deepDive: [
      {
        t: 'Anthropic 圆桌演示的迭代方法论',
        body: [
          'Anthropic 的官方圆桌（Amanda Askell 等一线研究者）演示了提示词迭代的真实过程：先写最朴素版本 → 观察失败案例 → 逐条加约束并确认每条约束真的改变了行为 → 删除无效修饰。与直觉相反，顶级研究者的提示词往往朴素直白，功夫全在「失败案例驱动的迭代」上。',
          '工程化的迭代闭环五步：写 v1 → 建 10 条测试输入（含边界）→ 批量跑 → 标注不合格案例 → 针对性修改后重跑对比。每版存档可回滚。这个闭环本身就是评估思想（1.4.4）在提示词层的最小实现——区别只是规模：这里是 10 条，评估集是 100 条。',
        ],
      },
      {
        t: '反模式清单：从两家官方指南里提炼的「不要做」',
        body: [
          '两家官方指南不约而同地反对：① 堆砌强调（「非常重要」「务必」收益趋零）；② 一段话塞多个任务（拆开，每步一个目标）；③ 模糊的质量词（「专业一点」不如「避免口语、使用被动句」）；④ 忘记给退路（不说「可以回答不知道」，模型就会硬编）；⑤ 提示词与数据混排（不做隔离等于接受注入）。DAIR.AI 的开源指南则把这些反模式配了论文出处，适合当字典查。',
        ],
      },
    ],
    videos: [
      { title: 'AI prompt engineering: A deep dive', speaker: 'Anthropic（Amanda Askell / Alex Albert / David Hershey）', minutes: 45, lang: 'en', url: 'https://www.youtube.com/watch?v=T9aRN5JkmL8', why: 'Anthropic 官方圆桌，一线研究者现场演示如何迭代提示词——看他们怎么「改」，比看成品更有价值。' },
    ],
    readings: [
      { title: 'Prompt engineering guide', author: 'OpenAI 官方文档', url: 'https://platform.openai.com/docs/guides/prompt-engineering', why: '官方策略手册：写清晰指令、给参考文本、拆分任务等六大策略。' },
      { title: 'Prompt engineering overview', author: 'Anthropic 官方文档', url: 'https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview', why: '官方指南，含 XML 结构化、角色设定、预填等独门技巧。' },
      { title: 'Prompt Engineering Guide', author: 'DAIR.AI (Elvis Saravia)', url: 'https://github.com/dair-ai/prompt-engineering-guide', why: '社区最系统的开源提示工程教程合集，覆盖论文与课程索引，当字典用。' },
    ],
    mistakes: [
      {
        wrong: '提示词越长越详细，效果越好。',
        right: '堆砌指令边际递减甚至反作用：模型抓错重点、遗漏约束。每条指令都应有测试用例支撑它的存在——写不出用例的理由，删掉。',
      },
      {
        wrong: '示例给一个就够，模型会举一反三。',
        right: '单示例会被过度泛化成「唯一格式」。2~5 个多样示例（含边界与反例）才能圈定行为分布——示例数量是便宜且有效的调节旋钮。',
      },
    ],
    practice: {
      task: '写「客户评论分类器」提示词：输出 JSON（sentiment + 主题标签 + 原文引述），10 条评论测试，必须含 1 条讽刺与 1 条中性评论，全部通过才算 v1。',
      hint: '讽刺评论是分类器的照妖镜——「服务真是好到让我等了一小时」。',
      answer: '合格标准：讽刺判为 negative（少样本里放讽刺反例最有效）；中性不被硬塞进两极（schema 保留 neutral 并给示例）；每条输出都有真实存在的原文引述（防幻觉抽查点）。',
    },
    pmLens: [
      '提示词库是团队资产不是个人技巧：建库（场景-版本-负责人-变更记录）+ 绑定测试集 + 模型升级重跑，三件套让提示词能力留在团队而不是某位同事的脑子里。这是 AI 团队知识管理的第一优先级。',
      '「改提示词」要设软上限：措辞打磨的收益递减很快，超过阈值应转向改上下文供给或建评估集。把这条写进研发规范，避免团队在低杠杆区空转。',
    ],
  },

  '2.2.2': {
    goals: [
      '掌握 CoT 与自洽性采样的原理与成本结构',
      '理解结构化输出的三层保障（提示词 → API 约束解码 → 代码校验）',
      '能为任务选择「要不要 CoT」并给出判断依据',
    ],
    concepts: [
      {
        t: '思维链：让思考显式化',
        body: [
          '让模型「一步步想再答」，把推理过程变成生成 token——后续推理能以前面的推理为上下文，多步任务的正确率显著提升。两种实现：零样本（一句 "Let\'s think step by step"）与少样本（示例里示范推理过程）。',
        ],
      },
      {
        t: '结构化输出：Schema 约束与失败重试',
        body: [
          '三层保障：提示词层给精确 schema 与示例；API 层用厂商的结构化输出 / JSON 模式（语法级保证合法）；代码层做 schema 校验（字段、类型、枚举）。校验失败把错误信息回填要求修复，连续失败降级人工。',
        ],
      },
    ],
    deepDive: [
      {
        t: '自洽性：用采样换准确率的数学',
        body: [
          'Self-Consistency（Wang et al., 2022）在 CoT 上再加一层：同一问题用较高温度采样 n 条推理路径，对最终答案做多数投票。机制：单次推理可能在前几步「岔进错误的思路」，多条独立采样让正确思路以概率优势胜出——相当于把「一条链的可靠性」升级为「多数链的稳定性」。',
          { formula: '最终答案 = argmax_a ( 在 n 条采样路径中，答案为 a 的票数 )' },
          '成本账很清楚：准确率提升直接乘以 n 倍 token 成本与延迟。适用判断：离线批处理、高价值判断（风控、评分）值得；实时交互不划算。注意推理模型（o1/R1 类）内置长思考后，外部 CoT 与自洽性的边际收益要重测——技术手段有代际。',
        ],
      },
      {
        t: '约束解码：结构化输出的底层原理',
        body: [
          'API 的 JSON 模式为什么能「保证」语法合法？底层是约束解码（constrained decoding）：生成每个 token 时，把不符合 JSON 语法的状态对应的候选 logit 掩掉，模型只能在合法 token 里选。所以它保证「合法」，不保证「正确」——字段名对但值错了它管不着，语义校验仍然是你的代码层职责。',
          '三层保障由此各司其职：提示词 schema 定「要什么」，API 约束解码保「语法合法」，代码校验管「语义正确」+ 失败重试。三层都有的管道，结构化输出成功率可以做到 99%+；只靠提示词要 JSON 的，生产环境迟早翻车。',
        ],
      },
    ],
    videos: [
      { title: 'Jason Wei & Hyung Won Chung — Intuitions on Large Language Models (Stanford CS25)', speaker: 'Jason Wei, Hyung Won Chung (CoT 作者 / Google DeepMind)', minutes: 75, lang: 'en', url: 'https://www.youtube.com/watch?v=3gb-ZkVRemQ', why: 'CoT 作者本人亲讲对 LLM 的直觉与推理范式——「作者视角的思维方式」比论文本身更难得。' },
    ],
    papers: [
      {
        title: 'Chain-of-Thought Prompting Elicits Reasoning in Large Language Models', authors: 'Wei et al. (Google)', year: 2022, venue: 'NeurIPS',
        url: 'https://arxiv.org/abs/2201.11903',
        why: '思维链的开山论文（1.3.1 读机制，本课读它的实操配方：8 个示例的具体写法与任务适配）。',
        contributions: ['few-shot 示例写出推理步骤即可激发多步推理', '收益随模型规模涌现（小模型无效）', '数学/逻辑/常识多步基准一致大幅提升'],
        pmLens: '论文附录的示例写法可以直接抄：推理步骤的粒度、格式、详略都有讲究。提示词工程里「抄论文附录」是被低估的捷径。',
      },
      {
        title: 'Self-Consistency Improves Chain of Thought Reasoning in Language Models', authors: 'Wang et al. (Google)', year: 2022, venue: 'ICLR 2023',
        url: 'https://arxiv.org/abs/2203.11171',
        why: '「采样多条思维链再投票」的方法源头：用推理时计算换准确率的第一篇代表作（ToT/o1 的思想先声）。',
        contributions: ['多样化解码 + 多数投票的完整方法与消融', 'GSM8K 等基准在 CoT 之上再提升 10~20 个点', '确立「推理时计算」可兑换准确率的核心思想'],
        pmLens: '自洽性给了产品一个准确的定价直觉：准确率是可以用钱买的，价格就是采样倍数。分级产品的「严谨模式」可以就是这个开关。',
      },
    ],
    readings: [
      { title: 'Structured outputs', author: 'OpenAI 官方文档', url: 'https://platform.openai.com/docs/guides/structured-outputs', why: 'JSON Schema 约束输出的官方文档：约束解码能力的产品化形态，结构化管道的标配。' },
    ],
    mistakes: [
      {
        wrong: '思维链对所有任务都有提升。',
        right: 'CoT 对简单任务（单轮分类、格式转换）无收益甚至降质（多余的推理空间让输出跑偏）。先用测试集确认任务是「多步推理」型，再决定上不上 CoT。',
      },
      {
        wrong: '要求「输出 JSON」就等于结构化输出。',
        right: '提示词要求只是软约束：可能输出 Markdown 包裹的 JSON、字段名拼错。语法靠 API 约束解码，语义靠代码 schema 校验——两层都要有。',
      },
    ],
    practice: {
      task: '构建「订单咨询路由器」：输入咨询文本，输出 JSON {intent, priority, need_human}。要求 schema 校验 + 失败自动重试一次 + 对 5 条刁钻输入（中英混杂、无明确诉求等）全部通过。',
      hint: '枚举值写进 schema；need_human 的判定规则要在提示词里成文。',
      answer: '验收要点：中英混杂正确归类；「我就想问问」类模糊输入 need_human=true 或进兜底 intent；重试日志里能看到第一次失败原因被带进第二次请求。三条齐，结构化管道闭环。',
    },
    pmLens: [
      '「要不要 CoT」是成本决策不是技术跟风：CoT/自洽性/推理模型都在用 token 换准确率。给你的产品建一张「任务 × 准确率收益 × 成本倍数」对照表，让每个功能的选择有账可查——这是 AI 产品毛利管理的核心功课。',
      'schema 是前后端契约：结构化输出的 schema 变更要像 API 版本一样管理（加字段不改名、旧字段先废弃后删除），否则下游解析会在你毫无察觉时静默失败。',
    ],
  },

  '2.2.3': {
    goals: [
      '实现 Function Calling 完整闭环并画出消息时序',
      '掌握多轮聊天应用的状态管理与上下文窗口控制',
      '理解流式与工具调用并存时的 UI 时序设计',
    ],
    concepts: [
      {
        t: 'Function Calling 闭环',
        body: [
          '四步：① 声明——函数名、描述、JSON Schema 参数表随请求发出；② 决策——模型返回「想调用什么」（tool_use）而非自然语言；③ 执行——你的代码真正调用；④ 回填——结果以 tool 角色追加进 messages 再请求，模型生成最终回答。模型不执行任何函数，执行权与安全边界在你手里。',
        ],
      },
      {
        t: '多轮状态管理',
        body: [
          '会话状态就是不断增长的 messages。要点：system 常驻头部不裁剪；历史按「最近 N 轮 + 旧轮摘要」控窗口（1.3.2 压缩思想）；工具调用消息与结果必须成对保留，缺一半会破坏一致性。会话持久化到数据库，按 session_id 隔离。',
        ],
      },
    ],
    deepDive: [
      {
        t: '调用闭环的消息时序',
        body: [
          { formula: '[system, user] → assistant(tool_use: get_weather{city:北京}) → tool(result: 晴 26°C) → assistant(「北京今天晴，26 度…」)' },
          '三个容易踩的坑：① 工具消息的 id 必须与 tool_use 的 id 配对，多工具并行时错配会让模型张冠李戴；② 工具报错也要回填（错误文本作为 tool 消息），模型拿到错误信息才能自我修正——直接抛异常等于剥夺了它纠错的机会；③ 工具返回值要控制体积（截断/摘要），它是上下文的最大吞噬者（4.1.3 的压缩从这里就开始做）。',
        ],
      },
      {
        t: '工具描述与 BFCL：能力与描述的合谋',
        body: [
          '写完描述自测三条：模型能分清相似工具吗？参数填对了吗？不该调用时它忍得住吗？BFCL 榜单把「调用能力」拆成简单/多重/并行/链式评测——你会发现模型在「并行调用」和「忍住不调用」上普遍弱于「简单调用」，测试集应覆盖这四类。Toolformer 的历史价值在于证明「模型可以学会用工具」；今天的产品问题是「如何把工具喂得足够清楚」——描述工程的收益仍然大于换模型。',
          '流式与工具并存的 UI 时序：模型决定调工具时先收到 tool_use 事件（此时 UI 应显示「正在查询库存…」的过程反馈），工具执行完回填，后续请求再流式输出最终回答。两段流式之间必须有过程态设计，否则用户面对的是一段静止的空白——这是聊天类 AI 产品最常见的体验硬伤。',
        ],
      },
    ],
    videos: [
      { title: 'Toolformer — Paper Explained', speaker: 'Yannic Kilcher', minutes: 35, lang: 'en', url: 'https://www.youtube.com/watch?v=ZCdqfIuT81A', why: '知名论文精读讲者逐段拆解 Toolformer 的方法与局限，比读原文轻松的入门路径。' },
    ],
    papers: [
      {
        title: 'Toolformer: Language Models Can Teach Themselves to Use Tools', authors: 'Schick et al. (Meta AI)', year: 2023, venue: 'NeurIPS',
        url: 'https://arxiv.org/abs/2302.04761',
        why: 'function calling 的思想源头（1.4.3 读协议、4.1.2 读治理，本课读它对「接口设计」的启示：模型用的工具接口越简单可靠，学习信号越清晰）。',
        contributions: ['自监督挖掘「调用有助预测」的样本，无需人工标注工具数据', '小模型 + 计算器/检索工具可胜过大模型裸奔', '确立模型决策、外部执行、结果回填的闭环范式'],
        pmLens: '本课做的是 Toolformer 思想的「受控产品化」：不追求模型自学工具，而是用 schema + 描述把工具喂清楚。受控换来的是可审计与可治理——这正是产品与实验室的分界线。',
      },
    ],
    readings: [
      { title: 'Function calling 指南', author: 'OpenAI 官方文档', url: 'https://platform.openai.com/docs/guides/function-calling', why: '官方工具调用指南：定义 schema、发起调用、回填结果的完整流程。' },
      { title: 'Berkeley Function Calling Leaderboard（BFCL）', author: 'UC Berkeley Gorilla 团队', url: 'https://gorilla.cs.berkeley.edu/leaderboard.html', why: '函数调用能力的权威榜单：选「会调工具」的模型直接查表，重点看并行与链式调用分项。' },
    ],
    mistakes: [
      {
        wrong: '工具描述随便写一句，模型自然会用。',
        right: '描述是模型决策的唯一依据。模糊描述导致该调不调、参数乱填。自测三条：分得清相似工具吗？参数填对了吗？不该调用时忍得住吗？',
      },
      {
        wrong: '把模型输出的函数参数直接执行，信任它的格式。',
        right: '参数同样是不可信外部输入：类型、范围、路径越界、注入都要防。模型输出的参数与用户输入同级对待。',
      },
    ],
    practice: {
      task: '实现带两个工具（查天气、查时间）的命令行聊天助手：流式输出、多轮对话、工具回填，历史超 10 轮自动摘要压缩；再设计「查询中…」的过程态 UI 文案方案。',
      hint: '先画消息时序图：哪一步 messages 里会出现 tool 角色？两段流式之间插什么？',
      answer: '验收清单：① 问「北京明天适合跑步吗」触发天气工具并基于结果回答；② 工具调用与结果消息成对出现在历史中；③ 第 11 轮时旧轮次被摘要替换且对话仍连贯；④ 工具故意报错时模型向用户解释而非崩溃。四条全过，STAGE 02 毕业。',
    },
    pmLens: [
      '工具清单就是产品能力清单：每一个接入的工具都是一次产品能力扩张与一次安全面扩张。工具接入应走「需求评审 → 描述评审 → 权限定级 → 上线观测」的完整流程，与功能发版同权重。',
      '会话数据的合规设计前置：聊天记录与工具调用结果（可能含用户敏感数据）存储在客户端还是服务端、保留多久、能否被用户删除——这些决定要在第一版就做，后补的合规改造成本通常是三倍以上。',
    ],
  },
}
