---
layout: distill
title: Predicting Sunspots
description: This project leverages ensemble and deep learning models to forecast sunspots and Heliospheric Current Sheet (HCS) indexes, enhancing the prediction of solar wind structures.
date: 2024-05-20
img: /assets/img/jorge-l-valdivia-lgctDB98ejI-unsplash.jpg
importance: 3
category: Machine Learning & Analytics
related_publications: true
github: https://github.com/SarahAmiraslani/solar-wind-coronal-origin-ml
giscus: true
giscus_comments: true
authors:
  - name: Sarah Amiraslani
    url: samirasl@umich.edu
    affiliations:
      name: University of Michigan, Ann Arbor
  - name: Nikola Acin
    url: nacin@umich.edu
    affiliations:
      name: University of Michigan, Ann Arbor
  - name: Andria Lesane
    url: ablesane@umich.edu
    affiliations:
      name: University of Michigan, Ann Arbor
toc:
  - name: Introduction
  - name: Data Source
  - name: Preprocessing
  - name: Feature Engineering
  - name: Modeling
  - name: Evaluation
  - name: Discussion
  - name: Acknowledgments
bibliography: sunspots-distill.bib
---

# Introduction

Sunspots, observed since the 1800s, exhibit a cyclic pattern with an average period of about 11 years, serving as a critical measure of solar activity <d-cite key="upton2018updated"></d-cite>. Sunspots are linked to phenomena like solar flares and coronal mass ejections. Sunspot' frequency and intensity can impact satellite communications, power grids, and Earth's climate.

Sunspots also play a role in determining the Sun's rotation period, approximately 27 days<d-cite key="upton2018updated"></d-cite>. Historical data show fluctuations in sunspot cycle amplitudes, with peaks averaging around 150. Periods like the Maunder Minimum highlight phases of reduced solar activity. Understanding these patterns requires continuous monitoring to predict solar behavior accurately, ensuring preparedness for potential impacts on technology and climate.

By integrating machine learning models with Sunspot Index and Long-term Solar Observations data, this project aims to forecast the number of sunspots to the end of the current solar cycle, which is the year 2030.

<!-- ## Motivation -->

## Analytical Questions

1. Can we accurately forecast the number of sunspots on the sun?
2. Apply ensemble learning and deep learning methods, such as Extra tree, LSTM, and transformer etc., to predict the sunspot number and Heliospheric current sheet (HCS) indexes and to provide implications for the solar wind global structure in the future.

# Data Source

## Sunspot Index and Long-term Solar Observations

The Sunspot Index and Long-term Solar Observations dataset offers a glimpse into solar activity, tracking monthly mean sunspot numbers - average daily counts per month - from January 1749 to the present <d-cite key="SILSO_Sunspot_Data"></d-cite>. Available in plain ASCII text and CSV formats, the datasets include year, month, date (as a fraction of the year), monthly mean sunspot number, monthly standard deviation, and the number of observations. Notably, a value of -1 signals missing observations, while the monthly standard deviation is derived from daily values. These detailed records provide invaluable insights into long-term solar patterns.

## National Centers for Environmental Information

The National Centers for Environmental Information (NCEI) by the National Oceanic and Atmospheric Administration (NOAA) maintains extensive collections of sunspot data spanning various time periods and formats <d-cite key="NOAA_Sunspot_Data"></d-cite>. The International Sunspot Number data includes sunspot maximum and minimum counts from 1610 to the present, annual numbers from 1700, monthly numbers from 1749, daily values from 1818, and sunspot counts by hemisphere. This dataset also features the McNish-Lincoln sunspot prediction, all available for download.

Relative Sunspot Numbers provide an index of the activity of the Sun’s visible disk, calculated daily using the formula R = K (10g + s), where g represents sunspot groups, s represents distinct spots, and K is a scale factor unique to each observer. Initially based on observations from Zurich, these numbers are now managed by the Solar Influences Data Analysis Center (SIDC) in Belgium. The dataset includes daily, monthly, and annual sunspot numbers, sunspot counts by hemisphere from 1992 to 1996, and American Relative Sunspot Numbers starting from 1951. Users of this data are requested to credit SIDC, RWC Belgium, World Data Center for the Sunspot Index, and the Royal Observatory of Belgium.

Additionally, the site offers ancient sunspot records from 165 B.C. to 1684 A.D. This includes a catalogue of sunspot observations, large sunspots, and estimated annual mean sunspot numbers from 1610 to 1715. Additionally, Group Sunspot Numbers, re-evaluated by Doug Hoyt, span from 1610 to 1995. The data is organized into various file types: input files containing raw daily data, means files with daily, monthly, and yearly averages, standard deviation files, and files detailing the number of observations. Documentation files include inventories of observers, summaries, bibliographies, and correction factors to ensure consistency with the Royal Greenwich Observatory (RGO) scale. This extensive dataset offers valuable insights into solar activity patterns essential for scientific and operational purposes.

## Heliospheric Current Sheet (HCS) Indexes

Curated by Dr. Liang Zhao from the University of Michigan, this comprehensive dataset captures heliospheric current attributes recorded bi-monthly from 1976 to 2022. It features two key indices: the SD index, which represents the standard deviation of the HCS’s latitude, and the SL index, which measures the HCS’s integrated slope. These innovative parameters enhance the evaluation of HCS activity and facilitate the prediction of sunspots. Please note, due to licensing agreements, this dataset is not available for public sharing.

# Preprocessing

# Feature Engineering

# Modeling

> ##### NOTE
>
> This is an ongoing project. We are currently working on improving the performance of the models and testing new techniques such as AR-Net, ARIMA, and Extra Tree.
> {: .block-tip }

To forecast sunspot numbers, we selected two diverse models: LSTM and Prophet, each renowned for their unique strengths in time series analysis. LSTM, with its advanced neural network architecture, excels in capturing long-term dependencies within the data. In contrast, the Prophet model, developed by Facebook, is adept at handling seasonality and trends, making it ideal for the periodic nature of sunspot activity.

<!-- ## ARIMA

## Seasonal Naive -->

## Prophet

Prophet is specifically designed for time series forecasting with daily observations, featuring a decomposable model framework. It breaks down the time series data into three main components: trend, seasonality, and holidays, providing a robust approach to understanding and predicting sunspot patterns.

## LSTM

The Long Short-Term Memory (LSTM) network is a specialized type of recurrent neural network (RNN) ideal for forecasting time series with long-term dependencies. This algorithm consists of sequential special cells with structural inputs and outputs. Data progressing through LSTM cells is obtained as the output data for a cell, while it is used as input data for the next cell. With this aspect, LSTM can memorize data sequences longer than RNNs.Its unique architecture enables it to retain information over extended periods, crucial for capturing the complex and cyclical patterns of sunspot activity. LSTMs are specifically designed to overcome the long-term dependency problem, making them adept at learning order dependence in sequence prediction tasks. This capability is particularly valuable for modeling sunspot numbers, where past information can significantly influence trends and patterns across multiple cycles. Unlike traditional time series models that may struggle with long-term dependencies or require manual feature engineering to capture seasonality, LSTMs can autonomously learn these aspects from the data through their internal state and gated mechanisms.

<!-- ## AR-Net -->

# Evaluation

## Prophet

In assessing the Prophet model's predictive power, we measured its performance using standard metrics such as Mean Absolute Error (MAE) and Root Mean Squared Error (RMSE). These metrics provide insight into the average magnitude of errors in the forecasts, offering a clear measure of accuracy.

The Prophet model yielded an MAE of 46.60 and an RMSE of 56.42, which suggests that while the model captures the overarching trend, it does not closely match the actual data points. These metrics were derived from the model's performance on the test set, which consists of the most recent data not seen by the model during training.

When considering the accompanying forecast graph, we observe that the Prophet model delineates future sunspot numbers with a conservative outlook, indicating a gradual decrease. The performance metrics confirm this visual trend in the predictions, which reflect the model's conservative nature.

Although the model is adept at handling the seasonality inherent in sunspot data, simplifying the forecast curve compared to the historical data indicates room for improvement. The graph and evaluation metrics suggest that while the Prophet model offers a solid baseline for sunspot number forecasting, further tuning and integration with other models or additional predictors could enhance its accuracy and robustness.

## LSTM Model

Our evaluation of the LSTM model's effectiveness in predicting sunspot numbers was done by examining the usual performance metrics: Mean Absolute Error (MAE) and Root Mean Squared Error (RMSE). These metrics shed light on the accuracy of the predictions. The Prophet model's TM model achieved an MAE of 11.63 and an RMSE of 15.82, signifying high precision in the forecasts relative to the actual recorded data.

The associated prediction graph shows an interesting picture of the LSTM's capability to track and extend the cyclical patterns observed in historical sunspot activity. Notably, the LSTM model's predictions are less erratic than the Prophet model's, resulting in a smoother forecast line that suggests a solid understanding of the underlying trend.

Despite the LSTM model's quantitative success, as evidenced by lower MAE and RMSE values, the smoothness of the predicted outcomes also raises important considerations. The potential for over-smoothing and underestimating future variability implies a need for a cautious interpretation of the long-term forecasts. Overall, the LSTM model is a potent analytical tool that offers valuable foresight into solar phenomena.

# Discussion

In summarizing the implications of our analysis on sunspot number forecasting, even though the models did not accurately predict sunspot numbers, this work still holds some implications. It advances the understanding of solar phenomena, which can refine theories about solar behavior. Exploring different forecasting methods, such as LSTM and Prophet, enhances the understanding of the tools that can be used for handling such complex time series data. Practically, better predictions of sunspot activity can enhance space weather forecasting, aiding in protecting satellites, power grids, and communication systems from solar disturbances. This analysis also has educational value, serving as a case study for the interdisciplinary study of data science and physics.

# Acknowledgments

We would also like to thank Dr. Liang Zhao for supporting our capstone project and providing Heliospheric Current Sheet (HCS) Indexes.
