---
layout: post
title: Exploring Information Visualization with the Bechdel Test
date: 2024-06-01 11:12:00-0400
description: an example of a blog post with some math
tags: data-visualization
categories: sample-posts
featured: false
related_posts: true
giscus: true
giscus_comments: true
excerpt_separator: "<!--more-->"
---

{::nomarkdown}
{% assign jupyter_path = "assets/jupyter/bechdeltest.ipynb" | relative_url %}
{% capture notebook_exists %}{% file_exists assets/jupyter/data_mining_blog.ipynb %}{% endcapture %}
{% if notebook_exists == "true" %}
{% jupyter_notebook jupyter_path %}
{% else %}

<p>Sorry, the notebook you are looking for does not exist.</p>
{% endif %}
{:/nomarkdown}

<!--more-->

Continue your post here...
