from flask import Flask, request, jsonify
from ml import query

app = Flask(__name__)

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json() or {}
    user_input = data.get("input")

    try:
        result = query(user_input)
        return jsonify({"result": result})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
