# Kejing Xia · Academic Homepage

这是 [les1a.github.io](https://les1a.github.io/) 的 Jekyll / AcademicPages 源码。网站保持英文，维护说明使用中文。继续通过原有 GitHub Pages 流程发布；本次修改不引入新框架或后端。

## 本地预览

需要 Ruby、Bundler 和 Git。首次安装项目依赖：

```sh
bundle install
bundle exec jekyll build
bundle exec jekyll serve --host 127.0.0.1 --port 4000
```

打开 <http://127.0.0.1:4000/>。修改内容和 CSS 后会自动重建；修改 `_config.yml` 后重启 serve。以实际构建结果为准，不必删除锁文件、升级全部 gems，也不需要 npm 才能修改首页。

生产构建可用 `JEKYLL_ENV=production bundle exec jekyll build`；PowerShell 先执行 `$env:JEKYLL_ENV='production'`。预览前恢复为 `development` 并运行 serve，避免把生产域名的绝对资源地址误当成本地资源。首页内部路径使用 Jekyll URL 过滤器，canonical / Open Graph 使用绝对地址。

## 更新内容

| 内容 | 唯一维护入口 | 做法 |
| --- | --- | --- |
| 论文及后续新增 | `_data/publications.yml` | 添加一条 YAML 记录；模板自动按年份倒序，同年按 `order` 升序排列 |
| 新闻 | `_data/news.yml` | 按真实年月倒序插入；`archived: true` 的条目进入 Earlier news，其余默认显示 |
| 学术与产业经历 | `_data/experience.yml` | 在 `research` 或 `industry` 添加记录，保持各自时间倒序 |
| 教育、荣誉、更新时间 | `_data/home.yml` | 更新已证实内容；`updated` 仅在实际内容更新后修改 |
| 简介、研究方向 | `_pages/about.md` | 编辑短文和对应论文锚点 |
| 联系方式 | `_config.yml` 的 `author` | Email、Scholar、GitHub、LinkedIn 自动用于主页 |
| 顶部导航 | `_data/navigation.yml` | 站内路径以 `/` 开头 |
| CV | `assets/3_CV.pdf` | 用新 PDF 替换同名文件，保留所有已有链接 |

论文记录需要 `id`、`short_title`、`title`、`authors`、`year`、`order`、`venue`、`status`、`summary`、`paper_url`、`bibtex`。`id` 一旦发布应保持稳定，供 Research / News / Experience 跳转。`order` 只是编辑顺序，不是假日期。

按最新展示要求，Publications 不显示作者名单及其脚注。作者数据和 BibTeX 中的完整作者信息仍保留，供准确引用与后续维护；不要因页面隐藏而删掉引文作者。每个作者使用 `name`；只有论文首页明确说明时才能记录 `equal: true` 或 `corresponding: true` 及 `author_note`。星号未必表示共同一作：例如 LAMB 的脚注只说明 Intel 实习背景。

配图为可选的 `image` 对象，包含 `path`、原图 `width` / `height`、`alt`；缺图时整个对象省略。图片用 contain 完整展示。按最新页面要求，每篇始终显示 Paper / Code / Project。缺失资源地址填写空字符串 `''`（省略字段也会输出空 href），入口保持可点击，浏览器点击后重新打开当前文档；取得真实地址后直接替换该字段。不要猜测地址。页面不再显示 Selected 标签。2025 年 `order` 依次为 D²GS 1、EDITOR 2、LongMamba 3、LAMB 4。

论文元信息在页面只显示会议／期刊名称与年份，例如 COLM · 2026、arXiv · 2026，不再输出 Published / Preprint；数据中的 `status` 继续保留供维护核对。BibTeX 用 YAML `|` 多行块保存。优先复制正式发表记录，arXiv 引文保留其真实类型和 eprint，不能只把会议名称换进去。当前 MetaState 的状态来自作者 v3 论文首页，引用暂用可验证的 arXiv 版本；不伪造尚未取得的正式会议条目。

新闻可用 `publication: metastate` 这样的 ID，配合 `before` / `after`；论文短名和跳转自动从论文数据取得。普通旧新闻使用 `text`。新闻日期写带引号的 `YYYY-MM`，首次 arXiv 发布月不等于会议录用月。当前从 2026.07 MetaState 录用新闻显示到 2025.02 LongMamba；更早三条加 `archived: true`。今后新新闻默认显示，不会自动挤掉 LongMamba。需收起某条时再显式加归档字段。

经历的 `works` 接受论文 ID 列表。只在经历中关联、无需在 Publications 展示的工作，可在论文数据中设置 `listed: false`；经历链接将直接指向该论文的 `paper_url`。BRS-E²NeRF 当前采用这一设置，已核实的书目信息仍集中保留在数据文件中。没有可核实职务时省略 `role`，不从实验室或公司名称推断访问、雇佣或实习身份。更新结束日期时核实实际状态，不能只根据当前日历推算。

## 页面结构与验证

首页使用 `_layouts/academic-home.html`、`_includes/home/`、`assets/css/academic-home.css` 和很小的 `assets/js/academic-home.js`。首页 CSS 限定在 `.academic-home`。原 AcademicPages 样式保存在 `academic-legacy.css`，供 404 等旧布局使用。两个项目页保留独立资源。线性图标集中在 `_includes/home/icon.html`，使用内联 SVG，无需外部图标库。

Inter 与 Source Serif 4 的 Latin WOFF2 字体随站点托管，字体加载失败时有系统回退。许可证位于 `assets/fonts/*-OFL.txt`。中文姓名使用系统中文衬线字体。

人工检查 1440 / 1024 / 768 / 390 / 360 px，重点检查首屏学校信息、长标题、图片和展开的 BibTeX，以及键盘、直接 hash、返回和刷新。已有可重复的浏览器验证脚本：

```sh
node tests/homepage.cjs
```

需在开发环境提供 Playwright 与 Microsoft Edge，并先运行 Jekyll serve。测试依赖不会进入生产站点。在 Codex 环境可把 bundled node_modules 路径设为 `NODE_PATH`；其他环境可在仓库外安装 Playwright，或使用已有的安装。脚本通过 Ruby 读取论文数据，不需额外 YAML 依赖。可选环境变量 `HOMEPAGE_URL`、`BROWSER_CHANNEL`。

截图和机器报告输出到 `tmp/homepage-review/`，被 Git 和 Jekyll 排除。`docs/`、`tests/` 和此 README 也被 Jekyll 排除，不会成为公开网页。检查 [事实与待确认记录](docs/FACTS.md) 和 [实际验证报告](docs/VALIDATION.md)。

## 归属

基于 [AcademicPages](https://github.com/academicpages/academicpages.github.io)，其源自 Michael Rose 的 Minimal Mistakes，由 Stuart Geiger 改编，后续由 AcademicPages 维护者维护。保留仓库 MIT LICENSE、站点归属及各项目原有许可。字体按随附 SIL Open Font License 使用。
