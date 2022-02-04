import {createRouter, createWebHistory} from "vue-router";
import Main from "../pages/Main";
import PostPage from "../pages/PostPage";
import PostShowPage from "../pages/PostShowPage";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Categories from "../pages/Categories";
import Users from "../pages/Users";
import Events from "../pages/events/Events";
import EventCreate from "../pages/events/EventCreate";

const routes = [
    {
        path: '/register',
        name: '/register',
        component: Register
    },
    {
        path: '/login',
        name: '/login',
        component: Login
    },
    {
        path: '/',
        name: 'home',
        component: Main
    },
    {
        path: '/users',
        name: 'users.index',
        component: Users
    },
    {
        path: '/categories',
        name: 'categories.index',
        component: Categories
    },
    {
        path: '/events',
        name: 'events.index',
        component: Events
    },
    {
        path: '/events/create',
        name: 'events.create',
        component: EventCreate
    },
    {
        path: '/posts',
        name: 'posts.index',
        component: PostPage
    },
    {
        path: '/posts/:id',
        name: 'posts.show',
        component: PostShowPage
    },
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
