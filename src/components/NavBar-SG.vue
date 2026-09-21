<template>
    <v-app-bar :elevation="2" color="#424242">
        <template v-slot:prepend>
            <v-app-bar-nav-icon :ripple="false" class="ml-3"><img src="../assets/nrLogo.png" alt="image"
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
            <v-list class="bg-grey-darken-3">
                <v-list-item value="2">
                    <template v-slot:prepend>
                        <v-icon icon="mdi-logout"></v-icon>
                    </template>
                    <v-list-item-title @click="logout()">{{ 'ออกจากระบบ' }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-app-bar>
</template>

<script>
export default {
    methods: {
        async logout() {
            this.$swal({
                title: 'ออกจากระบบ',
                text: 'คุณต้องการออกจากระบบหรือไม่?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'ใช่',
                cancelButtonText: 'ไม่ใช่'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    localStorage.removeItem('token')
                    window.location.href = '/login';
                }
            })
        }
    }
}
</script>

<style scoped></style>