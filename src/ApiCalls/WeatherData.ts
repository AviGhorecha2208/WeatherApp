import APICall from '../Network/ApiCall';
import { MeteoUrl } from '../Utils/Const';

export interface WeatherResponseDaily {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_sum: number[];
  windspeed_10m_max: number[];
}
export interface WeatherResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  daily_units: {
    time: string;
    temperature_2m_max: string;
    temperature_2m_min: string;
    precipitation_sum: string;
    windspeed_10m_max: string;
  };
  daily: WeatherResponseDaily;
}

const FetchWeatherData = async (
  latitude: number,
  longitude: number,
): Promise<WeatherResponse | null> => {
  try {
    const response = await APICall<WeatherResponse>({
      method: 'get',
      url: MeteoUrl,
      payload: {
        latitude,
        longitude,
        daily: 'temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max',
        timezone: 'auto',
      },
    });
    console.log('getDailyWeatherData response', response);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
};

export { FetchWeatherData };
