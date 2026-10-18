---
layout: academic-home
permalink: /
title: "Kejing Xia | Language Models, Reasoning & Memory"
description: "Kejing Xia (夏可敬) is a Computer Science Ph.D. student at Georgia Tech, advised by Wenke Lee. Research on LLM post-training, reasoning, diffusion language models, and agentic AI."
author_profile: false
redirect_from:
  - /about/
  - /about.html
---

<section id="about" class="home-hero" aria-labelledby="home-title">
  <div class="hero-title">
    <!-- Each .tok is one token of the name; --s is the decoding step at which it is unmasked (see academic-home.css). Keep the H1 on one line. -->
    <h1 id="home-title" class="hero-name"><span class="tok" style="--s:2">Ke</span><span class="tok" style="--s:1">jing</span> <span class="tok" style="--s:4">X</span><span class="tok" style="--s:3">ia</span> <span lang="zh" class="name-native"><span class="tok" style="--s:4">夏</span><span class="tok" style="--s:2">可</span><span class="tok" style="--s:3">敬</span></span></h1>
    <p class="eyebrow">{% include home/icon.html name='university' %}<span><span class="eyebrow-part">Georgia Institute of Technology ·</span> <span class="eyebrow-part">GTISC Lab ·</span> <span class="eyebrow-part">Atlanta</span></span></p>
  </div>
  <div class="hero-bio">
    <p>I am a Computer Science Ph.D. student at <a href="https://www.gatech.edu/">Georgia Tech</a>, advised by Prof. <a href="https://wenke.gtisc.gatech.edu/">Wenke Lee</a> in the <a href="https://lab.gtisc.gatech.edu/gtisc/">GTISC Lab</a>. My research centers on LLM post-training and agentic AI, with particular interests in reasoning, efficient language models, and systems that make language models more useful in interactive environments.</p>
    <p class="education-note">Before joining the Ph.D. program, I earned my B.Eng. in Communication Engineering (Artificial Intelligence Track) from <a href="https://en.whu.edu.cn/">Wuhan University</a>.</p>
  </div>
  <div class="home-actions" aria-label="Contact and profiles">
    <a class="primary-action" href="{{ '/assets/3_CV.pdf' | relative_url }}">{% include home/icon.html name='paper' %}CV <span aria-hidden="true">↗</span></a>
    <a href="mailto:{{ site.author.email }}">{% include home/icon.html name='mail' %}Email</a>
    <a href="{{ site.author.googlescholar | escape }}">{% include home/icon.html name='scholar' %}Google Scholar</a>
    <a href="https://github.com/{{ site.author.github }}">{% include home/icon.html name='code' %}GitHub</a>
  </div>
  <img class="hero-portrait" src="{{ '/images/profile.jpg' | relative_url }}" alt="Kejing Xia" width="713" height="844" fetchpriority="high">
</section>

<section id="research" class="home-section research-section" aria-labelledby="research-heading">
  <span id="research-interests" class="anchor-alias" aria-hidden="true"></span>
  <h2 id="research-heading">Research</h2>
  <div class="research-grid">
    <article>
      <h3>Ex- and Implicit Reasoning</h3>
      <p>I study how language models reason, spanning explicit reasoning steps, implicit representations, and the use of memory.</p>
      <div class="research-links"><a href="#metastate">MetaState <span aria-hidden="true">↗</span></a><a href="https://github.com/Les1a/SoftTokenForMaskedDLM">Soft Token <span aria-hidden="true">↗</span></a><a href="#rot">RoT <span aria-hidden="true">↗</span></a></div>
    </article>
    <article>
      <h3>Efficient Language Models</h3>
      <p>I explore efficient and scalable language models, balancing computational cost, model capabilities, and the ability to handle long contexts.</p>
      <div class="research-links"><a href="#r2-dllm">R²-dLLM <span aria-hidden="true">↗</span></a><a href="#longmamba">LongMamba <span aria-hidden="true">↗</span></a><a href="#lamb">LAMB <span aria-hidden="true">↗</span></a></div>
    </article>
    <article>
      <h3>Language Model Agents</h3>
      <p>I study language model agents that reason, act, and interact with their environments, aiming to make them more capable and reliable across tasks.</p>
      <div class="research-links"><a href="#sourcelearn">SourceLearn <span aria-hidden="true">↗</span></a><a href="#lookagain-cua">LookAgain-CUA <span aria-hidden="true">↗</span></a></div>
    </article>
  </div>
</section>

<section id="publications" class="home-section" aria-labelledby="publications-heading">
  <div class="section-heading"><h2 id="publications-heading">Publications</h2><p>Selected publications</p></div>
  {% assign listed_publications = site.data.publications | where_exp: 'pub', 'pub.listed != false' | where_exp: 'pub', 'pub.status != "Under review"' %}
  {% assign year_groups = listed_publications | group_by: 'year' | sort: 'name' | reverse %}
  {% for group in year_groups %}
  <div class="publication-year-group">
    <p class="publication-year">{{ group.name }}</p>
    {% assign ordered_papers = group.items | sort: 'order' %}
    {% for publication in ordered_papers %}{% include home/publication.html publication=publication %}{% endfor %}
  </div>
  {% endfor %}
</section>

<section id="under-review" class="home-section" aria-labelledby="under-review-heading">
  <h2 id="under-review-heading">Under Review</h2>
  {% assign under_review = site.data.publications | where: 'status', 'Under review' | sort: 'order' %}
  <div class="publication-year-group">{% for publication in under_review %}{% include home/publication.html publication=publication %}{% endfor %}</div>
</section>

<section id="news" class="home-section" aria-labelledby="news-heading">
  <h2 id="news-heading">News</h2>
  {% assign recent_news = site.data.news | where_exp: 'item', 'item.archived != true' %}
  {% include home/news.html items=recent_news %}
  {% assign earlier_news = site.data.news | where: 'archived', true %}
  {% if earlier_news.size > 0 %}
  <details class="earlier-details"><summary>Earlier news</summary>{% include home/news.html items=earlier_news %}</details>
  {% endif %}
</section>

<section id="experience" class="home-section" aria-labelledby="experience-heading">
  <h2 id="experience-heading">Experience</h2>
  <h3 id="research-experience" class="subsection-heading">Research Experience</h3>
  {% include home/experience.html items=site.data.experience.research %}
  <h3 id="professional-experience" class="subsection-heading">Industry Research</h3>
  {% include home/experience.html items=site.data.experience.industry %}
</section>

<section id="education" class="home-section" aria-labelledby="education-heading">
  <h2 id="education-heading">Education</h2>
  <div class="education-list">
    {% for item in site.data.home.education %}
    <article><div class="experience-heading"><h3>{{ item.institution | escape }}</h3><p class="experience-date">{{ item.dates | escape }}</p></div><p>{{ item.degree | escape }}</p></article>
    {% endfor %}
  </div>
  <details class="earlier-details"><summary>Earlier background</summary><p>I studied at the <a href="https://www.hzsdyfz.com.cn/about.html">No. 1 Middle School Affiliated to Central China Normal University</a>.</p></details>
</section>

<section id="honors" class="home-section" aria-labelledby="honors-heading">
  <span id="awards" class="anchor-alias" aria-hidden="true"></span><span id="competition" class="anchor-alias" aria-hidden="true"></span>
  <h2 id="honors-heading">Honors &amp; Competitions</h2>
  {% include home/honors.html items=site.data.home.honors %}
  <details class="earlier-details"><summary>More honors &amp; competitions</summary>{% include home/honors.html items=site.data.home.earlier_honors %}</details>
</section>
