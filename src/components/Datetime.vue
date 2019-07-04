<template>
    <div
        ref="container"
        class="datetime-container"
    >
        <input
            :title="title"
            type="text"
            :value="current.format('DD/MM/Y HH:mm:ss')"
            readonly
            @focus="open"
        >

        <div
            v-if="opened"
            class="datetime-picker"
        >
            <TimePicker
                v-if="window === 'timepicker'"
                v-model="current"
                @window="window = $event"
                @close="opened = false"
            />

            <DayPicker
                v-if="window === 'daypicker'"
                v-model="current"
                @window="window = $event"
            />

            <MonthPicker
                v-if="window === 'monthpicker'"
                v-model="current"
                @window="window = $event"
            />

            <YearPicker
                v-if="window === 'yearpicker'"
                v-model="current"
                @window="window = $event"
            />
        </div>
    </div>
</template>

<script>
    import moment from 'moment'
    import DayPicker from './DayPicker'
    import MonthPicker from './MonthPicker'
    import YearPicker from './YearPicker'
    import TimePicker from './TimePicker'

    moment.locale('fr')

    export default {
        name: 'Datetime',

        components: { TimePicker, YearPicker, MonthPicker, DayPicker },

        props: {
            value: {type: Object, required: true},
            title: {type: String, default: null},
        },

        data: function () {
            return {
                opened: false,
                current: moment(this.value),
                window: 'daypicker'
            }
        },

        /**
         * Listen for clickOut
         */
        mounted: function () {
            document.addEventListener('click', this.clickOut)
        },

        /**
         * Remove listener before destroy
         */
        beforeDestroy: function () {
            document.removeEventListener('click', this.clickOut)
        },

        methods: {
            /**
             * Close the picker when clickOut
             */
            clickOut: function (event) {
                if (event.target !== null && event.target.closest('.datetime-container') !== this.$refs.container) {
                    this.opened = false
                }
            },

            /**
             * Open the picker
             */
            open: function () {
                this.opened = true
                this.window = 'daypicker'
            }
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
            margin-left: 0;
            padding: 5px;
            position: absolute;
            width: 100%;
            border: 1px solid #ddd;
        }
    }
</style>

<style lang="scss">
    .datetime-to-pick, .datetime-current {
        cursor: pointer;
        transition: all .1s;

        &:hover {
            transform: scale(1.1);
        }
    }

    .datetime-next, .datetime-back {
        background-color: #fff;
        border: 1px solid #ddd;
        margin: 5px;
        cursor: pointer;
        border-radius: 5px;
        padding: 5px 10px;

        &:hover {
            background-color: #eee;
        }
    }

    .datetime-pick-container {
        margin: 0 auto;
    }
</style>
