import random
import requests
from dotenv import load_dotenv
import os
import json
from sentence_transformers import SentenceTransformer
import numpy as np
import google.generativeai as gen_ai

# Embedding model is a ML technique that transforms data into 
# representations that a ML can understand, which are numbers.
# The numerical representations are known as embeddings which is
# used to capture the meaning and relationship within the data
# In essence, embeddings represent real-world stuff in a form
# that a computer or ML can understand!
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

# Creates an embedding model object. 
model = SentenceTransformer('paraphrase-MiniLM-L6-v2')

load_dotenv()  # take environment variables

url = "https://api.themoviedb.org/3/discover/movie"

key = os.getenv("TMDB_API_KEY_REAL")

params = {
    "include_adult": False,
    "include_video": False,
    "language": "en-US",
    "sort_by": "popularity.desc",
    "primary_release_date.gte": "1980-01-01",
    "with_genres": "28,12,16,35,80,99,18,10751,14,36,27,10402,9648,10749,878,10770,53,10752,37",
    "with_original_language": "en",
    "page": 1
}
headers = {
    "accept": "application/json",
    "Authorization": "Bearer " + key
}

response = requests.get(url, headers=headers, params=params)

response_json = json.loads(response.text)


def fetch_movies(pages=10):
    movies = []

    for page in range(1, pages + 1):
        local_params = {
            "include_adult": False,
            "include_video": False,
            "language": "en-US",
            "sort_by": "popularity.desc",
            "primary_release_date.gte": "1980-01-01",
            "with_genres": "28,12,16,35,80,99,18,10751,14,36,27,10402,9648,10749,878,10770,53,10752,37",
            "with_original_language": "en",
            "page": page
                }

        response = requests.get(url, headers=headers, params=local_params)
        if response.status_code == 200:
            response_json = response.json()
            for movie in response_json.get("results", []):
                if movie.get("overview"):  # Ensure the movie has a summary
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
        else:
            print(f"Failed to fetch page {page}: {response.status_code}")
            break

    return movies

movies = fetch_movies(pages=10)
print(f"Total movies fetched: {len(movies)}")
for movie in movies:
  print(movie.title)

# Extract overviews to embed
overviews = [movie.overview for movie in movies]

embedded_data = model.encode(overviews)

# for movie in movies:
#   print(movie.title)

# Calculates the cosine similarity between 2 vectors.
def cosine_similarity(a, b):
    a = np.array(a).reshape(1, -1) if len(a.shape) == 1 else a
    b = np.array(b).reshape(1, -1) if len(b.shape) == 1 else b

    return np.dot(a, b.T) / (np.linalg.norm(a, axis=1)[:, np.newaxis] * np.linalg.norm(b, axis=1))

def query(query):
  # Embed user's input for the computer to understand what
  # we are saying to it!
  embedded_queries = model.encode(query)

  similarities = cosine_similarity(embedded_queries, embedded_data)

  top_indices = list(np.argsort(similarities[0])[::-1][:3])  # Convert to list for indexing
  top_context = "\n\n".join(
      [f"Title: {movies[i].title}\nOverview: {overviews[i]}" for i in top_indices]
  )

  # call the LLM
  geminiKey = os.getenv("GEMINI_API_KEY")

  gen_ai.configure(api_key=geminiKey)

  # Set up the model
  generation_config = {
    "temperature": 0.9,
    "top_p": 1,
    "top_k": 1,
    "max_output_tokens": 200,
  }

  safety_settings = [
    {
      "category": "HARM_CATEGORY_HARASSMENT",
      "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
      "category": "HARM_CATEGORY_HATE_SPEECH",
      "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
      "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
      "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
      "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
      "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
  ]

  Gemini = gen_ai.GenerativeModel(model_name="gemini-2.0-flash",
                                generation_config=generation_config,
                                safety_settings=safety_settings)

  prompt = f"""
  You are a concise movie expert. Based on the following movie summaries and the context you are given, recommend an appropriate movie **in 2-3 sentences only**:

  {top_context}

  User question: "{query}"
  """

  response = Gemini.generate_content(prompt)

  result = response.text
  
  return result