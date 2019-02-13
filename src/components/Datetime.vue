<template>
    <div class="datetime-container" ref="container">
        <input :title="title" type="text" @focus="open" :value="current.format('DD/MM/Y')" />

        <div v-if="opened" class="datetime-picker">
            <DayPicker v-if="window === 'daypicker'" v-model="current" @window="window = $event" @input="opened = false" />
            <MonthPicker v-if="window === 'monthpicker'" v-model="current" @window="window = $event" />
            <YearPicker v-if="window === 'yearpicker'" v-model="current" @window="window = $event" />
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import DayPicker from './DayPicker'
import MonthPicker from './MonthPicker'
import YearPicker from './YearPicker'

moment.locale('fr')

export default {
    name: 'Datetime',

    components: { YearPicker, MonthPicker, DayPicker },

    data: function () {
        return {
            opened: false,
            current: moment(this.value),
            window: 'daypicker'
        }
    },

    props: {
        value: String,
        title: String
    },

    methods: {
        clickOut: function (event) {
            if (event.target !== null && event.target.closest('.datetime-container') !== this.$refs.container) {
                this.opened = false
            }
        },

        open: function () {
            this.opened = true
            this.window = 'daypicker'
        }
    },

    /**
     * Met en place un écouteur pour écouter un click out
     */
    mounted: function () {
        document.addEventListener('click', this.clickOut)
    },

    /**
     * Supprime l'écouteur avant de détruire l'objet
     */
    beforeDestroy: function () {
        document.removeEventListener('click', this.clickOut)
    }
}
</script>

<style lang="scss" scoped>
    .datetime-container {
        position: relative;
        width: 200px;
        display: inline-block;

        .datetime-picker {
            margin-top: 5px;
            margin-left: 10px;
            position: absolute;
            width: 100%;
            border: 1px solid #ddd;
        }
    }
</style>
