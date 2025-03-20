<template>
    <v-app-bar :elevation="2" color="#424242">
        <template v-slot:prepend>
            <v-app-bar-nav-icon :ripple="false" class="ml-3"><img src="../assets/Logo-Sunsweet-Final.svg" alt="image"
                    width="50px"></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title>
            <p>จัดการรถขาเข้า</p>
        </v-app-bar-title>
        <v-menu>
            <template v-slot:activator="{ props }">
                <v-btn v-bind="props" :ripple="false" size="large" append-icon="mdi-chevron-down">
                    <v-icon color="white">mdi-account-circle-outline</v-icon>
                    <p class="pl-3" style="font-size: 15px;">{{ $store.state.displayName }}</p>
                </v-btn>
            </template>
        </v-menu>
    </v-app-bar>
</template>

<script>
export default {

}
</script>

<style></style>