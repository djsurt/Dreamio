from nltk.sentiment.vader import SentimentIntensityAnalyzer

# Define the dream posts
dreams = [
    "I had a dream that I was flying over a beautiful landscape.",
    "Last night, I had a nightmare about being chased by a monster.",
    "My dream was so strange - I was at a party with all my exes!",
    "I had a dream that I was reunited with my childhood pet.",
    "In my dream, I won the lottery and was able to buy my dream house.",
    "I had a dream about my late grandmother, and it felt so real.",
    "I dreamt that I was lost in a dark forest and couldn't find my way out.",
    "My dream was about being on a beach, watching the sunset with my partner."
]

# Initialize the sentiment analyzer
analyzer = SentimentIntensityAnalyzer()

# Analyze each dream and print the sentiment classification
for dream in dreams:
    sentiment_scores = analyzer.polarity_scores(dream)
    if sentiment_scores['compound'] >= 0.05:
        print(f"{dream}\nSentiment: Positive\n")
    elif sentiment_scores['compound'] <= -0.05:
        print(f"{dream}\nSentiment: Negative\n")
    else:
        print(f"{dream}\nSentiment: Neutral\n")
