<template>
    <div class="container">
        <MainComponent></MainComponent>
    </div>
</template>

<script>

import MainComponent from "./components/MainComponent.vue";

export default {
    components: {
        MainComponent,
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
