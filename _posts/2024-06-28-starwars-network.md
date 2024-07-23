---
layout: distill
title: Network Analysis of the Star Wars Films
date: 2024-06-28 11:12:00-0400
description: an exploration of network analysis with networkx.
tags: network-analysis
categories: exploration
github: https://github.com/SarahAmiraslani/blog-posts/blob/main/network_analysis/starwars_network_analysis.ipynb
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

bibliography: blogs-distill.bib
---

# Introduction

A network is a structure composed of interconnected nodes or elements, where the relationships between these nodes form intricate and often dynamic patterns<d-cite key="easley2010networks"></d-cite>. These patterns can be observed and analyzed across a vast spectrum of disciplines, ranging from the tangible physical sciences and and medicine to the complex interplay of human relationships within social networks.

In the physical sciences, networks can model the spread of infectious diseases, illustrating how pathogens navigate through populations <d-cite key="pinheiro2021using"><d-cite>. Similarly, in medicine, networks can map neural connections within the brain, illuminating the pathways of thought and behavior <d-cite key="lumaca2022network"><d-cite>. In social contexts, networks can represent relationships between individuals, organizations, or even entire societies. These networks can reveal patterns of influence, communication, and collaboration, providing insights into the dynamics of social interaction and the spread of ideas <d-cite key="freeman2004development"><d-cite>.

The study of networks, often referred to as network science, has emerged as a powerful tool for understanding complex systems across various domains. By analyzing the structure and dynamics of networks, researchers can uncover hidden patterns, predict emergent behaviors, and design more efficient and resilient systems.

# Motivation

In this blog post, I will delve into the field of network analysis and use it to uncover patterns and insights within the social networks of the Star Wars universe. By analyzing data on character interactions across the Star Wars saga, I will introduce the fundamentals of network analysis, including identifying key influencers and communities and understanding the flow of information and power.

# Data Source

The network data we'll be using for this analysis is based on the work of Evelina Gabasova. She extracted interactions between characters from the scripts of Star Wars Episodes I through VII. The network is defined by characters who speak to each other within the same scene where the nodes are the characters and the edges represent their communication. The network is undirected and the edges are weighted by the number of interactions between the characters.

You can find the code used to create the network on [GitHub](https://github.com/evelinag/star-wars-network-data) and download the data itself from [Kaggle](https://github.com/evelinag/star-wars-network-data) <d-cite key="gabasova_star_wars_2016"><d-cite>.

# Analysis

```
=== Network Summary ===
Number of characters:                    110
Number of interactions:                  398
Number of connected components:          2
Number of isolated nodes:                1

=== Network Structure Insights ===
Network density:                         0.0664
Average clustering coefficient:          0.6768

=== Interaction Details ===
Character with the most interactions:    ANAKIN (41 interactions)
Character with the least interactions:   GOLD FIVE (0 interactions)
Average number of interactions:          7.24
Standard deviation of interactions:      7.73

=== Centrality Measures ===
Character with highest degree centrality: ANAKIN (0.3761)
Character with lowest degree centrality: GOLD FIVE (0.0000)
Character with highest betweenness centrality: OBI-WAN (0.2129)
Character with lowest betweenness centrality: PK-4 (0.0000)
Character with highest closeness centrality: OBI-WAN (0.5516)
Character with lowest closeness centrality: GOLD FIVE (0.0000)

=== Clustering Measures ===
Average clustering coefficient:          0.6768
Transitivity:                            0.3490

=== Path Analysis ===
Network is not connected; average shortest path length and diameter are not defined.
```

## Connectivity

A graph is connected if, for every pair of nodes, there is a path between them. When a graph is not connected the network is comprised of multiple graph components. A connected component is a subset of nodes where:

1. Every node in the subset

## Degree Distributions

The degree of a node in an undirected graph is the number of neighbors it has.
