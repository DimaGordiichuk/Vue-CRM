<template>
    <div>
        <h1>Сторінка з постами</h1>
        <my-input
            v-model="searchQuery"
            placeholder="Пошук..."
        />
        <div class="top__properties">
            <my-button @click="showDialog">
                Створити пост
            </my-button>
            <my-select
                v-model="selectedSort"
                :options="sortOptions"
            />
        </div>

        <my-dialog v-model:show="dialogVisible">
            <post-form
                @create="createPost"
            />
        </my-dialog>

        <post-list
            :posts="sortedAndSearchedPosts"
            @remove="removePost"
            v-if="!isPostsLoading"
        />
        <div v-else>Загрузка...</div>
        <div v-intersection="loadMorePosts" class="observer"></div>
        <!--        <div class="page__wrapper">-->
        <!--            <div-->
        <!--                class="page"-->
        <!--                v-for="pageNumber in totalPage"-->
        <!--                :key="pageNumber"-->
        <!--                :class="{-->
        <!--                    'current-page': page === pageNumber-->
        <!--                }"-->
        <!--                @click="changePage(pageNumber)"-->
        <!--            >-->
        <!--                {{ pageNumber }}-->
        <!--            </div>-->
        <!--        </div>-->
    </div>

</template>

<script>

import PostForm from "../components/posts/PostForm";
import PostList from "../components/posts/PostList";
export default {
    components: {
        PostList,
        PostForm
    },
    data() {
        return {
            posts: [],
            dialogVisible: false,
            isPostsLoading: false,
            selectedSort: '',
            searchQuery: '',
            page: 1,
            limit: 10,
            totalPage: 0,
            sortOptions: [
                {value: 'title', name: 'По назві'},
                {value: 'body', name: 'По опису'},
            ]
        }
    },
    methods: {
        createPost(post) {
            this.posts.push(post);
            this.dialogVisible = false
        },
        showDialog() {
            this.dialogVisible = true;
        },
        removePost(id) {
             axios.delete('/api/posts/' + id)
                    .then(response => {
                        let i = this.posts.map(data => data.id).indexOf(id);
                        this.posts.splice(i, 1)
                    });
        },
        async fetchPosts() {
            try {
                this.isPostsLoading = true;
                const response = await axios.get('/api/posts', {
                        params: {
                            page: this.page,
                            per_page: this.limit,
                        }
                });
                this.totalPage = response.data.meta.last_page;
                this.posts = response.data.data;
            } catch (e) {
                console.log('Помилка з\'єднання');
            }
            finally {
                this.isPostsLoading = false;
            }
        },
        async loadMorePosts() {
            if (this.page >= this.totalPage)
            {
                console.log("End pagination")
            }
            try {
                this.page += 1;
                const response = await axios.get('/api/posts', {
                    params: {
                        page: this.page,
                        per_page: this.limit,
                    }
                });
                this.totalPage = response.data.meta.last_page;
                this.posts = [...this.posts, ...response.data.data];
            } catch (e) {
                console.log('Помилка з\'єднання');
            }
        }
    },
    mounted() {
        this.fetchPosts();
    },
    computed: {
        sortedPosts() {
            return [...this.posts].sort(
                (post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
        },
        sortedAndSearchedPosts() {
            return this.sortedPosts.filter(
                post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
        }
    },
}
</script>

<style>
.top__properties {
    display: flex;
    justify-content: space-between;
}
.page__wrapper {
    display: flex;
    margin-top: 15px;
}
.page {
    border: 1px solid black;
    padding: 10px;
}
.current-page {
    border: 2px solid teal;
}
.observer {
    height: 30px;
}
</style>
