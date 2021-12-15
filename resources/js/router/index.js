import {createRouter, createWebHistory} from "vue-router";
import Main from "../pages/Main";
import PostPage from "../pages/PostPage";
import PostShowPage from "../pages/PostShowPage";
import UserPage from "../pages/UserPage";
import PostPageVuex from "../pages/PostPageVuex";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Categories from "../pages/Categories";

const routes = [
    // {
    //     path: '/register',
    //     name: '/register',
    //     component: Register
    // },
    // {
    //     path: '/login',
    //     name: '/login',
    //     component: Login
    // },
    {
        path: '/',
        name: 'home',
        component: Main
    },
    {
        path: '/categories',
        name: 'categories.index',
        component: Categories
    },
    // {
    //     path: '/posts',
    //     name: 'posts.index',
    //     component: PostPage
    // },
    // {
    //     path: '/posts-vuex',
    //     name: 'posts-vuex',
    //     component: PostPageVuex
    // },
    // {
    //     path: '/posts/:id',
    //     name: 'posts.show',
    //     component: PostShowPage
    // },
    // {
    //     path: '/users',
    //     name: 'users.index',
    //     component: UserPage
    // },
]

export default createRouter({
    history: createWebHistory(),
    routes
})
