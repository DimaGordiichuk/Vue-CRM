<template>
    <nav class="light-blue lighten-1" role="navigation">
        <div class="nav-wrapper container">
            <router-link id="logo-container" to="/" style="position: relative" class="brand-logo">Logo</router-link>
            <ul class="right hide-on-med-and-down">
                <li><router-link to="/categories">Categories</router-link></li>
                <li><router-link to="/posts">Posts</router-link></li>
                <li><router-link to="/events">Events</router-link></li>

                <template v-if="getAuthenticated">
                    <li><a @click="logout">Logout</a></li>
                </template>

                <template v-else>
                    <li><router-link to="/login" >login</router-link></li>
                    <li><router-link to="/register" >Register</router-link></li>
                </template>
            </ul>

            <ul id="nav-mobile" class="sidenav">
                <li><router-link to="/categories">Categories</router-link></li>
                <li><router-link to="/posts">Posts</router-link></li>
                <li><router-link to="/events">Events</router-link></li>
                <template v-if="getAuthenticated">
                    <li><a class="nav-item nav-link" style="cursor: pointer;" @click="logout">Logout</a></li>
                </template>

                <template v-else>
                    <li><router-link to="/login" >login</router-link></li>
                    <li><router-link to="/register" >Register</router-link></li>
                </template>
            </ul>
            <a href="#" data-target="nav-mobile" class="sidenav-trigger"><i class="material-icons">menu</i></a>
        </div>
    </nav>
</template>

<script>

import useAuth from '../composables/auth'

export default {
    setup() {
        const { logout, getAuthenticated, getUser } = useAuth()

        return {
            getAuthenticated,
            getUser,
            logout
        }
    },
}
</script>

<style scoped>

</style>
