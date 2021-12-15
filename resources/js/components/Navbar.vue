<template>
    <nav class="light-blue lighten-1" role="navigation">
        <div class="nav-wrapper container">
            <router-link id="logo-container" to="/" style="position: relative" class="brand-logo">Logo</router-link>
            <ul class="right hide-on-med-and-down">
                <li><router-link to="/categories">Categories</router-link></li>
                <li><router-link to="/posts">Posts</router-link></li>
                <li><router-link to="/events">Events</router-link></li>
            </ul>

            <ul id="nav-mobile" class="sidenav">
                <li><router-link to="/categories">Categories</router-link></li>
                <li><router-link to="/posts">Posts</router-link></li>
                <li><router-link to="/events">Events</router-link></li>
            </ul>
            <a href="#" data-target="nav-mobile" class="sidenav-trigger"><i class="material-icons">menu</i></a>
        </div>
    </nav>
</template>

<script>
export default {
    // data() {
    //     return {
    //         isLoggedIn: false,
    //     }
    // },
    // created() {
    //     if (window.Laravel.isLoggedin) {
    //         this.isLoggedIn = true
    //     }
    // },
    // methods: {
    //     logout(e) {
    //         console.log('ss')
    //         e.preventDefault()
    //         this.$axios.get('/sanctum/csrf-cookie').then(response => {
    //             this.$axios.post('/api/logout')
    //                 .then(response => {
    //                     if (response.data.success) {
    //                         window.location.href = "/"
    //                     } else {
    //                         console.log(response)
    //                     }
    //                 })
    //                 .catch(function (error) {
    //                     console.error(error);
    //                 });
    //         })
    //     }
    // },
}
</script>

<style scoped>

</style>
