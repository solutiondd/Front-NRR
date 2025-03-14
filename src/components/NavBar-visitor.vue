<template>
    <v-app-bar :elevation="2" :color="$store.state.colorNavbarMode">
        <div class="d-flex align-center ml-5">
            <img src="../assets/Logo-Sunsweet-Final.svg" width="70px" />
            <p class="ml-2"></p>
        </div>
        <v-spacer></v-spacer>
        <v-menu>
            <template v-slot:activator="{ props }">
                <v-btn v-bind="props" color="green" variant="flat" :ripple="false"
                    @click="$router.push({ name: 'Login' })">
                    <p class="pr-3" style="font-size: 15px;">เข้าสู่ระบบ / Login</p>
                    <v-icon color="white">mdi-login</v-icon>
                </v-btn>
            </template>
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