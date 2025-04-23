<template>
    <v-btn class="ml-2" color="red" size="small" icon="" @click="openDialog()"><v-icon>mdi-delete</v-icon>
        <v-dialog v-model="dialog" activator="parent" max-width="440px" max-height="530px"
            transition="dialog-bottom-transition">
            <v-card>
                <v-alert type="warning" variant="outlined" border="top">
                    <v-alert-title>
                        <p style="font-weight: bold;">
                            ยืนยันที่จะลบใช่หรือไม่ ?
                        </p>
                    </v-alert-title>
                    <p class="pt-2">
                        หาก 'ยืนยัน' จะไม่สามารถใช้งานข้อมูลนี้ได้ในภายหลัง !
                    </p>
                    <v-card-actions class="mt-2 justify-end">
                        <v-btn color="red" variant="text" @click="dialog = false"> ยกเลิก </v-btn>
                        <v-btn color="success" variant="flat" @click="Delete()"> ยืนยัน </v-btn>
                    </v-card-actions>
                </v-alert>

            </v-card>
        </v-dialog>
    </v-btn>
</template>

<script>
import { VisitorService } from '../../api/Visitor';
export default {
    emits: ['success'],
    props: {
        id: String,
    },
    setup() {
        const visitor = new VisitorService();
        return {
            visitor,
        }
    },
    data: () => ({
        dialog: false,
    }),
    methods: {
        async Delete() {
            await this.visitor.Delete(this.id).then(res => {
                if (res.message === 'ok') {
                    this.$swal({
                        icon: 'success',
                        title: `ลบข้อมูลสำเร็จ`,
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                    });
                    this.$emit('success');
                    this.dialog = false;
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
        openDialog() {
            this.dialog === true
        }
    }
}
</script>

<style scoped></style>