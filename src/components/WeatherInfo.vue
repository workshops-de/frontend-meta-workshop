<template>
  <div class="row weather-info">
    <div class="col-7 text-center">
      <p class="weather-info__desc">{{ weather.desc }}</p>
      <div class="row py-24 justify-content-center">
        <div class="col-auto">
          <i class="weather-info__icon">
            <img :src="weatherIcon" alt="weather icon" />
          </i>
        </div>
        <div class="col-auto">
          <p class="weather-info__temp">{{ weather.temp }}</p>
          <p class="weather-info__degree">°C</p>
        </div>
      </div>
    </div>
    <div class="col-5 data-tables">
      <table class="text-center">
        <tr>
          <td class="text-left">Wind: {{ weather.wind }} km/h</td>
        </tr>
        <tr>
          <td class="text-left">Humidity: {{ weather.humidity }} %</td>
        </tr>
        <tr>
          <td class="text-left pb-3">Cloudiness: {{ weather.cloudiness }} %</td>
        </tr>
        <tr>
          <td class="text-left">Sunrise: {{ weather.sunrise }}</td>
        </tr>
        <tr>
          <td class="text-left">Sunset: {{ weather.sunset }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  props: {
    weather: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const weatherIcon = computed(
      () => `http://openweathermap.org/img/wn/${props.weather.icon}@2x.png`,
    );

    return {
      weatherIcon,
    };
  },
});
</script>

<style lang="scss">
.weather-info {
  &__degree {
    display: inline-block;
    vertical-align: top;
    font-size: 24px;
    margin-top: 12px;
  }

  &__desc {
    text-transform: capitalize;
    font-size: 20px;
  }

  &__icon {
    font-size: 72px;
    margin-right: 12px;
    float: right;
    line-height: 86px;
  }

  &__temp {
    display: inline;
    font-size: 72px;
  }
}
</style>
