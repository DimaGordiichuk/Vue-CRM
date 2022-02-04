import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { createToaster } from "@meforma/vue-toaster";

export default function useUsers()
{
    const users = ref([])
    const user = ref([])
    const router = useRouter()
    const errors = ref('')
    const toaster = createToaster();

    const getUsers = async () => {
        let response = await axios.get('/api/users')
        users.value = response.data.data;
    }
    const getUser = async (id) => {
        let response = await axios.get('/api/user/' + id)
        user.value = response.data.data;
    }

    const storeUser = async (data) => {
        errors.value = ''
        try {
            const response = await axios.post('/api/users', data)
                users.value.push(response.data.data);
                toaster.success(response.data.message)
            // await router.push({name: 'categories.index'})
        } catch (e) {
            if (e.response.status === 422) {
                errors.value = e.response.data.errors;

                for (const [key, error] of Object.entries(errors.value)) {
                    toaster.error(`${error}`)
                }
            }
        }
    }

    const updateUser = async (id, cat) => {
        errors.value = ''
        try {
            const response = await axios.put('/api/users/' + id, cat);
            toaster.success(response.data.message)

        } catch (e) {
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }

    }

    const destroyUser = async (id) => {
        errors.value = ''
        try {
            const response = await axios.delete('/api/users/' + id)
            toaster.success(response.data.message)

        } catch (e) {
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }

    }

    return {
        users,
        user,
        errors,
        getUsers,
        getUser,
        storeUser,
        updateUser,
        destroyUser
    }
}
