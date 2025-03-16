<template>
    <v-layout :key="$route.path" class="rounded rounded-md">
        <Sidebar />
        <Navbar />
        <v-main>
            <router-view />
        </v-main>
    </v-layout>
</template>

<script>
import Sidebar from '../components/Sidebar.vue'
import Navbar from '../components/Navbar.vue'

export default {
    components: {
        Sidebar,
        Navbar
    }
}
</script>