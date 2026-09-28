<template>
    <v-list-item value="3">
        <template v-slot:prepend>
            <v-icon icon="mdi-lock-reset"></v-icon>
        </template>
        <v-list-item-title @click="dialog = true">เปลี่ยนรหัสผ่าน</v-list-item-title>

        <v-dialog v-model="dialog" max-width="500px" transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar title="เปลี่ยนรหัสผ่าน" density="compact" color="primary"></v-toolbar>
                <v-form fast-fail @submit.prevent="submit" class="pa-5 pb-0">
                    <v-row class="pa-3">
                        <v-col cols="12" class="pa-0 pb-2">
                            <p class="mb-2">รหัสผ่านเดิม</p>
                            <v-text-field :append-inner-icon="visibleOld ? 'mdi-eye-off' : 'mdi-eye'"
                                :type="visibleOld ? 'text' : 'password'" density="compact" variant="outlined"
                                v-model="sendData.oldpassword" placeholder="ระบุรหัสผ่านเดิม..."
                                prepend-inner-icon="mdi-lock-outline" @click:append-inner="visibleOld = !visibleOld"
                                :rules="[v => !!v || 'กรุณาระบุรหัสผ่านเดิม']"></v-text-field>
                        </v-col>
                        <v-col cols="12" class="pa-0 pb-2">
                            <p class="mb-2">รหัสผ่านใหม่</p>
                            <v-text-field :append-inner-icon="visibleNew ? 'mdi-eye-off' : 'mdi-eye'"
                                :type="visibleNew ? 'text' : 'password'" density="compact" variant="outlined"
                                v-model="sendData.newpassword" placeholder="ระบุรหัสผ่านใหม่..."
                                prepend-inner-icon="mdi-lock-outline" @click:append-inner="visibleNew = !visibleNew"
                                :rules="[v => !!v || 'กรุณาระบุรหัสผ่านใหม่', v => (v && v.length >= 6) || 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร']"></v-text-field>
                        </v-col>
                        <v-col cols="12" class="pa-0 pb-2">
                            <p class="mb-2">ยืนยันรหัสผ่านใหม่</p>
                            <v-text-field :append-inner-icon="visibleConfirm ? 'mdi-eye-off' : 'mdi-eye'"
                                :type="visibleConfirm ? 'text' : 'password'" density="compact" variant="outlined"
                                v-model="confirmPassword" placeholder="ยืนยันรหัสผ่านใหม่..."
                                prepend-inner-icon="mdi-lock-outline"
                                @click:append-inner="visibleConfirm = !visibleConfirm"
                                :rules="[v => !!v || 'กรุณายืนยันรหัสผ่านใหม่', v => v === sendData.newpassword || 'รหัสผ่านไม่ตรงกัน']"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-card-actions class="justify-end pb-5">
                        <v-btn variant="text" color="red lighten-1" @click="close()" rounded="xl"
                            width="100">ยกเลิก</v-btn>
                        <v-btn rounded="xl" append-icon="mdi-arrow-right" type="submit" color="green-lighten-1"
                            variant="flat" width="140">บันทึก</v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-dialog>
    </v-list-item>
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
        dialog: false,
        sendData: {
            oldpassword: '',
            newpassword: '',
        },
        confirmPassword: '',
        visibleOld: false,
        visibleNew: false,
        visibleConfirm: false,
    }),
    methods: {
        close() {
            this.dialog = false;
            this.sendData = { oldpassword: '', newpassword: '' };
            this.confirmPassword = '';
        },
        async submit(event) {
            const res = await event
            if (res.valid === true) {
                await this.user.ChangePassword(this.sendData).then(res => {
                    if (!res?.error) {
                        this.$swal({
                            icon: 'success',
                            title: `เปลี่ยนรหัสผ่านสำเร็จ!`,
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                        });
                        this.close();
                    } else {
                        this.$swal({
                            icon: 'warning',
                            title: `มีบางอย่างผิดพลาด !`,
                            text: res?.data?.message || res?.message || res?.error || 'กรุณาลองใหม่อีกครั้ง',
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
