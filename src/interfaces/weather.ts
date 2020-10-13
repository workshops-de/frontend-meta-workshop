import { WritableComputedRef } from 'vue';

export interface WeatherResponse {
  current: {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    weather: WeatherInfo[];
  };
  daily: DailyWeather[];
}

export interface DailyWeather {
  dt: number;
  temp: {
    min: number;
    max: number;
  };
  weather: WeatherInfo[];
}

export interface WeatherInfo {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Forecast {
  weekDay: string;
  max: string;
  min: string;
  icon: string;
}

export interface Weather {
  city: string;
  temp: string;
  desc: string;
  icon: string;
  wind: number;
  humidity: number;
  cloudiness: number;
  sunrise: string;
  sunset: string;
}

export interface WeatherState {
  loading: boolean;
  error: string;
  weather: WritableComputedRef<Weather>;
  forecast: WritableComputedRef<Forecast[]>;
  time: WritableComputedRef<string>;
}
