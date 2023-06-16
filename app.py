from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/api/hello", methods=["GET"])
def hello():
    return jsonify({"message": "This project was set up by your man - Imad"})


@app.route("/weather", methods=["GET"])
def get_weather():
    location = request.args.get("location", default="*", type=str)
    return jsonify({"location": location})


if __name__ == "__main__":
    app.run(port=5000)
