<template>
    <div class="card">
        <div>
            <div>{{ post.id }}</div>
            <div><strong>Назва</strong>{{ post.title }}</div>
            <div><strong>Description</strong>{{ post.body }}</div>
        </div>
        <div class="post_btn">
            <my-button
                @click="$router.push(`/posts/${post.id}`)"
                >
                Перейти
            </my-button>
            <my-button
                @click="$emit('remove', post.id)"
                >
                Видалити
            </my-button>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        post: {
            type: Object,
            required: true,
        }
    }
}
</script>

<style scoped>
    .card {
        margin: 20px 10px;
        border: 2px solid forestgreen;
    }
</style>
