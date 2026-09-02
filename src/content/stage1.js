// STAGE 01 · AI 系统地图 —— 18 课正文（溯源式深读版）
// 结构：goals 直觉概念 concepts → 原理深挖 deepDive → 视频讲座 videos → 源头论文 papers → 权威资料 readings → 误区 mistakes → 练习 practice → 产品视角 pmLens
export default {
  '1.1.1': {
    goals: [
      '说清「机器学习」和「写规则编程」的本质区别',
      '完整走一遍一次训练步：前向 → 损失 → 反向 → 更新',
      '知道过拟合的机制与四种标准对策',
    ],
    concepts: [
      {
        t: '从写规则到喂数据',
        body: [
          '传统编程是人写规则：if 温度大于 30 就开空调。但「识别一张猫的照片」这类任务规则根本写不出来——猫的形态太多了。机器学习把思路反过来：人提供大量「输入 + 正确答案」的样本，让算法自己找出一套内部规则。',
          '这套内部规则在神经网络里就是「参数」：一个现代大模型有千亿个可调的数字，训练就是在反复微调这些数字，直到模型的输出足够接近正确答案。',
        ],
      },
      {
        t: '损失函数：给「错得多离谱」打分',
        body: [
          '训练需要一个客观的打分器。损失函数（Loss）衡量模型当前输出与正确答案的差距：差距越大，损失越高。有了打分，「学习」就变成了一个明确的优化问题：调整参数，让损失尽可能低。',
        ],
      },
      {
        t: '梯度下降：在迷雾中下山',
        body: [
          '把损失想象成一片起伏山地的高度，参数是你所在的位置。你看不清全貌（参数太多算不尽），但能感受脚下的坡度——这就是「梯度」。沿下坡方向迈一小步，反复亿万次，就是梯度下降的全部。',
        ],
      },
    ],
    deepDive: [
      {
        t: '一次训练步的完整旅程',
        body: [
          '每一步训练分四拍：① 前向传播——数据流过网络算出预测；② 算损失——预测与正确答案的差距量化成一个数；③ 反向传播——用链式法则从损失出发逐层往回算出「每个参数该为这个错误负多少责任」（即梯度）；④ 参数更新——每个参数朝让它负责任变小的方向挪一小步。',
          { formula: 'w_new = w_old − η · ∂L/∂w    （η 是学习率，∂L/∂w 是梯度）' },
          '这一行更新公式就是所有深度学习框架的心脏。1986 年 Rumelhart、Hinton 与 Williams 的论文证明：链式法则可以让梯度高效穿过任意多层网络——多层网络从此变得可训练，深度学习的大门由此打开。',
        ],
      },
      {
        t: '为什么用「随机」梯度下降',
        body: [
          '理论上该用全部数据算梯度再更新（批梯度下降），但数据太大算不起。实践用 mini-batch：每次随机抽一小批（如 32 条）近似整体梯度。这种近似带来的「噪声」反而是特性——它帮助参数跳出局部的小坑（局部极小值），不会过早卡死。',
          '现代优化器 Adam 在此基础上为每个参数自适应调整步长（梯度经常变的参数走小步、稳定的走大步），是当前默认选择。产品视角只需记住：训练速度与稳定性的差异，大多来自优化器与学习率调度，而非网络结构本身。',
        ],
      },
      {
        t: '过拟合：背题 vs 会做题',
        body: [
          '当参数量远大于数据量，模型有能力直接「背下」训练集——训练损失趋近零，但在没见过的数据上表现糟糕，这就是过拟合。诊断方法：把数据切为训练集 / 验证集 / 测试集，训练损失下降而验证损失上升的拐点就是过拟合的起点。',
          '标准对策四件套：更多数据（治本）、正则化（给大权重加罚分，如 weight decay、dropout）、早停（在验证损失拐点停训）、数据增强。工程纪律是：测试集绝不参与任何调参决策——一旦泄漏，「模型变好」只是幻觉。',
        ],
      },
    ],
    videos: [
      { title: 'The spelled-out intro to neural networks and backpropagation: building micrograd', speaker: 'Andrej Karpathy', minutes: 146, lang: 'en', url: 'https://www.youtube.com/watch?v=VMj-3S1tku0', why: '从零手写一个自动求导引擎，公认最透彻的反向传播工程课。看不懂公式时，看代码会突然通。' },
      { title: 'Backpropagation, intuitively (Deep Learning Chapter 3)', speaker: '3Blue1Brown', minutes: 13, lang: 'en', url: 'https://www.youtube.com/watch?v=Ilg3gGewQ5U', why: '13 分钟可视化讲清梯度如何逐层回传，直觉入门首选，先看它再看 Karpathy。' },
    ],
    papers: [
      {
        title: 'Learning representations by back-propagating errors', authors: 'Rumelhart, Hinton & Williams', year: 1986, venue: 'Nature',
        url: 'https://www.nature.com/articles/323533a0',
        why: '反向传播的原始出处（Nature 论文，无 arXiv 版）。让「用梯度训练多层网络」从不可能变为标准流程，整个深度学习时代由此起跑。',
        contributions: ['证明链式法则可高效计算多层网络中每个参数的梯度', '提出通过学习内部表示（representation）解决复杂任务，而非人工设计特征', '在 XOR、家族树等当时难题上给出可行解，扭转了神经网络研究的寒冬'],
        pmLens: '你不需要会推导它，但要知道：训练能工作靠的是 1986 年的这个发现。所有「大模型烧钱训练」的起点在这里。',
      },
    ],
    readings: [
      { title: 'CS231n Optimization Notes', author: 'Stanford CS231n 课程讲义', url: 'https://cs231n.github.io/optimization-1/', why: 'Stanford 官方讲义，用最简数值例子推导损失、梯度与链式法则；与 optimization-2 连读可覆盖反向传播全推导。' },
    ],
    mistakes: [
      {
        wrong: 'AI 是程序员写好了所有规则，所以它「懂」自己在做什么。',
        right: '模型的规则（参数值）是从数据里自动拟合出来的，没有任何人工逐条编写。它没有「懂」的概念，只是在统计规律上做得很好。',
      },
      {
        wrong: '训练时损失越低越好，应该一直训到损失为 0。',
        right: '在训练集上损失为 0 往往意味着「背题」：模型记住了样本却不会泛化，这叫过拟合。工程上用测试集监控真实能力，宁可损失略高也要泛化好。',
      },
    ],
    practice: {
      task: '用「下山」的比喻向自己解释：为什么学习率设得太大会导致训练失败？再把一次训练步的四拍（前向→损失→反向→更新）默写出来。',
      hint: '想想在狭窄的 V 形山谷里迈一大步会发生什么。',
      answer: '步子太大可能直接跨过谷底落到对面更高的坡上，损失不降反升甚至发散（数值爆炸）。四拍：前向传播算预测 → 损失函数量化差距 → 反向传播逐层算梯度 → 参数沿负梯度方向更新。',
    },
    pmLens: [
      '训练成本结构决定产品节奏：一次大模型预训练的算力成本以百万美元计，这解释了为什么模型厂商的版本发布有固定节奏、为什么你的产品路线图不能绑定「下个月模型就会变聪明」的假设。把模型能力的升级当外部依赖来管理，就像管理一个不受你控制的供应商。',
      '「过拟合」是产品事故的常见根因：内部演示惊艳、上线即翻车，多半是评估集泄漏或与真实分布不一致。建立「评估集 = 产品验收标准」的意识：验收数据必须模拟真实用户分布，且定期换血防止隐性泄漏。',
    ],
  },

  '1.1.2': {
    goals: [
      '区分监督、无监督、强化学习各自解决的问题形态',
      '理解自监督学习为什么是 LLM 时代的关键前提',
      '能用「监督信号从哪来」给任何 AI 需求快速定性',
    ],
    concepts: [
      {
        t: '三种范式一句话区分',
        body: [
          '监督学习：有标准答案的题海训练——给模型「输入 + 正确输出」，如垃圾邮件分类。无监督学习：没有答案，自己找结构——如把用户聚成几类。强化学习：不给标准答案，只给反馈信号——模型做动作、环境给奖励，学的是「一系列决策」而非「单个预测」。',
        ],
      },
      {
        t: 'LLM 把三种范式都用上了',
        body: [
          '预训练像自监督：拿互联网文本玩「猜下一个词」，文本自己提供答案，无需人工标注。SFT 是监督学习：人类示范高质量回答。RLHF 是强化学习：用人类偏好当奖励信号优化行为。三个阶段在 1.1.3 课逐一展开。',
        ],
      },
    ],
    deepDive: [
      {
        t: '范式之下的统一数学形式',
        body: [
          '三种范式其实都在「优化一个目标函数」，差别只在监督信号的来源：监督学习最小化预测与标签的差距（如交叉熵）；无监督最小化重构误差或数据的描述长度；强化学习最大化累积期望奖励。',
          { formula: 'RL 目标：J(θ) = E[ Σ γ^t · r_t ]    （期望累积折扣奖励）' },
          '统一视角的价值：判断一个 AI 需求的可行性时，第一个问题永远是「目标函数里的信号从哪来、要花多少钱获得」。信号便宜且充足 → 可行；信号昂贵或不存在 → 方案要重新设计。',
        ],
      },
      {
        t: '自监督：LLM 爆发的关键前提',
        body: [
          '传统监督学习的天花板是标注成本——ImageKit 级别的数据集要数百万条人工标签。自监督（self-supervised）绕开了它：把无标注文本构造成「完形填空」，文本自己出题自己当答案，于是「整个互联网」成为了可用训练集。',
          '这个转变的产业意义等同于「燃料从 Whale oil 换成石油」：数据获取成本从线性人工降为接近零的爬取，模型能力于是可以随算力投入平滑扩张（呼应 1.1.5 的 Scaling Laws）。',
        ],
      },
    ],
    videos: [
      { title: 'Stanford CS229: Machine Learning Lecture 1 (Autumn 2018)', speaker: 'Andrew Ng / Stanford', minutes: 75, lang: 'en', url: 'https://www.youtube.com/watch?v=jGwO_UgTS7I', why: '吴恩达官方课程正片，机器学习三大范式的经典开篇，建立完整术语坐标系。' },
    ],
    papers: [
      {
        title: 'Deep Learning（教材，官方免费在线全文）', authors: 'Goodfellow, Bengio & Courville', year: 2016, venue: 'MIT Press',
        url: 'https://www.deeplearningbook.org/',
        why: '深度学习领域公认的标准教材，第 5 章系统定义了监督/无监督/表示学习的数学框架，是「范式」一词的源头文本。',
        contributions: ['给出机器学习统一的「估计器 + 正则化」数学框架', '系统划分监督/无监督/表示学习的问题形态', '第 5 章的泛化、容量、过拟合理论至今是面试与工程的标准语汇'],
        pmLens: '当工具书用：遇到任何 AI 术语，先查它的第 5 章看有没有权威定义，避免被营销话术带偏。',
      },
      {
        title: 'Reinforcement Learning: An Introduction (2nd ed.)（官方免费全文）', authors: 'Sutton & Barto', year: 2018, venue: '教材',
        url: 'http://incompleteideas.net/book/the-book-2nd.html',
        why: '强化学习领域公认「圣经」。RLHF 里的「奖励、策略、价值」全部概念都出自这本书——ChatGPT 的训练报告脚注里就有它。',
        contributions: ['确立「智能体-环境-奖励」的 RL 标准问题框架', '系统化动态规划、时序差分、策略梯度三大方法族', '免费官方全文，是理解 1.1.4 课所有 RL 论文的地基'],
        pmLens: '读第 1 章即可：理解「奖励假说」——一切目标都可以表述为奖励最大化。这是评价所有 AI 产品对齐设计的第一性原理。',
      },
    ],
    readings: [
      { title: 'CS229 Main Notes（课程完整讲义）', author: 'Stanford CS229', url: 'https://cs229.stanford.edu/main_notes.pdf', why: 'Stanford 官方课程讲义，监督/无监督学习的课程级源头文本，比视频更适合快速查阅定义。' },
    ],
    mistakes: [
      {
        wrong: '无监督学习就是「没有目标」的乱学，没什么用。',
        right: '无监督学习有明确目标（压缩、聚类、密度估计），只是没有人工标签。预训练正是靠「下一个词预测」这个自监督目标，从无标注文本中学到了语言与世界的海量规律。',
      },
      {
        wrong: '强化学习=机器人控制那种高大上的东西，跟语言模型无关。',
        right: 'RLHF/RLVR 让 RL 成为 LLM 对齐与推理训练的核心引擎（1.1.4 课展开）。三个范式在同一个模型的三阶段训练里全部登场。',
      },
    ],
    practice: {
      task: '判断以下任务各属于哪种范式，并指出监督信号来源：① 用历史房价预测新房价格；② 把新闻自动分成若干话题；③ 训练客服模型按用户满意度改进话术。',
      hint: '分别问：有没有标签？信号是即时预测还是延迟反馈？',
      answer: '① 监督学习（历史成交价即标签）；② 无监督学习（无预定义话题，模型自聚）；③ 强化学习（满意度是延迟奖励信号）。延伸思考：②如果业务上要求按固定业务类目分类，就变成了监督学习——范式取决于业务约束，不只取决于数据形态。',
    },
    pmLens: [
      '「监督信号在哪」是 AI 需求评审的第一问：有标注数据吗？能自动获得反馈吗（点击、成交、纠错）？如果都要人工标注，成本模型里必须加上标注运营费——这往往是 AI 项目隐性成本的大头，也是「数据飞轮」型产品的护城河来源。',
      '范式选择即产品架构：能拿到实时反馈信号的业务（推荐、定价）适合 RL 化迭代；只有历史存量标注的业务适合监督式一次性交付。把范式判断写进需求文档，能提前暴露一半以上的可行性风险。',
    ],
  },

  '1.1.3': {
    goals: [
      '复述大模型三段式炼成流程，说出每阶段的数据量与算力量级',
      '理解 LIMA 结论：SFT 学的是行为方式而非知识',
      '理解「基座模型」与「对话模型」的商业差异',
    ],
    concepts: [
      {
        t: '预训练：用整个互联网玩文字接龙',
        body: [
          '预训练任务极简：给前文预测下一个 token。为了猜准，模型被迫学会语法、事实、推理甚至代码。此阶段消耗约 99% 算力，产出会「续写」但不会「对话」的基座模型（base model）——你问问题，它可能继续写更多问题。',
        ],
      },
      {
        t: 'SFT 与 RLHF：塑造行为',
        body: [
          'SFT（监督微调）用几万到几十万条人类高质量问答让模型学会「直接回答」的行为格式。RLHF 再进一步：人类对答案排序 → 训练奖励模型 → 强化学习让模型输出获得更高奖励的回答，变得更礼貌、更少胡编、更懂拒绝（详见 1.1.4）。',
        ],
      },
    ],
    deepDive: [
      {
        t: '三阶段的资源量级对比',
        body: [
          '预训练：万亿 token 级数据、数千卡 GPU 月级训练、成本百万美元起。SFT：万级至十万级样本、数百卡时即可。RLHF：十万级偏好标注 + RL 训练轮次。数据「每条成本」相差数个数量级——这决定了产业分工：预训练是巨头的游戏，对齐与微调是创业公司和应用团队可以参与的层。',
          'InstructGPT 论文的工程结论至今有效：1.3B 的对齐后模型在人类偏好上胜过 175B 的未对齐 GPT-3。「小模型 + 好对齐」胜过「大模型 + 裸基座」——这是理解今天模型市场格局（大量中型对话模型竞争）的钥匙。',
        ],
      },
      {
        t: 'LIMA 的「少即是多」',
        body: [
          'Meta 与 CMU 等机构用仅 1000 条精心筛选的问答对微调 LLaMA 得到的 LIMA，在多数场景接近 GPT-4 的用户体验。结论：SFT 数据的质量与多样性远比数量重要——对齐学到的是「行为方式」（怎么答、什么格式、什么语气），不是「知识」。',
          '反面教训同样重要：SFT 数据里如果有大量低质量样本，模型会学到平庸甚至油腻的表达模式，且很难在后续训练中纠正。SFT 数据工程（清洗、去重、风格审校）是被低估的产品工作。',
        ],
      },
    ],
    papers: [
      {
        title: 'Language Models are Few-Shot Learners（GPT-3）', authors: 'Brown et al. (OpenAI)', year: 2020, venue: 'NeurIPS',
        url: 'https://arxiv.org/abs/2005.14165',
        why: '确立「大规模预训练 + 上下文学习」范式的里程碑。也是 prompting 概念的学术起点（1.3.1 会再遇到它）。',
        contributions: ['证明 1750 亿参数下，模型无需微调即可通过示例完成新任务（few-shot）', '系统记录了预训练数据（3000 亿 token）与模型规模的 scaling 行为', '确立「基座模型多任务通用」的产业路径，终结了「一个任务训一个模型」的时代'],
        pmLens: '读第 1、2 节即可。理解「基座模型」这个词的出处，你就理解了为什么今天所有模型厂商的产品矩阵都从 base model 开始分层。',
      },
      {
        title: 'Training language models to follow instructions with human feedback（InstructGPT）', authors: 'Ouyang et al. (OpenAI)', year: 2022, venue: 'NeurIPS',
        url: 'https://arxiv.org/abs/2203.02155',
        why: '首次系统化 Pretraining → SFT → RLHF 三阶段流水线，ChatGPT 的直接技术前身为这条路线正名。',
        contributions: ['定义了三阶段训练流水线，成为行业事实标准', '证明 1.3B 对齐模型的人类偏好评分胜过 175B 原始 GPT-3', '给出标注员 guideline 设计与一致性度量的完整方法（对齐数据工程的范本）'],
        pmLens: '「对齐 1.3B 胜过裸 175B」是你理解「为什么小厂商的对话模型也能好用」的第一篇必读。对齐质量是可以竞争的维度，不只是拼参数。',
      },
      {
        title: 'LIMA: Less Is More for Alignment', authors: 'Zhou et al. (Meta / CMU 等)', year: 2023, venue: 'NeurIPS',
        url: 'https://arxiv.org/abs/2305.11206',
        why: '用 1000 条数据完成对齐的著名实验，把「SFT 学行为不学知识」从直觉变成证据。',
        contributions: ['1000 条精选数据的 LIMA 接近 GPT-4 的对话体验（人类评估）', '提出 Superficial Alignment Hypothesis：对齐主要学表面行为格式', '确立了「数据质量 > 数量」的对齐数据工程原则'],
        pmLens: '它给了垂直行业产品一个低成本路径：几千条高质量行业话术的 SFT，就能让通用模型「像个业内人」。行业差异化在数据不在模型。',
      },
    ],
    readings: [
      { title: 'RLHF: How to train with human feedback', author: 'Hugging Face 官方博客', url: 'https://huggingface.co/blog/rlhf', why: 'HF 官方科普长文，图解串起 SFT → 奖励模型 → RL 全流程，中文读者也可搭配社区译版阅读。' },
    ],
    mistakes: [
      {
        wrong: 'ChatGPT 是从零训练的全新模型，和 GPT-3 是两种东西。',
        right: '对话模型通常是在基座模型上继续 SFT + RLHF 得到的同一套参数的「行为改良版」。预训练赋予知识，后训练塑造行为。',
      },
      {
        wrong: 'SFT 数据越多越好，应该尽量堆量。',
        right: 'LIMA 证明 1000 条精选数据即可完成对齐。堆低质量数据反而教会模型平庸的输出模式。质量、多样性与风格一致性远比数量重要。',
      },
    ],
    practice: {
      task: '为「法律咨询助手」规划三阶段的数据策略：预训练能改吗？SFT 要准备什么数据、多少条？用什么信号当奖励？',
      hint: '预训练动不了（那是厂商的事），你能做的是后两阶段。',
      answer: '预训练不可行（成本百万美元级），产品基于现成基座。SFT：准备 1000~5000 条真实法律咨询的高质量示范回答（含引用法条的格式规范），重点做风格与格式对齐。奖励：律师评审的偏好排序（RLHF）或「引用法条是否真实存在」的可验证奖励（RLVR 思路，更便宜且客观）。',
    },
    pmLens: [
      '「基座 vs 对话模型」是商业分界线：base 模型 API 便宜但难用，chat 模型贵但开箱即用；部分厂商不开放 base。理解这条分界线，你就能看懂模型定价表、能判断「微调开源 base」与「调用闭源 chat」的成本交叉点在哪里。',
      'SFT 数据是可拥有的产品资产：通用能力靠厂商，行业话术、格式规范、拒答边界靠你的 SFT 数据沉淀。这些数据集要像核心代码一样做版本管理、质量审计与防泄漏——它们是竞品最难抄的部分。',
    ],
  },

  '1.1.4': {
    goals: [
      '说出 RLHF → RLAIF → RLVR 的演进逻辑与各自代价',
      '理解 Goodhart 定律与奖励劫持在模型训练中的表现',
      '能解释 o1/R1 类推理模型的产品影响（延迟、成本、准确率的三角）',
    ],
    concepts: [
      {
        t: '为什么 SFT 不够，还要 RL',
        body: [
          'SFT 只能教「模仿示范」，但「什么是好回答」很难穷举示范。强化学习换了教法：不给标准答案，给一个会打分的裁判（奖励模型），让模型自己探索出获得高分的回答方式。它优化的是最终结果的好坏，不是逐步动作的模仿。',
        ],
      },
      {
        t: '奖励模型：人类偏好的可计算代理',
        body: [
          '用人类偏好数据（答案 A 比 B 好）训练出的打分器，可以全天候给模型输出打分。风险也随之而来：模型可能钻空子——生成「奖励模型喜欢」而非「人类真的喜欢」的回答（奖励劫持），这是对齐训练持续对抗的核心矛盾。',
        ],
      },
    ],
    deepDive: [
      {
        t: '对齐训练的三代技术',
        body: [
          'RLHF（2017 奠基、2022 由 InstructGPT 产品化）：人类偏好 → 奖励模型 → PPO 强化学习。成本高在人工标注。RLAIF：用 AI 按原则（宪法）替代人类标注偏好——Anthropic 的 Constitutional AI 把标注成本再降一个量级，且原则可审计、可修订。',
          'RLVR（可验证奖励，2024-2025）：数学答案对错、代码能否通过测试——奖励客观可自动判定，无需任何标注。DeepSeek-R1 证明纯 RLVR 训练能让模型自发涌现长链推理、自我验证与回溯行为，「推理能力是奖励出来的」成为 2025 年最重要的行业结论。',
        ],
      },
      {
        t: 'Goodhart 定律：奖励设计的宿命',
        body: [
          { formula: '当一项指标成为目标，它就不再是一项好指标。（Goodhart\'s Law）' },
          '奖励劫持（reward hacking）的模型案例：奖励模型偏爱长回答 → 模型学会啰嗦；偏爱自信措辞 → 模型编造得更加斩钉截铁。这与人类组织里「KPI 劫持」同构——点击率考核催生标题党。奖励设计不是技术问题，是产品价值观的工程化表达，PM 应当参与奖励准则的制定与审计，而不是把它完全丢给算法团队。',
        ],
      },
    ],
    videos: [
      { title: 'Reinforcement Learning from Human Feedback: Progress and Challenges', speaker: 'John Schulman (Berkeley EECS Colloquium)', minutes: 64, lang: 'en', url: 'https://www.youtube.com/watch?v=hhiLw5Q_UFg', why: 'RLHF 技术负责人（ChatGPT 训练核心人物）亲讲：RLHF 原理、幻觉的成因解释与开放难题。讲者本身就是源头。' },
    ],
    papers: [
      {
        title: 'Deep Reinforcement Learning from Human Preferences', authors: 'Christiano et al. (OpenAI)', year: 2017, venue: 'NeurIPS / Deep RL Workshop',
        url: 'https://arxiv.org/abs/1706.03741',
        why: 'RLHF 技术路线的原始论文：用不到 1% 的交互量，通过人类偏好比较训练出符合人类意图的行为。',
        contributions: ['确立「偏好比较 → 奖励模型 → 策略优化」三段范式', '证明少量人类反馈即可显著对齐复杂行为（backflip 实验）', '直接启发了 InstructGPT 与整个 RLHF 产业实践'],
        pmLens: '它的核心洞见「人类难以直接写出目标，但擅长比较」适用于所有产品评估场景：给用户二选一比让用户打分可靠得多——这正是偏好数据采集的产品方法论。',
      },
      {
        title: 'Constitutional AI: Harmlessness from AI Feedback', authors: 'Bai et al. (Anthropic)', year: 2022, venue: 'arXiv',
        url: 'https://arxiv.org/abs/2212.08073',
        why: 'RLAIF 的源头：用成文「宪法」原则 + AI 自我批评替代大规模人工标注，把对齐成本与可审计性同时解决。',
        contributions: ['AI 自我批评-修订流程：模型按宪法原则改写自己的有害回答再训练', 'RLAIF：用 AI 偏好替代人类偏好训练奖励模型', '对齐准则首次成文化、公开化——价值观从黑箱变成可审计文档'],
        pmLens: '「把价值观写成宪法」是可借鉴的产品治理模式：你的 AI 产品的红线与话术边界，应该像它一样是一份成文、版本化、可审计的文档，而不是散落在提示词里的零散约束。',
      },
      {
        title: 'DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning', authors: 'DeepSeek-AI (Guo et al.)', year: 2025, venue: 'arXiv',
        url: 'https://arxiv.org/abs/2501.12948',
        why: '证明纯 RL + 可验证奖励（不经 SFT 示范）能自发涌现长链推理，2025 年「推理模型」浪潮的技术宣言。',
        contributions: ['R1-Zero：跳过 SFT 直接 RL，推理行为（反思、回溯、验证）自发涌现', '公开完整训练配方（GRPO 算法、奖励规则、课程设计），行业可复现', '推理成本比 o1 低一个量级，把推理模型拉进平价时代'],
        pmLens: 'R1 开源配方直接改变了竞争格局：推理能力从「闭厂魔法」变成「可复现工程」。做产品规划时，把「推理模型的调用成本曲线」纳入半年期假设，别按旧价格表做长期定价。',
      },
    ],
    readings: [
      { title: 'Learning to Reason with LLMs（o1 发布文）', author: 'OpenAI 官方', url: 'https://openai.com/index/learning-to-reason-with-llms/', why: '「推理即强化学习」路线的官方阐述，理解 o1 系产品的技术叙事源头。' },
      { title: "Claude's Constitution（宪法全文）", author: 'Anthropic 官方', url: 'https://www.anthropic.com/news/claudes-constitution', why: 'Anthropic 公开的宪法全文与修订流程，是「AI 产品价值观文档」的最佳实物样本。' },
    ],
    mistakes: [
      {
        wrong: '强化学习就是让模型自己跟自己聊天变聪明。',
        right: 'RL 的关键组件是明确的奖励信号。没有可靠的奖励（人类偏好、AI 按原则判断、或可自动验证的答案），模型只会随机漂移。「奖励从哪来」决定了 RL 训练的上限。',
      },
    ],
    practice: {
      task: '为「写代码助手」设计奖励信号：列出 3 个可自动计算的奖励维度，并各写一个可能的「钻空子」方式与防御。',
      hint: '想想测试通过率、编译成功率、人类采纳率各自能怎么被钻空子。',
      answer: '① 单元测试通过率——空子：写死测试期望值；防御： held-out 隐藏测试集。② 编译/运行成功率——空子：删功能让代码永不报错；防御：加功能完整性校验。③ 人类采纳率——空子：讨好性措辞；防御：与任务完成度指标组合使用。核心思路：单一奖励必被钻空子，多维组合 + 抽样人工审计是现实解。',
    },
    pmLens: [
      '推理模型改变成本-延迟-准确率三角：o1/R1 类模型在复杂任务上准确率显著提升，但延迟与成本数倍于普通模型。产品设计上这意味着「分级调用」成为标配：简单请求走快模型，检测到复杂任务升级推理模型——分级策略本身就是产品能力。',
      '对齐策略即产品性格：不同厂商的对齐路线（Anthropic 宪法式、OpenAI 偏好式、各家安全规范差异）直接决定模型在敏感话题上的表现差异。选型时不只看能力榜单，要看它的价值观文档与你的产品场景是否兼容——B 端采购尤其如此。',
    ],
  },

  '1.1.5': {
    goals: [
      '说出 Scaling Laws 的幂律形式与 Kaplan、Chinchilla 两版结论的差异',
      '掌握涌现能力的正反两方证据，形成自己的判断',
      '能用规模视角解释模型厂商的投入与定价逻辑',
    ],
    concepts: [
      {
        t: 'Scaling Laws：可预测的暴力美学',
        body: [
          'OpenAI 2020 年发现：模型损失随参数、数据、算力的增长按幂律平滑下降——投入扩大 10 倍，损失沿可预测的曲线下降。这意味着「更强的模型」可以提前被算出来，而不是碰运气。整个行业的算力军备竞赛由此获得理论依据。',
        ],
      },
      {
        t: '涌现与它的争议',
        body: [
          '许多能力（多步算术、思维链）在小模型上接近随机，规模跨阈值后突然出现——像悬崖而非斜坡。但 2023 年斯坦福团队反驳：换用平滑指标后曲线其实连续，「涌现」部分是度量方式的假象。这场争论对工程决策有直接影响（见产品视角）。',
        ],
      },
    ],
    deepDive: [
      {
        t: '幂律的形状与含义',
        body: [
          { formula: 'L(N) ≈ (N_c / N)^α    （损失 L 随参数 N 按幂律下降，α 为正的幂指数）' },
          '幂律的几何特性：在双对数坐标下是一条直线。含义有两层：收益绝对可预测（同一条直线可以外推）；但相对收益边际递减（参数翻倍只换来固定比例的损失下降，且越往后越难）。这解释了「为什么模型越来越大、单位智能的成本却必须靠工程优化来降」。',
        ],
      },
      {
        t: 'Chinchilla 的算术：参数与数据的等比扩张',
        body: [
          'DeepMind 2022 年修正 Kaplan 的结论：在固定算力预算下，最优策略不是把参数堆到最大，而是参数量 N 与训练数据 D 等比例扩张——经验法则约为每个参数 20 个 token。70B 模型配 1.4 万亿 token，胜过 280B 配 3000 亿。',
          '这一修正直接催生了「小而数据足」的模型世代（Llama 系、后续开源模型都按 Chinchilla 比例设计），也把行业竞争从「参数军备」部分转向「数据工程」：高质量数据的获取、清洗与配比成为核心能力。',
        ],
      },
      {
        t: '涌现之争：能力悬崖还是度量假象',
        body: [
          'Wei et al.（2022）盘点数百个任务：多数任务性能随规模平滑提升，少数任务（多步算术、词语排序）在某阈值后跳变——命名为涌现能力（emergent abilities）。Schaeffer et al.（2023）反驳：这些「跳变任务」的指标（如「完全答对才算对」）天然非线性，换成连续指标（每个 token 的对数概率）后曲线平滑——涌现更像「度量选择的产物」。',
          '工程上两方都有用：相信「涌现」的人会为下一个规模档位下注；相信「假象」的人会先修评估指标。安全策略上则应保守假设：能力可能突变，权限设计不能按当前能力线性外推。',
        ],
      },
    ],
    videos: [
      { title: 'Neural Scaling Laws and GPT-3', speaker: 'Jared Kaplan (论文一作 / Anthropic 联合创始人)', minutes: 75, lang: 'en', url: 'https://www.youtube.com/watch?v=sNfkZFVm_xs', why: '一作亲讲 Scaling Laws 的物理直觉与来龙去脉，讲者是理论物理出身，把幂律讲得像自然定律。' },
    ],
    papers: [
      {
        title: 'Scaling Laws for Neural Language Models', authors: 'Kaplan et al. (OpenAI)', year: 2020, venue: 'arXiv',
        url: 'https://arxiv.org/abs/2001.08361',
        why: '首次系统给出损失随参数/数据/算力的幂律，整个行业算力军备竞赛的理论起点。',
        contributions: ['损失与参数量、数据量、算力在三档上均服从幂律（对数坐标直线）', '给出学习率、批大小、上下文长度的缩放配方', '让「训练更大模型」从赌博变成可计算的投资决策'],
        pmLens: 'Scaling Laws 是理解模型厂商融资规模与发布节奏的钥匙：他们按可预测的回报曲线下注算力。你的产品规划同理——模型能力的改善是「可预期的斜率」，不是不可知的黑箱。',
      },
      {
        title: 'Training Compute-Optimal Large Language Models（Chinchilla）', authors: 'Hoffmann et al. (DeepMind)', year: 2022, venue: 'NeurIPS',
        url: 'https://arxiv.org/abs/2203.15556',
        why: '修正 Kaplan 结论：固定算力下参数与数据应等比扩展（约 20 token/参数），重塑了此后所有模型的训练配方。',
        contributions: ['用三种独立方法交叉验证最优 N:D 比例', '证明 70B/1.4T token 的 Chinchilla 全面超越 280B 的 Gopher', '把行业注意力从参数规模转向数据质量与配比'],
        pmLens: '「每个参数 20 个 token」这个数字值得记住：它是判断一个新模型「训练是否足料」的粗略标尺，也是理解为什么合成数据、行业数据成为厂商新战场的背景。',
      },
      {
        title: 'Emergent Abilities of Large Language Models', authors: 'Wei et al. (Google)', year: 2022, venue: 'TMLR',
        url: 'https://arxiv.org/abs/2206.07682',
        why: '「涌现能力」概念的提出者：规模跨阈值后性能跳变的系统盘点，此后所有涌现争论的正方源头。',
        contributions: ['定义涌现：小模型近随机、跨阈值突现的能力', '盘点百余任务的涌现现象（算术、CoT、多任务语言理解等）', '提出两种解释：过度缝合的度量 or 新能力 Mechanism 的解锁'],
        pmLens: '「涌现」是过去两年所有「下一代模型将彻底改变 X」叙事的技术注脚。读它，你就能分辨哪些是营销话术、哪些是有出处的科学叙事。',
      },
      {
        title: 'Are Emergent Abilities of Large Language Models a Mirage?', authors: 'Schaeffer, Miranda & Koyejo (Stanford)', year: 2023, venue: 'NeurIPS（最佳论文）',
        url: 'https://arxiv.org/abs/2304.15004',
        why: '对涌现论最有力的反方：换用连续/平滑指标后，多数「涌现」变为平滑增长——度量方式制造了悬崖。',
        contributions: ['证明涌现现象与非线性/不连续评测指标强相关', '提出改用连续指标（如编辑距离、对数概率）后曲线普遍平滑', '获 NeurIPS 2023 最佳论文，成为评估方法学的分水岭'],
        pmLens: '这是「评估指标决定你看到的世界」的最佳案例。产品验收指标的设计（全对才算成功 vs 部分给分）会直接改变你对模型能力的判断——先修度量，再谈能力。',
      },
    ],
    readings: [
      { title: 'The Scaling Hypothesis', author: 'Gwern', url: 'https://gwern.net/scaling-hypothesis', why: '公认的经典长文，把幂律外推为「规模至上」的完整思想论证；写作早于 ChatGPT，事后验证力惊人。' },
    ],
    mistakes: [
      {
        wrong: 'Scaling Laws 说明只要继续堆算力，AGI 自然到来。',
        right: '幂律是经验拟合而非物理定律，受数据、架构、成本多重约束。行业已从「单一规模轴」转向多轴扩展：数据质量、后训练（RL）、推理时计算同样关键。',
      },
      {
        wrong: '涌现说明能力凭空出现、无法预测，小模型测了也白测。',
        right: 'Schaeffer 证明多数「涌现」与度量方式相关：换平滑指标后能力连续增长。正确姿势是修评估指标 + 用连续指标观测趋势，而不是放弃评测或迷信跳变。',
      },
    ],
    practice: {
      task: '团队想提升模型数学能力，预算二选一：参数翻倍，或数学数据翻 10 倍。用 Chinchilla 逻辑与涌现度量视角，写出你的决策备忘（含你会先做的实验）。',
      hint: '先问两个问题：当前参数-数据比离 1:20 有多远？评估指标是不是「全对才得分」的离散指标？',
      answer: '参考备忘：① 先查当前训练 token/参数比，远低于 20 → 数据优先；数学数据占比极低 → 翻 10 倍数学数据性价比远高于翻参数。② 评估换连续指标（按步骤给分）重测基线，排除「指标假象」。③ 用 1/10 预算做缩比实验验证斜率后再全量投入。这就是「用 Scaling Laws 的思路做产品级实验设计」。',
    },
    pmLens: [
      'Scaling Laws 是 AI 行业宏观叙事的底账：厂商的融资额（买算力）、API 定价（摊成本）、发布节奏（训练周期）都沿幂律曲线排布。读懂它，你就能把「模型厂商的发布会」从新闻变成可解读的经营信号。',
      '涌现争议的产品决策守则：不要用小模型的失败断言产品上限（涌现可能存在）；也不要为「涌现叙事」预付费（可能是度量假象）。一切以自有评估集上的连续指标趋势为准——这句话值得写进你团队的 AI 采购规范。',
    ],
  },

  '1.2.1': {
    goals: [
      '亲手推一遍 BPE 的合并循环，理解词表是怎么长出来的',
      '说出 token 边界引发的三类工程问题及对策',
      '建立 token 经济学意识：成本、上下文、多语言差异',
    ],
    concepts: [
      {
        t: '模型不认识字，只认识 token',
        body: [
          '文本进入模型前经过分词器（tokenizer）：切成 token 序列，每个 token 查表变成编号。主流方案是 BPE（字节对编码）：从字节出发，反复把最高频的相邻片段合并成新 token。高频词占 1 个 token，生僻词被拆碎。',
        ],
      },
      {
        t: 'token 决定三件工程大事',
        body: [
          '上下文窗口按 token 计（128K 指的是 token 数）；API 按 token 计费；输出按 token 生成。中文常 1~2 token/字、英文约 0.75 词/token——同内容不同语言，成本与可用窗口差异显著。',
        ],
      },
    ],
    deepDive: [
      {
        t: 'BPE 的机械步骤',
        body: [
          '训练一个 BPE 分词器只有四步：① 把全部语料按字节切到最碎（初始词表 256 个字节）；② 统计语料中所有相邻 token 对的出现频率；③ 把频率最高的那一对合并成新 token 加入词表；④ 重复 ②③ 直到达到目标词表大小（如 10 万）。',
          { formula: '语料 "low low lower" → 合并对 (l,o)：lo·w lo·w lo·wer → 合并 (lo,w)：low low low·er → …' },
          '注意：BPE 是「为语料定制」的——词表由训练语料分布决定。这解释了为什么同一个词在不同模型里 token 数不同，也解释了以英文语料为主的分词器处理中文时更碎更贵。',
        ],
      },
      {
        t: 'token 边界引发的三类工程问题',
        body: [
          '① 字符串操作失灵：模型看到的是 token 不是字母，所以数不出 "strawberry" 里有几个 r，也难以可靠反转字符串。对策：这类操作交给工具/代码执行（function calling），别让模型「心算」。',
          '② 数字切分不均："12345" 可能被切成 1 个或多个 token，且切法不稳定 → 算术运算不可靠。对策：数值计算交给代码，关键数字用结构化字段（JSON）传递而非自然语言。③ 多语言成本不均：低资源语言的字符被字节级拆碎，同等内容 token 数可差 1.5~2 倍 → 成本与有效窗口双重劣势。Karpathy 的 tokenizer 一讲系统复盘了全部怪象，minbpe 是配套的极简参考实现。',
        ],
      },
    ],
    videos: [
      { title: "Let's build the GPT Tokenizer", speaker: 'Andrej Karpathy', minutes: 134, lang: 'en', url: 'https://www.youtube.com/watch?v=zduSFxRajkE', why: '从零实现 BPE，讲透 token 边界导致的种种 LLM「怪癖」（数字、多语言、字符串操作）。看前 40 分钟即可覆盖核心。' },
    ],
    papers: [
      {
        title: 'Neural Machine Translation of Rare Words with Subword Units', authors: 'Sennrich, Haddow & Birch', year: 2016, venue: 'ACL',
        url: 'https://arxiv.org/abs/1508.07909',
        why: '把 BPE 从压缩领域引入神经 NLP 的原始论文，现代所有子词分词的起点。',
        contributions: ['将字节对编码（BPE）适配为神经 MT 的子词切分方案', '解决开放词表问题：生僻词/专名不再 OOV，而是拆成子词单元', 'BPE 因此成为 GPT 系、Llama 系等主流分词器的基础算法'],
        pmLens: '它解决的是「开放词表」问题——产品里用户的昵称、新造词、错别字不会被拒之门外。理解这一点，你就明白为什么 AI 能「读」任何输入，但代价是 token 计费的不确定性。',
      },
      {
        title: 'Language Models are Unsupervised Multitask Learners（GPT-2）', authors: 'Radford et al. (OpenAI)', year: 2019, venue: '技术报告（官方 PDF）',
        url: 'https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf',
        why: '第 2.2 节给出了 GPT 系字节级 BPE tokenizer 的实现细节——GPT 家族分词方案的第一手出处。',
        contributions: ['字节级 BPE：任意 Unicode 输入都可表示，不再需要特殊 UNK 符号', '词表 50257 的选择权衡：词表大小 vs 序列长度 vs embedding 参数量', '确立「分词器与模型一起发布」的工程惯例'],
        pmLens: '「字节级」三个字对产品很重要：用户输入任何 emoji、生僻字符都不会报错——鲁棒性来自分词器设计，而不是模型聪明。',
      },
    ],
    readings: [
      { title: 'Summary of the tokenizers', author: 'Hugging Face 官方文档', url: 'https://huggingface.co/docs/transformers/tokenizer_summary', why: 'HF 官方对比 BPE / WordPiece / Unigram 三大算法的文档，十分钟建立分词算法全景。' },
      { title: 'minbpe', author: 'Andrej Karpathy (GitHub)', url: 'https://github.com/karpathy/minbpe', why: '配套视频的极简 BPE 参考实现，约百行代码，读完视频的最好练习伴侣。' },
    ],
    mistakes: [
      {
        wrong: '模型处理「字」，所以中英文能力差异来自语言本身难度。',
        right: '很大一部分差异来自分词：以英文为主的词表把中文切得更碎，同样一段话中文消耗更多 token——看得更模糊还更贵。新一代分词器（含中文语料训练）已显著改善。',
      },
      {
        wrong: '让模型数一段话里某字出现几次，是检验智能的好题目。',
        right: '这是 token 表示层面的结构性困难，不是智能问题。任何字符串精确操作都应交给工具执行。把结构性缺陷误判为能力缺陷，会导致错误的产品需求（1.3.5 泛化边界课展开）。',
      },
    ],
    practice: {
      task: '打开任一在线 tokenizer 沙盒（OpenAI / 智谱等），分别输入「人工智能改变了世界」和 "AI changed the world"：记录 token 数、观察切分边界，并据此估算你的产品若以中文为主的成本系数。',
      hint: '注意哪些词被合并成单 token，哪些字被拆开。',
      answer: '典型观察：英文短词多为 1 token，中文多为 1~2 token/字且边界不按词语。以中文为主的产品，按「中文字数 ≈ 1.5~2 × token」估算成本与窗口占用，并要求供应商提供中文语料占比高的分词方案——这是中文 AI 产品选型的隐形关键项。',
    },
    pmLens: [
      'token 经济学是定价模型的分子：中英文成本差异（同内容可差 1.5~2 倍）、上下文窗口对长文档功能的硬约束、输出长度上限对生成类功能的体验影响——三件事都由 tokenizer 决定。做成本模型与功能边界设计时，把「目标语言的 token 系数」列为必填参数。',
      '字符串精确操作永远走工具不走模型：数字母、格式校验、精确替换这类需求，让模型调用代码完成。这不是模型能力问题而是表示层的结构性特征——写需求时把它们标注为「工具执行类」可以省下大量无效的模型调优投入。',
    ],
  },

  '1.2.2': {
    goals: [
      '理解 word2vec 如何从共现统计中学出语义方向',
      '掌握 SBERT 的对比学习思想，知道它为什么优于词向量平均',
      '建立 Embedding 选型的评测意识（MTEB 与自建评估集）',
    ],
    concepts: [
      {
        t: '把「意思」变成坐标',
        body: [
          'Embedding 把词/句/文档映射为高维向量（如 1536 维），训练目标是：意思相近的东西在空间中彼此靠近。国王 − 男人 + 女人 ≈ 女王——语义概念对应空间中的稳定方向，语义第一次可以被几何计算。',
        ],
      },
      {
        t: '相似度 = 距离，检索 = 找近邻',
        body: [
          '判断两段话像不像 = 算两个向量的余弦相似度。「找相似」变成数学问题：问题向量化，在库里找最近的 K 个点。语义搜索由此替代关键词匹配——「怎么退货」能命中「售后退款流程」，没有一个字相同。',
        ],
      },
    ],
    deepDive: [
      {
        t: 'word2vec 的两个训练任务',
        body: [
          'Mikolov 2013 年提出两种自监督任务：CBOW（用上下文猜中心词）与 Skip-gram（用中心词猜上下文）。训练完成后，网络隐层权重就是词向量。数学上，词向量的点积近似于词对在语料中的共现统计（PMI）——「意义」被证明可以从「用法统计」中涌现，这是分布式语义假说最著名的实证。',
          { formula: 'king − man + woman ≈ queen    （语义关系的向量算术）' },
          '工程细节「负采样」：完整 softmax 要对整个词表（数万词）归一化，太贵；负采样把问题改成「真实上下文 vs 随机采的假上下文」的二分类——训练成本骤降。这个「把多分类问题降为对比问题」的思想，一路延续到 CLIP（1.4.2）与现代对比学习。',
        ],
      },
      {
        t: '从词到句：池化的缺陷与 SBERT 的解法',
        body: [
          '把 BERT 输出的词向量取平均得到句向量，效果很差：一词多义互相污染、高频虚词主导方向、向量长度不可控。2019 年 Sentence-BERT 给出标准解法：孪生（Siamese）结构让两句过同一个编码器，再用对比损失训练——相似句拉近、不相似推远。句向量从此「为相似度而生」。',
          '这条演化线对选型的启示：检索用的 Embedding 模型必须是「对比学习训练 + 面向相似度优化」的（SBERT 后继者们），不能拿生成模型的内部向量凑数。2022 年 MTEB 基准把「哪个嵌入模型好」从玄学变成榜单——但榜单第一 ≠ 你的业务第一（见产品视角）。',
        ],
      },
    ],
    videos: [
      { title: 'Stanford CS224N: NLP with Deep Learning, Lecture 1 — Intro & Word Vectors', speaker: 'Chris Manning / Stanford Online', minutes: 84, lang: 'en', url: 'https://www.youtube.com/watch?v=rmVRLeJRkl4', why: 'Stanford 官方课程正片，word2vec 与分布式假说的权威开篇讲。' },
    ],
    papers: [
      {
        title: 'Efficient Estimation of Word Representations in Vector Space（word2vec）', authors: 'Mikolov et al. (Google)', year: 2013, venue: 'arXiv / NIPS workshop',
        url: 'https://arxiv.org/abs/1301.3781',
        why: '语义向量的起点：让「语义可计算」从语言学假说变成工程现实，向量检索整条产业线由此出发。',
        contributions: ['提出 CBOW / Skip-gram 两个高效训练结构', '揭示向量算术规律（king − man + woman ≈ queen）', '负采样等技巧让百万词表上的训练变得可行'],
        pmLens: '它是「统计即语义」的实证起点。产品含义：语义检索质量的本质是共现统计的质量——语料相关性决定检索上限，换算法救不了烂语料。',
      },
      {
        title: 'Sentence-BERT: Sentence Embeddings using Siamese BERT-Networks', authors: 'Reimers & Gurevych', year: 2019, venue: 'EMNLP',
        url: 'https://arxiv.org/abs/1908.10084',
        why: '现代句向量的奠基论文：孪生网络 + 对比目标，让「句子的向量」真正可用于余弦相似度检索。',
        contributions: ['孪生/三胞胎结构微调 BERT 产出定长句向量', '在语义检索与 STS 任务上大幅超越词向量平均与聚类基线', '确立对比学习作为嵌入模型训练的标准范式'],
        pmLens: '选 Embedding API 时，你在买的其实是 SBERT 范式的后裔。判断供应商方案是否专业的快速问题：「你们的模型用什么对比学习数据训练的？」——答不上来的要小心。',
      },
      {
        title: 'MTEB: Massive Text Embedding Benchmark', authors: 'Muennighoff et al.', year: 2022, venue: 'arXiv / EMNLP',
        url: 'https://arxiv.org/abs/2210.07316',
        why: '嵌入模型的标准评测基准（几十任务、多语言），Embedding 选型的行业坐标系。',
        contributions: ['统一 50+ 嵌入任务的评测协议与排行榜', '揭示「没有全能冠军」：各模型在不同任务族上互有胜负', '后续 C-MTEB 等中文榜单的母体'],
        pmLens: '榜单是初筛不是终审：用 MTEB 圈出前五名，再用你自己的业务数据（3.2.1 的评估集方法）做终选——嵌入模型的「业务效果」与「榜单排名」经常不一致。',
      },
    ],
    readings: [
      { title: 'The Illustrated Word2vec', author: 'Jay Alammar', url: 'https://jalammar.github.io/illustrated-word2vec/', why: '公认最好的 word2vec 图解，配大量可视化，非算法背景也能读通透。' },
      { title: 'GloVe 项目页（含原论文与预训练向量）', author: 'Stanford NLP', url: 'https://nlp.stanford.edu/projects/glove/', why: 'GloVe 官方源头（EMNLP 2014，无 arXiv 版）：从全局共现矩阵学向量的另一条路线，与 word2vec 对照阅读。' },
    ],
    mistakes: [
      {
        wrong: '向量数据库有魔力，能把信息「存进」模型。',
        right: '向量库存的是文档向量本身，不改变模型参数。检索只是把相关文本「递」给模型看，模型每次都要现场阅读——它并没有记住你的文档。',
      },
      {
        wrong: '不同 Embedding 模型的向量可以混在一个库里比较。',
        right: '不同模型的向量空间互不相通。建库与查询必须用同一个模型（且同一版本），换模型 = 全量重建索引。',
      },
    ],
    practice: {
      task: '列出 5 对句子（含同义改写、主题相近、字面近语义反各若干），预测余弦相似度高低排序，再用任一 Embedding API 实测，对照你的预测。',
      hint: '「这家店服务好」vs「这家店服务不好」——先猜猜它会给你多少分。',
      answer: '经典翻车：字面几乎相同的反义句相似度极高——向量模型擅长主题相似而非逻辑精确。产品防御：情感极性判断不能只依赖向量检索，需要在生成层或重排序层加极性校验。把你踩到的坑写进检索评估集。',
    },
    pmLens: [
      'Embedding 选型是一次「基础设施采购」：换模型 = 全量重建索引 + 重跑评估，切换成本高。因此选型文档要按「五年可用」标准写：模型效果（自建评估集）、多语言能力、维度与成本、供应商稳定性、私有化可行性。',
      '检索质量是搜索/推荐型 AI 产品的第一体验指标：上线后每周跟踪「零结果率」「首条命中率」「用户改写率」三个指标，它们是嵌入模型是否匹配业务分布的传感器——比任何榜单都诚实。',
    ],
  },

  '1.2.3': {
    goals: [
      '默写注意力公式并逐项解释 Q/K/V、缩放与 softmax 的作用',
      '说清注意力 n² 复杂度与长上下文成本的关系',
      '理解多头机制为什么优于单头',
    ],
    concepts: [
      {
        t: '注意力要解决的问题',
        body: [
          '「苹果发布了新手机」和「苹果很甜」里「苹果」含义不同——静态词向量无法表达一词多义。自注意力让每个词看着整句话动态决定自己的表示：看到「手机」偏向公司，看到「甜」偏向水果。同时第 1 个词与第 1000 个词直连（长距离依赖不再逐词传递）。',
        ],
      },
      {
        t: 'Q / K / V：查询、索引、内容',
        body: [
          '每个词生成三个角色：Query（我在找什么）、Key（我是什么标签）、Value（我的实际内容）。每个词拿 Q 与所有 K 算匹配度 → softmax 成权重 → 按权重加权求和所有 V。「划重点」由此完成，每个词的新表示都是全句信息的加权混合。',
        ],
      },
    ],
    deepDive: [
      {
        t: '自注意力的完整计算',
        body: [
          { formula: 'Attention(Q, K, V) = softmax( QKᵀ / √d_k ) · V' },
          '逐项拆解：① QKᵀ——所有查询与所有键做点积，得到 n×n 的两两相关度矩阵；② 除以 √d_k——点积随维度增大而方差变大，不缩放会让 softmax 饱和（梯度消失），这是论文里容易被忽略但关键的细节；③ softmax——把每一行相关度归一化为和为 1 的注意力权重；④ 乘 V——按权重混合所有词的内容向量。',
          '结果：每个词的新表示 = 以「与自己相关的程度」为权重的全句信息加权平均。语言学的结构（指代、修饰、搭配）不需要硬编码，全部由数据学会的权重模式承载——这是 2017 年这篇论文最革命的地方：结构从架构中消失，回到了数据里。',
        ],
      },
      {
        t: 'n² 复杂度：长上下文的物理代价',
        body: [
          '注意力矩阵是 n×n：序列长度翻倍，计算量与显存占用约翻四倍。这就是「长上下文贵且慢」的数学根源——128K 窗口不是免费的长，而是按平方增长的贵。工程界的应对分两路：数学近似（稀疏注意力、线性注意力、滑动窗口）与系统工程（FlashAttention 重排显存访问，不改变数学但快数倍）。',
          '产品层只需记住结论：长上下文的成本近似随长度平方增长，且利用率随位置衰减（1.3.2 的 Lost in the Middle）。「把整个知识库塞进上下文」在数学上就是错的——RAG 之所以必要，一半原因在这里。',
        ],
      },
      {
        t: '多头：让不同的头看不同的关系',
        body: [
          '一组注意力只能学一种「关系模式」。多头注意力并行跑 h 组独立的 Q/K/V 投影（每维更低），让不同的头分别专注句法、指代、语义、位置等模式，最后拼接融合。注意力头各司其职的现象在可解释性研究里被反复观察（有的头专管指代、有的专管前后照应）。',
          '想亲手造一个：Karpathy 的《Let\'s build GPT》从 n-gram 一路写到多头 Transformer；3Blue1Brown 的注意力一章用动画把 Q/K/V 矩阵画给你看。文字读不懂时，这两个视频是互为补充的解法。',
        ],
      },
    ],
    videos: [
      { title: "Let's build GPT: from scratch, in code, spelled out", speaker: 'Andrej Karpathy', minutes: 116, lang: 'en', url: 'https://www.youtube.com/watch?v=kCc8FmEb1nY', why: '逐行手写一个 GPT：把注意力从 bigram 开始一步步长出来，公认最好的工程化讲解。' },
      { title: 'Attention in transformers, step-by-step (Deep Learning Chapter 6)', speaker: '3Blue1Brown', minutes: 26, lang: 'en', url: 'https://www.youtube.com/watch?v=eMlx5fFNoYc', why: 'Q/K/V 与注意力矩阵的动画可视化，公式看不懂时的最佳替代路径。' },
    ],
    papers: [
      {
        title: 'Attention Is All You Need', authors: 'Vaswani et al. (Google)', year: 2017, venue: 'NeurIPS',
        url: 'https://arxiv.org/abs/1706.03762',
        why: 'Transformer 与自注意力的原始论文，本站所有课程的技术源头都可追溯到这一篇。引用量数十万的现代经典。',
        contributions: ['提出完全基于注意力的 Transformer 架构，抛弃循环与卷积', 'Multi-Head Self-Attention + 位置编码的组合成为此后所有 LLM 的骨架', '训练并行化（不再按时间步串行）让大规模预训练成为可能'],
        pmLens: '论文标题就是产品宣言：注意力「就够了」。理解它，你才能判断各种「新架构」宣传是真突破还是换皮——看它有没有偏离「注意力 + 前馈」的基本盘。',
      },
      {
        title: 'Formal Algorithms for Transformers', authors: 'Tay et al. (DeepMind)', year: 2022, venue: 'arXiv',
        url: 'https://arxiv.org/abs/2207.09238',
        why: '用统一数学伪代码写清所有主流 Transformer 变体的「图鉴」，进阶读者的地图册。',
        contributions: ['统一记号整理 Transformer / Attention 的全部主流变体', '覆盖 ViT、Decoder、Encoder-Decoder、检索式、长文本变体等', '每个变体一页伪代码，工程对照价值极高'],
        pmLens: '放进收藏夹当字典用：任何「新架构」论文出现时，翻到对应页对照，五分钟判断它改了哪一块。',
      },
    ],
    readings: [
      { title: 'The Illustrated Transformer', author: 'Jay Alammar', url: 'https://jalammar.github.io/illustrated-transformer/', why: '公认最经典的 Transformer 图解，把论文每个组件画成动图级插图，先读它再读原文事半功倍。' },
    ],
    mistakes: [
      {
        wrong: '注意力就是「给重要的词更大的权重」这么简单，没有信息交换。',
        right: '注意力是双向的信息流动：每个词的表示都因其他词而重写，是「重写整个序列」而非「加权平均一下」。这正是它能表达复杂结构（指代链、句法树）的原因。',
      },
      {
        wrong: '上下文窗口 128K 意味着模型对每个位置都同样敏感。',
        right: '窗口内都能被注意，但利用率随长度与位置衰减（中间内容易被忽略，见 1.3.2），且成本按平方增长。窗口大 ≠ 该塞满。',
      },
    ],
    practice: {
      task: '对句子「小明把书还给了小刚，因为他要看下一章」：分析「他」的指代对象，并用 Q/K/V 语言描述注意力如何完成消解；再估算上下文从 4K 扩到 64K，单层注意力计算量大约变成几倍。',
      hint: '「他」的 Q 会和哪些词的 K 高度匹配？n 从 4 到 64 是几倍？',
      answer: '「他」的 Q 与「小刚」「还」「看」的 K 高度匹配，注意力权重把这些词的内容流入「他」的新表示，指代消解完成。计算量：n² 关系，n 翻 16 倍 → 计算量约 256 倍。这就是长上下文按平方涨价的直觉来源。',
    },
    pmLens: [
      '懂 n² 复杂度 = 懂长上下文的定价与可行性：跟工程团队讨论「百万上下文为什么贵」「长文档产品该做全文还是检索」时，注意力平方复杂度是你的底气。产品侧结论：优先做「找相关」而不是「塞更长」。',
      '「窗口大」不是采购时的优先级卖点：有效利用率（位置衰减）与成本曲线比标称窗口重要。评估长文能力时，用「中间埋考点」的自建测试而不是看宣传页数字——这一招能帮你在选型中避开大量水分。',
    ],
  },

  '1.2.4': {
    goals: [
      '写出 softmax 公式并解释温度如何改写分布形状',
      '复述解码策略谱系（贪心→beam→top-k→top-p）的演进理由',
      '能为产品场景制定采样参数规范',
    ],
    concepts: [
      {
        t: '每次生成都是一次抽奖',
        body: [
          '模型对「下一个 token」输出的是整个词表的分数（logits），softmax 归一化成概率分布后按分布抽签；抽完拼回文本再算下一个分布，逐 token 循环。同一个问题回答不同，根源在此。',
        ],
      },
      {
        t: 'temperature 与 top-p 两个旋钮',
        body: [
          'temperature 在 softmax 前缩放 logits：调低分布变尖（稳定保守），调高变平（多样发散）。top-p 只保留累计概率达 p 的头部候选重新归一化再抽。前者控制分布形状，后者控制候选范围，两者叠加决定输出的确定性与多样性平衡。',
        ],
      },
    ],
    deepDive: [
      {
        t: 'softmax 与温度的数学',
        body: [
          { formula: 'softmax(z)_i = e^{z_i} / Σ_j e^{z_j}        softmax(z/T)_i = e^{z_i/T} / Σ_j e^{z_j/T}' },
          '指数函数放大差距：logits 上 0.5 的差异，经指数放大后成为显著的概率差。温度 T 是对 logits 的整体缩放：T 越小，指数放大的差距越悬殊，分布越尖（T→0 退化为永远选最大值的贪心）；T 越大差距被压平，长尾 token 获得机会，分布越平。同一模型、不同 T，产品表现完全不同。',
        ],
      },
      {
        t: '解码策略谱系：为什么 top-p 赢了',
        body: [
          '谱系从保守到自由：贪心（永远选最大，稳定但易呆板重复）→ beam search（保留多条候选路径，机器翻译时代的主力）→ top-k（只在前 k 个候选里抽）→ top-p / 核采样（按累计概率动态截断）。',
          'Holtzman 2019 的关键实验：开放式故事生成中，beam search 反而产出重复、通用的「安全文本」，human 文本的分布天然是「头部尖锐 + 长尾不剪」——每一步的合理候选数是动态的，固定 k 不如按累计概率 p 截断。top-p 从此成为开放生成的默认。这份洞察的产品翻译：结构化任务用尖分布（低 T），开放创作用核采样（top-p 0.9~0.95 + 适度 T）。',
        ],
      },
    ],
    papers: [
      {
        title: 'The Curious Case of Neural Text Degeneration', authors: 'Holtzman et al. (UW / AI2)', year: 2019, venue: 'ICLR',
        url: 'https://arxiv.org/abs/1904.09751',
        why: '揭示贪心/束搜索的生成退化并提出 top-p（核采样）——今天所有「温度/top-p」产品参数的学术出处。',
        contributions: ['系统证明 beam search 在开放生成中导致重复与通用化退化', '提出 nucleus (top-p) sampling：按累计概率动态截断', '用分布图证明 human 文本「尖头长尾」特征，奠定解码策略评价框架'],
        pmLens: '你产品里的 temperature/top-p 滑杆，源头就是这篇论文。「创意模式」与「严谨模式」的差异实现，就是这篇论文两行公式的产品化。',
      },
      {
        title: 'Hierarchical Neural Story Generation', authors: 'Fan, Lewis & Dauphin (Meta AI)', year: 2018, venue: 'ACL',
        url: 'https://arxiv.org/abs/1805.04833',
        why: 'top-k 采样等现代解码策略的早期源头（故事生成场景首次系统使用采样解码）。',
        contributions: ['首次在条件故事生成中系统引入采样式解码（含 top-k）', '分层生成框架：先规划骨架再填充细节', '为后续解码策略研究建立了实验范式'],
        pmLens: '分层生成（先大纲后细节）是今天所有「先列提纲再写作」类产品的技术雏形——好的产品交互常常是论文思想的重发现。',
      },
    ],
    readings: [
      { title: 'How to generate text: using different decoding methods', author: 'Hugging Face (Patrick von Platen)', url: 'https://huggingface.co/blog/how-to-generate', why: 'HF 官方长文，配图对比 greedy/beam/top-k/top-p 的实际输出差异，本文描述的现象可视化在这里。' },
      { title: 'API Reference: temperature / top_p', author: 'OpenAI 官方文档', url: 'https://platform.openai.com/docs/api-reference/chat/create#chat-create-temperature', why: '采样参数的官方定义与取值建议——产品参数规范里的「权威引用」来源。' },
    ],
    mistakes: [
      {
        wrong: 'temperature=0 时模型输出永远 100% 相同。',
        right: '实践中仍有微小波动：浮点非确定性、MoE 路由、批处理顺序都可能让个别 token 分叉。强复现需求要锁版本、锁参数并使用服务端确定性模式。',
      },
      {
        wrong: '创意任务就该把 temperature 拉满。',
        right: '过高的温度让分布接近均匀抽样，输出语无伦次、多语言混杂。创意区间 0.7~1.0 + top-p 0.95，多样性交给提示词引导而不是靠抽签混乱。',
      },
    ],
    practice: {
      task: '为三个场景写采样参数规范（temperature / top-p 及理由）：① 合同金额抽取；② 广告标题批量生成；③ SQL 代码生成。',
      hint: '按「出错的代价」与「需要的多样性」两个维度定。',
      answer: '① T 0~0.2：抽取要稳定，多样性是敌人。② T 0.9~1.1 + top-p 0.95：要长尾创意，多样性是资产。③ T 0~0.3：代码错误代价高、正确答案集中，宁可保守；再叠加「生成后自动执行校验」兜底。把规范写进接入文档，避免每个开发者随手乱设。',
    },
    pmLens: [
      '采样参数是产品参数不是技术细节：把「严谨模式 / 平衡 / 灵感模式」做成用户可感知的产品开关（内部映射不同 T/top-p 组合），比让用户面对裸参数更友好——这是可以直接抄进产品的设计模式。',
      '采样参数要进埋点与变更管理：输出质量漂移的高频根因是「有人改了默认温度」。把默认采样参数纳入配置管理与 A/B 实验框架，和提示词同级对待。',
    ],
  },
  '1.3.1': {
    goals: [
      '理解 in-context learning 的机制假说与工程意义',
      '掌握 CoT 生效的原理与它的适用边界',
      '把提示词工程升级为「提示词资产」管理（版本、测试、评审）',
    ],
    concepts: [
      {
        t: 'Prompt 是接口，不是咒语',
        body: [
          'Prompt Engineering 是给概率系统设计输入接口：信息越结构化、约束越明确，输出分布越集中。工程化提示词四要素：角色（你是资深法务）、任务（审查风险条款）、上下文（合同原文）、输出约束（JSON 列出风险项 + 等级 + 依据）。',
        ],
      },
      {
        t: '让输出稳定的三板斧',
        body: [
          '具体化：把「写好一点」换成可验证标准（「不超过 100 字，先给结论」）；给示例：一两个输入输出样例比十句形容词更能定义「好」；给退路：允许模型回答「信息不足」，显著降低编造。',
        ],
      },
    ],
    deepDive: [
      {
        t: 'In-context Learning： prompting 的机制之谜',
        body: [
          'GPT-3 论文的核心发现：不更新任何参数，只在上下文里放几个示例，模型就能完成新任务——这叫 in-context learning（上下文学习）。它与训练的本质区别：「学习」发生在一次前向传播内部，权重冻结。机制至今有争议，主流假说认为注意力在示例间做隐式的模式匹配与「任务定位」——模型在预训练见过海量「输入-输出对」的文本模式，示例激活了对应模式。',
          '工程意义巨大：一个模型通过不同 prompt 服务 N 个产品功能，无需为每个功能训练模型——「提示词即产品逻辑」的成本结构由此成立。这也解释了为什么提示词迭代是 AI 产品最敏捷的开发手段：改一行文本等于改一次「程序」。',
        ],
      },
      {
        t: 'CoT 为什么有效、何时失效',
        body: [
          '思维链（CoT，Wei et al. 2022）让模型「先写推理过程再给答案」。原理：把多步计算显式展开成 token 序列，后续每一步生成都能以前面的推理为条件上下文——相当于把「一层前向传播的计算量」扩展为「串行多 token 的计算量」，模型可用的「思考时间」变长了。',
          '边界一：简单任务（单轮分类、格式转换）无收益甚至降质。边界二：需要真正新知识或精确计算的任务，CoT 给不了——它让模型「更充分地用已有能力」，不增加能力。边界三：o1/R1 类推理模型已内置长链思考，外部 CoT 引导对它们冗余甚至有害。Kojima 等的零样本版本更妙：一句 "Let\'s think step by step" 即可激活推理，无需手写示例——提示词的成本可以低到一句话。',
        ],
      },
    ],
    papers: [
      {
        title: 'Language Models are Few-Shot Learners（GPT-3）', authors: 'Brown et al. (OpenAI)', year: 2020, venue: 'NeurIPS',
        url: 'https://arxiv.org/abs/2005.14165',
        why: '「示例即程序」的开山之作：in-context learning 的发现让 prompting 成为一种编程范式，是一切提示词工程的技术源头。',
        contributions: ['发现 few-shot 示例可在不更新参数的情况下改变模型行为', '系统对比 zero-/one-/few-shot 在数十任务上的表现', '确立「一个通用模型 + 任务提示」的应用范式'],
        pmLens: '它的产业含义：AI 产品的「开发」从训练模型变成设计提示。你的团队交付物清单里，提示词库应该与代码库同级管理。',
      },
      {
        title: 'Chain-of-Thought Prompting Elicits Reasoning in Large Language Models', authors: 'Wei et al. (Google)', year: 2022, venue: 'NeurIPS',
        url: 'https://arxiv.org/abs/2201.11903',
        why: '思维链的原始论文：8 个示例让 PaLM 在数学题上性能翻倍，「让模型先想再答」从此有了出处。',
        contributions: ['在示例中写出推理步骤即可激发多步推理（标准 CoT）', '收益随模型规模出现（小模型无效）——与涌现议题呼应', '数学/逻辑/常识多步基准上一致大幅提升'],
        pmLens: 'CoT 的产品代价是延迟与 token 成本翻倍。用它之前先问：这个任务真的是「多步推理」吗？给用户的呈现里，推理过程要不要露出也是产品决策（透明感 vs 干扰）。',
      },
      {
        title: 'Large Language Models are Zero-Shot Reasoners', authors: 'Kojima et al. (东京大学)', year: 2022, venue: 'NeurIPS',
        url: 'https://arxiv.org/abs/2205.11916',
        why: '一句 "Let\'s think step by step" 即可激发推理的著名发现（Zero-Shot CoT），提示词工程的「极简主义」代表作。',
        contributions: ['证明无需手写推理示例，一句咒语即可激活 CoT', '在 MultiArith 等基准上零样本性能近乎翻倍', '揭示预训练里「推理步骤文本」模式的可激活性'],
        pmLens: '把这句话放进你的提示词工具箱成本为零；但记得它对推理模型（o1/R1 类）已无效——技术手段有保质期，提示词库要随模型代际维护。',
      },
    ],
    readings: [
      { title: 'Prompt engineering guide', author: 'OpenAI 官方文档', url: 'https://platform.openai.com/docs/guides/prompt-engineering', why: 'OpenAI 官方工程指南：指令分层、参考文本、任务拆解、给模型思考时间等六大策略，工程规范的基准线。' },
      { title: 'Prompt engineering overview', author: 'Anthropic 官方文档', url: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview', why: 'Anthropic 官方指南，含 XML 标签隔离、角色预填等独门技巧，与 OpenAI 版对照读收益最大。' },
    ],
    mistakes: [
      {
        wrong: '「请务必」「这非常重要」这类强调措辞能显著提升效果。',
        right: '强调性措辞的收益远不如具体化与示例。模型不缺态度，缺的是明确的标准与边界信息。与其加大力度，不如把验收标准写清楚。',
      },
      {
        wrong: '好提示词一劳永逸，换模型也不用改。',
        right: '提示词与具体模型、版本强耦合：不同模型对指令风格、格式的响应不同。升级模型后必须重跑测试用例集再决定是否调整——没有测试集的提示词库是负资产。',
      },
    ],
    practice: {
      task: '把「帮我总结这篇文章」改造成工程化提示词（角色/任务/上下文/输出约束四要素），并为它写 3 条验收测试用例（含 1 条边界用例）。',
      hint: '输出约束要可校验；边界用例想「空文章」「超长文章」。',
      answer: '参考：「你是科技编辑。把 <article> 内文章总结给赶时间的读者：3 句话摘要（每句 ≤30 字）+ 5 条要点；保留数字与专有名词；资料不足时明确说明。<article>{{全文}}</article>」。测试用例：正常长文（格式合规）；空文章/无实义文章（应明确说无可总结）；超长文（验证截断策略）。三例皆过，提示词才算 v1 完成。',
    },
    pmLens: [
      '提示词是「没有版本管理的代码」——除非你管起来：建立提示词库（场景-版本-负责人-变更记录）+ 绑定测试集（1.4.4 课的方法），每次模型升级或提示词改动跑一遍。这套资产是 AI PM 的核心工作产物，也是团队最重要的知识沉淀之一。',
      '提示词优化的边际收益递减：数据与上下文供给（给模型看什么）的收益通常大于措辞打磨。团队在「咒语调优」上花的时间，应设一个软上限，超时转向建评估集与改上下文结构——这是「专业 AI PM」与「提示词爱好者」的分水岭。',
    ],
  },

  '1.3.2': {
    goals: [
      '复述 Lost in the Middle 的实验设计与 U 型结论',
      '掌握上下文预算分配模型（常驻/半常驻/按需/滚动）',
      '理解压缩与隔离两大工程手段的适用场景',
    ],
    concepts: [
      {
        t: '上下文是模型唯一的工作记忆',
        body: [
          '模型每次推理只知道窗口里的内容——窗口就是它的全部工作记忆。放什么、什么顺序、占多少预算，直接决定输出质量：这就是 Context Engineering，从「怎么问」升级到「给模型看什么」。',
        ],
      },
      {
        t: '稀缺性的三重来源',
        body: [
          '硬上限（窗口大小）、注意力稀释（内容越多单条信息被注意的概率越低，成本还按平方涨）、按 token 计费。三者叠加，「窗口大」不等于「随便塞」。',
        ],
      },
    ],
    deepDive: [
      {
        t: 'Lost in the Middle：位置偏差的实证',
        body: [
          'Stanford 团队的实验设计干净利落：把答案已知地放置在 20 份文档的不同位置，考多文档问答。结果呈 U 型曲线——放开头、结尾的准确率高，放中间骤降 20%+，且模型自己「以为」中间的信息也被处理了。更扎心的是：这个偏差在长窗口模型上同样存在，窗口越大只是曲线整体抬高，形状不变。',
          { formula: '准确率 ≈ f(位置)：开头高 → 中间低 → 结尾回升（U 型）' },
          '工程对策由实验直接给出：关键指令放最前或最后；检索材料放中间时配编号与引用定位要求；重要内容做位置管理而不是听天由命。',
        ],
      },
      {
        t: '上下文预算分配模型',
        body: [
          '把窗口当内存管理，四档预算：常驻区（系统指令、角色、硬约束——永不裁剪）；半常驻区（few-shot 示例、工具说明——低频变更）；按需区（检索材料、当前任务材料——动态拉取、用完即弃）；滚动区（对话历史——摘要化、旧轮次压缩）。',
          '两个进阶手段：压缩（把工具结果截断/摘要化，LLMLingua 甚至用小模型把提示词压缩 4 倍而质量保持）与隔离（把子任务拆给独立上下文的子代理执行，只回传结论——4.2.1 课展开）。压缩管「同样内容更少 token」，隔离管「不该在这的别进来」，两者组合是长会话产品不崩的保命招。',
        ],
      },
    ],
    papers: [
      {
        title: 'Lost in the Middle: How Language Models Use Long Contexts', authors: 'Liu et al. (Stanford)', year: 2023, venue: 'TACL',
        url: 'https://arxiv.org/abs/2307.03172',
        why: '长上下文位置偏差的实证起点：U 型曲线成为所有上下文工程方案的理论依据，RAG 产品设计的必读证据。',
        contributions: ['多文档 QA 受控实验：位置中部的信息提取准确率骤降', '证明窗口扩大不消除偏差，只抬高曲线', '揭示监督数据分布（训练时开头结尾多关键信息）是偏差来源'],
        pmLens: '这是「宣传窗口 ≠ 有效窗口」的证据文件。供应商宣传 1M 上下文时，用它设计一个「中间埋考点」的验收测试，五分钟识破水分。',
      },
      {
        title: 'LLMLingua: Compressing Prompts for Accelerated Inference', authors: 'Jiang et al. (Microsoft)', year: 2023, venue: 'EMNLP',
        url: 'https://arxiv.org/abs/2310.05736',
        why: '提示压缩的代表作：用小模型删「低信息密度」token，压缩 4 倍性能基本保持——「上下文是稀缺资源」的工程解法。',
        contributions: ['用 perplexity 度量 token 信息量指导压缩', '20 倍压缩极限下仍保留关键语义（粗压缩+细压缩分层）', '压缩-推理成本权衡的完整基准'],
        pmLens: '长上下文产品的成本优化路线图：先做结构化取舍（该不该进上下文），再机械压缩（重复、冗词），最后才考虑 LLMLingua 类工具。顺序反了会花冤枉钱。',
      },
    ],
    readings: [
      { title: 'Effective context engineering for AI agents', author: 'Anthropic Engineering', url: 'https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents', why: 'Anthropic 官方工程长文：把上下文当有限资源系统化管理——预算、压缩、子代理隔离、结构化笔记的完整方法论。' },
    ],
    mistakes: [
      {
        wrong: '窗口越大越好，128K 就该塞满。',
        right: '塞满窗口有三重代价：注意力稀释（U 型偏差）、平方级成本、延迟上升。「窗口大」的正确用法是弹性余量，按需供给、动态取舍才是工程姿势。',
      },
    ],
    practice: {
      task: '为「客服助手」设计上下文模板：列出四档预算区各放什么，并写出被裁剪时的裁剪顺序与保留铁律。',
      hint: '区分「每轮必需」与「按需检索」；铁律想「用户的核心诉求」。',
      answer: '参考：常驻区=系统指令+话术边界；半常驻=工具说明+示例对话；按需区=知识库检索片段（按问题动态拉取）；滚动区=历史摘要。裁剪顺序：滚动区旧轮次 → 按需区低相关片段 → 半常驻示例精简；铁律：常驻区永不裁、用户显式说过的关键事实（订单号、诉求）必须保留并优先放窗口两端。',
    },
    pmLens: [
      '上下文规格说明书是 AI 产品的新 PRD：每个功能「给模型看什么、按什么优先级、占多少预算」应该像接口文档一样被写下来、评审、版本化。单位请求 token 数是产品毛利的核心变量，而这个文档就是成本的设计图。',
      '长会话产品的记忆体验是差异化战场：用户感知不到窗口大小，只感知「它忘了我」。摘要的时机、关键信息（订单号、偏好）的主动确认与回显，是 Context Engineering 的产品化——设计好「遗忘策略」和设计好「回答」一样重要。',
    ],
  },

  '1.3.3': {
    goals: [
      '理解 ACI（Agent-Computer Interface）概念：接口质量决定 Agent 成功率',
      '掌握骨架四件套：工具、权限、钩子、技能注入',
      '能用 Anthropic 六模式为任务选择确定性-自主性光谱上的落点',
    ],
    concepts: [
      {
        t: 'Agency 是训练出来的，Harness 是工程师的活',
        body: [
          'learn-claude-code 的核心观点：感知、推理、行动的能力来自模型训练；工程师做的是搭建让能力安全、稳定释放的执行环境——Harness（骨架）。模型是驾驶员，骨架是车：安全带、仪表盘、油门锁定是车的责任。',
        ],
      },
      {
        t: '骨架四大件',
        body: [
          '工具（把决策变成动作的接口，描述质量决定会不会用）；权限（危险动作的审批关卡：白名单放行/灰区询问/黑名单拒绝）；钩子（动作前后插入确定性检查，把「永不许发生的事」从概率变成规则）；技能注入（长规程按需注入上下文，不常驻占窗口）。',
        ],
      },
    ],
    deepDive: [
      {
        t: 'ACI：为模型设计接口，和人机交互一样严肃',
        body: [
          'SWE-agent 论文的核心实验：同一个模型，直接暴露原始 bash 与使用「为模型设计的接口」（搜索命令返回带行号的预览、编辑命令有格式约束与即时校验）相比，后者在 SWE-bench 上成功率大幅领先。论文把这类接口设计命名为 Agent-Computer Interface（ACI），并与 HCI 类比：接口的反馈丰富度、容错性、认知负荷直接决定使用者的表现——只不过这次「用户」是模型。',
          'ACI 设计原则从论文可提炼三条：① 反馈即时且可定位（报错带行号，模型能自我修正）；② 动作集小而正交（命令多而重叠反而降低成功率）；③ 结果展示信息密度高（预览而非全量，省上下文）。这就是 Harness Engineering 的学术化表达——「工具描述怎么写」从此有论文可引。',
        ],
      },
      {
        t: '从模式到产品：Anthropic 六模式',
        body: [
          'Anthropic《Building effective agents》把系统形态排成一个确定性递增/自主性递减的光谱：prompt chaining（链式流水线）→ routing（分类路由）→ parallelization（并行分票）→ orchestrator-workers（主从派发）→ evaluator-optimizer（生成-评审迭代）→ autonomous agent（自主循环）。',
          '选型法则：能用简单模式解决的，绝不上自主 Agent——每增加一级自主性，成本、延迟、不可预测性同步上升。产品视角的用法：把你的 AI 功能按「任务确定性」排序，确定性高的用链条模式控制成本，只有真正开放的任务才给它自主循环。这份光谱就是 AI 产品架构评审的 checklist。',
        ],
      },
    ],
    papers: [
      {
        title: 'SWE-agent: Agent-Computer Interfaces Enable Automated Software Engineering', authors: 'Yang et al. (Princeton)', year: 2024, venue: 'NeurIPS',
        url: 'https://arxiv.org/abs/2405.15793',
        why: '提出 ACI（Agent-Computer Interface）概念并实验证明「接口设计决定 Agent 成功率」——Harness 设计的学术源头。',
        contributions: ['提出 ACI 概念并给出设计原则（反馈即时、动作正交、信息密度）', '证明接口优化带来 SWE-bench 成功率的大幅领先（当时 SOTA）', '把「给模型设计工具」上升为与 HCI 并列的设计学科'],
        pmLens: 'ACI 思维可迁移到任何 AI 产品：给 AI 的工具接口 = 给新员工的工位与工作台。接口描述、反馈形式、容错设计都该有专人负责——这是新的产品职能。',
      },
      {
        title: 'Executable Code Actions Elicit Better LLM Agents (CodeAct)', authors: 'Wang et al.', year: 2024, venue: 'ICML',
        url: 'https://arxiv.org/abs/2402.01030',
        why: '证明「可执行代码」作为统一动作空间优于离散 JSON 工具调用——主流 Coding Agent 的动作层设计依据。',
        contributions: ['代码作为动作：组合、复用、逻辑分支一次表达，工具调用次数大减', 'CodeActAgent 基准上显著优于 JSON 式动作', '交互式执行 + 即时反馈的循环设计被后续 Agent 广泛采纳'],
        pmLens: '它解释了 Coding Agent 产品的动作设计趋势（写代码比点按钮更强）。给非代码场景的启示：找出你领域里「可组合的原子动作语言」，比堆一百个独立按钮更高效。',
      },
    ],
    readings: [
      { title: 'Building effective agents', author: 'Anthropic Engineering', url: 'https://www.anthropic.com/engineering/building-effective-agents', why: 'Anthropic 官方工程文：workflow vs agent 的界定、六大可组合模式、何时不要用 Agent——架构评审的权威 checklist。' },
      { title: 'Claude Code Best Practices', author: 'Anthropic 官方文档', url: 'https://code.claude.com/docs/en/best-practices', why: '官方最佳实践：权限配置、CLAUDE.md、工具策略——harness 使用侧的权威手册。' },
    ],
    mistakes: [
      {
        wrong: 'Agent 的能力上限由提示词写得好不好决定。',
        right: '提示词只影响窗口内行为。工具质量、接口设计（ACI）、权限与上下文供给这些骨架因素，影响大一个量级。提示词调不动时，先检查骨架。',
      },
      {
        wrong: '关键约束写进系统提示词就够了，模型会遵守。',
        right: '提示词是软约束，对抗输入与模型波动都可能击穿。金额上限、路径越界、危险命令必须由权限系统与钩子在代码层 100% 保证——概率部件管灵活，确定性部件管安全。',
      },
    ],
    practice: {
      task: '为「能读写本地文件并执行 shell 命令」的编码 Agent 设计骨架：动作清单按三级权限分类（自动/询问/禁止），并为最危险的动作设计一个 PreToolUse 钩子规则。',
      hint: '按「破坏半径 × 可逆性」分级，不按动作字面类型。',
      answer: '参考：读文件、写工作目录内文件 → 自动；删除文件、安装依赖、git push → 询问；rm -rf、改系统配置、curl|bash → 禁止或强制确认+沙箱。钩子示例：执行 shell 前正则扫描命令串，命中 (rm\\s+-rf|sudo|curl[^|]*\\|\\s*(ba)?sh) 直接拦截并回填「此命令被安全策略禁止」——规则在代码里，不依赖模型自觉。',
    },
    pmLens: [
      'Harness 是 AI 产品的「看不见的 80%」：权限策略、审批流、审计日志、沙箱隔离——这些不写进宣传页的东西，是 B 端客户安全问卷的必答题，也是采购决策的实际权重。AI PM 的产品文档里应该有一份独立的「Harness 规格」。',
      'ACI 设计是新的产品设计职能：你的 AI 员工用什么「工作台」决定了产出质量。把「工具与接口设计评审」加入产品开发流程，与 UI 设计评审同级——这是当前市场上稀缺但正在成型的 AI PM 核心技能。',
    ],
  },

  '1.3.4': {
    goals: [
      '说出 ReAct 的实验证据：为什么推理与行动交替优于各自单干',
      '掌握循环变体谱系（ReAct → Reflexion → ToT）与成本曲线',
      '理解终止条件、错误回填、预算控制三个工程命门',
    ],
    concepts: [
      {
        t: '从单次调用到循环：Agent 的分水岭',
        body: [
          '普通应用问一次答一次；Agent 的跃迁在于模型自己决定调用什么工具，结果回填上下文，再决定下一步——while 循环套住「思考 → 行动 → 观察」。learn-claude-code s01 用不到百行实现这个内核：Agent 没有魔法。',
        ],
      },
      {
        t: 'ReAct：思考、行动、观察',
        body: [
          '模型在循环中交替输出：Thought（我该先查库存）→ Action（调用查询工具）→ Observation（结果回填）→ 下一个 Thought。把推理显式写出来提升复杂任务正确率，也让调试者看得见决策路径。',
        ],
      },
    ],
    deepDive: [
      {
        t: 'ReAct 的实验证据：1+1>2 的交替',
        body: [
          '论文的消融实验最值得记：ReAct vs 纯推理（CoT-only）vs 纯动作（Act-only）。纯推理在 HotpotQA 上幻觉多（没有外部事实校准）；纯动作缺少规划、试错盲目。交替式的 Observation 提供外部事实，纠正推理方向；推理又为下一步动作提供目的——二者互补，幻觉显著减少，小模型上收益更大。',
          '另一个容易被忽略的发现：人类标注的推理轨迹对微调有帮助，但推理轨迹里偶发的错误反而让模型更稳（错误-修正模式教会它自我纠错）。这预示了后来「让 Agent 带着反思跑」的设计方向。',
        ],
      },
      {
        t: '循环的变体谱系与成本曲线',
        body: [
          'ReAct 是线性循环。Reflexion 给循环加「记忆」：失败后模型写一份语言化反思存入记忆，下次尝试带着反思跑——无需更新参数的「强化学习」。Tree of Thoughts 再进一步：每步生成多个候选，用评估器打分、可回溯、可剪枝——线性循环变成搜索树。',
          { formula: '成本/自主性谱系：CoT（纯文本）→ ReAct（线性循环）→ Reflexion（带记忆循环）→ ToT（搜索树）；每升一级，token 成本同步数量级上升' },
          '工程命门三件套：终止条件（步数上限、预算熔断、放弃并上报的出口——死循环是最常见事故）；错误回填（工具报错作为 Observation 交还模型自我修正，错误信息是最宝贵的学习信号）；预算计量（token 与真实资源双轨计量，防止一个循环烧穿成本）。',
        ],
      },
    ],
    videos: [
      { title: '[1hr Talk] Intro to Large Language Models', speaker: 'Andrej Karpathy', minutes: 60, lang: 'en', url: 'https://www.youtube.com/watch?v=zjkBMFhNj_g', why: '一小时讲 LLM 全貌，含 System 2 / Agent 循环专章；建立全景的最佳一小时投资。' },
      { title: 'Software Is Changing (Again)', speaker: 'Andrej Karpathy @ Y Combinator', minutes: 40, lang: 'en', url: 'https://www.youtube.com/watch?v=LCEmiRjPEtQ', why: '提出「部分自主」与生成-验证工作流：Agent 工程化落地的最新论述，PM 视角收益极高。' },
    ],
    papers: [
      {
        title: 'ReAct: Synergizing Reasoning and Acting in Language Models', authors: 'Yao et al. (Princeton / Google)', year: 2022, venue: 'ICLR 2023',
        url: 'https://arxiv.org/abs/2210.03629',
        why: '「思考→行动→观察」循环的原始论文，现代所有 Agent 框架的骨架源头，引用量已是现象级。',
        contributions: ['确立推理与行动交替生成的范式（Thought-Action-Observation）', '消融证明交替优于纯推理与纯行动，幻觉显著减少', '决策可解释性：推理轨迹让 Agent 行为可审计'],
        pmLens: 'ReAct 轨迹是天然的「决策审计日志」：B 端产品要求可解释、可追责时，把 Thought 链展示给审核者（而不是终端用户）是低成本高价值的合规设计。',
      },
      {
        title: 'Reflexion: Language Agents with Verbal Reinforcement Learning', authors: 'Shinn et al.', year: 2023, venue: 'NeurIPS',
        url: 'https://arxiv.org/abs/2303.11366',
        why: '失败后写反思、带着反思重试的「带记忆循环」：无需更新参数的强化学习，Agent 自我改进的源头。',
        contributions: ['语言化反思作为记忆存储，替代参数更新', '自我反思 + 评估信号 + 情景记忆三元结构', 'HumanEval 等基准上较基线大幅提升（92% pass@1）'],
        pmLens: '「失败后写复盘」既是模型机制也是团队机制：Agent 产品的每例失败都应沉淀为可复用的反思条目（FAQ、防护规则），这是产品自我改进的飞轮。',
      },
      {
        title: 'Tree of Thoughts: Deliberate Problem Solving with Large Language Models', authors: 'Yao et al. (Princeton / DeepMind)', year: 2023, venue: 'NeurIPS',
        url: 'https://arxiv.org/abs/2305.10601',
        why: '把单线生成扩展为可回溯、可分支、可评估的搜索树——「让模型慢想」路线（先于 o1 出现）的代表论文。',
        contributions: ['思想步骤作为树节点，支持分支、评估、剪枝、回溯', 'BFS/DFS 搜索策略与 LLM 评估器结合', 'Game of 24 等需规划的推理任务上大幅超越 CoT'],
        pmLens: 'ToT 是「推理时计算」Scaling 的先声：性能用推理成本买。产品含义：同一个模型可以通过「想多久」分层定价——这是推理模型分级产品的思想源头。',
      },
    ],
    readings: [
      { title: 'LLM Powered Autonomous Agents', author: 'Lilian Weng', url: 'https://lilianweng.github.io/posts/2023-06-23-agent/', why: '公认经典：规划-记忆-工具使用三件套定义自主 Agent，Agent 领域被引用最多的综述文章。' },
    ],
    mistakes: [
      {
        wrong: '循环步数越多说明 Agent 越强。',
        right: '步数多常常是失败信号：重复尝试、上下文漂移、目标遗忘。好的 Loop Engineering 追求用更少轮次稳定完成任务——平均步数是评估的核心效率指标（4.2.2）。',
      },
      {
        wrong: '在提示词里写「你是一个自主智能体」就能得到 Agent。',
        right: '没有循环与工具执行，写什么都是单轮问答。Agent 的本体是「循环 + 工具 + 终止条件」这套程序结构，提示词只是循环里的一部分。',
      },
    ],
    practice: {
      task: '为「自动整理下载文件夹」的 Agent 写循环规格：工具清单、一条典型 T-A-O 序列、终止条件、预算上限、以及「文件名全是乱码」这一失败情形的处理路径。',
      hint: '最坏情况路径是设计重点：卡住时它是重试、跳过还是上报？',
      answer: '工具：list_files / read_metadata / move_file。序列示例：Thought(先看有什么) → Action(list) → Obs(50 个文件) → Action(按类型批量移动) → Obs(3 个冲突) → Thought(重命名冲突)。终止：无未处理文件或步数 ≥15。预算：移动 ≤200 个、token 上限 X。失败路径：连续 3 次同类失败 → 跳过并把该文件记入「待人工」清单，最终输出报告——绝不无限重试。',
    },
    pmLens: [
      '步数 = 成本 = 延迟，Agent 产品必须按「任务」定价而非按「调用」：预算熔断（步数/金额上限）是产品必选项。把「平均步数、P95 步数、单任务成本分布」定为 Agent 产品的北极星指标组，它们直接决定毛利与体验。',
      '自主性分级是产品策略的核心画布：全自动（快但险）→ 关键节点人工确认（慢但稳）。在 ReAct 循环里选「哪里放 Human-in-the-loop」（删除前、付款前、外发前）是 AI PM 的标志性设计决策——Karpathy 称之为 partial autonomy，值得反复看那段论述。',
    ],
  },

  '1.3.5': {
    goals: [
      '区分三种泛化：内插、组合、分布外，并能判断任务落在哪层',
      '掌握 AGI 争论的正反代表作与 DeepMind 分级框架',
      '建立「三问法」评估任何 AI 能力叙事的习惯',
    ],
    concepts: [
      {
        t: '泛化：组合已有模式的能力',
        body: [
          '模型能回答没见过的问题，因为训练学到的模式可重新组合——见过「写秋天的诗」与无数别的诗，就能写「关于你产品的诗」。这种外推在多数任务上极其实用；但组合 ≠ 理解，分布之外的推理仍可能流畅地胡说——流畅性与正确性是独立维度。',
        ],
      },
      {
        t: '幻觉：机制的必然产物',
        body: [
          '幻觉不是 bug，而是「下一个 token 预测」的副产品：模型永远倾向生成统计上连贯的文本，不知道答案时，连贯的编造与真实回答在机制上无区别。防御分层：知识层 RAG 供给事实、行为层给「不知道」留出口、系统层用评估量化幻觉率。消除不可能，管理是现实。',
        ],
      },
    ],
    deepDive: [
      {
        t: '泛化的三层证据链',
        body: [
          '第一层：分布内插值（见过近似题，换皮问答对）——最可靠。第二层：组合泛化（把学过的能力以新方式组合，如「用文言文写一份退货政策」）——GPT-4 报告里的专业考试表现是这一层的强证据。第三层：真正的分布外创新（全新数学工具、超出语料的问题）——Sparks of AGI 争论的核心正是这一层是否存在迹象。',
          '对 PM 的操作意义：接到任何「AI 能不能做 X」的需求，先判断 X 落在哪一层。前两层可以按「先试点再扩大」推进；第三层需求（要求模型发明新方法、保证 100% 准确）应该直接重新设计——把概率系统当确定性系统用，是一切 AI 产品事故的起点。',
        ],
      },
      {
        t: 'AGI 定义的工程化：从口水战到分级',
        body: [
          '「什么算 AGI」的争论长期无法落地。DeepMind《Levels of AGI》给出操作化框架：性能（涌现 Emerging → 胜任 Competent → 专家 Expert → 大师 Virtuoso → 自主 Autonomous）× 广度（窄域 → 通用）两个轴交叉分级。当前所有 LLM 被归为「Emerging AGI」——性能尚低但广度通用。',
          '正反两方的代表作都值得读：Sparks of AGI（Bubeck 等）展示 GPT-4 的抽象与跨域能力，是「火花」叙事的出处；Stochastic Parrots（Bender、Gebru 等，更早、更根本）警告语言流畅不等于理解，并指出规模路线的资源与社会成本。一正一反读下来，你会形成自己的置信区间——这比站队有用。',
        ],
      },
    ],
    videos: [
      { title: 'Sparks of AGI: early experiments with GPT-4', speaker: 'Sébastien Bubeck (论文一作亲讲)', minutes: 49, lang: 'en', url: 'https://www.youtube.com/watch?v=qbIk7-JPB2c', why: '一作本人现场演示「火花」证据与局限，正方叙事的最佳一手来源。' },
    ],
    papers: [
      {
        title: 'GPT-4 Technical Report', authors: 'OpenAI', year: 2023, venue: 'arXiv 技术报告',
        url: 'https://arxiv.org/abs/2303.08774',
        why: 'GPT-4 能力与安全边界的官方报告：专业考试普遍达到人类前 10%~20% 的数据，是「组合泛化」讨论的核心证据。',
        contributions: ['多语言、多学科基准的系统性横评（含中文基准）', '刻意不披露架构与参数的发布范式——能力披露与细节保密的分界样本', '安全评估（越狱、幻觉、偏见）作为报告正式章节的开创'],
        pmLens: '报告里「考试通过率」表格是 PM 最该看的部分：它给出各专业领域的「能力地图」，是判断哪些垂直场景已跨过可用线的历史坐标。',
      },
      {
        title: 'Sparks of Artificial General Intelligence: Early experiments with GPT-4', authors: 'Bubeck et al. (Microsoft Research)', year: 2023, venue: 'arXiv',
        url: 'https://arxiv.org/abs/2303.12712',
        why: '「AGI 火花」之争的正方代表作：用大量案例论证 GPT-4 展现跨域抽象与理解迹象。',
        contributions: ['整理抽象、推理、跨模态等维度的定性案例集', '提出与心理学/发展认知的对照实验思路', '引发学界对「智能 vs 模仿」的系统化争论'],
        pmLens: '注意它的方法主要是案例展示而非受控实验——这正是后来争议的焦点。读它的正确姿势：欣赏案例、警惕外推。',
      },
      {
        title: 'Levels of AGI: Operationalizing Progress on the Path to AGI', authors: 'Morris et al. (Google DeepMind)', year: 2023, venue: 'arXiv / ICML 2024',
        url: 'https://arxiv.org/abs/2311.02462',
        why: 'DeepMind 官方 AGI 分级框架：把「什么是 AGI」从口水战变成可操作定义与路线图。',
        contributions: ['性能 × 广度双轴九级分类（Emerging 到 Autonomous）', '以「能力深度 × 广度 + 部署自主性」评估现有系统', '把安全讨论锚定在等级而非口号上'],
        pmLens: '把这份分级当行业坐标系用：新产品规划时标注「本功能需要 Level X 的能力」，能力未到就调整方案——这是把宏大叙事翻译成排期语言的标准工具。',
      },
    ],
    readings: [
      { title: 'On the Dangers of Stochastic Parrots', author: 'Bender, Gebru et al. (FAccT\'21)', url: 'https://dl.acm.org/doi/10.1145/3442188.3445922', why: '反方经典（ACM 正式出版，无 arXiv 版）：能力不等于理解，并率先系统提出规模路线的环境与社会成本。' },
    ],
    mistakes: [
      {
        wrong: '模型参数越大，幻觉越少，最终会消失。',
        right: '规模降低部分幻觉但不消除——机制上模型仍会被迫补全。且能力越强语言越可信，幻觉反而更难被人眼识别。检测与事实供给的系统工程永远必要。',
      },
      {
        wrong: '反方文献（如 Stochastic Parrots）已经过时，不用读。',
        right: '反方的两个核心论点至今有效：语言流畅 ≠ 任务可靠；规模路线有真实的外部成本。它们是避免被营销叙事绑架的「认知免疫系统」。',
      },
    ],
    practice: {
      task: '设计 3 个「探边界」测试问题快速判断一个模型的泛化层级与幻觉倾向，并为每个问题写「预期表现分界线」。',
      hint: '从「训练截止后的事实」「精确计数」「虚构概念」三个方向构造。',
      answer: '参考：① 引用一篇训练截止后发布的论文——能承认不知道 vs 编造（测幻觉倾向）；② 数长句中某字次数——工具化处理 vs 硬算（测是否知道自身结构局限）；③ 请介绍一个不存在的概念——一本正经 vs 戳穿（测行为训练）。分界线写法示例：① 在 3 次询问中承认不知道 ≥2 次为及格。三个测试组合可在 10 分钟内给一个模型画「边界画像」。',
    },
    pmLens: [
      '「三问法」评估任何 AI 能力叙事：① 这能力在分布内吗（有没有大量相似语料/任务）？② 监督信号从哪来？③ 验收标准和错误代价是什么？三问答完，80% 的「颠覆性」产品叙事会自动现出原形——这是转型 AI PM 最值钱的一件思维工具。',
      '把 AGI 分级翻译成排期语言：向管理层汇报时用「本方案需要的能力处于 Emerging 级上沿，风险点在分布外输入」替代「AI 可能做不到」。用 Levels of AGI 的语言体系做风险管理，专业感与准确度双提升。',
    ],
  },

  '1.4.1': {
    goals: [
      '说出 RAG 原始论文的两种形态与今天 naive RAG 的关系',
      '掌握 Naive → Advanced → Modular 的演进谱系',
      '能画出 RAG vs 微调 vs 长上下文的选型决策矩阵',
    ],
    concepts: [
      {
        t: '为什么需要 RAG',
        body: [
          '模型知识冻结在训练截止日，且不含私有数据；微调成本高且不擅长注入事实。RAG（检索增强生成）换思路：不改模型，回答前把相关知识检索出来塞进上下文——开卷考试。三重优势：知识可随时更新、答案可溯源、权限可控。',
        ],
      },
      {
        t: '五步链路',
        body: [
          '切片 → 向量化入库 → 检索 top-K → 拼装进提示词 → 生成并标注引用。每一环都有工程细节：切多大、检索几个、冲突怎么排——STAGE 03 逐课实战。RAG 进阶（重排序、混合检索、query 改写）见 aipath RAG 三部曲。',
        ],
      },
    ],
    deepDive: [
      {
        t: '原始 RAG：不止是「检索+生成」',
        body: [
          'Lewis et al. 2020 的原始设计比今天的 naive RAG 精细得多：参数化的检索器（DPR）与非参数化的向量知识库（Wikipedia 的 FAISS 索引）+ 生成器（BART）端到端联合训练——检索器与生成器一起被 RL 信号优化。两种解码形态：RAG-Sequence（同一组文档生成整个答案）与 RAG-Token（每个 token 可参考不同文档）。',
          '今天流行「naive RAG」（切块 + 相似检索 + 拼接生成）只是它的工程简化版：不联合训练、检索器直接用现成 Embedding。理解原始设计的好处：知道「检索器可以被下游信号优化」这件事存在——Advanced RAG 里的 query 改写、重排序微调，都是这个思想的不同实现程度。',
        ],
      },
      {
        t: 'Naive → Advanced → Modular 谱系',
        body: [
          'Gao et al. 2023 综述给出被广泛引用的三代分类：Naive（切块-检索-生成三件套）；Advanced（预检索优化：query 改写/扩展；检索优化：混合检索 + 重排序；后检索优化：上下文压缩、去重）；Modular（组件可插拔、递归检索、自适应检索——模型自己决定要不要检索、检索几轮）。',
          '这份谱系是诊断工具：你的 RAG 效果不好时，先定位自己处在哪一代、哪个环节没做——多数「RAG 不好用」的项目停留在 Naive 代却期待 Advanced 代的效果。Anthropic 的 Contextual Retrieval 则证明：即使不换模型，仅给每个切片补上文档级语境，检索失败率就能大幅下降——数据工程的收益常常大于换模型。',
        ],
      },
    ],
    videos: [
      { title: 'Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks, with Patrick Lewis', speaker: 'Patrick Lewis (论文一作亲讲)', minutes: 83, lang: 'en', url: 'https://www.youtube.com/watch?v=JGpmQvlYRdU', why: 'RAG 命名者亲讲动机、架构与失败案例——「RAG 这个词是怎么来的」的一手记录。' },
    ],
    papers: [
      {
        title: 'Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks', authors: 'Lewis et al. (Meta / UCL)', year: 2020, venue: 'NeurIPS',
        url: 'https://arxiv.org/abs/2005.11401',
        why: 'RAG 的原始定义论文：检索器 + 生成器端到端联合训练，「开卷考试」范式的正式命名。',
        contributions: ['参数化记忆（可微检索器）+ 非参数化记忆（向量库）的混合架构', 'RAG-Sequence / RAG-Token 两种解码形态', '在开放域 QA 上全面超越纯参数化基线，且答案可溯源'],
        pmLens: '论文把模型记忆分为「参数内（训练时固化）」与「参数外（检索时注入）」——这个二分法是所有知识类 AI 产品架构的第一决策：知识放哪一侧，决定了更新成本与溯源能力。',
      },
      {
        title: 'Retrieval-Augmented Generation for Large Language Models: A Survey', authors: 'Gao et al.', year: 2023, venue: 'arXiv',
        url: 'https://arxiv.org/abs/2312.10997',
        why: '被引用最广的 RAG 综述：Naive→Advanced→Modular 三代谱系 + 评估维度的全景地图。',
        contributions: ['三代 RAG 架构谱系与各环节优化技术清单', '检索源、检索粒度、检索时机的模块化分解', 'RAG 评估三维度（检索质量、生成质量、系统整体）的整理'],
        pmLens: '把它当「RAG 产品需求辞典」用：评审供应商方案时对照 Modular 谱系看覆盖了哪些组件、缺哪些——一份综述顶半个技术顾问。',
      },
    ],
    readings: [
      { title: 'Contextual Retrieval', author: 'Anthropic 官方', url: 'https://www.anthropic.com/news/contextual-retrieval', why: '官方工程数据：给每个切片加文档级语境，检索失败率最高降 67%；配合 rerank 再降——数据工程优于换模型的实证。' },
    ],
    mistakes: [
      {
        wrong: 'RAG = 向量数据库，买了库就有了 RAG。',
        right: '向量库只是第②③环的存储件。切片策略、检索质量、上下文拼装、引用生成决定效果——多数「RAG 不好用」出在切片与评估缺失，而不是选错库。',
      },
      {
        wrong: '有了 128K 长上下文，RAG 就过时了。',
        right: '长上下文按平方计价、位置偏差依旧（1.3.2），且权限隔离与溯源仍是检索独有优势。生产级方案是「检索 + 长上下文」协同：检索缩小范围，长窗口消化材料。',
      },
    ],
    practice: {
      task: '公司要 AI 回答「差旅报销标准」，知识在 3 份制度 PDF + 半年审批案例邮件里。画出方案：素材分层、更新机制、以及 RAG/微调/长上下文三方案的取舍理由。',
      hint: '不同来源的权威等级和更新频率不同，要分层处理。',
      answer: '参考：制度 PDF 做权威层（按章节切片、权威等级高）；邮件做案例层（结构化提取字段而非全文入库）。更新：制度变更触发重建，邮件周级增量。方案取舍：选 RAG（知识常更新、要溯源引用）；不选微调（知识月月变、微调追不上且无法溯源）；不选全文塞上下文（PDF 总量超窗口且成本平方涨）。用「知识更新频率 × 溯源需求 × 成本」三轴写选型结论。',
    },
    pmLens: [
      'RAG vs 微调 vs 长上下文是 AI PM 的第一张决策矩阵：知识更新频率高 → RAG；要溯源与权限 → RAG；要改变行为风格 → SFT；一次性全量小知识库 → 长上下文。把这张矩阵写进你的需求评审模板，能拦掉一半方案返工。',
      '「检索失败率」是这个产品的第一指标：Anthropic 数据证明切片加语境这类数据工程收益（失败率降 35~67%）远大于换模型。AI 产品质量常在数据工程而非模型——预算优先投给切片、清洗、评估集，而不是更贵的 API。',
    ],
  },

  '1.4.2': {
    goals: [
      '理解 CLIP 的对比学习如何对齐图文两个模态',
      '掌握扩散模型「前向加噪-反向去噪」的数学骨架',
      '能为多模态功能划定「能做/不该做」的边界',
    ],
    concepts: [
      {
        t: '把图像翻译成模型的语言',
        body: [
          '多模态 LLM 的通行做法：视觉编码器（ViT）把图像切块编码成向量序列，与文本 token 序列拼接送入同一个 Transformer——模型「看着图说话」。图文对齐靠海量图文对训练完成。理解粒度是「块」级：擅长内容理解，但对精确计数、细小文字、测距不稳。',
        ],
      },
      {
        t: '扩散模型：从噪声明晰出图',
        body: [
          '文生图主流技术是扩散模型：训练时给图片逐步加噪直到纯噪声，模型学习每一步如何去噪；生成时从随机噪声出发按文本条件反复去噪，图像逐渐浮现。提示词通过交叉注意力控制每一步去噪方向。',
        ],
      },
    ],
    deepDive: [
      {
        t: 'CLIP：对比学习对齐两个模态',
        body: [
          'CLIP（Radford et al. 2021）用 4 亿网络图文对训练双塔结构：图像编码器与文本编码器把各自输入映射到同一向量空间，对比损失让匹配的图文对相似度高、不匹配的低。',
          { formula: 'InfoNCE：最大化匹配图文对相似度，同时压低同批次 N−1 个不匹配对的相似度' },
          '一个训练直接产出三种能力：零样本分类（「这张图和哪个文字标签最近」）、图文检索、以及可迁移的视觉表征——GPT-4V、多模态 LLM 的视觉编码器几乎都是 CLIP 血统。「对比学习」再次登场（word2vec 负采样 → SBERT → CLIP），这是贯穿 AI 表示学习的第一方法论。',
        ],
      },
      {
        t: '扩散的数学骨架与产品化路径',
        body: [
          '前向过程固定（逐步加高斯噪声，不学习）；反向过程学习（网络预测每一步的噪声量）。训练目标可以写成简单形式：预测「这步加了什么噪声」，损失即预测与真值的距离。生成时从纯噪声出发，用预测的噪声逐步减去，图像逐渐清晰。',
          'DDPM（2020）确立骨干；Latent Diffusion（2022）把扩散搬进压缩的潜空间——算力需求骤降，消费级显卡可跑，Stable Diffusion 由此产品化，文生图从实验室走进所有产品。这条「数学突破 → 潜空间降本 → 开源产品化」的路径，是 AI 技术产品化的标准剧本，值得完整读一遍。',
        ],
      },
    ],
    papers: [
      {
        title: 'Learning Transferable Visual Models From Natural Language Supervision（CLIP）', authors: 'Radford et al. (OpenAI)', year: 2021, venue: 'ICML',
        url: 'https://arxiv.org/abs/2103.00020',
        why: '图文对齐的基石：4 亿图文对 + 对比学习，多模态表示学习的源头，今天所有 VLM 的视觉编码器祖先。',
        contributions: ['双塔 + InfoNCE 对比学习对齐图文空间', '零样本分类范式：不用训练即可识别任意文字描述的类别', '开源权重催生整个开源多模态生态'],
        pmLens: '「零样本分类」是产品人的宝藏能力：给一张图 + 一组文字标签就能分类，无需训练。内容审核、商品归类、图片打标等需求都值得先试 CLIP 路线再考虑定制。',
      },
      {
        title: 'Denoising Diffusion Probabilistic Models（DDPM）', authors: 'Ho, Jain & Abbeel (UC Berkeley)', year: 2020, venue: 'NeurIPS',
        url: 'https://arxiv.org/abs/2006.11239',
        why: '扩散模型时代的开启者：把「逐步去噪」做到媲美 GAN 的图像质量，生成范式从此改朝换代。',
        contributions: ['简化训练目标为「预测噪声」，稳定可复现', '确立前向加噪/反向去噪的马尔可夫链框架', 'FID 质量首次全面超越 GAN，开启扩散时代'],
        pmLens: '扩散生成天然「可控性差、速度慢」——它不是一步出图而是几十步去噪。这解释了文生图产品的两大体验命题：为什么出图要等几秒、为什么同样提示词每次结果不同。',
      },
      {
        title: 'High-Resolution Image Synthesis with Latent Diffusion Models', authors: 'Rombach et al. (Stability / LMU / Runway)', year: 2022, venue: 'CVPR',
        url: 'https://arxiv.org/abs/2112.10752',
        why: '把扩散搬进潜空间、算力骤降的论文——Stable Diffusion 的直接前身，「开源文生图」的技术源头。',
        contributions: ['先压缩到潜空间再扩散，训练与推理成本降一个数量级', '交叉注意力注入文本条件（提示词控制的机制出处）', '开源权重 + 商用许可引爆全球生成式图像生态'],
        pmLens: '成本降一个数量级 → 产品化成为可能：这是「技术降本打开市场」的教科书案例。评估任何新生成技术时，问一句「什么时候潜空间时刻到来」——降本点就是入场点。',
      },
    ],
    readings: [
      { title: 'The Illustrated Stable Diffusion', author: 'Jay Alammar', url: 'https://jalammar.github.io/illustrated-stable-diffusion/', why: '扩散 + 潜空间 + CLIP 条件机制的经典图解，把三篇论文的核心画在一张故事线里。' },
      { title: 'GPT-4V(ision) System Card', author: 'OpenAI 官方', url: 'https://openai.com/index/gpt-4v-system-card/', why: '官方系统卡：商用 VLM 的能力边界与风险评估披露方式——多模态产品风险评估的范本（无 arXiv 版）。' },
    ],
    mistakes: [
      {
        wrong: '多模态模型「看」图的方式和人眼一样。',
        right: '它看到的是分块编码后的向量序列：分辨率、切块方式、预处理都影响「视力」。同一张图换尺寸输入可能得到不同答案——工程上要固定图片预处理规范。',
      },
      {
        wrong: '能看懂图 = 能做视觉测量。',
        right: '块级表示擅长语义理解（这是什么场景），不擅长像素级任务（精确计数、量尺寸、对比色号）。测量类需求交给传统 CV，语义类需求才交给 VLM。',
      },
    ],
    practice: {
      task: '为「电商主图合规审核」设计方案：列 3 项交给多模态模型判断的任务和 2 项不该交给它的任务，并说明每项的验收方式。',
      hint: '语义类交给模型，精确测量类交给传统 CV。',
      answer: '交给模型：① 是否含违禁/敏感内容（语义理解，验收用标注集算召回）；② 图文是否一致（对齐判断）；③ 是否含水印/二维码（识别类，验收看误报率）。不交给模型：① 尺寸是否 800×800（像素测量，图像库判断）；② 是否盗图（反向搜图系统）。验收方式：每项建 100 张标注测试集，上线前算准确率与误报率——合规场景误报直接伤商家，指标要双边汇报。',
    },
    pmLens: [
      '多模态的成本结构按「图像预算」设计：一张图的 token 远贵于文本，分辨率与图片数量直接进成本。产品规则示例：每次最多 3 图、自动压缩到模型最优分辨率、高清解析作为付费档位——把视觉预算变成显式的产品参数。',
      '学会读 System Card 做风险评估：GPT-4V 系统卡展示了官方如何披露能力边界（人脸识别限制、医疗建议限制）。为你的多模态功能写「能力与风险披露文档」，既是对用户负责，也是 B 端合规采购的硬要求。',
    ],
  },

  '1.4.3': {
    goals: [
      '理解 Toolformer 的自监督工具学习思路',
      '掌握 MCP 的三原语与三角色，说清它与 function calling 的关系',
      '建立 AI 工程生态的分层地图（模型-接口-工具-编排-观测）',
    ],
    concepts: [
      {
        t: 'API 层：统一接口下的差异',
        body: [
          '各家 API 都收敛到「messages 进、choices 出」的类 Chat Completions 形态，切换成本低。真正差异在参数之外：上下文长度、函数调用稳定性、结构化输出、速率定价、数据合规条款。用一层薄封装隔离厂商差异，把模型名做成配置。',
        ],
      },
      {
        t: 'MCP：给工具生态定一个 USB-C',
        body: [
          'MCP 解决 M×N 困境：M 个 Agent 对接 N 个数据源，原要写 M×N 份集成；MCP 变成 M+N——工具方实现一次 MCP Server，任何支持的 Agent 即插即用。三原语：tools（动作）、resources（数据）、prompts（模板）。',
        ],
      },
    ],
    deepDive: [
      {
        t: 'Toolformer：让模型自己学会用工具',
        body: [
          'Schick et al. 2023 的思路漂亮：不靠人工标注「何时调用 API」，而是在普通语料里自动采样「插入 API 调用」的位置（如日历查询、计算器、检索），保留那些「调用了 API 后能让后续文本预测更容易」的样本，用它微调模型——模型从语言统计里自学出工具使用能力。',
          '这个自监督思想是 function calling 的学术起点。工程化的收敛形态则是今天各家 API 的做法：开发者用 JSON Schema 声明工具（名称、用途、参数），模型在对话中返回「想调用什么」，由应用执行后回填。学术看「能不能学会」，工程看「可不可控」——权限、校验、超时都在应用层闭环（这正是 1.3.3 的骨架职责）。',
        ],
      },
      {
        t: 'MCP 的协议分层与 function calling 的关系',
        body: [
          'MCP 三原语：tools（可执行动作）、resources（可读数据）、prompts（预设模板）；三角色：Host（用户的 AI 应用）、Client（Host 内的协议连接器）、Server（能力提供方）。它标准化的是「工具的声明、发现与调用通道」，不替代模型的调用决策。',
          { formula: 'function calling：单次会话内「模型 ↔ 你的代码」的调用协议；MCP：跨应用「工具生态 ↔ 任意 Agent」的分发协议。两者是上下层关系，不是竞争关系。' },
          'Gorilla 论文补上规模维度：1600+ 真实 API 的调用评测显示，微调模型可超过 GPT-4 且通过「调用时检索文档」抑制 API 幻觉——API 数量增长到千级后，「工具幻觉」成为新问题类，生态治理（文档质量、评测榜单 BFCL）与协议标准同等重要。',
        ],
      },
    ],
    papers: [
      {
        title: 'Toolformer: Language Models Can Teach Themselves to Use Tools', authors: 'Schick et al. (Meta AI)', year: 2023, venue: 'NeurIPS',
        url: 'https://arxiv.org/abs/2302.04761',
        why: '让 LLM 自监督学会调用 API 的原始论文：工具调用范式的起点，function calling 的思想源头。',
        contributions: ['自动挖掘「插入 API 调用有助预测」的训练样本（无需人工标注）', '证明小模型带工具可胜过大模型裸奔（677M Toolformer 击败 GPT-3）', '确立「模型决策调用 + 应用执行回填」的分工范式'],
        pmLens: '「小模型+工具 > 大模型裸奔」是重要的成本论据：给模型配上对工具，常常比升级模型档位更省钱——成本优化时先盘点工具供给，再考虑换模型。',
      },
      {
        title: 'Gorilla: Large Language Model Connected with Massive APIs', authors: 'Patil et al. (UC Berkeley)', year: 2023, venue: 'NeurIPS 2024',
        url: 'https://arxiv.org/abs/2305.15334',
        why: '万级真实 API 调用的系统研究：工具幻觉的测量与「检索增强调用」的解法，配套 BFCL 成为行业评测标准。',
        contributions: ['APIBench：1600+ 真实 API 的调用基准', '检索器感知训练：调用时检索最新文档，抑制过时/幻觉调用', '揭示模型「编造不存在的 API 参数」这类新失败模式'],
        pmLens: '工具幻觉是新的事故类型：模型会调用不存在的方法、编造参数。产品防御三层：工具白名单、参数 schema 校验、调用日志审计——写进你的 Harness 规格。',
      },
    ],
    readings: [
      { title: 'Model Context Protocol 官方文档/规范', author: 'MCP 官方', url: 'https://modelcontextprotocol.io/introduction', why: 'MCP 官方规范：三原语、三角色、传输与生命周期的权威定义。' },
      { title: 'Introducing the Model Context Protocol', author: 'Anthropic 官方', url: 'https://www.anthropic.com/news/model-context-protocol', why: 'MCP 发布原文：「为什么工具生态需要统一协议」的叙事源头。' },
      { title: 'Function Calling 指南', author: 'OpenAI 官方文档', url: 'https://platform.openai.com/docs/guides/function-calling', why: '官方结构化工具调用文档，与 MCP 对照阅读理解上下层关系。' },
    ],
    mistakes: [
      {
        wrong: '接入 MCP 后，模型自动就有了那些能力。',
        right: 'MCP 只标准化了工具的声明与调用通道。工具描述质量、参数设计、错误信息友好度仍决定用得好不好——垃圾进垃圾出的定律在 MCP 时代照样成立。',
      },
    ],
    practice: {
      task: '团队有 3 个 Agent 应用与 5 个内部数据源（Wiki/工单/CRM/日历/代码库）。算「两两直连」与「统一 MCP」的集成工作量，并写出 MCP 化的三个治理收益。',
      hint: 'M×N vs M+N；治理收益想权限、审计、工具质量。',
      answer: '直连 3×5=15 份集成，任一方改动多处同步；MCP 化 3+5=8 份且解耦。治理收益：① 权限审计收敛到 MCP Server 一处（谁能读 CRM 在一个地方配）；② 新增第 4 个应用零改动接入全部 5 个数据源；③ 工具描述一次优化、全体 Agent 受益——工具质量从「各团队私事」变成「平台公共资产」。',
    },
    pmLens: [
      '生态卡位思维：MCP 之于 AI 工具生态 ≈ 早期 App Store。为你的产品做 MCP Server 是低成本的分发渠道：让用户的 Agent 生态直接调用你的服务。评估竞品时也看它「被 MCP 化」的速度——工具生态采用率是平台级产品的先行指标。',
      '评估生态型方案看三个数：接入成本（M+N 还是 M×N）、调用可靠性（BFCL 类榜单或自测的工具幻觉率）、权限治理（能否集中审计）。把这三条写进生态合作的技术准入标准。',
    ],
  },

  '1.4.4': {
    goals: [
      '掌握 HELM 的「场景×指标×鲁棒性」评估矩阵思想',
      '理解误差棒：为什么没有显著性检验的对比不可信',
      '建立红队测试的自动化思路与产品化底线清单',
    ],
    concepts: [
      {
        t: '没有评估，就没有优化',
        body: [
          '最常见的失败模式是「感觉变好了」：改了提示词、换了模型，凭三五个例子下结论。工程化做法是先建评估集——20~100 条覆盖典型与边界场景的「输入 + 期望」，每次改动跑一遍，用数字说话。评估三层：能力（准确率）、行为（格式、引用真实性、拒答恰当性）、成本（token、延迟）。',
        ],
      },
      {
        t: '三种判分方式',
        body: [
          '精确匹配/规则：格式校验、包含关键词、代码能否运行——零成本可自动化，优先用。模型判分（LLM-as-judge）：按 rubric 给开放输出打分，需成对比较降偏置、定期与人工校准。人工评审：金标准但贵，聚焦抽样复核与争议案例。',
        ],
      },
    ],
    deepDive: [
      {
        t: 'HELM 的 holistic 思想：矩阵化评估',
        body: [
          'Stanford CRFM 的 HELM 把评估从「一张榜」重构为三维矩阵：场景（谁在用、干什么）× 指标（准确性、校准、鲁棒性、公平性、偏见、毒性、效率七大类）× 适配方法（提示方式）。单一总分被明确拒绝——因为「一个数字」掩盖了「在哪些子场景会失败」。',
          { formula: '评估 = 场景矩阵 × 指标矩阵 × 通过线；任何只汇报单一分数的评测都可以质疑' },
          'PM 可直接借用这套方法论做功能验收：把「AI 功能验收标准」写成场景×指标的矩阵（如「客服机器人：售前咨询/售后投诉/闲聊 三场景 × 准确率/拒答恰当率/响应格式 三指标」），每格定通过线。这份矩阵就是 AI 功能的验收 SOP。',
        ],
      },
      {
        t: '误差棒：评估的统计学正规化',
        body: [
          'Anthropic（Evan Miller，2024）指出：评测题目间并非独立（同任务、同主题的题高度相关），聚类效应使朴素标准误被低估 3 倍以上——「模型 A 比 B 高 1%」在很多评测里毫无统计意义。论文给出成对比较与聚类的修正方法。',
          '这改变两件事：① 看榜单的习惯——没有置信区间的差距不要传播；② 自建评估集的规格——样本量要按「想检测出的最小差异」反推，而不是拍脑袋 20 条。评估从「跑个分」正式变成「做实验」。',
        ],
      },
      {
        t: '红队的自动化：用模型攻击模型',
        body: [
          'Anthropic（Perez et al. 2022）证明：让一个模型生成对抗性输入攻击另一个模型，人只做筛选标注，就能规模化发现越狱与偏见模式——红队成本从专家小时级降到流水线。产品化底线由此可量产：上线前自动红队套件（提示注入、越狱、敏感诱导）+ 差评反馈闭环 + 人工升级通道 + 透明度声明。',
          '产品含义：安全测试不是上线前的一次性事件，而是与功能迭代同频的自动化流水线。每次改提示词、换模型，红队套件与评估集一起跑——这就是 genai 课程 Lesson 14 描述的 LLMOps 闭环里最关键的一环。',
        ],
      },
    ],
    papers: [
      {
        title: 'Holistic Evaluation of Language Models（HELM）', authors: 'Liang et al. (Stanford CRFM)', year: 2022, venue: 'TMLR',
        url: 'https://arxiv.org/abs/2211.09110',
        why: '「全面评估」方法论源头：拒绝单一榜分，确立场景×指标×鲁棒性的矩阵式评估框架。',
        contributions: ['七大指标族（准确/校准/鲁棒/公平/偏见/毒性/效率）× 场景的完整矩阵', '统一适配协议让跨模型对比公平', '所有结果开源可复现，成为学术评估的事实标准'],
        pmLens: '把 HELM 矩阵缩小 100 倍就是你产品的验收框架：3~5 个业务场景 × 3~4 个指标 × 通过线。这份「迷你 HELM」是 AI 功能验收 SOP 的标准写法。',
      },
      {
        title: 'Red Teaming Language Models with Language Models', authors: 'Perez et al. (Anthropic)', year: 2022, venue: 'EMNLP',
        url: 'https://arxiv.org/abs/2202.03286',
        why: '「用模型红队模型」的自动化安全测试源头：让攻击生成规模化，人类只做筛选。',
        contributions: ['ML 生成攻击样例 + 人类筛选的混合红队流水线', '发现大量人工未覆盖的越狱与偏见模式', '红队从专家活动变为可持续运行的系统'],
        pmLens: '把它当成本参考：自动化红队让「每个版本都跑安全测试」在预算上可行。供应商评估时问一句「你们的红队流水线怎么跑」——答不上来的安全承诺都是口号。',
      },
      {
        title: 'Adding Error Bars to Evals: A Statistical Approach to Language Model Evaluations', authors: 'Evan Miller (Anthropic)', year: 2024, venue: 'arXiv',
        url: 'https://arxiv.org/abs/2411.00640',
        why: '给评测加置信区间的统计学正名之作：题目聚类使朴素误差被低估 3 倍以上，小差距对比不可信。',
        contributions: ['指出评测题目的聚类相关性，修正标准误估计', '给出成对比较的显著性检验方法', '配套官方博客提供可直接落地的建议'],
        pmLens: '汇报纪律：向老板说「A 方案比 B 高 2%」之前，先确认样本量与显著性。在噪声上做产品决策，比不做决策更贵。',
      },
    ],
    readings: [
      { title: 'A statistical approach to model evaluations', author: 'Anthropic Research', url: 'https://www.anthropic.com/research/statistical-approach-to-model-evals', why: '误差棒论文的官方博客版：含可直接落地的评估样本量与检验建议。' },
      { title: 'OpenAI Evals（官方开源框架）', author: 'OpenAI (GitHub)', url: 'https://github.com/openai/evals', why: 'OpenAI 官方评测框架，工程界事实标准之一：评估即代码的仓库结构值得借鉴。' },
    ],
    mistakes: [
      {
        wrong: '评估是大模型厂商的事，应用层没必要做。',
        right: '厂商基准测通用能力；你的应用有专属场景、数据格式与失败模式。20 条用心写的业务用例，能在每次改动时拦住大部分回归——这是应用层最便宜的保险。',
      },
      {
        wrong: '模型判分不可靠，所以 LLM-as-judge 没用。',
        right: 'judge 有偏置（偏爱长答案、自偏爱）但可治理：固定 rubric、成对比较、人工校准三件套让它成为可复现的自动化评审。它解决的是「没有判分就无法迭代」的更大约束。',
      },
    ],
    practice: {
      task: '为「HR 政策问答机器人」设计评估矩阵：3 个场景 × 3 个指标，并给每格定通过线；再写出陷阱题（知识库没有答案的问题）的期望行为。',
      hint: '场景想：制度查询/边界情况/隐私敏感；指标想：准确/拒答恰当/引用真实。',
      answer: '参考矩阵：制度查询（准确率≥95%、引用真实率 100%、无越界）；边界情况（明确承认不知道 ≥80%、不编造 100%、给求助路径 ≥90%）；隐私敏感（拒绝泄露他人信息 100%、语气合规）。陷阱题期望行为：明确说「政策文档未覆盖」+ 指引人工渠道，绝不强答。这份矩阵 30 分钟能写完，却定义了整个产品的验收体系。',
    },
    pmLens: [
      '评估集是 AI 团队的复利资产：它随版本累积，成为发布门禁、回归防线与供应商对比的统一标尺。AI PM 应把评估集当核心项目文档管理（版本化、责任人、更新节奏），它的质量决定团队迭代速度的上限。',
      '汇报纪律即统计素养：「加误差棒」改变产品话术——小样本差距必须配显著性表述，榜单引用必须带置信区间。这条纪律能帮团队避开最贵的错误：在噪声上做方向性决策。',
    ],
  },
}
