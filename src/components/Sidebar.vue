<template>
    <v-navigation-drawer v-model="drawer" app>
        <v-list-item class="pl-1 pb-2">
            <div class="d-flex align-center justify-center">
                <img src="/src/assets/Logo-Sunsweet-Final.svg" alt="blank" cover style="width: 40%;">
            </div>
        </v-list-item>
        <v-divider></v-divider>
        <v-list density="compact" nav>
            <!-- //NOTE - Visitor -->
            <v-list-item v-if="this.$store.state.role === 'visitor' || role === 'park user'" prepend-icon="mdi-home"
                value="home" title="หน้าหลัก" @click="$router.push({ name: 'LicensePlate' })"></v-list-item>
            <!-- //NOTE - Provider Admin -->
            <v-list-item v-if="this.$store.state.role === 'park admin'" prepend-icon="mdi-home" title="หน้าหลัก"
                value="home" @click="$router.push({ name: 'AdminHome' })"></v-list-item>
            <v-list-item v-if="role != 'visitor'" prepend-icon="mdi-car" title="จัดการทะเบียนรถ" value="licenseplate"
                @click="$router.push({ name: 'LicensePlate' })"></v-list-item>
            <v-list-item v-if="role != 'visitor'" prepend-icon="mdi-account" title="ผู้ใช้งาน" value="account"
                @click="$router.push({ name: 'AdminAccount' })"></v-list-item>
            <!-- <v-list-item v-if="role != 'visitor'" prepend-icon="mdi-camera-iris" title="จัดการรถ (ขาเข้า)"
                value="security" @click="$router.push({ name: 'Stranger' })"></v-list-item> -->
            <v-list-item prepend-icon="mdi-logout" title="ออกจากระบบ" value="logout" @click="logout()"></v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import { UserService } from "../api/user";
export default {
    setup() {
        const user = new UserService();
        return {
            user
        }
    },
    computed: {
        drawer: {
            get() {
                return this.$store.state.drawer;
            },
            set(val) {
                this.$store.commit("SET_DRAWER", val);
            },
        },
        role() {
            return this.$store.state.role;
        }
    },
    data: () => ({

    }),
    methods: {
        gotoHome() {
            console.log("Router : ", this.$router)
            this.$router.push({ name: 'AdminHome' })
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
        }
    }
}
</script>

<style scoped></style>