import urllib3
import json
from porter import PorterStemmer

def get_related_words(root_word):
    rel_words = set()
    
    if len(root_word) > 0:
        rel_words.add(root_word)
        api_url = "https://www.dictionaryapi.com/api/v3/references/thesaurus/json/{}?key=4307e0db-8af2-43bc-8ab1-977f32898c4e"
    
        http_client = urllib3.PoolManager()
    
        response = http_client.request("GET", api_url.format(root_word))
    
        data = json.loads(response.data.decode('utf-8'))[0]
        
        rel_words = rel_words.union(set(data["meta"]['stems']))
        
        if len(data["meta"]['syns']) > 0:
            synonyms = set(data["meta"]['syns'][0][:5])
            synonyms_stemmed = get_stemmed_words(synonyms)
            rel_words = rel_words.union(synonyms).union(synonyms_stemmed)
        if len(data["meta"]['ants']) > 0:
            antonyms = set(data["meta"]['ants'][0][:5])
            antonyms_stemmed = get_stemmed_words(antonyms)
            rel_words = rel_words.union(antonyms).union(antonyms_stemmed)
            
    print(f"Root word: {root_word}, Related words: {rel_words}")

    return rel_words

def get_stemmed_words(word_list):
    stemmer = PorterStemmer()
    stemmed_words = set()
    
    for word in word_list:
        stemmed_words = stemmed_words.union(stemmer.stem(word, 0,len(word)-1))
        
    return stemmed_words