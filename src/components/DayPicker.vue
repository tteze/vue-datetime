<template>
    <div class="daypicker">
        <div @click="$emit('window', 'monthpicker')">{{ position.format('MMMM Y') }}</div>

        <div>
            <button @click="position = position.clone().subtract(1, 'M')">Précédent</button>
            <button @click="position = position.clone().add(1, 'M')">Suivant</button>
        </div>

        <br><br>

        <table>
            <tr v-for="(week, key) in daysInMonths" :key="key">
                <td v-for="day in week" :key="day.toString()" @click="$emit('input', day.clone())"
                    :class="{ out: day < startOfMonth  || day > endOfMonth}">
                    {{ day.format('DD') }}
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    name: 'DayPicker',

    props: {
        value: Object
    },

    data: function () {
        return {
            position: this.value.clone()
        }
    },

    watch: {
        value: function () {
            this.position = this.value.clone()
        }
    },

    computed: {
        daysInMonths: function () {
            let days = []
            let begin = this.startOfMonth.clone().startOf('week')

            for (let i = begin.clone(), j = 0; j < 6; i = i.add(1, 'w'), j++) {
                days.push(this.daysInWeek(i))
            }

            return days
        },

        startOfMonth: function () {
            return this.position.clone().startOf('month')
        },

        endOfMonth: function () {
            return this.position.clone().endOf('month')
        }
    },

    methods: {
        daysInWeek: function (day) {
            let week = []

            for (let i = day.clone().startOf('week'); i < day.clone().endOf('week'); i = i.add(1, 'd')) {
                week.push(i.clone())
            }

            return week
        }
    }
}
</script>

<style scoped>
    .out {
        color: #bbb;
    }
</style>
