// Kejing Xia, CV. Source for assets/3_CV.pdf on the homepage.
// Build:  typst compile --font-path assets/webfonts --font-path <Latin Modern fonts dir> docs/cv/kejing_xia_cv.typ assets/3_CV.pdf
// Fonts:  Latin Modern Roman 10 (lmroman10-*.otf, GUST Font License) and Font Awesome 6 Free 6.5 (fa-*.ttf, SIL OFL)
//         in <fonts dir>; Typst falls back to its built-in fonts if they are missing.

#let accent = rgb("#1c4f8f")
#let grey = luma(120)

#set document(title: "Kejing Xia - CV", author: "Kejing Xia")
#set page(
  paper: "us-letter",
  margin: (left: 0.75in, right: 0.75in, top: 0.55in, bottom: 0.7in),
  footer: context {
    set align(center)
    set text(size: 8pt, fill: luma(160), style: "italic")
    [Kejing Xia - Page #counter(page).display() of #counter(page).final().first()]
  },
)
#set text(font: "Latin Modern Roman", size: 10pt, lang: "en", hyphenate: true)
#set par(justify: true, leading: 0.52em, spacing: 0.52em)
#show link: set text(fill: accent)

// ---------- small pieces ----------
#let fa(code, solid: false, brand: false) = box(text(
  font: if brand { "Font Awesome 6 Brands" } else { "Font Awesome 6 Free" },
  weight: if solid { 900 } else { 400 },
  size: 0.82em,
  code,
))
#let ext = box(baseline: -0.04em, text(font: "Font Awesome 6 Free", weight: 900, size: 0.68em, fill: accent, "\u{f35d}"))
#let xlink(url, body) = link(url)[#body#h(0.22em)#ext]
#let res(url, label) = box(link(url)[[#label]#h(0.2em)#ext])
#let dot = box(baseline: -0.26em, circle(radius: 1.75pt, fill: black, stroke: none))
#let me = strong[K. Xia]
#let venue(v) = underline(offset: 1.6pt, stroke: 0.45pt, v)

#let row(l, r) = grid(columns: (1fr, auto), column-gutter: 1em, l, align(right, r))

#let section(title, note: none) = block(sticky: true, above: 1.35em, below: 0.5em, width: 100%, stroke: (bottom: 0.5pt), inset: (bottom: 3pt),
  grid(columns: (1fr, auto),
    align(left + bottom, text(size: 12.5pt, weight: "bold", title)),
    align(right + bottom, if note != none { text(size: 8.5pt, style: "italic", fill: grey, note) })))

#let sub(body) = pad(left: 1.25em, grid(columns: (0.95em, 1fr), align(top, pad(top: 0.27em, circle(radius: 1.7pt, stroke: 0.55pt))), body))

#let edu(org, dates, degree, notes) = block(above: 0.45em, below: 0.55em, inset: (left: 0.55em))[
  #row(strong(org), emph(dates))
  #degree
  #for n in notes { sub(n) }
]

#let exp(org, role: none, dates: none, people: none, focus: none, items: ()) = block(above: 0.55em, below: 0.7em, inset: (left: 0.55em), breakable: false)[
  #row([#dot#h(0.35em)#strong(org)#if role != none [ | #role]], emph(dates))
  #if people != none [#people \ ]
  #if focus != none [#text(weight: "bold", style: "italic")[Research Focus]: #emph(focus)]
  #for it in items { v(0.12em); sub(it) }
]

#let pub(n, body) = block(breakable: false, above: 0.5em, below: 0.5em)[[#n] #body]

#let award(name, org, when) = block(above: 0.5em, below: 0.5em, inset: (left: 0.55em))[
  #row([#dot#h(0.35em)#strong(name), #org], emph(when))
]

// ---------- header ----------
#align(center)[
  #text(size: 25pt, weight: "bold")[Kejing Xia]
  #v(0.05em)
  #set text(size: 9.5pt)
  #link("mailto:kxia39@gatech.edu", text(fill: black)[#fa("\u{f0e0}") kxia39\@gatech.edu])
  #h(1.3em)
  #link("https://les1a.github.io/", text(fill: black)[#fa("\u{f0c1}", solid: true) Homepage])
  #h(1.3em)
  #link("https://scholar.google.com/citations?user=dH4SpC0AAAAJ", text(fill: black)[#fa("\u{f19d}", solid: true) Scholar])
  #h(1.3em)
  #link("https://github.com/Les1a", text(fill: black)[#fa("\u{f09b}", brand: true) GitHub])
  #h(1.3em)
  #link("https://www.linkedin.com/in/kejing-xia/", text(fill: black)[#fa("\u{f08c}", brand: true) LinkedIn])
]
#v(-0.3em)

// ---------- education ----------
#section[Education]
#edu([Georgia Institute of Technology], [Aug. 2025 – Present], [Ph.D. Student in Computer Science],
  ([Advisor: Prof. #xlink("https://wenke.gtisc.gatech.edu/")[Wenke Lee]],))
#edu([Wuhan University], [Sep. 2021 – June 2025], [B.Eng. in Communication Engineering (Artificial Intelligence Track)],
  ([GPA: 3.90/4.00, Rank: Top 5%, First-Class Academic Scholarship],))

// ---------- research interests ----------
#section[Research Interests]
My research centers on LLM post-training and agentic AI, with particular interests in reasoning, efficient language models, and systems that make language models more useful in interactive environments.
#v(0.1em)
#sub[Explicit and Implicit Reasoning (Latent Reasoning, Persistent Working Memory, RL Post-Training)]
#sub[Efficient Language Models (Diffusion LLM Decoding, Long-Context State Space Models)]
#sub[Language Model Agents (Computer-Use Agents, Source Learning Agents)]

// ---------- experience ----------
#section[Experience]
#exp([Georgia Institute of Technology, GTISC Lab], role: [Ph.D. Student], dates: [Jan. 2026 – Present],
  people: [Advisor: Prof. #xlink("https://wenke.gtisc.gatech.edu/")[Wenke Lee]],
  focus: [Reasoning, Agents, and LLM Post-Training],
  items: (
    [*MetaState*: Added a lightweight recurrent working memory around a frozen dLLM to carry continuous information across denoising steps, where standard discrete diffusion models pass only discrete tokens.],
    [*Rhythm of Thought*: Made latent reasoning aware of its own progress: at each decoding step the model predicts a Gaussian over reasoning progress and turns it into an uncertainty-calibrated phase signal that modulates decoder layers, trained with RL.],
    [*SourceLearn*: Contributed to a framework that moves LLM agents from accessing a persistent source at query time to learning it, building a reusable source model through self-directed study and task-guided refinement.],
  ))
#exp([Zoom Communications, Inc., AI Incubation], role: [Research Intern], dates: [May 2026 – Aug. 2026],
  people: [Mentor: Dr. #xlink("https://scholar.google.com/citations?user=zj8MzB4AAAAJ")[Renqian Luo]],
  focus: [Efficient Computer-Use Agents],
  items: (
    [*LookAgain-CUA*: Instead of re-reading the screen after every GUI action, trained agents to learn observation boundaries and execute several actions per model call. We built BoundaryTrace to turn trajectories into multi-action supervision, then trained with self-refined SFT and cost-aware RL.],
  ))
#exp([Georgia Institute of Technology, EIC Lab], role: [Undergraduate to Ph.D. Student], dates: [May 2024 – Dec. 2025],
  people: [Advisor & Mentors: Prof. #xlink("https://eiclab.scs.gatech.edu")[Yingyan (Celine) Lin] , #xlink("https://www.yongganfu.com")[Yonggan Fu] , #xlink("https://scholar.google.com/citations?user=zlPfnWEAAAAJ&hl=en")[Zhifan Ye]],
  focus: [Efficient Diffusion Decoding and Long-Context Modeling],
  items: (
    [*LongMamba*: Found that Mamba's hidden channels split into local and global ones, traced long-context failure to state decay in the global ones, and enlarged their receptive fields with training-free token filtering.],
    [Also contributed to R²-dLLM (redundancy-aware dLLM decoding), training-free soft token interpolation for masked diffusion LLMs, and LAMB (attention-guided token filtering for SSMs).],
  ))
#exp([Bosch Research & Innovation Software Development Co., Ltd.], role: [Research Intern], dates: [July 2024 – May 2025],
  people: [Mentor: Dr. #xlink("https://yjzhang96.github.io/")[Youjian Zhang]],
  focus: [LiDAR-free Urban Scene Reconstruction],
  items: (
    [*D²GS*: To reconstruct urban scenes without LiDAR, co-optimized diffusion-generated dense depth and 3D Gaussian Splatting in an iterative loop, with progressive pruning and road-specific geometric constraints.],
  ))
#exp([Wuhan University, Signal Processing Lab], role: [Undergraduate Researcher], dates: [Oct. 2023 – Apr. 2024],
  people: [Advisor: Prof. #xlink("https://scholar.google.com.hk/citations?user=Klc_GHUAAAAJ&hl=en")[Lei Yu]],
  focus: [3D Vision, Event-based Vision],
  items: (
    [*BRS-E²NeRF*: Combined events with RGB through event-enhanced re-blurring and double-cycle optimization to jointly correct motion blur and rolling-shutter distortion for 3D reconstruction.],
  ))

// ---------- publications ----------
#section([Publications], note: [\* equal contribution])
#pub(1)[#me, Z. Du, S. Yao, L. Fu, H. Shen, X. Ma, L. Wei, M. Li, X. Yuan, D. Shi, Q. Jin, B. A. Prakash, W. Lee, and R. Luo. When to Look Again: Learning Observation Boundaries for Efficient Computer-Use Agents. #venue[Submitted to ACL ARR 2026].]
#pub(2)[#me, L. Wei, M. Li, D. Shi, X. Yuan, Z. Du, Q. Jin, and W. Lee. Rhythm of Thought: Progress-Aware Latent Reasoning via Reinforcement Learning. #venue[Submitted to ACL ARR 2026].]
#pub(3)[Z. Du, #me, J. Zhang, S. Yao, Z. Shi, Z. Zheng, J. Luo, X. Yuan, D. Shi, Q. Jin, and W. Lee. GEvol: Graph-Guided Benchmark Evolution for Terminal Agents. #venue[Submitted to ACL ARR 2026].]
#pub(4)[#me, M. Li, L. Wei, Z. Du, X. Yuan, D. Shi, Q. Jin, and W. Lee. MetaState: Persistent Working Memory Enhances Reasoning in Discrete Diffusion Language Models. #venue[COLM 2026]. #res("https://arxiv.org/abs/2603.01331")[Paper] #res("https://github.com/Les1a/MetaState")[Code] #res("https://les1a.github.io/projects/metastate/")[Website]]
#pub(5)[#strong[K. Xia\*], J. Jia\*, K. Jin, Y. Bai, L. Sun, D. Tao, and Y. Zhang. D²GS: Dense Depth Regularization for LiDAR-free Urban Scene Reconstruction. #venue[NeurIPS 2025]. #res("https://proceedings.neurips.cc/paper_files/paper/2025/hash/524ff06d5375d76e93d8490e654a81bf-Abstract-Conference.html")[Paper] #res("https://github.com/Les1a/D2GS")[Code] #res("https://les1a.github.io/projects/d2gs/")[Website]]
#pub(6)[Z. Ye\*, #strong[K. Xia\*], Y. Fu, X. Dong, J. Hong, X. Yuan, S. Diao, J. Kautz, P. Molchanov, and Y. Lin. LongMamba: Enhancing Mamba's Long-Context Capabilities via Training-Free Receptive Field Enlargement. #venue[ICLR 2025]. #res("https://proceedings.iclr.cc/paper_files/paper/2025/hash/ab5d50d269e52f8eed497062311ff173-Abstract-Conference.html")[Paper] #res("https://github.com/GATECH-EIC/LongMamba")[Code] #res("https://lemonandrabbit.github.io/")[Website]]
#pub(7)[H. Wang\*, #strong[K. Xia\*], Y. Wang, C. Zhang, M. Lin, and L. Yu. BRS-E²NeRF: Event Enhanced Neural Radiance Fields from Blurry Rolling Shutter Images. #venue[Pattern Recognition], 2026. #res("https://www.sciencedirect.com/science/article/abs/pii/S0031320326016109")[Paper]]
#pub(8)[Q. Jin, L. Tung, K. Li, Q. Shi, Y. She, H. Jia, H. Zhao, #me, Z. Du, et al. ChainSWE: Benchmarking Coding Agents on Multi-Bug Software Maintenance. #venue[EMNLP Main 2026]. #res("https://arxiv.org/abs/2607.02606")[Paper] #res("https://huggingface.co/datasets/C-lister/ChainSWE")[Benchmark]]
#pub(9)[Z. Ye, Z. Wang, #me, J. Hong, L. Li, L. Whalen, C. Wan, Y. Fu, Y. Lin, and S. Kundu. LAMB: A Training-Free Method to Enhance the Long-Context Understanding of SSMs via Attention-Guided Token Filtering. #venue[ACL Main 2025]. #res("https://aclanthology.org/2025.acl-short.96/")[Paper] #res("https://github.com/GATECH-EIC/LAMB")[Code]]
#pub(10)[X. Yuan, X. Diao, Z. Liu, C. Zhang, D. Shi, #me, Z. Du, S. Yao, S. Vosoughi, and W. Lee. Priority-Preserving Advantage Aggregation for Multi-Reward Policy Optimization. #venue[Preprint, 2026].]
#pub(11)[Z. Du, #me, X. Zhong, Y. Fu, N. Oswald, B. Ji, B. Khailany, P. Molchanov, and Y. Lin. R²-dLLM: Accelerating Diffusion Large Language Models via Spatio-Temporal Redundancy Reduction. #venue[Preprint, 2026]. #res("https://arxiv.org/abs/2604.18995")[Paper] #res("https://github.com/GATECH-EIC/R2-dLLM")[Code]]
#pub(12)[L. Fu, #me, Y. Wang, Y. Jin, J. He, X. Yang, H. Liu, Y. Yu, H. Jin, Y. Xiao, W. Lee, B. A. Prakash, and H. Wang. From Knowledge Access to Source Learning: Developing Source-Specific Competence. #venue[Preprint, 2026]. #res("https://arxiv.org/abs/2610.02150")[Paper] #res("https://github.com/luchengfu6/SourceLearn")[Code] #res("https://sourcelearn.github.io/")[Website]]
#pub(13)[M. Li, #me, G. Zhang, Z. Wang, G. Tao, S. Pan, J. Zhai, and S. Ma. EDITOR: Effective and Interpretable Prompt Inversion for Text-to-Image Diffusion Models. #venue[Preprint, 2025]. #res("https://arxiv.org/abs/2506.03067v3")[Paper]]
#pub(14)[Z. Du\*, J. Luo\*, Z. Zheng, X. Yuan, #me, D. Shi, Q. Jin, Q. He, S. Zou, Y. Liang, and W. Lee. PACT: Privileged Trace Co-Training for Multi-Turn Tool-Use Agents. #venue[Preprint, 2026]. #res("https://arxiv.org/abs/2606.16215")[Paper] #res("https://zhenbangdu.github.io/pact-project-page/")[Website]]
#pub(15)[D. Shi, H. Zhu, X. Yuan, W. Zhao, #me, W. Xiao, and W. Lee. CopT: Contrastive On-Policy Thinking with Continuous Spaces for General and Agentic Reasoning. #venue[Preprint, 2026]. #res("https://arxiv.org/abs/2605.20075")[Paper]]
#pub(16)[Y. Peng, M. Li, #me, R. Zhang, and A. Houmansadr. Membership Inference Attacks on Vision-Language-Action Models. #venue[Preprint, 2026]. #res("https://arxiv.org/abs/2605.07088")[Paper]]
#pub(17)[#strong[K. Xia\*], L. Wei\*, and L. Yu. A Spatio-temporal Event Transformer on Versatile Tasks for Human Behavior Analysis. #venue[MiGA Workshop at IJCAI 2024]. #res("https://ceur-ws.org/Vol-3848/paper_4.pdf")[Paper]]

// ---------- honors ----------
#section[Honors and Awards]
#award([Top Reviewer], [NeurIPS 2027 Main Conference], [2026])
#award([National Second Prize (Team Captain, Fifth Place)], [RoboCup China Open], [2024])
#award([First-Class Academic Scholarship], [Wuhan University], [2023 – 2024])
#award([“Luojia” Distinguished Exchange Student Scholarship], [Wuhan University], [2023 – 2024])
#award([National-Level Project], [Student Innovation & Entrepreneurship Project], [2023 – 2024])
#award([National First Prize], [Huazhong Cup Mathematical Modeling Challenge], [2023])
#award([Hubei Province First Prize], [China Undergraduate Mathematical Contest in Modeling], [2023])
#award([Outstanding Student], [Wuhan University], [2022 – 2023])
#award([Merit Student], [Wuhan University], [2021 – 2022, 2023 – 2024])
// ---------- teaching and service ----------
#section[Teaching and Service]
#award([Teaching Assistant], [CS 6035 Introduction to Information Security, Georgia Tech], [Spring 2026])
#award([Teaching Assistant], [CS 6262 Network Security, Georgia Tech], [Spring 2026])
#award([Teaching Assistant], [CS 4803/8803 Efficient Machine Learning, Georgia Tech], [Fall 2025])
#award([Conference Reviewer], [ECCV, COLM, NeurIPS, EMNLP, ICLR, NAACL], [From 2026])
