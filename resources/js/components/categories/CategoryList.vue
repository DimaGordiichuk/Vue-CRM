<template>
    <div>
        <category-item
            v-for="category in categories"
            :key="category.id"
            :category="category"
            @remove="$emit('remove', category.id)"
        >
        </category-item>
    </div>
</template>

<script>
import { onMounted, reactive } from "vue";
import useCategories from "../../composables/categories";
import CategoryItem from "./CategoryItem";

export default {
    components: {
      CategoryItem
    },
    props: {
        categories: {
            type: Array,
            required: true
        }
    },

}
</script>

<style scoped>

</style>
