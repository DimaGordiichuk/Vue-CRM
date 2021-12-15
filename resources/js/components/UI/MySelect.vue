<template>
    <select class="select-filter" @change="changeOption" v-model="modelValue">
        <option disabled value="">Виберіть із списка</option>
        <option
            v-for="option in options"
            :key="option.value"
            :value="option.value"
        >
            {{ option.name }}
        </option>
    </select>
</template>

<script>
export default {
    name: 'my-select',
    props: {
        modelValue: {
            type: String
        },
        options: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        changeOption(event) {
            this.$emit('update:modelValue', event.target.value)
        }
    }
}
</script>

<style scoped>
    .select-filter {
        display: block;
        max-width: 300px;
    }
</style>
