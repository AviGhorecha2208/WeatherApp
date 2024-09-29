# Weather App

This React Native application provides real-time weather information for cities around the world.

## Features

- Display current weather conditions
- Search for weather by city name
- Show temperature, humidity, wind speed, and more
- Clean and intuitive user interface

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- React Native CLI
- Xcode (for iOS development)
- Android Studio (for Android development)

### Installation

1. Install dependencies:

   ```
   yarn install
   ```

2. Run the application:

   ```
   yarn start
   ```

## Project Structure

- `src/`: Source code directory
  - `Screens/`: Contains all the screen components
  - `Navigation/`: Navigation setup and configuration
  - `Store/`: Redux store setup and slices
  - `ApiCalls/`: API call functions
  - `Hooks/`: Custom React hooks
  - `Assets/`: Static assets like images

## Acknowledgments

- Weather data provided by [Meteo](https://open-meteo.com/)
- City Data provided by [nominatim](https://nominatim.openstreetmap.org/)
- Icons by react-native-vector-icons
