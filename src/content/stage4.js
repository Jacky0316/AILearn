// STAGE 04 · Agent 工程 —— 5 课正文（溯源式深读版）
export default {
  '4.1.1': {
    goals: [
      '从零实现最小 Agent Loop 并说清每行代码的职责',
      '掌握 ReAct 三要素在代码中的对应物与信息流',
      '理解「代码即动作」（Code Agent）与工具点菜式调用的取舍',
    ],
    concepts: [
      {
        t: '最小 Agent：不足百行的真相',
        body: [
          '剥掉所有包装，Agent 的内核是一个 while 循环：把任务放进 messages，请求模型；若返回 tool_use，就执行对应函数，把结果以 tool 角色追加进 messages，继续循环；若返回纯文本，视为最终答案，退出循环。',
          'learn-claude-code 的 s01 用约 80 行 Python 实现了这个内核（messages / while True / tool_use 三件套）。亲手敲一遍，Agent 的「神秘感」会永久消失——一切智能体行为都是这个循环叠出来的。',
        ],
      },
      {
        t: 'ReAct 的代码对应物',
        body: [
          'Thought：模型的推理文本；Action：返回的 tool_use 块（函数名 + 参数）；Observation：你执行后回填的 tool 角色消息。三者就是 messages 数组里不同角色的消息——原生 function calling 让结构化的 Action-Observation 不再靠文本约定，循环更稳、解析更省。',
        ],
      },
    ],
    deepDive: [
      {
        t: '循环内核的解剖：状态就是 messages',
        body: [
          'Agent 没有隐藏状态——「记忆」「进度」「意图」全部物化为 messages 数组的形状。每圈循环发生四次变换：① 拼装（系统指令 + 任务 + 历史 + 工具声明）；② 模型生成（文本即答案信号，tool_use 即行动信号）；③ 分发执行（查工具表、跑函数、捕获异常）；④ 回填（结果/错误作为 tool 消息追加）。',
          { formula: 'while steps < LIMIT:  resp = LLM(messages, tools)  →  if resp.tool_use: messages += execute(resp.tool_use)  else: return resp.text' },
          '由此推出所有 Agent 调试的第一性方法：任何怪异行为，打印完整 messages 看信息流——上下文里多什么、少什么、错什么，答案几乎总在那里。框架报「玄学错误」时，退回裸循环复现是标准排障路径。',
        ],
      },
      {
        t: 'Tool Agent vs Code Agent：动作空间的两种设计',
        body: [
          '传统工具调用（Tool Agent）：模型从预定义函数清单「点菜」，一次一个动作，框架代为执行——可控、可审计，但复杂任务需要多轮调用组合。代码即动作（Code Agent，smolagents 提出）：模型直接写一段 Python 作为行动，沙箱执行后返回结果——循环、分支、批量操作一行代码搞定。',
          'CodeAct 论文的量化结论（1.3.3 已介绍）：代码动作在同等任务上工具调用次数更少、成功率更高。取舍在于安全边界：代码动作必须配严格沙箱（资源限制、网络白名单、禁危险调用），审计粒度也从「函数调用记录」变成「代码 diff」。产品选型：简单确定性任务用工具点菜，探索性批量任务用代码行动——两者正在融合（主流 Coding Agent 两者混用）。',
        ],
      },
    ],
    videos: [
      { title: '[1hr Talk] Intro to Large Language Models', speaker: 'Andrej Karpathy', minutes: 60, lang: 'en', url: 'https://www.youtube.com/watch?v=zjkBMFhNj_g', why: 'System 2 / Agent 循环专章配合本课的裸写实现：先看循环的「概念图」，再亲手写它的「电路图」。' },
    ],
    papers: [
      {
        title: 'ReAct: Synergizing Reasoning and Acting in Language Models', authors: 'Yao et al. (Princeton / Google)', year: 2022, venue: 'ICLR 2023',
        url: 'https://arxiv.org/abs/2210.03629',
        why: '「推理轨迹 + 动作交替生成」范式的原始论文，一切 Agent Loop 设计的源头（引用超 1.5 万）。1.3.4 读它的证据，本课读它的实现。',
        contributions: ['交替生成 Thought 与 Action，Observation 回填后继续', 'HotpotQA / AlfWorld 上交替式显著优于纯推理与纯行动', '推理轨迹天然构成可审计的决策日志'],
        pmLens: '本课实现完成后回头看这篇论文，你看到的将不再是公式而是「我写过的那个 while 循环的学术表述」——这就是溯源学习的效果：论文降维成代码。',
      },
    ],
    readings: [
      { title: 'Introduction to Agents（AI Agents Course Unit 1）', author: 'Hugging Face 官方课程', url: 'https://huggingface.co/learn/agents-course/en/unit1/introduction', why: '官方免费课程的定义篇：Agent = LLM + 工具 + 环境循环，与证书挂钩、持续维护。' },
      { title: 'smolagents 文档（Code Agents）', author: 'Hugging Face', url: 'https://huggingface.co/docs/smolagents/en/index', why: '「代码即动作」范式的官方出处，展示 JSON 调用之外的动作空间设计。' },
    ],
    mistakes: [
      {
        wrong: 'Agent = 框架（LangChain / smolagents），不用框架做不了。',
        right: '框架是循环的封装与便利件。理解了 while + tool_use 内核，百行内可以裸写一个 Agent——遇到框架玄学问题时，裸写版本是最好的调试参照物。',
      },
      {
        wrong: '循环里模型返回了文本就说明任务失败了。',
        right: '纯文本返回是约定的「最终答案」信号，是正常退出路径。真正的失败信号是步数预算耗尽、工具反复报错、答案未完成任务——靠权限与评估去治理（4.1.2 / 4.2.2）。',
      },
    ],
    practice: {
      task: '裸写一个最小 Agent（不用框架）：给它 read_file / write_file 两个工具，任务是把一份 CSV 的行数写进报告文件。加步数上限 10 的保险丝，并故意给一次错路径观察自我修正。',
      hint: '核心循环五步：拼 messages → 请求 → 有 tool_use 就执行回填 → 无则返回 → 步数超限强制退出。',
      answer: '验收要点：① 观察到「读 CSV → 思考 → 写报告」至少 3 次工具调用；② 错路径的报错被回填后模型换正确文件名重试（自我修正生效）；③ 上限改成 1 时保险丝触发。三条全过说明你掌握了 Agent Loop 的本体。',
    },
    pmLens: [
      '裸写能力 = 谈判能力：理解百行内核后，你在供应商与框架选型时问的问题会完全不同（「循环超限后状态能导出吗」「工具错误回填格式可自定义吗」），被营销话术糊弄的概率大幅下降。',
      '最小循环的成本基线思维：任何 Agent 产品在加记忆、加多代理、加规划器之前，先记录裸循环版的质量与成本——它是衡量每一层复杂度「买到了多少性能」的基准线。没有基线的复杂度都是玄学。',
    ],
  },

  '4.1.2': {
    goals: [
      '实现工具分发表与 schema 校验，理解「描述即世界观」',
      '实现三级权限模型与 PreToolUse 钩子的纵深防御',
      '了解 BFCL 榜单与工具幻觉的测量方式',
    ],
    concepts: [
      {
        t: '工具分发表：Agent 的手脚注册处',
        body: [
          '工程化的工具管理是一张注册表：每个工具登记名称、JSON Schema、执行函数。循环收到 tool_use 时按名字查表执行——新增工具 = 注册一行，循环代码零改动。并发优化：无副作用的只读工具可并行执行，写操作保持串行。',
        ],
      },
      {
        t: '权限：给每个动作定风险等级',
        body: [
          '三级模型（learn-claude-code s03 的 PermissionRule 思想）：绿色（读文件、查数据）自动放行；黄色（写文件、发请求）询问用户；红色（删除、支付、外发数据）直接拒绝。分级依据是「破坏半径 × 可逆性」，规则外置成配置以便审计。',
        ],
      },
    ],
    deepDive: [
      {
        t: '工具描述 = 模型眼中的世界',
        body: [
          '模型决定「用不用、怎么用」的唯一依据是工具描述与参数 schema。BFCL（Berkeley Function Calling Leaderboard）把调用能力拆成简单 / 多重 / 并行 / 链式四类并区分「AST 匹配」与「实际执行」两种评测——同一模型在不同类别上的成功率差异巨大，且很多失败源于描述歧义而非模型缺陷。',
          '描述工程的实践清单：① 写清「何时该用 / 何时绝不该用」；② 参数给单位、格式、示例值；③ 相似工具显式写区别（「查天气用这个，查历史天气用那个」）；④ 返回值描述信息密度（错误码含义）。改描述 = 改模型行为，且成本为零——这是 Harness 调优的第一杠杆。',
        ],
      },
      {
        t: '纵深防御：权限 + 钩子的双层闸门',
        body: [
          '权限分级解决「要不要问人」，钩子解决「永远不许发生的事」。Anthropic Claude Code 的权限模型是活教材：allowlist（白名单工具免审）/ ask（灰区弹确认）/ deny（黑名单直接拒），配置落在 settings.json 里可版本化、可审计；再叠一层 sandbox（文件系统与网络边界）兜住「审批通过但越界」的情形。',
          { formula: '请求 → 钩子(PreToolUse 硬规则) → 权限(allow/ask/deny) → 执行 → 钩子(PostToolUse 校验) → 回填' },
          '设计顺序很重要：先把「永不许发生」写成钩子（确定性），再对剩余灰区设权限（人审），最后才是提示词引导（软约束）。顺序颠倒的系统会被对抗输入击穿。',
        ],
      },
      {
        t: '工具幻觉：规模化后的新故障类',
        body: [
          'Gorilla 论文系统测量了「工具幻觉」：模型会编造不存在的 API 方法、虚构参数名、用过时的版本签名——API 清单一大就高发。解法是「检索增强调用」：调用前检索该工具的最新文档注入上下文，让模型对着真文档写参数而不是凭记忆。',
          '产品防御三层呼应：工具白名单（不存在的名字直接拒）→ schema 校验（参数类型/枚举硬校验）→ 调用日志审计（幻觉调用可回溯）。三者都在应用层，不依赖模型自觉。',
        ],
      },
    ],
    videos: [
      { title: 'Teaching LLMs to Use Tools at Scale (Stanford MLSys #98)', speaker: 'Shishir Patil (Gorilla / BFCL 作者)', minutes: 67, lang: 'en', url: 'https://www.youtube.com/watch?v=WAvO8FTDJ8M', why: 'Gorilla 与 BFCL 作者亲讲工具调用全栈：训练、检索增强调用到榜单设计，讲者即源头。' },
    ],
    papers: [
      {
        title: 'Toolformer: Language Models Can Teach Themselves to Use Tools', authors: 'Schick et al. (Meta AI)', year: 2023, venue: 'NeurIPS',
        url: 'https://arxiv.org/abs/2302.04761',
        why: '首次证明 LLM 可自监督学会何时/如何调用 API——工具调用研究的开山之作（1.4.3 读思想，本课对照工程实现）。',
        contributions: ['自动挖掘「插入 API 调用有助预测」的训练样本', '小模型 + 工具可胜过大模型裸奔', '确立「模型决策 + 应用执行」的分工范式'],
        pmLens: '它把「工具使用」从人工规则变成可学习行为——你今天在 API 里写的每个工具描述，都是在教一个有自学能力的系统，因此描述评审值得认真对待。',
      },
      {
        title: 'Gorilla: Large Language Model Connected with Massive APIs', authors: 'Patil et al. (UC Berkeley)', year: 2023, venue: 'NeurIPS 2024',
        url: 'https://arxiv.org/abs/2305.15334',
        why: '1600+ 真实 API 的调用与幻觉测量：「工具幻觉」这一故障类的命名者与解法提供者。',
        contributions: ['APIBench 基准 + 检索器感知训练', '微调模型在真实 API 上超越 GPT-4 且显著抑制幻觉', '揭示编造参数/过时签名等新失败模式'],
        pmLens: '把「工具幻觉率」加入 Agent 产品的质量指标组：千次调用中编造 API/参数的次数。有这个数字，安全问卷和采购评审你会从容很多。',
      },
    ],
    readings: [
      { title: 'Tool use with Claude（官方文档总览）', author: 'Anthropic', url: 'https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview', why: '生产级工具调用协议的官方一手文档：工具定义、执行位置、调用时机与并行调用。' },
      { title: 'Berkeley Function Calling Leaderboard（BFCL）', author: 'UC Berkeley Sky Lab', url: 'https://gorilla.cs.berkeley.edu/leaderboard.html', why: '工具调用能力的行业事实标准榜单（AST + 实际执行双轨评测），选模型时直接可用。' },
      { title: 'Claude Code: Best practices for agentic coding', author: 'Anthropic Engineering', url: 'https://www.anthropic.com/engineering/claude-code-best-practices', why: '权限系统设计的工程一手来源：allowlist、/permissions、settings.json 与沙箱的权衡。' },
    ],
    mistakes: [
      {
        wrong: '给模型写好提示词「请不要删除文件」就够了。',
        right: '提示词是软约束，对抗性输入与模型波动都可能击穿。安全边界必须落在代码层：权限分级 + 钩子拦截是硬约束，提示词只是行为引导——两层是纵深防御，不可互相替代。',
      },
      {
        wrong: '工具越多越强，把所有函数都注册进去。',
        right: '工具过载让模型选择困难、描述互相干扰，错误率不降反升。按任务供给最小必要工具集，并在系统提示里声明当前边界。',
      },
    ],
    practice: {
      task: '给 4.1.1 的最小 Agent 加治理层：工具分发表 + 三级权限（读自动、写询问、删除拒绝）+ 一个 PreToolUse 钩子拦截路径越界（../ 逃逸检测）。用 4 条用例验证每层闸门。',
      hint: '权限检查放在钩子里而不是业务函数里；路径校验先转绝对路径再判前缀。',
      answer: '验收清单：① 读文件不再询问；② 写文件触发确认；③ rm 类工具直接被拒且循环继续；④ path=../../etc/passwd 被钩子拦截并回填错误，模型放弃该路径。四条全过，你的 Agent 有了真正的安全边界。',
    },
    pmLens: [
      '工具目录治理是 AI 产品的新职能：工具清单、描述规范、生命周期（上线/下线/改签名）需要专人治理——工具数量过百后，「描述质量」会成为成功率的主要变量。BFCL 榜单给了你跨模型比较的标尺。',
      '权限矩阵是 B 端交付物的标配页：客户安全问卷必问「AI 能做什么、谁审批、留什么痕」。把三级权限矩阵 + 钩子规则清单写进交付文档，是拿下单子的实打实加分项。',
    ],
  },

  '4.1.3': {
    goals: [
      '理解 MemGPT 的操作系统隐喻：主上下文与外部上下文的分页',
      '实现窗口内压缩（工具结果预算 + 历史摘要）与跨会话记忆的写入巩固',
      '说清记忆系统与 RAG 的边界',
    ],
    concepts: [
      {
        t: '窗口内：压缩的艺术',
        body: [
          'Agent 跑久了，上下文最大吞噬者是工具结果。learn-claude-code s08 的三级压缩：给单次工具结果设预算，超长就 snip（截断留头尾）、micro（只留关键字段）；历史消息超预算时压缩成摘要。压缩不是丢信息，是信息分级：热数据在窗口、温数据在摘要、冷数据在磁盘。',
        ],
      },
      {
        t: '跨会话：记忆三层机制',
        body: [
          '选择（什么值得记：稳定偏好、项目事实、决策结论）；提取（会话结束时模型扫描候选记忆，写成结构化条目）；巩固（新旧冲突时合并更新而非追加，定期淘汰过期记忆）。落地形态常见为 MEMORY.md 式持久文件，会话开始自动加载。',
        ],
      },
    ],
    deepDive: [
      {
        t: 'MemGPT：把操作系统思想搬进上下文管理',
        body: [
          'MemGPT（Packer et al., UC Berkeley）的核心隐喻：LLM 就是操作系统。主上下文（main context = 模型窗口）是「内存」，外部上下文（external context = 向量库、文件）是「磁盘」；操作系统用「分页」在两级存储间搬数据，MemGPT 让模型自己决定何时分页——通过自编辑的「记忆函数」把信息在窗口与磁盘之间调入调出。',
          { formula: '主上下文 = 系统指令 + 工作上下文（对话/中间结果）+ 内存指令区（可自编辑的 MEMORY）；外部上下文 = 文档库 / 向量索引 / 会话历史归档' },
          '最精妙的设计是「中断驱动的自编辑」：模型调用 memory.replace 之类的虚拟函数时，函数执行结果作为系统消息回到窗口——模型借此改写自己的记忆区。这证明了「记忆管理」本身可以是 Agent 的一种工具调用，而不是外部脚本的黑箱。',
        ],
      },
      {
        t: '压缩的实现细节与失效模式',
        body: [
          '压缩的决策变量是「后续还用得上吗」：文件路径、已确认参数、用户硬约束必须保留；首次读文件的全文可以压缩。实现顺序：先压工具结果（信息密度最低）→ 再摘要中段历史（保留结论）→ 任务定义与约束永远置顶不裁。',
          '两个失效模式要设防：① 摘要漂移——多次摘要的摘要会让早期约束逐渐失真，对策是保留原始任务原文锚点；② 压缩歧义——被压缩的细节突然被引用时无据可查，对策是被压缩项保留指针（路径/ID）可按需重新加载。这两条是长会话产品「聊着聊着变傻」的高频根因。',
        ],
      },
    ],
    videos: [
      { title: 'Giving AI Infinite Memory with MemGPT（播客访谈）', speaker: 'Charles Packer (MemGPT 一作)', minutes: 31, lang: 'en', url: 'https://www.youtube.com/watch?v=BZJGVUJUtlw', why: '作者亲自解释分层记忆与上下文管理的动机，31 分钟听懂论文核心思想。' },
    ],
    papers: [
      {
        title: 'MemGPT: Towards LLMs as Operating Systems', authors: 'Packer et al. (UC Berkeley)', year: 2023, venue: 'arXiv',
        url: 'https://arxiv.org/abs/2310.08560',
        why: '记忆系统的源头论文：把 LLM 当操作系统、用虚拟内存分页思想管理多级记忆（注意正确 arXiv 编号是 2310.08560）。',
        contributions: ['主上下文 / 外部上下文两级存储 + 模型自编辑记忆的分页机制', '中断驱动的函数调用让模型自主管理窗口', '长会话文档分析等任务上大幅超越固定窗口基线，后孵化为 Letta'],
        pmLens: '「记忆 = 分页系统」给了记忆类产品一个成熟的架构词汇表。评审任何「AI 有记忆」的卖点时，问三个问题：记什么（选择）、怎么进（提取）、怎么保鲜（巩固）——三问过后大部分Demo水分现形。',
      },
    ],
    readings: [
      { title: 'Effective context engineering for AI agents', author: 'Anthropic Engineering', url: 'https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents', why: '官方工程长文的 Agent 记忆视角：压缩、子代理隔离与「结构化笔记」（agentic memory）策略，与 MemGPT 思想互证。' },
      { title: 'LLMs as Operating Systems: Agent Memory（免费短课）', author: 'DeepLearning.AI（Letta 创始人亲授）', url: 'https://www.deeplearning.ai/courses/llms-as-operating-systems-agent-memory/', why: 'MemGPT/Letta 创始人的 8 节视频课，动手实现 agent 记忆分层与编辑——论文的官方实操版。' },
    ],
    mistakes: [
      {
        wrong: '上下文满了就截断最早的消息，简单粗暴。',
        right: '最早的消息往往是任务定义与用户硬约束，截掉后模型「忘了初心」行为漂移。正确顺序：先压工具结果，再摘要中段历史，任务定义与约束置顶永不裁。',
      },
      {
        wrong: '记忆越多越好，把所有对话都存下来。',
        right: '陈旧记忆会污染行为且难调试。记忆的价值在于「选择性」：稳定偏好与事实值得记，瞬时过程不值得。没有巩固与遗忘机制的记忆系统是负资产。',
      },
    ],
    practice: {
      task: '给 4.1.2 的 Agent 加压缩：工具结果超 500 字自动截断（留头尾各 200 字 + 省略标注），messages 超 6000 字时把中段历史摘要化（任务原文与用户约束置顶保留）。跑一个 20 步长任务验证不崩、不忘任务。',
      hint: '摘要时保留：任务原文、硬约束、每个文件路径与关键数字。',
      answer: '验收要点：① 长任务结束时模型仍能复述最初目标；② 被截断的工具结果在需要时可按保留的路径重新读取；③ token 消耗曲线明显低于无压缩版本。能画出「上下文占用随步数变化」的曲线，理解就到位了。',
    },
    pmLens: [
      '记忆产品的隐私与治理是红线区：记忆内容涉及用户个人事实（偏好、项目、人事），产品必须提供「查看 / 编辑 / 删除记忆」的用户控制面，并在合规上按个人信息处理。没有治理面的记忆功能，B 端基本无法采购。',
      '记忆质量的度量先行：上线记忆功能前定义指标——记忆命中率（被后续会话实际使用）、误记忆率（错误归因导致的错误回答）、遗忘及时性。没有度量的记忆系统会悄悄腐烂，而且用户流失时你都不知道是这个原因。',
    ],
  },

  '4.2.1': {
    goals: [
      '理解子代理的上下文隔离机制与「简报即上下文工程」',
      '掌握 AutoGen / MetaGPT / CAMEL 三种协作哲学的差异',
      '能用「任务路径能否提前画出」决定图编排还是自由协作',
    ],
    concepts: [
      {
        t: '子代理：上下文的隔离舱',
        body: [
          '子代理是主代理派生的独立循环，拥有全新 messages——看不到主代理的海量历史，只拿到一段任务简报；干完只回传结论（learn-claude-code s06）。价值两层：上下文经济（脏活的几十万 token 不污染主窗口）与注意力聚焦（干净上下文专心干一件事）。',
        ],
      },
      {
        t: '两种编排范式',
        body: [
          '自由协作（Agent Teams）：主代理动态拆任务、派发、验收，队友有持久身份与认领机制。工作流图（Workflow Graph）：流程显式建模为节点与条件边，确定性高、可测试。选择标准：任务路径能提前画出来 → 图；需要临场决断 → 自由协作。生产系统常混合：主干用图，个别节点内嵌自由 Agent。',
        ],
      },
    ],
    deepDive: [
      {
        t: 'Anthropic 的生产复盘：编排者-工作者模式',
        body: [
          'Anthropic 的多 Agent 研究系统复盘文是难得的一手生产数据：编排者（lead agent）分析问题 → 拆解为子任务 → 派发给并行工作的子代理（各自带工具检索）→ 汇总交叉验证。三个反直觉的工程事实值得记住：① token 消耗是多 Agent 的第一约束——多 Agent 系统的 token 用量约为单 Agent 聊天的 15 倍；② 任务描述质量决定子代理产出——简报要写明目标、输出格式、工具指引与边界；③ 并行子代理的数量要按「任务可分解性」而非「并发能力」定。',
          { formula: '评估规则：只有当「任务价值的提升 > token 成本放大倍数」时，多 Agent 才是正解' },
          '复盘还给出失败模式的清单：子代理过早交差、与全局目标偏离、摘要合并时丢失关键矛盾——这些与团队管理学的问题同构，产品设计的应对也与管理学一致（明确的验收标准、中途检查点、冲突上报机制）。',
        ],
      },
      {
        t: '三种协作哲学：对话、流水线、角色扮演',
        body: [
          'AutoGen（微软）：把多 Agent 协作建模为「可编程的对话」——Agent 之间通过消息往复完成任务，人类可随时插话。灵活，但行为空间大、需要收敛机制。MetaGPT：把人类软件公司的 SOP（产品经理 → 架构师 → 工程师 → QA）编码进流水线，每个角色按标准作业程序产出结构化交付物——确定性高，代价是流程刚性。CAMEL（KAUST）：最早的「角色扮演双 Agent」框架——两个 Agent 各持角色提示自主协作，开创了「让 Agent 互演」的研究方向。',
          '三者的产品翻译：AutoGen 适合开放式分析类协作；MetaGPT 适合流程成熟、交付物标准化的生产线（内容工厂、代码流水线）；CAMEL 的角色扮演思想活在各种「红蓝对抗」「辩手互审」类产品里。选型先问：你的业务更接近哪种人类协作形态？',
        ],
      },
    ],
    videos: [
      { title: 'Multi-Agent Systems in Era of LLMs（Berkeley CS294-196 Agentic AI MOOC）', speaker: 'Oriol Vinyals (Google DeepMind)', minutes: 59, lang: 'en', url: 'https://www.youtube.com/watch?v=ntjOxjZMaac', why: 'DeepMind 多智能体先驱讲 LLM 时代多 Agent 系统的设计空间与研究版图，视野拉到行业全景。' },
    ],
    papers: [
      {
        title: 'AutoGen: Enabling Next-Gen LLM Applications via Multi-Agent Conversation', authors: 'Wu et al. (Microsoft Research)', year: 2023, venue: 'arXiv',
        url: 'https://arxiv.org/abs/2308.08155',
        why: '「多 Agent 对话即编程范式」的原始框架论文（引用近 5000），多 Agent 协作的主流起点。',
        contributions: ['Agent 间对话作为通用协作协议，人类可中途介入', '可编程的编排粒度：从全自动到人在环自由组合', '数学、代码等基准上的多 Agent 协作增益验证'],
        pmLens: 'AutoGen 的「人类可插话」设计值得所有协作类 AI 产品抄：完全自主不可信，全程人肉太贵——可中断的自主才是产品化甜点。',
      },
      {
        title: 'MetaGPT: Meta Programming for A Multi-Agent Collaborative Framework', authors: 'Hong et al.', year: 2023, venue: 'ICLR 2024',
        url: 'https://arxiv.org/abs/2308.00352',
        why: '把人类 SOP 编码进多 Agent 流水线的源头论文：角色分工 + 结构化交付物，确定性协作的代表。',
        contributions: ['标准化作业程序（SOP）作为 Agent 间的协调机制', '角色化流水线（PM/架构师/工程师）产出结构化文档与代码', '级联错误率显著低于自由对话式协作（消融验证）'],
        pmLens: '「SOP 即协调机制」——你的业务里已有的 SOP 文档，可以直接翻译成多 Agent 工作流设计稿。这是把组织知识变现为 AI 系统的最短路径。',
      },
      {
        title: 'CAMEL: Communicative Agents for "Mind" Exploration of Large Language Model Society', authors: 'Li et al. (KAUST)', year: 2023, venue: 'NeurIPS 2023',
        url: 'https://arxiv.org/abs/2303.17760',
        why: '最早的角色扮演双 Agent 自主协作框架，多 Agent 协作思想的先声（「Agent 社会」叙事的出处）。',
        contributions: ['Role-Playing 框架：双 Agent 各持角色提示自主任务完成', ' inception prompting 让角色保持任务聚焦不跑偏', '大规模对话数据的产出方法（合作研究的副产品）'],
        pmLens: 'CAMEL 的「角色互演」今天活在所有红蓝对抗、辩手互审、A/B 批改类产品里。产品设计时记住它的教训：双 Agent 自由对话容易「互相客气收敛过快」，要靠规则注入保持张力。',
      },
    ],
    readings: [
      { title: 'How we built our multi-agent research system', author: 'Anthropic Engineering', url: 'https://www.anthropic.com/engineering/multi-agent-research-system', why: '生产级多 Agent 系统的一手复盘：编排者-工作者模式、15 倍 token 成本、evals 与失败模式清单。' },
      { title: 'LangGraph 官方文档（Overview）', author: 'LangChain', url: 'https://docs.langchain.com/oss/python/langgraph/overview', why: '低层级有状态 Agent 编排框架的官方文档：图/状态/持久化是工程化多 Agent 工作流的事实标准。' },
    ],
    mistakes: [
      {
        wrong: '多代理一定比单代理强，是能力升级。',
        right: '多代理引入新失败模式：交接信息丢失、子目标偏离、token 成本放大（Anthropic 实测约 15 倍）。单代理 + 好工具能解决的事（大部分任务）不要上多代理——加子代理永远是最后手段。',
      },
      {
        wrong: '子代理就是并发加速器。',
        right: '并发只是副产品，本质收益是上下文隔离。为加速而并发却共享同一上下文的「假多代理」，既没有隔离收益又有并发混乱。',
      },
    ],
    practice: {
      task: '把「调研一个开源项目并写摘要报告」做成两级 Agent：主代理拆解与汇总，派 3 个子代理分别调研「项目结构 / 核心机制 / 社区活跃度」，各回传 200 字结论。为子代理写一份合格简报模板。',
      hint: '简报三件套：任务定义 + 输出格式 + 长度限制；再加工具指引与边界。',
      answer: '验收要点：① 最终报告整合三份结论且无重叠；② 主代理上下文消耗远小于子代理总和（隔离生效）；③ 对比「模糊简报」与「结构化简报」的回传质量——你会直观理解「简报即上下文工程」。简报模板：目标（调研 X 的 Y 维度）→ 范围（只看 README/docs/最近 30 commit）→ 输出（200 字 + 3 条证据链接）→ 禁止事项（不要猜测未验证的数字）。',
    },
    pmLens: [
      '多 Agent 的成本模型必须显式化：token 放大倍数（实测 10~15 倍起）× 单价 = 真实成本。定价设计上「任务制」几乎必然优于「按量制」——用户无法理解一次调研为什么烧掉几百万 token，但能接受一次调研 9.9 元。',
      '「不上多 Agent」也是产品决策：Anthropic 复盘明说多数场景单 Agent + 好工具更划算。在你的架构评审里加一条默认否决项：「先用单 Agent + 工具优化证伪，才允许引入多 Agent」——这条纪律能省下大量无效复杂度。',
    ],
  },

  '4.2.2': {
    goals: [
      '搭建 Agent 的观测基础：trace 结构与必录字段',
      '掌握 GAIA / AgentBench 的设计哲学，并能自建任务级评估集',
      '建立上线前验收清单：目标门控、预算护栏、失败恢复',
    ],
    concepts: [
      {
        t: '可观测性：先看见，再治理',
        body: [
          'Agent 的失败最难排查（决策链长且不可复现），观测基础是结构化日志：每次循环记录步数、模型输入输出摘要、工具调用与耗时、token 消耗。回放失败任务时能逐步看到在哪一步拐错弯。进阶接 tracing 工具（Langfuse / LangSmith）获得调用瀑布图。',
        ],
      },
      {
        t: '评估：Agent 的考试体系',
        body: [
          '三层：单步级（工具选对没有、参数准不准）、任务级（最终完成率——核心指标）、效率级（平均步数、token 成本、墙钟时间）。任务级靠评估集：几十个带客观验收标准的任务跑批出分，验收标准必须可自动判分（文件生成了吗、数字对不对），不靠「感觉像做完了」。',
        ],
      },
    ],
    deepDive: [
      {
        t: 'GAIA 的设计哲学：人类易、LLM 难',
        body: [
          'GAIA（Meta AI & HF）的设计反其道行之：不考超人类难题，考「普通人几分钟搞定、当时 AI 却做不好」的任务——466 题涉及多步推理、网页浏览、工具使用、多模态。结果悬殊：人类 92%，GPT-4 加插件仅 15%。这个差距定义了 Agent 评估的正确坐标系：不用考研题测智能，用真实助手任务测完成率。',
          { formula: '人类 92% vs GPT-4+插件 15%（GAIA 验证集）——「基础任务的真实完成率」才是 Agent 的真成绩单' },
          'AgentBench（清华）补上广度：8 个环境（操作系统、数据库、网页、购物等）× 29 个模型的系统评测，揭示「对话能力 ≠ 操 Agent 能力」——榜单上的对话强模型在 Agent 环境里可能垫底。这两个基准合起来给了产品评估的双标尺：任务真实性（GAIA 式）× 环境多样性（AgentBench 式）。',
        ],
      },
      {
        t: 'trace 的解剖与评估的统计学',
        body: [
          '一条合格的 Agent trace 是树结构：根为任务，节点为 LLM 调用或工具执行，每节点带输入输出摘要、延迟、token、成本、错误码。有了树才能回答三个治理问题：失败发生在哪层（规划/工具/整合）？成本花在哪步？哪类任务最烧钱？Langfuse 这类开源工具的 trace/数据集实验/LLM-as-judge 三件套是工程落地的标准件。',
          '统计学提醒（呼应 1.4.4）：Agent 任务级评估的方差极大——同任务多次跑分可能差 10 个点以上（Sida Wang 在 Berkeley 课上的「榜单噪声」专门讲这个）。结论：任务级指标必须多次重复 + 报告置信区间，单次跑分的「提升」大概率是噪声。',
        ],
      },
      {
        t: '上线前验收：目标门控与护栏清单',
        body: [
          '目标门控（learn-claude-code s17 的 Goal Loop 思想）：任务开始把「完成定义」显式化，每步循环对照检查，满足即停——防无限打磨与提前放弃两个极端。自动续跑与恢复：状态落盘，崩溃后从断点续跑不从头开始。',
          '护栏清单：步数与金额预算熔断、危险动作权限复核（4.1.2）、输出降级方案（Agent 失败退回人工或简单规则）、灰度上线（先 5% 流量，观测数据说话）。这四条护栏的缺席，几乎解释了所有「demo 惊艳、生产翻车」的 Agent 项目。',
        ],
      },
    ],
    videos: [
      { title: 'Predictable Noise in LLM Benchmarks（Berkeley CS294-196 Agentic AI MOOC）', speaker: 'Sida Wang (OpenAI)', minutes: 44, lang: 'en', url: 'https://www.youtube.com/watch?v=HV8pugcFVO0', why: '讲透榜单噪声与统计显著性：为什么跑一次 eval 不能下结论——Agent 评估的统计素养课。' },
    ],
    papers: [
      {
        title: 'GAIA: a Benchmark for General AI Assistants', authors: 'Mialon, Fourrier et al. (Meta AI & Hugging Face)', year: 2023, venue: 'arXiv',
        url: 'https://arxiv.org/abs/2311.12983',
        why: '「人类易、LLM 难」的 466 题真实助手基准：Agent 能力评估的标志性论文（人类 92% vs 当时 GPT-4+插件 15%）。',
        contributions: ['确立「基础任务真实完成率」的评估哲学', '题目要求多步推理 + 工具 + 多模态的真实组合，难以刷榜', '公开排行榜成为 Agent 能力的行业坐标系'],
        pmLens: '用 GAIA 的哲学审你自己的评估集：题目是不是「真实用户任务」？验收是否可自动判分？如果你的评估集全是「考研式难题」，它测的不是产品成功率。',
      },
      {
        title: 'AgentBench: Evaluating LLMs as Agents', authors: 'Liu et al. (清华大学)', year: 2023, venue: 'ICLR 2024',
        url: 'https://arxiv.org/abs/2308.03688',
        why: '首个系统性多环境 LLM-as-Agent 评测（8 环境 × 29 模型），揭示「对话强 ≠ Agent 强」。',
        contributions: ['操作系统 / 数据库 / 网页 / 购物等多环境统一评测协议', '大规模横向对比揭示 Agent 能力与对话能力的低相关性', '任务级成功率 + 中间行为质量的双层指标设计'],
        pmLens: '选模型做 Agent 时别看对话榜：用 AgentBench 式多环境评测（或自建 2~3 个贴近业务环境的小榜）做初筛——两个榜单的相关性低到会颠覆直觉。',
      },
    ],
    readings: [
      { title: 'Adding Error Bars to Evals（官方博客版）', author: 'Anthropic Research', url: 'https://www.anthropic.com/research/statistical-approach-to-model-evals', why: '评估必须带误差棒：聚类标准误可达朴素估计 3 倍以上，小差距对比不可信（呼应 1.4.4）。' },
      { title: 'Agent Observability and Evaluation（Bonus Unit 2）', author: 'Hugging Face 官方课程', url: 'https://huggingface.co/learn/agents-course/en/bonus-unit2/introduction', why: '官方实操单元：用 Langfuse 追踪 trace、监控成本/延迟并评估 Agent 表现。' },
      { title: 'Langfuse 官方文档（Tracing & Evals）', author: 'Langfuse', url: 'https://langfuse.com/docs', why: '开源可观测性工具的官方文档：trace、数据集实验与 LLM-as-judge 评估的工程落地参考。' },
    ],
    mistakes: [
      {
        wrong: 'Agent demo 跑通就能上线。',
        right: 'demo 是 1 个成功样本，生产要求成功率、成本、可恢复性三条曲线。从 demo 到生产 = 评估集建好 + 护栏配齐 + 观测闭环，三件事没有一件能靠「再调调提示词」省掉。',
      },
      {
        wrong: '评估只看最终完成率就够了。',
        right: '完成率 85% 的两个 Agent，一个平均 6 步、一个 25 步，成本差 4 倍——效率层决定商业可行性；单步层指标决定能否定位那 15% 的失败。三层齐全，优化才有抓手。',
      },
    ],
    practice: {
      task: '给 STAGE 04 你亲手写的 Agent 做「生产化验收」：建 10 个带客观验收标准的任务，跑批统计完成率、平均步数、总成本；接入结构化日志并复盘一次失败任务（失败层级：规划/工具/整合）。',
      hint: '验收标准示例：「报告文件存在且包含 3 个指定数字」——写清楚才能自动判分。',
      answer: '毕业标准：① 有可复跑的评估脚本与基线分数（含重复次数与置信区间）；② 能指着 trace 树说出一个失败案例在哪一步、哪一层拐错；③ 预算熔断与权限护栏在故意制造的故障下生效。三条齐了，你已完成从「会用 AI」到「会造 AI 系统」的跨越——全部 34 课通关。',
    },
    pmLens: [
      '上线验收清单是 AI PM 的签字页：评估集通过线、护栏熔断测试、trace 覆盖率、失败降级路径——四项齐备才放流量。把这份清单做成模板，每个 Agent 功能上线走一遍，事故率会有肉眼可见的下降。',
      '观测数据可以产品化：把「任务完成率、平均耗时、人工接管率」做成客户可见的透明度报告（周报/仪表盘），B 端客户对「可测量的 AI」的付费意愿远高于「聪明的 AI」——可观测性不仅是工程，也是销售资产。',
    ],
  },
}
