---
layout: distill
title: Network Analysis of the Star Wars Films
date: 2024-06-28 11:12:00-0400
description: an exploration of network analysis with networkx.
tags: network-analysis
categories: exploration
featured: false
related_posts: true
giscus: true
giscus_comments: true
excerpt_separator: "<!--more-->"
---


# Introduction

A network, or graph, is a representation of connections among a set of items where items are called nodes and the connections are called edges.

# Data Source

Data retrieved from Kaggle. The JSON can be downloaded from https://www.kaggle.com/datasets/ruchi798/star-wars and is originally attributed to Source: Gabasova, E. (2016). Star Wars social network. DOI: https://doi.org/10.5281/zenodo.1411479.

The nodes in this network represent star wars characters and the edges represent conversations between them. Because a conversation is a two way activity this is an undirected network where the edges have no direction and the relationship between the nodes is symmetric. This network is weighted by the number of interactions between the characters, where more interactions corresponds to a stronger connection.

# Analysis

## Connectivity

A graph is connected if, for every pair of nodes, there is a path between them. When a graph is not connected the network is comprised of multiple graph components. A connected component is a subset of nodes where:

1. Every node in the subset

## Degree Distributions

The degree of a node in an undirected graph is the number of neighbors it has.
