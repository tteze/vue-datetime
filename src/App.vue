<template>
    <div id="app">
        <Datetime />
    </div>
</template>

<script>
    import Datetime from './components/Datetime'

    export default {
        name: 'App',
        components: {
            Datetime
        }
    }
</script>

<style lang="scss">
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        padding: 200px;
    }
</style>
