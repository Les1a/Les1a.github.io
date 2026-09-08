# 事实与来源审查

审查日期：2026-09-07。此目录由 Jekyll exclude 排除。附件是执行规格，来源事实仍以仓库、CV 和论文原文核对。本次审查开始时 master 工作区干净；origin 为 git@github.com:Les1a/Les1a.github.io.git，_config.yml 的 url 与 repository、线上主页及两个项目页相互一致。未发现适用 AGENTS.md。未 push、merge 或发布。

## 论文

原六篇都检查了 PDF 首页（本地渲染图在 tmp/homepage-review），数据中保留完整作者与经核实的贡献脚注。按作者最新展示要求，Publications 条目不再输出作者名单及其脚注；BibTeX 中的完整作者信息继续保留，引用内容未因排版调整而删改。不将摘要中的“我们”改写成本人独立贡献。

| 工作 | 核实内容与来源 | 最终处理 |
| --- | --- | --- |
| MetaState | [arXiv 2603.01331](https://arxiv.org/abs/2603.01331)，[v3 PDF](https://arxiv.org/pdf/2603.01331v3)，[作者项目页](https://les1a.github.io/projects/metastate/)。v1 为 2026-03-02；v3 首页明确写 Published as a conference paper at COLM 2026。作者共八位，无共同贡献脚注。 | 保留 COLM 2026，依据新读到的作者 PDF 明确为 Published；最新反馈中作者已确认录用新闻为 2026.07（原写 2027.7 为笔误）。引用用已有真实 arXiv 记录，不伪造会议 BibTeX。摘要明确训练记忆模块、冻结 backbone。 |
| R²-dLLM | [arXiv 2604.18995](https://arxiv.org/abs/2604.18995)，[v2 PDF](https://arxiv.org/pdf/2604.18995v2) 与 [HTML](https://arxiv.org/html/2604.18995v2)。v1 为 2026-04-21；九位作者，Kejing Xia 第二；无共同贡献脚注。 | 保留 2026 Preprint；说明同时包含 training-free decoding rules 与 redundancy-aware SFT，不把减少解码步数写成相同倍数的实际延迟加速。 |
| LongMamba | [ICLR 正式记录](https://proceedings.iclr.cc/paper_files/paper/2025/hash/ab5d50d269e52f8eed497062311ff173-Abstract-Conference.html)、该页 PDF / BibTeX 与[项目页](https://lemonandrabbit.github.io/)。十位作者，Zhifan Ye 与 Kejing Xia 的星号为 Equal contribution。 | Published · ICLR 2025；采用正式 BibTeX，作者展示遵循 PDF；按作者最新指定的同年编辑顺序排第三。 |
| LAMB | [ACL Anthology](https://aclanthology.org/2025.acl-short.96/)、[PDF](https://aclanthology.org/2025.acl-short.96.pdf)、[BibTeX](https://aclanthology.org/2025.acl-short.96.bib)。十位作者；Kejing Xia 第三；第一页唯一星号说明 Zhifan Ye 在 Intel 实习期间完成工作，不代表共同一作。 | Published · ACL Short Papers · 2025。用正式书目信息，无共同贡献标记。 |
| D²GS | [NeurIPS 正式记录](https://proceedings.neurips.cc/paper_files/paper/2025/hash/524ff06d5375d76e93d8490e654a81bf-Abstract-Conference.html)及 PDF / BibTeX；[arXiv HTML](https://arxiv.org/html/2510.25173v1)；[作者项目页](https://les1a.github.io/projects/d2gs/)。七位作者；Kejing Xia、Jidong Jia 共同贡献；Youjian Zhang 通讯。 | Published · NeurIPS 2025；用正式 BibTeX。项目页原写 Sun Li，正式 PDF、元数据与 CV 均为 Li Sun；仅修正项目页显示名。BibTeX 的 Sun, Li 原本正确。 |
| EDITOR | [arXiv v3](https://arxiv.org/abs/2506.03067v3)，[PDF](https://arxiv.org/pdf/2506.03067v3)及[HTML](https://arxiv.org/html/2506.03067v3)。八位作者，Kejing Xia 第二；无共同贡献脚注。首发 2025-06-03，v3 为 2026-03-04。 | 保留 Preprint，按首发年 2025 分组，继续链接已有 v3。不因修订年改成新论文，不编造 Code / Project。 |

新增新闻包括作者本轮确认的 2026.07 MetaState 录用 COLM 2026，以及可核实的两条 arXiv 首发事件。原六条旧新闻均保留；近期六条显示到 LongMamba，2024 年及以前三条显式归档。不以出版或 arXiv 日期替换录用月。

按作者明确要求取消 Selected；2025 年按 D²GS、EDITOR、LongMamba、LAMB 排序。展示的六篇论文均有可点击的 Paper / Code / Project，五个缺失资源地址为空 href。此项采用最新直接指示，覆盖附件的隐藏空链接规则；没有猜测任何地址。

## 本轮新增 BRS-E²NeRF 的核验

- 作者提供 [ScienceDirect 论文入口](https://www.sciencedirect.com/science/article/abs/pii/S0031320326016109)；[Crossref 正式 DOI 元数据](https://api.crossref.org/works/10.1016/j.patcog.2026.114646) 返回 200，完整作者依次为 Huijiao Wang、Kejing Xia、Yangguang Wang、Chi Zhang、Mingyuan Lin、Lei Yu，与 CV 相同。
- [Elsevier 原文接口](https://api.elsevier.com/content/article/PII:S0031320326016109?httpAccept=text/xml) 返回出版元数据，确认标题、Pattern Recognition、DOI 10.1016/j.patcog.2026.114646。Crossref 给出卷 180、文章号 114646、印刷期为 2026 年 12 月；这是卷期日期，不当作录用日期，也不据此增加新闻。论文已存在正式 DOI / 卷号，主页按 2026 年 Published 展示。
- BibTeX 为根据正式元数据整理的 @article，而非声称下载到了出版社 BibTeX。摘要只概述作者提供的研究主题与出版社摘要中的 re-blur / double-cycle 机制，无结果数字或个人主导宣称。
- ScienceDirect 正文和首页 PDF 直接访问均为 403；可读取的 Elsevier API 仅返回元数据。未声称读过全文或核实脚注。公开条目不加未经确认的共同贡献标记，无配图时使用自然文字布局。原始响应保存在 tmp/homepage-review/brs-crossref.json 与 brs-elsevier.xml。

## 身份、经历和教育

- Research 按作者最新要求分为 Explicit and Implicit Reasoning、Efficient Language Models、Language Model Agents；简介只描述宽泛研究方向，不将各栏限制为某一篇论文的方法。第一栏关联 MetaState 与 [Soft Token 仓库](https://github.com/Les1a/SoftTokenForMaskedDLM)，第二栏关联 R²-dLLM、LongMamba、LAMB，第三栏保留已有产业研究入口。已读取 Soft Token README，确认其为 masked diffusion LLM 的 soft token interpolation 工作；仅增加研究方向入口，不据此新建论文、发表状态或结果宣称。

- [现有主页](https://les1a.github.io/)、仓库 _pages/about.md / _config.yml 与此前核对的 CV 支持 Georgia Tech CS Ph.D. student、导师 Wenke Lee、GTISC Lab 和本科专业。作者最新明确提供两段简介，并随后确认无需 first-year，因此保留不含年级的身份表述。研究定位采用作者提供的 LLM post-training and agentic AI，不扩写为未提供的 RL / RLHF / DPO 方法。
- 此前核对的 CV 给出博士 Aug. 2025–Present、本科 Sept. 2021–Jun. 2025，专业拼写为 Communications Engineering。作者最新提供 Communication Engineering (Artificial Intelligence Track)，首屏与 Education 已统一采用这一明确措辞，日期不变。工作区已有新的 CV 文件改动，本轮未改写该文件。
- GTISC / EIC / Wuhan / Bosch 的日期和角色来自 CV 与仓库；描述保留本人明确提供的研究内容，删去没有必要的“主导全部项目”等泛化。
- 作者本轮明确 Zoom 与 Bosch 均使用 Research Intern，已补 Zoom 职务、删除 Bosch 的 Lead。Oulu 仍未提供正式角色，保持留空。GTISC 描述及关联论文已去掉 EDITOR；EDITOR 作为独立论文仍保留。
- 原奖学金、竞赛与早期高中记录都保留；RoboCup 明确为团队获奖、本人队长。首页精简显示四项荣誉，其余可展开。
- 按作者最新反馈，BRS-E²NeRF 不再出现在 Publications 展示列表。已核实的书目保留在数据文件中并设置 listed: false；武汉大学经历保留介绍及直达 ScienceDirect 的论文入口，避免跳到不存在的首页锚点。MiGA 仍保留在经历与旧新闻。

## 资源核查

- 本地 CV、头像、六幅原配图、两个项目页以及首页 CSS / JS 均通过浏览器或 HTTP 实际请求。图片未重画、未改变文件，CV 未修改。
- 外部语义核对成功：[MetaState Code](https://github.com/Les1a/MetaState)、[R²-dLLM Code](https://github.com/GATECH-EIC/R2-dLLM)、[LongMamba Code](https://github.com/GATECH-EIC/LongMamba)、[LAMB Code](https://github.com/GATECH-EIC/LAMB)。对应 README / 页面标题、论文链接匹配；公开个人 GitHub 机构信息亦匹配。
- Scholar 在 web 工具中最初访问受限，后续只读 HTTP 核验返回 200，标题为 Kejing Xia - Google Scholar。LinkedIn 返回 HTTP 999，导师主页遇到本地证书链验证限制；两者沿用明确地址，标为未能验证，不判定失效。Email 来自 CV / 配置，不发送测试邮件。
- D²GS OpenReview 出现浏览器验证页；改用已核实的 NeurIPS 正式论文页作为 Paper，项目页仍保留原链接。
- 本地浏览器最初阻止外部 Google Fonts 请求。首页现用两个本地 Latin 可变字体（Inter 48,256 bytes、Source Serif 4 50,824 bytes），来自 Google Fonts 官方分发；许可证从 google/fonts 的 ofl/inter/OFL.txt 与 ofl/sourceserif4/OFL.txt 保存到 assets/fonts。无需对外请求才能阅读。
- 独立项目页和旧 404 布局的外部字体、图标或 MathJax 仍可能受当前网络环境限制；这与本站页面是否 200 分开记录，不对未完整验证的外部媒体声称播放通过。

## 集中待确认项

这些问题没有阻塞本次交付，公开页面不展示待确认标签。

1. Oulu 的正式角色名称，目前保留机构、时间和研究内容，角色留空。Zoom 已由作者确认。
2. “Student Innovation & Entrepreneurship Project”的 National Prize 是否为奖项等级、国家级项目认定或其他称谓。原记录暂在折叠荣誉中原样保留，不升级宣传。
3. 后续换 CV 时，核对 LAMB 的会议届数：现 PDF 写 The 62nd，但 ACL 2025 正式记录为第 63 届；确认是否同时加入 Zoom / Oulu / 近期论文。按本次范围不改 CV PDF。
4. MetaState 录用月份已确认并加入新闻；正式 COLM 会议 BibTeX 尚未取得，暂保留真实 arXiv 引用。
5. BRS-E²NeRF 的 CV 给前两位作者加星号，出版社检索摘要显示相同脚注编号 1，但本次未取得正文脚注定义，暂不据此标共同一作或通讯作者；后续取得论文首页后补核对。Code / Project 的实际地址也尚未提供。
