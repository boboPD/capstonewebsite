import urllib3
import json

def get_related_words(root_word):
    rel_words = {root_word}
    api_url = "https://www.dictionaryapi.com/api/v3/references/thesaurus/json/{}?key=api_key"

    http_client = urllib3.PoolManager()

    response = http_client.request("GET", api_url.format(root_word))

    data = json.loads(response.data.decode('utf-8'))[0]
    
    rel_words = rel_words.union(set(data["meta"]['stems']))
    rel_words = rel_words.union(set(data["meta"]['syns'][0][:5]))
    rel_words = rel_words.union(set(data["meta"]['ants'][0][:5]))

    return rel_words

print(get_related_words("hygiene"))