<template>
    <div class="container">
        <!-- <h6>This Component is Hour Data</h6> -->
        <div
            class="weather"
            v-for="(hour, index) in hourData"
            :key="index"
            :value="index"
        >
            <div class="weather-data text-info" v-if="index === tarih.hours">
                <span>{{ hour }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            heats: 5,
            temperatureData: [],
            hourData: null,
            tarih: {
                date: new Date(),
                month: new Date().getMonth(),
                day: new Date().getDate(),
                hours: new Date().getHours(),
                minute: new Date().getMinutes(),
                second: new Date().getSeconds(),
                time: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
            },
        };
    },
    created() {
        axios
            .get(
                "https://api.open-meteo.com/v1/forecast?latitude=36.88&longitude=30.70&hourly=temperature_2m"
            )
            .then((response) => {
                this.temperatureData = response.data.hourly.temperature_2m;
                this.hourData = response.data.hourly.time;
                console.log(parseInt(this.temperatureData[this.tarih.hours]));
                return parseInt(this.temperatureData[this.tarih.hours]);
            });
    },

    methods: {
        getMood() {
            let mood = this.moodToTemperature.find(
                (mood) => mood.heat <= this.temperatureData[this.tarih.hours]
            );
            return mood.mood;
        },
        toNumber() {
            return parseInt(this.temperatureData[this.tarih.hours]);
        },
    },
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
