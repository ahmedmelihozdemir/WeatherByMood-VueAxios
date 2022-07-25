import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
  state: {
    temperatureData: {},
    hourData: {},
  },
  getters: {
    getTemperatureData(state) {
      return state.temperatureData;
    },
    getHourData(state){
      return state.hourData;
    }
  },
  mutations: {
    setData(state, payload) {
      state.temperatureData = payload.temperatureData;
      state.hourData = payload.hourData;
      parseInt(state.temperatureData[new Date().getHours()]);
    },
  },
  actions: {
    addData({ commit }) {
      axios
        .get(
          "https://api.open-meteo.com/v1/forecast?latitude=36.88&longitude=30.70&hourly=temperature_2m"
        )
        .then((response) => {
          var temperatureData = response.data.hourly.temperature_2m;
          var hourData = response.data.hourly.time;
          commit("setData", { temperatureData, hourData });
        });
    },
  },
})


export default store;

