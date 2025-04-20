import os
import time
import json
import requests
import numpy as np
from dotenv import load_dotenv
from sentence_transformers import SentenceTransformer
import google.generativeai as gen_ai

load_dotenv()

# Setup keys and endpoints
TMDB_API_KEY = os.getenv("TMDB_API_KEY_REAL")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
CONVEX_URL = os.getenv("CONVEX_DEPLOYMENT_URL")
GET_NOTES_FUNCTION = "functions:getNotes"

model = SentenceTransformer('paraphrase-MiniLM-L6-v2')

class Data:
    def __init__(self, title, id, language, overview, popularity, poster, releaseDate, voteAvg):
        self.title = title
        self.id = id
        self.language = language
        self.overview = overview
        self.popularity = popularity
        self.poster = poster
        self.releaseDate = releaseDate
        self.voteAvg = voteAvg

def fetch_latest_note():
    try:
        response = requests.post(f"{CONVEX_URL}/api/query/{GET_NOTES_FUNCTION}", json={})
        if response.status_code != 200:
            print("Convex fetch failed:", response.text)
            return None
        notes = response.json()
        return notes[-1] if notes else None
    except Exception as e:
        print("Convex error:", e)
        return None

def fetch_movies(pages=10):
    movies = []
    url = "https://api.themoviedb.org/3/discover/movie"
    headers = {
        "accept": "application/json",
        "Authorization": f"Bearer {TMDB_API_KEY}"
    }

    for page in range(1, pages + 1):
        params = {
            "include_adult": False,
            "include_video": False,
            "language": "en-US",
            "sort_by": "vote_count.desc",
            "primary_release_date.gte": "1980-01-01",
            "with_original_language": "en",
            "page": page
        }
        response = requests.get(url, headers=headers, params=params)
        if response.status_code != 200:
            break
        data = response.json().get("results", [])
        for movie in data:
            if movie.get("overview"):
                movies.append(Data(
                    title=movie.get("title", "Unknown"),
                    id=movie.get("id"),
                    language=movie.get("original_language", ""),
                    overview=movie.get("overview", ""),
                    popularity=movie.get("popularity", 0),
                    poster=movie.get("poster_path", ""),
                    releaseDate=movie.get("release_date", ""),
                    voteAvg=movie.get("vote_average", 0)
                ))
        time.sleep(0.2)  # Avoid rate limit
    return movies

movies = fetch_movies(pages=5)
overviews = [movie.overview for movie in movies]
embedded_data = model.encode(overviews)

def cosine_similarity(a, b):
    a = np.array(a).reshape(1, -1) if len(a.shape) == 1 else a
    b = np.array(b).reshape(1, -1) if len(b.shape) == 1 else b
    return np.dot(a, b.T) / (np.linalg.norm(a, axis=1)[:, np.newaxis] * np.linalg.norm(b, axis=1))

def query(user_input=None):
    note = fetch_latest_note()
    if not user_input and note:
        user_input = f"Vibe: {note['note']}, Genre: {note['genre']}, Language: {note['language']}"
        print("🔍 Built query from Convex note:", user_input)
    elif not user_input:
        return "⚠️ No input provided and no notes found."

    embedded_query = model.encode(user_input)
    similarities = cosine_similarity(embedded_query, embedded_data)
    
    # Get top 5 similar movies instead of 3
    top_indices = list(np.argsort(similarities[0])[::-1][:5])
    top_movies = [movies[i] for i in top_indices]
    
    # Use the top 3 for context in the Gemini prompt
    top_context = "\n\n".join(
        [f"Title: {movies[i].title}\nOverview: {overviews[i]}" for i in top_indices[:3]]
    )

    gen_ai.configure(api_key=GEMINI_API_KEY)
    Gemini = gen_ai.GenerativeModel(
        model_name="gemini-2.0-flash",
        generation_config={"temperature": 0.9, "top_p": 1, "top_k": 1, "max_output_tokens": 200},
        safety_settings=[
            {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
            {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
            {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
            {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
        ]
    )

    prompt = f"""
You are a movie expert. Based on the following movie summaries and user context, recommend a feel-good movie in 2-3 sentences.

Movie Summaries:
{top_context}

User input:
"{user_input}"
"""
    response = Gemini.generate_content(prompt)
    
    # Create a structured response with both the recommendation and matching movies
    result = {
        "recommendation": response.text.strip(),
        "matching_movies": [
            {
                "title": movie.title,
                "id": movie.id,
                "overview": movie.overview,
                "release_date": movie.releaseDate,
                "vote_average": movie.voteAvg,
                "poster_path": movie.poster
            } for movie in top_movies
        ]
    }
    
    # Return as JSON string or as a Python dict based on your needs
    return json.dumps(result, indent=2)