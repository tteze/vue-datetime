<template>
    <div class="monthpicker">
        <div
            class="datetime-current"
            @click="$emit('window', 'yearpicker')"
        >
            {{ value.format('Y') }}
        </div>

        <table class="datetime-pick-container">
            <tr
                v-for="(line, key) in monthsInYear"
                :key="key"
            >
                <td
                    v-for="month in line"
                    :key="month.toString()"
                    class="datetime-to-pick"
                    @click="pick(month)"
                >
                    {{ month.format('MMM') }}
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
    export default {
        name: 'MonthPicker',

        props: {
            value: {type: Object, required: true}
        },

        computed: {
            /**
             * Get all months in Year
             * @return Array
             */
            monthsInYear: function () {
                let months = []
                let month = this.value.clone().startOf('year')
                for (let i = 0; i < 12;) {
                    let line = []

                    for (let j = 0; j < 4; j++, i++, month.add(1, 'M')) {
                        line.push(month.clone())
                    }

                    months.push(line)
                }

                return months
            }
        },

        methods: {
            /**
             * Pick a month
             * @param month Object
             */
            pick: function (month) {
                this.$emit('input', this.value.clone().month(month.month()))
                this.$emit('window', 'daypicker')
            }
        }
    }
</script>

<style scoped>
    table {
        width: 100%;
    }
    td {
        text-align: left;
    }
</style>
