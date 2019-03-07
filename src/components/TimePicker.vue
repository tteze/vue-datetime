<template>
    <div>
        <input
            ref="hours"
            v-model="hours"
            class="time-picker-input"
            type="number"
            min="0"
            max="23"
            @input="pick('hour', $event.target.value, 23)"
        />

        <input
            v-model="minutes"
            class="time-picker-input"
            type="number"
            min="0"
            max="59"
            @input="pick('minute', $event.target.value, 59)"
        />

        <input
            v-model="seconds"
            class="time-picker-input"
            type="number"
            min="0"
            max="59"
            @input="pick('second', $event.target.value, 59)"
        />

        <button @click="$emit('close')">
            Ok
        </button>
    </div>
</template>

<script>
    export default {
        name: 'TimePicker',

        props: {
            value: {type: Object, required: true}
        },

        data: function () {
            return {
                hours: this.value.hours(),
                minutes: this.value.minutes(),
                seconds: this.value.seconds(),
            }
        },

        mounted: function () {
            this.$refs.hours.focus()
            this.$refs.hours.select()
        },

        methods: {
            pick: function (type, value, max) {
                if (value >= 0 && value <= max) {
                    this.$emit('input', this.value.clone().set(type, value))
                }
            }
        }
    }
</script>

<style scoped>
    .time-picker-input {
        width: 40px;
        margin: 5px;
        display: inline-block;
    }
</style>
