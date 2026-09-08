# 本次实际验证结果

日期：2026-09-07。验证对象是当前仓库修改后的 Jekyll 输出，不是设计稿。截图与详细 JSON 位于被排除发布的 tmp/homepage-review/。

## 构建与环境

- Windows；Ruby 3.2.11；Bundler 4.0.18；Jekyll 3.10.0；Playwright 驱动 Microsoft Edge 152.0.4191.66（真实浏览器，headless）。
- 初始工作区 master 干净，无 AGENTS.md，无自定义 GitHub Actions 构建流程；沿用 github-pages Gemfile，未升级或增加生产依赖。
- 初始 `bundle exec jekyll build` 成功，随后用 Jekyll serve 检查原页面。初始一次直接服务生产输出导致绝对资源指向线上，已纠正为 serve 自身构建后重新记录基线，未把那次无样式截图作为页面缺陷。
- 当前字号与链接排版修改后的生产构建成功（8.12 秒）。此前 `bundle exec jekyll build --baseurl /preview --destination tmp/homepage-review/baseurl-site` 已通过；本轮未重跑子路径构建。详细输出见构建日志。
- 生产 canonical 为 https://les1a.github.io/；子路径构建为 https://les1a.github.io/preview/；二十个站内 href / src 的前缀检查通过。
- docs、tests、tmp、README.md、CONTRIBUTING.md 均未进入构建产物。原头像、六幅原论文图、Gemfile 与许可证未改动；工作区已有新的 CV 文件改动，本轮未改写该文件。
- `git diff --check` 通过。Git 的 LF→CRLF 提示是当前 Windows 行尾设置提示，不是内容错误。
- 构建保留两类环境警告：GitHub Metadata 未认证 / 无网络；Faraday 提示可选 retry middleware。进程仍成功退出，主页事实不依赖 GitHub Metadata 自动获取。

## 首页浏览器验收

`node tests/homepage.cjs` 最终通过，failures 为 []，pageErrors 为 []。脚本通过 Ruby 读取论文数据；今后新增论文无需手动修改数量断言。

| 实际 viewport | 横向溢出 | 原图与头像 | 论文展示 | 原生导航 / BibTeX |
| --- | --- | --- | --- | --- |
| 1440 × 900 | 无 | 7/7 加载 | 六篇，无作者名单行 | 通过 |
| 1024 × 900 | 无 | 7/7 加载 | 完整可见 | 通过 |
| 768 × 900 | 无 | 7/7 加载 | 完整可见 | 通过 |
| 390 × 844 | 无 | 7/7 加载 | 单列、完整可见 | 通过 |
| 360 × 844 | 无 | 7/7 加载 | 单列、完整可见 | 通过 |

所有宽度已生成实际截图。桌面 1440 首条论文标题仍位于第一屏底部，发表信息和摘要紧随其后；未缩小论文标题或截断文本来挤入首屏。七张图片包含头像及原六张论文图。按最新反馈，BRS-E²NeRF 不在 Publications 展示，仅在武汉经历中保留介绍及出版社链接。

- 一个有效 H1；论文使用 H3；Experience 内分类 H3、机构 H4；存在 main / nav / footer 和首个 Tab 可到达的 skip link。
- 首屏采用作者提供的两段简介，身份不含 first-year；研究定位为 LLM post-training and agentic AI，学校及导师链接完整。首屏和 Education 统一为 Communication Engineering；页面描述同步更新。已检查生成 HTML 及桌面、移动端截图，五种屏宽均无溢出。
- 本科背景段落继承 bio 字号，五种屏宽实测两段均为 16px。Research 链接改为完整的单行行内块，名称与箭头保持在同一文字流中；空间不足时整条链接换行。浏览器逐一测量六个入口的文字行数和箭头位置，五种屏宽均未拆开，记录见 typography-review.json；桌面 Research 与移动端首屏截图已查看。
- 六篇展示论文不再显示作者名单或贡献脚注，五种宽度均核实对应行数为零；逐条核对 BibTeX 仍保留作者字段，书目数据未改变。元信息统一为 16px / 700 字重，仅显示会议／期刊与年份，逐条验证与数据一致且不含 Published / Preprint；数据中的 status 保留。已查看桌面与移动端论文区截图，无溢出。BRS-E²NeRF 的书目数据保留但不渲染论文条目。
- 每篇均有 Paper / Code / Project，共 18 个入口；逐一对比数据中的地址。按明确要求保留五个缺失地址的空 href，其他位置无意外空链接。不填猜测地址，不输出 Image unavailable 文本。
- 2025 年顺序实际核对为 D²GS → EDITOR → LongMamba → LAMB；Selected 标签数为零。新闻默认六条，从已确认的 2026.07 COLM 录用显示到 2025.02 LongMamba；其余三条归档。GTISC 无 EDITOR 描述或关联，Zoom / Bosch 均显示 Research Intern，武汉经历正确链接 BRS-E²NeRF。
- 首屏学校信息前增加学府建筑图标，桌面字体为 16px、移动端为 13px，字重均为 700；已查看桌面与移动端首屏及论文区截图，文字换行正常。31 个内联 SVG 装饰图标均有 aria-hidden 和 focusable=false，没有外部图标请求。
- Research 三个标题已核对为 Explicit and Implicit Reasoning、Efficient Language Models、Language Model Agents，描述改为研究方向概述。第一栏为 MetaState / Soft Token，第二栏为 R²-dLLM / LongMamba / LAMB；第三栏沿用产业研究链接。已读取 Soft Token GitHub README 并核对地址，浏览器实际渲染的标题与链接记录于 research-review.json。已查看 research-1440.png 与 research-390.png，标题自然换行、作品入口完整，五种屏宽回归均无溢出。
- 点击导航更新 URL hash；直接访问论文 hash、刷新、浏览器后退与旧 section hash 均通过，目标顶部不被固定导航遮挡。
- 键盘 Enter 操作 BibTeX 与所有 Earlier details 通过。真实剪贴板写入、读回一致（按 Windows CRLF 规范归一化比较）；模拟权限拒绝后仍可手动选择引用。
- JavaScript 关闭时，简介、六篇论文、资源、导航和原生 BibTeX 展开均可访问；作者名单及脚注同样不渲染，复制按钮隐藏。
- 模拟图片加载失败时，论文自然转为文字布局；模拟本地字体失败时，系统字体回退仍可读且无横向溢出。
- reduced-motion 环境下无强制平滑滚动或动画。两个本地字体均确认 loaded。该本地测试观测到的布局偏移累计值为 0；不是 Lighthouse 分数或真实用户性能统计。
- 十六个首页站内页面 / 资源请求均返回 200（包括 CV、两个项目页、七张图片、CSS / JS、两个字体和 favicon）。

主要配色按 WCAG 相对亮度公式计算：正文 14.17:1，次级文字 5.51:1，链接 8.98:1，暖金 5.36:1，主按钮文字 9.22:1。没有运行 Lighthouse 或 axe，不报告其分数。

## 项目页回归与外部限制

MetaState、D²GS、404 页面在 1440 与 390 px 实际打开并截图，均返回 200，未加载首页专属 CSS；最终均无页面横向溢出。

MetaState 原有移动端 citation grid 使用 1fr 的最小内容宽度导致 BibTeX 撑宽，本次仅改为 minmax(0, 1fr)；D²GS 项目页仅将作者显示名 Sun Li 更正为正式论文的 Li Sun。没有重新设计项目页或修改结果数据。

上一轮原有二十一个外部 URL 的独立只读检查中，十九个返回 200 且标题 / 已读内容匹配对象。LinkedIn 返回 999，导师主页遇到本地 SSL 证书链限制，列为未能验证。Scholar 返回 200，标题匹配 Kejing Xia。本轮新增 BRS-E²NeRF 的 Crossref / Elsevier API 均为 200，核实正式元数据；ScienceDirect 正文及首页 PDF 返回 403，未声称全文或共同贡献脚注核实通过，详见 FACTS.md。

项目页 / 旧 404 的外部字体、CDN 图标、MathJax 仍会受到本次浏览器网络权限限制；旧布局部分图标字体的 localhost 地址也在 127.0.0.1 预览环境请求失败。这些是原有资源 / 环境限制，未当作首页资源失败。项目页视频请求在页面导航离开时出现 ERR_ABORTED，不等于资源失效；不据此声称所有外部资源或所有视频已完整播放。

## 预览与文件

本地预览：<http://127.0.0.1:4000/>。当前进程使用 `--no-watch` 保持本轮验证快照；后续编辑请按 README 正常重启 serve。

最终截图：

- [桌面首屏](../tmp/homepage-review/desktop-top.png)、[桌面论文区](../tmp/homepage-review/desktop-publications.png)、[桌面整页](../tmp/homepage-review/desktop-full.png)
- [移动首屏](../tmp/homepage-review/mobile-top.png)、[移动论文区](../tmp/homepage-review/mobile-publications.png)、[移动整页](../tmp/homepage-review/mobile-full.png)
- 其余尺寸：viewport-1024-*、viewport-768-*、viewport-360-*；无 JS 截图 mobile-no-javascript.png。
- 先前的新闻及产业经历截图：desktop-news.png / mobile-news.png、desktop-professional-experience.png / mobile-professional-experience.png。以重新生成的 desktop-full.png / mobile-full.png 为当前整页预览，旧 brs-e2nerf 局部截图已过时。
- 机器记录：validation.json、external-links.json、build-checks.json；构建日志 build.log、baseurl-build.log。

交付保持本地未提交改动，未 push、merge 或触发公开部署。待确认学术事项见 FACTS.md；后续论文、新闻、经历、CV 的维护方式见 README.md。
