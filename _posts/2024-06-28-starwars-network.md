---
layout: distill
title: Network Analysis of the Star Wars Films
date: 2024-06-28
description: This blog post explores the fundamentals of network analysis using the Star Wars character interactions.
tags: network-analysis
categories: exploration
github: https://github.com/SarahAmiraslani/blog-posts/blob/main/network_analysis/starwars_network_analysis.ipynb
featured: false
giscus: true
giscus_comments: true
authors:
  - name: Sarah Amiraslani
    url: sarahamiraslani@gmail.com
    affiliations:
      name: None
thumbnail: assets/img/starwars-network.png
toc:
  - name: Introduction
  - name: Motivation
  - name: Data Source
  - name: Analysis
bibliography: blogs-distill.bib

_styles: >
  .fake-img {
    background: #bbb;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 0px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 12px;
  }
  .fake-img p {
    font-family: monospace;
    color: white;
    text-align: left;
    margin: 12px 0;
    text-align: center;
    font-size: 16px;
  }
---

# Introduction

Networks are structures of interconnected elements that offer a powerful lens for understanding complex systems across diverse disciplines. These intricate webs of relationships reveal patterns and behaviors that span from the microscopic to the societal. In the realm of physical sciences, network models illuminate the spread of diseases, showing how pathogens traverse populations. Within medicine, neural networks map the brain's intricate connections, shedding light on cognition and behavior. In social contexts, networks capture the dynamics of human interaction revealing patterns of influence, communication, and collaboration. These insights unveil how ideas propagate and social movements emerge. Network science, the study of these interconnected structures, has emerged as a versatile tool. It enables researchers to uncover hidden patterns, predict complex behaviors, and design more efficient and resilient systems. Whether modeling disease outbreaks, understanding social dynamics, or optimizing infrastructure, network science provides a framework for unraveling the complexities of our interconnected world.

A network is a structure composed of interconnected nodes or elements, where the relationships between these nodes form intricate and often dynamic patterns<d-cite key="easley2010networks"></d-cite>. These patterns can be observed and analyzed across a vast spectrum of disciplines, ranging from the tangible physical sciences and and medicine to the complex interplay of human relationships within social networks.

In the physical sciences, networks can model the spread of infectious diseases, illustrating how pathogens navigate through populations <d-cite key="pinheiro2021using"></d-cite>. Similarly, in medicine, networks can map neural connections within the brain, illuminating the pathways of thought and behavior <d-cite key="lumaca2022network"></d-cite>. In social contexts, networks can represent relationships between individuals, organizations, or even entire societies. These networks can reveal patterns of influence, communication, and collaboration, providing insights into the dynamics of social interaction and the spread of ideas <d-cite key="freeman2004development"></d-cite>.

The study of networks, often referred to as network science, has emerged as a powerful tool for understanding complex systems across various domains. By analyzing the structure and dynamics of networks, researchers can uncover hidden patterns, predict emergent behaviors, and design more efficient and resilient systems.

## Key Concepts


## Structure


## Connectivity
In network analysis, a fundamental question is whether every node within a network can reach every other node by traversing its edges. A network is considered connected if a path exists between any two nodes.

A network that is not connected can be divided into distinct, self-contained groups of nodes called connected components. Each connected component represents a subset of the network where every node within the component has a path to every other node within the component, but this property does not hold true for a larger set of nodes (i.e., not fully connected to a larger piece of the graph).

Dividing a network into it's components is a global way of describing it's structure. Within a given component, there may be more informative internal structure that is important to understanding the network.



## Distance

Beyond simple connectivity, it's often more informative to quantify the distance between nodes. For example, in the spread of news or diseases, understanding how many "hops" information or contagion must take to travel between individuals is vital.

The distance between two nodes is defined as the length of the shortest path between them, where each step along a path represents a connection between nodes. We can then characterize the distance between all pairs of nodes in a graph by looking at the average distance between every pair of nodes in the network or the maximum distance between any pair of nodes.

**Breadth-first search** (BFS) is a common algorithm used to efficiently find shortest paths in networks. The algorithm is as follows:

1. Find all distances to a seed node.
2. Find all connections to the seed node and declare them to be at distance 1.
3. For each node found in step 1, find all their connections which were not previously found, and declare them to be at distance 2.
4. Continue discovering new nodes in layers with each new layer adding one to the distance.


<div class="row equal-height">
    <!-- Left column for the image -->
    <div class="col-md-6 mt-3 mt-md-0">
        <div class="content">
            {% include figure.liquid loading="eager" path="assets/img/network-example.png" title="" class="img-fluid rounded z-depth-1" %}
        </div>
    </div>

    <!-- Right column for the markdown table -->
    <div class="col-md-6 mt-3 mt-md-0">
        <div class="content">
            <table class="table">
                <thead>
                    <tr>
                        <th>Distance</th>
                        <th>Nodes</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>K, B</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>C</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>E, F</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>H, I, D, G</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>J</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>


# Motivation

In this blog post, I will delve into the field of network analysis and use it to uncover patterns and insights within the social networks of the Star Wars universe. By analyzing data on character interactions across the Star Wars saga, I will introduce the fundamentals of network analysis, including identifying key influencers and communities and understanding the flow of information and power.

# Data Source

The network data we'll be using for this analysis is based on the work of Evelina Gabasova. She extracted interactions between characters from the scripts of Star Wars Episodes I through VII. The network is defined by characters who speak to each other within the same scene where the nodes are the characters and the edges represent their communication. The network is undirected and the edges are weighted by the number of interactions between the characters.

You can find the code used to create the network on [GitHub](https://github.com/evelinag/star-wars-network-data) and download the data itself from [Kaggle](https://github.com/evelinag/star-wars-network-data) <d-cite key="gregor2015draw"></d-cite>.

# Key Concepts




<div class="row d-flex align-items-stretch">
    <!-- Left column for the image -->
    <div class="col-md-6 mt-3 mt-md-0 d-flex">
            {% include figure.liquid loading="eager" path="assets/img/network-example.png" title="" class="img-fluid rounded z-depth-1" %}
    </div>

    <!-- Right column for the markdown table -->
    <div class="col-md-6 mt-3 mt-md-0 d-flex">
        <div class="flex-fill">
            <table class="table">
                <thead>
                    <tr>
                        <th>Distance</th>
                        <th>Nodes</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>K, B</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>C</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>E, F</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>H, I, D, G</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>J</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>

## Degree Distributions

The degree of a node in an undirected graph is the number of neighbors it has.
