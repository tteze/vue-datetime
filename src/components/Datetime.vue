<template>
    <div class="datetime-container">
        <input :title="title" type="text" @focus="open = true" :value="current.format('DD/MM/Y')" />

        <div v-if="open" class="datetime-picker">
            <DayPicker v-if="window === 'daypicker'" v-model="current" @window="window = $event" @input="open = false" />
            <MonthPicker v-if="window === 'monthpicker'" v-model="current" @window="window = $event" />
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import DayPicker from './DayPicker'
import MonthPicker from './MonthPicker'

moment.locale('fr')

export default {
    name: 'Datetime',
    components: { MonthPicker, DayPicker },
    data: function () {
        return {
            open: false,
            current: moment(this.value),
            window: 'daypicker'
        }
    },
    props: {
        value: String,
        title: String
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
