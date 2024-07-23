---
layout: distill
title: Exploring Breaking Bad Relations
date: 2024-07-22 11:12:00-0400
description: Visualizing character relations
tags: data-visualization
categories: exploration
featured: false
related_posts: true
giscus: true
giscus_comments: true
authors:
  - name: Sarah Amiraslani
    url: sarahamiraslani@gmail.com
    affiliations:
      name: None
toc:
  - name: Introduction
  - name: Data Sourcing
  - name: Data Processing

github: https://github.com/SarahAmiraslani/blog-posts/blob/main/visualization/breaking_bad.ipynb
bibliography: blogs-distill.bib
---

# Introduction

Breaking Bad is a critically acclaimed American television series created by Vince Gilligan. The show originally aired on AMC from January 20, 2008 to September 29, 2013 and consists of five seasons with a total of 62 episodes. The plot revolves around Walter White, a seemingly unremarkable high school chemistry teacher whose life takes a dramatic turn when he is diagnosed with terminal lung cancer. Facing his mortality, Walter dives into the world of methamphetamine production, driven by a desperate need to secure his family’s financial future. As Walter’s transformation from a mild-mannered teacher to a ruthless criminal mastermind unfolds, Breaking Bad explores themes of morality, desperation, greed, and the human psyche. Its exceptional storytelling, unforgettable characters, and profound thematic depth have solidified its status as a cultural phenomenon and a pillar of television history.

Breaking Bad is my favorite television series, and it has sparked my interest in visualizing the relationships between its characters through network analysis. In this blog post, I will dive into this fascinating aspect of the show, exploring how the intricate web of connections adds to its storytelling brilliance.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/BB_.jpg" class="img-fluid rounded z-depth-1 same-height" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/amc-breaking_bad.jpg" class="img-fluid rounded z-depth-1 same-height" %}
    </div>
</div>
<div class="caption">
Credits and explanation goes here.
</div>

# Data Sourcing

## Quotes

To model the relationships between characters in the Breaking Bad series, we need a reliable source of quotes. Wikiquote, an open-source, community-led project, provides an extensive collection of quotes contributed by fans. While it may not be exhaustive, it offers a sufficient dataset for our exploratory purposes. Fortunately, there is a dedicated [page](https://en.wikiquote.org/wiki/Breaking_Bad) for the Breaking Bad franchise.

To extract quotes data from Wikiquote, there are a few methods available. One option is to use a web-scraping tool to iterate through each Wikiquote page related to the Breaking Bad franchise and scrape the text. However, a more efficient approach is to utilize the publicly available and regularly updated data dumps provided by the Wikimedia organization. These dumps are updated at least monthly, making them a reliable source<d-footnote>Learn more about the data dumps at https://dumps.wikimedia.org/</d-footnote>. By requesting the XML files for the pages related to Breaking Bad, we can process the text without scraping. This method is ideal because the show’s finale aired nearly a decade ago, so the most recent data dumps should closely match the current live information, making real-time updates unnecessary.

The following commands were used to download the latest Wikiquote articles to my machine.

```bash
wget https://dumps.wikimedia.org/enwikiquote/latest/enwikiquote-latest-pages-articles.xml.bz2
bzip2 -d enwikiquote-latest-pages-articles.xml.bz2
```

`Wget` is a command-line tool that makes it possible to download the latest zipped xml data dump from the internet directly to your active directory. `bzip2 -d` allows us to decompress the XML file which is necessary to process this unstructured dataset into a semistructured or tabular form. The result is a large XML file that contains all of the Wikiquote article contents per the date of the dump (mine was last updated on 20-Jul-2024 18:02).

# Data Processing

Several developers have created utilities to facilitate this process, and I will be using one such tool: [wickedQuotes by heyseth](https://github.com/heyseth/wickedQuotes). This utility simplifies the extraction and processing of quotes from the data dump, allowing us to focus on analyzing the interactions and relationships between the characters in Breaking Bad.

While some quotes are "one-liners" by a single character, I am interested in interactions between characters. My goal is to have a visualization that allows us to compare which seasons/episodes/characters had the most quoted conversations. Ideally, we'd also like to know if a certain character had many conversations in one episode and fewer in others? Were there any outlier episodes with lots of conversations? Was there one season with many conversations? All these domain tasks map neatly to abstract problems of hierarchical data. Hierarchical visualization techniques will be a reasonable solution given these questions.
