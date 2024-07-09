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


# Introduction

## Solar Wind

The solar corona, the outermost part of the Sun’s atmosphere, emits a continuous flow of charged particles and magnetic fields known as the solar wind. This high-energy stream escapes the Sun’s gravitational influence, permeates the entire solar system, and plays a pivotal role in shaping space weather conditions that affect Earth and other celestial bodies (CITE). The solar wind extends the Sun’s magnetic field across the solar system, which can lead to geomagnetic storms when interacting with Earth’s magnetic field. These storms can disrupt satellite functions, communications, and terrestrial power systems (CITE).

Understanding the solar wind’s characteristics is crucial for forecasting space weather conditions. Direct measurements in space are essential for tracing the solar wind’s origins near the Sun, where the plasma is accelerated, heated, and ionized. Traditionally, the classification of solar wind sources has relied on six in-situ measured physical properties: proton speed, proton entropy, proton temperature, ion charge states, and elemental composition {% cite zhao2017relation %}. However, these measurements face challenges due to overlapping property values and the dynamic interactions of the solar wind with various elements of the solar system, which can obscure the definitive origins of the wind. Consequently, researchers often rely on subjective interpretation of continuous data distributions, making accurate categorization of the solar wind difficult.

## Sunspots

Sunspots, observed since the 1800s, exhibit a cyclic pattern with an average period of about 11 years, serving as a critical measure of solar activity (David Hathaway, 2017). Sunspots are linked to phenomena like solar flares and coronal mass ejections, which can impact satellite communications, power grids, and Earth’s climate. These spots originate from regions on the Sun with intense magnetic fields, marking areas of inhibited convective plasma flow.

Sunspots also play a role in determining the Sun’s rotation period, approximately 27 days (David Hathaway, 2017). Historical data show fluctuations in sunspot cycle amplitudes, with peaks averaging around 150. Periods like the Maunder Minimum highlight phases of reduced solar activity. Understanding these patterns requires continuous monitoring to predict solar behavior accurately, ensuring preparedness for potential impacts on technology and climate.

This project aims to integrate machine learning models with Sunspot Index and Long-term Solar Observations data to forecast the number of sunspots through the end of the current solar cycle, which is the year 2030. By leveraging machine learning algorithms, we will explore how the physical characteristics of the solar wind, captured through in-situ measurements by satellite sensors and magnetometers, can be used to more accurately determine the solar wind’s coronal origins and predict future heliophysical phenomena. Accurate classification of solar wind origins is crucial for space weather forecasting, protecting space missions, developing early warning systems, and enhancing our understanding of the solar system.


# Analytical Questions

1. How can novel dimension reduction methods, like PCA and t-SNE, enhance the representation and visualization of solar wind data?
2. How can feature selection methods rank the importance of solar wind parameters?
3. Can clustering methods like DBSCAN and OPTICS reveal differences in solar wind categories based on their coronal origins?
4. Can we accurately forecast the number of sunspots on the sun?

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


## [Sunspot Index and Long-term Solar Observations](https://www.sidc.be/SILSO/infosnmtot)
Monthly mean total sunspot number: This dataset contains monthly mean total sunspot numbers, which are averages derived from daily total counts per calendar month, starting from January 1749 up to the last elapsed month. This extensive time range is due to data availability only from 1749 onward because of sparse earlier observations. The dataset is available in plain ASCII text and CSV formats, detailing columns for the year, month, date in fraction of year, monthly mean sunspot number, monthly standard deviation, and number of observations used. Notably, an error value of -1 indicates missing observations, with the monthly standard deviation calculated from daily values. These monthly mean values provide critical insights into long-term solar activity patterns essential for various scientific and operational purposes.

## Heliospheric Current Sheet (HCS) Indexes
Curated by Dr. Liang Zhao from the University of Michigan, this dataset encompasses heliospheric current attributes recorded bi-monthly from 1976 to 2022. The key features of this dataset include the SD index and the SL index. The SD index describes the standard deviation of the HCS's latitude, while the SL index describes the HCS's integrated slope. These novel, derived parameters simplify current methods of evaluating HCS activity and tracking the solar cycle. In compliance with non-disclosure agreements, sharing this dataset with the public is restricted.



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
