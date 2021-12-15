<template>
    <div v-if="posts.length > 0">
        <h5>Сторінка з постами</h5>
        <transition-group name="post-list">
            <post-item
                v-for="post in posts"
                :post="post"
                :key="post.id"
                @remove="$emit('remove', post.id)"
            />
        </transition-group>

    </div>
    <h2 v-else >
        Список постів пустий
    </h2>


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
.post-list-item {
    display: inline-block;
    margin-right: 10px;
}
.post-list-enter-active,
.post-list-leave-active {
    transition: all .5s ease;
}
.post-list-enter-from,
.post-list-leave-to {
    opacity: 0;
    transform: translateY(30px);
}

.flip-post-list-move {
    transition: transform 0.5s ease;
}

</style>
