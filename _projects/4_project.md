---
layout: page
title: F1 Race Predictions
description: This project leverages machine learning to predict top 10 finishes in Formula 1 races using data from the Ergast Developer API, while also clustering race tracks based on their characteristics to uncover strategic insights.
img: /assets/img/f1-lego.jpg
importance: 3
category: Machine Learning
giscus: true
giscuss_comments: true
github: https://github.com/SarahAmiraslani/solar-wind-coronal-origin-ml
---

# Introduction

Formula 1, often heralded as the pinnacle of motorsport, encapsulates a blend of high-velocity competition, state-of-the-art technology, and a globally diverse fan base. This premier racing series showcases a remarkable synergy of engineering prowess, driver skill, and strategic depth, making it a captivating subject for in-depth analysis and study. Through the lens of machine learning, this project aims to delve into the complexities that define Formula 1, leveraging the comprehensive data available via the Ergast Developer API. Our primary focus is on the application of supervised learning techniques to predict top 10 finishes in races—a critical outcome that awards drivers and teams with valuable championship points. This aspect of our research not only addresses a pivotal element of the competition but also highlights the nuanced strategies teams employ to secure a competitive edge. Additionally, we embark on an exploration of race track characteristics through unsupervised learning, aiming to cluster tracks based on a multitude of factors such as layout, surface, and length. This dual-faceted approach distinguishes our work from conventional race prediction analyses, offering a novel perspective on the dynamics of Formula 1 racing.

The essence of our project lies in its unique methodology and objectives. Unlike projects that primarily aim to predict race winners, our endeavor focuses on identifying drivers who are likely to finish in the coveted top 10 positions. This distinction is critical, as points are awarded only to these positions, influencing team strategies and the overall competitive landscape of the sport. Our supervised learning model will utilize an array of features, including drivers' and teams' standings before the race, past performances on specific tracks, and results from sprint qualifying sessions. The significance of this analysis is amplified by our choice to concentrate on data post-1995, a period marked by profound changes in the sport's technological and regulatory environments. Through sophisticated feature engineering and the application of various machine learning algorithms, we aim to unveil the factors that most significantly affect a driver's chances of securing a top 10 finish. In parallel, our unsupervised learning approach to clustering race tracks seeks to uncover similarities and distinctions among tracks, thereby offering deeper insights into how different track characteristics influence racing strategies and outcomes. By integrating these analyses, our project aspires to provide a comprehensive understanding of Formula 1, offering valuable insights for teams, drivers, and fans alike, and enhancing strategic planning and performance optimization within the sport.

## Related Work

In the sphere of Formula 1 analytics, past work has predominantly centered on the prediction of race winners, leveraging a variety of statistical and machine learning techniques to forecast outcomes. These studies often reflect the prevailing competitive hierarchies within the sport, where the dominance of certain teams during specific regulatory eras—like Red Bull's supremacy from 2010 to 2013 and 2021 to the present, and Mercedes' stronghold from 2013 to 2020—makes the prediction of race winners somewhat predictable. While insightful, this focus on the pinnacle of race results tends to overlook the nuanced dynamics and strategic elements that contribute to the broader competitive landscape of Formula 1 racing.

Recognizing this gap, our project expands the analytical horizon by targeting the prediction of top 10 finishes, an area that has received less attention in the literature. This focus is motivated by the pivotal role that securing a place in the top 10 plays in accumulating championship points, which are critical for both drivers and constructors over the course of a season. By shifting our attention to these positions, we aim to capture the intricate competitive interactions and the strategic nuances that influence race outcomes beyond the winner's podium. This approach allows us to provide a more comprehensive understanding of performance determinants in Formula 1, addressing both the predictability associated with team dominance and the variability that arises from the tactical decisions made across the grid. Our exploration into the unsupervised clustering of race tracks further enriches this analysis, introducing an innovative dimension to the study of Formula 1 analytics that has been rarely explored in past research.

## Data Source, Scope and Preprocessing

The Ergast Developer API serves as a pivotal data source for our Formula 1 analysis, offering an extensive repository of historical race data, including driver standings, race results, and qualifying times. Renowned for its comprehensive coverage of F1 statistics, the API has been instrumental in various analytical projects, ranging from predictive modeling to detailed statistical analyses of driver performances. In our project, the Ergast API provided a robust foundation for both the supervised and unsupervised learning components. We used it to extract datasets spanning from 1995 to the present, reflecting our focus on the modern era of Formula 1 racing. This period is characterized by significant technological advancements and regulatory changes, making the data particularly relevant for our analysis. Key features of the API that we leveraged include its ability to filter data by race season, event, and individual driver/team performance metrics. This flexibility allowed us to tailor our dataset precisely to the needs of our predictive models and clustering algorithms, ensuring a high degree of accuracy and relevance in our analysis. Ergast Developer API Data Schema is provided in the appendix.

<table>

  <thead>
    <tr>
      <th style="text-align: left; vertical-align: top;">Data Source Name</th>
      <th style="text-align: left; vertical-align: top;">Wikipedia List of F1 Circuits</th>
      <th style="text-align: left; vertical-align: top;">Ergast API</th>
      <th style="text-align: left; vertical-align: top;">Kaggle F1 circuits.csv dataset</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background-color: #f9f9f9;">
      <td style="vertical-align: center;">Location</td>
      <td style="vertical-align: center;"><a href="https://en.wikipedia.org/wiki/List_of_Formula_One_circuits">Wikipedia List of F1 Circuits</a></td>
      <td style="vertical-align: center;"><a href="https://ergast.com/api/f1/circuits?limit=100&offset=0">Ergast API</a></td>
      <td style="vertical-align: center;"><a href="https://www.kaggle.com/datasets/rohanrao/formula-1-world-championship-1950-2020">Kaggle F1 circuits.csv dataset</a></td>
    </tr>
    <tr style="background-color: #ffffff;">
      <td style="vertical-align: center;">Format</td>
      <td style="vertical-align: center;">scraped html table</td>
      <td style="vertical-align: center;">JSON</td>
      <td style="vertical-align: center;">CSV</td>
    </tr>
    <tr style="background-color: #f9f9f9;">
      <td style="vertical-align: center;">Important Variables Included</td>
      <td style="vertical-align: center;">Circuit Name, Type, Direction, circuit length in kilometers</td>
      <td style="vertical-align: center;">circuit name, altitude</td>
      <td style="vertical-align: center;">Number of turns</td>
    </tr>
    <tr style="background-color: #ffffff;">
      <td style="vertical-align: center;">Number of records</td>
      <td style="vertical-align: center;">77</td>
      <td style="vertical-align: center;">77</td>
      <td style="vertical-align: center;">80</td>
    </tr>
    <tr style="background-color: #f9f9f9;">
      <td style="vertical-align: center;">Time Period Covered</td>
      <td style="vertical-align: center;">1950-2023</td>
      <td style="vertical-align: center;">1950-2023</td>
      <td style="vertical-align: center;">1950-2023</td>
    </tr>
    <tr style="background-color: #ffffff;">
      <td style="vertical-align: center;">Preprocessing</td>
      <td style="vertical-align: center;">Extract track length from text string, convert to numeric</td>
      <td style="vertical-align: center;">Match track names with from Wikipedia table with Levenshtein distance, left join on Wikipedia data</td>
      <td style="vertical-align: center;">Match track names from Wikipedia table with Levenshtein distance, left join on Wikipedia data. Impute missing number of turn values with K nearest neighbors imputer</td>
    </tr>
  </tbody>
</table>

### Supervised Learning Data Collection and Preprocessing

To prepare the dataset for our supervised learning model, a comprehensive pre-processing routine was implemented, focusing on extracting and structuring key information from the Ergast Developer API. Initially, unique identifiers for races and racers were constructed using a combination of the race year and session for RaceId, and a concatenation of the racer's first and last names for RacerId. These identifiers serve as indexes to uniquely identify data points without directly contributing to the model's input features. For the Type of track, we categorized circuits into purpose-built tracks and street circuits, encoded as 0 and 1, respectively, based on circuit information obtained from the API. This binary classification aids the model in distinguishing the inherent differences between these track types. Additionally, we derived the TrackId by using the circuit name, ensuring a consistent reference across different datasets. The previous year's race result for each racer, Qualifying position, and the timings for Q1, Q2, and Q3 were meticulously extracted and formatted, with non-participation or non-qualification explicitly marked, ensuring a comprehensive dataset ready for analysis.

| Column Name          | Description                                             | Type    |
| -------------------- | ------------------------------------------------------- | ------- |
| RaceId               | Year-Session (e.g., 2021-Bahrain)                       | Index   |
| RacerId              | Firstname-Lastname (e.g., Lewis-Hamilton)               | Index   |
| TrackId              | Circuit name (e.g., Silverstone)                        | Index   |
| Previous year result | Racer's previous year result (0 if not available)       | Feature |
| Qualifying position  | Racer's qualifying position                             | Feature |
| Q1 timing            | Qualifying round 1 timing                               | Feature |
| Q2 timing            | Qualifying round 2 timing (0 if did not qualify for Q2) | Feature |
| Q3 timing            | Qualifying round 3 timing (0 if did not qualify for Q3) | Feature |
| Race finish          | Race finish position                                    | Label   |

After our initial data sourcing and preprocessing, we developed a dataset that contained 5 complete features for all 77 F1 circuits since 1950: altitude, track length in kilometers, number of turns, circuit type (road, race, or street), and circuit direction (clockwise, counterclockwise, or figure eight). Our selection of features to represent circuits was informed by consultations with F1 enthusiasts, ensuring our analysis represented how F1 subject matter experts would evaluate and characterize tracks.

# Supervised Learning

Supervised learning forms the backbone of our analytical endeavor in this project, focusing on predicting Formula 1 drivers' likelihood of securing top 10 finishes—a critical determinant of championship points distribution. Our methodology involves training models on a dataset where each entry comprises features such as track type, drivers' previous years' performances, qualifying positions, and lap times, with the aim being to classify each race outcome into a binary variable that indicates whether a driver finishes in the top 10. The choice of focusing on the top 10 finishes, rather than other aspects of race outcomes, is driven by the significant impact these positions have on the championship standings, making them of paramount interest for analysis.

In pursuit of this goal, we employ a variety of models including Random Forest, Logistic Regression, and Neural Networks, each selected for its ability to elucidate different facets of the complex dynamics that influence Formula 1 race outcomes. These models are rigorously trained, validated, and tested on data meticulously curated from the Ergast Developer API, providing a solid foundation for our predictive analysis. Given the project's scope, we prioritize accuracy as our primary metric for evaluating model performance. This decision stems from the simplicity and direct interpretability of accuracy in the context of our binary classification task, where the distinction between false positives and false negatives does not significantly alter our strategic or analytical conclusions. This approach allows us to streamline our analysis, focusing on the overarching goal of identifying the drivers and conditions that most frequently lead to top 10 finishes, thereby offering valuable insights into the dynamics of Formula 1 racing.

Our data analysis phase utilized a suite of visual tools to dissect and understand the underlying patterns within the Formula 1 dataset. Through the deployment of heatmaps, we were able to discern the correlation matrix across various features, providing us with an initial glimpse into the relationships between variables such as qualifying times, previous year's positions, and their impact on race outcomes. Pair plots further enriched our analysis by offering a granular view of the pairwise relationships between features, revealing trends, clusters, and potential outliers that could influence model performance. Additionally, leveraging feature importance plots, particularly from our Random Forest model, allowed us to identify the most predictive variables in determining top 10 finishes. This visual exploration not only guided our feature selection process but also offered profound insights into the factors that most significantly affect race performance, laying a robust foundation for our predictive modeling efforts. This comprehensive approach to data analysis ensures that our models are built on a nuanced understanding of the dataset, maximizing their ability to uncover meaningful patterns and predictions.

# Discussion

## Supervised Learning

The Random Forest model, with its ensemble approach, provided an accuracy of 73.87%, indicating a robust predictive capability potentially due to its handling of non-linear relationships between features and the target variable. This model's performance was slightly outperformed by the Neural Network model, which achieved an accuracy of 73.82%, with an architecture of a single hidden layer containing ten nodes. The Neural Network's performance, despite being marginally lower, suggests that a more complex model does not necessarily guarantee superior results, considering the computational complexity and time taken to train such models. The Logistic Regression model, a more straightforward and interpretable model, yielded a slightly lower accuracy of 73.14%. This could be attributed to its linear nature, which may not capture complex patterns in the data as effectively as the other two models. However, the difference in accuracy is relatively small, highlighting that simpler models can still be competitive and beneficial, especially when considering the trade-off between performance and model complexity.

The feature importance plot and the pair plot provided valuable insights into the predictive power of different features, with q1_timing and qualifying_pos being the most significant predictors across models, aligning with domain knowledge that qualifying performances have substantial impacts on race outcomes. The negligible importance of the prev_year_pos feature suggests that past performance is not a reliable indicator of future race results, pointing to the dynamic nature of the sport where numerous variables can influence race day performance.

### Failure analysis

Supervised learning, while a powerful tool for predictive modeling, may encounter significant challenges in the context of Formula 1 race outcome predictions, primarily due to the intricacies and complexities inherent to the sport. One of the fundamental hurdles is the inadequacy of available data concerning the detailed specifications and configurations of F1 cars. This information, encompassing aspects like downforce levels, ground clearance, engine settings, and more, remains proprietary to each racing team. Such data is critical for accurately forecasting race outcomes, as these variables can significantly impact a car's performance on different tracks under varying conditions. Moreover, the dynamic nature of F1 races, where strategies and car setups are meticulously tailored for each race weekend, further complicates the predictive modeling efforts. Without access to this depth of data, supervised learning models are limited to more surface-level features, potentially overlooking nuanced factors that are decisive for race results.

Additionally, our approach deliberately excludes pit stop strategies from the predictive factors, considering them as in-race variables that are not predetermined and thus fall outside the scope of pre-race predictions. This decision, while simplifying the modeling process, omits a crucial element of race strategy that can dramatically influence race outcomes. Pit stops are often used strategically to gain an advantage over competitors, and their timing and execution can vary based on a multitude of factors, including weather conditions and tire performance. Furthermore, the unpredictable nature of mechanical failures and retirements adds another layer of complexity to race outcome predictions. Cars may fail for myriad reasons, from engine blowouts to collisions, which are virtually impossible to predict with supervised learning models based solely on historical data. These elements introduce a level of randomness and uncertainty that can derail even the most sophisticated models, underscoring the limitations of using supervised learning for predicting outcomes in a sport as complex and multifaceted as Formula 1.

## Unsupervised Learning

In our unsupervised analysis of clustering Formula 1 circuits, tuning hyperparameters in the DBSCAN algorithm emerged as a significant factor in achieving meaningful clusters. This aspect underscores that adjustment of algorithm parameters can profoundly impact the outcomes and interpretability of the results. However, we encountered a remarkable challenge when categorical variables, rather than continuous variables like track length, number of turns, and altitude, predominantly drove the variation in clusters. This observation was somewhat anticipated, given the relative uniformity in these continuous variables across different tracks, which consequently led to categorical factors becoming more influential in the clustering process. This outcome, while initially disappointing, provided valuable insights into the feature space of track characteristics. In light of these findings, future work should pivot towards exploring the clustering of driver finish times in relation to track characteristics. This direction aims to delve deeper into the potential correlations between track features and performance outcomes, potentially uncovering patterns that could inform strategic decisions in race preparation and execution.

## Ethical Considerations

In the realm of predictive modeling within Formula 1 racing, ethical considerations must be at the forefront, particularly regarding the extraction and use of data. Our project utilized data from the Ergast API, which aggregates F1 statistics, and it is paramount to ensure that this data collection abides by the terms of service and respects the proprietary nature of the information. Since the data pertains to real individuals and teams, we must handle it with integrity, ensuring that no confidential strategies or sensitive personal data are disclosed. There is an ethical obligation to prevent the misuse of such predictive analytics that could unfairly influence betting markets or team strategies, potentially undermining the competitive fairness that is central to the sport. Moreover, we must acknowledge the impact of data-driven decisions on the sport's stakeholders, ensuring that the augmentation provided by machine learning complements the skill and expertise of teams and drivers, upholding the spirit of F1 racing.

Clustering Formula 1 tracks to find similarities between tracks raise several ethical issues, mainly concerning privacy, data accuracy, and potential bias. Firstly, if the data used for clustering included information about specific races, teams, or drivers, there could be concerns about confidentiality and the second use of sensitive data without consent. To address this, we did not expand our analysis to include driver information to ensure that no drivers or teams can be directly identified from the unsupervised analysis. Secondly, the accuracy and representation of data are critical; using incomplete or biased datasets could lead to misleading conclusions, potentially disadvantageous to developing countries. We ensured that the circuit data we collected is comprehensive and current to mitigate this issue. Engaging with stakeholders in the Formula 1 community for transparency and feedback could also help in identifying and addressing these ethical concerns.
