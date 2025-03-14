<template>
  <v-layout :key="$route.path" class="rounded rounded-md">
    <Sidebar v-if="showSidebarAndNavbar" />
    <Navbar v-if="showSidebarAndNavbar" />
    <NavBarVisitor v-if="isRegisterPage" />
    <v-main>
      <router-view />
    </v-main>
  </v-layout>
</template>

<script>
import NavBarVisitor from './components/NavBar-visitor.vue'
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar.vue'
export default {
  components: {
    Navbar,
    Sidebar,
    NavBarVisitor
  },
  computed: {
    showSidebarAndNavbar() {
      return this.$route.path !== '/login' && this.$route.path !== '/register';
    },
    isRegisterPage() {
      return this.$route.path === '/register';
    }
  },
  mounted() {
  },
  methods: {

  }
}
</script>

<style></style>
