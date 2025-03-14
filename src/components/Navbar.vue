<template>
    <v-app-bar :elevation="2" :color="$store.state.colorNavbarMode">
        <v-app-bar-nav-icon @click="openDrawer()"></v-app-bar-nav-icon>

        <v-spacer></v-spacer>
        <v-menu :close-on-content-click="false">
            <template v-slot:activator="{ props }">
                <v-btn v-bind="props" append-icon="mdi-chevron-down" size="x-large" :ripple="false">
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
import { UserService } from "../api/user";
import { mapActions, mapState, mapMutations } from "vuex";

export default {
    setup() {
        const baseUrl = import.meta.env.VITE_APP_BASE_URL;
        const user = new UserService();
        return {
            baseUrl,
            user
        }
    },
    data: () => ({

    }),
    computed: {
        ...mapState({
            drawer: (state) => state.drawer,
        }),
        role() {
            return this.$store.state.isUserType;
        },
    },
    mounted() {
        // this.$store.state.colorNavbarMode = localStorage.getItem("colorNavbarMode");
        // this.$store.state.colorMode = localStorage.getItem("colorMode");
        // this.$store.state.checkMode = JSON.parse(localStorage.getItem("checkMode"));
        // this.$store.state.colorMode === 'grey-darken-4'
    },
    methods: {
        ...mapMutations({
            setDrawer: "SET_DRAWER",
        }),
        ...mapActions({
            switchDrawer: "switchDrawer",
            // signOut: "auth/signOut",
        }),
        openDrawer() {
            if (this.drawer) {
                this.switchDrawer(false);
            } else {
                this.switchDrawer(true);
            }
        },
        async logout() {
            this.$swal({
                title: 'คุณยืนยันที่จะออกจากระบบใช่ไหม?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'ยืนยัน',
                cancelButtonText: 'ยกเลิก'
            }).then(async (res) => {
                if (res.isConfirmed) {
                    localStorage.removeItem("token");
                    window.location.href = '/';
                } else {
                    this.$swal({
                        icon: 'warning',
                        title: `มีบางอย่างผิดพลาด !`,
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                    });
                }

            })
        },
    }
}
</script>

<style></style>