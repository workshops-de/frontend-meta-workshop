<template>
  <section class="weather">
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col col-6 text-center h1" v-if="state.error">
          {{ state.error }}
        </div>
        <div class="col col-6 text-center" v-else-if="state.loading">
          <div class="spinner-grow" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
        <div class="col col-6" v-else>
          <div class="card mx-auto mb-3">
            <!-- HEADER -->
            <h4 class="card-header bg-dark text-light text-left">
              <span>{{ state.weather.city }}</span>
              <span class="weather__time">{{ state.time }}</span>
            </h4>

            <!-- TODAYS DATA -->
            <div class="card-body bg-primary text-dark">
              <WeatherInfo :weather="state.weather" />
            </div>

            <!-- FORECAST -->
            <div class="card-footer d-flex ml-0 text-center bg-dark">
              <WeatherForecast
                v-for="forecast in state.forecast"
                :key="forecast.weekDay"
                v-bind="forecast"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from 'vue';
import moment from 'moment';
import { WeatherResponse, WeatherState } from '@/interfaces/weather';
import WeatherForecast from '@/components/WeatherForecast.vue';
import WeatherInfo from '@/components/WeatherInfo.vue';
import { useStore } from 'vuex';

moment.locale('de');

export default defineComponent({
  name: 'Weather',
  components: {
    WeatherInfo,
    WeatherForecast,
  },
  setup() {
    // API KEY
    const API_KEY = 'a624eba90a17930f04a258f921f06bff';

    const store = useStore();

    const state = reactive<WeatherState>({
      loading: false,
      error: '',
      weather: computed({
        get() {
          return store.state.weather.data;
        },
        set(data) {
          store.dispatch('SET_WEATHER', {
            data,
          });
        },
      }),
      forecast: computed({
        get() {
          return store.state.weather.forecast;
        },
        set(forecast) {
          store.dispatch('SET_WEATHER', {
            forecast,
          });
        },
      }),
      time: computed({
        get() {
          return store.state.weather.time;
        },
        set(time) {
          store.dispatch('SET_WEATHER', {
            time,
          });
        },
      }),
    });

    function handleRequestError(error: string) {
      state.loading = false;
      state.error = error;
    }

    async function fetchWeather(lat: number, long: number) {
      try {
        const fetchedData = await fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat.toString()}&lon=${long.toString()}&units=metric&lang=de&APPID=${API_KEY}`,
        );
        const json: WeatherResponse = await fetchedData.json();

        state.weather = {
          city: '',
          temp: json.current.temp.toFixed(0),
          desc: json.current.weather[0].description,
          icon: json.current.weather[0].icon,
          wind: json.current.wind_speed,
          humidity: json.current.humidity,
          cloudiness: json.current.clouds,
          sunrise: moment.unix(json.current.sunrise).format('LT'),
          sunset: moment.unix(json.current.sunset).format('LT'),
        };

        state.forecast = [];
        json.daily.forEach(function(weather) {
          if (state.forecast.length < 4) {
            state.forecast = [
              ...state.forecast,
              {
                weekDay: moment.unix(weather.dt).format('ddd'),
                max: weather.temp.max.toFixed(0),
                min: weather.temp.min.toFixed(0),
                icon: weather.weather[0].icon,
              },
            ];
          }
        });

        state.time = moment().format('dddd, LT');
      } catch (e) {
        handleRequestError(e);
      }
    }

    async function fetchCityName(lat: number, long: number) {
      const fetchedData = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${long}&zoom=10&addressdetails=1`,
      );
      const json = await fetchedData.json();
      state.weather = {
        ...state.weather,
        city: json?.address?.town,
      };
    }

    async function success({ coords: { latitude, longitude } }: Position) {
      await fetchWeather(latitude, longitude);
      await fetchCityName(latitude, longitude);
      state.loading = false;
    }

    function error({ message }: PositionError) {
      state.error = `An error occured: ${message}`;
    }

    if (navigator.geolocation) {
      state.error = '';
      state.loading = true;
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      state.error = 'Your Browser does not support the geolocation API.';
    }

    return {
      state,
    };
  },
});
</script>

<style lang="scss">
.weather {
  &__time {
    float: right;
    font-size: 22px;
  }

  &__data-tables {
    font-size: 20px;
    display: flex;
    flex-direction: column;
  }

  &__loading .spinner-grow {
    width: 3rem;
    height: 3rem;
  }
}
</style>
