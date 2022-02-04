<template>
    <form class="table-row" @submit.prevent="changeUser(user.id)">
        <div :class="['input-field', errors ? 'invalid' : '']">
            {{ user.id }}
        </div>
        <div :class="['input-field', errors ? 'invalid' : '']">
            <input
                type="text"
                :class="['validate', errors ? 'invalid' : '']"
                v-model="user.name"
            >
        </div>
        <div :class="['input-field', errors ? 'invalid' : '']">
            <input
                type="text"
                :class="['validate', errors ? 'invalid' : '']"
                v-model="user.email"
            >
        </div>
        <div class="action">
            <button class="btn" type="submit">Update</button>
            <button type="button"
                    @click="$emit('remove', user.id)"
                    class="btn btn-danger">
                Delete</button>
        </div>
    </form>
</template>

<script>
import { onMounted, reactive } from "vue";
import useUsers from "../../composables/users";

export default {
    props: {
        user: {
            type: Object,
            required: true,
        }
    },
    setup(props) {
        const { errors, updateUser } = useUsers()

        const changeUser = async (id) => {
            await updateUser(id, props.user)
        }

        return {
            errors,
            changeUser
        }
    }
}
</script>

<style scoped>
.input-field {
    width: 150px;
    margin-right: 10px;
}
.input-field input {
    border-bottom: none;
}
</style>
