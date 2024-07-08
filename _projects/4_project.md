---
layout: page
title: F1 Race Predictions and Track Clustering
description: This project leverages machine learning to predict top 10 finishes in Formula 1 races using data from the Ergast Developer API, while also clustering race tracks based on their characteristics to latent groupings among F1 circuits worldwide.
img: /assets/img/f1-lego.jpg
importance: 3
category: Machine Learning
giscus: true
giscuss_comments: true
github: https://github.com/SarahAmiraslani/F1-Milestone-Tharval-Amiraslani-Korbin
---

# Introduction

Formula 1, often heralded as the pinnacle of motorsport, encapsulates a blend of high-velocity competition, state-of-the-art technology, and a global fan base. This premier racing series showcases a remarkable synergy of engineering excellence, driver skill, and strategic depth, making it a captivating subject for in-depth analysis. Through the lens of machine learning, this project aims to delve into the complexities that define Formula 1. Our primary focus is on the application of supervised learning techniques to predict top 10 finishes in races — a critical outcome that awards drivers and teams with valuable championship points. Additionally, we explore race track characteristics through unsupervised learning, aiming to cluster tracks based on a multitude of factors such as layout, surface, and length.

Our supervised learning model will utilize an array of features, including drivers’ and teams’ standings before the race, past performances on specific tracks, and results from sprint qualifying sessions. Concentrating on data post-1995, a period marked by profound changes in the sport’s technological and regulatory environments, we aim to unveil the factors that most significantly affect a driver’s chances of securing a top 10 finish. In parallel, our unsupervised learning approach to clustering race tracks seeks to uncover similarities and distinctions among tracks, offering deeper insights into how different track characteristics influence racing strategies and outcomes. This dual-faceted approach distinguishes our work from conventional race prediction analyses, offering a novel perspective on the dynamics of Formula 1 racing. By integrating these analyses, our project aspires to provide a comprehensive understanding of Formula 1, offering valuable insights for teams, drivers, and fans alike, and enhancing strategic planning and performance optimization within the sport.

**Points system**
<table class="styled-table">
  <thead>
    <tr>
      <th>Position</th>
      <th>1st</th>
      <th>2nd</th>
      <th>3rd</th>
      <th>4th</th>
      <th>5th</th>
      <th>6th</th>
      <th>7th</th>
      <th>8th</th>
      <th>9th</th>
      <th>10th</th>
      <th>FL*</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Points</td>
      <td>25</td>
      <td>18</td>
      <td>15</td>
      <td>12</td>
      <td>10</td>
      <td>8</td>
      <td>6</td>
      <td>4</td>
      <td>2</td>
      <td>1</td>
      <td>1</td>
    </tr>
  </tbody>
</table>
A driver must finish within the top ten to receive a point for setting the fastest lap (FL) of the race. If the driver who set the fastest lap finishes outside of the top ten, then the point for fastest lap will not be awarded for that race

## Related Work

In the sphere of Formula 1 analytics, past work has predominantly centered on the prediction of race winners, leveraging a variety of statistical and machine learning techniques to forecast outcomes. These studies often reflect the prevailing competitive hierarchies within the sport, where the dominance of certain teams during specific regulatory eras—like Red Bull's supremacy from 2010 to 2013 and 2021 to the present, and Mercedes' stronghold from 2013 to 2020—makes the prediction of race winners somewhat predictable. While insightful, this focus on the pinnacle of race results tends to overlook the nuanced dynamics and strategic elements that contribute to the broader competitive landscape of Formula 1 racing.

Recognizing this gap, our project expands the analytical horizon by targeting the prediction of top 10 finishes, an area that has received less attention in the literature. This focus is motivated by the pivotal role that securing a place in the top 10 plays in accumulating championship points, which are critical for both drivers and constructors over the course of a season. By shifting our attention to these positions, we aim to capture the intricate competitive interactions and the strategic nuances that influence race outcomes beyond the winner's podium. This approach allows us to provide a more comprehensive understanding of performance determinants in Formula 1, addressing both the predictability associated with team dominance and the variability that arises from the tactical decisions made across the grid. Our exploration into the unsupervised clustering of race tracks further enriches this analysis, introducing an innovative dimension to the study of Formula 1 analytics that has been rarely explored in past research.

## Data Source, Scope and Preprocessing

### Introduction to Ergast API
The Ergast Developer API serves as a pivotal data source for our Formula 1 analysis, offering an extensive repository of historical race data, including driver standings, race results, and qualifying times {% cite ergast %}. Renowned for its comprehensive coverage of F1 statistics, the API has been instrumental in various analytical projects, ranging from predictive modeling to detailed statistical analyses of driver performances. In our project, the Ergast API provided a robust foundation for both the supervised and unsupervised learning components. We used it to extract datasets spanning from 1995 to the present, reflecting our focus on the modern era of Formula 1 racing. This period is characterized by significant technological advancements and regulatory changes, making the data particularly relevant for our analysis. Key features of the API that we leveraged include its ability to filter data by race season, event, and individual driver/team performance metrics. This flexibility allowed us to tailor our dataset precisely to the needs of our predictive models and clustering algorithms, ensuring a high degree of accuracy and relevance in our analysis.

<!-- Table -->
<table class="styled-table">
  <tr>
    <th>Attribute</th>
    <th>Details</th>
  </tr>
  <tr>
    <td><strong>Location</strong></td>
    <td> <a href="https://ergast.com/mrd/">Ergast Developer API</a></td>
  </tr>
  <tr>
    <td><strong>Format</strong></td>
    <td>JSON/CSV/XML</td>
  </tr>
  <tr>
    <td><strong>Important Variables Included</strong></td>
    <td>All the variables mentioned below</td>
  </tr>
  <tr>
    <td><strong>Number of records</strong></td>
    <td>9623</td>
  </tr>
  <tr>
    <td><strong>Time Period Covered</strong></td>
    <td>1995 - Present</td>
  </tr>
</table>

### Supervised Learning Data Collection and Preprocessing

To prepare the dataset for our supervised learning model, a comprehensive pre-processing routine was implemented, focusing on extracting and structuring key information from the Ergast Developer API. Initially, unique identifiers for races and racers were constructed using a combination of the race year and session for RaceId, and a concatenation of the racer's first and last names for RacerId. These identifiers serve as indexes to uniquely identify data points without directly contributing to the model's input features. For the Type of track, we categorized circuits into purpose-built tracks and street circuits, encoded as 0 and 1, respectively, based on circuit information obtained from the API. This binary classification aids the model in distinguishing the inherent differences between these track types. Additionally, we derived the TrackId by using the circuit name, ensuring a consistent reference across different datasets. The previous year's race result for each racer, Qualifying position, and the timings for Q1, Q2, and Q3 were meticulously extracted and formatted, with non-participation or non-qualification explicitly marked, ensuring a comprehensive dataset ready for analysis.

<!-- Table -->
<table class="styled-table">
  <thead>
    <tr>
      <th>Column Name</th>
      <th>Description</th>
      <th>Type</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>RaceId</td>
      <td>Year-Session (e.g., 2021-Bahrain)</td>
      <td>Index</td>
    </tr>
    <tr>
      <td>RacerId</td>
      <td>Firstname-Lastname (e.g., Lewis-Hamilton)</td>
      <td>Index</td>
    </tr>
    <tr>
      <td>TrackId</td>
      <td>Circuit name (e.g., Silverstone)</td>
      <td>Index</td>
    </tr>
    <tr>
      <td>Previous year result</td>
      <td>Racer's previous year result (0 if not available)</td>
      <td>Feature</td>
    </tr>
    <tr>
      <td>Qualifying position</td>
      <td>Racer's qualifying position</td>
      <td>Feature</td>
    </tr>
    <tr>
      <td>Q1 timing</td>
      <td>Qualifying round 1 timing</td>
      <td>Feature</td>
    </tr>
    <tr>
      <td>Q2 timing</td>
      <td>Qualifying round 2 timing (0 if did not qualify for Q2)</td>
      <td>Feature</td>
    </tr>
    <tr>
        <td>Q3 timing</td>
      <td>Qualifying round 3 timing (0 if did not qualify for Q3)</td>
      <td>Feature</td>
    </tr>
    <tr>
      <td>Race finish</td>
      <td>Race finish position</td>
      <td>Label</td>
    </tr>
  </tbody>
</table>

### Unsupervised Learning Data Collection and Preprocessing

Our clustering of circuits based on track characteristics provides insight into how tracks relate to one another across a number of characteristics. We employed unsupervised learning techniques to uncover latent groupings among F1 circuits worldwide.

For our analysis of F1 track characteristics, we leveraged three data sources. The first was a table of F1 track characteristics scraped from wikipedia. The second was a track characteristic retrieved from the Ergast API. The third was a dataset of F1 circuits from Kaggle. Details of the data sources are provided in the table below.

<table class="styled-table">
  <thead>
    <tr>
      <th>Attribute</th>
      <th>Wikipedia List of F1 Circuits</th>
      <th>Ergast API</th>
      <th>Kaggle F1 circuits.csv dataset</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Location</td>
      <td><a href="https://en.wikipedia.org/wiki/List_of_Formula_One_circuits">https://en.wikipedia.org/wiki/List_of_Formula_One_circuits</a></td>
      <td><a href="https://ergast.com/api/f1/circuits?limit=100&offset=0">https://ergast.com/api/f1/circuits?limit=100&offset=0</a></td>
      <td><a href="https://www.kaggle.com/datasets/rohanrao/formula-1-world-championship-1950-2020">https://www.kaggle.com/datasets/rohanrao/formula-1-world-championship-1950-2020</a></td>
    </tr>
    <tr>
      <td>Format</td>
      <td>scraped html table</td>
      <td>JSON</td>
      <td>CSV</td>
    </tr>
    <tr>
      <td>Important Variables Included</td>
      <td>Circuit Name, Type, Direction. circuit length in kilometers</td>
      <td>circuit name, altitude</td>
      <td>Number of turns</td>
    </tr>
    <tr>
      <td>Number of records</td>
      <td>77</td>
      <td>77</td>
      <td>80</td>
    </tr>
    <tr>
      <td>Time Period Covered</td>
      <td>1950-2023</td>
      <td>1950-2023</td>
      <td>1950-2023</td>
    </tr>
    <tr>
      <td>Preprocessing</td>
      <td>Extract track length from text string, convert to numeric</td>
      <td>Match track names with from wikipedia table with Levenshtein distance, left join on wikipedia data</td>
      <td>Match track names from wikipedia table with Levenshtein distance, left join on wikipedia data. Impute missing number of turn values with K nearest neighbors imputer</td>
    </tr>
  </tbody>
</table>

After our initial data sourcing and preprocessing, we developed a dataset that contained 5 complete features for all 77 F1 circuits since 1950: altitude, track length in kilometers, number of turns, circuit type (road, race, or street), and circuit direction (clockwise, counterclockwise, or figure eight). Our selection of features to represent circuits was informed by consultations with F1 enthusiasts, ensuring our analysis represented how F1 subject matter experts would evaluate and characterize tracks.


#  Data Analysis for training data
Our data analysis phase utilized a suite of visual tools to dissect and understand the underlying patterns within the Formula 1 dataset. Through the deployment of heatmaps, we were able to discern the correlation matrix across various features, providing us with an initial glimpse into the relationships between variables such as qualifying times, previous year's positions, and their impact on race outcomes. Pair plots further enriched our analysis by offering a granular view of the pairwise relationships between features, revealing trends, clusters, and potential outliers that could influence model performance. Additionally, leveraging feature importance plots, particularly from our Random Forest model, allowed us to identify the most predictive variables in determining top 10 finishes. This visual exploration not only guided our feature selection process but also offered profound insights into the factors that most significantly affect race performance, laying a robust foundation for our predictive modeling efforts. This comprehensive approach to data analysis ensures that our models are built on a nuanced understanding of the dataset, maximizing their ability to uncover meaningful patterns and predictions.

### Heatmap
A heatmap is a graphical representation of data where values are depicted by color, allowing for an intuitive perception of patterns, such as correlations between variables in a dataset, which can be crucial for identifying relationships and trends at a glance.

<div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/f1-heatmap.png" class="img-fluid rounded z-depth-1" zoomable=true %}
</div>

- **Strong Negative Correlation between Qualifying Position and Race Position**: There is a strong negative correlation (approximately -0.51) between `qualifying_pos` and `position`. This suggests that drivers with better (lower number) qualifying positions tend to finish the race in better (also, numerically lower) positions.
- **Positive Correlation between Q2 and Q3 Timings**: The `q2_timing` and `q3_timing` have a strong positive correlation of about 0.64. This indicates that drivers who perform well in Q2 also tend to perform well in Q3.
- **Negative Correlation between Q2/Q3 Timings and Qualifying Position**: Both `q2_timing` and `q3_timing` show a significant negative correlation with qualifying_pos (approximately -0.48 and -0.64, respectively). This implies that faster (lower) timings in Q2 and Q3 are associated with better qualifying positions.
- **Weak Correlation between Q1 Timing and Other Features**: The q1_timing shows relatively weak correlations with other features, with the highest being around 0.17 with q2_timing. This might suggest that the Q1 timing is less indicative of the final position or the performances in the later qualifying rounds.
- **Low Correlation between Previous Year Position and Current Position**: There is a very weak negative correlation (almost zero) between `prev_year_pos` and `position`. This suggests that the previous year's race position does not have a strong predictive power on the current year's race outcome.

### PairPlot
A pair plot, or a scatterplot matrix, visualizes pairwise relationships between variables in a dataset, combining scatter plots for each variable combination with histograms to show the distribution of each variable, thus providing a comprehensive overview of correlations, trends, and distributions all in one figure.

<div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/f1-pairplot.png" class="img-fluid rounded z-depth-1" zoomable=true %}
</div>

- **Distinct Clusters in Timing Data**: The scatter plots between `q2_timing` and `q3_timing` display distinct clusters, indicating that there may be distinct groups within the data. This could represent different performance tiers among the drivers or cars.
- **Positive Relationship between Q2 and Q3**: There is a positive linear relationship between `q2_timing` and `q3_timing`. Drivers who have lower (better) timings in Q2 also tend to have lower (better) timings in Q3.
- **Top 10 Finishers Distribution**: When looking at the hue for `position`, there appears to be a concentration of top 10 finishers (denoted by the color, possibly orange) with lower `qualifying_pos` values, reinforcing the importance of qualifying performance on race outcomes.
- **Timing and Qualifying Position**: There is a trend visible in the scatter plots of the timing variables (q1_timing, `q2_timing`, `q3_timing`) against qualifying_pos. Drivers with lower qualifying positions tend to have lower (faster) timings in all three qualifying sessions, particularly noticeable in `q2_timing` and `q3_timing`.

### Feature Importance Plot
A feature importance plot ranks the features of a model based on their importance in making accurate predictions, and in the context of a RandomForestClassifier, it reflects how much each feature contributes to reducing the variance in the model's predictions.

<div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/f1-feature-importance.png" class="img-fluid rounded z-depth-1" zoomable=true %}
</div>

- **Q1 Timing Dominance**: The `q1_timing` feature has the highest importance score, suggesting it is the most significant predictor in determining the race position.
- **Lower Importance of Previous Year Position**: The `prev_year_pos` feature has the lowest importance score, indicating that it has the least influence on the model's predictions of race position outcomes compared to the other features in the dataset.

# Supervised Learning

Supervised learning forms the backbone of our analytical endeavor in this project, focusing on predicting Formula 1 drivers' likelihood of securing top 10 finishes—a critical determinant of championship points distribution. Our methodology involves training models on a dataset where each entry comprises features such as track type, drivers' previous years' performances, qualifying positions, and lap times, with the aim being to classify each race outcome into a binary variable that indicates whether a driver finishes in the top 10. The choice of focusing on the top 10 finishes, rather than other aspects of race outcomes, is driven by the significant impact these positions have on the championship standings, making them of paramount interest for analysis.

In pursuit of this goal, we employ a variety of models including Random Forest, Logistic Regression, and Neural Networks, each selected for its ability to elucidate different facets of the complex dynamics that influence Formula 1 race outcomes. These models are rigorously trained, validated, and tested on data meticulously curated from the Ergast Developer API, providing a solid foundation for our predictive analysis. Given the project's scope, we prioritize accuracy as our primary metric for evaluating model performance. This decision stems from the simplicity and direct interpretability of accuracy in the context of our binary classification task, where the distinction between false positives and false negatives does not significantly alter our strategic or analytical conclusions. This approach allows us to streamline our analysis, focusing on the overarching goal of identifying the drivers and conditions that most frequently lead to top 10 finishes, thereby offering valuable insights into the dynamics of Formula 1 racing.


## Logistic Regression

Logistic Regression is a statistical method for analyzing a dataset in which there are one or more independent variables that determine an outcome. The outcome is measured with a dichotomous variable (where there are only two possible outcomes). It is used extensively in scenarios where the goal is to predict the presence or absence of a characteristic or outcome, based on values of a set of predictor variables. Logistic Regression is especially popular for binary classification tasks, such as predicting whether a driver will finish in the top 10 in a race.

The attached code defines a function to construct and fine-tune a logistic regression model by utilizing grid search to explore a defined space of hyperparameters. The GridSearchCV process fits the logistic regression model on the scaled training data using combinations of regularization strength (`C`), penalty type (`penalty`), and solver algorithm (`solver`) to determine the most effective parameters for maximizing prediction accuracy. The output indicates that the optimal logistic regression model, using an l1 penalty with a regularization strength of 0.01 and the liblinear solver, achieved a prediction accuracy of 73.14% on the test dataset.


## Random Forest

Random Forest is an ensemble learning method that operates by constructing multiple decision trees during the training phase and outputting the mode of the classes (classification) or mean prediction (regression) of the individual trees. It is renowned for its accuracy, robustness, and ability to handle large datasets with high dimensionality. By aggregating the predictions of numerous trees, it reduces the risk of overfitting, making it highly effective for complex predictive tasks. Random Forest can also handle missing values and maintain accuracy even when a large proportion of the data are missing.

The provided code defines a function to build and evaluate a Random Forest classifier using a grid search over a specified range of hyperparameters. The function takes pre-split training and test data, along with a parameter grid, and uses GridSearchCV to systematically work through multiple combinations of parameter values, cross-validating as it goes to determine which tune gives the best performance in terms of accuracy. The results show that the best model achieved an accuracy of 73.87% on the test set, with the optimal parameters being 200 trees (`n_estimators`), a maximum depth of 10 (`max_depth`), and a minimum split size of 10 (`min_samples_split`).

## Neural Networks

Neural Networks are a set of algorithms, modeled loosely after the human brain, that are designed to recognize patterns. They interpret sensory data through a kind of machine perception, labeling, or clustering of raw input. The algorithms in neural networks process information in a layered structure of nodes, mimicking the neurons in a brain, making them particularly effective for complex pattern recognition and predictive modeling. Neural Networks can be trained to understand and perform classification tasks directly from images, text, or sound, making them versatile for a wide range of applications including speech recognition, image classification, and, in our case, predicting race outcomes.

Attached code is designed to build and optimize a neural network model for binary classification using Keras and TensorFlow. A function create_model is defined to create a neural network with one hidden layer of a specified number of nodes and a given learning rate. The `build_best_neural_network_model` function then uses GridSearchCV to iterate over a range of hyperparameters defined in `n_param_grid`, such as the number of hidden nodes, learning rate, epochs, and batch size, to find the combination that yields the highest accuracy. After approximately 30 minutes of computation, the best performing neural network model on the scaled test data has an accuracy of 73.82%, with the optimal hyperparameters being 10 hidden nodes, a learning rate of 0.01, a batch size of 32, and training for 50 epochs.

## Sensitivity Analysis

# Unsupervised Learning

## Feature Engineering
Because clustering and dimensionality reduction algorithms require numeric representations of data, our categorical features were one-hot encoded. This transformation allowed us to integrate categorical and continuous data, enhancing the robustness of our analysis. Furthermore, to ensure features with larger scales did not dominate the cluster distance calculations, potentially biasing the clustering outcome, we leveraged a standard scaler to ensure that each feature contributes equally to the distance computations.

## Unsupervised Learning Methods and Evaluation
Our primary clustering algorithm was DBSCAN (Density-Based Spatial Clustering of Applications with Noise). This unsupervised clustering algorithm is known for its efficacy in identifying non-normally distributed clusters of varying shapes and sizes without predefining the number of clusters. The optimal epsilon value, a critical hyperparameter for DBSCAN, was estimated using the Nearest Neighbors algorithm. We adhered to the heuristic of setting `n_neighbors` to `2*dim - 1`, where `dim` represents the dimensionality of our feature space, to balance local density estimation and computational feasibility. We determined the optimal epsilon value by evaluating where the distance of the 5th nearest neighbor stated to increase exponentially in the K-distance graph.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Dendogram-track.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/K-Distance.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">
    A simple, elegant caption looks good between image rows, after each row, or doesn't have to be there at all.
</div>

Simultaneously, we explored hierarchical clustering to validate our findings with DBSCAN. Through visual inspection of a dendrogram, we optimized the distance threshold to ensure that there was significant dissimilarity between clusters. Despite some variance, both DBSCAN and hierarchical clustering revealed similar cluster structures, underscoring the generalizability of the clusters produced by DBSCAN.
To evaluate the sensitivity of our clusters to changes in the data, we took 3 bootstrap random samples of 80% of the data. These bootstrap samples yielded similar clusters to clusters generated from the entire dataset, denoting the stability of our clustering approach to changes in the data.
To navigate the high-dimensional nature of our data, we leveraged Principal Component Analysis (PCA)  and t-Distributed Stochastic Neighbor Embedding t-SNE for dimensionality reduction to visualize in two-dimensions. While PCA provided a broad overview of data variance, t-SNE allowed us to observe the nuanced structure of our clusters in two dimensions. Our biplot overlay on the PCA scatter plot revealed that circuit types and directions were predominant drivers behind the clustering.


<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/tracks-biplot.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/t-sne-tracks.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">
    A simple, elegant caption looks good between image rows, after each row, or doesn't have to be there at all.
</div>

# Discussion

## Supervised Learning
The Random Forest model, with its ensemble approach, provided an accuracy of 73.87%, indicating a robust predictive capability potentially due to its handling of non-linear relationships between features and the target variable. This model's performance was slightly outperformed by the Neural Network model, which achieved an accuracy of 73.82%, with an architecture of a single hidden layer containing ten nodes. The Neural Network's performance, despite being marginally lower, suggests that a more complex model does not necessarily guarantee superior results, considering the computational complexity and time taken to train such models. The Logistic Regression model, a more straightforward and interpretable model, yielded a slightly lower accuracy of 73.14%. This could be attributed to its linear nature, which may not capture complex patterns in the data as effectively as the other two models. However, the difference in accuracy is relatively small, highlighting that simpler models can still be competitive and beneficial, especially when considering the trade-off between performance and model complexity.
The feature importance plot and the pair plot provided valuable insights into the predictive power of different features, with q1_timing and qualifying_pos being the most significant predictors across models, aligning with domain knowledge that qualifying performances have substantial impacts on race outcomes. The negligible importance of the prev_year_pos feature suggests that past performance is not a reliable indicator of future race results, pointing to the dynamic nature of the sport where numerous variables can influence race day performance.

## Unsupervised learning
In our unsupervised analysis of clustering Formula 1 circuits, tuning hyperparameters in the DBSCAN algorithm emerged as a significant factor in achieving meaningful clusters. This aspect underscores that adjustment of algorithm parameters can profoundly impact the outcomes and interpretability of the results. However, we encountered a remarkable challenge when categorical variables, rather than continuous variables like track length, number of turns, and altitude, predominantly drove the variation in clusters. This observation was somewhat anticipated, given the relative uniformity in these continuous variables across different tracks, which consequently led to categorical factors becoming more influential in the clustering process. This outcome, while initially disappointing, provided valuable insights into the feature space of track characteristics. In light of these findings, future work should pivot towards exploring the clustering of driver finish times in relation to track characteristics. This direction aims to delve deeper into the potential correlations between track features and performance outcomes, potentially uncovering patterns that could inform strategic decisions in race preparation and execution.

## Ethical Considerations

In the realm of predictive modeling within Formula 1 racing, ethical considerations must be at the forefront, particularly regarding the extraction and use of data. Our project utilized data from the Ergast API, which aggregates F1 statistics, and it is paramount to ensure that this data collection abides by the terms of service and respects the proprietary nature of the information. Since the data pertains to real individuals and teams, we must handle it with integrity, ensuring that no confidential strategies or sensitive personal data are disclosed. There is an ethical obligation to prevent the misuse of such predictive analytics that could unfairly influence betting markets or team strategies, potentially undermining the competitive fairness that is central to the sport. Moreover, we must acknowledge the impact of data-driven decisions on the sport's stakeholders, ensuring that the augmentation provided by machine learning complements the skill and expertise of teams and drivers, upholding the spirit of F1 racing.

Clustering Formula 1 tracks to find similarities between tracks raise several ethical issues, mainly concerning privacy, data accuracy, and potential bias. Firstly, if the data used for clustering included information about specific races, teams, or drivers, there could be concerns about confidentiality and the second use of sensitive data without consent. To address this, we did not expand our analysis to include driver information to ensure that no drivers or teams can be directly identified from the unsupervised analysis. Secondly, the accuracy and representation of data are critical; using incomplete or biased datasets could lead to misleading conclusions, potentially disadvantageous to developing countries. We ensured that the circuit data we collected is comprehensive and current to mitigate this issue. Engaging with stakeholders in the Formula 1 community for transparency and feedback could also help in identifying and addressing these ethical concerns.


<style>
.table-title {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
}

.styled-table {
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 0.9em;
    min-width: 400px;
    border-radius: 5px 5px 0 0;
    overflow: hidden;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}

.styled-table th,
.styled-table td {
    padding: 12px 15px;
}

.styled-table th {
    background-color: #b509ac;
    color: #ffff;
    text-align: left;
}

.styled-table tr {
    border-bottom: 1px solid #dddddd;
}

.styled-table tr:nth-of-type(even) {
    background-color: #f3f3f3;
}

.styled-table tr:last-of-type {
    border-bottom: 2px solid #b509ac;
}

</style>
