<template>
    <div>
        <user-item
            v-for="user in users"
            :key="user.id"
            :user="user"
            @remove="$emit('remove', user.id)"
        >
        </user-item>
    </div>
</template>

<script>
import UserItem from "./UserItem";

export default {
    components: {
        UserItem
    },
    props: {
        users: {
            type: Array,
            required: true
        }
    },

}
</script>

<style scoped>

</style>
