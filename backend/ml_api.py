from flask import Flask, request, jsonify
from flask_cors import CORS
from ml import query
import json

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json() or {}
    user_input = data.get("input")

    try:
        result = query(user_input)
        # Convert string result to JSON if it's a string
        if isinstance(result, str):
            try:
                result = json.loads(result)
            except json.JSONDecodeError:
                # If not valid JSON, return as is
                pass
        return jsonify({"result": result})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)