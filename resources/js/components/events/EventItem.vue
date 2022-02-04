<template>
    <tr>
        <td>{{ event.id }}</td>
        <td>{{ event.title }}</td>
        <td>{{ event.description }}</td>
        <td>
            <button type="button"
                @click="$emit('remove', event.id)"
                class="btn btn-danger"
            >
                Delete</button>
        </td>
    </tr>
</template>

<script>

export default {
    props: {
        event: {
            type: Object,
            required: true,
        }
    },

}
</script>

<style scoped>
.input-field {
    margin-right: 10px;
}
.input-field input {
    border-bottom: none;
}
</style>
