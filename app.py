from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
from twilio.rest import Client
from os import environ
from dotenv import load_dotenv


app = Flask(__name__)
CORS(app)
load_dotenv()

client = Client(
    environ.get("FLASK_TWILIO_ACCOUNT_SID"), environ.get("FLASK_TWILIO_AUTH_TOKEN")
)


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


@app.route("/send-sms", methods=["POST"])
def send_sms():
    data = request.get_json()
    phone_number = data.get("phoneNumber")
    message = data.get("message")

    print(environ.get("FLASK_TWILIO_PHONE_NUMBER"))
    print(environ.get("FLASK_TWILIO_ACCOUNT_SID"))
    print(environ.get("FLASK_TWILIO_AUTH_TOKEN"))

    message = client.messages.create(
        body=message, from_=environ.get("FLASK_TWILIO_PHONE_NUMBER"), to=phone_number
    )

    return jsonify({"status": "success", "message_sid": message.sid})


if __name__ == "__main__":
    app.run(port=5000)
