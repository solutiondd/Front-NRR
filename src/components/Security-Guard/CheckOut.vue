<template>
    <v-btn width="50%" variant="flat" color="red" class="mt-4"><v-icon
            class="mr-2">mdi-tray-arrow-up</v-icon>บันทึกขาออก
        <v-dialog activator="parent" v-model="dialog" max-width="500px" max-height="500px"
            transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar title="บันทึกข้อมูลขาออก" density="compact" color="red"></v-toolbar>
                <v-form fast-fail @submit.prevent="submit" class="pa-5 pb-0">
                    <v-row class="pa-3">
                        <v-col cols="12" class="pa-0 pb-2">
                            <h4>ข้อมูลขาออก</h4>
                        </v-col>
                        <v-card width="100%" class="pa-5 mb-3" color="grey-darken-3">
                            <v-row class="py-2">
                                <v-col cols="12" class="px-2 py-0">
                                    <p class="mb-2">รหัสการเข้าออก</p>
                                    <v-text-field ref="inputField" density="compact" variant="outlined"
                                        placeholder="ระบุรหัสบันทึกการเข้า-ออก..." v-model="sendData.TransctionId"
                                        hint="*สแกนคิวอาร์โค้ดจากใบบันทึกการเข้า-ออก" persistent-hint required
                                        :rules="[v => !!v || 'โปรดระบุรหัสบันทึกการเข้า-ออก']"></v-text-field>
                                </v-col>
                                <v-col cols="12" class="px-2 pb-0">
                                    <p class="mb-2">เวลาที่ออก</p>
                                    <v-text-field v-model="formatDate" density="compact" variant="outlined"
                                        placeholder="ระบุเวลาที่ออก..." readonly></v-text-field>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-row>
                    <v-card-actions class="px-0 mb-3">
                        <v-btn color="red" variant="flat" width="50%" @click="dialog = false">ยกเลิก</v-btn>
                        <v-btn type="submit" color="success" variant="flat" width="50%">บันทึก</v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-dialog>
    </v-btn>
</template>

<script>
import { VisitorService } from "../../api/Visitor";
import moment from "moment"
import { ref, watch } from "vue";
export default {
    setup() {
        const visitor = new VisitorService();
        const dialog = ref(false);
        const inputField = ref(null);
        const sendData = ref({
            TransctionId: '',
            TransactionTime: new Date(),
        });

        watch(dialog, (newVal) => {
            if (newVal === true) {
                setTimeout(() => {
                    inputField.value?.focus();
                }, 200);
            }
        });

        return {
            visitor,
            dialog,
            inputField,
            sendData,
        };
    },
    computed: {
        formatDate() {
            return moment(this.sendData.TransactionTime).format('DD/MM/YYYY HH:mm:ss')
        }
    },
    data: () => ({
        dialog: false,
        dialogTime: false,
        sendData: {
            TransctionId: '',
            TransactionTime: new Date(),
        },
        timer: null,
    }),
    created() {
        // เริ่มต้นนับเวลาเมื่อ component ถูกสร้าง
        this.startTimer();
    },
    methods: {
        async submit(event) {
            const res = await event
            if (res.valid === true) {
                const isoDate = this.changeFormatDate(this.sendData.TransactionTime, 0);
                const data = {
                    transactionId: this.sendData.TransctionId,
                    timeStamp: isoDate,
                }
                console.log("sendData : ", data)
                await this.visitor.checkout(data).then(res => {
                    if (res.message === 'ok') {
                        this.$swal({
                            icon: 'success',
                            title: `บันทึกข้อมูลสำเร็จ!`,
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                        });
                        this.dialog = false;
                        this.sendData = {
                            TransctionId: '',
                            TransactionTime: new Date(),
                        }
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
        },
        startTimer() {
            this.timer = setInterval(() => {
                this.sendData.TransactionTime = new Date();
            }, 1000);
        },
        changeFormatDate(date, offset) {
            const Rawdate = new Date(date);

            date.setHours(Rawdate.getHours() + offset);

            return date.toISOString();
        }
    },
}
</script>

<style scoped></style>