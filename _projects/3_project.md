---
layout: page
title: Tracing the Origins of Solar Wind with Machine Learning
description: This project uses in-situ measurements and unsupervised learning to cluster solar wind with similar properties and map it to its coronal origins, aiming to enhance predictions of heliospheric phenomena through machine learning.
img: /assets/img/solar-wind-depiction.jpg
importance: 3
category: Machine Learning
github: https://github.com/SarahAmiraslani/solar-wind-coronal-origin-ml
giscus: true
giscuss_comments: true
---

# Introduction

The corona, the Sun's outer atmosphere, releases a stream of hot, high-pressure charged particles and magnetic fields that escape the Sun’s gravitational pull and extend throughout our solar system. This phenomenon, termed as solar wind, contributes to the plasma that fills the solar system and significantly impacts the space weather conditions surrounding Earth and other planets. As the solar wind travels through space, it carries with it the Sun's magnetic field, extending the solar magnetic field throughout the solar system. This interaction with Earth's magnetic field can cause geomagnetic storms, which can disrupt satellite operations, communication systems, and power grids on Earth. This applies machine learning algorithms to explore how the physical characteristics of the solar wind, captured through in-situ measurements by satellite sensors and magnetometers, can be employed to more accurately determine the solar wind's coronal origins and more accurately predict the data for the future Heliophsyical phenomena. Accurate classification of solar wind origins is crucial for space weather forecasting, protecting space missions, developing early warning systems, and enhancing our understanding of the solar system.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0 custom-img-container">
        {% include figure.liquid loading="eager" path="assets/img/8.jpg" class="img-fluid rounded z-depth-1 custom-img" zoomable=true %}
    </div>
    <div class="col-sm mt-3 mt-md-0 custom-img-container">
        {% include figure.liquid loading="eager" path="assets/img/10.jpg" class="img-fluid rounded z-depth-1 custom-img" zoomable=true %}
    </div>
</div>

# Analytical Questions

1. How can novel dimension reduction methods, like PCA and t-SNE, enhance the representation and visualization of solar wind data?
2. How can feature selection methods rank the importance of solar wind parameters?
3. Can clustering methods like DBSCAN and OPTICS reveal differences in solar wind categories based on their coronal origins?

# Data Ingestion

NASA’s Advanced Composition Explorer (ACE), launched in 1997, captures particles from various sources to explore the Sun-Earth-Milky Way connection. ACE data, collected at the Sun-Earth L1 Lagrange point, includes 809,951 records with 174 features from 1998 to 2011. Additionally, we retrieved 207,894 data points from the Solar and Heliospheric Observatory (SOHO) to cover more recent data. These datasets provide essential measurements for our analysis.

# Data Wrangling

ACE data is stored in daily HDF files. We developed Python utilities to scrape, concatenate, and merge hourly data from multiple instruments (MAG, SWEPAM, EPAM, SWICS). We handled data quality issues by removing rows with bad measurements and transforming quantitative data using a logarithm base 10 and Min-Max scaling. This approach minimized biases and ensured uniform scaling across variables.

# Feature Engineering

Using Zhao et al.’s classification scheme, we categorized solar wind into fast wind from coronal holes (CH), slow wind from non-coronal holes (NCH), and transient wind. This involved comparing the O7+/O6+ ratio to specific constants and proton speed multipliers.

# Dimensionality Reduction

We employed PCA, FPCA, KPCA, and t-SNE to investigate solar wind data in low-dimensional spaces. While PCA handles linear data, KPCA and t-SNE manage non-linear data. t-SNE, in particular, preserves local relationships, making it ideal for identifying clusters. Our t-SNE analysis used the Barnes-Hut method to create 3D visualizations, while PCA, FPCA, and KPCA provided 2D insights.

# Acknowledgments

We thank the ACE Science Center (ASC) for maintaining the ACE spacecraft data, and acknowledge the support of NASA’s National Space Science Data Center, the Space Physics Data Facility, and Edward C. Stone of Caltech, the Principal Investigator for the ACE project.

<style>
.custom-img-container {
    width: 100%; /* Ensure the container takes the full width of its parent */
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.custom-img {
    width: 50%; /* Make the image take up 50% of the screen width */
    height: auto; /* Adjust height automatically to maintain aspect ratio */
    object-fit: contain; /* Ensure the image fits within its bounding box without cropping */
}
</style>
