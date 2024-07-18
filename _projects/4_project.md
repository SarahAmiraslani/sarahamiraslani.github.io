---
layout: distill
title: "Predicting Sunspots"
description: This project forecasts sunspots and HCS indexes using ensemble and deep learning to predict solar wind structure.
date: 2024-05-20
img: /assets/img/jorge-l-valdivia-lgctDB98ejI-unsplash.jpg
importance: 2
category: Machine Learning
related_publications: true
github:
giscus: true
giscus_comments: true
mermaid:
  enabled: true
  zoomable: true
toc:
  sidebar: left
---

1. Can we accurately forecast the number of sunspots on the sun?
2. Apply ensemble learning and deep learning methods, such as Extra tree, LSTM, and transformer etc., to predict the sunspot number and Heliospheric current sheet (HCS) indexes and to provide implications for the solar wind global structure in the future.

To address the forecasting of sunspot numbers, we selected two diverse models: LSTM and Prophet, each known for their distinct capabilities in handling time series data. LSTM was utilized for its potential to capture long-term dependencies within the data through its advanced neural network architecture. The Prophet model was incorporated due to its robust handling of seasonality and trends, making it suitable for the periodic nature of sunspot activity.

The Prophet model, developed by Facebook, is tailored explicitly for time series forecasting with daily observations that display patterns on different time scales. Its appeal lies in its decomposable model framework, where time series data are considered to consist of three main components: trend, seasonality, and holidays.

The Long Short-Term Memory (LSTM) network is a type of recurrent neural network (RNN) particularly suited for forecasting time series that exhibit long-term dependencies. Its architecture allows it to remember information over extended periods, which is essential for capturing the patterns in data as complex and cyclical as sunspot activity. LSTMs are designed to avoid the long-term dependency problem, making them capable of learning order dependence in sequence prediction problems. This characteristic is especially beneficial for modeling the sequential nature of sunspot numbers, where past information can influence the trends and patterns many cycles into the future. Unlike more traditional time series models that may struggle with long-term dependencies or require manual feature engineering to capture seasonality, LSTMs can learn these from the data through their internal state and gated mechanisms.

## [Sunspot Index and Long-term Solar Observations](https://www.sidc.be/SILSO/infosnmtot)

Monthly mean total sunspot number: This dataset contains monthly mean total sunspot numbers, which are averages derived from daily total counts per calendar month, starting from January 1749 up to the last elapsed month. This extensive time range is due to data availability only from 1749 onward because of sparse earlier observations. The dataset is available in plain ASCII text and CSV formats, detailing columns for the year, month, date in fraction of year, monthly mean sunspot number, monthly standard deviation, and number of observations used. Notably, an error value of -1 indicates missing observations, with the monthly standard deviation calculated from daily values. These monthly mean values provide critical insights into long-term solar activity patterns essential for various scientific and operational purposes.

## Heliospheric Current Sheet (HCS) Indexes

Curated by Dr. Liang Zhao from the University of Michigan, this dataset encompasses heliospheric current attributes recorded bi-monthly from 1976 to 2022. The key features of this dataset include the SD index and the SL index. The SD index describes the standard deviation of the HCS's latitude, while the SL index describes the HCS's integrated slope. These novel, derived parameters simplify current methods of evaluating HCS activity and tracking the solar cycle. In compliance with non-disclosure agreements, sharing this dataset with the public is restricted.

4. Evaluation Strategy & Results

Sunspot Number Prediction

Prophet Model
In assessing the Prophet model's predictive power, we measured its performance using standard metrics such as Mean Absolute Error (MAE) and Root Mean Squared Error (RMSE). These metrics provide insight into the average magnitude of errors in the forecasts, offering a clear measure of accuracy.

The Prophet model yielded an MAE of 46.60 and an RMSE of 56.42, which suggests that while the model captures the overarching trend, it does not closely match the actual data points. These metrics were derived from the model's performance on the test set, which consists of the most recent data not seen by the model during training.

When considering the accompanying forecast graph, we observe that the Prophet model delineates future sunspot numbers with a conservative outlook, indicating a gradual decrease. The performance metrics confirm this visual trend in the predictions, which reflect the model's conservative nature.

Although the model is adept at handling the seasonality inherent in sunspot data, simplifying the forecast curve compared to the historical data indicates room for improvement. The graph and evaluation metrics suggest that while the Prophet model offers a solid baseline for sunspot number forecasting, further tuning and integration with other models or additional predictors could enhance its accuracy and robustness.

LSTM Model
Our evaluation of the LSTM model's effectiveness in predicting sunspot numbers was done by examining the usual performance metrics: Mean Absolute Error (MAE) and Root Mean Squared Error (RMSE). These metrics shed light on the accuracy of the predictions. The Prophet model's TM model achieved an MAE of 11.63 and an RMSE of 15.82, signifying high precision in the forecasts relative to the actual recorded data.

The associated prediction graph shows an interesting picture of the LSTM's capability to track and extend the cyclical patterns observed in historical sunspot activity. Notably, the LSTM model's predictions are less erratic than the Prophet model's, resulting in a smoother forecast line that suggests a solid understanding of the underlying trend.

Despite the LSTM model's quantitative success, as evidenced by lower MAE and RMSE values, the smoothness of the predicted outcomes also raises important considerations. The potential for over-smoothing and underestimating future variability implies a need for a cautious interpretation of the long-term forecasts. Overall, the LSTM model is a potent analytical tool that offers valuable foresight into solar phenomena.

5.2 Sunspot number forecasting
In summarizing the implications of our analysis on sunspot number forecasting, even though the models did not accurately predict sunspot numbers, this work still holds some implications. It advances the understanding of solar phenomena, which can refine theories about solar behavior. Exploring different forecasting methods, such as LSTM and Prophet, enhances the understanding of the tools that can be used for handling such complex time series data. Practically, better predictions of sunspot activity can enhance space weather forecasting, aiding in protecting satellites, power grids, and communication systems from solar disturbances. This analysis also has educational value, serving as a case study for the interdisciplinary study of data science and physics.
