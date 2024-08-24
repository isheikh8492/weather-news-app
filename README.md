# Weather Dashboard

A comprehensive web application that provides real-time, location-based weather forecasts and news, powered by OpenMeteo APIs and NewsAPI. The project integrates various technologies such as ReactJS, Flask, OpenAI's Text-Davinci-003 model, Twilio, Google Firebase, Material UI, Bootstrap, and is deployed on Heroku. The Weather Dashboard offers users a seamless experience with accurate weather updates, news articles, and additional features like SMS notifications.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Installation](#installation)
- [Usage](#usage)
- [APIs Used](#apis-used)
- [Firebase Integration](#firebase-integration)
- [Twilio Integration](#twilio-integration)
- [OpenAI Integration](#openai-integration)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **Real-time Weather Forecasts**: Fetches weather data using OpenMeteo APIs based on the user’s location.
- **News Updates**: Displays the latest news articles related to the weather, leveraging NewsAPI.
- **Weather Summaries**: Generates weather summaries using OpenAI's Text-Davinci-003 model.
- **SMS Notifications**: Users can receive weather updates via SMS using Twilio integration.
- **Caching with Firebase**: Utilizes Google Firebase to cache weather data and news for faster load times.
- **Responsive Design**: Built using Material UI and Bootstrap for a user-friendly interface across devices.
- **Deployed on Heroku**: Accessible to users globally through Heroku's cloud platform.

## Tech Stack

### Frontend

- **ReactJS**: JavaScript library for building the user interface.
- **Axios**: For making HTTP requests to APIs.
- **Material UI**: UI framework for responsive components.
- **Bootstrap**: CSS framework for styling.

### Backend

- **Flask**: Micro web framework for Python, used to build the server.
- **Gunicorn**: WSGI HTTP server for running the Flask application.

### APIs and Libraries

- **OpenMeteo API**: For retrieving real-time weather data.
- **NewsAPI**: For fetching news articles related to the weather.
- **Twilio API**: For sending SMS notifications.
- **OpenAI**: Text-Davinci-003 model for generating weather summaries.

### Databases and Storage

- **Google Firebase**: Used for caching weather data and news articles.

### Deployment

- **Heroku**: Cloud platform used for deploying the application.

## Architecture

The Weather Dashboard follows a modern web application architecture:

- **Frontend**: Built with ReactJS, the frontend communicates with the backend via RESTful APIs. Axios is used to send requests and handle responses. The frontend is responsive and styled using Material UI and Bootstrap.
  
- **Backend**: The Flask server handles API requests from the frontend, processes data, and communicates with external APIs like OpenMeteo, NewsAPI, and Twilio. Firebase is used to store cached data to enhance performance.

- **APIs**: External APIs are integrated for weather data, news, and SMS functionality. The server also uses OpenAI's model to generate dynamic content.

- **Deployment**: The entire application is deployed on Heroku, ensuring that it is accessible to users around the globe.

## Installation

### Prerequisites

Ensure you have the following installed on your local machine:

- **Node.js**: v14.x or later
- **Python**: v3.8 or later
- **npm**: v6.x or later
- **Heroku CLI**: For deploying to Heroku

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/weather-dashboard.git
   cd weather-dashboard
   ```

2. **Set up the frontend**:
   ```bash
   cd frontend
   npm install
   npm run build
   cd ..
   ```

3. **Set up the backend**:
   - Create a virtual environment:
     ```bash
     python -m venv env
     source env/bin/activate   # On Windows: .\env\Scripts\activate
     ```
   - Install the dependencies:
     ```bash
     pip install -r requirements.txt
     ```

4. **Set up environment variables**:
   - Create a `.env` file in the root directory and add the following:
     ```
     FLASK_TWILIO_ACCOUNT_SID=your_twilio_account_sid
     FLASK_TWILIO_AUTH_TOKEN=your_twilio_auth_token
     FLASK_TWILIO_PHONE_NUMBER=your_twilio_phone_number
     FLASK_MAPBOX_TOKEN=your_mapbox_token
     FLASK_NEWS_API_KEY=your_news_api_key
     ```

5. **Run the application locally**:
   ```bash
   flask run
   ```

## Usage

- Navigate to `http://localhost:5000` in your browser to access the Weather Dashboard.
- Use the search bar to find weather updates for different locations.
- Subscribe to SMS notifications to receive updates directly on your phone.
- Check the dashboard for the latest weather-related news.

## APIs Used

- **OpenMeteo API**: Provides weather data including temperature, humidity, wind speed, etc.
- **NewsAPI**: Fetches news articles based on the user's location.
- **Twilio API**: Sends SMS notifications to users about weather updates.
- **OpenAI API**: Generates dynamic weather summaries.

## Firebase Integration

The application uses Google Firebase for caching data. When a user searches for a location, the weather and news data is fetched and stored in Firebase. If the same location is searched again, the data is quickly retrieved from Firebase, significantly improving the performance.

## Twilio Integration

The Twilio API is integrated to send SMS notifications. Users can opt-in to receive weather updates directly on their phones. The SMS feature is useful for receiving alerts when severe weather conditions are detected.

## OpenAI Integration

OpenAI's Text-Davinci-003 model is used to generate detailed weather summaries. This feature adds a personalized touch to the weather reports, making them more engaging and informative for users.

## Deployment

The application is deployed on Heroku. To deploy your own instance:

1. **Login to Heroku**:
   ```bash
   heroku login
   ```

2. **Create a new Heroku app**:
   ```bash
   heroku create your-app-name
   ```

3. **Deploy the application**:
   ```bash
   git push heroku master
   ```

4. **Open the deployed application**:
   ```bash
   heroku open
   ```

## Contributing

Contributions are welcome! If you have any ideas or improvements, please feel free to submit a pull request. Make sure to follow the project's coding standards and include detailed information about your changes.

## License

This project is licensed under the MIT License.

## Contact

For any questions or feedback, please reach out to:

- **Imaduddin Sheikh**
- **Email**: imaduddin.sheikh92@gmail.com
- **GitHub**: [https://github.com/isheikh8492](https://github.com/isheikh8492)
