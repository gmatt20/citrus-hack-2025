import requests
from dotenv import load_dotenv
import os
import json

load_dotenv()  # take environment variables

url = "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc"

key = os.getenv("TMDB_API_KEY_REAL")


headers = {
    "accept": "application/json",
    "Authorization": "Bearer " + key
}

response = requests.get(url, headers=headers)

response_json = json.loads(response.text)

print(response_json["results"][0]["title"])

# call the LLM



# print(response.text)