---
layout: post
title: Network Analysis of the Star Wars Films
date: 2024-06-28 11:12:00-0400
description: an exploration of network analysis with networkx.
tags: network-analysis
categories: exploration
featured: false
related_posts: true
giscus: true
giscuss_comments: true
excerpt_separator: "<!--more-->"
---

{::nomarkdown}
{% assign jupyter_path = "assets/jupyter/starwars_network_analysis.ipynb" | relative_url %}
{% capture notebook_exists %}{% file_exists assets/jupyter/starwars_network_analysis.ipynb %}{% endcapture %}
{% if notebook_exists == "true" %}
{% jupyter_notebook jupyter_path %}
{% else %}

<p>Sorry, the notebook you are looking for does not exist.</p>
{% endif %}
{:/nomarkdown}

<!--more-->
