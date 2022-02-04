<template>
    <div class="container">
        <form class="col s12" @submit.prevent="saveEvent" enctype="multipart/form-data">
            <div class="row create-row">
                <div :class="['input-field download-img col s6', errors.photo ? 'invalid' : '']">
                    <img v-show="imageUrl"
                         :src="imageUrl"
                         class="main-photo"
                    >
                    <input
                        :class="['', errors.photo ? 'invalid' : '']"
                        type="file"
                        accept="image/*"
                        @change="handleImageSelected"
                    >
                </div>
            </div>
            <div class="row create-row">
                <div :class="['input-field col s6', errors.title ? 'invalid' : '']">
                    <input
                        type="text"
                        :class="['validate', errors.title ? 'invalid' : '']"
                        v-model="form.title"
                    >
                    <label>Назва події</label>
                    <span v-if="errors.title" class="helper-text invalid">{{ errors.title[0] }}</span>
                </div>
            </div>
            <div class="row create-row">
                <div :class="['input-field col s6', errors.description ? 'invalid' : '']">
                    <textarea
                        :class="['validate materialize-textarea', errors.description ? 'invalid' : '']"
                        col="8"
                        v-model="form.description"
                    />
                    <label>Опис</label>
                    <span v-if="errors.description" class="helper-text invalid">{{ errors.description[0] }}</span>
                </div>
            </div>
            <div class="row create-row">
                <div :class="['input-field col s6', errors.address ? 'invalid' : '']">
                    <input
                        type="text"
                        :class="['validate', errors.address ? 'invalid' : '']"
                        v-model="form.address"
                    >
                    <label :class="['', form.address ? 'active' : '']">Адреса</label>
                    <span v-if="errors.address" class="helper-text invalid">{{ errors.address[0] }}</span>
                </div>
            </div>
            <div class="map" style="width: 100%; height: 460px" id="map">
                <div class="d-flex text-center" style="height: 100px">
                    <div class="m-auto">
                        <h4>Позиція кліку</h4>
                        <span v-if="otherPos">
                            Latitude: {{ otherPos.lat.toFixed(5) }},
                            Longitude:{{ otherPos.lng.toFixed(5) }}
                        </span>
                        <span v-else>Клікніть на карту для визначення </span>
                    </div>
                </div>
                <div ref="mapDiv" style="width: 100%; height: 360px" />
            </div>
            <div class="row create-row">
                <label>Категорія</label>
                <div :class="['input-field col s12', errors.category ? 'invalid' : '']">
                    <VueMultiselect
                        :class="['validate', errors.category ? 'invalid' : '']"
                        v-model="form.category"
                        :options="categories"
                        :multiple="false"
                        :close-on-select="true"
                        placeholder="Виберіть категорію"
                        label="name"
                        track-by="id"
                    />
                    <span v-if="errors.category" class="helper-text invalid">{{ errors.category[0] }}</span>
                </div>
            </div>
            <div class="row create-row">
                <label>Співавтор</label>
                <div :class="['input-field col s12', errors.coauthor ? 'invalid' : '']">
                    <VueMultiselect
                        :class="['validate', errors.coauthor ? 'invalid' : '']"
                        v-model="form.coauthor"
                        :options="users"
                        :multiple="true"
                        :close-on-select="true"
                        placeholder="Виберіть співавтора"
                        label="name"
                        track-by="id"
                    />
                    <span v-if="errors.coauthor" class="helper-text invalid">{{ errors.coauthor[0] }}</span>
                </div>
            </div>
            <div class="row create-row">
                <p>
                    <label>
                        <input type="checkbox" class="filled-in"  v-model="form.is_privacy" checked="checked" />
                        <span>Приватна подія</span>
                    </label>
                </p>
                <p>
                    <label>
                        <input type="checkbox" v-model="form.confirm_user" class="filled-in" checked="checked" />
                        <span>Ручне підтвердження користувачів</span>
                    </label>
                </p>
                <p>
                    <label>
                        <input type="checkbox" v-model="form.comment_allowed" class="filled-in" checked="checked" />
                        <span>Додавання коментарів</span>
                    </label>
                </p>
                <p>
                    <label>
                        <input type="checkbox" v-model="form.chat_allowed" class="filled-in" checked="checked" />
                        <span>Чат</span>
                    </label>
                </p>
                <p>
                    <label>
                        <input type="checkbox" v-model="form.photos_allowed" class="filled-in" checked="checked" />
                        <span>Додавання фотографій</span>
                    </label>
                </p>
            </div>
            <div class="row create-row">
                <div :class="['input-field col s6', errors.count_seats ? 'invalid' : '']">
                    <input
                        type="number"
                        :class="['validate', errors.count_seats ? 'invalid' : '']"
                        v-model="form.count_seats"
                    >
                    <label>Кількість учасників</label>
                    <span v-if="errors.count_seats" class="helper-text invalid">{{ errors.count_seats[0] }}</span>
                </div>
                <div :class="['input-field col s12', errors.sex ? 'invalid' : '']">
                    <VueMultiselect
                        :class="['validate', errors.sex ? 'invalid' : '']"
                        v-model="form.sex"
                        :options="genderList"
                        :multiple="false"
                        :close-on-select="true"
                        placeholder="Стать"
                        label="value"
                        track-by="key"
                    />
                    <span v-if="errors.sex" class="helper-text invalid">{{ errors.sex[0] }}</span>
                </div>
            </div>
            <div class="row create-row">
                <div :class="['input-field col s6', errors.date ? 'invalid' : '']">
                    <Datepicker range v-model="form.date"></Datepicker>
                    <span v-if="errors.date" class="helper-text invalid">{{ errors.date[0] }}</span>
                </div>
            </div>
            <div class="row">
                <button class="btn" type="submit">Зберегти</button>
            </div>
        </form>
    </div>
</template>

<script>
import {computed, ref, onMounted, onUnmounted, reactive} from "vue";
import Datepicker from "vue3-date-time-picker";
import "vue3-date-time-picker/dist/main.css";
import useCategories from "../../composables/categories";
import useEvents from "../../composables/events";
import useUsers from "../../composables/users";
import { useGeolocation } from "../../composables/useGeolocation";
import { Loader } from "@googlemaps/js-api-loader";
import VueMultiselect from 'vue-multiselect';

const GOOGLE_MAPS_API_KEY = 'AIzaSyC4dy0jCnGR93UaZXb1K0IYrUrC37KgrIY'

export default {
    components: { Datepicker, VueMultiselect },
    setup() {
        const form = reactive({
            'date': '',
            'title': '',
            'description': '',
            'address': '',
            'latitude': '',
            'longitude': '',
            'category': '',
            'coauthor': [],
            'is_privacy': false,
            'confirm_user': false,
            'comment_allowed': false,
            'chat_allowed': false,
            'photos_allowed': false,
            'count_seats': '',
            'sex': '',
            'photo': '',
        })

        let genderList = [
            { key: 'male', value: 'Чоловіча' },
            { key: 'female', value: 'Жіноча' },
            { key: 'all', value: 'Усі' }
        ]

        const { coords } = useGeolocation()
        const currPos = computed(() => ({
            lat: coords.value.latitude,
            lng: coords.value.longitude
        }))
        const otherPos = ref(null)
        const loader = new Loader({ apiKey: GOOGLE_MAPS_API_KEY })
        const mapDiv = ref(null)

        const { categories, getCategories } = useCategories()
        const { users, getUsers } = useUsers()
        const { errors, storeEvent, imageUrl, imageFile, handleImageSelected } = useEvents()


        const saveEvent = async () => {

            form.photo = imageFile.value;

            const data = new FormData();

            for (const [key, value] of Object.entries(form)) {
                if (key === "category") {
                    data.append(key, value.id);
                }
                else if (key === "sex") {
                    data.append(key, value.key);
                }
                else if (key === "date") {
                    if (value) {
                        console.log(1)
                        data.append(key, JSON.stringify({
                            "from" : value[0].toISOString(),
                            "to" : value[1].toISOString()
                        }))
                    }

                }
                else if (key === "coauthor") {
                    let ids = [];
                    for (const [index, val] of Object.entries(value)) {
                        ids.push(val.id);
                    }
                    data.append(key, ids);
                }
                else {
                    data.append(key, value);
                }
            }

            await storeEvent(data);
        }
        let map = ref(null)
        let clickListener = null

        onMounted(async () => {
            getCategories(),
            getUsers()

            await loader.load()
            map.value = new google.maps.Map(mapDiv.value, {
                center: currPos.value,
                zoom: 7
            })
            clickListener = map.value.addListener(
                'click',
                ({ latLng: { lat, lng } }) =>
                    (
                        otherPos.value = { lat: lat(), lng: lng() },
                        form.latitude = otherPos.value.lat.toFixed(5),
                        form.longitude = otherPos.value.lng.toFixed(5),
                        form.address = `Latitude is ${form.latitude}, Longitude is ${form.longitude}`
                    )
            )
        })
        onUnmounted(async () => {
            if (clickListener) clickListener.remove()
        })

        document.addEventListener('DOMContentLoaded', function() {
            var datepicker = document.querySelectorAll('.datepicker');
            M.Datepicker.init(datepicker);
        });

        return {
            categories,
            users,
            form,
            errors,
            saveEvent,
            handleImageSelected,
            imageUrl,
            currPos,
            otherPos,
            mapDiv,
            genderList
        }
    }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<style>

.row.create-row {
    margin-bottom: 0;
}
.vue-map-container {
    height: 100%;
}
.input-field label{
    pointer-events: none;
}
.input-checkbox {
    height: 50px;
}
.vue-map-container {
    height: 100%;
}
.download-img.invalid {
    color: red;
}
.invalid .dp__pointer {
    border-bottom: 1px solid red;
}
.invalid .multiselect__tags {
    border: 1px solid red;
}
</style>
