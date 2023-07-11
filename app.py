from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import requests
from twilio.rest import Client
import os
from dotenv import load_dotenv
import os

app = Flask(__name__, static_folder="./frontend/build")

CORS(app)
load_dotenv()

client = Client(
    os.getenv("FLASK_TWILIO_ACCOUNT_SID"), os.getenv("FLASK_TWILIO_AUTH_TOKEN")
)


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path):
    if path != "" and os.path.exists(app.static_folder + "/" + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")


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
    MAPBOX_TOKEN = os.getenv("FLASK_MAPBOX_TOKEN")
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


@app.route("/send-sms", methods=["POST"])
def send_sms():
    data = request.get_json()
    phone_number = data.get("phoneNumber")
    message = data.get("message")

    message = client.messages.create(
        body=message, from_=os.getenv("FLASK_TWILIO_PHONE_NUMBER"), to=phone_number
    )

    return jsonify({"status": "success", "message_sid": message.sid})


if __name__ == "__main__":
    app.run(port=5000)
