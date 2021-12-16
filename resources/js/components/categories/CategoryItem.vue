<template>
    <form class="table-row" @submit.prevent="changeCategory(category.id)">
        <div :class="['input-field', errors ? 'invalid' : '']">
            {{ category.id }}
        </div>
        <div :class="['input-field', errors ? 'invalid' : '']">
            <input
                type="text"
                :class="['validate', errors ? 'invalid' : '']"
                v-model="category.name"
            >
        </div>
        <div :class="['input-field', errors ? 'invalid' : '']">
            <input
                type="number"
                :class="['validate', errors ? 'invalid' : '']"
                v-model="category.limit"
            >
        </div>
        <div class="action">
            <button class="btn" type="submit">Update</button>
            <button type="button" @click="deleteCategory(category.id)"
                    class="btn btn-danger">
                Delete</button>
        </div>
    </form>
</template>

<script>
import { onMounted, reactive } from "vue";
import useCategories from "../../composables/categories";

export default {
    props: {
        category: {
            type: Object,
            required: true,
        }
    },
    setup(props) {
        const { errors, updateCategory, destroyCategory } = useCategories()

        const changeCategory = async (id) => {
            await updateCategory(id, props.category)
        }

        const deleteCategory = async (id) => {
            if (!window.confirm('Are you sure?')) {
                return
            }
            await destroyCategory(id);
        }

        return {
            errors,
            deleteCategory,
            changeCategory
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
