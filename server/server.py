import json
import re
import boto3
from thesaurus import get_related_words

comprehend = boto3.client(service_name='comprehend', region_name='ap-southeast-1')

def get_sentiment_score_aws(sentence_list):
    
    score = 0
    text_sent_list = []
    
    for sentence in sentence_list:
        result = comprehend.detect_sentiment(Text=sentence, LanguageCode='en')
        sentiment_info = result["SentimentScore"]
        
        text_sent_list.append((sentence, result["Sentiment"]))
        
        if result["Sentiment"] == "POSITIVE":
            score = score + sentiment_info["Positive"]
        elif result["Sentiment"] == "NEGATIVE":
            score = score + sentiment_info["Negative"] * -1
        elif result["Sentiment"] == "NEUTRAL":
            score = score + sentiment_info["Neutral"] * 0.3
    
    score = round(score / len(text_sent_list) if len(sentence_list) > 0 else 0, 4)
    return (text_sent_list, score)

def get_keyword_score_response(text_sent_list, score):
    resp_obj = {"score": score}
    resp_list = []
    
    for text, sentiment in text_sent_list:
        resp_list.append({"text": text, "sentiment": sentiment})
    
    resp_obj["sent_class"] = resp_list
    
    return resp_obj
    
def get_related_sentences(sentences, rel_words):
    result = []
    
    for s in sentences:
        words_in_sent = set(s.split(" "))
        if len(words_in_sent.intersection(rel_words)) > 0:
            result.append(s)
                
    return result

def lambda_handler(event, context):
    sentences = [p.lower().strip() for p in re.split(r"[.?!;\n]+", event["text"])]
    keyword1 = event["k1"].strip()
    keyword2 = event["k2"].strip()
    
    k1_rel_words = get_related_words(keyword1)
    k2_rel_words = get_related_words(keyword2)
    
    k1_sents = get_related_sentences(sentences, k1_rel_words)
    k2_sents = get_related_sentences(sentences, k2_rel_words)
    
    text_sent_list_k1, overall_score_k1 = get_sentiment_score_aws(k1_sents)
    text_sent_list_k2, overall_score_k2 = get_sentiment_score_aws(k2_sents)
    
    result = {}
    result[keyword1] = get_keyword_score_response(text_sent_list_k1, overall_score_k1)
    result[keyword2] = get_keyword_score_response(text_sent_list_k2, overall_score_k2)
    
    return result