<template>
    <div v-if="events.length > 0" class="mt">
        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Actions</th>
            </tr>
            </thead>

            <tbody>
            <event-item
                v-for="event in events"
                :key="event.id"
                :event="event"
                @remove="$emit('remove', event.id)"
            >

            </event-item>
            </tbody>
        </table>
    </div>
    <h5 v-else>Список подій пустий!</h5>
    <br><br>
</template>

<script>
import EventItem from './EventItem';

export default {
    components: {
      EventItem
    },
    props: {
        events: {
            type: Array,
            required: true
        }
    },



}
</script>

<style scoped>

</style>
