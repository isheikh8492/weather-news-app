from flask import Flask, jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)


@app.route("/", methods=["GET"])
def hello_world():
    return jsonify(
        {"message": "Yo this is the initial project set up by your man - Imad"}
    )


if __name__ == "__main__":
    app.run(port=5000)
