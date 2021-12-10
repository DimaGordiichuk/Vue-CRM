<template>
    <div>
        <h5>List of posts</h5>
        <post-item
            v-for="post in posts"
            :post="post"
        >
        </post-item>
    </div>

</template>

<script>
import PostItem from "./PostItem";
export default {
    components: {PostItem},
    props: {
        posts: {
            type: Array,
            required: true
        }
    }
}
</script>

<style scoped>

</style>
