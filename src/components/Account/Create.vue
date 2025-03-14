<template>
    <v-btn color="success" prepend-icon="mdi-account-arrow-right">เพิ่มข้อมูลผู้ใช้งาน
        <v-dialog v-model="dialog" activator="parent" max-width="700px" max-height="500px"
            transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar title="เพิ่มข้อมูลผู้ใช้งาน" density="compact" color="primary"></v-toolbar>
                <v-form fast-fail @submit.prevent="submit" class="pa-5 pb-0">
                    <v-row class="pa-3">
                        <v-col cols="12" class="pa-0 pb-2">
                            <h4>ข้อมูลผู้ใช้งาน</h4>
                        </v-col>
                        <v-card width="100%" class="px-5 py-5 mb-5" color="grey-darken-3">
                            <v-row class="py-2">
                                <v-col cols="12" sm="6" class="px-2 py-0">
                                    <p class="mb-2">ชื่อ</p>
                                    <v-text-field density="compact" variant="outlined" placeholder="ระบุชื่อ..."
                                        v-model="sendData.name"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" class="px-2 py-0">
                                    <p class="mb-2">สิทธิ์เข้าใช้งาน</p>
                                    <v-select density="compact" variant="outlined" v-model="sendData.role"
                                        placeholder="ระบุสิทธิ์เข้าใช้งาน..." :items="RoleList"></v-select>
                                </v-col>
                                <v-col cols="12" sm="6" class="px-2 py-0">
                                    <p class="mb-2">ชื่อผู้ใช้งาน (username)</p>
                                    <v-text-field density="compact" variant="outlined"
                                        prepend-inner-icon="mdi-account-outline"
                                        :rules="[v => !!v || 'Username is required']" placeholder="ระบุชื่อผู้ใช้งาน..."
                                        v-model="sendData.username"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" class="px-2 py-0">
                                    <p class="mb-2">รหัสผ่าน (password)</p>
                                    <v-text-field :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                                        :type="visible ? 'text' : 'password'" density="compact" variant="outlined"
                                        v-model="sendData.password" placeholder="ระบุรหัสผ่าน..."
                                        prepend-inner-icon="mdi-lock-outline" @click:append-inner="visible = !visible"
                                        :rules="[v => !!v || 'Password is required']"></v-text-field>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-row>
                    <v-card-actions class="justify-end pb-5">
                        <v-btn variant="text" color="red lighten-1" @click="dialog = false" rounded="xl"
                            width="100">ยกเลิก</v-btn>
                        <v-btn rounded="xl" append-icon="mdi-arrow-right" type="submit" color="green-lighten-1"
                            variant="flat" width="120">บันทึก</v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-dialog>
    </v-btn>
</template>

<script>
import { AccountService } from '../../api/Account';
export default {
    setup() {
        const account = new AccountService();
        return {
            account
        }
    },
    emits: ['success'],
    data: () => ({
        dialog: false,
        sendData: {
            name: '',
            username: '',
            password: '',
            role: null,
        },
        visible: false,
        RoleList: [
            'park user',
            'visitor',
        ]
    }),
    methods: {
        async submit(event) {
            const res = await event
            if (res.valid === true) {
                const data = {
                    displayName: this.sendData.name,
                    username: this.sendData.username,
                    password: this.sendData.password,
                    parkId: this.$store.state.park,
                    role: this.sendData.role,
                }
                console.log(data)
                await this.account.Create(data).then(res => {
                    if (res.message === 'ok') {
                        this.$swal({
                            icon: 'success',
                            title: `เพิ่มข้อมูลสำเร็จ!`,
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                        });
                        this.dialog = false;
                        this.$emit('success');
                        this.sendData = {
                            name: '',
                            username: '',
                            password: '',
                            role: null,
                        };
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
    },
}
</script>

<style></style>