---
layout: page
title: Tracing the Origins of Solar Wind with Machine Learning
description: The project employs machine learning to analyze the physical characteristics of solar wind, trace its origins in the solar corona, and improve the prediction of heliophysical phenomena.
img: /assets/img/solar-wind-depiction.jpg
importance: 3
category: Machine Learning
github: https://github.com/SarahAmiraslani/solar-wind-coronal-origin-ml
giscus: true
giscuss_comments: true
toc:
  sidebar: left
---

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/solar-wind-depiction.jpg" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/solar-wind-animation.gif" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

# Introduction

## Solar Wind

The solar corona, the Sun’s outermost layer, continuously emits streams charged particles and magnetic fields, collectively known as the solar wind. This high-energy stream escapes the Sun’s gravitational pull, permeating the solar system and forming the heliosphere, a vast plasma bubble. Periodically, solar disturbances, such as interplanetary coronal mass ejections (ICMEs), solar flares, and high-speed streams, propagate outward into the heliosphere. {% cite carpenter2022characterizing %} These disturbances can interact with planetary magnetospheres and atmospheres, significantly influencing space weather conditions that impact Earth and other celestial bodies.


Some of the physical properties of solar wind (composition, charge state, proton entropy) can be determined in the solar corona and remain non-evolving as the solar wind parcels expand into the heliosphere. These properties can be used to connect in-situ measurements to their coronal origins. Studies up to this point have largely relied upon statistical methods, characterizing the wind into groups such as fast and slow wind.




In the past few years, there has been a growing push to use machine learning in the ﬁeld of heliophysics, in the form of (including but not limited to) predicting conditions in the solar wind/time series regression, identifying coronal features/events in solar images, and to serve as a tool to reduce subjective bias when determining solar wind groups. Here, we examine how machine learning, applied to several case studies of the solar wind, has the potential to link the physical properties measured in-situ to the origin of the wind at the Sun.

Understanding the solar wind’s characteristics is crucial for forecasting space weather conditions. Direct measurements in space are essential for tracing the solar wind’s origins near the Sun, where the plasma is accelerated, heated, and ionized. Traditionally, the classification of solar wind sources has relied on six in-situ measured physical properties: proton speed, proton entropy, proton temperature, ion charge states, and elemental composition. However, these measurements face challenges due to overlapping property values and the dynamic interactions of the solar wind with various elements of the solar system, which can obscure the definitive origins of the wind. Consequently, researchers often rely on subjective interpretation of continuous data distributions, making accurate categorization of the solar wind difficult.

The manual and semi-automatic classification of millions of hours of solar wind data from multiple missions can be replaced by automatic algorithms that can discover, in mountains of multi-dimensional data, the real differences in the solar wind properties. In this project, we present how unsupervised clustering techniques can be used to segregate different types of solar wind.



Solar wind classification serves four main roles:

1. Characterizing its origins in the corona.
2. Identifying conditions where solar wind is geoeffective.
3. Isolating different plasma populations for statistical analysis.
4. Studying the basic transport effects of space plasmas of different nature.

In our research we focus on the first objectibe of characterizing the origins of solar wind. Xu and Borovsky (2015) showed that the solar wind can generally be classified into four major types: coronal-hole-origin plasma (CHOP), streamer belt plasma (SBP), sector-reversal-region plasma (SRRP), and ejecta (EJECT). CHOP, sometimes called the fast solar wind, originates from the open-field line regions of coronal holes and typically exhibits speeds in excess of 500 km/s at 1 AU and beyond. Statistically, CHOP tends to be homogeneous with high proton temperature and low plasma density and is dominated by outward propagating Alfvénic waves. SBP and SRRP are subgroups of the streamer-belt-origin plasma (SBOP), also known as the slow solar wind, with a typical speed of less than 400 km/s. Compared to CHOP, SBOP does not exhibit much Alfvénic fluctuations.

The precise point of origin of the solar wind can be traced back from spacecraft positions to the solar corona and the photosphere. Multiple authors have used a ballistic approximation coupled to a Potential Field Source Surface (PFSS) model to trace back solar wind observations to their original sources on the Sun. This is currently the best method to acquire the ground truth about the origin of the solar wind. Unfortunately, there is no central repository of solar wind origins for any space mission that we can use to train or verify our novel machine learning technique.

The solar wind's in-situ properties are intrinsically linked to its origin near the Sun and in the inner solar atmosphere, where the wind plasma is accelerated, heated, and ionized. Therefore, the solar wind has defining characteristics reflecting the plasma properties of its coronal origin and the features of its acceleration process. For example, solar wind originating from coronal holes usually has fast proton speeds and low heavy ion charge state ratios, which are frozen-in at a certain height when the low electron temperature shuts down the ionization and recombination processes. In contrast, the solar wind coming from non-coronal-hole regions, such as the periphery of active regions, usually has slow or intermediate speeds.


 Generated by powerful, dynamic forces at the center of our world, our magnetosphere shields us from erosion of our atmosphere by the solar wind (charged particles our Sun continually spews at us), erosion and particle radiation from coronal mass ejections (massive clouds of energetic and magnetized solar plasma and radiation), and cosmic rays from deep space. Our magnetosphere plays the role of gatekeeper, repelling this unwanted energy that’s harmful to life on Earth, trapping most of it a safe distance from Earth’s surface in twin doughnut-shaped zones called the Van Allen Belts.

But Earth’s magnetosphere isn’t a perfect defense. Solar wind variations can disturb it, leading to “space weather” -- geomagnetic storms that can penetrate our atmosphere, threatening spacecraft and astronauts, disrupting navigation systems and wreaking havoc on power grids.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include video.liquid path="assets/video/YOUTUBE_1080_13506_Atmospheric_Escape+Aurora_youtube_1080.mp4" class="img-fluid rounded z-depth-1" controls=true autoplay=true %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/solar-wind-diagram.jpg" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    (left) A conceptual animation showing solar wind interacting with Earth's magnetic field and causing atmospheric loss within the cusp aurora at the polar cusps {% cite nasa_magnetopause %}. (right) A diagram depiction of solar wind's interaction with Earth's magnetosphere.
</div>


<div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/coronal-origin.png" class="img-fluid rounded z-depth-1" %}
    </div>
<div class="caption">
    A sketch of the Sun (yellow) with a coronal hole surrounded by two helmet streamers (pink labels). The source
locations of three types of plasma are indicated with the circles: coronal-hole-origin plasma (red), sector-reversal-region
plasma (purple), and streamer-belt-origin plasma (green). The streamer belt plasma may come from the edge of the
coronal hole near the streamer belt and/or interchange reconnection between open flux and the closed loops of
the streamer belt.
</div>


# Analytical Goals

Given the growing size and complexity of solar wind in-situ observations and the advancements in ML and AI techniques, it is crucial that we incorporate modern ML and AI data analysis methods into the field of Heliophysics solar wind data analysis. By doing so, we will be able to maximize the scientific outcomes we can learn from the data. Our research project aims to address the following an Specifically, we expect that our data will be used for the following purpose, but not limited to:

1. Apply dimension reduction method, such as, PCA, TSNE etc., to obtain informative solar wind in-situ data representation in the low-dimensional space. It will also provide better 2D/3D visualization support than traditional dimension reduction techniques.
2. Apply feature selection methods on the solar wind observed parameters, to objectively rank the importance of these measurements.
3. Employ  clustering methods such as DBSCAN, OPTICS, etc., and their variants to objectively cluster the low-dimensional representation of the solar wind data, in order to better understand the potential differences among the categories caused by the different coronal origins.



# Data

## [Advanced Composition Explorer (ACE) Spacecraft Data](https://science.nasa.gov/mission/ace/)
Launched in 1997, NASA's Advanced Composition Explorer (ACE) mission captures and analyzes particles from solar, interplanetary, interstellar, and galactic sources. Its primary aim is to explore the connections between the Sun, Earth, and the Milky Way by examining materials expelled by the Sun. ACE data comprise in-situ measurements collected at the Sun-Earth L1 Lagrange point, about 870,000 miles (1.4 million kilometers) from Earth — where the gravitational pull between the Earth and the Sun is at equilibrium {% cite nasa_solar %}. ACE is equipped with nine instruments: Solar Wind Ion Mass Spectrometer (`SWIMS`), Solar Wind Ion Composition Spectrometer (`SWICS`), Ultra-Low Energy Isotope Spectrometer (`ULEIS`), Solar Energetic Particle Ionic Charge Analyzer (`SEPICA`), Solar Isotope Spectrometer (`SIS`), Cosmic Ray Isotope Spectrometer (`CRIS`), Solar Wind Electron, Proton, and Alpha Monitor (`SWEPAM`), Electron, Proton, and Alpha-Particle Monitor (`EPAM`), Magnetometer (`MAG`), Real Time Solar Wind Experiment (`RTSW`) {% cite garrard1998ace %}.

We focus on the data from four  instruments of the ACE satellite:

- **Solar Wind Electron, Proton and Alpha Monitor** (`SWEPAM`): measures rates of electron and ion flows with two distinct electrostatic analyzers with fan- shaped fields of view that use the spacecraft’s rotation to observe in all directions. The first one observes electrons in the 1 eV–1.35 keV energy range and the second one ions in the 0.26–36 keV energy range {% cite mccomas1998solar %}.

- **Magnetic Field Monitor** (`MAG`): consists of a set of twin sensors measuring the three components of the interplanetary magnetic field at L1 {% cite stone1998advanced %}.

-  **Electron, Proton, and Alpha-Particle Monitor** (`EPAM`):

-  **Solar Wind Ion Mass Spectrometer** (`SWIMS`): {% cite gloeckler1992solar %}

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
    (left) A Boeing Delta II expendable launch vehicle lifts off with the Advanced Composition Explorer (ACE) from Cape Canaveral Air Station, Florida, on August 25, 1997. ACE reached its intended location at the Sun-Earth L1 Lagrange Point on January 21, 1998, and has been collecting data ever since, far exceeding its expected five-year lifespan. (center) An artist’s rendition of ACE in space. (right) A depiction of ACE’s scientific instruments.
</div>

<style>
.responsive-iframe {
  width: 100%;
  height: 600px; /* Adjust the height as needed */
}
</style>

<iframe class="responsive-iframe" src="https://eyes.nasa.gov/apps/solar-system/#/sc_ace" allowfullscreen></iframe>
<div class="caption">
    {% cite nasa_solar_system %}.
</div>




# Data Wrangling

ACE data is stored in daily HDF files. We developed Python utilities to scrape, concatenate, and merge hourly data from multiple instruments (`MAG`, `SWEPAM`, `EPAM`, `SWICS`). We handled data quality issues by removing rows with bad measurements and transforming quantitative data using a logarithm base 10 and Min-Max scaling. This approach minimized biases and ensured uniform scaling across variables.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/hdf5-example-data-structure-with-metadata.jpg" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>

# Feature Engineering

Using Zhao et al.’s classification scheme, we categorized solar wind into fast wind from coronal holes (CH), slow wind from non-coronal holes (NCH), and transient wind. This involved comparing the O7+/O6+ ratio to specific constants and proton speed multipliers.

# Dimensionality Reduction

We employed PCA, FPCA, KPCA, and t-SNE to investigate solar wind data in low-dimensional spaces. While PCA handles linear data, KPCA and t-SNE manage non-linear data. t-SNE, in particular, preserves local relationships, making it ideal for identifying clusters. Our t-SNE analysis used the Barnes-Hut method to create 3D visualizations, while PCA, FPCA, and KPCA provided 2D insights.

# K-Means: Spatially Separate Clusters


# UMAP: Latent Features

# Limitations

There are limitations to using in-situ properties to assign different types of solar wind to specific coronal sources. Firstly, the speed as a categorization metric is problematic. Solar winds originating from coronal holes are not always fast-speed wind; slow-speed wind could either have originated from small low-latitude coronal holes or from the boundaries of equatorward extensions of the polar coronal holes. Additionally, proton speed is not expected to be constant after the solar wind leaves the corona, as slow and fast solar wind streams can interact in "stream interaction regions" (SIR) or "co-rotating interaction regions." The solar wind can still be accelerated after it leaves the corona within the expanding magnetic field. Therefore, solar wind speed is far from being an ideal separator to classify the solar wind into categories associated with different coronal regions.

Moreover, most in-situ measurements represent continuous distributions, with no obvious separation points in any of these variables to naturally divide them into different regimes. Identifying the solar wind whose in-situ properties are in transitory regions is subjective. Furthermore, solar wind in-situ properties are observed to be solar cycle dependent, including changes between solar maxima and solar minima and long-term effects across multiple solar cycles. Therefore, any criteria based on in-situ measurements will continually need updating along the different phases of a solar cycle and from cycle to cycle.

# Acknowledgments

We thank the ACE Science Center (ASC) for maintaining the ACE spacecraft data, and acknowledge the support of NASA’s National Space Science Data Center, the Space Physics Data Facility, and Edward C. Stone of Caltech, the Principal Investigator for the ACE project.

We would also like to thank Dr. Liang Zhao for supporting our capstone project and providing Heliospheric Current Sheet (HCS) Indexes.

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
