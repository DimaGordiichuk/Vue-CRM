<template>
    <div class="section no-pad-bot">
        <div class="container">
            <br><br>
            <h1 class="header center orange-text">Категорії</h1>
            <div class="row center">
                <h5 class="header col s12 light">A modern responsive front-end framework based on Material Design</h5>
            </div>
            <h5>Добавити категорію</h5>
            <form class="col s12" @submit.prevent="saveCategory">
                <div class="row">
                    <div :class="['input-field col s6', errors.name ? 'invalid' : '']">
                        <input
                            placeholder="Встречи"
                            id="name"
                            type="text"
                            :class="['validate', errors.name ? 'invalid' : '']"
                            v-model="form.name"
                        >
                        <label for="name">Назва категорії</label>
                        <span v-if="errors.name" class="helper-text invalid">{{ errors.name[0] }}</span>
                    </div>
                    <div :class="['input-field col s6', errors.limit ? 'invalid' : '']">
                        <input
                            id="limit"
                            type="number"
                            :class="['validate', errors.limit ? 'invalid' : '']"
                            v-model="form.limit"
                        >
                        <label for="limit">Ліміт</label>
                        <span v-if="errors.limit" class="helper-text invalid">{{ errors.limit[0] }}</span>
                    </div>
                </div>
                <div class="row">
                    <button class="btn" type="submit">Зберегти</button>
                </div>
            </form>
            <div class="mt">
                <div class="min-w-full border divide-y divide-gray-200">
                    <div class="table-head">
                        <th class="px-6 py-3 bg-gray-50">
                    <span
                        class="text-xs font-medium tracking-wider leading-4 text-left text-gray-500 uppercase">ID</span>
                        </th>
                        <th class="px-6 py-3 bg-gray-50">
                    <span
                        class="text-xs font-medium tracking-wider leading-4 text-left text-gray-500 uppercase">Назва</span>
                        </th>
                        <th class="px-6 py-3 bg-gray-50">
                    <span
                        class="text-xs font-medium tracking-wider leading-4 text-left text-gray-500 uppercase">Ліміт</span>
                        </th>
                        <th class="px-6 py-3 bg-gray-50"></th>
                    </div>
                   <category-list></category-list>
                </div>
            </div>
            <br><br>

        </div>
    </div>

</template>

<script>
import { onMounted, reactive } from "vue";
import useCategories from "../composables/categories";
import CategoryList from "../components/categories/CategoryList";

export default {
    components: {
        CategoryList
    },
    setup() {
        const { errors, storeCategory } = useCategories()
        const form = reactive({
            'name': '',
            'limit': '',
        })

        const saveCategory = async () => {
            await storeCategory({...form});
            form.name = '';
            form.limit = '';
        }

        return {
            form,
            errors,
            saveCategory,
        }
    }
}
</script>

<style>
.input-field.invalid label{
    color: #f44336;
}
.mt {
     margin-top: 40px;
 }
.table-head {
    display: flex;
    height: 50px;
    border-bottom: 1px solid #7c858e;
}
.table-head span {
    width: 160px;
    display: flex;
    align-items: center;
}
.table-row {
    display: flex;
    align-items: center;
    width: 100%;
    border-bottom: 1px solid #0D47A1;
    padding: 10px 0;
}
.table-row:last-child {
    border-bottom: none;
}
.td-element {
    width: 160px;
    display: flex;
    justify-content: center;
}
.action {
    display: flex;
}
</style>
