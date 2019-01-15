<template>
    <div class="datetime-container">
        <input :title="title" type="text" @focus="open = true" />
        <div v-if="open" class="datetime-picker">
            {{ current.format('MMMM Y') }}
            <br>
            <br>
            <table>
                <tr v-for="(week, key) in daysInMonths" :key="key">
                    <td v-for="day in week" :key="day.toString()" @click="current = day.clone()">
                        {{ day.format('DD') }}
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import moment from 'moment'

export default {
    name: 'Datetime',
    data: function () {
        return {
            open: false,
            current: moment(this.value)
        }
    },
    props: {
        value: String,
        title: String
    },
    computed: {
        daysInMonths: function () {
            let days = []
            let begin = this.startOfMonth.clone().startOf('week')
            let end = this.endOfMonth.clone().endOf('week')
            for (let i = begin.clone(); i < end; i = i.add(1, 'w')) {
                let week = []
                for (let j = i.clone(); j < end && j < i.clone().endOf('week'); j = j.add(1, 'd')) {
                    week.push(j.clone())
                }
                days.push(week)
            }
            return days
        },
        startOfMonth: function () {
            return this.current.clone().startOf('month')
        },
        endOfMonth: function () {
            return this.current.clone().endOf('month')
        }
    },
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
