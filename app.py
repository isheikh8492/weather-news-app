from flask import Flask, jsonify, request
from flask_cors import CORS
from os import environ
import requests

app = Flask(__name__)
CORS(app)


@app.route("/api/hello", methods=["GET"])
def hello():
    return jsonify({"message": "This project was set up by your man - Imad"})


@app.route("/weather", methods=["GET"])
def get_weather():
    location = request.args.get("location", default="*", type=str)
    return jsonify({"location": location})


@app.route("/get-location-data", methods=["POST"])
def get_location_data():
    data = request.get_json()
    location = data.get("location")
    MAPBOX_TOKEN = environ.get("FLASK_MAPBOX_TOKEN")
    url = (
        "https://api.mapbox.com/geocoding/v5/mapbox.places/"
        + location
        + ".json?access_token="
        + MAPBOX_TOKEN
    )
    response = requests.get(url)
    response_data = response.json()
    coordinates = response_data.get("features", [{}])[0].get("center", [])
    latitude = coordinates[1] if len(coordinates) > 1 else None
    longitude = coordinates[0] if len(coordinates) > 0 else None
    return jsonify({"latitude": latitude, "longitude": longitude})


@app.route("/dashboard", methods=["POST"])
def get_dashboard_data():
    data = request.get_json()
    latitude = data.get("latitude")
    longitude = data.get("longitude")

    # Here you can use latitude and longitude to fetch additional data like weather, air quality, etc.
    # For the purpose of this example, I'll just return them as is.
    return jsonify({"latitude": latitude, "longitude": longitude})


if __name__ == "__main__":
    app.run(port=5000)
