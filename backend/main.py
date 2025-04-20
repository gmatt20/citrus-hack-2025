import requests
from dotenv import load_dotenv
import os
import json
from sentence_transformers import SentenceTransformer
import numpy as np

# Embedding model is a ML technique that transforms data into 
# representations that a ML can understand, which are numbers.
# The numerical representations are known as embeddings which is
# used to capture the meaning and relationship within the data
# In essence, embeddings represent real-world stuff in a form
# that a computer or ML can understand!

# Creates an embedding model object. 
model = SentenceTransformer('paraphrase-MiniLM-L6-v2')
class Data:
  def __init__(self, title, id, language, overview, popularity, poster, releaseDate, voteAvg ):
    self.title = title
    self.id = id
    self.language = language
    self.overview = overview
    self.popularity = popularity
    self.poster = poster
    self.releaseDate = releaseDate
    self.voteAvg = voteAvg

load_dotenv()  # take environment variables

url = "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc"

key = os.getenv("TMDB_API_KEY_REAL")


headers = {
    "accept": "application/json",
    "Authorization": "Bearer " + key
}

response = requests.get(url, headers=headers)

response_json = json.loads(response.text)

movies = []

for movie in response_json["results"]:
  data = Data(
    title=movie.get("title"),
    id=movie.get("id"),
    language=movie.get("original_language"),
    overview=movie.get("overview"),
    popularity=movie.get("popularity"),
    poster=movie.get("poster_path"),
    releaseDate=movie.get("release_date"),
    voteAvg=movie.get("vote_average")
  )
  movies.append(data)

for movie in movies:
  print(movie.title)

# print(response_json["results"][0]["title"])

# Calculates the cosine similarity between 2 vectors.
def cosine_similarity(a, b):
    return np.dot(a, b.T) / (np.linalg.norm(a, axis=1)[:, np.newaxis] * np.linalg.norm(b, axis=1))

# call the LLM


# print(response.text)