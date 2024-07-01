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

# Project Statement

The research project utilizes machine learning techniques to analyze the solar wind's physical characteristics, identify its coronal origins, and enhance predictions of heliophysical phenomena. By leveraging data from the Advanced Composition Explorer (ACE) Spacecraft sensors and indices from the Heliospheric current sheet (HCS), we aim to deepen our understanding of the solar wind's properties and origins in the solar corona.

# Introduction

The solar corona, the outermost part of the Sun's atmosphere, emits a continuous flow of charged particles and magnetic fields known as the solar wind. This high-energy stream escapes the Sun’s gravitational influence. It permeates the entire solar system and is pivotal in shaping the space weather conditions that affect Earth and other celestial bodies. The solar wind extends the Sun's magnetic field across the solar system, which can lead to geomagnetic storms when interacting with Earth's magnetic field. These storms can disrupt satellite functions, communications, and terrestrial power systems.

Solar wind characteristics are primarily measured directly in space and are vital for understanding and forecasting space weather conditions. A key aspect of this research involves tracing the solar wind's origins near the Sun, where the plasma is accelerated, heated, and ionized. Historically, the classification of the solar wind’s sources used six in-situ measured physical properties: proton speed, proton entropy, proton temperature, ion charge states, and elemental composition {% cite zhao2017relation %}. However, these measurements face challenges due to overlapping property values and the dynamic interactions of the solar wind with various elements of the solar system, which can obscure the definitive origins of the wind. This limitation often results in researchers' reliance on subjective interpretation of continuous data distributions, making it difficult to categorize the solar wind accurately.

This applies machine learning algorithms to explore how the physical characteristics of the solar wind, captured through in-situ measurements by satellite sensors and magnetometers, can be employed to more accurately determine the solar wind's coronal origins and more accurately predict the data for the future Heliophsyical phenomena. Accurate classification of solar wind origins is crucial for space weather forecasting, protecting space missions, developing early warning systems, and enhancing our understanding of the solar system.

# Analytical Questions

1. How can novel dimension reduction methods, like PCA and t-SNE, enhance the representation and visualization of solar wind data?
2. How can feature selection methods rank the importance of solar wind parameters?
3. Can clustering methods like DBSCAN and OPTICS reveal differences in solar wind categories based on their coronal origins?

# Data

## Advanced Composition Explorer (ACE) data

NASA’s Advanced Composition Explorer (ACE), launched in 1997, captures particles from various sources to explore the Sun-Earth-Milky Way connection. ACE data, collected at the Sun-Earth L1 Lagrange point, includes 809,951 records with 174 features from 1998 to 2011. Additionally, we retrieved 207,894 data points from the Solar and Heliospheric Observatory (SOHO) to cover more recent data. These datasets provide essential measurements for our analysis.

ACE was launched on August 25th, 1997 and arrived at it's desired location at the Sun-Earth L1 Lagrange Point in January 21, 1998. It continues to collect data to date, far exceeding it's expected lifetime of five years.

<style>
.responsive-iframe {
  width: 100%;
  height: 600px; /* Adjust the height as needed */
}
</style>

<iframe class="responsive-iframe" src="https://eyes.nasa.gov/apps/solar-system/#/sc_ace" allowfullscreen></iframe>
<div class="caption">
    From NASA/JPL-Caltech/VTAD.
</div>

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/ace-launch.jpg" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/ace_artist_concept.jpg" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/ACE_Auto1F.jpeg" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">
    (left) A Boeing Delta II expendable launch vehicle lifts off with ACE from Cape Canaveral Air Station, Florida on August 25th, 1997.(center) artist's rendition of ACE in space (right) a depiction of the scientific instruments of ACE. There are nine in total: Solar Wind Ion Mass Spectrometer (SWIMS), Solar Wind Ion Composition Spectrometer (SWICS), Ultra-Low Energy Isotope Spectrometer (ULEIS), Solar Energetic Particle Ionic Charge Analyzer (SEPICA), Solar Isotope Spectrometer (SIS), Cosmic Ray Isotope Spectrometer (CRIS), Solar Wind Electron, Proton, and Alpha Monitor (SWEPAM), Electron, Proton, and Alpha-Particle Monitor (EPAM), Magnetometer (MAG), Real Time Solar Wind Experiment (RTSW).
</div>

# Data Wrangling

ACE data is stored in daily HDF files. We developed Python utilities to scrape, concatenate, and merge hourly data from multiple instruments (MAG, SWEPAM, EPAM, SWICS). We handled data quality issues by removing rows with bad measurements and transforming quantitative data using a logarithm base 10 and Min-Max scaling. This approach minimized biases and ensured uniform scaling across variables.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/hdf5-example-data-structure-with-metadata.jpg" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>

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
