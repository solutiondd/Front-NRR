<template>
    <div class="body_login">
        <v-card max-width="300px" color="grey-darken-3" class="mx-auto pa-5 pb-8 card_login" elevation="8">
            <v-form fast-fail ref="form" @submit.prevent="submit">
                <h2 class="text-center">Sign-In</h2>
                <div class="text-subtitle-1 text-medium-emphasis">ชื่อผู้ใช้งาน</div>
                <v-text-field density="compact" placeholder="Username" prepend-inner-icon="mdi-account-outline"
                    variant="outlined" :rules="[v => !!v || 'Username is required']" v-model="username"></v-text-field>
                <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                    รหัสผ่าน
                </div>
                <v-text-field :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="visible ? 'text' : 'password'" density="compact" placeholder="Password"
                    prepend-inner-icon="mdi-lock-outline" variant="outlined" @click:append-inner="visible = !visible"
                    :rules="[v => !!v || 'Password is required']" v-model="password"></v-text-field>
                <v-btn block color="primary" type="submit" variant="flat" :ripple="false">เข้าสู่ระบบ</v-btn>
            </v-form>
        </v-card>
    </div>
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
    data: () => ({
        visible: false,
        username: '',
        password: '',
    }),
    async mounted() {
        if (this.$store.state.CheckLogin) {
            localStorage.clear();
            this.$store.state.CheckLogin = false
        }
        this.$store.watch(
            (state) => state.CheckLogin,
            (newValue, oldValue) => {
                if (newValue) {
                    this.$swal({
                        title: 'ไม่มีสิทธิ์เข้าถึงได้!',
                        text: "โปรดตรวจสอบให้แน่ชัด!",
                        icon: 'warning',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'ยืนยัน',
                    }).then(async (result) => {
                        if (result.isConfirmed) {
                            localStorage.clear();
                            this.$store.state.CheckLogin = false
                        }
                    })
                }
            }
        );
    },
    methods: {
        async submit(event) {
            const results = await event
            if (results.valid === true) {
                const userdata = {
                    username: this.username,
                    password: this.password,
                    client_id: '1f9fa79b-3df4-4d47-b8b0-339e294675c9',
                    client_secret: 'f981f0e29d40fbb791d0fff2392cc3867778e7b33c0a74878d39cb19997b2107',
                    grant_type: 'password credential',
                    scope: 'park',
                }
                await this.user.SignIn(userdata).then(result => {
                    if (result.message === 'ok') {
                        localStorage.setItem('token', result.access_token);
                        this.$router.push('/home');
                    } else if (result.error) {
                        this.$swal({
                            title: 'UsernameหรือPassword ไม่ถูกต้อง !',
                            icon: 'warning',
                        })
                    }
                })
            }
        }
    },
}
</script>

<style></style>