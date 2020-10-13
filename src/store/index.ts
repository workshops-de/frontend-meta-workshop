import { Weather, Forecast } from './../interfaces/weather';
import { Note } from './../interfaces/notes';
import { createStore } from 'vuex';

interface WeatherState {
  data: Weather;
  forecast: Forecast[];
  time: string;
}

interface GlobalState {
  notes: Note[];
  selfie: string;
  weather: WeatherState;
}

const getDefaultState = () => ({
  notes: [],
  selfie: '',
  weather: {
    data: {
      city: '',
      temp: '',
      desc: '',
      icon: '',
      wind: 0,
      humidity: 0,
      cloudiness: 0,
      sunrise: '',
      sunset: '',
    },
    forecast: [],
    time: '',
  },
});

const getState = () => {
  const savedData = localStorage.getItem('app');
  if (savedData) {
    return JSON.parse(savedData);
  } else {
    return getDefaultState();
  }
};

export default createStore<GlobalState>({
  state: getState(),
  mutations: {
    SET_NOTES(state, notes: Note[]) {
      state.notes = [...notes];
    },
    SET_SELFIE(state, payload) {
      state.selfie = payload;
    },
    SET_WEATHER(state, payload) {
      state.weather = {
        ...state.weather,
        ...payload,
      };
    },
    PERSIST_DATA(state) {
      localStorage.setItem('app', JSON.stringify(state));
    },
  },
  actions: {
    SET_NOTES({ commit }, payload: Note[]) {
      commit('SET_NOTES', payload);
      commit('PERSIST_DATA');
    },
    SET_SELFIE({ commit }, payload) {
      commit('SET_SELFIE', payload);
      commit('PERSIST_DATA');
    },
    SET_WEATHER({ commit }, payload: Weather) {
      commit('SET_WEATHER', payload);
      commit('PERSIST_DATA');
    },
  },
});
