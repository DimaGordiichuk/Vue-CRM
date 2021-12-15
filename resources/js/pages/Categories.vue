<template>
    <div class="section no-pad-bot">
        <div class="container">
            <br><br>
            <h1 class="header center orange-text">Категорії</h1>
            <div class="row center">
                <h5 class="header col s12 light">A modern responsive front-end framework based on Material Design</h5>
            </div>
            <h5>Добавити категорію</h5>
            <div v-if="errors">
                <div v-for="(v, k) in errors" :key="k" class="bg-red-500 text-white rounded font-bold mb-4 shadow-lg py-2 px-4 pr-0">
                    <p v-for="error in v" :key="error" class="text-sm">
                        {{ error }}
                    </p>
                </div>
            </div>
            <form class="col s12" @submit.prevent="saveCategory">
                <div class="row">
                    <div class="input-field col s6">
                        <input
                            placeholder="Встречи"
                            id="name"
                            type="text"
                            class="validate"
                            v-model="form.name"
                        >
                        <label for="name">Назва категорії</label>
                    </div>
                    <div class="input-field col s6">
                        <input
                            id="limit"
                            type="number"
                            class="validate"
                            v-model="form.limit"
                        >
                        <label for="limit">Ліміт</label>
                    </div>
                </div>
                <div class="row">
                    <button class="btn" type="submit">Зберегти</button>
                </div>

            </form>
            <div class="mt">
                <table class="min-w-full border divide-y divide-gray-200">
                    <thead>
                    <tr>
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
                    </tr>
                    </thead>

                    <tbody class="bg-white divide-y divide-gray-200 divide-solid">
                    <template v-for="category in categories" :key="category.id">
                        <tr class="bg-white">
                            <td class="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                                {{ category.id }}
                            </td>
                            <td class="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                                {{ category.name }}
                            </td>
                            <td class="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                                {{ category.limit }}
                            </td>
                            <td class="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                                <button @click="deleteCategory(category.id)"
                                        class="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150">
                                    Delete</button>
                            </td>
                        </tr>
                    </template>
                    </tbody>
                </table>
            </div>
            <br><br>

        </div>
    </div>

</template>

<script>
import { onMounted, reactive } from "vue";
import useCategories from "../composables/categories";

export default {
    setup() {
        const { categories, errors, getCategories, storeCategory, updateCategory, destroyCategory } = useCategories()
        const form = reactive({
            'name': '',
            'limit': '',
        })
        onMounted(getCategories)

        const saveCategory = async () => {
            await storeCategory({...form});
        }
        const deleteCategory = async (id) => {
            if (!window.confirm('Are you sure?')) {
                return
            }
            await destroyCategory(id);
            await getCategories();
        }
        return {
            form,
            errors,
            saveCategory,
            categories,
            deleteCategory
        }
    }
}
</script>

<style scoped>
 .mt {
     margin-top: 40px;
 }
</style>
