<template>
    <form @submit.prevent action="#">
        <h4>Store</h4>
        <input
            v-model="post.title"
            type="text"
            placeholder="Title"
        >
        <input
            v-model="post.body"
            type="text"
            placeholder="Description"
        >
        <button class="btn" @click="createPost" type="submit">Save</button>
    </form>
</template>

<script>
export default {
    data() {
        return {
            post: {
                title: '',
                body: '',
            }
        }
    },
    methods: {
        createPost() {
            this.post.id = Date.now()
            this.posts.push(newPost);
            this.title = '';
            this.body = '';
        },
    }
}
</script>

<style scoped>

</style>
