# This is the AWS lambda code. It was written directly in the online lambda editor

import json
import re
import boto3

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
        else:
            score = score + 0
            #ignore the cases where the sentiment is mixed
        
    return (text_sent_list, score)

def get_keyword_score_response(text_sent_list, score):
    resp_obj = {"Score": score}
    resp_list = []
    
    for text, sentiment in text_sent_list:
        resp_list.append({"text": text, "sentiment": sentiment})
    
    resp_obj["sent_class"] = resp_list
    
    return resp_obj

def lambda_handler(event, context):
    sentences = [p.lower().strip() for p in re.split(r"[.?!;\n]+", event["text"])]
    k1_sents = []
    k2_sents = []
    
    for s in sentences:
        if event["k1"] in s:
            k1_sents.append(s)
        elif event["k2"] in s:
            k2_sents.append(s)
    
    text_sent_list_k1, overall_score_k1 = get_sentiment_score_aws(k1_sents)
    text_sent_list_k2, overall_score_k2 = get_sentiment_score_aws(k2_sents)
    
    result = {}
    result[event["k1"]] = get_keyword_score_response(text_sent_list_k1, overall_score_k1)
    result[event["k2"]] = get_keyword_score_response(text_sent_list_k2, overall_score_k2)
    
    return {
        'statusCode': 200,
        'body': json.dumps(result)
    }
