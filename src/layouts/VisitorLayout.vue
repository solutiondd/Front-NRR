<template>
    <v-layout :key="$route.path" class="rounded rounded-md">
        <NavBarVisitor />
        <v-main>
            <router-view />
        </v-main>
    </v-layout>
</template>

<script>
import NavBarVisitor from '../components/NavBar-visitor.vue'

export default {
    components: {
        NavBarVisitor
    }
}
</script>