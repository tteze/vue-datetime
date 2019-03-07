<template>
    <div class="daypicker">
        <div @click="$emit('window', 'monthpicker')">
            {{ position.format('MMMM Y') }}
        </div>

        <div>
            <button @click="position = position.clone().subtract(1, 'M')">
                Précédent
            </button>

            <button @click="position = position.clone().add(1, 'M')">
                Suivant
            </button>
        </div>

        <br><br>

        <table>
            <tr
                v-for="(week, key) in daysInMonths"
                :key="key"
            >
                <td
                    v-for="day in week"
                    :key="day.toString()"
                    :class="{ out: day < startOfMonth || day > endOfMonth }"
                    @click="pick(day)"
                >
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
            value: {type: Object, required: true}
        },

        data: function () {
            return {
                position: this.value.clone()
            }
        },

        computed: {
            /**
             * Create a tab with days of month
             * @return Array
             */
            daysInMonths: function () {
                let days = []
                let begin = this.startOfMonth.clone().startOf('week')

                for (let i = begin.clone(), j = 0; j < 6; i = i.add(1, 'w'), j++) {
                    days.push(this.daysInWeek(i))
                }

                return days
            },

            /**
             * Return the start of month
             * @return Object
             */
            startOfMonth: function () {
                return this.position.clone().startOf('month')
            },

            /**
             * Return the end of month
             * @return Object
             */
            endOfMonth: function () {
                return this.position.clone().endOf('month')
            }
        },

        watch: {
            /**
             * Update position when value change
             */
            value: function () {
                this.position = this.value.clone()
            }
        },

        methods: {
            /**
             * Get the days in a week
             * @return Array
             */
            daysInWeek: function (day) {
                let week = []

                for (let i = day.clone().startOf('week'); i < day.clone().endOf('week'); i = i.add(1, 'd')) {
                    week.push(i.clone())
                }

                return week
            },

            /**
             * Pick a day
             * @param day Object
             */
            pick: function (day) {
                this.$emit('input', this.value.clone().set({
                    year: day.years(),
                    month: day.months(),
                    day: day.days(),
                }))

                this.$emit('window', 'timepicker')
            }
        }
    }
</script>

<style scoped>
    .out {
        color: #bbb;
    }
</style>
