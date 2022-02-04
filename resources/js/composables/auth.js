import { ref, reactive, computed } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { createToaster } from "@meforma/vue-toaster";

const state = reactive({
    authenticated: false,
    user: {}
})

export default function useAuth()
{
    const errors = ref('')
    const router = useRouter()
    const toaster = createToaster();

    const getAuthenticated = computed(() => state.authenticated)
    const getUser = computed(() => state.user)

    const setAuthenticated = (authenticated) => {
        state.authenticated = authenticated
    }

    const setUser = (user) => {
        state.user = user
    }

    const attempt = async () => {
        try {
            let response = await axios.get('api/user')

            setAuthenticated(true)
            setUser(response.data)

            return response
        } catch (e) {
            setAuthenticated(false)
            setUser({})
        }
    }

    const login = async (data) => {
        errors.value = '';
        await axios.get('/sanctum/csrf-cookie')
        try {
            const response = await axios.post('/api/login', data)

            localStorage.setItem('token', response.data.access_token)

            attempt()

            toaster.success('Login successful')

            await router.push('home')
        } catch (e) {
            if (e.response.status === 422) {
                errors.value = e.response.data.errors;

                for (const [key, error] of Object.entries(errors.value)) {
                    toaster.error(`${error}`)
                }
            }
        }
    }

    const logout = async () => {
        try {
            await axios.post('/api/logout')

            localStorage.removeItem('token')

            setAuthenticated(false)

            setUser({})

            toaster.success('Logout successful')

            await router.push('home')
        } catch (e) {
            console.error(e)
        }
    }

    const register = async (data) => {
        errors.value = '';
        await axios.get('/sanctum/csrf-cookie')
        try {
            const response = await axios.post('/api/register', data)
            toaster.success(response.data.message)
            await router.push('login')
        } catch (e) {
            if (e.response.status === 422) {
                errors.value = e.response.data.errors;

                for (const [key, error] of Object.entries(errors.value)) {
                    toaster.error(`${error}`)
                }
            }
        }
    }

    return {
        login,
        logout,
        register,
        attempt,
        errors,
        getAuthenticated,
        getUser
    }
}
