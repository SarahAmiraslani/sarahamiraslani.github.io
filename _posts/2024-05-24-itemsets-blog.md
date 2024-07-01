---
layout: post
title: Exploring Frequent Itemsets using Tweets
date: 2024-05-24 11:12:00-0400
description: an example of a blog post with some math
tags: data-mining
categories: sample-posts
featured: false
related_posts: false
giscus: true
giscuss_comments: true
---

{::nomarkdown}
{% assign jupyter_path = "assets/jupyter/data_mining_blog.ipynb" | relative_url %}
{% capture notebook_exists %}{% file_exists assets/jupyter/data_mining_blog.ipynb %}{% endcapture %}
{% if notebook_exists == "true" %}
{% jupyter_notebook jupyter_path %}
{% else %}

<p>Sorry, the notebook you are looking for does not exist.</p>
{% endif %}
{:/nomarkdown}
