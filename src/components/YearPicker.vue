<template>
    <div class="yearpicker">
        <div>
            <button @click="position = position.clone().subtract(9, 'Y')">Précédent</button>
            <button @click="position = position.clone().add(9, 'Y')">Suivant</button>
        </div>

        <table>
            <tr v-for="(line, key) in years" :key="key">
                <td v-for="year in line" :key="year.toString()" @click="pick(year)">
                    {{ year.format('YYYY') }}
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    name: 'YearPicker',

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
        years: function () {
            let years = []
            let year = this.position.clone().subtract(4, 'Y')
            for (let i = 0; i < 9;) {
                let line = []

                for (let j = 0; j < 3; j++, i++, year.add(1, 'Y')) {
                    line.push(year.clone())
                }

                years.push(line)
            }

            return years
        }
    },

    methods: {
        pick: function (year) {
            this.$emit('input', this.value.clone().year(year.year()))
            this.$emit('window', 'monthpicker')
        }
    }
}
</script>

<style scoped>
    table {
        width: 100%;
    }

    td {
        text-align: center;
    }
</style>
