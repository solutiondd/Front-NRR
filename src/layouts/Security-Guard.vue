<template>
    <v-layout :key="$route.path" class="rounded rounded-md">
        <!-- <NavBarSG /> -->
        <v-main>
            <router-view />
        </v-main>
    </v-layout>
</template>

<script>
import NavBarSG from '../components/NavBar-SG.vue';

export default {
    components: {
        NavBarSG
    }
}
</script>