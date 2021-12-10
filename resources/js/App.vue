<template>
    <post-form
        @create="createPost"
    />
    <post-list
        :posts="posts"
    />
</template>

<script>

import PostForm from "./componemts/posts/PostForm";
import PostList from "./componemts/posts/PostList";
export default {
    components: {
        PostList,
        PostForm
    },
    data() {
        return {
            posts: [
                { id: 1, title: "Title1", body: "Descriptiodfn" },
                { id: 2, title: "Title2", body: "Descriptioasdasdn" },
                { id: 3, title: "Title3", body: "Descriptioasdn" },
                { id: 4, title: "Title4", body: "Descriptioasdn" },
            ],
        }
    },
    methods: {
        createPost(post) {
            this.posts.push(post)
        },
    }
}
</script>


