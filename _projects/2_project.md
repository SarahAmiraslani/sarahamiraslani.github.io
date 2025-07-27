---
layout: distill
title: Predicting Top 10 Formula 1 Finishes and Clustering Race Tracks
description: This project uses machine learning to predict top 10 finishes in F1 races and cluster tracks by characteristics.
date: 2024-04-01
img: /assets/img/f1-lego.jpg
importance: 1
category: Machine Learning & Analytics
github: https://github.com/SarahAmiraslani/formula1-predictions-track-clustering
giscus: true
giscus_comments: true
authors:
  - name: Sarah Amiraslani
    url: samirasl@umich.edu
    affiliations:
      name: University of Michigan, Ann Arbor
  - name: Akshay Tharval
    url: tharval@umich.edu
    affiliations:
      name: University of Michigan, Ann Arbor
  - name: Sam Kobrin
    url: kobrin@umich.edu
    affiliations:
      name: University of Michigan, Ann Arbor
toc:
  - name: Introduction
  - name: Data Source
  - name: Preprocessing
    # subsections:
    #   - name: Top 10 Predictions
    #   - name: Track Clustering
  - name: Exploratory Data Analysis
    # subsections:
    #   - name: Multivariate Analysis
    #   - name: Feature Importance
  - name: Feature Engineering
    # subsections:
    #   - name: Top 10 Predictions
    #   - name: Track Clustering
  - name: Modeling
    subsections:
      - name: Top 10 Predictions
        # subsections:
        #   - name: Logistic Regression
        #   - name: Random Forest
        #   - name: Neural Networks
        #   - name: Sensitivity Analysis
        #   - name: Failure Analysis
      - name: Track Clustering
  - name: Discussion
    # subsections:
    #   - name: Top 10 Prediction
    #   - name: Track Clustering
    #   - name: Ethical Considerations
bibliography: formula-one-distill.bib
---

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/red-bull.jpg" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/race-engineering.jpg" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    (left) <a href="https://www.formula1.com/en/drivers/sergio-perez">Sergio Pérez</a> driving for Red Bull image captured by Jared C. Tilton<d-cite key="race_for_second_2024"></d-cite>. (right) <a href="https://en.wikipedia.org/wiki/Scuderia_AlphaTauri">Alpha Tauri</a> engineers analyzing lap times, GPS coordinates, and video footage in real time in the pit wall.<d-cite key="how_teams_analyse_f1_race_strategy_2024"></d-cite>
</div>

# Introduction

Formula 1, often hailed as the pinnacle of motorsport, combines high-speed competition, cutting-edge technology, and a global fan base. This premier racing series showcases a unique synergy of engineering excellence, driver skill, and strategic depth, making it an intriguing subject for in-depth analysis. This project leverages machine learning to explore the complexities of Formula 1, with a primary focus on predicting top 10 finishes in races — a crucial outcome for securing championship points for drivers and teams. Additionally, we analyze race track characteristics through unsupervised learning, clustering tracks based on factors such as layout, surface, and length.

Historically, Formula 1 analytics has focused on predicting race winners using various statistical and machine learning techniques. These studies often reflect the dominance of certain teams during specific eras, such as Red Bull's supremacy from 2010 to 2013 and 2021 to the present, and Mercedes' stronghold from 2013 to 2020. While insightful, this focus on predicting race winners can overlook the nuanced dynamics and strategic elements that contribute to the broader competitive landscape of Formula 1 racing.

Our project aims to broaden the analytical scope by targeting the prediction of top 10 finishes. Securing a place in the top 10 is vital for accumulating championship points, crucial for both drivers and constructors over a season. By shifting our focus to these positions, we aim to capture the intricate competitive interactions and strategic nuances that influence race outcomes beyond the winner's podium. This approach provides a more comprehensive understanding of performance determinants in Formula 1, addressing both the predictability associated with team dominance and the variability arising from tactical decisions across the grid.

The Formula 1 points system awards points to the top 10 finishers in a grand prix, with the winner receiving 25 points, second place 18 points, and so on down to 1 point for the 10th place. Additionally, there is a bonus point for the fastest lap (FL) in the grand prix, provided the driver finishes in the top 10. In the shorter sprint races – about one-third the distance of a typical Grand Prix distance – points are awarded to the top 8 finishers, with the winner getting 8 points. This system, in place since 2010, was designed to create a larger gap between first and second place and to accommodate the expanded grid and improved reliability of modern cars.

| Position | 1st | 2nd | 3rd | 4th | 5th | 6th | 7th | 8th | 9th | 10th | FL  |
| -------- | --- | --- | --- | --- | --- | --- | --- | --- | --- | ---- | --- |
| Points   | 25  | 18  | 15  | 12  | 10  | 8   | 6   | 4   | 2   | 1    | 1   |

Additionally, our exploration into the unsupervised clustering of race tracks adds another dimension to this analysis. By uncovering similarities and distinctions among tracks, we offer deeper insights into how different track characteristics influence racing strategies and outcomes. This dual-faceted approach distinguishes our work from conventional race prediction analyses, offering a novel perspective on the dynamics of Formula 1 racing.

# Data Source

The Ergast Developer API served as a pivotal data source for our Formula 1 analysis, offering an extensive repository of historical race data, including driver standings, race results, and qualifying times<d-cite key="ergast"></d-cite>. Renowned for its comprehensive coverage of F1 statistics, the API was instrumental in various analytical projects, ranging from predictive modeling to detailed statistical analyses of driver performances. In our project, the Ergast API provided a robust foundation for both the supervised and unsupervised learning components. We used it to extract datasets spanning from 1995 to the present, reflecting our focus on the modern era of Formula 1 racing. This period is characterized by significant technological advancements and regulatory changes, making the data particularly relevant for our analysis. Key features of the API that we leveraged include its ability to filter data by race season, event, and individual driver/team performance metrics. This flexibility allowed us to tailor our dataset precisely to the needs of our predictive models and clustering algorithms, ensuring a high degree of accuracy and relevance in our analysis. Note that the Ergast API has been deprecated and is no longer accessible as of 2024.

> ##### Reproducibility Note
>
> The public Ergast API is set to sunset after the 2024 formula 1 season. To recreate You can find legacy data on [Kaggle](https://www.kaggle.com/datasets/rohanrao/formula-1-world-championship-1950-2020) or in this project's [GitHub repository](https://github.com/SarahAmiraslani/formula1-predictions-track-clustering/tree/main/data/raw).
> {: .block-tip }

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/ergast_db.png" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">
    An entity-relationship (ER) model of all the data available for modeling using the Ergast API.
</div>

# Preprocessing

## Top 10 Predictions

To prepare the dataset for supervised learning, a pre-processing routine was implemented, focusing on extracting and structuring key information from the Ergast Developer API. Initially, unique identifiers for races and racers were constructed using a combination of the race year and session for RaceId, and a concatenation of the racer's first and last names for RacerId. These identifiers serve as indexes to uniquely identify data points without directly contributing to the model's input features. For the Type of track, we categorized circuits into purpose-built tracks and street circuits, encoded as 0 and 1, respectively, based on circuit information obtained from the API. This binary classification aids the model in distinguishing the inherent differences between these track types. Additionally, we derived the TrackId by using the circuit name, ensuring a consistent reference across different datasets. The previous year's race result for each racer, Qualifying position, and the timings for Q1, Q2, and Q3 were meticulously extracted and formatted, with non-participation or non-qualification explicitly marked, ensuring a comprehensive dataset ready for analysis.

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
      <td>First name-Last name (e.g., Lewis-Hamilton)</td>
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

## Track Clustering

Our clustering of circuits based on track characteristics provides insight into how tracks relate to one another across a number of characteristics. We employed unsupervised learning techniques to uncover latent groupings among F1 circuits worldwide.

For our analysis of F1 track characteristics, we leveraged three data sources. The first was a table of F1 track characteristics scraped from wikipedia. The second was a track characteristic retrieved from the Ergast API. The third was a dataset of F1 circuits from Kaggle. Details of the data sources are provided in the table below.

<table class="styled-table">
  <thead>
    <tr>
      <th style="width: 10%;">Attribute</th>
      <th style="width: 30%;">Wikipedia</th>
      <th style="width: 30%;">Ergast API</th>
      <th style="width: 30%;">Kaggle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Location</td>
      <td><a href="https://en.wikipedia.org/wiki/List_of_Formula_One_circuits">Wikipedia List of F1 Circuits</a></td>
      <td><a>API Query<d-footnote><code>https://ergast.com/api/f1/circuits?limit=100&amp;offset=0</code> was used as the API endpoint. However, note that the API service is deprecated as of 2024 and is no longer accessible. </d-footnote></a></td>
      <td><a href="https://www.kaggle.com/datasets/rohanrao/formula-1-world-championship-1950-2020">Kaggle F1 circuits.csv dataset</a></td>
    </tr>
    <tr>
      <td>Format</td>
      <td>scraped html table</td>
      <td>JSON</td>
      <td>CSV</td>
    </tr>
    <tr>
      <td>Important Variables Included</td>
      <td>Circuit Name, Type, Direction, circuit length in kilometers</td>
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
      <td>Match track names from the Wikipedia table using Levenshtein distance, and perform a left join with the Wikipedia data.</td>
      <td>Match track names from the Wikipedia table using Levenshtein distance, and perform a left join with the Wikipedia data.	. Impute missing number of turn values with K nearest neighbors imputer.</td>
    </tr>
  </tbody>
</table>

After our initial data sourcing and preprocessing, we developed a dataset that contained 5 complete features for all 77 F1 circuits since 1950: altitude, track length in kilometers, number of turns, circuit type (road, race, or street), and circuit direction (clockwise, counterclockwise, or figure eight). Our selection of features to represent circuits was informed by consultations with F1 enthusiasts, ensuring our analysis represented how F1 subject matter experts would evaluate and characterize tracks.

# Exploratory Data Analysis

Our data analysis phase utilized a suite of visual tools to dissect and understand the underlying patterns within the Formula 1 dataset. Through the use of heatmaps, we were able to discern the correlation across various features, providing us with an initial glimpse into the relationships between variables such as qualifying times, previous year's positions, and their impact on race outcomes. Pair plots further enriched our analysis by offering a granular view of the pairwise relationships between features, revealing trends, clusters, and potential outliers that could influence model performance. Additionally, leveraging feature importance plots, particularly from our Random Forest model, allowed us to identify the most predictive variables in determining top 10 finishes. This visual exploration not only guided our feature selection process but also offered profound insights into the factors that most significantly affect race performance, laying a robust foundation for our predictive modeling efforts. This comprehensive approach to data analysis ensures that our models are built on a nuanced understanding of the dataset, maximizing their ability to uncover meaningful patterns and predictions.

## Multivariate Analysis

A heatmap is a graphical representation of data where values are depicted by color, allowing for an intuitive perception of patterns, such as correlations between variables in a dataset, which can be crucial for identifying relationships and trends at a glance.

<div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/f1-heatmap.png" class="img-fluid rounded z-depth-1" zoomable=true %}
</div>

- **Strong Negative Correlation between Qualifying Position and Race Position**: There is a strong negative correlation (r = -0.51) between `qualifying_pos` and `position`. This suggests that drivers with better (lower number) qualifying positions tend to finish the race in better (also, numerically lower) positions.
- **Positive Correlation between Q2 and Q3 Timings**: The `q2_timing` and `q3_timing` have a strong positive correlation (r = 0.64). This indicates that drivers who perform well in Q2 also tend to perform well in Q3.
- **Negative Correlation between Q2/Q3 Timings and Qualifying Position**: Both `q2_timing` and `q3_timing` show a significant negative correlation with qualifying_pos (r = -0.48 and r = -0.64, respectively). This implies that faster (i.e., lower) timings in Q2 and Q3 are associated with better qualifying positions.
- **Weak Correlation between Q1 Timing and Other Features**: The `q1_timing` shows relatively weak correlations with other features, with the highest being r =0.17 with `q2_timing`. This might suggest that the Q1 timing is less indicative of the final position or the performances in the later qualifying rounds.
- **Low Correlation between Previous Year Position and Current Position**: There is a very weak negative correlation (almost zero) between `prev_year_pos` and `position`. This suggests that the previous year's race position does not have a strong predictive power on the current year's race outcome.

A pair plot, or a scatterplot matrix, visualizes pairwise relationships between variables in a dataset, combining scatter plots for each variable combination with histograms to show the distribution of each variable, thus providing a comprehensive overview of correlations, trends, and distributions all in one figure.

<div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/f1-pairplot.png" class="img-fluid rounded z-depth-1" zoomable=true %}
</div>

- **Distinct Clusters in Timing Data**: The scatter plots between `q2_timing` and `q3_timing` display distinct clusters, indicating that there may be distinct groups within the data. This could represent different performance tiers among the drivers or cars.
- **Positive Relationship between Q2 and Q3**: There is a positive linear relationship between `q2_timing` and `q3_timing`. Drivers who have lower (better) timings in Q2 also tend to have lower (better) timings in Q3.
- **Top 10 Finishers Distribution**: When looking at the hue for `position`, there appears to be a concentration of top 10 finishers (denoted by the color, possibly orange) with lower `qualifying_pos` values, reinforcing the importance of qualifying performance on race outcomes.
- **Timing and Qualifying Position**: There is a trend visible in the scatter plots of the timing variables (q1_timing, `q2_timing`, `q3_timing`) against qualifying_pos. Drivers with lower qualifying positions tend to have lower (faster) timings in all three qualifying sessions, particularly noticeable in `q2_timing` and `q3_timing`.

## Feature Importance

A feature importance plot ranks the features of a model based on their importance in making accurate predictions, and in the context of a Random Forest Classifier, it reflects how much each feature contributes to reducing the variance in the model's predictions.

<div class="col-sm mt-3 mt-md-0">
    {% include figure.liquid loading="eager" path="assets/img/f1-feature-importance.png" class="img-fluid rounded z-depth-1" zoomable=true %}
</div>

- **Q1 Timing Dominance**: The `q1_timing` feature has the highest importance score, suggesting it is the most significant predictor in determining the race position.
- **Lower Importance of Previous Year Position**: The `prev_year_pos` feature has the lowest importance score, indicating that it has the least influence on the model's predictions of race position outcomes compared to the other features in the dataset.

# Feature Engineering

## Top 10 predictions

## Track Clustering

Because clustering and dimensionality reduction algorithms require numeric representations of data, our categorical features were one-hot encoded. This transformation allowed us to integrate categorical and continuous data, enhancing the robustness of our analysis. Furthermore, to ensure features with larger scales did not dominate the cluster distance calculations, potentially biasing the clustering outcome, we leveraged a standard scaler to ensure that each feature contributes equally to the distance computations.

# Modeling

## Top 10 Predictions

Supervised learning is at the core of our project, focusing on predicting the likelihood of Formula 1 drivers finishing in the top 1 — an outcome critical for championship points. Our methodology involves training models on a dataset featuring variables such as track type, drivers' past performances, qualifying positions, and lap times. The goal is to classify each race outcome into a binary variable indicating whether a driver finishes in the top 10. This focus is driven by the significant impact these positions have on championship standings.

We employ various models, including Random Forest, Logistic Regression, and Neural Networks, each chosen for its ability to capture different aspects of the complex dynamics influencing Formula 1 race outcomes. These models are trained, validated, and tested on data from the Ergast Developer API, providing a robust foundation for our predictive analysis. Accuracy is our primary metric for evaluating model performance, as it offers clear interpretability for our binary classification task, simplifying the analysis by focusing on the overall goal of identifying drivers and conditions that frequently lead to top 10 finishes.

### Logistic Regression

Logistic Regression is a statistical method used to predict a binary outcome based on one or more predictor variables. It is particularly popular for binary classification tasks, such as predicting whether a driver will finish in the top 10.

{% details Click here to see the code block %}
The function below was used to find the ideal the logistic regression model using grid search.
<d-code block language="python">
def build_best_logistic_regression_model(
X_train_scaled, X_test_scaled, y_train, y_test, param_grid, \*\*grid_search_kwargs
):
"""
Builds and returns the best Logistic Regression model using GridSearchCV.

    Args:
        X_train_scaled (pd.DataFrame): Scaled training features.
        X_test_scaled (pd.DataFrame): Scaled test features.
        y_train (pd.Series): Training labels.
        y_test (pd.Series): Test labels.
        param_grid (dict): Parameter grid for GridSearchCV.
        **grid_search_kwargs: Additional keyword arguments for GridSearchCV.

    Returns:
        best_model (LogisticRegression): The best Logistic Regression model.
        accuracy (float): Accuracy of the best model on the test set.
    """
    # Initializing the Logistic Regression model
    log_reg = LogisticRegression(random_state=42, max_iter=1000)

    # Setting up GridSearchCV to find the best model
    grid_search = GridSearchCV(
        estimator=log_reg,
        param_grid=param_grid,
        cv=5,
        scoring="accuracy",
        n_jobs=-1,
        verbose=1,
        **grid_search_kwargs,
    )

    start_time = time.time()
    logging.info("Starting GridSearchCV to find the best Logistic Regression model.")

    try:
        # Fitting GridSearchCV to the training data
        grid_search.fit(X_train_scaled, y_train)

        # Extracting the best estimator (model)
        best_model = grid_search.best_estimator_

        # Making predictions with the best model on the test set
        y_pred = best_model.predict(X_test_scaled)

        # Calculating the accuracy of the best model
        accuracy = accuracy_score(y_test, y_pred)

        end_time = time.time()
        elapsed_time = end_time - start_time

        logging.info(f"GridSearchCV completed in {elapsed_time:.2f} seconds.")
        logging.info(f"Best Model's Accuracy: {accuracy * 100:.2f}%")
        logging.info(f"Best Parameters: {grid_search.best_params_}")

        # Returning the best model and its accuracy
        return best_model, accuracy

    except Exception as e:
        logging.error(f"An error occurred during GridSearchCV: {e}")
        return None, None

# Defining the parameter grid for logistic regression

lr_param_grid = {
"C": [0.01, 0.1, 1, 10, 100],
"penalty": ["l1", "l2"],
"solver": ["liblinear"], # 'liblinear' is compatible with l1 and l2 penalties.
}

# Building and evaluating the Logistic Regression model

best_lr_model, best_lr_accuracy = build_best_logistic_regression_model(
X_train_scaled,
X_test_scaled,
y_train,
y_test,
lr_param_grid,
return_train_score=True,
)

if best_lr_model is not None:
dump(best_lr_model, "best_logistic_regression_model.joblib")

</d-code>
{% enddetails %}

The provided code defines a function to construct and fine-tune a logistic regression model using grid search to explore a defined space of hyperparameters. GridSearchCV fits the model on the scaled training data using combinations of regularization strength (`C`), penalty type (`penalty`), and solver algorithm (`solver`) to determine the most effective parameters. The optimal model, with an l1 penalty, a regularization strength of 0.01, and the liblinear solver, achieved a prediction accuracy of 73.14% on the test dataset.

### Random Forest

Random Forest is an ensemble learning method that constructs multiple decision trees and outputs the mode of the classes for classification tasks. It is known for its accuracy, robustness, and ability to handle large datasets with high dimensionality, reducing the risk of overfitting.

{% details Click here to see the code block %}
<d-code block language="python">
def build_best_random_forest_model(
X_train, X_test, y_train, y_test, param_grid, \*\*grid_search_kwargs
):
"""
Builds and returns the best Random Forest model using GridSearchCV.

    Args:
        X_train (pd.DataFrame): Training features.
        X_test (pd.DataFrame): Test features.
        y_train (pd.Series): Training labels.
        y_test (pd.Series): Test labels.
        param_grid (dict): Parameter grid for GridSearchCV.
        **grid_search_kwargs: Additional keyword arguments for GridSearchCV.

    Returns:
        best_model (RandomForestClassifier): The best Random Forest model.
        accuracy (float): Accuracy of the best model on the test set.
    """
    # Initializing the Random Forest classifier
    rf_clf = RandomForestClassifier(random_state=42)

    # Setting up GridSearchCV to find the best model
    grid_search = GridSearchCV(
        estimator=rf_clf,
        param_grid=param_grid,
        cv=5,
        scoring="accuracy",
        n_jobs=-1,
        verbose=1,
        **grid_search_kwargs,
    )

    start_time = time.time()
    logging.info("Starting GridSearchCV to find the best Random Forest model.")

    try:
        # Fitting GridSearchCV to the training data
        grid_search.fit(X_train, y_train)

        # Extracting the best estimator (model)
        best_model = grid_search.best_estimator_

        # Making predictions with the best model on the test set
        y_pred = best_model.predict(X_test)

        # Calculating the accuracy of the best model
        accuracy = accuracy_score(y_test, y_pred)

        end_time = time.time()
        elapsed_time = end_time - start_time

        logging.info(f"GridSearchCV completed in {elapsed_time:.2f} seconds.")
        logging.info(f"Best Model's Accuracy: {accuracy * 100:.2f}%")
        logging.info(f"Best Parameters: {grid_search.best_params_}")

        # Returning the best model and its accuracy
        return best_model, accuracy

    except Exception as e:
        logging.error(f"An error occurred during GridSearchCV: {e}")
        return None, None

# Defining the parameter grid for Random Forest

rf_param_grid = {
"n_estimators": [10, 50, 100, 200],
"max_depth": [None, 10, 20, 30],
"min_samples_split": [2, 5, 10],
}

# Example usage with additional GridSearchCV parameters

best_rf_model, best_rf_accuracy = build_best_random_forest_model(
X_train_scaled,
X_test_scaled,
y_train,
y_test,
rf_param_grid,
return_train_score=True,
)

if best_rf_model is not None:
dump(best_rf_model, "best_random_forest_model.joblib")

</d-code>
{% enddetails %}

The provided code builds and evaluates a Random Forest classifier using a grid search over specified hyperparameters. GridSearchCV systematically tests parameter combinations, cross-validating to find the best performance in terms of accuracy. The optimal model achieved an accuracy of 73.87% on the test set, with 200 trees (`n_estimators`), a maximum depth of 10 (`max_depth`), and a minimum split size of 10 (`min_samples_split`).

### Neural Networks

Neural Networks are algorithms modeled after the human brain, designed to recognize patterns and perform classification tasks. They process information in a layered structure of nodes, making them effective for complex pattern recognition and predictive modeling.

{% details Click here to see the code block %}

<d-code block language="python">
def create_model(hidden_nodes=1, learning_rate=0.001):
    """
    Creates and compiles a Keras Sequential model.

    Args:
        hidden_nodes (int): Number of nodes in the hidden layer.
        learning_rate (float): Learning rate for the optimizer.

    Returns:
        model (Sequential): Compiled Keras model.
    """
    # Define the model
    model = Sequential()
    model.add(Dense(hidden_nodes, input_dim=X_train_scaled.shape[1], activation="relu"))
    model.add(Dense(1, activation="sigmoid"))  # Output layer for binary classification

    # Compile the model
    optimizer = Adam(learning_rate=learning_rate)
    model.compile(loss="binary_crossentropy", optimizer=optimizer, metrics=["accuracy"])
    return model

def build_best_neural_network_model(
X_train_scaled, X_test_scaled, y_train, y_test, param_grid, \*\*grid_search_kwargs
):
"""
Builds and returns the best neural network model using GridSearchCV.

    Args:
        X_train_scaled (pd.DataFrame): Scaled training features.
        X_test_scaled (pd.DataFrame): Scaled test features.
        y_train (pd.Series): Training labels.
        y_test (pd.Series): Test labels.
        param_grid (dict): Parameter grid for GridSearchCV.
        **grid_search_kwargs: Additional keyword arguments for GridSearchCV.

    Returns:
        best_model (KerasClassifier): The best neural network model.
        accuracy (float): Accuracy of the best model on the test set.
    """
    # Wrapping the Keras model so it can be used by scikit-learn
    model = KerasClassifier(build_fn=create_model, verbose=0)

    # Setting up GridSearchCV to find the best model
    grid_search = GridSearchCV(
        estimator=model,
        param_grid=param_grid,
        cv=5,
        scoring="accuracy",
        n_jobs=-1,
        verbose=1,
        **grid_search_kwargs,
    )

    start_time = time.time()
    logging.info("Starting GridSearchCV to find the best neural network model.")

    try:
        # Fitting GridSearchCV to the training data
        grid_search.fit(X_train_scaled, y_train)

        # Extracting the best estimator (model)
        best_model = grid_search.best_estimator_

        # Making predictions with the best model on the test set
        y_pred = best_model.predict(X_test_scaled)
        y_pred = np.round(y_pred).astype(int)  # Convert probabilities to binary output

        # Calculating the accuracy of the best model
        accuracy = accuracy_score(y_test, y_pred)

        end_time = time.time()
        elapsed_time = end_time - start_time

        logging.info(f"GridSearchCV completed in {elapsed_time:.2f} seconds.")
        logging.info(f"Best Model's Accuracy: {accuracy * 100:.2f}%")
        logging.info(f"Best Parameters: {grid_search.best_params_}")

        # Returning the best model and its accuracy
        return best_model, accuracy

    except Exception as e:
        logging.error(f"An error occurred during GridSearchCV: {e}")
        return None, None

# Defining the parameter grid for the neural network

nn_param_grid = {
"hidden_nodes": [10, 50, 100],
"learning_rate": [0.001, 0.01, 0.1],
"epochs": [50],
"batch_size": [32],
}

# Building and evaluating the neural network model

best_nn_model, best_nn_accuracy = build_best_neural_network_model(
X_train_scaled,
X_test_scaled,
y_train,
y_test,
nn_param_grid,
return_train_score=True,
)

if best_nn_model is not None:
dump(best_nn_model, "best_neural_network_model.joblib")

</d-code>
{% enddetails %}

The provided code builds and optimizes a neural network model for binary classification using Keras and TensorFlow. A function, `create_model`, defines a neural network with one hidden layer and a given learning rate. The `build_best_neural_network_model` function uses `GridSearchCV` to iterate over hyperparameters such as the number of hidden nodes, learning rate, epochs, and batch size. The best-performing model, with 10 hidden nodes, a learning rate of 0.01, a batch size of 32, and training for 50 epochs, achieved an accuracy of 73.82% on the scaled test data.

### Sensitivity Analysis

The sensitivity analysis across all three models — Random Forest, Logistic Regression, and Neural Network — reveals consistent findings. The feature `qualifying_pos` exhibits the highest sensitivity, indicating a strong influence on the model's predictions; changes in qualifying position are likely to have a significant impact on the probability of a driver finishing in the top 10. In contrast, `prev_year_pos` shows notably lower sensitivity, suggesting that a driver's position in the previous year is less indicative of their performance in the current race. The timing features (`q1_timing`, `q2timing`, `q3_timibg`) demonstrate moderate sensitivity, with some variability across the models, reflecting their respective influence on race outcomes. This consistent pattern across different models underscores the robustness of these features' influences on predicting top 10 finishes in Formula 1 races.

{% details Click here to see the code block %}

<d-code block language="python">
def perform_sensitivity_analysis(
    models, X_scaled, feature_names, output_dir=".", file_format="png"
):
    """
    Perform sensitivity analysis on given models.

    Args:
        models (dict): Dictionary of trained models with their names as keys.
        X_scaled (np.ndarray): Scaled features array.
        feature_names (list): List of feature names.
        output_dir (str): Directory to save the sensitivity analysis plots.
        file_format (str): File format for saving plots.
    """
    # Number of points to evaluate for each feature
    num_points = 100

    # Results dictionary to store sensitivity data
    sensitivity_results = {}

    # Iterate through each model
    for model_name, model in models.items():
        logging.info(f"Analyzing model: {model_name}")
        sensitivity_results[model_name] = {}

        # Iterate through each feature
        for feature in feature_names:
            # Array to hold predictions
            predictions = []

            # Generate values across the range
            feature_index = feature_names.index(feature)
            min_val, max_val = np.min(X_scaled[:, feature_index]), np.max(
                X_scaled[:, feature_index]
            )
            values = np.linspace(min_val, max_val, num_points)

            # Modify one feature at a time, keeping others constant
            for val in values:
                X_temp = np.copy(X_scaled)
                X_temp[:, feature_index] = val
                try:
                    pred = model.predict(X_temp)
                    predictions.append(np.mean(pred))
                except Exception as e:
                    logging.error(
                        f"Error predicting with model {model_name} for feature {feature}: {e}"
                    )
                    predictions.append(np.nan)  # Use NaN to indicate prediction failure

            sensitivity_results[model_name][feature] = np.nanstd(
                predictions
            )  # Use nanstd to handle NaNs

    # Plotting the sensitivity results
    for model_name, sensitivities in sensitivity_results.items():
        plt.figure(figsize=(10, 6))
        plt.title(f"Sensitivity Analysis for {model_name}")
        plt.bar(range(len(sensitivities)), list(sensitivities.values()), align="center")
        plt.xticks(
            range(len(sensitivities)), list(sensitivities.keys()), rotation="vertical"
        )
        plt.ylabel("Standard Deviation of Predictions")

        file_path = f"{output_dir}/sensitivity_{model_name}.{file_format}"
        plt.savefig(file_path, dpi=300)
        plt.show()
        logging.info(f"Sensitivity plot saved to {file_path}")

# Example usage

models = {
"Random Forest": best_rf_model,
"Logistic Regression": best_lr_model,
"Neural Network": best_nn_model,
}

feature_names = [
"q1_timing",
"q2_timing",
"q3_timing",
"qualifying_pos",
"prev_year_pos",
]
perform_sensitivity_analysis(models, X_test_scaled, feature_names)
</d-code>
{% enddetails %}

### Failure Analysis

Supervised learning, while a powerful tool for predictive modeling, may encounter significant challenges in the context of Formula 1 race outcome predictions, primarily due to the intricacies and complexities inherent to the sport. One of the fundamental hurdles is the inadequacy of available data concerning the detailed specifications and configurations of F1 cars. This information, encompassing aspects like downforce levels, ground clearance, engine settings, and more, remains proprietary to each racing team. Such data is critical for accurately forecasting race outcomes, as these variables can significantly impact a car's performance on different tracks under varying conditions. Moreover, the dynamic nature of F1 races, where strategies and car setups are meticulously tailored for each race weekend, further complicates the predictive modeling efforts. Without access to this depth of data, supervised learning models are limited to more surface-level features, potentially overlooking nuanced factors that are decisive for race results.

Additionally, our approach deliberately excludes pit stop strategies from the predictive factors, considering them as in-race variables that are not predetermined and thus fall outside the scope of pre-race predictions. This decision, while simplifying the modeling process, omits a crucial element of race strategy that can dramatically influence race outcomes. Pit stops are often used strategically to gain an advantage over competitors, and their timing and execution can vary based on a multitude of factors, including weather conditions and tire performance. Furthermore, the unpredictable nature of mechanical failures and retirements adds another layer of complexity to race outcome predictions. Cars may fail for myriad reasons, from engine blowouts to collisions, which are virtually impossible to predict with supervised learning models based solely on historical data. These elements introduce a level of randomness and uncertainty that can derail even the most sophisticated models, underscoring the limitations of using supervised learning for predicting outcomes in a sport as complex and multifaceted as Formula 1.

## Track Clustering

Our primary clustering algorithm was DBSCAN (Density-Based Spatial Clustering of Applications with Noise). This unsupervised clustering algorithm is known for its efficacy in identifying non-normally distributed clusters of varying shapes and sizes without predefining the number of clusters. The optimal epsilon value, a critical hyperparameter for DBSCAN, was estimated using the Nearest Neighbors algorithm. We adhered to the heuristic of setting `n_neighbors` to `2*dim - 1`, where `dim` represents the dimensionality of our feature space, to balance local density estimation and computational feasibility. We determined the optimal epsilon value by evaluating where the distance of the 5th nearest neighbor stated to increase exponentially in the K-distance graph.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/Dendogram-track.png" class="img-fluid rounded z-depth-1 same-height-sd" style="--custom-height: 100px;" zoomable=true %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/K-Distance.png" class="img-fluid rounded z-depth-1 same-height-sd" style="--custom-height: 100px;" zoomable=true %}
    </div>
</div>
<div class="caption">
Evaluation of Clusters with Elbow method and Dendrogram.
</div>

Simultaneously, we explored hierarchical clustering to validate our findings with DBSCAN. Through visual inspection of a dendrogram, we optimized the distance threshold to ensure that there was significant dissimilarity between clusters. Despite some variance, both DBSCAN and hierarchical clustering revealed similar cluster structures, underscoring the generalizability of the clusters produced by DBSCAN.

To evaluate the sensitivity of our clusters to changes in the data, we took three bootstrap random samples of 80% of the data. These bootstrap samples yielded similar clusters to clusters generated from the entire dataset, denoting the stability of our clustering approach to changes in the data.

To navigate the high-dimensional nature of our data, we leveraged Principal Component Analysis (PCA) and t-Distributed Stochastic Neighbor Embedding t-SNE for dimensionality reduction to visualize in two-dimensions. While PCA provided a broad overview of data variance, t-SNE allowed us to observe the nuanced structure of our clusters in two dimensions. Our biplot overlay on the PCA scatter plot revealed that circuit types and directions were predominant drivers behind the clustering.

<div class="row mt-3">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/tracks-biplot.png" class="img-fluid rounded z-depth-1 same-height-sd" style="--custom-height: 100px;" zoomable=true %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/t-sne-tracks.png" class="img-fluid rounded z-depth-1 same-height-sd" style="--custom-height: 100px;" zoomable=true %}
    </div>
</div>
<div class="caption">
Visual evaluation of cluster results: track direction and type drives clusters.
</div>

# Discussion

## Top 10 Prediction

The Random Forest model, with its ensemble approach, provided an accuracy of 73.87%, indicating a robust predictive capability potentially due to its handling of non-linear relationships between features and the target variable. This model's performance was slightly outperformed by the Neural Network model, which achieved an accuracy of 73.82%, with an architecture of a single hidden layer containing ten nodes.
The Neural Network's performance, despite being marginally lower, suggests that a more complex model does not necessarily guarantee superior results, considering the computational complexity and time taken to train such models. The Logistic Regression model, a more straightforward and interpretable model, yielded a slightly lower accuracy of 73.14%. This could be attributed to its linear nature, which may not capture complex patterns in the data as effectively as the other two models. However, the difference in accuracy is relatively small, highlighting that simpler models can still be competitive and beneficial, especially when considering the trade-off between performance and model complexity.

The feature importance plot and the pair plot provided valuable insights into the predictive power of different features, with q1_timing and qualifying_pos being the most significant predictors across models, aligning with domain knowledge that qualifying performances have substantial impacts on race outcomes. The negligible importance of the prev_year_pos feature suggests that past performance is not a reliable indicator of future race results, pointing to the dynamic nature of the sport where numerous variables can influence race day performance.

## Track Clustering

In our unsupervised analysis of clustering Formula 1 circuits, tuning hyperparameters in the DBSCAN algorithm emerged as a significant factor in achieving meaningful clusters. This aspect underscores that adjustment of algorithm parameters can profoundly impact the outcomes and interpretability of the results. However, we encountered a remarkable challenge when categorical variables, rather than continuous variables like track length, number of turns, and altitude, predominantly drove the variation in clusters. This observation was somewhat anticipated, given the relative uniformity in these continuous variables across different tracks, which consequently led to categorical factors becoming more influential in the clustering process. This outcome, while initially disappointing, provided valuable insights into the feature space of track characteristics. In light of these findings, future work should pivot towards exploring the clustering of driver finish times in relation to track characteristics. This direction aims to delve deeper into the potential correlations between track features and performance outcomes, potentially uncovering patterns that could inform strategic decisions in race preparation and execution.
