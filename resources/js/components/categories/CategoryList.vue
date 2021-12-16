<template>
    <div>
        <category-item
            v-for="category in categories"
            :key="category.id"
            :category="category"
        >
        </category-item>
    </div>
</template>

<script>
import { onMounted, reactive } from "vue";
import useCategories from "../../composables/categories";
import CategoryItem from "./CategoryItem";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";

export default {
    components: {
      CategoryItem
    },
    // methods: {
    //   ...mapActions({
    //       categories: 'category/getCategories'
    //   })
    // },
    // computed: {
    //     ...mapState({
    //         categories: state => state.category.categories,
    //     }),
    // },
    // mounted() {
    //     this.categories;
    // },
    setup() {
        const { categories, getCategories} = useCategories()

        onMounted(getCategories)

        return {
            categories
        }
    }
}
</script>

<style scoped>

</style>
