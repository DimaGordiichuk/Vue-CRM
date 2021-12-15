<template>
    <v-navbar></v-navbar>
    <router-view></router-view>
    <v-footer></v-footer>
</template>

<script>

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default {
    components: {
        'vNavbar': Navbar,
        'vFooter': Footer
    }
}
</script>

<style scoped>
    .main {
        margin-top: 70px;
    }
</style>
