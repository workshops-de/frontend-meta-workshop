$(function () {
  // API KEY
  const API_KEY = 'a624eba90a17930f04a258f921f06bff';

  const $cards = {
    initial: $('#initial'),
    loading: $('#loading'),
    widget: $('#widget'),
  };

  const $ui = {
    temp: $('#temp'),
    icon: $('#icon'),
    desc: $('#desc'),
    city: $('#city'),
    wind: $('#wind'),
    time: $('#time'),
    humidity: $('#humidity'),
    cloudiness: $('#cloudiness'),
    sunrise: $('#sunrise'),
    sunset: $('#sunset'),
  };

  // Functions
  function updateUI(weather, forecast) {
    setWeather(weather);
    setForecast(forecast);

    $cards.loading.hide();
    $cards.widget.fadeIn();
  }

  function setWeather(weather) {
    $ui.temp.text(weather.temp.toFixed(0));
    $ui.icon.html(
      "<img src='http://openweathermap.org/img/wn/" +
        weather.icon +
        "@2x.png' />"
    );
    $ui.desc.text(weather.desc);
    $ui.city.text(weather.city);
    $ui.wind.text(weather.wind.toFixed(0) + ' km/h');
    $ui.time.text(moment().format('dddd, LT'));
    $ui.humidity.text(weather.humidity + ' %');
    $ui.cloudiness.text(weather.cloudiness + ' %');
    $ui.sunrise.text(weather.sunrise);
    $ui.sunset.text(weather.sunset);
  }

  function setForecast(forecast) {
    setForecastDay('#first-day', forecast[0]);
    setForecastDay('#second-day', forecast[1]);
    setForecastDay('#third-day', forecast[2]);
    setForecastDay('#forth-day', forecast[3]);
  }

  function setForecastDay(selector, forecast) {
    $(selector + ' > h3').text(forecast.weekDay);
    $(selector + ' > div').html(
      "<img src='http://openweathermap.org/img/wn/" +
        forecast.icon +
        "@2x.png' />"
    );
    $(selector + ' span')
      .eq(0)
      .text(forecast.max.toFixed(0));
    $(selector + ' span')
      .eq(1)
      .text(forecast.min.toFixed(0));
  }

  function fetchWeather(lat, long) {
    let weather = null;
    const forecast = [];
    fetch(
      'https://api.openweathermap.org/data/2.5/onecall?lat=' +
        lat +
        '&lon=' +
        long +
        '&units=metric&lang=de&APPID=' +
        API_KEY
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        weather = {
          city: '',
          temp: json.current.temp,
          desc: json.current.weather[0].description,
          icon: json.current.weather[0].icon,
          wind: json.current.wind_speed,
          humidity: json.current.humidity,
          cloudiness: json.current.clouds,
          sunrise: moment.unix(json.current.sunrise).format('LT'),
          sunset: moment.unix(json.current.sunset).format('LT'),
        };

        json.daily.forEach(function (weather) {
          if (forecast.length < 4) {
            forecast.push({
              weekDay: moment.unix(weather.dt).format('ddd'),
              max: weather.temp.max,
              min: weather.temp.min,
              icon: weather.weather[0].icon,
            });
          }
        });

        fetch(
          'https://nominatim.openstreetmap.org/reverse?format=json&lat=' +
            lat +
            '&lon=' +
            long +
            '&zoom=10&addressdetails=1'
        )
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            weather.city = data.address.town;
            updateUI(weather, forecast);
          });
      })
      .catch(handleRequestError);
  }

  function handleRequestError(error) {
    $cards.loading.hide();
    $cards.initial.text(error).show();
  }

  function error(err) {
    $cards.initial.text(`An error occured: ${err.message}`).show();
  }

  function success(position) {
    fetchWeather(position.coords.latitude, position.coords.longitude);
  }

  // init
  $cards.loading.hide();
  $cards.widget.hide();

  if (navigator.geolocation) {
    $cards.initial.hide();
    $cards.loading.show();
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    $cards.initial.text('Your Browser does not support the geolocation API.');
  }
});
