<template>
    <v-container max-width="700px" width="100%" class="body_register">
        <v-card>
            <v-form fast-fail @submit.prevent="submit" class="pa-5">
                <v-row>
                    <v-col cols="12">
                        <h2 class="d-flex align-center"><v-icon icon="mdi-file-document-edit"
                                class="pr-3"></v-icon>ลงทะเบียนเข้าพื้นที่
                        </h2>
                    </v-col>
                    <v-col cols="12">
                        <v-card color="#424242">
                            <v-col class="pb-0">
                                <h3 class="d-flex align-center justify-start">
                                    <v-icon icon="mdi-account" size="small" class="mr-2"></v-icon>
                                    ข้อมูลผู้ติดต่อ
                                </h3>
                            </v-col>
                            <v-col cols="12" class="pb-0">
                                <p class="pb-1 text-subtitle-1 text-medium-emphasis">ชื่อ-นามสกุล (ไม่ต้องระบุคำนำหน้า)
                                    <span style="color: red;">*</span>
                                </p>
                                <v-text-field prepend-inner-icon="mdi-account" density="compact" variant="outlined"
                                    placeholder="ตัวอย่าง. สมชาย ใจดี"
                                    :rules="sendData.guestName ? [] : [v => !!v || 'โปรดระบุชื่อ-นามสกุล']" required
                                    v-model="sendData.guestName"></v-text-field>
                            </v-col>
                            <v-col cols="12" class="py-0">
                                <p class="pb-1 text-subtitle-1 text-medium-emphasis">เบอร์โทรศัพท์ผู้มาติดต่อ
                                    <span style="color: red;">*</span>
                                </p>
                                <v-text-field prepend-inner-icon="mdi-phone" density="compact" variant="outlined"
                                    placeholder="ตัวอย่าง. 0987654321"
                                    :rules="[v => !!v || 'โปรดระบุเบอร์โทรศัพท์ผู้มาติดต่อ']" required
                                    v-model="sendData.tel" type="number" maxlength="10"
                                    @input="sendData.tel = sendData.tel.slice(0, 10)"></v-text-field>
                            </v-col>
                            <v-col cols="12" class="py-0">
                                <p class="pb-1 text-subtitle-1 text-medium-emphasis">หน่วยงาน
                                    <span style="color: red;">*</span>
                                </p>
                                <v-text-field prepend-inner-icon="mdi-domain" density="compact" variant="outlined"
                                    placeholder="ตัวอย่าง. Nareerat"
                                    :rules="sendData.agency ? [] : [v => !!v || 'โปรดระบุหน่วยงาน']" required
                                    v-model="sendData.agency"></v-text-field>
                            </v-col>
                            <v-col cols="12" class="py-0">
                                <p class="pb-1 text-subtitle-1 text-medium-emphasis">วันที่เข้า
                                    <span style="color: red;">*</span>
                                </p>
                                <v-text-field prepend-inner-icon="mdi-calendar-today" readonly density="compact"
                                    variant="outlined" placeholder="ตัวอย่าง. 01/01/2025" @click="dialog = true"
                                    :rules="[v => !!v || 'โปรดระบุวันที่เริ่ม']" required v-model="selectedDate">
                                    <v-dialog v-model="dialog" activator="parent" width="auto">
                                        <v-date-picker color="primary" v-model="sendData.date"
                                            @click:save="dialog = false" @click:cancle="dialog = false"></v-date-picker>
                                    </v-dialog>
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" class="py-0">
                                <p class="pb-1 text-subtitle-1 text-medium-emphasis">เลขบัตรประจำตัว
                                    <!-- <span style="color: red;">*</span> -->

                                    <!-- //NOTE - ถ้ากลับมาบังคับเลขประจำตัวประชาชนให้เติม Code ข้างล่างนี้  -->
                                    <!-- :rules="[v => !!v || 'โปรดระบุเลขบัตรประจำตัว', v => /^[0-9]{1,13}$/.test(v) || 'กรุณาระบุเลขบัตร 13 หลัก']"
                            required -->
                                </p>
                                <v-text-field prepend-inner-icon="mdi-card-account-details" density="compact"
                                    variant="outlined" placeholder="ตัวอย่าง. 1234567891011"
                                    v-model="sendData.identityNumber" maxlength="13"></v-text-field>
                            </v-col>
                        </v-card>
                    </v-col>

                    <v-col cols="12">
                        <v-card color="#424242">
                            <v-col class="pb-0">
                                <h3 class="d-flex align-center justify-start">
                                    <v-icon icon="mdi-car" size="small" class="mr-2"></v-icon>
                                    ข้อมูลยานพาหนะ
                                </h3>
                            </v-col>
                            <v-col cols="12" class="pb-0">
                                <p class="pb-1 text-subtitle-1 text-medium-emphasis">ทะเบียนรถ (ไม่ต้องระบุจังหวัด)
                                    <span style="color: red;">*</span>
                                </p>
                                <v-text-field prepend-inner-icon="mdi-card-text" density="compact" variant="outlined"
                                    placeholder="ตัวอย่าง. กก9999" :rules="[v => !!v || 'โปรดระบุทะเบียนรถ']" required
                                    v-model="sendData.licensePlate"></v-text-field>
                            </v-col>
                            <v-col cols="12" class="py-0">
                                <p class="pb-1 text-subtitle-1 text-medium-emphasis">ยี่ห้อรถ
                                    <span style="color: red;">*</span>
                                </p>
                                <v-text-field prepend-inner-icon="mdi-car-multiple" density="compact" variant="outlined"
                                    placeholder="ตัวอย่าง. ฮอนด้า, โตโยต้า ฯลฯ"
                                    :rules="[v => !!v || 'โปรดระบุยี่ห้อรถ']" required
                                    v-model="sendData.brand"></v-text-field>
                            </v-col>
                            <v-col cols="12" class="py-0">
                                <p class="pb-1 text-subtitle-1 text-medium-emphasis">สีรถ
                                    <span style="color: red;">*</span>
                                </p>
                                <v-text-field prepend-inner-icon="mdi-palette" density="compact" variant="outlined"
                                    placeholder="ตัวอย่าง. ขาว, ดำ, เทา ฯลฯ" :rules="[v => !!v || 'โปรดระบุสีรถ']"
                                    required v-model="sendData.carColor"></v-text-field>
                            </v-col>
                            <v-col cols="12" class="py-0">
                                <p class="pb-1 text-subtitle-1 text-medium-emphasis">ประเภทยานพาหนะ
                                    <span style="color: red;">*</span>
                                </p>
                                <v-select prepend-inner-icon="mdi-format-list-bulleted" :items="VehicleType"
                                    item-title="name" item-value="value" variant="outlined" density="compact"
                                    placeholder="ระบุประเภทยานพาหนะ" v-model="sendData.vehicleType" required
                                    :rules="[v => !!v || 'โปรดระบุประเภทยานพาหนะ']"></v-select>
                            </v-col>
                            <v-col cols="12" class="py-0">
                                <p class="pb-1 text-subtitle-1 text-medium-emphasis">ประเภทสิทธิ์ของยานพาหนะ
                                    <span style="color: grey;" class="text-subtitle-1">(ไม่บังคับ)</span>
                                </p>
                                <v-select clearable prepend-inner-icon="mdi-car-cog" :items="PermissionCate"
                                    item-title="name" item-value="value" variant="outlined" density="compact"
                                    placeholder="ระบุสิทธิ์ของยานพาหนะ" v-model="sendData.PermissionVehicle"></v-select>
                            </v-col>
                        </v-card>
                    </v-col>

                    <v-col cols="12">
                        <v-card color="#424242">
                            <v-col class="pb-0">
                                <h3 class="d-flex align-center justify-start">
                                    <v-icon icon="mdi-card-account-mail" size="small" class="mr-2"></v-icon>
                                    ติดต่อ
                                </h3>
                            </v-col>
                            <v-col cols="12" class="pb-0">
                                <p class="pb-1 text-subtitle-1 text-medium-emphasis">ชื่อผู้รับการติดต่อ
                                    <span style="color: red;">*</span>
                                </p>
                                <v-text-field density="compact" variant="outlined" placeholder="ตัวอย่าง. นาย ซันซวีท"
                                    v-model="sendData.contactPerson" :rules="[v => !!v || 'โปรดระบุผู้รับการติดต่อ']"
                                    required></v-text-field>
                            </v-col>
                            <v-col cols="12" class="py-0">
                                <p class="pb-1 text-subtitle-1 text-medium-emphasis">แผนก
                                    <span style="color: red;">*</span>
                                </p>
                                <v-text-field density="compact" variant="outlined"
                                    placeholder="ตัวอย่าง. จัดซื้อจัดจ้าง บุคคล ฯลฯ" v-model="sendData.department"
                                    :rules="[v => !!v || 'โปรดระบุแผนก']" required></v-text-field>
                            </v-col>
                            <v-col cols="12" class="py-0">
                                <p class="pb-1 text-subtitle-1 text-medium-emphasis">วัตถุประสงค์
                                    <span style="color: red;">*</span>
                                </p>
                                <v-textarea prepend-inner-icon="mdi-clipboard-text" density="compact" variant="outlined"
                                    placeholder="ระบุวัตถุประสงค์..." :rules="[v => !!v || 'โปรดระบุวัตถุประสงค์']"
                                    required v-model="sendData.object" maxlength="200" counter></v-textarea>
                            </v-col>
                        </v-card>
                    </v-col>
                </v-row>
                <v-card-actions class="px-0 pt-5">
                    <v-btn type="submit" block color="primary" variant="flat">ลงทะเบียน</v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-container>
</template>

<script>
import { dateFormat, dateFormatValue } from '../../function/day';
import { UserService } from '../../api/user';
import { VisitorService } from '../../api/Visitor';
export default {
    setup() {
        const lp = new VisitorService();
        const user = new UserService();
        return {
            dateFormat,
            dateFormatValue,
            lp,
            user
        }
    },
    watch: {
        'sendData.date'(newVal) {
            return this.selectedDate = dateFormat(newVal)
        }
    },
    data: () => ({
        dialogSuccess: false,
        dialog: false,
        sendData: {
            date: new Date(),
            guestName: '',
            licensePlate: '',
            licensePlateProvince: '',
            listType: 'fixedlist',

            agency: '',
            identityNumber: '',
            brand: '',
            carColor: '',
            object: '',
            vehicleType: null,
            PermissionVehicle: null,

            contactPerson: '',
            department: '',
            tel: null,
        },
        selectedDate: '',
        VehicleType: [
            { name: 'รถยนต์', value: 'CAR' },
            { name: 'รถจักรยานยนต์', value: 'MOTORCYCLE' },
            { name: 'รถบรรทุก', value: 'TRUCK' },
        ],
        PermissionCate: [
            { name: 'รถพนักงาน' },
            { name: 'รถบริษัทฯ' },
            { name: 'รถทอยกระป๋อง' },
            { name: 'รถขนขยะ' },
            { name: 'รถขนเศษข้าวโพด' },
            { name: 'รถพ่อครัวแม่ครัว' },
            { name: 'รถส่งข้าวโพดหัวตัด' },
            { name: 'รถส่งมันหวาน' },
            { name: 'รถส่งถั่วลายเสือ' },
        ],
        parkId: '6ab0ef6f4533a95d6cfca5a1',
    }),
    mounted() {

    },
    methods: {
        async submit(event) {
            const res = await event
            if (res.valid === true) {
                // const token = import.meta.env.VITE_REFRESH_TOKEN;
                // คำนวณวันสิ้นปีของปีปัจจุบัน
                const now = new Date();
                const expireYear = now.getFullYear();
                const expireDate = `${expireYear}-12-31`;
                const data = {
                    guestName: this.sendData.guestName,
                    licensePlate: this.sendData.licensePlate.replace(/[^ก-ฮ0-9a-zA-Z]/g, ''),
                    licensePlateProvince: this.sendData.licensePlateProvince,
                    listType: this.sendData.listType,
                    start: dateFormatValue(this.sendData.date),
                    expire: expireDate,

                    agency: this.sendData.agency,
                    identityNumber: this.sendData.identityNumber || '',
                    brand: this.sendData.brand,
                    carColor: this.sendData.carColor,
                    object: this.sendData.object,
                    cate: 'visitor',
                    vehicleType: this.sendData.vehicleType,
                    category: this.sendData.PermissionVehicle ? this.sendData.PermissionVehicle : '',

                    contactPerson: this.sendData.contactPerson,
                    department: this.sendData.department,
                    visitorTel: this.sendData.tel,
                }
                await this.lp.Create(this.parkId, data).then(res => {
                    if (res.message === 'ok') {
                        this.$swal({
                            icon: 'success',
                            title: `ลงทะเบียนสำเร็จ!`,
                        }).then(() => {
                            window.location.reload();
                        });
                    } else if (res.data.message === 'validate error') {
                        this.$swal({
                            title: 'กรุณากรอกข้อมูลให้ครบถ้วน !',
                            icon: 'warning',
                        })
                    } else {
                        this.$swal({
                            icon: 'warning',
                            title: `มีบางอย่างผิดพลาด !`,
                            text: res?.data?.message || res?.message || res?.error || 'ไม่สามารถดำเนินการได้\nกรุณาลองใหม่อีกครั้ง !',
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 5000,
                            timerProgressBar: true,
                        });
                    }
                })
            }
        },
    },
}
</script>

<style scoped></style>