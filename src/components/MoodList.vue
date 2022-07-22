<template>
    <div class="container ">
      <!-- <h6>This Component is Mood List</h6> -->
      <div class="row">
        <div class="cards col col-md-4 m-auto" v-if="0 < temperatureData[tarih.hours] && temperatureData[tarih.hours] <= 5">
            <div class="mood">Sick</div>
            <img class="imge mb-4" src="https://picsum.photos/id/326/200/300" alt="" />
        </div>
        <div class="cards col col-md-4 m-auto" v-if="5 < temperatureData[tarih.hours] && temperatureData[tarih.hours] <= 10">
            <div class="mood">Depressed</div>
            <img class="imge mb-4" src="https://picsum.photos/id/22/200/300" alt="" />
        </div>
        <div class="cards col col-md-4 m-auto" v-if="10 < temperatureData[tarih.hours] && temperatureData[tarih.hours] <= 15">
            <div class="mood">Low</div>
            <img class="imge mb-4" src="https://picsum.photos/id/220/200/300" alt="" />
        </div>
        <div class="cards col col-md-4 m-auto" v-if="15 < temperatureData[tarih.hours] && temperatureData[tarih.hours] <= 20">
            <div class="mood">Cheerful</div>
            <img class="imge mb-4" src="https://picsum.photos/id/129/200/300" alt="" />
        </div>
        <div class="cards col col-md-4 m-auto" v-if="20 < temperatureData[tarih.hours] && temperatureData[tarih.hours] <= 25">
            <div class="mood">Joyful</div>
            <img class="imge mb-4" src="https://picsum.photos/id/308/200/300" alt="" />
        </div>
        <div class="cards col col-md-4 m-auto" v-if="25 < temperatureData[tarih.hours] && temperatureData[tarih.hours] <= 30">
            <div class="mood">Joyful</div>
            <img class="imge mb-4" src="https://picsum.photos/id/297/200/300" alt="" />
        </div>
        <div class="cards col col-md-4 m-auto" v-if="30 < temperatureData[tarih.hours] && temperatureData[tarih.hours] <= 35">
            <div class="mood">Bored</div>
            <img class="imge mb-4" src="https://picsum.photos/id/680/200/300" alt="" />
        </div>
        <div class="cards col col-md-4 m-auto" v-if="temperatureData[tarih.hours] > 35">
            <div class="mood">Angry</div>
            <img class="imge mb-4" src="https://picsum.photos/id/719/200/300" alt="" />
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
                /* console.log(response.data.hourly.temperature_2m[0]);
                console.log(response.data.hourly.time[0]); 
                console.log(this.hourData);
                console.log(this.temperatureData); */
                console.log(parseInt(this.temperatureData[this.tarih.hours]));
                return parseInt(this.temperatureData[this.tarih.hours]);
                /* return Number(this.temperatureData[this.tarih.hours]); */
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
