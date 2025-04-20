from flask import Flask, request, jsonify
from ml import query

app = Flask(__name__)

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    user_input = data.get("input")

    if not user_input:
      return jsonify({"error": "No input provided"}), 400

    result = query(user_input)

    return jsonify({"result": result})
