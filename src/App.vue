<template>
  <v-layout class="rounded rounded-md">
    <Sidebar v-if="$route.path != '/login'" />
    <Navbar v-if="$route.path != '/login'" />
    <v-main>
      <router-view />
    </v-main>
  </v-layout>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar.vue'
export default {
  components: {
    Navbar,
    Sidebar
  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style></style>
