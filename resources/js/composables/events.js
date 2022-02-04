import { ref, watch } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { createToaster } from "@meforma/vue-toaster";

export default function useEvents()
{
    const events = ref([])
    const event = ref([])
    const router = useRouter()
    const errors = ref('')
    const toaster = createToaster();
    let imageFile = ref("");
    let imageUrl = ref("");

    const getEvents = async () => {
        let response = await axios.get('/api/events')
        events.value = response.data.data;
    }
    const getEvent = async (id) => {
        let response = await axios.get('/api/events/' + id)
        event.value = response.data.data;
    }

    const storeEvent= async (data) => {
        errors.value = '';
        try {
            const response = await axios.post('/api/events', data)
                events.value.push(response.data.data);
                toaster.success(response.data.message)
            await router.push({name: 'events.index'})
        } catch (e) {
            if (e.response.status === 422) {
                errors.value = e.response.data.errors;

                for (const [key, error] of Object.entries(errors.value)) {
                    toaster.error(`${error}`)
                }
            }
        }
    }

    const updateEvent = async (id) => {
        errors.value = ''
        try {
            const response = await axios.put('/api/events/' + id, event.value);
            toaster.success(response.data.message)

        } catch (e) {
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }

    }

    const destroyEvent = async (id) => {
        errors.value = ''
        try {
            const response = await axios.delete('/api/events/' + id)
            toaster.success(response.data.message)

        } catch (e) {
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }
    }

    function handleImageSelected(event) {
        if (event.target.files.length === 0) {
            imageFile.value = "";
            imageUrl.value = "";
            return;
        }

        imageFile.value = event.target.files[0];
    }

    watch(imageFile, (imageFile) => {
        if (!(imageFile instanceof File)) {
            return;
        }

        let fileReader = new FileReader();

        fileReader.readAsDataURL(imageFile);

        fileReader.addEventListener("load", () => {
            imageUrl.value = fileReader.result;
        });
    });

    return {
        events,
        event,
        errors,
        getEvents,
        getEvent,
        storeEvent,
        updateEvent,
        destroyEvent,
        imageFile,
        imageUrl,
        handleImageSelected,
    }
}
