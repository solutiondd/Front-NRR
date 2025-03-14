<template>
    <v-btn color="success" prepend-icon="mdi-car-arrow-right">เพิ่มข้อมูลทะเบียนรถ
        <v-dialog v-model="dialog" activator="parent" max-width="700px" max-height="560px"
            transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar title="เพิ่มข้อมูลทะเบียนรถ" density="compact" color="primary"></v-toolbar>
                <v-form fast-fail @submit.prevent="submit" class="pa-5 pb-0">
                    <v-row class="pa-3">
                        <v-col cols="12" class="pa-0 pb-2">
                            <h4>ข้อมูลรถ</h4>
                        </v-col>
                        <v-card width="100%" class="px-5 py-5 mb-5" color="grey-darken-3">
                            <v-row>
                                <v-col cols="12" sm="6" class="px-2 pb-0">
                                    <p class="mb-2" style="color: white;">เลขทะเบียน</p>
                                    <v-text-field variant="outlined" density="compact" placeholder="ทะเบียนรถ"
                                        v-model="sendData.lp" required
                                        :rules="[v => !!v || 'โปรดระบุทะเบียนรถ']"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" class="px-2 pb-0">
                                    <p class="mb-2" style="color: white;">จังหวัด</p>
                                    <v-autocomplete :items="ProvinceType" variant="outlined" density="compact"
                                        placeholder="ระบุจังหวัด" v-model="sendData.province" required
                                        :rules="[v => !!v || 'โปรดระบุจังหวัด']"></v-autocomplete>
                                </v-col>
                                <v-col cols="12" sm="6" class="px-2 py-0">
                                    <p class="mb-2" style="color: white;">ชื่อเจ้าของ</p>
                                    <v-text-field variant="outlined" density="compact" placeholder="ระบุชื่อเจ้าของ"
                                        v-model="sendData.name" required
                                        :rules="[v => !!v || 'โปรดระบุชื่อ']"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" class="px-2 py-0">
                                    <p class="mb-2" style="color: white;">ประเภทยานพาหนะ</p>
                                    <v-select :items="VehicleType" variant="outlined" density="compact"
                                        placeholder="ระบุประเภทยานพาหนะ" v-model="sendData.type" required
                                        :rules="[v => !!v || 'โปรดระบุประเภทยานพาหนะ']"></v-select>
                                </v-col>
                            </v-row>
                        </v-card>
                        <v-col cols="12" class="pa-0 pb-2">
                            <h4>รายละเอียด</h4>
                        </v-col>
                        <v-card width="100%" class="px-5 py-5 mb-3" color="grey-darken-3">
                            <v-row>
                                <v-col cols="12" sm="6" class="px-2 py-0">
                                    <p class="mb-2">วันที่เริ่มต้น</p>
                                    <v-text-field prepend-inner-icon="mdi-calendar-today" readonly variant="outlined"
                                        density="compact" placeholder="ระบุวันที่เริ่มต้น" v-model="start_date"
                                        :rules="[v => !!v || 'โปรดระบุวันที่เริ่ม']" required
                                        @click="dialogStart = true">
                                        <v-dialog v-model="dialogStart" width="auto">
                                            <v-date-picker color="primary" v-model="sendData.start_date"
                                                @click:save="dialogStart = false"
                                                @click:cancel="dialogStart = false"></v-date-picker>
                                        </v-dialog>
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" class="px-2 py-0">
                                    <p class="mb-2">วันที่หมดอายุ</p>
                                    <v-text-field prepend-inner-icon="mdi-calendar" readonly variant="outlined"
                                        density="compact" placeholder="ระบุวันที่หมดอายุ" v-model="end_date"
                                        :rules="[v => !!v || 'โปรดระบุวันที่หมดอายุ']" required
                                        @click="dialogEnd = true">
                                        <v-dialog v-model="dialogEnd" width="auto">
                                            <v-date-picker color="primary" v-model="sendData.end_date"
                                                @click:save="dialogEnd = false"
                                                @click:cancel="dialogEnd = false"></v-date-picker>
                                        </v-dialog>
                                    </v-text-field>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-row>
                    <v-card-actions class="justify-end pb-5">
                        <v-btn appen-icon="" variant="text" color="red-lighten-1" @click="dialog = false" rounded="xl"
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
import { LPService } from "../../api/licenseplate";
import { dateFormatYear, dateFormatMonth, dateFormat, dateFormatValue } from "../../function/day";
export default {
    setup() {
        const lp = new LPService();
        return {
            lp,
            dateFormatYear,
            dateFormatMonth
        }
    },
    computed: {
        role() {
            return this.$store.state.role
        }
    },
    watch: {
        'sendData.start_date'(newVal) {
            this.start_date = dateFormat(newVal)
        },
        'sendData.end_date'(newVal) {
            this.end_date = dateFormat(newVal)
        }
    },
    emits: ['success'],
    data: () => ({
        dialog: false,
        dialogStart: false,
        dialogEnd: false,
        sendData: {
            lp: '',
            province: null,
            name: '',
            type: null,
            start_date: new Date(),
            end_date: new Date(),
            listType: 'fixedlist',
        },
        start_date: '',
        end_date: '',
        VehicleType: [
            'CAR',
            'MOTORCYCLE',
            'TRUCK'
        ],
        ProvinceType: [
            'กรุงเทพฯ',
            'กระบี่',
            'กาญจนบุรี',
            'กาฬสินธุ์',
            'กำแพงเพชร',
            'ขอนแก่น',
            'จันทบุรี',
            'ฉะเชิงเทรา',
            'ชลบุรี',
            'ชัยนาท',
            'ชัยภูมิ',
            'ชุมพร',
            'เชียงใหม่',
            'เชียงราย',
            'ตรัง',
            'ตราด',
            'ตาก',
            'นครนายก',
            'นครปฐม',
            'นครพนม',
            'นครราชสีมา',
            'นครศรีธรรมราช',
            'นครสวรรค์',
            'นนทบุรี',
            'นราธิวาส',
            'น่าน',
            'บึงกาฬ',
            'บุรีรัมย์',
            'ปทุมธานี',
            'ประจวบคีรีขันธ์',
            'ปราจีนบุรี',
            'ปัตตานี',
            'พระนครศรีอยุธยา',
            'พะเยา',
            'พังงา',
            'พัทลุง',
            'พิจิตร',
            'พิษณุโลก',
            'เพชรบุรี',
            'เพชรบูรณ์',
            'แพร่',
            'ภูเก็ต',
            'มหาสารคาม',
            'มุกดาหาร',
            'แม่ฮ่องสอน',
            'ยโสธร',
            'ยะลา',
            'ร้อยเอ็ด',
            'ระนอง',
            'ระยอง',
            'ราชบุรี',
            'ลพบุรี',
            'ลำปาง',
            'ลำพูน',
            'เลย',
            'ศรีสะเกษ',
            'สกลนคร',
            'สงขลา',
            'สตูล',
            'สมุทรปราการ',
            'สมุทรสงคราม',
            'สมุทรสาคร',
            'สระแก้ว',
            'สระบุรี',
            'สิงห์บุรี',
            'สุโขทัย',
            'สุพรรณบุรี',
            'สุราษฎร์ธานี',
            'สุรินทร์',
            'หนองคาย',
            'หนองบัวลำภู',
            'อ่างทอง',
            'อำนาจเจริญ',
            'อุดรธานี',
            'อุตรดิตถ์',
            'อุทัยธานี',
            'อุบลราชธานี',
        ],
    }),
    methods: {
        async submit(event) {
            const res = await event
            if (res.valid === true) {
                const data = {
                    licensePlate: this.sendData.lp.replace(/[^ก-ฮ0-9a-zA-Z]/g, ''),
                    licensePlateProvince: this.sendData.province,
                    guestName: this.sendData.name,
                    start: dateFormatValue(this.sendData.start_date),
                    expire: dateFormatValue(this.sendData.end_date),
                    vehicleType: this.sendData.type,
                    listType: this.sendData.listType,
                    userId: this.$store.state.userId ? this.$store.state.userId : '',
                }
                await this.lp.CreateLP(this.$store.state.park, data).then(res => {
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
                            lp: '',
                            province: null,
                            name: '',
                            type: '',
                            start_date: new Date(),
                            end_date: new Date(),
                            listType: 'fixedlist',
                        }
                    } else if (res.data.message === 'validate error') {
                        this.$swal({
                            title: 'กรุณากรอกข้อมูลให้ครบถ้วน !',
                            icon: 'warning',
                        })
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

<style scoped></style>