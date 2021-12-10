<template>
    <div class="card" v-for="post in posts">
        <div><strong>Назва</strong>{{ post.title }}</div>
        <div><strong>Description</strong>{{ post.body }}</div>
    </div>
</template>

<script>
export default {
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
