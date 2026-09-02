// STAGE 03 · RAG 与知识库 —— 5 课正文（溯源式深读版）
export default {
  '3.1.1': {
    goals: [
      '掌握文档抽取、清洗与切片的完整离线管线',
      '理解切片大小的量化权衡与三种切片策略',
      '了解 Late Chunking 等「语义级切片」的新范式',
    ],
    concepts: [
      {
        t: '抽取与清洗：垃圾进垃圾出',
        body: [
          '文档抽取比想象中脏：PDF 双栏排版切碎句子、表格变乱码、页眉页脚混入正文。先选对抽取器（文本类用解析库，复杂版式用视觉解析），再做清洗：去页眉页脚、合并断行、清噪音。验收标准：随机抽 10 个切片人工读一遍，语义完整、无排版碎片。',
        ],
      },
      {
        t: '切片大小：一个核心权衡',
        body: [
          '切太大：一片混多主题，向量被稀释，检索不准还挤占预算；切太小：上下文断裂，答案的前半句在上一片。经验起点：中文 200~500 字，重叠 10%~20% 防答案跨切点。没有万能值——用评估集对比不同大小的召回表现是唯一可靠的定参方式。',
        ],
      },
    ],
    deepDive: [
      {
        t: '三种切片策略与元数据设计',
        body: [
          '固定长度：简单快速，适合结构均匀文本。递归分割：按「段落 → 句子 → 字符」优先级递归切，尽量保语义完整，多数场景的默认选择。结构化切片：按标题层级/章节切（Markdown 标题、PDF 目录），天然保留文档结构，适合手册与制度类文档。',
          '元数据是切片的「身份证」：来源文件、章节路径、更新时间、权限标签。它们支撑三件后置大事——检索时按权限过滤、答案溯源到原文位置、知识更新时增量删除重建。没有元数据的向量库是只进不出的垃圾场。',
        ],
      },
      {
        t: 'Late Chunking：先编码后切分的范式反转',
        body: [
          '传统流程的缺陷在「先切分后编码」：每个切片独立编码，切片之间丢失语境——「它」指代什么、「该公司」是谁，切了就永远不知道。Jina AI 的 Late Chunking 反转流程：先用长上下文嵌入模型对整篇文档做 token 级编码，再按边界对 token 向量做池化切块——每个切片的向量都携带了全文语境。',
          { formula: '传统：chunk → embed(chunk)；Late Chunking：embed(全文) → 按边界池化出 chunk 向量' },
          '论文报告在 short-context 任务上检出率显著优于独立编码，且对「代词密集、指代频繁」的文档提升最大。它与 Anthropic 的 Contextual Retrieval（给切片补语境说明）是同一问题的两条路线：前者改编码顺序（工程零标注），后者用 LLM 生成语境（效果更强、成本更高）。',
        ],
      },
    ],
    papers: [
      {
        title: 'Late Chunking: Contextual Chunk Embeddings Using Long-Context Embedding Models', authors: 'Günther, Xiao et al. (Jina AI)', year: 2024, venue: 'arXiv',
        url: 'https://arxiv.org/abs/2409.04701',
        why: '「先整体编码后切分」的语义分块新范式源头：用长上下文嵌入模型一次性解决切片丢语境问题。',
        contributions: ['反转「先切后编」流程：token 级编码后按边界池化成块向量', '在指代密集文本上检索检出率显著优于独立编码', '无需额外 LLM 调用即可获得语境增强，成本近似于零'],
        pmLens: '它把「切片丢语境」从必然缺陷变成可选优化。做 RAG 方案时可以把两条路线（Late Chunking vs Contextual Retrieval）列入 P1/P2 优化项，用评估集决定要不要花钱。',
      },
    ],
    readings: [
      { title: 'Text splitters（文本切分器总览）', author: 'LangChain 官方文档', url: 'https://docs.langchain.com/oss/python/integrations/splitters', why: '官方切分器总览：递归字符、按 token、按文档结构等各策略的适用场景。' },
      { title: 'Embeddings（含分块建议）', author: 'Anthropic 官方文档', url: 'https://platform.claude.com/docs/en/build-with-claude/embeddings', why: '官方对嵌入应用与文档切分考量的指导。' },
    ],
    mistakes: [
      {
        wrong: '切片是预处理细节，随便切切就行，效果主要靠模型。',
        right: '切片质量是 RAG 上限的天花板：切烂的语料，再强的模型也只能基于残缺上下文作答。调优顺序：先修数据（切片/清洗），再调检索，最后才是换模型。',
      },
    ],
    practice: {
      task: '拿一份真实 PDF（如员工手册），分别用固定 300 字与按标题层级两种方式切片，各抽 5 片评估语义完整性，记录哪种更适合并说明原因。',
      hint: '看文档结构化程度：目录清晰的适合结构化切片，纯散文适合固定+重叠。',
      answer: '典型结论：手册类按标题切后每个「政策条目」天然成片；固定长度会把「报销标准」切成两半。表格密集的文档两种都翻车，需要表格特殊处理（整表成片或转结构化文本）。',
    },
    pmLens: [
      '文档预处理流水线是 RAG 产品的成本中心：抽取、清洗、切片、元数据标注的人力与算力都发生在这里，且知识源越多维护越重。产品规划时把「接入一种新文档类型」当一个小项目排期，而不是一行配置。',
      '切片参数应做成可配置、可 A/B 的实验项：切多大、重叠多少、按什么结构切——不同知识源的最优解不同。把切片策略参数化，后续 3.2 的评估集才能驱动它持续进化。',
    ],
  },

  '3.1.2': {
    goals: [
      '掌握向量入库与近邻检索的完整流程',
      '理解 HNSW 索引的直觉原理与索引选型逻辑',
      '区分「先过滤再检索」与「先检索再过滤」',
    ],
    concepts: [
      {
        t: '入库与检索流程',
        body: [
          '离线：切片 → Embedding 批量向量化 → 连元数据写入向量库。在线：问题向量化 → 近邻检索 top-K → 元数据过滤 → 返回切片。两条管线必须用同一个 Embedding 模型（同一版本）。top-K 是重要参数：起点 3~5，配重排序再收窄。',
        ],
      },
      {
        t: 'Embedding 模型选型四看',
        body: [
          '一看语言支持（中文任务选中文优化过的 BGE / Qwen-Embedding 系）；二看维度（影响存储速度，不直接决定质量）；三看 MTEB / C-MTEB 榜单初筛；四用自建评估集终选。选型即基础设施采购：换模型 = 全量重建 + 重评，迁移成本要提前算。',
        ],
      },
    ],
    deepDive: [
      {
        t: 'HNSW：跳表思想的高维版',
        body: [
          '精确近邻搜索要遍历全库，百万级以上不可行。HNSW（Malkov & Yashunin）的解法是「分层可导航小世界图」：把向量组织成多层图，顶层稀疏（长边，快速跨域）、底层稠密（短边，精确定位）；检索从顶层入口贪心下降——先大跳接近目标区域，再逐层细化，只触碰 O(log N) 量级的节点。',
          { formula: '查询复杂度 ≈ O(log N)（对比暴力扫描 O(N)）；代价：内存占用高 + 图构建慢 + 增删有碎片' },
          '直觉类比：先坐高铁到目标城市，再换地铁到街区，最后步行到门牌——每一层都「只找最近的邻居前进」。它几乎是所有主流向量库（Milvus、Qdrant、pgvector、Chroma）的默认索引，理解它你就能理解各库「内存换速度」的配置项到底在调什么。',
        ],
      },
      {
        t: '索引选型与过滤方向',
        body: [
          '按库的规模定：万级以下精确搜索（零漏检，无需索引）；百万级 HNSW（毫秒检索、内存换速度）；超大规模 IVF（倒排分桶，先选桶再桶内搜）。中小知识库不必纠结，默认配置即可——检索质量的上限在切片与嵌入模型，不在索引。',
          '过滤方向是容易踩的性能坑：post-filtering（先检索 top-K 再按权限过滤）在权限收紧时会让结果大量被截掉甚至清零；pre-filtering（先按元数据过滤再在子集内检索）保住召回但可能破坏 HNSW 图遍历效率。主流库对两者支持不一——权限隔离场景（B 端常见）选库时必须实测这项。',
        ],
      },
    ],
    papers: [
      {
        title: 'Efficient and robust approximate nearest neighbor search using Hierarchical Navigable Small World graphs', authors: 'Malkov & Yashunin', year: 2016, venue: 'arXiv / IEEE TPAMI 2018',
        url: 'https://arxiv.org/abs/1603.09320',
        why: 'HNSW 索引原始论文：几乎所有主流向量库的底层算法，「向量数据库为什么快」的物理答案。',
        contributions: ['多层导航小世界图结构 + 贪心下降检索', '对数级查询复杂度，高召回率可调（ef 参数）', '成为 faiss、Milvus、pgvector 等全部主流实现的默认索引'],
        pmLens: '读引言即可。理解 HNSW 后，向量库的选型争论会褪去大半——底层算法相同，真正的差异在运维形态、过滤能力与生态集成。',
      },
    ],
    readings: [
      { title: 'Embeddings creation guide', author: 'OpenAI 官方文档', url: 'https://platform.openai.com/docs/guides/embeddings', why: '官方嵌入指南：生成、维度、相似度计算与检索用例。' },
      { title: 'pgvector — Open-source vector similarity search for Postgres', author: 'Andrew Kane (GitHub)', url: 'https://github.com/pgvector/pgvector', why: '用 Postgres 做向量检索的最流行开源方案：向量与业务数据同库，过滤与事务天然解决。' },
      { title: 'Chroma 官方文档', author: 'Chroma', url: 'https://docs.trychroma.com', why: '面向 LLM 应用的轻量向量库，原型期零运维首选。' },
    ],
    mistakes: [
      {
        wrong: '向量库选型是 RAG 项目最关键的决策。',
        right: '百万片以内的知识库在任何主流库里效果几乎无差别。拉开差距的是切片与 Embedding 选型。库的决策标准是运维形态与过滤能力，不是性能跑分。',
      },
      {
        wrong: '相似度高就说明检索结果是对的。',
        right: '余弦相似度衡量「语义空间距离」，不是「能回答这个问题」。泛泛相关的高分段落会挤掉冷门的权威段落——用评估集测召回质量，别看分数自我安慰。',
      },
    ],
    practice: {
      task: '把上一课的切片入库（Chroma 或 FAISS 任选），准备 5 个测试问题检查 top-3 是否包含正确答案片段，记录命中率——这是你的迷你评估集。',
      hint: '命中率低先别换库：检查漏检案例的切片质量与问题-答案措辞差距。',
      answer: '若命中率 3/5：先查切片是否把答案切碎、问题和答案的用词差距大不大（考虑后续 query 改写）。这两招通常救回大部分漏检，比换向量库有效得多。把评估问题集版本化管理，后面每课都靠它量化。',
    },
    pmLens: [
      '向量库的选型写「五年可用」标准：运维形态（谁维护）、权限过滤能力（pre/post-filter 实测）、规模增长预期、私有化要求——四项决定方案，检索性能反而最后看。',
      'pgvector 的隐藏产品优势：向量与业务数据同库意味着「权限过滤用一条 SQL」、事务一致、备份复用——对已有 Postgres 技术栈的团队，它常常是总成本最低的起点，值得在架构评审上为它辩护。',
    ],
  },

  '3.1.3': {
    goals: [
      '用 LangChain（或手写）组装完整检索问答链',
      '掌握 LlamaIndex 五阶段架构：把评估当一等公民',
      '用 Streamlit 完成知识库助手的最小部署',
    ],
    concepts: [
      {
        t: '检索问答链的组装',
        body: [
          'LangChain 视角：Loader → TextSplitter → Embeddings + VectorStore → Retriever → PromptTemplate → LLM。每段职责清晰可替换——理解了每环，框架就是便利而非黑盒。不用框架 50 行也能写通：检索 + 模板 + 调用。建议两条路都走，才知道框架省了什么、藏了什么。',
        ],
      },
      {
        t: '拼装模板与引用约束',
        body: [
          '标准模板三段：指令区（仅根据资料回答、没有就说没有、标注引用编号）、资料区（编号切片）、问题区。空检索兜底写进链路：结果为空或相似度过低时直接说「知识库无相关内容」——强答比不答危害大，这条要在代码里保证，不是提示词里求模型。',
        ],
      },
    ],
    deepDive: [
      {
        t: 'LlamaIndex 五阶段：评估是一等公民',
        body: [
          'LlamaIndex 官方把 RAG 拆为五个阶段：loading（加载多源数据）→ indexing（切分与嵌入）→ storing（存储索引）→ querying（检索与生成）→ evaluation（评估）。注意第五阶段：把 evaluation 作为架构的一等公民而不是事后的补救——这与本站 3.2 的立场完全一致，也与 Jerry Liu 在生产 RAG 演讲中的主张相同：数据摄取质量与查询设计决定了 RAG 的上限，模型只是最后一环。',
          '值得记住的架构启示：五阶段中前三个是离线管线（可慢慢优化、充分测试），后两个是在线路径（受延迟与成本约束）。把优化工作尽量搬到离线侧（更好的切片、更准的索引、离线重排），在线侧只做轻量拼装——这是 RAG 系统延迟与成本控制的总原则。',
        ],
      },
      {
        t: '部署形态的演进路径',
        body: [
          'Notebook 原型（验证检索质量）→ Streamlit 内部工具（十几行代码获得上传/聊天/引用展示界面，llm-universe 第 4 章的标准收官动作）→ API 服务 + 前端（对外产品形态）。每一步迁移都有成本，先让数据质量说话再投入工程——多数知识库项目死在「跳过验证直接上工程」。',
          '上线前检查清单：密钥走环境变量、索引持久化（重启不重建）、会话隔离、日志记录每次命中的切片 ID（为 3.2 的评估备料）。这四条是「demo」与「工具」的分界线。',
        ],
      },
    ],
    videos: [
      { title: 'Building Production-Ready RAG Applications', speaker: 'Jerry Liu (LlamaIndex CEO)', minutes: 30, lang: 'en', url: 'https://www.youtube.com/watch?v=TRjq7t2Ms5I', why: 'LlamaIndex 创始人亲讲生产级 RAG 的数据摄取与查询设计——离线侧重于在线侧的核心主张。' },
    ],
    readings: [
      { title: 'RAG Tutorial', author: 'LangChain 官方文档', url: 'https://python.langchain.com/docs/tutorials/rag/', why: '官方 RAG 教程：从加载到检索到生成问答的最小可运行链路。' },
      { title: 'Introduction to RAG（五阶段指南）', author: 'LlamaIndex 官方文档', url: 'https://developers.llamaindex.ai/python/framework/understanding/rag/', why: '官方把 RAG 拆为 loading/indexing/storing/querying/evaluation 五阶段，评估是一等公民的架构观。' },
      { title: 'Streamlit 官方文档', author: 'Streamlit', url: 'https://docs.streamlit.io', why: '纯 Python 几行代码给 LLM 应用套上 Web 界面，知识库助手的标配部署路径。' },
    ],
    mistakes: [
      {
        wrong: '框架搭好了，RAG 系统就完成了。',
        right: '链路跑通只是「能跑」，离「可用」差评估与优化——不测召回、不看引用真实性的 RAG 上线就是盲飞。3.2 才是拉开质量差距的部分。',
      },
      {
        wrong: '引用标注一定真实。',
        right: '模型可能编造引用编号或张冠李戴。代码级校验：提取答案中的 [n]，核对存在性，并用 LLM 判分抽查论断与被引片段的相关性。引用是约束手段，不是可信保证。',
      },
    ],
    practice: {
      task: '完成你的私人知识库助手：LangChain（或手写）问答链 + 引用展示 + Streamlit 界面，并接入 3.1.2 的评估问题集跑一遍基线。',
      hint: '先把「仅根据资料回答 + 空检索兜底」写进指令区，再装界面。',
      answer: '验收清单：① 正常问题答案附真实引用；② 问知识库外的问题明确说没有；③ 重启应用索引不重建；④ 每个问答日志里有命中切片 ID。到这里，一个诚实可溯源的知识库 MVP 完成。',
    },
    pmLens: [
      '部署路径即投入节奏：内部工具期用 Streamlit 控制成本，验证数据质量后再投工程。在检索质量未验证前启动前端设计，是知识库项目最常见的浪费——先让评估集说话。',
      '引用展示是信任设计的核心组件：引用要可点击回源、高亮原文片段、标注「AI 生成请核对」的提示。把引用做成产品亮点而非合规尾巴——它同时服务可信度与用户效率，是知识库产品最值得打磨的界面。',
    ],
  },

  '3.2.1': {
    goals: [
      '掌握 RAG 三层指标：检索层、生成层、系统层',
      '理解 RAGAS 的自动化指标计算与「无参考评估」的意义',
      '建立「先量化、再优化」的工作方式与误差棒意识',
    ],
    concepts: [
      {
        t: '三层指标体系',
        body: [
          '检索层（先看这里）：命中率/召回率、MRR（正确片段排多前）。生成层：忠实度（答案忠于资料吗）、答案相关性、引用真实性。系统层（业务视角）：端到端准确率、拒答恰当率、延迟与单次成本。检索不行，生成层无从谈起。',
        ],
      },
      {
        t: '评估问题集的构建',
        body: [
          '50~100 条起步；覆盖问题类型分布（事实/流程/对比/计算）；含 10%~20% 知识库中没有答案的陷阱题（测拒答）；每条标注期望答案或应命中的片段 ID。上线后用真实用户问题持续替换人造题，评估集版本化管理。',
        ],
      },
    ],
    deepDive: [
      {
        t: 'RAGAS：无参考的自动化评估',
        body: [
          'RAGAS 的贡献是让评估不依赖人工标注的标准答案：用 LLM 把答案拆成一条条「声明（claim）」，逐条核对能否被检索上下文支持——得到忠实度（faithfulness）；问题与答案的语义一致度——答案相关性；再加检索侧的上下文精确率/召回率。整套指标只需要「问题 + 上下文 + 答案」三样现场产物，新问题零成本评估。',
          { formula: '忠实度 ≈ 支持的声明数 / 总声明数；答案相关性 ≈ 从答案反推出原问题的概率（LLM 判）' },
          '它的局限同样要懂：LLM 判分有偏置（偏爱长答案）、跨语言稳定性有限。工程姿势：RAGAS 做日常回归的自动化层，人工标注的小金标集做校准层——两者对不上时先怀疑 judge，再怀疑系统。',
        ],
      },
      {
        t: 'RAG 三角与误差棒',
        body: [
          'TruLens 的 RAG Triad 把「回答是否可信」拆成两条边三个量：上下文相关性（检索到的材料和问题相关吗）、忠实度/groundedness（答案被材料支持吗）、答案相关性（答案回应了问题吗）。三条边都成立，回答才可信——任何一个角失效都能定位到具体环节（检索或生成），这是它比端到端准确率更有诊断价值的原因。',
          '统计学防线（呼应 1.4.4）：Anthropic 的误差棒论文证明评测题目的聚类相关性会让朴素标准误被低估 3 倍以上。RAG 评估集天然高聚类（同主题问题成串）——「优化后召回率提升 5%」必须配重复实验与置信区间，否则很可能是噪声。',
        ],
      },
    ],
    videos: [
      { title: 'Evaluating and Tracking LLM Experiments with TruLens', speaker: 'Josh Reini (TruEra)', minutes: 30, lang: 'en', url: 'https://www.youtube.com/watch?v=FVdGAfR2OqQ', why: 'TruLens 团队成员演示用 RAG 三角实际评估并迭代应用——指标到工程操作的落地示范。' },
    ],
    papers: [
      {
        title: 'RAGAS: Automated Evaluation of Retrieval Augmented Generation', authors: 'Shahul Es, Jithin James et al.', year: 2023, venue: 'arXiv / EACL demo',
        url: 'https://arxiv.org/abs/2309.15217',
        why: 'RAG 自动化评估框架的源头：faithfulness / answer relevance / context 指标体系与无参考评估方法的出处。',
        contributions: ['定义 faithfulness 等可 LLM 计算的 RAG 指标', '无参考评估：新问题无需人工标注即可评', '同名开源库成为 RAG 评估的事实标准工具'],
        pmLens: 'RAGAS 让「每次改动都评估」的成本降到接近零——把它的指标接入 CI，RAG 的迭代就从手艺变成工程。',
      },
      {
        title: 'Adding Error Bars to Evals: A Statistical Approach to Language Model Evaluations', authors: 'Evan Miller (Anthropic)', year: 2024, venue: 'arXiv',
        url: 'https://arxiv.org/abs/2411.00640',
        why: '评估的统计学正名之作：聚类相关性使朴素误差被低估 3 倍以上，小差距对比不可信（1.4.4 读原则，本课用在 RAG 评估集上）。',
        contributions: ['指出评测题目的聚类效应与修正方法', '给出成对比较的显著性检验流程', '配套官方博客可直接落地'],
        pmLens: 'RAGAS 分数天生带聚类（同主题问题成串）——汇报「召回率从 72% 提升到 78%」之前，先跑重复实验确认它不是噪声。',
      },
    ],
    readings: [
      { title: 'RAG Triad（RAG 三角）', author: 'TruLens 官方文档', url: 'https://www.trulens.org/getting_started/core_concepts/rag_triad/', why: '官方定义 context relevance / groundedness / answer relevance 三角评估法，故障定位的诊断框架。' },
    ],
    mistakes: [
      {
        wrong: '改了切片 / 换了模型，抽问几个感觉更好，就上线。',
        right: '人工抽问方差极大且不可复现。没有评估集的「感觉优化」无法比较版本，还常按下葫芦浮起瓢。评估集跑分（配重复实验）是唯一诚实的对比。',
      },
    ],
    practice: {
      task: '为你的知识库构建 30 条评估问题集（含 5 条陷阱题），用 RAGAS（或手写指标）计算忠实度与 top-3 命中率，跑 3 次取均值并观察波动幅度。',
      hint: '陷阱题期望行为是「明确说不知道」；波动幅度会告诉你单次分数的含金量。',
      answer: '典型基线：普通问题命中率 60%~80%、拒答正确率常低于 50%（模型爱强答）、3 次跑分波动 3~5 个点。把均值 ± 波动一起记入基线——下一课的每项优化都拿它们验证增量。',
    },
    pmLens: [
      '评估即验收 SOP：RAG 产品的每次迭代（换嵌入模型、调切片、加重排）都过同一套评估集，分数进发布决策。把「基线 → 变更 → 新分数（含波动）」写成标准汇报格式，团队会从争论「感觉」进化到对齐「数字」。',
      'RAGAS 化的评估可以直接产品化：给企业客户交付的 RAG 平台自带「知识库健康分」（忠实度、命中率、拒答正确率），是差异化卖点——评估能力本身就是 B 端付费点。',
    ],
  },

  '3.2.2': {
    goals: [
      '掌握检索侧四大优化：混合检索（RRF）、重排序、query 改写、元数据过滤',
      '理解粗排-精排两级架构（Bi-Encoder vs Cross-Encoder）的分工',
      '学会按评估数据定位瓶颈环节，避免盲目堆技巧',
    ],
    concepts: [
      {
        t: '先诊断，再优化',
        body: [
          '用评估集把失败案例分两类：检索失败（正确片段没进 top-K）与生成失败（片段在但答案错）。检索失败修检索，生成失败修提示词或换模型——顺序反了白费力气。检索失败再细分：措辞不匹配 → query 改写；术语精确匹配 → 混合检索；排序边缘擦过 → 重排序。对症下药。',
        ],
      },
      {
        t: '生成侧优化与优化纪律',
        body: [
          '上下文精排（最相关的放开头结尾，1.3.2 位置偏差对策）、冗余切片去重、引用约束强化。优化纪律：一次只改一个变量，跑评估集看增量，每项优化记录进决策日志。RAG 进阶没有玄学，只有「评估驱动的迭代纪律」。',
        ],
      },
    ],
    deepDive: [
      {
        t: '混合检索的融合数学：RRF',
        body: [
          '向量检索管语义（「退货」≈「退款流程」），关键词检索 BM25 管精确（型号「XR-200」不能被语义模糊掉）。两路结果怎么合并？RRF（Reciprocal Rank Fusion，2009）给出优雅答案：不看原始分数（两者分数量纲不同没法比），只看排名。',
          { formula: 'RRF score(d) = Σ_over_lists  1 / (k + rank_i(d))    （k 常取 60，排名越靠前贡献越大）' },
          'RRF 的优美之处：无需调分数量纲、对任意多路召回通用、一个排名函数走天下。它出自 SIGIR 2009 的比较研究——比学习型融合更稳。今天几乎所有「混合检索」按钮背后的默认融合算法就是这一行公式。',
        ],
      },
      {
        t: '粗排-精排：两种编码器的分工',
        body: [
          'Bi-Encoder（双塔，SBERT 式）：查询与文档各自独立编码成向量，用余弦相似度比对——可以离线建索引，毫秒级检索，但两段文本没有交互，精度有天花板。Cross-Encoder（交叉编码器）：查询与文档拼在一起过同一个 Transformer，token 级交互后输出相关分——精度显著更高，但每个文档对都要跑一次前向，无法离线索引。',
          { formula: '工程解：Bi-Encoder 宽召回 top-20（快而糙）→ Cross-Encoder 精排 top-3（准而慢）；精度收益集中、延迟只增加一次重排调用' },
          'HyDE 补第三块拼图：措辞鸿沟严重的场景（问题口语、答案书面），先让 LLM 生成一篇「假设性答案文档」，再用它去检索——假设文档与真实文档同分布，语义距离骤缩。代价是多一次 LLM 调用，适合问题改写收益大的场景。',
        ],
      },
    ],
    papers: [
      {
        title: 'Reciprocal Rank Fusion outperforms Condorcet and individual Rank Learning Methods', authors: 'Cormack, Clarke & Büttcher', year: 2009, venue: 'SIGIR',
        url: 'https://plg.uwaterloo.ca/~gvcormac/cormacksigir09-rrf.pdf',
        why: 'RRF 多路召回融合算法的原始论文（无 arXiv 版，官方 PDF）：混合检索的数学基础。',
        contributions: ['证明简单排名融合 RRF 优于复杂的学习型融合与单一检索', '无需训练、无量纲问题的通用融合公式', '成为今天所有混合检索系统的默认算法'],
        pmLens: '「一行 2009 年的公式」支撑着今天所有 RAG 产品的混合检索按钮——工程界最实用的技术往往朴素到不可思议。评估供应商方案时可以直接问：「你们用什么融合？RRF 的 k 取多少？」',
      },
      {
        title: 'Precise Zero-Shot Dense Retrieval without Relevance Labels（HyDE）', authors: 'Gao et al. (CMU)', year: 2022, venue: 'ACL 2023',
        url: 'https://arxiv.org/abs/2212.10496',
        why: '「先让 LLM 生成假设文档再检索」的 query 改写源头论文：零标注解决问题-文档的措辞鸿沟。',
        contributions: ['假设性文档（Hypothetical Document Embeddings）方法', '零样本：不需要任何相关性标注即超越现有多检索基线', '揭示「问题与答案不同分布」这一检索失败的结构性原因'],
        pmLens: '用户的提问方式与文档的书写方式永远有鸿沟——HyDE 是弥合鸿沟的标准武器之一。客服、工单检索类产品优先实测它。',
      },
      {
        title: 'Sentence-BERT: Sentence Embeddings using Siamese BERT-Networks', authors: 'Reimers & Gurevych', year: 2019, venue: 'EMNLP',
        url: 'https://arxiv.org/abs/1908.10084',
        why: '本课重读它的另一面：论文同时给出 Bi-Encoder（召回）与 Cross-Encoder（精排）双架构——粗排-精排两级检索的架构出处（1.2.2 读句向量，本课读检索架构）。',
        contributions: ['双塔结构实现高速语义检索（离线索引）', 'Cross-Encoder 结构实现高精度相关判别（在线精排）', '两种结构的速度-精度权衡测量，奠定两级检索范式'],
        pmLens: '「同一篇论文的两个架构，撑起了 RAG 的两级管线」——这是溯源学习的趣味：今天产品里的每层技术，都能回到它最初被提出并测量过的地方。',
      },
    ],
    readings: [
      { title: 'Rerank 概述', author: 'Cohere 官方文档', url: 'https://docs.cohere.com/docs/rerank-overview', why: '官方解释 rerank 模型如何对召回结果精排，商用 rerank API 的参考实现。' },
      { title: 'Contextual Retrieval', author: 'Anthropic 官方', url: 'https://www.anthropic.com/news/contextual-retrieval', why: '官方工程数据：语境增强分块 + BM25/嵌入混合检索 + 重排的组合方案，失败率降幅有完整数字。' },
    ],
    mistakes: [
      {
        wrong: '一上来堆所有高级技巧：混合检索 + rerank + 改写全家桶。',
        right: '全家桶让复杂度翻倍且无法归因哪个组件在起作用（或帮倒忙）。正确路径：基线 → 诊断瓶颈 → 单项优化 → 评估验证 → 保留有效项。多数项目最后只需要其中一两项。',
      },
    ],
    practice: {
      task: '针对 3.2.1 的基线做一轮优化：给失败案例逐条标注原因，挑最大公约数类实施一项针对性优化（RRF 混合检索或 rerank 二选一），重跑评估集对比命中率与拒答率，写入决策日志。',
      hint: '含型号/编号的查询适合混合检索；口语化问题适合 query 改写（HyDE）。',
      answer: '典型结果：含编号查询混合检索后命中率明显提升（关键词管精确匹配）；口语问题 HyDE 收益大。记录决策日志（改了什么、分数变化多少、置信区间）——这份日志在面试与团队协作中，比「我搭过 RAG」有说服力得多。STAGE 03 毕业。',
    },
    pmLens: [
      '优化组合拳的成本收益表是产品文档：每项优化（混合检索/rerank/HyDE）都有「收益（命中率提升）× 成本（延迟与单价增加）」两个数。给客户承诺 SLA 时，这张表决定你能承诺多快的响应与多高的准确率。',
      'rerank 自建还是采购：Cohere 等商用 rerank API 开箱即用按量计费，自建 cross-encoder 省单价但增运维。判断公式与 2.1.3 的 TCO 同构——流量小先用商用 API 验证收益，流量大再谈自建。',
    ],
  },
}
