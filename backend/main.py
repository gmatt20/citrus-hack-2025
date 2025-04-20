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

# Extract overviews to embed
overviews = [movie.overview for movie in movies]

# for movie in movies:
#   print(movie.title)

# Calculates the cosine similarity between 2 vectors.
def cosine_similarity(a, b):
    return np.dot(a, b.T) / (np.linalg.norm(a, axis=1)[:, np.newaxis] * np.linalg.norm(b, axis=1))

embedded_data = model.encode(overviews)

# Take in user input
queries = ["Vibe: chill, funny, dark jokes.?"]

# Embed user's input for the computer to understand what
# we are saying to it!
embedded_queries = model.encode(queries)

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
  "max_output_tokens": 2048,
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

query = queries[0]

prompt = f"""
You are a movie expert. Based on the following movie summaries, recommend a happy, feel-good movie:

{top_context}

User question: "{query}"
"""

response = Gemini.generate_content(prompt)
print(response.text)