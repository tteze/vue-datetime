<template>
    <div class="monthpicker">
        <div>{{ value.format('Y') }}</div>

        <table>
            <tr v-for="(line, key) in monthsInYear" :key="key">
                <td v-for="month in line" :key="month.toString()" @click="pick(month)">
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
        value: Object
    },
    computed: {
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
