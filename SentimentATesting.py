from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import pymongo
import certifi
ca = certifi.where()
def classify_sentiment(text):
    analyzer = SentimentIntensityAnalyzer()
    scores = analyzer.polarity_scores(text)
    compound_score = scores['compound']
    return compound_score

def add_up_scores(scores):
    sum = 0
    for score in scores:
        sum = sum + score
    return sum

connection_string = 'mongodb+srv://djsurt:d3@cluster0.i7gyzkp.mongodb.net/?retryWrites=true&w=majority'

client = pymongo.MongoClient(connection_string, tlsCAFile=ca)

db = client["test"]
collection = db["postmessages"]
documents = collection.find()
scores = []
for document in documents:
    scores.append(classify_sentiment(document['message']))
total = add_up_scores(scores=scores)
normalized_score = float(total)/len(scores)
community_feels = classify_sentiment(normalized_score)
print(community_feels)
