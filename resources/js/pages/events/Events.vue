<template>
    <div class="section no-pad-bot">
        <div class="container">
            <br><br>
            <h1 class="header center orange-text">Події</h1>
            <div class="row center">
                <h5 class="header col s12 light">A modern responsive front-end framework based on Material Design</h5>
            </div>
            <div class="btn-group">
                <router-link :to="{ name: 'events.create' }" class="btn add-default">Добавити подію</router-link>
            </div>
            <events-list
                :events="events"
                @remove="removeEvent"
            >

            </events-list>

        </div>
    </div>

</template>
<script>
import useEvents from '../../composables/events';
import EventsList from '../../components/events/EventsList';
import {onMounted, reactive} from 'vue';

export default {
    components: {
      EventsList
    },
    setup() {
        const { events, getEvents, destroyEvent } = useEvents()

        onMounted(getEvents)

        const removeEvent = async (id) => {
            await destroyEvent(id);
            await getEvents();
        }

        return {
            events,
            removeEvent,
        }
    }
}

</script>

<style scope>
 .btn-group {
     width: 100%;
 }
</style>
