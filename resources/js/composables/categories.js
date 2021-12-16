import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { createToaster } from "@meforma/vue-toaster";

export default function useCategories()
{
    const categories = ref([])
    const category = ref([])
    const router = useRouter()
    const errors = ref('')
    const toaster = createToaster();

    const getCategories = async () => {
        let response = await axios.get('/api/categories')
        categories.value = response.data.data;
    }
    const getCategory = async (id) => {
        let response = await axios.get('/api/categories/' + id)
        category.value = response.data.data;
    }

    const storeCategory = async (data) => {
        errors.value = ''
        try {
            const response = await axios.post('/api/categories', data)
                categories.value.push(response.data.data);
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

    const updateCategory = async (id, cat) => {
        errors.value = ''
        try {
            const response = await axios.put('/api/categories/' + id, cat);
            toaster.success(response.data.message)

        } catch (e) {
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }

    }

    const destroyCategory = async (id) => {
        errors.value = ''
        try {
            const response = await axios.delete('/api/categories/' + id)
            toaster.success(response.data.message)
            // categories = this.posts.filter(p => p.id !== post.id)

        } catch (e) {
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }

    }

    return {
        categories,
        category,
        errors,
        getCategories,
        getCategory,
        storeCategory,
        updateCategory,
        destroyCategory
    }
}
