<template>
    <div class="container">
        <h1 class="text-center text-info">Weather By Moods</h1>
        <h4 class="text-center text-info">Time: {{ tarih.time }}</h4>

        <!-- Component: 1 -->
        <div class="row">
            <div class="col col-md-4 m-auto">
                <HourData></HourData>
                <TemperatureData></TemperatureData>
            </div>
        </div>

        <!-- <div class="cards m-auto">{{ temperatureData[tarih.hours] }}</div> -->

        <!-- Component: 2  ve bu kısım döngüye alınıp düzenlenecek -->
        <MoodList></MoodList>
    </div>
</template>

<script>
import axios from "axios";
import HourData from "./HourData.vue";
import TemperatureData from "./TemperatureData.vue";
import MoodList from "./MoodList.vue";

export default {
    components: {
        HourData,
        TemperatureData,
        MoodList,
    },
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
            moodToTemperature: [
                { heat: (0, 1, 2, 3, 4, 5), mood: "sick" },
                { heat: 5 - 10, mood: "depressed" },
                { heat: 15 - 20, mood: "low" },
                { heat: 20 - 25, mood: "cheerful" },
                { heat: 25 - 30, mood: "joyful" },
                { heat: 30 - 35, mood: "bored" },
                { heat: 35, mood: "angry" },
            ],
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
.cards {
    border: 1px solid rebeccapurple;
    transition: all 0.5s ease;
    margin: 20px;
}
.cards:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    transition: all 0.5s ease;
}
.mood {
    font-size: 1.5rem;
    font-weight: bold;
    color: rebeccapurple;
}
.imge {
    border: 1px solid salmon;
    border-radius: 10px;
}
</style>

